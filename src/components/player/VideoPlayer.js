import React from 'react';
import {Link} from 'react-router';
import ReactPlayer from 'react-player';

const ACTIVE = { color: 'red' }

class VideoPlayer extends React.Component {
    constructor(props){
        super(props);
        this.sourceURL = props.location.query.src
    }

    render(){
        return (
            <div>
                <h3>Video Player</h3>
                <p><Link to="/" activeStyle={ACTIVE} >Back</Link></p>
                <ReactPlayer url={this.sourceURL} playing/>
            </div>
        )
    }
}

export default VideoPlayer;