const { expect } = require("chai");

//control flow level 1
describe('myLessThanFunction', function(){
  it('returns TRUE when given appropriate input', function(){
    expect(myLessThanFunction()).to.equal(true);
  });
});
describe('myGreaterThanFunction', function(){
  it('returns TRUE when given appropriate input', function(){
    expect(myGreaterThanFunction()).to.equal(true);
  });
});
describe('myEqualToFunction', function(){
  it('returns TRUE when given appropriate input', function(){
    expect(myEqualToFunction()).to.equal(true);
  });
});
describe('myNotEqualToFunction', function(){
  it('returns TRUE when given appropriate input', function(){
    expect(myNotEqualToFunction()).to.equal(true);
  });
});

//control flow level 2
describe('myIfFunction', function(){
  it('returns \'Hold your fire!!\' when no ducks are advancing', function(){
    expect(myIfFunction(0)).to.equal('Hold your fire!!');
  });
  it('returns \'Fire!!\' when ducks are advancing', function(){
    expect(myIfFunction(1)).to.equal('Fire!!');
    expect(myIfFunction(100)).to.equal('Fire!!');
  });
});

//control flow level 3
describe('myIfElseFunction', function(){
  it('returns \'Hold your fire!!\' when no ducks are advancing', function(){
    expect(myIfElseFunction(0)).to.equal('Hold your fire!!');
  });
  it('returns \'Fire the rifle!!\' when 1-2 ducks are advancing', function(){
    expect(myIfElseFunction(1)).to.equal('Fire the rifle!!');
    expect(myIfElseFunction(2)).to.equal('Fire the rifle!!');
  });
  it('returns \'Fire the cannon!!\' when 3-5 ducks are advancing', function(){
    expect(myIfElseFunction(3)).to.equal('Fire the cannon!!');
    expect(myIfElseFunction(5)).to.equal('Fire the cannon!!');
  });
  it('returns \'Fire the grenade launcher!!\' when 6+ ducks are advancing', function(){
    expect(myIfElseFunction(8)).to.equal('Fire the grenade launcher!!');
    expect(myIfElseFunction(100)).to.equal('Fire the grenade launcher!!');
  });
});

//control flow level 4
describe('myAndFunction', function(){
  it('returns TRUE when given appropriate input', function(){
    expect(myAndFunction()).to.equal(true);
  });
});
describe('myOrFunction', function(){
  it('returns FALSE when given appropriate input', function(){
    expect(myOrFunction()).to.equal(false);
  });
});

//control flow level 5
describe('myIfElseFunction', function(){
  it('returns \'Hold your fire!!\' when no ducks are advancing', function(){
    expect(myIfElseFunction(0, false)).to.equal('Hold your fire!!');
    expect(myIfElseFunction(0, true)).to.equal('Hold your fire!!');
  });
  it('returns \'Fire the rifle!!\' when 1-2 ducks are advancing without a shield', function(){
    expect(myIfElseFunction(1, false)).to.equal('Fire the rifle!!');
    expect(myIfElseFunction(1, true)).to.not.equal('Fire the rifle!!');
    expect(myIfElseFunction(2, false)).to.equal('Fire the rifle!!');
    expect(myIfElseFunction(2, true)).to.not.equal('Fire the rifle!!');
  });
  it('returns \'Fire the cannon!!\' when 3-5 ducks are advancing without a shield', function(){
    expect(myIfElseFunction(3, false)).to.equal('Fire the cannon!!');
    expect(myIfElseFunction(3, true)).to.not.equal('Fire the cannon!!');
    expect(myIfElseFunction(5, false)).to.equal('Fire the cannon!!');
    expect(myIfElseFunction(5, true)).to.not.equal('Fire the cannon!!');
  });
  it('returns \'Fire the grenade launcher!!\' when 6+ ducks are advancing without a shield', function(){
    expect(myIfElseFunction(8, false)).to.equal('Fire the grenade launcher!!');
    expect(myIfElseFunction(100, false)).to.equal('Fire the grenade launcher!!');
  });
  it('returns \'Fire the grenade launcher!!\' when any amount of ducks are advancing with a shield', function(){
    expect(myIfElseFunction(0, true)).to.not.equal('Fire the grenade launcher!!');
    expect(myIfElseFunction(1, true)).to.equal('Fire the grenade launcher!!');
    expect(myIfElseFunction(2, true)).to.equal('Fire the grenade launcher!!');
    expect(myIfElseFunction(3, true)).to.equal('Fire the grenade launcher!!');
    expect(myIfElseFunction(5, true)).to.equal('Fire the grenade launcher!!');
    expect(myIfElseFunction(8, true)).to.equal('Fire the grenade launcher!!');
    expect(myIfElseFunction(100, true)).to.equal('Fire the grenade launcher!!');
  });
});
