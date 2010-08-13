/*
 * $Id: complex.js,v 0.4 2010/08/13 19:18:44 dankogai Exp dankogai $
 */

(function(){
    if (Math.Complex) return;
    Math.Complex = function(re, im){
	   this.re = re ? re : 0;
	   this.im = im ? im : 0;
    };
    Math.Complex.prototype = {
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
          return new Math.Complex(-this.re,-this.im);
        },
        con:function(){
          return new Math.Complex(this.re,-this.im);
        },
        arg:function(){
          return Math.atan2(this.im, this.re);
        },
        abs:function(){
          return Math.sqrt(this.re*this.re + this.im*this.im);
        },        
        add:function(that){
            return (that.constructor === this.constructor)
                ? new Math.Complex(this.re + that.re, this.im + that.im)
                : new Math.Complex(this.re + that*1,  this.im);
        },
        sub:function(that){
            return (that.constructor === this.constructor)
                ? new Math.Complex(this.re - that.re, this.im - that.im)
                : new Math.Complex(this.re - that*1,  this.im);
        },
        mul:function(that){
            return (that.constructor === this.constructor)
                ? new Math.Complex(
                    this.re * that.re - this.im * that.im, 
                    this.im * that.re + this.re * that.im
                )
                : new Math.Complex(this.re * (that*1),  this.im * (that*1));
        },
        div:function(that){
            if (that.constructor === this.constructor){
                var d = that.re * that.re + that.im * that.im;
                return new Math.Complex(
                    (this.re * that.re + this.im * that.im) / d, 
                    (this.im * that.re - this.re * that.im) / d
                );
            }else{
                return new Math.Complex(
		    this.re / (that*1),  this.im / (that*1)
	        );
            }
        },
        exp:function(){
            var abs = Math.exp(this.re);
            var arg = this.im;
        　　return new Math.Complex(abs*Math.cos(arg), abs*Math.sin(arg));
        },
        log:function(){
            return new Math.Complex(
                Math.log(this.abs()),
                this.arg()
            );
        },
        pow:function(that){
            if (that.constructor === this.constructor){
                return that.mul(this.log()).exp();                
            }else{
                if (this.re < 0) return this.pow(new Math.Complex(that, 0));
                var abs = Math.pow(this.abs(), that*1);
                var arg = this.arg() * that*1;
                return new Math.Complex(
                    abs * Math.cos(arg),
                    abs * Math.sin(arg)
                );
            }
        },
        eq:function(that){
            if (that.constructor === this.constructor){
                return this.re === that.re && this.im === that.im;
            }else{
                return this.eq(new Math.Complex(that, 0));
            }
        },
        lt:function(that){
            if (that.constructor === this.constructor){
                return this.re === that.re && this.im === that.im;
            }else{
                return this.lt(new Math.Complex(that, 0));
            }
        },
    };
    /* functions exported for convenience */
    cplx  = function(re, im){ return new Math.Complex(re, im) };
    cplxe = function(abs, arg){
      return new Math.Complex(abs*Math.cos(arg), abs*Math.sin(arg));
    }
})();