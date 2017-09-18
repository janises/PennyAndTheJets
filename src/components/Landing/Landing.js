
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';


import cloud1 from './../../img/cloud1.png';
import cloud2 from './../../img/cloud2.png';
import cloud3 from './../../img/cloud3.png';
import haze from './../../img/haze2.png';
import {TimelineLite, TweenLite} from 'gsap';
import * as ScrollMagic from 'scrollmagic';
import gameLogo2 from './../../img/game-logo2.png';
require('dotenv').config();
// require('scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap');





export default class Landing extends Component {

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
      
        // $(window).resize(function() {
        //     elemOffset = elem.offset().top;
        //     elemOpacity = ($(window).scrollTop()) / elemOffset;
        //   });
    
        //   $(window).on('scroll', function() {
        //     // if ($(window).scrollTop() >= elem.offset().top - 400) {
        //       elemOpacity = (Math.pow($(window).scrollTop(), 12) / Math.pow(elemOffset, 12));
        //       elem.css({'opacity': elemOpacity});
        //     // } else elem.css({'opacity': 0});
        //   });

        // const wh = $(window).height(),
        //       tl = new TimelineLite({paused:true}),
        //       $cloud1 = $('.cloud1'),
        //       $cloud2 = $('.cloud2'),
        //       $cloud3 = $('.cloud3'),
        //       $haze = $('.haze'),
        //       $about = $('.about'),
        //       $aboutGame = $('.about-game');
        // const controller = new ScrollMagic.Controller();

        // const moveCloud1 = tl.to($cloud1, 2, {xPercent: 50});
        // const moveCloud2 = TweenLite.to($cloud2, 2, {xPercent: -50});
        // const moveAbout = TweenLite.to($about, 2, {xPercent: -75});

        // new ScrollMagic.Scene({
        //     triggerElement: "#trigger1",
        //     triggerHook: "onEnter",
        //     // offset: wh
        // }).addTo(controller).setTween(moveCloud1);

        // new ScrollMagic.Scene({

        // }).setTween(moveCloud2).addTo(controller);

        // new ScrollMagic.Scene({
        //     triggerElement: $about,
        //     triggerHook: "onEnter",
        //     // offset: wh
        // }).addTo(controller).setTween(moveAbout);

        $(window).scroll(function(){
            const scroll = $(this).scrollTop();
    //         console.log(scroll);

    //         if(scroll <= 200) {
    //             TweenLite.to($cloud1, 2, {xPercent:50});
    //             TweenLite.to($cloud2, 2, {xPercent:-50});
    //         } else if(scroll <= 150 && scroll > 200) {
    //             TweenLite.to($about, 2, {xPercent:-75});
    //         } else if(scroll <= 700 && scroll > 650) {
    //             TweenLite.to($cloud3, 2, {xPercent: -50});
    //         } else if(scroll <= 800 && scroll > 700) {
    //             TweenLite.to($aboutGame, 2, {xPercent: 75, yPercent: 60});
    //         }
                    $('.cloud1').css({
                        'transform': `translate(${scroll/10}%, 0px` 
                    });
                    $('.cloud2').css({
                        'transform': `translate(-${scroll/10}%, 0px` 
                    });
                    $('.cloud3').css({
                        'transform': `translate(-${scroll/10}%, 0px`
                    });
                    // $('.haze').css({
                    //     'transform': `translate(0px, -${scroll/50}%`
                    // });
    //                 // $('.about').css({
    //                 //     'transform': `translate(-${scroll/5}% ,0px)`
    //                 // });
    //                 // $('.about-game').css({
    //                 //     'transform': `translate(${scroll/18}%, ${scroll/20}%)`
    //                 // });
                
        })
    }

    // handleScroll(event){
    //     const wh = $(window).height(),
    //     // tl = new TimelineLite({paused:true}),
    //     $cloud1 = $('.cloud1'),
    //     $cloud2 = $('.cloud2'),
    //     $cloud3 = $('.cloud3'),
    //     $haze = $('.haze'),
    //     $about = $('.about'),
    //     $aboutGame = $('.about-game');
    //     // let viewHeight = event.srcElement.body.scrollTop; //same as scrollTop
    //     let scrollTop = event.target.body.scrollTop, 
    //         docHeight=$(document).height(),
    //         winHeight=$(window).height(),
    //         scrollPercent=Math.round((scrollTop)/(docHeight-winHeight)*100);
        
    //     console.log("percent", scrollPercent);

    //     if(scrollPercent <= 5){
    //         TweenLite.to($cloud1, 1, {xPercent:50});
    //         TweenLite.to($cloud2, 1, {xPercent:-50});
    //     } else if(scrollPercent > 5 && scrollPercent <= 15){
    //         TweenLite.to($about, 1.5, {xPercent:-75});
    //     } else if(scrollPercent > 40 && scrollPercent <= 50) {
    //         TweenLite.to($cloud3, 1, {xPercent: -50});
    //     } else if(scrollPercent > 60 && scrollPercent < 80) {
    //         TweenLite.to($aboutGame, 1.5, {xPercent: 75, yPercent: 60});
    //     }
  
                
    //     // console.log(viewHeight)
    // }

    // componentWillUnmount(){
    //     window.removeEventListener('scroll', this.handleScroll)
    // }

    render(){

        return (
            <div className="landing-container">
                <div className="haze"></div>
                {/* <img className="haze" ref='haze' src={haze} alt=""/> */}
                <img className="cloud1" ref="cloud1" src={cloud1} alt=''/>
                <img className="cloud2" ref="cloud2" src={cloud2} alt=''/>
                <img className="cloud3" ref="cloud3" src={cloud3} alt=''/>
                <div className="landing-page-peng"></div>
                <div id="trigger1"></div>
                <div className='login-container'>
                    <div className="landing-title">
                        <h1>PENNY AND THE JETS</h1>
                        {/* <img className="title-logo" src={gameLogo2} alt="game-logo"/> */}
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
                        <a className='login' href = {process.env.REACT_APP_LOGIN}><button className='login-button btn'>LOGIN</button></a>
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
