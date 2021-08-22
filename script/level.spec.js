const { expect } = require("chai");

//control flow level 1
describe('myLessThanFunction', function(){
  it('returns TRUE when given appropriate input', function(){
    expect(myLessThanFunction()).toBe(true);
  });
});
describe('myGreaterThanFunction', function(){
  it('returns TRUE when given appropriate input', function(){
    expect(myGreaterThanFunction()).toBe(true);
  });
});
describe('myEqualToFunction', function(){
  it('returns TRUE when given appropriate input', function(){
    expect(myEqualToFunction()).toBe(true);
  });
});
describe('myNotEqualToFunction', function(){
  it('returns TRUE when given appropriate input', function(){
    expect(myNotEqualToFunction()).toBe(true);
  });
});

//control flow level 2
describe('myIfFunction', function(){
  it('returns \'Hold your fire!!\' when no ducks are advancing', function(){
    expect(myIfFunction(0)).toBe('Hold your fire!!');
    expect(myIfFunction(1)).not.toBe('Hold your fire!!');
    expect(myIfFunction(100)).not.toBe('Hold your fire!!');
  });
  it('returns \'Fire!!\' when ducks are advancing', function(){
    expect(myIfFunction(0)).not.toBe('Fire!!');
    expect(myIfFunction(1)).toBe('Fire!!');
    expect(myIfFunction(100)).toBe('Fire!!');
  });
});

//control flow level 3
describe('myIfElseFunction', function(){
  it('returns \'Hold your fire!!\' when no ducks are advancing', function(){
    expect(myIfElseFunction(0)).toBe('Hold your fire!!');
    expect(myIfElseFunction(1)).not.toBe('Hold your fire!!');
    expect(myIfElseFunction(2)).not.toBe('Hold your fire!!');
    expect(myIfElseFunction(3)).not.toBe('Hold your fire!!');
    expect(myIfElseFunction(5)).not.toBe('Hold your fire!!');
    expect(myIfElseFunction(8)).not.toBe('Hold your fire!!');
    expect(myIfElseFunction(100)).not.toBe('Hold your fire!!');
  });
  it('returns \'Fire the rifle!!\' when 1-2 ducks are advancing', function(){
    expect(myIfElseFunction(0)).not.toBe('Fire the rifle!!');
    expect(myIfElseFunction(1)).toBe('Fire the rifle!!');
    expect(myIfElseFunction(2)).toBe('Fire the rifle!!');
    expect(myIfElseFunction(3)).not.toBe('Fire the rifle!!');
    expect(myIfElseFunction(5)).not.toBe('Fire the rifle!!');
    expect(myIfElseFunction(8)).not.toBe('Fire the rifle!!');
    expect(myIfElseFunction(100)).not.toBe('Fire the rifle!!');
  });
  it('returns \'Fire the cannon!!\' when 3-5 ducks are advancing', function(){
    expect(myIfElseFunction(0)).not.toBe('Fire the cannon!!');
    expect(myIfElseFunction(1)).not.toBe('Fire the cannon!!');
    expect(myIfElseFunction(2)).not.toBe('Fire the cannon!!');
    expect(myIfElseFunction(3)).toBe('Fire the cannon!!');
    expect(myIfElseFunction(5)).toBe('Fire the cannon!!');
    expect(myIfElseFunction(8)).not.toBe('Fire the cannon!!');
    expect(myIfElseFunction(100)).not.toBe('Fire the cannon!!');
  });
  it('returns \'Fire the grenade launcher!!\' when 6+ ducks are advancing', function(){
    expect(myIfElseFunction(0)).not.toBe('Fire the grenade launcher!!');
    expect(myIfElseFunction(1)).not.toBe('Fire the grenade launcher!!');
    expect(myIfElseFunction(2)).not.toBe('Fire the grenade launcher!!');
    expect(myIfElseFunction(3)).not.toBe('Fire the grenade launcher!!');
    expect(myIfElseFunction(5)).not.toBe('Fire the grenade launcher!!');
    expect(myIfElseFunction(8)).toBe('Fire the grenade launcher!!');
    expect(myIfElseFunction(100)).toBe('Fire the grenade launcher!!');
  });
});

//control flow level 4
describe('myAndFunction', function(){
  it('returns TRUE when given appropriate input', function(){
    expect(myAndFunction()).toBe(true);
  });
});
describe('myOrFunction', function(){
  it('returns FALSE when given appropriate input', function(){
    expect(myOrFunction()).toBe(false);
  });
});

