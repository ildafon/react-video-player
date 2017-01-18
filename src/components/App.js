import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Template from './core/Template';
import PlayList from './player/PlayList';
import VideoPlayer from './player/VideoPlayer';

export default (props) => {
    return(

        <Router history={browserHistory}>
            <Route path="/" component={Template}>
                <IndexRoute component={PlayList}/>
                <Route path="/:id" component={VideoPlayer}/>
            </Route>
        </Router>

    )
}