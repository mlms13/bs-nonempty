open BsAbstract.Interface;

module type ARRAY_LIKE = {
  type t('a);
  let head: t('a) => option('a);
  let tail: t('a) => t('a);
  let length: t('a) => int;
};

module NonEmpty = (
  M: MONOID_ANY,
  F: FOLDABLE with type t('a) = M.t('a),
  A: APPLICATIVE with type t('a) = M.t('a),
  X: ARRAY_LIKE with type t('a) = M.t('a)
) => {

  type t('a) = NonEmpty('a, M.t('a));

  let make = (x, xs) => NonEmpty(x, xs);

  let head = (NonEmpty(x, _)) => x;
  let tail = (NonEmpty(_, xs)) => xs;
  let length = (NonEmpty(_, xs)) => 1 + X.length(xs);

  let pure = x => NonEmpty(x, M.empty);

  let fromT = v => switch (X.head(v)) {
  | None => None
  | Some(x) => Some(NonEmpty(x, X.tail(v)))
  };

  let toT = (NonEmpty(x, xs)) =>
    M.append(A.pure(x), xs);

  let append = (NonEmpty(x, xs), nel) =>
    NonEmpty(x, M.append(xs, toT(nel)));

  let cons = (x, nel) =>
    append(pure(x), nel);

  let fold_left = (fn, init, NonEmpty(x, xs)) =>
    F.fold_left(fn, fn(init, x), xs);

  let foldl1 = (fn, NonEmpty(x, xs)) =>
    F.fold_left(fn, x, xs);

  let reverse = (NonEmpty(x, xs)) =>
    F.fold_left((acc, curr) => append(pure(curr), acc), pure(x), xs);

  let map = (fn, NonEmpty(x, xs)) =>
    NonEmpty(fn(x), A.map(fn, xs));

  let join = nel =>
    foldl1(append, nel);

  /* TODO: change implementation to use A.apply and write tests */
  let apply = (fns, nel) =>
    map((fn => map(fn, nel)), fns) |> join;

  let flat_map = (a, f) =>
    map(f, a) |> join;

  module Functor: FUNCTOR with type t('a) = t('a) = {
    type x('a) = t('a);
    type t('a) = x('a);
    let map = map;
  };

  module Apply: APPLY with type t('a) = t('a) = {
    include Functor;
    let apply = apply;
  };

  module Applicative: APPLICATIVE with type t('a) = t('a) = {
    include Apply;
    let pure = pure;
  };

  module Monad: MONAD with type t('a) = t('a) = {
    include Applicative;
    let flat_map = flat_map;
  };

  /* TODO: infix */
};
