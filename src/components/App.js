import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Template from './core/Template';
import PlayList from './player/PlayList';
import VideoPlayer from './player/VideoPlayer';
import PlayerHTML5video from './player/PlayerHTML5video'

export default (props) => {
    return(

        <Router history={browserHistory}>
            <Route path="/" component={Template}>
                <IndexRoute component={PlayList}/>
                <Route path="video" component={VideoPlayer}/>
                <Route path="video2" component={PlayerHTML5video}/>
            </Route>
        </Router>

    )
}