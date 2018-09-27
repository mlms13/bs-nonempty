'use strict';

var List = require("bs-platform/lib/js/list.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var NonEmptyBase = require("./NonEmptyBase.bs.js");
var List$BsAbstract = require("bs-abstract/src/implementations/List.bs.js");

var ListMonoid = /* module */[
  /* append */List.append,
  /* empty : [] */0
];

function head(l) {
  if (l) {
    return Js_primitive.some(l[0]);
  }
  
}

function tail(l) {
  if (l) {
    return l[1];
  } else {
    return /* [] */0;
  }
}

var ListArrayLike = /* module */[
  /* head */head,
  /* tail */tail,
  /* length */List.length
];

var NonEmptyList = NonEmptyBase.NonEmptyBase(ListMonoid)(List$BsAbstract.Foldable)(List$BsAbstract.Applicative)(ListArrayLike);

var make = NonEmptyList[0];

var head$1 = NonEmptyList[1];

var tail$1 = NonEmptyList[2];

var length = NonEmptyList[3];

var pure = NonEmptyList[4];

var fromT = NonEmptyList[5];

var toT = NonEmptyList[6];

var append = NonEmptyList[7];

var cons = NonEmptyList[8];

var fold_left = NonEmptyList[9];

var foldl1 = NonEmptyList[10];

var reverse = NonEmptyList[11];

var map = NonEmptyList[12];

var join = NonEmptyList[13];

var apply = NonEmptyList[14];

var flat_map = NonEmptyList[15];

var Magma_Any = NonEmptyList[16];

var Semigroup_Any = NonEmptyList[17];

var Functor = NonEmptyList[18];

var Apply = NonEmptyList[19];

var Applicative = NonEmptyList[20];

var Monad = NonEmptyList[21];

var Infix = NonEmptyList[22];

exports.ListMonoid = ListMonoid;
exports.ListArrayLike = ListArrayLike;
exports.NonEmptyList = NonEmptyList;
exports.make = make;
exports.head = head$1;
exports.tail = tail$1;
exports.length = length;
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
/* NonEmptyList Not a pure module */
