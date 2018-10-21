type t('a) =
  | NonEmpty('a, list('a));

let make: ('a, list('a)) => t('a);
let head: t('a) => 'a;
let tail: t('a) => list('a);
let length: t('a) => int;
let pure: 'a => t('a);
let fromT: list('a) => option(t('a));
let toT: t('a) => list('a);
let append: (t('a), t('a)) => t('a);
let cons: ('a, t('a)) => t('a);
let fold_left: (('a, 'b) => 'a, 'a, t('b)) => 'a;
let foldl1: (('a, 'a) => 'a, t('a)) => 'a;
let reverse: t('a) => t('a);
let filter: ('a => bool, t('a)) => list('a);
let all: ('a => bool, t('a)) => bool;
let any: ('a => bool, t('a)) => bool;
let find: ('a => bool, t('a)) => option('a);
let map: ('a => 'b, t('a)) => t('b);
let join: t(t('a)) => t('a);
let apply: (t('a => 'b), t('a)) => t('b);
let flat_map: (t('a), 'a => t('b)) => t('b);

module Magma_Any: {
  type nonrec t('a) = t('a);
  let append: (t('a), t('a)) => t('a);
};

module Semigroup_Any: {
  type nonrec t('a) = t('a);
  let append: (t('a), t('a)) => t('a);
};

module Functor: {
  type nonrec t('a) = t('a);
  let map: ('a => 'b, t('a)) => t('b);
};

module Apply: {
  type nonrec t('a) = t('a);
  let map: ('a => 'b, t('a)) => t('b);
  let apply: (t('a => 'b), t('a)) => t('b);
};

module Applicative: {
  type nonrec t('a) = t('a);
  let map: ('a => 'b, t('a)) => t('b);
  let apply: (t('a => 'b), t('a)) => t('b);
  let pure: 'a => t('a);
};

module Monad: {
  type nonrec t('a) = t('a);
  let map: ('a => 'b, t('a)) => t('b);
  let apply: (t('a => 'b), t('a)) => t('b);
  let pure: 'a => t('a);
  let flat_map: (t('a), 'a => t('b)) => t('b);
};

module Infix: {
  let (<:>): (t('a), t('a)) => t('a);
  let (<$>): ('a => 'b, t('a)) => t('b);
  let (<#>): (t('a), 'a => 'b) => t('b);
  let (<*>): (t('a => 'b), t('a)) => t('b);
  let (>>=): (t('a), 'a => t('b)) => t('b);
  let (=<<): ('a => t('b), t('a)) => t('b);
  let (>=>): ('a => t('b), 'b => t('c), 'a) => t('c);
  let (<=<): ('a => t('b), 'c => t('a), 'c) => t('b);
};
