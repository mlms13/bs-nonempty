open BsAbstract.Interface;

module ArrayMonoid: MONOID_ANY with type t('a) = array('a) = {
  type t('a) = array('a);
  let append = Array.append;
  let empty = [||];
};

module ArrayArrayLike: NonEmptyBase.ARRAY_LIKE with type t('a) = array('a) = {
  type t('a) = array('a);

  let head = arr =>
    Belt.Array.get(arr, 0);

  let tail = arr =>
    Belt.Array.sliceToEnd(arr, 1);

  let length = Belt.Array.length;
};

module NonEmptyArray = NonEmptyBase.NonEmptyBase(
  ArrayMonoid,
  BsAbstract.Array.Foldable,
  BsAbstract.Array.Applicative,
  ArrayArrayLike
);

include NonEmptyArray;
