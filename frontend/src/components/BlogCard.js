import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/BlogSection.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

function BlogCard(props) {
    useEffect(() => {
        AOS.init();
      }, []);
  return (
    <div className='blog-card' data-aos="zoom-in-up" data-aos-duration="1500">
        <div className="blog-img">
            <img src={props.image} alt="blog" />
        </div>
        <div className="blog-title">
            <Link to='/'><h3>{props.title}</h3></Link>
        </div>
        <div className="blog-user">
            By <span>{props.username}</span> on Jan 8, 2023 
        </div>
        <div className="blog-desc">
            {props.description}
        </div>
    </div>
  )
}

export default BlogCard;