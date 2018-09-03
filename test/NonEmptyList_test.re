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

describe("NonEmptyList Head and Tail", () => {
  let single = pure(0);
  let tuple = cons(0, pure(1));

  test("Head of singleton", () => expect(head(single)) |> toEqual(0));
  test("Tail of singleton", () => expect(tail(single)) |> toEqual([]));
  test("Tail of two-value NEL", () => expect(tail(tuple)) |> toEqual([1]));
});

describe("NonEmptyList Functor and Foldable", () => {
  let nelInt = cons(0, cons(1, cons(2, pure(3))));
  let nelStr = cons("0", cons("1", cons("2", pure("3"))));
  let add = (a, b) => a + b;

  test("Map NEL of Int to String", () => expect(map(string_of_int, nelInt)) |> toEqual(nelStr));
  test("Sum NEL of Int (fold_left)", () => expect(fold_left(add, 0, nelInt)) |> toEqual(6));
});