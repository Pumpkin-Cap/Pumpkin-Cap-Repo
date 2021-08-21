import React from 'react'
import { connect } from 'react-redux'
import { fetchLevels } from '../store/level'


class ListLevels extends React.Component {


    componentDidMount() {
        this.props.getLevels()
    }

    render() {
        return (
            <div>
                Hello!
            </div>
        )
    }

}


const mapState = state => ({
    levels: state.level
})

const mapDispatch = dispatch => ({
    getLevels: () => dispatch(fetchLevels())
})



export default connect(mapState,mapDispatch)(ListLevels)