






export const DocHTML = function(level) {

    const tests = level.tests

    return (`
    <div style="font-family:Verdana">
        <div id="mocha"></div>
        <div id="error" class="failed"> It looks like there is a problem with your code. Double check you didn't make any syntax errors!</div>
        ` + tests.reduce((acc, test) => (
            acc += `<div>${test.description}</div><div class="hidden" id='${test.divId}'>${test.name}</div>`) + `\n`, '')
             + `</div>


        <a id="link" href='/level/${level.id+1}?password=${level.password}' class="hidden">Go to the next Level!</a>

        `
    )

}

