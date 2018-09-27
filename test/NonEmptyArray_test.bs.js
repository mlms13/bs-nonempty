'use strict';

var Jest = require("@glennsl/bs-jest/src/jest.js");
var Curry = require("bs-platform/lib/js/curry.js");
var NonEmptyArray = require("../src/NonEmptyArray.bs.js");

describe("NonEmptyArray Construction", (function () {
        var nel = Curry._1(NonEmptyArray.pure, "a");
        Jest.test("...from a single value", (function () {
                return Jest.Expect[/* toEqual */12](/* NonEmpty */[
                            "a",
                            /* array */[]
                          ], Jest.Expect[/* expect */0](nel));
              }));
        Jest.test("...from an empty array", (function () {
                return Jest.Expect[/* toEqual */12](undefined, Jest.Expect[/* expect */0](Curry._1(NonEmptyArray.fromT, /* array */[])));
              }));
        return Jest.test("...from a non empty array", (function () {
                      return Jest.Expect[/* toEqual */12](nel, Jest.Expect[/* expect */0](Curry._1(NonEmptyArray.fromT, /* array */["a"])));
                    }));
      }));

describe("NonEmptyArray Combination", (function () {
        var nel = Curry._2(NonEmptyArray.cons, 0, Curry._2(NonEmptyArray.cons, 1, Curry._2(NonEmptyArray.cons, 2, Curry._1(NonEmptyArray.pure, 3))));
        Jest.test("Cons (prepend)", (function () {
                return Jest.Expect[/* toEqual */12](/* NonEmpty */[
                            0,
                            /* array */[
                              1,
                              2,
                              3
                            ]
                          ], Jest.Expect[/* expect */0](nel));
              }));
        return Jest.test("Append", (function () {
                      return Jest.Expect[/* toEqual */12](/* NonEmpty */[
                                  0,
                                  /* array */[
                                    1,
                                    2,
                                    3,
                                    4
                                  ]
                                ], Jest.Expect[/* expect */0](Curry._2(NonEmptyArray.append, nel, Curry._1(NonEmptyArray.pure, 4))));
                    }));
      }));

describe("NonEmptyArray Basics", (function () {
        var single = Curry._1(NonEmptyArray.pure, 0);
        var tuple = Curry._2(NonEmptyArray.cons, 0, Curry._1(NonEmptyArray.pure, 1));
        Jest.test("Head of singleton", (function () {
                return Jest.Expect[/* toEqual */12](0, Jest.Expect[/* expect */0](Curry._1(NonEmptyArray.head, single)));
              }));
        Jest.test("Tail of singleton", (function () {
                return Jest.Expect[/* toEqual */12](/* array */[], Jest.Expect[/* expect */0](Curry._1(NonEmptyArray.tail, single)));
              }));
        Jest.test("Tail of two-value NE Array", (function () {
                return Jest.Expect[/* toEqual */12](/* array */[1], Jest.Expect[/* expect */0](Curry._1(NonEmptyArray.tail, tuple)));
              }));
        Jest.test("Length of singleton", (function () {
                return Jest.Expect[/* toEqual */12](1, Jest.Expect[/* expect */0](Curry._1(NonEmptyArray.length, single)));
              }));
        return Jest.test("Length of two-value NE Array", (function () {
                      return Jest.Expect[/* toEqual */12](2, Jest.Expect[/* expect */0](Curry._1(NonEmptyArray.length, tuple)));
                    }));
      }));

describe("NonEmptyArray Functor and Foldable", (function () {
        var nelInt = Curry._2(NonEmptyArray.cons, 0, Curry._2(NonEmptyArray.cons, 1, Curry._2(NonEmptyArray.cons, 2, Curry._1(NonEmptyArray.pure, 3))));
        var nelIntRev = Curry._2(NonEmptyArray.cons, 3, Curry._2(NonEmptyArray.cons, 2, Curry._2(NonEmptyArray.cons, 1, Curry._1(NonEmptyArray.pure, 0))));
        var nelStr = Curry._2(NonEmptyArray.cons, "0", Curry._2(NonEmptyArray.cons, "1", Curry._2(NonEmptyArray.cons, "2", Curry._1(NonEmptyArray.pure, "3"))));
        var add = function (a, b) {
          return a + b | 0;
        };
        Jest.test("Map NEL of Int to String", (function () {
                return Jest.Expect[/* toEqual */12](nelStr, Jest.Expect[/* expect */0](Curry._2(NonEmptyArray.map, (function (prim) {
                                      return String(prim);
                                    }), nelInt)));
              }));
        Jest.test("Sum NEL of Int (fold_left)", (function () {
                return Jest.Expect[/* toEqual */12](6, Jest.Expect[/* expect */0](Curry._3(NonEmptyArray.fold_left, add, 0, nelInt)));
              }));
        return Jest.test("Reverse NEL of Int", (function () {
                      return Jest.Expect[/* toEqual */12](nelIntRev, Jest.Expect[/* expect */0](Curry._1(NonEmptyArray.reverse, nelInt)));
                    }));
      }));

/*  Not a pure module */
