import React, { useState } from 'react';
import { getMatchingRecipes } from '../core/apiCore';
import Loader from './Loader';

function Search(props) {
    const [searchEntries, setSearchEntries] = useState([]);
    const [currentEntry, setCurrentEntry] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { setRecipe } = props;

    const handleSearchInput = (e) => {
        const value = e.target.value;
        setCurrentEntry(value);
    }

    const handleEnter = (e) => {
        const key = e.key;
        if (key === 'Enter') {
            setSearchEntries([...searchEntries, currentEntry.toLowerCase()]);
            setCurrentEntry('');
        }
    };

    const deleteEntry = (entry) => {
        const index = searchEntries.indexOf(entry);
        const searchEntriesCopy = [...searchEntries];
        searchEntriesCopy.splice(index, 1);
        setSearchEntries(searchEntriesCopy);
    };

    const searchData = () => {
        if (searchEntries) {
            getMatchingRecipes({ search: searchEntries })
                .then(
                    response => {
                        if (response.error) {
                            console.log(response.error);
                        } else {
                            setSearchResults(response);
                        }
                    }
                );
        }
    };

    const handleRecipeSelect = (recipe) => {
        setRecipe(recipe);
    };

    return (
        <div className="search">
            <input
                className="input is-medium is-rounded home__input"
                type="text"
                placeholder="Search by ingredient"
                value={currentEntry}
                onChange={handleSearchInput}
                onKeyUp={handleEnter}
            />

            <button
                className={`button is-link is-rounded is-medium ml-4`}
                disabled={searchEntries && searchEntries.length > 0 ? false : true}
                onClick={searchData}
            >
                Search!
                </button>
            <div>
                {searchEntries && searchEntries.map(searchEntry => (
                    <span className="tag is-medium home__searchEntry capitalize" onClick={() => deleteEntry(searchEntry)} key={searchEntry}>{searchEntry}</span>
                ))}
            </div>
            {searchResults.length > 0 ?
                <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth home__searchTable">
                    <thead>
                        <tr>
                            <th className="is-narrow">Recipe</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults ?
                            searchResults.map((recipe => (
                                <tr key={recipe._id} onClick={() => handleRecipeSelect(recipe)}>
                                    <th className="is-narrow capitalize">{recipe.name}</th>
                                </tr>
                            )))
                            : <Loader />}
                    </tbody>
                </table> : null}
        </div>
    )
}

export default Search;
