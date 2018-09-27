'use strict';

var Jest = require("@glennsl/bs-jest/src/jest.js");
var Curry = require("bs-platform/lib/js/curry.js");
var NonEmptyList = require("../src/NonEmptyList.bs.js");

describe("NonEmptyList Construction", (function () {
        Jest.test("...from a single value", (function () {
                return Jest.Expect[/* toEqual */12](/* NonEmpty */[
                            "a",
                            /* [] */0
                          ], Jest.Expect[/* expect */0](Curry._1(NonEmptyList.pure, "a")));
              }));
        Jest.test("...from an empty list", (function () {
                return Jest.Expect[/* toEqual */12](undefined, Jest.Expect[/* expect */0](Curry._1(NonEmptyList.fromT, /* [] */0)));
              }));
        Jest.test("...from a non empty list", (function () {
                return Jest.Expect[/* toEqual */12](Curry._1(NonEmptyList.pure, "a"), Jest.Expect[/* expect */0](Curry._1(NonEmptyList.fromT, /* :: */[
                                    "a",
                                    /* [] */0
                                  ])));
              }));
        return Jest.test("...from the `make` constructor", (function () {
                      return Jest.Expect[/* toEqual */12](Curry._2(NonEmptyList.cons, 1, Curry._1(NonEmptyList.pure, 2)), Jest.Expect[/* expect */0](Curry._2(NonEmptyList.make, 1, /* :: */[
                                          2,
                                          /* [] */0
                                        ])));
                    }));
      }));

describe("NonEmptyList Combination", (function () {
        var nel = Curry._2(NonEmptyList.cons, 0, Curry._2(NonEmptyList.cons, 1, Curry._2(NonEmptyList.cons, 2, Curry._1(NonEmptyList.pure, 3))));
        Jest.test("Cons (prepend)", (function () {
                return Jest.Expect[/* toEqual */12](/* NonEmpty */[
                            0,
                            /* :: */[
                              1,
                              /* :: */[
                                2,
                                /* :: */[
                                  3,
                                  /* [] */0
                                ]
                              ]
                            ]
                          ], Jest.Expect[/* expect */0](nel));
              }));
        return Jest.test("Append", (function () {
                      return Jest.Expect[/* toEqual */12](/* NonEmpty */[
                                  0,
                                  /* :: */[
                                    1,
                                    /* :: */[
                                      2,
                                      /* :: */[
                                        3,
                                        /* :: */[
                                          4,
                                          /* [] */0
                                        ]
                                      ]
                                    ]
                                  ]
                                ], Jest.Expect[/* expect */0](Curry._2(NonEmptyList.append, nel, Curry._1(NonEmptyList.pure, 4))));
                    }));
      }));

describe("NonEmptyList Basics", (function () {
        var single = Curry._1(NonEmptyList.pure, 0);
        var tuple = Curry._2(NonEmptyList.cons, 0, Curry._1(NonEmptyList.pure, 1));
        Jest.test("Head of singleton", (function () {
                return Jest.Expect[/* toEqual */12](0, Jest.Expect[/* expect */0](Curry._1(NonEmptyList.head, single)));
              }));
        Jest.test("Tail of singleton", (function () {
                return Jest.Expect[/* toEqual */12](/* [] */0, Jest.Expect[/* expect */0](Curry._1(NonEmptyList.tail, single)));
              }));
        Jest.test("Tail of two-value NEL", (function () {
                return Jest.Expect[/* toEqual */12](/* :: */[
                            1,
                            /* [] */0
                          ], Jest.Expect[/* expect */0](Curry._1(NonEmptyList.tail, tuple)));
              }));
        Jest.test("Length of singleton", (function () {
                return Jest.Expect[/* toEqual */12](1, Jest.Expect[/* expect */0](Curry._1(NonEmptyList.length, single)));
              }));
        return Jest.test("Length of two-value NEL", (function () {
                      return Jest.Expect[/* toEqual */12](2, Jest.Expect[/* expect */0](Curry._1(NonEmptyList.length, tuple)));
                    }));
      }));

describe("NonEmptyList Functor and Foldable", (function () {
        var nelInt = Curry._2(NonEmptyList.cons, 0, Curry._2(NonEmptyList.cons, 1, Curry._2(NonEmptyList.cons, 2, Curry._1(NonEmptyList.pure, 3))));
        var nelIntRev = Curry._2(NonEmptyList.cons, 3, Curry._2(NonEmptyList.cons, 2, Curry._2(NonEmptyList.cons, 1, Curry._1(NonEmptyList.pure, 0))));
        var nelStr = Curry._2(NonEmptyList.cons, "0", Curry._2(NonEmptyList.cons, "1", Curry._2(NonEmptyList.cons, "2", Curry._1(NonEmptyList.pure, "3"))));
        var add = function (prim, prim$1) {
          return prim + prim$1 | 0;
        };
        Jest.test("Map NEL of Int to String", (function () {
                return Jest.Expect[/* toEqual */12](nelStr, Jest.Expect[/* expect */0](Curry._2(NonEmptyList.map, (function (prim) {
                                      return String(prim);
                                    }), nelInt)));
              }));
        Jest.test("Sum NEL of Int (fold_left)", (function () {
                return Jest.Expect[/* toEqual */12](6, Jest.Expect[/* expect */0](Curry._3(NonEmptyList.fold_left, add, 0, nelInt)));
              }));
        Jest.test("Sum using foldl1 instead of fold_left", (function () {
                return Jest.Expect[/* toEqual */12](6, Jest.Expect[/* expect */0](Curry._2(NonEmptyList.foldl1, add, nelInt)));
              }));
        return Jest.test("Reverse NEL of Int", (function () {
                      return Jest.Expect[/* toEqual */12](nelIntRev, Jest.Expect[/* expect */0](Curry._1(NonEmptyList.reverse, nelInt)));
                    }));
      }));

