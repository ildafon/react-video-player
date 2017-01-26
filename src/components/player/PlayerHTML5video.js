import Video from 'react-html5video';
import React from 'react';





class PlayerHTML5video extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.sourceURL = props.location.query.src;
    }


    render(){


        return (
            <div>
                <h3>Video Player</h3>

                <Video controls autoPlay loop mutedb>
                <source src={this.sourceURL} type="video/mp4" />
                </Video>
            </div>
        )
    }
}

export default PlayerHTML5video;