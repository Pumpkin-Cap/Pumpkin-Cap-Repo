



export const DocMocha = function (level) {

const tests = level.tests

return (`
    mocha.setup('bdd');
    let assert = chai.assert;
    let expect = chai.expect;

    const testDivs = [`+ tests.map(test => (`document.getElementById('` + test.divId + `')`)) + `]
    const testResults = []

    before(function() {
      const errorDiv = document.getElementById('error')
      errorDiv.className = "hidden"
        // runs once before the first test in this block
      });

     after(function() {
        parent.postMessage(JSON.stringify(testResults),"http://localhost:8080");
        //parent.postMessage(JSON.stringify(testResults),"https://fullstack-warfare.herokuapp.com/");
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
        testResults.push(duck.innerText)
      }


    ` +
    tests.reduce((acc, test) => (
      acc += test.test + `\n`), '')
      +
    `


    mocha.run()`)
}


