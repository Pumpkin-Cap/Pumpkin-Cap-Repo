import React from 'react'
import { connect } from 'react-redux'
import Anime from 'react-anime';

class TutorialDuckList extends React.Component {

    constructor(props) {
        super(props)
    }



    render() {

        console.log(this.props.results)

        const testResults = this.props.results || []

        return (

			<div className='duckDiv'>
            {this.props.tests.map((test,index) => {
                if (testResults[index] === 'PASSED') {
                    return (
                    <div className="duckTestCard" key={index}>
                        <Anime
                            duration={3000}
                            rotate={[0, 20, 0, -20]}
                            loop={true}
                            direction={'alternate'}>
                            <img src='../theDocileRubberDuck.png' className='goodDuck'></img>
                        </Anime>
                        <div className="testDescription">{test.description}</div>
                    </div>
                    )
                } else {
                    return (
                    <div className="duckTestCard" key={index}>
                        <Anime
                            duration={3000}
                            rotate={[0, -20, 0, 20]}
                            scale={[this.props.scale/2]}
                            loop={true}
                            direction={'alternate'}>
                            <img src='../theEvilRubberDuck.png' className='evilDuck'></img>
                        </Anime>
                        <div className="testDescription">{test.description}</div>
                    </div>
                    )
                }})}
            </div>
        )
    }



}


const mapState = state => ({
    tests: state.tutorial.tests
})


export default connect(mapState)(TutorialDuckList)
