'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var Infix$BsAbstract = require("bs-abstract/src/interfaces/Infix.bs.js");

function NonEmptyBase(M) {
  return (function (F) {
      return (function (A) {
          return (function (X) {
              var make = function (x, xs) {
                return /* NonEmpty */[
                        x,
                        xs
                      ];
              };
              var head = function (param) {
                return param[0];
              };
              var tail = function (param) {
                return param[1];
              };
              var length = function (param) {
                return 1 + Curry._1(X[/* length */2], param[1]) | 0;
              };
              var pure = function (x) {
                return /* NonEmpty */[
                        x,
                        M[/* empty */1]
                      ];
              };
              var fromT = function (v) {
                var match = Curry._1(X[/* head */0], v);
                if (match !== undefined) {
                  return /* NonEmpty */[
                          Js_primitive.valFromOption(match),
                          Curry._1(X[/* tail */1], v)
                        ];
                }
                
              };
              var toT = function (param) {
                return Curry._2(M[/* append */0], Curry._1(A[/* pure */2], param[0]), param[1]);
              };
              var append = function (param, nel) {
                return /* NonEmpty */[
                        param[0],
                        Curry._2(M[/* append */0], param[1], toT(nel))
                      ];
              };
              var cons = function (x, nel) {
                return append(/* NonEmpty */[
                            x,
                            M[/* empty */1]
                          ], nel);
              };
              var fold_left = function (fn, init, param) {
                return Curry._3(F[/* fold_left */0], fn, Curry._2(fn, init, param[0]), param[1]);
              };
              var foldl1 = function (fn, param) {
                return Curry._3(F[/* fold_left */0], fn, param[0], param[1]);
              };
              var reverse = function (param) {
                return Curry._3(F[/* fold_left */0], (function (acc, curr) {
                              return append(/* NonEmpty */[
                                          curr,
                                          M[/* empty */1]
                                        ], acc);
                            }), /* NonEmpty */[
                            param[0],
                            M[/* empty */1]
                          ], param[1]);
              };
              var map = function (fn, param) {
                return /* NonEmpty */[
                        Curry._1(fn, param[0]),
                        Curry._2(A[/* map */0], fn, param[1])
                      ];
              };
              var join = function (nel) {
                return foldl1(append, nel);
              };
              var apply = function (fns, nel) {
                return foldl1(append, map((function (fn) {
                                  return map(fn, nel);
                                }), fns));
              };
              var flat_map = function (a, f) {
                return foldl1(append, map(f, a));
              };
              var Magma_Any = /* module */[/* append */append];
              var Semigroup_Any = /* module */[/* append */append];
              var Functor = /* module */[/* map */map];
              var Apply = /* module */[
                /* map */map,
                /* apply */apply
              ];
              var Applicative = /* module */[
                /* map */map,
                /* apply */apply,
                /* pure */pure
              ];
              var Monad = /* module */[
                /* map */map,
                /* apply */apply,
                /* pure */pure,
                /* flat_map */flat_map
              ];
              var include = Infix$BsAbstract.Magma_Any(Magma_Any);
              var include$1 = Infix$BsAbstract.Monad(Monad);
              var Infix_000 = /* <:> */include[0];
              var Infix_001 = /* <$> */include$1[0];
              var Infix_002 = /* <#> */include$1[1];
              var Infix_003 = /* <*> */include$1[2];
              var Infix_004 = /* >>= */include$1[3];
              var Infix_005 = /* =<< */include$1[4];
              var Infix_006 = /* >=> */include$1[5];
              var Infix_007 = /* <=< */include$1[6];
              var Infix = /* module */[
                Infix_000,
                Infix_001,
                Infix_002,
                Infix_003,
                Infix_004,
                Infix_005,
                Infix_006,
                Infix_007
              ];
              return /* module */[
                      /* make */make,
                      /* head */head,
                      /* tail */tail,
                      /* length */length,
                      /* pure */pure,
                      /* fromT */fromT,
                      /* toT */toT,
                      /* append */append,
                      /* cons */cons,
                      /* fold_left */fold_left,
                      /* foldl1 */foldl1,
                      /* reverse */reverse,
                      /* map */map,
                      /* join */join,
                      /* apply */apply,
                      /* flat_map */flat_map,
                      /* Magma_Any */Magma_Any,
                      /* Semigroup_Any */Semigroup_Any,
                      /* Functor */Functor,
                      /* Apply */Apply,
                      /* Applicative */Applicative,
                      /* Monad */Monad,
                      /* Infix */Infix
                    ];
            });
        });
    });
}

exports.NonEmptyBase = NonEmptyBase;
/* No side effect */