describe("NonEmptyList Apply", (function () {
        var increment = function (n) {
          return n + 1 | 0;
        };
        var $$double = function (n) {
          return (n << 1);
        };
        var fns = Curry._2(NonEmptyList.make, increment, /* :: */[
              $$double,
              /* [] */0
            ]);
        var inpt = Curry._2(NonEmptyList.make, 0, /* :: */[
              1,
              /* :: */[
                2,
                /* :: */[
                  3,
                  /* [] */0
                ]
              ]
            ]);
        var output = Curry._2(NonEmptyList.make, 1, /* :: */[
              2,
              /* :: */[
                3,
                /* :: */[
                  4,
                  /* :: */[
                    0,
                    /* :: */[
                      2,
                      /* :: */[
                        4,
                        /* :: */[
                          6,
                          /* [] */0
                        ]
                      ]
                    ]
                  ]
                ]
              ]
            ]);
        return Jest.test("`apply` calls each function for each item in the NEL", (function () {
                      return Jest.Expect[/* toEqual */12](output, Jest.Expect[/* expect */0](Curry._2(NonEmptyList.apply, fns, inpt)));
                    }));
      }));

describe("NonEmptyList Monad (join and flat_map)", (function () {
        var nelInt = Curry._2(NonEmptyList.cons, 0, Curry._1(NonEmptyList.pure, 1));
        var nela = Curry._2(NonEmptyList.cons, "a", Curry._2(NonEmptyList.cons, "b", Curry._1(NonEmptyList.pure, "c")));
        var nelb = Curry._2(NonEmptyList.cons, "d", Curry._2(NonEmptyList.cons, "e", Curry._2(NonEmptyList.cons, "f", Curry._1(NonEmptyList.pure, "g"))));
        var nelnel = Curry._2(NonEmptyList.cons, nela, Curry._1(NonEmptyList.pure, nelb));
        var joined = Curry._2(NonEmptyList.cons, "a", Curry._2(NonEmptyList.cons, "b", Curry._2(NonEmptyList.cons, "c", Curry._2(NonEmptyList.cons, "d", Curry._2(NonEmptyList.cons, "e", Curry._2(NonEmptyList.cons, "f", Curry._1(NonEmptyList.pure, "g")))))));
        var toNelOfTup = function (i) {
          return Curry._2(NonEmptyList.map, (function (v) {
                        return /* tuple */[
                                i,
                                v
                              ];
                      }), nela);
        };
        var flatmapped = Curry._2(NonEmptyList.flat_map, nelInt, toNelOfTup);
        var tuples = Curry._2(NonEmptyList.cons, /* tuple */[
              0,
              "a"
            ], Curry._2(NonEmptyList.cons, /* tuple */[
                  0,
                  "b"
                ], Curry._2(NonEmptyList.cons, /* tuple */[
                      0,
                      "c"
                    ], Curry._2(NonEmptyList.cons, /* tuple */[
                          1,
                          "a"
                        ], Curry._2(NonEmptyList.cons, /* tuple */[
                              1,
                              "b"
                            ], Curry._1(NonEmptyList.pure, /* tuple */[
                                  1,
                                  "c"
                                ]))))));
        Jest.test("Join nel of nel", (function () {
                return Jest.Expect[/* toEqual */12](joined, Jest.Expect[/* expect */0](Curry._1(NonEmptyList.join, nelnel)));
              }));
        return Jest.test("FlatMap results in one layer of nel", (function () {
                      return Jest.Expect[/* toEqual */12](tuples, Jest.Expect[/* expect */0](flatmapped));
                    }));
      }));

describe("NonEmptyList typeclasses and infix functions", (function () {
        var $less$colon$great = NonEmptyList.NonEmptyList[/* Infix */22][/* <:> */0];
        var $less$$great = NonEmptyList.NonEmptyList[/* Infix */22][/* <$> */1];
        var increment = function (n) {
          return n + 1 | 0;
        };
        var inpt = Curry._2(NonEmptyList.make, 0, /* :: */[
              1,
              /* :: */[
                2,
                /* [] */0
              ]
            ]);
        var mapped = Curry._2(NonEmptyList.make, 1, /* :: */[
              2,
              /* :: */[
                3,
                /* [] */0
              ]
            ]);
        Jest.test("Infix append function", (function () {
                return Jest.Expect[/* toEqual */12](Curry._2(NonEmptyList.make, 0, /* :: */[
                                1,
                                /* :: */[
                                  2,
                                  /* :: */[
                                    3,
                                    /* [] */0
                                  ]
                                ]
                              ]), Jest.Expect[/* expect */0](Curry._2($less$colon$great, inpt, Curry._1(NonEmptyList.pure, 3))));
              }));
        return Jest.test("Infix map function", (function () {
                      return Jest.Expect[/* toEqual */12](mapped, Jest.Expect[/* expect */0](Curry._2($less$$great, increment, inpt)));
                    }));
      }));

/*  Not a pure module */
