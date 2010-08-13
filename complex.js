/*
 * $Id: base64.js,v 1.1 2009/03/01 22:38:45 dankogai Exp dankogai $
 */

(function(){
    if (Math.Complex) return;
    Math.Complex = function(re, im){
	   this.re = re;
	   this.im = im;
    };
    Math.Complex.prototype = {
        toString:function(){
            var s = '';
            if (this.re) s += this.re;
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
        add:function(that){
            return (that.constructor === this.constructor)
                ? new Math.Complex(this.re + that.re, this.im + that.im)
                : new Math.Complex(this.re + that*1,  this.im);
        },
        sub:function(that){
            return (that.constructor === this.constructor)
                ? new Math.Complex(this.re - that.re, this.im + that.im)
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
                return new Math.Complex(this.re / (that*1),  this.im / (that*1));
            }
        },
    };
})();