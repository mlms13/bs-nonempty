'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var NonEmptyBase = require("./NonEmptyBase.bs.js");
var Array$BsAbstract = require("bs-abstract/src/implementations/Array.bs.js");

var empty = /* array */[];

var ArrayMonoid = /* module */[
  /* append */$$Array.append,
  /* empty */empty
];

function head(arr) {
  return Belt_Array.get(arr, 0);
}

function tail(arr) {
  return Belt_Array.sliceToEnd(arr, 1);
}

function length(prim) {
  return prim.length;
}

var ArrayArrayLike = /* module */[
  /* head */head,
  /* tail */tail,
  /* length */length
];

var NonEmptyArray = NonEmptyBase.NonEmptyBase(ArrayMonoid)(Array$BsAbstract.Foldable)(Array$BsAbstract.Applicative)(ArrayArrayLike);

var make = NonEmptyArray[0];

var head$1 = NonEmptyArray[1];

var tail$1 = NonEmptyArray[2];

var length$1 = NonEmptyArray[3];

var pure = NonEmptyArray[4];

var fromT = NonEmptyArray[5];

var toT = NonEmptyArray[6];

var append = NonEmptyArray[7];

var cons = NonEmptyArray[8];

var fold_left = NonEmptyArray[9];

var foldl1 = NonEmptyArray[10];

var reverse = NonEmptyArray[11];

var map = NonEmptyArray[12];

var join = NonEmptyArray[13];

var apply = NonEmptyArray[14];

var flat_map = NonEmptyArray[15];

var Magma_Any = NonEmptyArray[16];

var Semigroup_Any = NonEmptyArray[17];

var Functor = NonEmptyArray[18];

var Apply = NonEmptyArray[19];

var Applicative = NonEmptyArray[20];

var Monad = NonEmptyArray[21];

var Infix = NonEmptyArray[22];

exports.ArrayMonoid = ArrayMonoid;
exports.ArrayArrayLike = ArrayArrayLike;
exports.NonEmptyArray = NonEmptyArray;
exports.make = make;
exports.head = head$1;
exports.tail = tail$1;
exports.length = length$1;
exports.pure = pure;
exports.fromT = fromT;
exports.toT = toT;
exports.append = append;
exports.cons = cons;
exports.fold_left = fold_left;
exports.foldl1 = foldl1;
exports.reverse = reverse;
exports.map = map;
exports.join = join;
exports.apply = apply;
exports.flat_map = flat_map;
exports.Magma_Any = Magma_Any;
exports.Semigroup_Any = Semigroup_Any;
exports.Functor = Functor;
exports.Apply = Apply;
exports.Applicative = Applicative;
exports.Monad = Monad;
exports.Infix = Infix;
/* NonEmptyArray Not a pure module */
