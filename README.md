# bs-nonempty

This small library provides implementations of `NonEmptyList` and `NonEmptyArray`: collection structures that guarantee you'll have at least one value. Additionally, you can build on top of the `NonEmptyBase` module to make a `NonEmpty*` version of your own collection type.

## Installation

**Install via npm:**

`npm install --save bs-nonempty`

**Update your bsconfig.json**

```
"bs-dependencies": [
  "bs-nonempty"
],
```

## Usage

The following demonstrates the API for using this library with `List`, but from these examples, it should be pretty easy to figure out how the `NonEmptyArray` version works.

**Construct a NonEmptyList**

```reason
let make: ('a, list('a)) => NonEmptyList.t('a);
```

```reason
let pure: ('a) => NonEmptyList.t('a);
let cons: ('a, NonEmptyList.t('a)) => NonEmptyList.t('a);
```

```reason
let fromT: list('a) => option(NonEmptyList.t('a));
let toT: NonEmptyList.t('a) => list('a);
```

```reason
/* "import" from NonEmptyList */
let (make, pure, cons, head, tail, fromT, toT) =
  NonEmptyList(make, pure, cons, head, tail, fromT, toT);

let myNel = pure(3);
head(myNel); /* 3 -- Note that this is not Some(3) */
tail(myNel); /* [] */

make(3, [2, 1]) == cons(3, cons(2, pure(1)));
toT(make(3, [2, 1])) == [3, 2, 1];

fromT(["A"]) == Some(make("A", [])) == Some(pure("A"));
fromT([]) == None;
```

**Map, fold (reduce), and more**

```reason
let map: ('a => 'b, NonEmptyList.t('a)) => NonEmptyList.t('b);
let fold_left: (('a, 'b) => 'a, 'a, NonEmptyList.t('b)) => 'a;
let foldl1: (('a, 'a) => 'a, NonEmptyList.t('a)) => 'a;

let myNel = make(0, [1, 2, 3, 4]);
map(string_of_int, myNel); /* == make("0", ["1", "2", "3", "4"]) */
fold_left((+), 0, myNel); /* 10 */
foldl1((+), myNel); /* 10 */
```

```reason
let append: (NonEmptyList.t('a), NonEmptyList.t('a)) => NonEmptyList.t('a);
let join: (NonEmptyList.t(NonEmptyList.t('a))) => NonEmptyList.t('a);
let reverse: NonEmptyList.t('a) => NonEmptyList.t('a);
let length: NonEmptyList.t('a) => int;
```
