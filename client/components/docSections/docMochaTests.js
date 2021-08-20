



export const DocMocha = function () {


    const testobject = {

        id: 1,
        name: 'test1',
        test: `
      
        describe('myFunction', function() {
          it('should call the callback function', function() {
            var callback = sinon.spy();
        
            myFunction(true, callback);
        
            assert(callback.calledOnce);
            
          })
        
        afterEach(function() {
            checkResult(this.currentTest)
            })
        });
        
        function checkResult(test) {
          const duck = document.getElementById('duck')
          if (test.state === 'passed') {
            duck.innerText = 'PASSED'
          } else {
            duck.innerText = 'FAILED'
          }
        }`,
        testDiv: '<div id="duck1">Duck</div>',
        levelId: 1
    }


const tests = [testobject]

return (
    `mocha.setup('bdd');
    var assert = chai.assert;` + 
    tests.map(test => (test.test)) +
    `mocha.run()`)
}


