



export const DocMocha = function (level) {


    // const testobject = {

    //     id: 1,
    //     name: 'test1',
    //     test: `

        // describe('myFunction', function() {
        //   it('should call the callback function', function() {
        //     var callback = sinon.spy();

        //     myFunction(false, callback);

        //     assert(callback.calledOnce);

        //   })
        // });

    //     `,
    //     divId: 'duck',
    //     levelId: 1
    // }

const tests = level.tests

return (`
    mocha.setup('bdd');
    let assert = chai.assert;
    let expect = chai.expect;

    const testDivs = [`+ tests.map(test => (`document.getElementById('` + test.divId + `')`)) + `]

    before(function() {
        console.log(testDivs)
        // runs once before the first test in this block
      });

     after(function() {
         if (testDivs.every(div => (div.innerText === 'PASSED'))) {
             const resultLink = document.getElementById('link')
             resultLink.target = '_top'
             resultLink.className = ''
         }
        // runs once after the last test in this block
      });


      afterEach(function() {
        checkResult(this.currentTest)
        })

      function checkResult(test) {
        console.log(test)
        const duck = document.getElementById(test.title)
        if (test.state === 'passed') {
          duck.innerText = 'PASSED'
        } else {
          duck.innerText = 'FAILED'
        }
      }

      try {

    ` +
    tests.reduce((acc, test) => (
      acc += test.test + `\n`), '')
      +
    `
    } catch (err) {
      const errorDiv = document.getElementById('error')
      errorDiv.innerText = error
    }
    mocha.run()`)
}


