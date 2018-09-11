open Jest;
open Expect;
open NonEmptyList;

describe("NonEmptyList Construction", () => {
  let nel = pure("a");

  test("...from a single value", () => expect(nel) |> toEqual(NonEmpty("a", [])));
  test("...from an empty list", () => expect(fromT([])) |> toEqual(None));
  test("...from a non empty list", () => expect(fromT(["a"])) |> toEqual(Some(nel)));
});

describe("NonEmptyList Combination", () => {
  let nel = cons(0, cons(1, cons(2, pure(3))));

  test("Cons (prepend)", () => expect(nel) |> toEqual(NonEmpty(0, [1, 2, 3])));
  test("Append", () => expect(append(nel, pure(4))) |> toEqual(NonEmpty(0, [1, 2, 3, 4])));
});

describe("NonEmptyList Basics", () => {
  let single = pure(0);
  let tuple = cons(0, pure(1));

  test("Head of singleton", () => expect(head(single)) |> toEqual(0));
  test("Tail of singleton", () => expect(tail(single)) |> toEqual([]));
  test("Tail of two-value NEL", () => expect(tail(tuple)) |> toEqual([1]));
  test("Length of singleton", () => expect(length(single)) |> toEqual(1));
  test("Length of two-value NEL", () => expect(length(tuple)) |> toEqual(2));
});

describe("NonEmptyList Functor and Foldable", () => {
  let nelInt = cons(0, cons(1, cons(2, pure(3))));
  let nelIntRev = cons(3, cons(2, cons(1, pure(0))));
  let nelStr = cons("0", cons("1", cons("2", pure("3"))));
  let add = (a, b) => a + b;

  test("Map NEL of Int to String", () => expect(map(string_of_int, nelInt)) |> toEqual(nelStr));
  test("Sum NEL of Int (fold_left)", () => expect(fold_left(add, 0, nelInt)) |> toEqual(6));
  test("Sum using foldl1 instead of fold_left", () => expect(foldl1(add, nelInt)) |> toEqual(6));
  test("Reverse NEL of Int", () => expect(reverse(nelInt)) |> toEqual(nelIntRev));
});

describe("NonEmptyList Monad (join and flat_map)", () => {
  let nelInt = cons(0, pure(1));
  let nela = cons("a", cons("b", pure("c")));
  let nelb = cons("d", cons("e", cons("f", pure("g"))));
  let nelnel = cons(nela, pure(nelb));
  let joined = cons("a", cons("b", cons("c", cons("d", cons("e", cons("f", pure("g")))))));

  let toNelOfTup = (i) => map(v => (i, v), nela);
  let flatmapped = flat_map(nelInt, toNelOfTup);
  let tuples = cons((0, "a"), cons((0, "b"), cons((0, "c"),
               cons((1, "a"), cons((1, "b"), pure((1, "c")))))));

  test("Join nel of nel", () => expect(join(nelnel)) |> toEqual(joined));
  test("FlatMap results in one layer of nel", () => expect(flatmapped) |> toEqual(tuples));
});
