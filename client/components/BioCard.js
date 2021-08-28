import React from 'react'
import Anime from 'react-anime'


class BioCard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

                }
    }

    render() {
        return (
            <div className="singleCardContainer">
                <h3>{this.props.name}</h3>
                <img src={this.props.picture} style={{width: "200px", paddingBottom: "15px"}}/>
                <div>{this.props.bio}</div>
            </div>
        )
    }
}

export default BioCard;
