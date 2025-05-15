import React from 'react';
import '../styles/Banner.css';
import piña from '../images/piña.png';
import sombrero from '../images/sobrerochef.png';

export default function Banner() {
  return (
    <div className="Banner">
        <div className="Banner-img-container">
            <img className="Banner-img" src={piña} alt="piña"/>
        </div>
        <div className="Banner-text-container">
            <div className="Banner-text-renglon renglon-1">
                <img className="Banner-sombrero" src={sombrero} alt="sobrero"/>
                <p>HomeChef</p>
            </div>
            <div className="Banner-text-renglon renglon-2">
                <div className="renglon-2-part1">
                    <p>Chefs</p>
                </div>
                <div className="renglon-2-part2">
                    <p>👨‍🍳 New recipe for you to<br/>try out, let's cook!</p>
                </div>
            </div>
            <div className="Banner-text-renglon renglon-3">
                <p className='renglon-3-p'>Academy</p>
            </div>
            <div className="Banner-text-renglon renglon-4">
                <p>Secrets</p>
            </div>
        </div>
    </div>
  );
}