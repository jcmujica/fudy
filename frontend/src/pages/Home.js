import React, { useState } from 'react';
import HomeLayout from '../layout/HomeLayout';
import Search from '../components/Search';
import RecipeDetail from '../components/Recipe/RecipeDetail';
// import images from '../assets/img/images';

function Home() {
    const [recipe, setRecipe] = useState({});
    return (
        <HomeLayout>
            <section className="hero is-info is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            Welcome to Fudy!
                        </h1>
                        <h2 className="subtitle">
                            Find thousands of recipes based on your available ingredients!<p className="is-size-4 has-text-link">Type an ingredient and <strong className="has-text-link">press enter</strong> to add it to the list.</p>
                        </h2>

                        <Search
                            setRecipe={setRecipe}
                        />
                        <RecipeDetail
                            recipe={recipe}
                            setRecipe={setRecipe}
                        />
                    </div>
                </div>
            </section>

        </HomeLayout>
    )
}

export default Home;
