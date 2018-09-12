open BsAbstract.Interface;

module ListMonoid: MONOID_ANY with type t('a) = list('a) = {
  type t('a) = list('a);
  let append = List.append;
  let empty = [];
};

module ListArrayLike: NonEmpty.ARRAY_LIKE with type t('a) = list('a) = {
  type t('a) = list('a);

  let head = l => switch l {
  | [] => None
  | [x, ..._] => Some(x)
  };

  let tail = l => switch l {
  | [] => []
  | [_, ...xs] => xs
  };

  let length = List.length;
};

module NonEmptyList = NonEmpty.NonEmpty(
  ListMonoid,
  BsAbstract.List.Foldable,
  BsAbstract.List.Applicative,
  ListArrayLike
);

include NonEmptyList;
