import React from 'react';
import { connect } from 'react-redux';
import { fetchLevels } from '../store/level';
import { Link } from 'react-router-dom';


class ListLevels extends React.Component {


    componentDidMount() {
        this.props.getLevels()
    }

    render() {
        const { levels } = this.props
        return (
            <div className="levelListContainer">
                {Array.isArray(levels) && levels.map(level => (
                    <div className="level" key={level.id}>
                        <Link to={`/level/${level.id}`}>Go to level {level.id}</Link>
                        </div>
                ))}
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
