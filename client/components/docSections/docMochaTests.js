



export const DocMocha = function (level) {

const tests = level.tests

return (`
    mocha.setup('bdd');
    let assert = chai.assert;
    let expect = chai.expect;

    const testDivs = [`+ tests.map(test => (`document.getElementById('` + test.divId + `')`)) + `]

    before(function() {
      const errorDiv = document.getElementById('error')
      errorDiv.className = "hidden"
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
        const duck = document.getElementById(test.title)
        if (test.state === 'passed') {
          duck.className = 'passed'
          duck.innerText = 'PASSED'
        } else {
          duck.className = 'failed'
          duck.innerText = 'FAILED'
        }
      }


    ` +
    tests.reduce((acc, test) => (
      acc += test.test + `\n`), '')
      +
    `
    

    mocha.run()`)
}


