/*
 * $Id: complex.js,v 0.13 2012/01/05 10:51:24 dankogai Exp dankogai $
 *
 *  Licensed under the MIT license.
 *  http://www.opensource.org/licenses/mit-license.php
 *
 *  References:
 *      search.cpan.org/perldoc?Math::Complex
 */

(function(global) {
    if (global.Math.Complex) return;
    Math.Complex = function Complex(re, im) {
        if (re instanceof Math.Complex) {
            return new Math.Complex(re.re, re.im);
        } else if (this instanceof Math.Complex) {
            this.re = re ? 0 + re : 0;
            this.im = im ? 0 + im : 0;
        }else {
            return new Math.Complex(re, im);
        }
    };
    var CPLX = Math.Complex,
        j = new CPLX(0, 1),
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
    CPLX.I = j;
    (function(methods) {
        for (var p in methods) CPLX.prototype[p] = methods[p];
        for (var p in methods) CPLX[p] = (function(method) {
            return function(self) {
                if (! (self instanceof CPLX)) self = new CPLX(self);
                return method.apply(self, slice.call(arguments, 1));
            }
        })(methods[p]);
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
        add: function(that) {
            return (that.constructor === this.constructor)
                ? new CPLX(this.re + that.re, this.im + that.im)
                : new CPLX(this.re + that * 1, this.im);
        },
        sub: function(that) {
            return (that.constructor === this.constructor)
                ? new CPLX(this.re - that.re, this.im - that.im)
                : new CPLX(this.re - that * 1, this.im);
        },
        mul: function(that) {
            return (that.constructor === this.constructor)
                ? new CPLX(
                    this.re * that.re - this.im * that.im,
                    this.im * that.re + this.re * that.im
                )
                : new CPLX(this.re * (that * 1), this.im * (that * 1));
        },
        div: function(that) {
            if (that.constructor === this.constructor) {
                var d = that.re * that.re + that.im * that.im;
                if (d === 0) return new CPLX(this.re / 0, this.im / 0);
                return new CPLX(
                    (this.re * that.re + this.im * that.im) / d,
                    (this.im * that.re - this.re * that.im) / d
                );
            }else {
                return new CPLX(
                    this.re / (that * 1), this.im / (that * 1)
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
            return this.pow(0.5);
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
            }else {
                return this.eq(new CPLX(that, 0));
            }
        },
        ne: function(that) {
            return ! this.eq(that);
        }
    });
    /* functions exported for convenience */
    global.cplx = function(re, im) { return new CPLX(re, im) };
    global.cplxe = function(abs, arg) {
        return new CPLX(abs * Math.cos(arg), abs * Math.sin(arg));
    }
})(this);
