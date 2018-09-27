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

For constructing a new `NonEmptyList.t`, you can use `make`, `pure`, `cons`, and `fromT`. You can turn your `NonEmptyList.t` into a `list` using `toT`. The signatures of those functions look like:

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

You can use those functions like this:

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

## Typeclasses

Note: If "semigroup" is a word that freaks you out, you can ignore this entire section. You already know more than enough to use this library. But if you're already familiar with `bs-abstract`, the following might come in handy.

`NonEmpty` is built on top of the great work in [bs-abstract](https://github.com/Risto-Stevcev/bs-abstract). Every `NonEmpty*` implementation (currently List and Array) is a member of the following typeclasses (which can be accessed like `NonEmptyList.Functor.map`):

- [MAGMA_ANY](https://github.com/Risto-Stevcev/bs-abstract/blob/v0.16.0/src/interfaces/Interface.re#L18-L21) and [SEMIGROUP_ANY](https://github.com/Risto-Stevcev/bs-abstract/blob/v0.16.0/src/interfaces/Interface.re#L25) with infix `append` (e.g. `NonEmptyList.Infix.(<:>)`)
- [FUNCTOR](https://github.com/Risto-Stevcev/bs-abstract/blob/v0.16.0/src/interfaces/Interface.re#L78-L81) with infix `map` (e.g. `NonEmptyList.Infix.(<$>)`)
- [APPLY](https://github.com/Risto-Stevcev/bs-abstract/blob/v0.16.0/src/interfaces/Interface.re#L83-L86) and [APPLICATIVE](https://github.com/Risto-Stevcev/bs-abstract/blob/v0.16.0/src/interfaces/Interface.re#L88-L91) with infix `apply` (e.g. `NonEmptyList.Infix.(<*>)`)
- [MONAD](https://github.com/Risto-Stevcev/bs-abstract/blob/v0.16.0/src/interfaces/Interface.re#L93-L96) with infix `flat_map` (e.g. `NonEmptyList.Infix.(>>=)`)

Additionally, to roll your own `NonEmpty*` type, the underlying container type needs to be a member of [MONOID_ANY](https://github.com/Risto-Stevcev/bs-abstract/blob/v0.16.0/src/interfaces/Interface.re#L33-L36), [APPLICATIVE](https://github.com/Risto-Stevcev/bs-abstract/blob/v0.16.0/src/interfaces/Interface.re#L88-L91), and [FOLDABLE](https://github.com/Risto-Stevcev/bs-abstract/blob/v0.16.0/src/interfaces/Interface.re#L113-L122) (as well as provide implementations for `head`, `tail`, and `length` functions). See the implementations of `NonEmptyList` and `NonEmptyArray` for examples.

## Contributing

1. Fork and clone this repository
2. `npm install` to grab `bs-abstract` and any dev dependencies
3. Add features (and tests!) as appropriate
4. `npm run test`

Here are some things worth contributing:

- `fold_right` implementation so we can be a member of `FOLDABLE`
- `EQ` if the underlying `'a` is a member of `EQ`
- `TRAVERSABLE` if the underlying `'a` is a member of `APPLICATIVE`
- docblock comments so we can automate the documentation
- Any extra utility functions or `NonEmptyOtherCollectionType` implementations

## License

Released under the MIT license. See `LICENSE`.
