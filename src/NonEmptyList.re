open BsAbstract.Interface;

module ListMonoid: MONOID_ANY with type t('a) = list('a) = {
  type t('a) = list('a);
  let append = List.append;
  let empty = [];
};

module ListHeadTail: NonEmpty.HEAD_TAIL with type t('a) = list('a) = {
  type t('a) = list('a);

  let head = l => switch l {
  | [] => None
  | [x, ..._] => Some(x)
  };

  let tail = l => switch l {
  | [] => []
  | [_, ...xs] => xs
  };
};

module NonEmptyList = NonEmpty.NonEmpty(
  ListMonoid,
  BsAbstract.List.Foldable,
  BsAbstract.List.Applicative,
  ListHeadTail
);

include NonEmptyList;