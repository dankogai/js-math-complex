/*
 * $Id: complex.js,v 0.7 2011/12/18 23:22:13 dankogai Exp dankogai $
 */

(function(global){
    if (global.Math.Complex) return;
    Math.Complex = function Complex(re, im){
	if (this instanceof Math.Complex){
	    this.re = 0 + re;
	    this.im = 0 + im;
	}else{
	    return new Math.Complex(re, im);
	}
    };
    var CPLX = Math.Complex;
    (function(methods){
	for (var p in methods) CPLX.prototype[p] = methods[p];
    })({
        toString:function(){
            var s =  '' + this.re;
            if (this.im) {
                if (this.im > 0) s+= '+';
                s += this.im;
                s += 'i';
            }
            return s;
        },
        neg:function(){
          return new CPLX(-this.re,-this.im);
        },
        con:function(){
          return new CPLX(this.re,-this.im);
        },
        arg:function(){
          return Math.atan2(this.im, this.re);
        },
        abs:function(){
          return Math.sqrt(this.re*this.re + this.im*this.im);
        },
        add:function(that){
            return (that.constructor === this.constructor)
                ? new CPLX(this.re + that.re, this.im + that.im)
                : new CPLX(this.re + that*1,  this.im);
        },
        sub:function(that){
            return (that.constructor === this.constructor)
                ? new CPLX(this.re - that.re, this.im - that.im)
                : new CPLX(this.re - that*1,  this.im);
        },
        mul:function(that){
            return (that.constructor === this.constructor)
                ? new CPLX(
                    this.re * that.re - this.im * that.im, 
                    this.im * that.re + this.re * that.im
                )
                : new CPLX(this.re * (that*1),  this.im * (that*1));
        },
        div:function(that){
            if (that.constructor === this.constructor){
                var d = that.re * that.re + that.im * that.im;
                if (d === 0) return new CPLX(this.re/0, this.im/0);
                return new CPLX(
                    (this.re * that.re + this.im * that.im) / d, 
                    (this.im * that.re - this.re * that.im) / d
                );
            }else{
                return new CPLX(
                    this.re / (that*1),  this.im / (that*1)
                );
            }
        },
        exp:function(){
            var abs = Math.exp(this.re);
            var arg = this.im;
            return new CPLX(abs*Math.cos(arg), abs*Math.sin(arg));
        },
        log:function(){
            return new CPLX(
                Math.log(this.abs()),
                this.arg()
            );
        },
        pow:function(that){
            if (that.constructor === this.constructor){
                return that.mul(this.log()).exp();                
            }else{
                if (this.re < 0) return this.pow(new CPLX(that, 0));
                var abs = Math.pow(this.abs(), that*1);
                var arg = this.arg() * that*1;
                return new CPLX(
                    abs * Math.cos(arg),
                    abs * Math.sin(arg)
                );
            }
        },
        eq:function(that){
            if (that.constructor === this.constructor){
                return this.re === that.re && this.im === that.im;
            }else{
                return this.eq(new CPLX(that, 0));
            }
        },
	ne:function(that){
	    return ! this.eq(that);
	    }
    });
    /* functions exported for convenience */
    global.cplx  = function(re, im){ return new CPLX(re, im) };
    global.cplxe = function(abs, arg){
	return new CPLX(abs*Math.cos(arg), abs*Math.sin(arg));
    }
})(this);
