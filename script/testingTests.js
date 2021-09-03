describe('myWhileLoopFunction', function(){
  it("returns the appropriate time that it'll take for a duck to reach us", function(){
    expect(myWhileLoopFunction(20)).to.equal(10);
    expect(myWhileLoopFunction(10)).to.equal(5);
    expect(myWhileLoopFunction(4)).to.equal(2);
    expect(myWhileLoopFunction(9)).to.equal(5);
  });
});

describe('myForLoopFunction', function(){
  it('returns 10', function(){
    expect(myForLoopFunction()).to.equal(10);
  });
});
