






export const DocHTML = function(level) {

    const tests = level.tests

    return (`

        <div id="mocha"></div>
        <div id="error"></div>
        ` + tests.reduce((acc, test) => (
            acc += `<div id='${test.divId}'>${test.name}</div>`) + `\n`, '')
             + `


        <a id="link" href='/level/${level.id+1}?password=${level.password}' class="hidden">Go to the next Level!</a>

        `
    )

}

