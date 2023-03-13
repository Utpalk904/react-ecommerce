import React from 'react';
import BlogCard from './BlogCard';
import '../css/BlogSection.css';
import Img8 from '../assets/img8.jpg';

function BlogSection() {
  return (
    <div className='blog-section'>
        <div className="blog-header">
            <div className="hr"><hr /></div>
            <h1>Latest From Blog</h1>
            <div className="hr"><hr /></div>
        </div>
        <div className="blog-subheader">
            <h5>The freshest and the most exciting news</h5>
        </div>
        <div className="blog-content">
            <BlogCard image={Img8} title='Lorem ipsum dolor sit.' username='Kaju' description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt hic possimus quia impedit cumque velit vero adipisci sed, ipsum neque.'/>
            <BlogCard image={Img8} title='Lorem ipsum dolor sit.' username='Kaju' description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt hic possimus quia impedit cumque velit vero adipisci sed, ipsum neque.'/>
            <BlogCard image={Img8} title='Lorem ipsum dolor sit.' username='Kaju' description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt hic possimus quia impedit cumque velit vero adipisci sed, ipsum neque.'/>
            <BlogCard image={Img8} title='Lorem ipsum dolor sit.' username='Kaju' description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt hic possimus quia impedit cumque velit vero adipisci sed, ipsum neque.'/>
        </div>
    </div>
  )
}

export default BlogSection;