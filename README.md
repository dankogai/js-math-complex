[![build status](https://secure.travis-ci.org/dankogai/js-math-complex.png)](http://travis-ci.org/dankogai/js-math-complex)

math-complex.js
===============

Complex Number for JavaScript

USAGE
-----

### In Browser

````html
<script src="math-complex.js" charset="UTF-8"></script>
````

### node.js

````javascript
require('./math-complex.js');
````

SYNOPSIS
--------

````javascript
var cplx = Math.Complex,	// for convenience
j = cplx(0, 1);
j.mul(Math.PI).exp() + '';	// -1+1.2246063538223773e-16i
// ditto
Math.Complex.exp(cplx(0, Math.PI));
````

DESCRIPTION
-----------

This module implements complex number arithmetics.  Basic arithmetics + All arithmetic functions in `Math` are supported.

### Constructors

#### Math.Complex( *re* *[, im]* )

Constructor.  *im* === 0 if omitted.

````javascript
var z = Math.Complex(1,2);
z.re === 1;
z.im === 2;
````

#### Math.Complex.polar( *abs*, *arg* )

Constructor in polar form.

### Methods

In the followin example **z** is a complex number object.  Unless otherwise stated, all methods below return complex number objects.

#### z.eq( *z1* )

returns `true` if **z** equals *z1*, `false` otherwise.

#### z.ne( *z1* )

The opposite of z.eq( *z1 *)

#### z.abs()

returns the absolute value in `Number`.

#### z.arg()

returns the argument in `Number`.

#### z.neg()

returns - **z**

#### z.con()

returns the conjugate.

````javascript
Math.Complex(re, im).con().eq(Math.Complex(re, -im));
````

#### z.norm()

returns the norm in `Number`.

#### z.add( *z1* )

**z** + *z1*.  *z1* can be either complex number or real number  If *z1* is a real number (`Number` object, that is), it is automatically converted to complex number before the calculation.  This applies to all binary methods.

#### z.sub( *z1* )

**z** - *z1*

#### z.mul( *z1* )

**z** * *z1*

#### z.div( *z1* )

**z** / *z1*

#### z.exp()

Copmplex version of Math.exp( **z** ) .

#### z.log()

Copmplex version of Math.log( **z** ) .

#### z.pow( *z1* )

Copmplex version of Math.exp( **z**, *z1* ) .

#### z.sin()

Copmplex version of Math.sin( **z** ) .

#### z.cos()

Copmplex version of Math.cos( **z** ) .

#### z.tan()

Copmplex version of Math.tan( **z** ) .

#### z.asin()

Copmplex version of Math.asin( **z** ) .

#### z.acos()

Copmplex version of Math.acos( **z** ) .

#### z.atan()

Copmplex version of Math.atan( **z** ) .

#### z.atan2(z1)

Copmplex version of Math.atan2( **z**, *z1* ) .

### Functional Form

All methods above can also be accessed in functional form which is handy with `with`.

````javascript
// does not work in strict mode
with(Math.Complex){
	console.log(atan2(1,1))	// { re: 0.7853981633974483, im: 0 }
}
````
