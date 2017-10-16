
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';


import cloud1 from './../../img/cloud1.png';
import cloud2 from './../../img/cloud2.png';
import cloud3 from './../../img/cloud3.png';
import haze from './../../img/haze2.png';
import {TimelineLite, TweenLite} from 'gsap';
import gameLogo2 from './../../img/game-logo2.png';
require('dotenv').config();


export default class Landing extends Component {

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);

        $(window).scroll(function(){
            const scroll = $(this).scrollTop();
                $('.cloud1').css({
                    'transform': `translate(${scroll/10}%, 0px` 
                });
                $('.cloud2').css({
                    'transform': `translate(-${scroll/10}%, 0px` 
                });
                $('.cloud3').css({
                    'transform': `translate(-${scroll/10}%, 0px`
                });           
        })
    }


    render(){

        return (
            <div className="landing-container">
                <div className="haze"></div>
                <img className="cloud1" ref="cloud1" src={cloud1} alt=''/>
                <img className="cloud2" ref="cloud2" src={cloud2} alt=''/>
                <img className="cloud3" ref="cloud3" src={cloud3} alt=''/>
                <div className="landing-page-peng"></div>
                <div className='login-container'>
                    <div className="landing-title">
                        <h1>PENNY AND THE JETS</h1>
                    </div>
                   
                    <div className="about">
                        <h1>PENNY</h1>
                        <p>Penny is tired of society telling her that she can't fly. As a strong, independent penguin, she won't let the patriarchy tell her what to do. She loves to skydive, and she often waits until the last second before she deploys her parachute to get maximum flight time.</p>
                    </div>
                    <div className="about-game">
                        <h1>GAME</h1>
                        <p>The planes and other birds flaunt their aerial privileges and try to stop her descent. Use the arrow keys to move Penny left and right so she can continue her flight. Collect the clouds and mini-parachutes for bonus points!</p>
                    </div>
                    <div className="button-container">
                        <a className='login' href ={process.env.REACT_APP_LOGIN}><button className='login-button btn'>LOGIN</button></a>
                        <Link to='/instructions'> 
                            <button className='continue btn'>CONTINUE WITHOUT LOGGING IN</button>
                        </Link>
                    </div>
                   

                    <div className="landing-plane" style={{"height":"90px", "width":"150px"}}></div>
                    <div className='landing-bird bird1'></div>
                    <div className='landing-bird bird2'></div>
                    <div className='landing-bird bird3'></div>
                </div>
            </div>
            
        )
    }
}
