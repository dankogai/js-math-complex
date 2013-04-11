/*
 * $Id: math-complex.js,v 0.20 2013/04/11 14:45:30 dankogai Exp dankogai $
 *
 *  Licensed under the MIT license.
 *  http://www.opensource.org/licenses/mit-license.php
 *
 *  References:
 *      search.cpan.org/perldoc?Math::Complex
 */

(function(global) {
    'use strict';
    if (Math.Complex) return;
    var CPLX = function Complex(re, im) {
        if (re instanceof CPLX) {
            return new CPLX(re.re, re.im);
        } else if (this instanceof CPLX) {
            this.re = re ? +re : 0;
            this.im = im ? +im : 0;
        } else {
            return new CPLX(re, im);
        }
    };
    CPLX.VERSION = "0.2.0";
    var j = new CPLX(0, 1),
    slice = Array.prototype.slice;
    CPLX.prototype.toString = function() {
        var s = '' + this.re;
        if (this.im) {
            if (this.im > 0) s += '+';
            s += this.im;
            s += 'i';
        }
        return s;
    };
    CPLX.I = CPLX.J = j;
    CPLX.polar = function(abs, arg) {
        return new CPLX(abs * Math.cos(arg), abs * Math.sin(arg));
    },
    (function(meths) {
        for (var p in meths) CPLX.prototype[p] = meths[p];
        for (var p in meths) CPLX[p] = (function(meth) {
            return meth.length
                ? function(x, y) {
                    return meth.call(x instanceof CPLX ? x : new CPLX(x), y);
                }
            : function(x) {
                return meth.call(x instanceof CPLX ? x : new CPLX(x));
            };
        })(meths[p]);
    })({
        neg: function() {
            return new CPLX(-this.re, -this.im);
        },
        con: function() {
            return new CPLX(this.re, -this.im);
        },
        arg: function() {
            return Math.atan2(this.im, this.re);
        },
        abs: function() {
            return Math.sqrt(this.re * this.re + this.im * this.im);
        },
        norm: function() {
            return this.re * this.re + this.im * this.im;
        },
        add: function(that) {
            return (that.constructor === this.constructor)
                ? new CPLX(this.re + that.re, this.im + that.im)
                : new CPLX(this.re + (+that), this.im);
        },
        sub: function(that) {
            return (that.constructor === this.constructor)
                ? new CPLX(this.re - that.re, this.im - that.im)
                : new CPLX(this.re - (+that), this.im);
        },
        mul: function(that) {
            return (that.constructor === this.constructor)
                ? new CPLX(
                    this.re * that.re - this.im * that.im,
                    this.im * that.re + this.re * that.im
                )
                : new CPLX(this.re * (+that), this.im * (+that));
        },
        div: function(that) {
            if (that.constructor === this.constructor) {
                var d = that.re * that.re + that.im * that.im;
                if (d === 0) return new CPLX(this.re / 0, this.im / 0);
                return new CPLX(
                    (this.re * that.re + this.im * that.im) / d,
                    (this.im * that.re - this.re * that.im) / d
                );
            } else {
                return new CPLX(
                    this.re / (+that), this.im / (+that)
                );
            }
        },
        exp: function() {
            var abs = Math.exp(this.re),
            arg = this.im;
            return new CPLX(abs * Math.cos(arg), abs * Math.sin(arg));
        },
        log: function() {
            return new CPLX(Math.log(this.abs()), this.arg());
        },
        pow: function(that) {
            return (that.constructor === this.constructor)
                ? that.mul(this.log()).exp()
                : (new CPLX(that, 0)).mul(this.log()).exp();
        },
        sqrt: function() {
            /* return this.pow(0.5); */
            /* http://en.wikipedia.org/wiki/Square_root#Algebraic_formula */
            var r = this.abs();
            return new CPLX(
                Math.sqrt((r + this.re) / 2),
                this.im < 0 ? -Math.sqrt((r - this.re) / 2)
                    :  Math.sqrt((r - this.re) / 2)
            );
        },
        cos: function() {
            return this.mul(j).exp().add(this.neg().mul(j).exp())
                .div(2);
        },
        sin: function() {
            return this.mul(j).exp().sub(this.neg().mul(j).exp())
                .div(j.mul(2));
        },
        tan: function() {
            return this.cos().div(this.sin());
        },
        acos: function() {
            return this.add(this.mul(this).neg().add(1).sqrt().mul(j))
                .log().mul(j).neg();
        },
        asin: function() {
            return this.mul(j).add(this.mul(this).neg().add(1).sqrt())
                .log().mul(j).neg();
        },
        atan: function() {
            var d = j.mul(this).add(1);
            return d.con().log().sub(d.log()).mul(j).div(2);
        },
        atan2: function(that) {
            return this.div(that).atan();
        },
        eq: function(that) {
            if (that.constructor === this.constructor) {
                return this.re === that.re && this.im === that.im;
            } else {
                return this.eq(new CPLX(that, 0));
            }
        },
        ne: function(that) {
            return ! this.eq(that);
        }
    });
    // export
    Math.Complex = CPLX;
})(this);
