/*
 * use mocha to test me
 * http://visionmedia.github.com/mocha/
 */
if (this['window'] !== this) {
    require('./helper.js');
    require('../math-complex.js');
}

(function(root){
    var cplx = Math.Complex, cplxe = Math.Complex.polar;
    describe('Math.Complex', function(){
        'use strict';
        var c0 = cplx(0, 0), c1 = cplx(1, 1);
        it('""+c0', eq(''+c0, '0'));
        it('""+c1', eq(''+c1, '1+1i'));
        it('c1.neg()', ok(c1.neg().eq(cplx(-1,-1))));
        it('c1.con()', ok(c1.con().eq(cplx( 1,-1))));
        it('c1.abs()', ok(c1.abs() === Math.SQRT2));
        it('c1.arg()', ok(c1.arg() === Math.PI/4));
        it('c1.add(c1)', ok(c1.add(c1).eq(cplx(2,2))));
        it('c1.sub(c1)', ok(c1.sub(c1).eq(cplx(0,0))));
        it('c1.mul(2)', ok(c1.mul(2).eq(cplx(2,2))));
        it('c1.mul(c1)', ok(c1.mul(c1).eq(cplx(0,2))));
        it('c1.div(2)', ok(c1.div(2).eq(cplx(0.5,0.5))));
        it('c1.div(c1)', ok(c1.div(c1).eq(cplx(1, 0))));
        it('c1.div(0)', ok(c1.div(0).eq(cplx(1/0, 1/0))));
        it('c1.exp()', 
           ok(c1.exp().eq(cplx(1.4686939399158851, 2.2873552871788423))));
        it('c1.log()', 
           ok(c1.log().eq(cplx(0.3465735902799727, 0.7853981633974483))));
        it('c1.pow(c1)',
           ok(c1.pow(c1).eq(cplx(0.2739572538301211, 0.5837007587586147))));
        it('c1.sqrt()', 
           ok(c1.sqrt().eq(cplx(1.09868411346781, 0.4550898605622274))));
        it('c1.sin()',
           ok(c1.sin().eq(cplx(1.2984575814159773, 0.6349639147847361))));
        it('c1.cos()',
           ok(c1.cos().eq(cplx(0.833730025131149, -0.9888977057628651))));
        it('c1.tan()',
           ok(c1.tan().eq(cplx(0.21762156185440265, -0.8680141428959249))));
        it('c1.asin()',
           ok(c1.asin().eq(cplx(0.6662394324925153, 1.0612750619050355))));
        it('c1.acos()',
           ok(c1.acos().eq(cplx(0.9045568943023813, -1.0612750619050357))));
        it('c1.atan()',
           ok(c1.atan().eq(cplx(1.5707963267948966, 0))));
        it('c1.atan2(c1)',
           ok(c1.atan2(c1).eq(c1.atan().div(2))));
    });    
})(this);
