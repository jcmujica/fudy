import React from 'react';
import HomeLayout from '../layout/HomeLayout';
import Search from '../components/Search';
// import images from '../assets/img/images';

function Home() {
    return (
        <HomeLayout>
            <section className="hero is-info is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            Welcome to Fudy!
                        </h1>
                        <h2 className="subtitle">
                            Find thousands of recipes based on your available ingredients!
                        </h2>
                        <Search />
                    </div>
                </div>
            </section>

        </HomeLayout>
    )
}

export default Home;
