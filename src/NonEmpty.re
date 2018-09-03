open BsAbstract.Interface;

module type HEAD_TAIL = {
  type t('a);
  let head: t('a) => option('a);
  let tail: t('a) => t('a);
};

module NonEmpty = (
  M: MONOID_ANY,
  F: FOLDABLE with type t('a) = M.t('a),
  A: APPLICATIVE with type t('a) = M.t('a),
  X: HEAD_TAIL with type t('a) = M.t('a)
) => {

  type t('a) = NonEmpty('a, M.t('a));

  let head = (NonEmpty(x, _)) => x;
  let tail = (NonEmpty(_, xs)) => xs;

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

  let map = (fn, NonEmpty(x, xs)) =>
    NonEmpty(fn(x), A.map(fn, xs));

  let fold_left = (fn, init, NonEmpty(x, xs)) =>
    F.fold_left(fn, fn(init, x), xs);
};
