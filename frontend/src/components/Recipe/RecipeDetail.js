import React, { useState, useEffect } from 'react';

function RecipeDetail(props) {
    const { recipe } = props;
    const [selectedRecipe, setSelectedRecipe] = useState({});
    const [active, setActive] = useState(false);

    useEffect(() => {
        console.log(recipe)
        if (recipe) {
            setSelectedRecipe(recipe);
            setActive(true);
        }
    }, [recipe]);

    const close = () => {
        setActive(false);
        setSelectedRecipe({});
    };

    return (
        <>
            {selectedRecipe._id ? <div className={'modal ' + (active ? 'is-active' : '')}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">{selectedRecipe.name}</p>
                        <button className="delete" aria-label="close" onClick={close}></button>
                    </header>
                    <section className="modal-card-body">
                        <p className="has-text-dark">Instructions:</p>
                        <p className="has-text-dark">{selectedRecipe.instructions}</p>
                        <p>Ingredients:</p>
                        {selectedRecipe.ingredients.length > 0 ?
                            <table className="table is-bordered is-striped is-narrow is-hoverable">
                                <thead>
                                    <tr>
                                        <th className="is-narrow">Ingredient</th>
                                        <th className="is-narrow">Amount</th>
                                        <th className="is-narrow">Unit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedRecipe.ingredients && selectedRecipe.ingredients.map((ingredient) => (
                                        <tr key={ingredient._id}>
                                            <td>{ingredient.name}</td>
                                            <td>{ingredient.amount}</td>
                                            <td>{ingredient.unit}</td>
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
