import React, { useState, useEffect } from 'react';
import ShowImage from '../ShowImage';

function RecipeDetail(props) {
    const { recipe, setRecipe } = props;
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (recipe) {
            setActive(true);
        }
    }, [recipe]);

    const close = () => {
        setActive(false);
        setRecipe({});
    };

    return (
        <>
            {recipe._id ? <div className={'modal ' + (active ? 'is-active' : '')}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title capitalize">{recipe.name}</p>
                        <button className="delete" aria-label="close" onClick={close}></button>
                    </header>
                    <section className="modal-card-body">
                        <ShowImage item={recipe} url="recipe" />
                        <p className="has-text-dark">Instructions:</p>
                        <p className="has-text-dark">{recipe.instructions}</p>
                        <p>Ingredients:</p>
                        {recipe.ingredients.length > 0 ?
                            <table className="table is-bordered is-striped is-narrow is-hoverable">
                                <thead>
                                    <tr>
                                        <th className="is-narrow">Ingredient</th>
                                        <th className="is-narrow">Amount</th>
                                        <th className="is-narrow">Unit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recipe.ingredients && recipe.ingredients.map((ingredient) => (
                                        <tr key={ingredient._id}>
                                            <td className="capitalize">{ingredient.name}</td>
                                            <td>{ingredient.amount}</td>
                                            <td className="capitalize">{ingredient.unit}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            : null}
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success" onClick={close}>Ok</button>
                    </footer>
                </div>
            </div> : null}
        </>
    )
}

export default RecipeDetail
