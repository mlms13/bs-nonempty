open BsAbstract.Interface;

module ArrayMonoid: MONOID_ANY with type t('a) = array('a) = {
  type t('a) = array('a);
  let append = Array.append;
  let empty = [||];
};

module ArrayHeadTail: NonEmpty.HEAD_TAIL with type t('a) = array('a) = {
  type t('a) = array('a);

  let head = arr =>
    Belt.Array.get(arr, 0);

  let tail = arr =>
    Belt.Array.sliceToEnd(arr, 1);
};

module NonEmptyArray = NonEmpty.NonEmpty(
  ArrayMonoid,
  BsAbstract.Array.Foldable,
  BsAbstract.Array.Applicative,
  ArrayHeadTail
);

include NonEmptyArray;
