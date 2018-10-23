open Jest;
open Expect;
open NonEmptyList;

module NelIntEq = NonEmptyList.EqUtils(BsAbstract.Int.Eq);
module NelIntOrd = NonEmptyList.OrdUtils(BsAbstract.Int.Ord);

describe("NonEmptyList Construction", () => {
  test("...from a single value", () =>
    expect(pure("a")) |> toEqual(NonEmpty("a", []))
  );
  test("...from an empty list", () =>
    expect(fromT([])) |> toEqual(None)
  );
  test("...from a non empty list", () =>
    expect(fromT(["a"])) |> toEqual(Some(NonEmpty("a", [])))
  );
  test("...from the `make` constructor", () =>
    expect(make(1, [2])) |> toEqual(NonEmpty(1, [2]))
  );
  test("...from `cons`", () =>
    expect(cons(1, pure(2))) |> toEqual(NonEmpty(1, [2]))
  );
});

describe("NonEmptyList Combination", () => {
  let nel = cons(0, cons(1, cons(2, pure(3))));

  test("Cons (prepend)", () =>
    expect(nel) |> toEqual(NonEmpty(0, [1, 2, 3]))
  );
  test("Append", () =>
    expect(append(nel, pure(4))) |> toEqual(NonEmpty(0, [1, 2, 3, 4]))
  );
});

describe("NonEmptyList Basics", () => {
  let one = pure(0);
  let two = make(0, [1]);

  test("Head of singleton", () =>
    expect(head(one)) |> toEqual(0)
  );
  test("Tail of singleton", () =>
    expect(tail(one)) |> toEqual([])
  );
  test("Tail of two-value NEL", () =>
    expect(tail(two)) |> toEqual([1])
  );
  test("Length of singleton", () =>
    expect(length(one)) |> toEqual(1)
  );
  test("Length of two-value NEL", () =>
    expect(length(two)) |> toEqual(2)
  );
});

describe("NonEmptyList zipping", () => {
  let a = make(1, [3, 5, 7]);
  let b = make(2, [4, 6]);
  let bstr = map(string_of_int, b);
  let zipmult = make(2, [12, 30]);
  let tups = make((1, "2"), [(3, "4"), (5, "6")]);

  test("zip_with, multiplying both inputs", () =>
    expect(zip_with((x, y) => x * y, a, b)) |> toEqual(zipmult)
  );
  test("zip, tuple of int and string", () =>
    expect(zip(a, bstr)) |> toEqual(tups)
  );
});

describe("NonEmptyList Functor and Foldable", () => {
  let nelInt = make(0, [1, 2, 3]);
  let nelIntRev = make(3, [2, 1, 0]);
  let nelStr = make("0", ["1", "2", "3"]);
  let add = (+);

  test("Map NEL of Int to String", () =>
    expect(map(string_of_int, nelInt)) |> toEqual(nelStr)
  );
  test("Sum NEL of Int (fold_left)", () =>
    expect(fold_left(add, 0, nelInt)) |> toEqual(6)
  );
  test("Sum using foldl1 instead of fold_left", () =>
    expect(foldl1(add, nelInt)) |> toEqual(6)
  );
  test("Reverse NEL of Int", () =>
    expect(reverse(nelInt)) |> toEqual(nelIntRev)
  );
});

