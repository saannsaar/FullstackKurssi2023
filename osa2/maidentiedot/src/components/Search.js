import React from "react";

const Search = ({ handleFilter, setFilter }) => {
    return (
        <div>
            find countries <input onChange={handleFilter}/> 
        </div>
    )
}

export default Search;