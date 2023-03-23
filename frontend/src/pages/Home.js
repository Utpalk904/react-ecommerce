import React from 'react';
import '../App.css';
import BlogSection from '../components/BlogSection';
import HeroSection from '../components/HeroSection';
import MetaData from '../components/MetaData';
import Trending from '../components/Trending';

const Home = () => {

    return (
        <div>
            <MetaData title='Homepage' />
            <HeroSection />
            <Trending />
            <BlogSection />
        </div>
    );
}

export default Home;