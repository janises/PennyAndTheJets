import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import cloud1 from './../../img/cloud1.png';
import cloud2 from './../../img/cloud2.png';
import cloud3 from './../../img/cloud3.png';
import haze from './../../img/haze2.png';


export default class Landing extends Component {

    componentDidMount(){
        $(window).scroll(function(){
            const cloudScroll = $(this).scrollTop();
            
                    $('.cloud1').css({
                        'transform': `translate(${cloudScroll/10}%, 0px` 
                    });
                    $('.cloud2').css({
                        'transform': `translate(-${cloudScroll/10}%, 0px` 
                    });
                    $('.cloud3').css({
                        'transform': `translate(-${cloudScroll/15}%, 0px`
                    });
                    $('.haze').css({
                        'transform': `translate(0px, -${cloudScroll/50}%`
                    });
                  
        })
      

    }

    render(){

        return (
            <div className="landing-container">
            
                <img className="haze" ref='haze' src={haze} alt=""/>
                <img className="cloud1" ref="cloud1" src={cloud1} alt=''/>
                <img className="cloud2" ref="cloud2" src={cloud2} alt=''/>
                <img className="cloud3" ref="cloud3" src={cloud3} alt=''/>
                <div className="landing-page-peng"></div>

                <div className='login-container'>
                <div className="landing-plane" style={{"height":"90px", "width":"150px"}}></div>
                   
                    <a className='login' href = 'http://localhost:8000/auth'><button className='login-button btn'>LOGIN</button></a>
                    <Link to='/instructions'> 
                        <button className='continue btn'>CONTINUE WITHOUT LOGGING IN</button>
                    </Link>

                    <div className='landing-bird bird1'></div>
                    <div className='landing-bird bird2'></div>
                    <div className='landing-bird bird3'></div>
                </div>
            </div>
            
        )
    }
}
