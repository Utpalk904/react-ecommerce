import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../css/Home.css';

function HeroSection() {
    useEffect(() => {
        AOS.init();
      }, [])
  return (
    <div className="home-frame">
        <div className="home-frame-content" data-aos="zoom-in-right">
            <div className="line1">Spring - Summer 2023</div>
            <div className="line2">FLASH SALE OF 70%</div>
            <div className="line3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, accusantium dolorem. Quam ea corporis accusamus magnam ab rem nemo omnis.</div>
            <div className="line4">
                <Link to='/products' className='shop-now'>Shop now</Link>
            </div>
        </div>
    </div>
  )
}

export default HeroSection;