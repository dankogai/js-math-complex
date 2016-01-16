/*
 * use mocha to test me
 * http://visionmedia.github.com/mocha/
 */
if (this['window'] !== this) {
    require('./helper.js');
    require('../math-complex.js');
}

(function(root){
    var C = Math.Complex;
    describe('Math.Complex', function(){
        'use strict';
        var z0 = C(0, 0), z1 = C(1, 1);
        it('""+z0', eq(''+z0, '0'));
        it('""+z1', eq(''+z1, '1+1i'));
        it('z1.neg()', ok(z1.neg().eq(C(-1,-1))));
        it('z1.con()', ok(z1.con().eq(C( 1,-1))));
        it('z1.abs()', ok(z1.abs() === Math.SQRT2));
        it('z1.arg()', ok(z1.arg() === Math.PI/4));
        it('z1.add(z1)', ok(z1.add(z1).eq(C(2,2))));
        it('z1.sub(z1)', ok(z1.sub(z1).eq(C(0,0))));
        it('z1.mul(2)', ok(z1.mul(2).eq(C(2,2))));
        it('z1.mul(z1)', ok(z1.mul(z1).eq(C(0,2))));
        it('z1.div(2)', ok(z1.div(2).eq(C(0.5,0.5))));
        it('z1.div(z1)', ok(z1.div(z1).eq(C(1, 0))));
        it('z1.div(0)', ok(z1.div(0).eq(C(1/0, 1/0))));
        it('z1.exp()',
           ok(z1.exp().approx(C(1.4686939399158851, 2.2873552871788423))));
        it('z1.log()',
           ok(z1.log().approx(C(0.3465735902799727, 0.7853981633974483))));
        it('z1.pow(z1)',
           ok(z1.pow(z1).approx(C(0.2739572538301211, 0.5837007587586147))));
        it('z1.sqrt()',
           ok(z1.sqrt().approx(C(1.09868411346781, 0.4550898605622274))));
        it('z1.sin()',
           ok(z1.sin().approx(C(1.2984575814159773, 0.6349639147847361))));
        it('z1.cos()',
           ok(z1.cos().approx(C(0.833730025131149, -0.9888977057628651))));
        it('z1.tan()',
           ok(z1.tan().approx(C(0.21762156185440265, -0.8680141428959249))));
        it('z1.asin()',
           ok(z1.asin().approx(C(0.6662394324925153, 1.0612750619050355))));
        it('z1.acos()',
           ok(z1.acos().approx(C(0.9045568943023813, -1.0612750619050357))));
        it('z1.atan()',
           ok(z1.atan().approx(C(1.5707963267948966, 0))));
    });    
})(this);
