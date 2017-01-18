import React from 'react';

import { findDOMNode } from 'react-dom';
import {Link} from 'react-router';
import ReactPlayer from 'react-player';
import Duration from './Duration'
import screenfull from 'screenfull';



class VideoPlayer extends React.Component {
    constructor(props, context){
        super(props, context);
        this.router = context.router;
        this.sourceURL = props.location.query.src;
        this.state = {
            url:this.sourceURL,
            playing: true,
            volume: 0.8,
            played: 0,
            playbackRate: 1.0,
            loaded: 0,
            duration: 0,
            width : 480,
            height: 270
        }
        this.playPause = this.playPause.bind(this);
        this.onClickFullScreen = this.onClickFullScreen.bind(this);
        this.onSeekMouseDown = this.onSeekMouseDown.bind(this);
        this.onSeekChange = this.onSeekChange.bind(this);
        this.onSeekMouseUp = this.onSeekMouseUp.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.onBackOneSec = this.onBackOneSec.bind(this);
        this.onFwdOneSec =  this.onFwdOneSec.bind(this);
        this.onClickBackToPlayList = this.onClickBackToPlayList.bind(this);

    }

    playPause(){
        this.setState({playing: !this.state.playing})
    }

    onBackOneSec(){
        let played = this.state.played;
        let duration = this.state.duration;
        let backOneSec = ((played * duration) - 1) / duration
        this.setState({played : backOneSec ? backOneSec : played })
        this.player.seekTo(backOneSec ? backOneSec : played)

    }

    onFwdOneSec(){
        let played = this.state.played;
        let duration = this.state.duration;
        let fwdOneSec = ((played * duration) + 1) / duration
        this.setState({played : fwdOneSec ? fwdOneSec : played })
        this.player.seekTo(fwdOneSec ? fwdOneSec : played)
    }

    onSeekMouseDown(e){
        this.setState({seeking: true})
    }

    onSeekChange(e){
        this.setState({played: parseFloat(e.target.value) })
    }

    onSeekMouseUp(e){
        this.setState({seeking: false})
        this.player.seekTo(parseFloat(e.target.value))
    }

    onProgress(state){
        if (!this.state.seeking){
            this.setState(state)
        }
    }

    onClickFullScreen(){
        screenfull.request(findDOMNode(this.player))
    }

    onClickBackToPlayList(){
        this.props.router.push('/')
    }


    render(){

        const {
            url, playing, volume,
            played, loaded, duration,
            playbackRate, width, height
        } = this.state;
        return (
            <div>
                <h3>Video Player</h3>
                {/*<p><Link to="/" >Back</Link></p>*/}
                <ReactPlayer
                    ref = {player => {this.player = player}}
                    className="react-player"
                    width={width}
                    height={height}
                    url={url}
                    playing={playing}
                    playbackRate = {playbackRate}
                    volume = {volume}
                    onReady = {()=>console.log('onReady')}
                    onStart = {()=>console.log('onStart')}
                    onPlay = {() => this.setState({playing: true})}
                    onPause = {()=> this.setState({playing: false})}
                    onBuffer = {()=>console.log('onBuffer')}
                    onEnded = {()=> this.setState({playing:false})}
                    onError = {e => console.log('onError', e)}
                    onProgress = {this.onProgress}
                    onDuration={duration => this.setState({duration})}
                />

                <table>
                    <tbody>
                    <tr>
                        <th></th>
                        <td>
                            <button onClick={this.playPause}>{playing ? 'Pause' : 'Play'}</button>
                            <button onClick={this.onBackOneSec} >-1sec</button>
                            <button onClick={this.onFwdOneSec} >+1sec</button>
                            <button onClick={this.onClickFullScreen}>Fullscreen</button>
                            <button onClick={this.onClickBackToPlayList}>Back to Play List</button>

                        </td>
                    </tr>
                    <tr>
                        <th></th>
                        <td>
                            <input
                                type='range' min={0} max={1} step='any'
                                value={played}
                                onMouseDown={this.onSeekMouseDown}
                                onChange={this.onSeekChange}
                                onMouseUp={this.onSeekMouseUp}
                            />
                            <Duration seconds={duration * played} />/<Duration seconds={duration * (1 - played)} />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default VideoPlayer;