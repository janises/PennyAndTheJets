import React, {Component} from 'react';

export default class PageNotFound extends Component {
    render() {
        return (
            <div className='page-not-found-container'>
                <h1 className="page-not-found-h1">THIS PAGE DOES NOT EXIST</h1>

                <div className='parallax-container'>
                    <div className="userpage-clouds"></div>
                    <div className="far-mountains"></div>
                    <div className="mountains"></div>
                    <div className="trees"></div>
                    <div className="bushes"></div>
                    <div className="userpage-penguin"></div>
                    <div className="grass"></div>
                    
                </div>
                <div className="ground"></div>
            </div>
        )
    }
}