//control flow level 5
describe('myIfElseFunction', function(){
  it('returns \'Hold your fire!!\' when no ducks are advancing', function(){
    expect(myIfElseFunction(0, false)).toBe('Hold your fire!!');
    expect(myIfElseFunction(0, true)).toBe('Hold your fire!!');
    expect(myIfElseFunction(1, false)).not.toBe('Hold your fire!!');
    expect(myIfElseFunction(1, true)).not.toBe('Hold your fire!!');
    expect(myIfElseFunction(2, false)).not.toBe('Hold your fire!!');
    expect(myIfElseFunction(2, true)).not.toBe('Hold your fire!!');
    expect(myIfElseFunction(3, false)).not.toBe('Hold your fire!!');
    expect(myIfElseFunction(3, true)).not.toBe('Hold your fire!!');
    expect(myIfElseFunction(5, false)).not.toBe('Hold your fire!!');
    expect(myIfElseFunction(5, true)).not.toBe('Hold your fire!!');
    expect(myIfElseFunction(8, false)).not.toBe('Hold your fire!!');
    expect(myIfElseFunction(8, true)).not.toBe('Hold your fire!!');
    expect(myIfElseFunction(100, false)).not.toBe('Hold your fire!!');
    expect(myIfElseFunction(100, true)).not.toBe('Hold your fire!!');
  });
  it('returns \'Fire the rifle!!\' when 1-2 ducks are advancing without a shield', function(){
    expect(myIfElseFunction(0, false)).not.toBe('Fire the rifle!!');
    expect(myIfElseFunction(0, true)).not.toBe('Fire the rifle!!');
    expect(myIfElseFunction(1, false)).toBe('Fire the rifle!!');
    expect(myIfElseFunction(1, true)).not.toBe('Fire the rifle!!');
    expect(myIfElseFunction(2, false)).toBe('Fire the rifle!!');
    expect(myIfElseFunction(2, true)).not.toBe('Fire the rifle!!');
    expect(myIfElseFunction(3, false)).not.toBe('Fire the rifle!!');
    expect(myIfElseFunction(3, true)).not.toBe('Fire the rifle!!');
    expect(myIfElseFunction(5, false)).not.toBe('Fire the rifle!!');
    expect(myIfElseFunction(5, true)).not.toBe('Fire the rifle!!');
    expect(myIfElseFunction(8, false)).not.toBe('Fire the rifle!!');
    expect(myIfElseFunction(8, true)).not.toBe('Fire the rifle!!');
    expect(myIfElseFunction(100, false)).not.toBe('Fire the rifle!!');
    expect(myIfElseFunction(100, true)).not.toBe('Fire the rifle!!');
  });
  it('returns \'Fire the cannon!!\' when 3-5 ducks are advancing without a shield', function(){
    expect(myIfElseFunction(0, false)).not.toBe('Fire the cannon!!');
    expect(myIfElseFunction(0, true)).not.toBe('Fire the cannon!!');
    expect(myIfElseFunction(1, false)).not.toBe('Fire the cannon!!');
    expect(myIfElseFunction(1, true)).not.toBe('Fire the cannon!!');
    expect(myIfElseFunction(2, false)).not.toBe('Fire the cannon!!');
    expect(myIfElseFunction(2, true)).not.toBe('Fire the cannon!!');
    expect(myIfElseFunction(3, false)).toBe('Fire the cannon!!');
    expect(myIfElseFunction(3, true)).not.toBe('Fire the cannon!!');
    expect(myIfElseFunction(5, false)).toBe('Fire the cannon!!');
    expect(myIfElseFunction(5, true)).not.toBe('Fire the cannon!!');
    expect(myIfElseFunction(8, false)).not.toBe('Fire the cannon!!');
    expect(myIfElseFunction(8, true)).not.toBe('Fire the cannon!!');
    expect(myIfElseFunction(100, false)).not.toBe('Fire the cannon!!');
    expect(myIfElseFunction(100, true)).not.toBe('Fire the cannon!!');
  });
  it('returns \'Fire the grenade launcher!!\' when 6+ ducks are advancing without a shield', function(){
    expect(myIfElseFunction(0, false)).not.toBe('Fire the grenade launcher!!');
    expect(myIfElseFunction(0, true)).not.toBe('Fire the grenade launcher!!');
    expect(myIfElseFunction(1, false)).not.toBe('Fire the grenade launcher!!');
    expect(myIfElseFunction(1, true)).not.toBe('Fire the grenade launcher!!');
    expect(myIfElseFunction(2, false)).not.toBe('Fire the grenade launcher!!');
    expect(myIfElseFunction(2, true)).not.toBe('Fire the grenade launcher!!');
    expect(myIfElseFunction(3, false)).not.toBe('Fire the grenade launcher!!');
    expect(myIfElseFunction(3, true)).not.toBe('Fire the grenade launcher!!');
    expect(myIfElseFunction(5, false)).not.toBe('Fire the grenade launcher!!');
    expect(myIfElseFunction(5, true)).not.toBe('Fire the grenade launcher!!');
    expect(myIfElseFunction(8, false)).toBe('Fire the grenade launcher!!');
    expect(myIfElseFunction(100, false)).toBe('Fire the grenade launcher!!');
  });
  it('returns \'Fire the grenade launcher!!\' when any amount of ducks are advancing with a shield', function(){
    expect(myIfElseFunction(0, false)).not.toBe('Fire the grenade launcher!!');
    expect(myIfElseFunction(0, true)).not.toBe('Fire the grenade launcher!!');
    expect(myIfElseFunction(1, false)).not.toBe('Fire the grenade launcher!!');
    expect(myIfElseFunction(1, true)).toBe('Fire the grenade launcher!!');
    expect(myIfElseFunction(2, false)).not.toBe('Fire the grenade launcher!!');
    expect(myIfElseFunction(2, true)).toBe('Fire the grenade launcher!!');
    expect(myIfElseFunction(3, false)).not.toBe('Fire the grenade launcher!!');
    expect(myIfElseFunction(3, true)).toBe('Fire the grenade launcher!!');
    expect(myIfElseFunction(5, false)).not.toBe('Fire the grenade launcher!!');
    expect(myIfElseFunction(5, true)).toBe('Fire the grenade launcher!!');
    expect(myIfElseFunction(8, false)).toBe('Fire the grenade launcher!!');
    expect(myIfElseFunction(8, true)).toBe('Fire the grenade launcher!!');
    expect(myIfElseFunction(100, false)).toBe('Fire the grenade launcher!!');
    expect(myIfElseFunction(100, true)).toBe('Fire the grenade launcher!!');
  });
});
