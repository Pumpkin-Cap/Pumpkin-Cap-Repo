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
                <div style={{height: "200px", display:"flex", justifyContent:"center", paddingBottom: "15px"}}><img src={this.props.picture}/></div>
                <div style={{display:"flex", alignContent:"flex-end"}}><div className="singleCardText">{this.props.bio}</div></div>
            </div>
        )
    }
}

export default BioCard;