describe("Bonus foldable value (e.g. filter)", () => {
  let full = make(1, [2, 1, 3, 4, 1, 6]);
  let filtered = [2, 4, 6];
  let isEven = v => v mod 2 == 0;

  test("Filter odds out of NEL of Int", () =>
    expect(filter(isEven, full)) |> toEqual(filtered)
  );

  test("All evens pass `isEven` predicate", () =>
    expect(all(isEven, make(2, [4, 6]))) |> toEqual(true)
  );

  test("First value odd does not pass `isEven predicate", () =>
    expect(all(isEven, make(1, [2, 4]))) |> toEqual(false)
  );

  test("Last value odd does not pass `isEven predicate", () =>
    expect(all(isEven, make(2, [4, 1]))) |> toEqual(false)
  );

  test("`any` is true when first value passes predicate", () =>
    expect(any(isEven, make(2, []))) |> toEqual(true)
  );

  test("`any` is true when last value passes predicate", () =>
    expect(any(isEven, make(1, [1, 2]))) |> toEqual(true)
  );

  test("`any` is true when multiple values pass predicate", () =>
    expect(any(isEven, make(1, [2, 4]))) |> toEqual(true)
  );

  test("`any` is false when no values pass predicate", () =>
    expect(any(isEven, make(1, [3, 5]))) |> toEqual(false)
  );

  test("`find` returns first with multiple matches", () =>
    expect(find(isEven, make(1, [2, 3, 4]))) |> toEqual(Some(2))
  );

  test("`find` returns None with no matches", () =>
    expect(find(isEven, make(1, [3, 5]))) |> toEqual(None)
  );
});

describe("NonEmptyList EQ", () => {
  let nelzero = make(0, [0, 0, 0]);
  let nel = make(0, [1, 2, 3]);

  test("Single-value NELs of the same value are eq", () =>
    expect(NelIntEq.eq(pure(0), pure(0))) |> toEqual(true)
  );

  test("Longer matching NELs also pass eq", () =>
    expect(NelIntEq.eq(make(0, [1, 2, 3]), nel)) |> toEqual(true)
  );

  test("Different NELs don't pass eq", () =>
    expect(NelIntEq.eq(nelzero, nel)) |> toEqual(false)
  );

  test("Value is found with elem", () =>
    expect(NelIntEq.elem(2, nel)) |> toEqual(true)
  );

  test("Missing value is not found with elem", () =>
    expect(NelIntEq.elem(2, nelzero)) |> toEqual(false)
  );
});

describe("NonEmptyList min/max helpers", () => {
  let nel = make(1, [4, 3, 8, 2, 1]);

  test("Can find min int", () => expect(NelIntOrd.min(nel)) |> toEqual(1));
  test("Can find max int", () => expect(NelIntOrd.max(nel)) |> toEqual(8));
});

describe("NonEmptyList Apply", () => {
  let increment = n => n + 1;
  let double = n => n * 2;
  let fns = make(increment, [double]);
  let inpt = make(0, [1, 2, 3]);
  let output = make(1, [2, 3, 4, 0, 2, 4, 6]);

  test("`apply` calls each function for each item in the NEL", () =>
    expect(apply(fns, inpt)) |> toEqual(output)
  );
});

describe("NonEmptyList Monad (join and flat_map)", () => {
  let nelInt = make(0, [1]);
  let nela = make("a", ["b", "c"]);
  let nelb = make("d", ["e", "f", "g"]);
  let nelnel = make(nela, [nelb]);
  let joined = make("a", ["b", "c", "d", "e", "f", "g"]);

  let toNelOfTup = i => map(v => (i, v), nela);
  let flatmapped = flat_map(nelInt, toNelOfTup);
  let tuples =
    make((0, "a"), [(0, "b"), (0, "c"), (1, "a"), (1, "b"), (1, "c")]);

  test("Join nel of nel", () =>
    expect(join(nelnel)) |> toEqual(joined)
  );
  test("FlatMap results in one layer of nel", () =>
    expect(flatmapped) |> toEqual(tuples)
  );
});

describe("NonEmptyList typeclasses and infix functions", () => {
  let ((<:>), (<$>)) = NonEmptyList.Infix.((<:>), (<$>));

  let increment = n => n + 1;
  let inpt = make(0, [1, 2]);
  let mapped = make(1, [2, 3]);

  test("Infix append function", () =>
    expect(inpt <:> pure(3)) |> toEqual(make(0, [1, 2, 3]))
  );
  test("Infix map function", () =>
    expect(increment <$> inpt) |> toEqual(mapped)
  );
});
