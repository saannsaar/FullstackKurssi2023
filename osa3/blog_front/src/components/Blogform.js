import React from "react"

const Blogform = ({handleSubmit, handleTitle, handleAuthor, handleURL, title, author, url}) => {

    return (
        <form onSubmit={handleSubmit}>
            <div>
                Title: 
                <input  type="text" value={title} onChange={handleTitle}/>
            </div>
            <div>
                Author: 
                <input type="text" value={author} onChange={handleAuthor}/>
            </div>
            <div>
                Url: 
                <input type="text" value={url} onChange={handleURL}/>
            </div>
            <div>
                <button type="submit">Create new</button>
            </div>
        </form>
    )
    
}

export default Blogform