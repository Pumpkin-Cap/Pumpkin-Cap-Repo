






export const DocHTML = function(level) {

    const tests = level.tests

    return (`
                
        <div id="mocha"></div>
        ` + tests.reduce((acc, test) => (
            acc += `<div id='${test.divId}'>${test.name}</div>`) + `\n`, '')
             + `


        <a id="link" href='/level/list?password=megaman' class="hidden">Go to the next Level!</a>

        `
    )

}

