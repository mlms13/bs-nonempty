open BsAbstract.Interface;

module type ARRAY_LIKE = {
  type t('a);
  let head: t('a) => option('a);
  let tail: t('a) => t('a);
  let length: t('a) => int;
};

module NonEmptyBase =
       (
         M: MONOID_ANY,
         F: FOLDABLE with type t('a) = M.t('a),
         A: APPLICATIVE with type t('a) = M.t('a),
         X: ARRAY_LIKE with type t('a) = M.t('a),
       ) => {
  type t('a) =
    | NonEmpty('a, M.t('a));

  /* private, reverse the underlying structure */
  let rev_inner = v =>
    F.fold_left((acc, x) => M.append(A.pure(x), acc), M.empty, v);

  let make = (x, xs) => NonEmpty(x, xs);

  let head = (NonEmpty(x, _)) => x;
  let tail = (NonEmpty(_, xs)) => xs;
  let length = (NonEmpty(_, xs)) => 1 + X.length(xs);

  let pure = x => NonEmpty(x, M.empty);

  let fromT = v =>
    switch (X.head(v)) {
    | None => None
    | Some(x) => Some(NonEmpty(x, X.tail(v)))
    };

  let toT = (NonEmpty(x, xs)) => M.append(A.pure(x), xs);

  let append = (NonEmpty(x, xs), nel) =>
    NonEmpty(x, M.append(xs, toT(nel)));

  let cons = (x, nel) => append(pure(x), nel);

  let fold_left = (fn, init, NonEmpty(x, xs)) =>
    F.fold_left(fn, fn(init, x), xs);

  let foldl1 = (fn, NonEmpty(x, xs)) => F.fold_left(fn, x, xs);

  let reverse = (NonEmpty(x, xs)) =>
    F.fold_left((acc, curr) => cons(curr, acc), pure(x), xs);

  let filter = (pred, nel) =>
    fold_left(
      (acc, x) => pred(x) ? M.append(A.pure(x), acc) : acc,
      M.empty,
      nel,
    )
    |> rev_inner;

  let all = pred => fold_left((acc, curr) => acc && pred(curr), true);

  let any = pred => fold_left((acc, curr) => acc || pred(curr), false);

  let find = pred => fold_left((acc, curr) => switch (acc) {
  | Some(v) => Some(v)
  | None => pred(curr) ? Some(curr) : None
  }, None);

  let map = (fn, NonEmpty(x, xs)) => NonEmpty(fn(x), A.map(fn, xs));

  let join = nel => foldl1(append, nel);

  let apply = (fns, nel) => map(fn => map(fn, nel), fns) |> join;

  let flat_map = (a, f) => map(f, a) |> join;

  module Magma_Any: MAGMA_ANY with type t('a) = t('a) = {
    type nonrec t('a) = t('a);

    let append = append;
  };

  module Semigroup_Any: SEMIGROUP_ANY with type t('a) = t('a) = {
    include Magma_Any;
  };

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

  module Infix = {
    include BsAbstract.Infix.Magma_Any(Magma_Any);
    include BsAbstract.Infix.Monad(Monad);
  };
};
