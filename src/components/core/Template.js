import React from 'react';
import Header from './Header';
import Footer from './Footer';

class Template extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (

            <div>
                <Header/>
                {this.props.children}
                <Footer/>
            </div>
        );
    }
}

export default Template;