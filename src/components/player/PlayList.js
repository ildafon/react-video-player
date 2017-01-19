import React from 'react';
import {Link} from 'react-router';

const localPlayList = [
    {id:0, name: 'Big_buck bunny', src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'},
    {id:1, name: 'Jellyfish 3', src: 'http://jell.yfish.us/media/jellyfish-3-mbps-hd-h264.mkv'},
    {id:2, name: 'Jellyfish 5', src: 'http://jell.yfish.us/media/jellyfish-5-mbps-hd-h264.mkv'},
    {id:3, name: 'Jellyfish 10', src: 'http://jell.yfish.us/media/jellyfish-10-mbps-hd-h264.mkv'},



]

class PlayList extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <p>Playlist</p>
                <div>
                    <ul>
                    {localPlayList.map(video => (
                        <li key={video.id}><Link
                         to={{
                             pathname: `/video`,
                             query: { src: video.src}
                         }}
                        >
                            {video.name}
                        </Link></li>
                    ))}
                    </ul>
                </div>
            </div>

        )
    }
}

export default PlayList;