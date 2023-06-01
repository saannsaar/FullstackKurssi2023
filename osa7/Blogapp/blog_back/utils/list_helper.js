var _ = require('lodash');
const dummy = (blogs) => {
    return 1
  }
  
  const totalLikes = (blogs) => {
    const all = blogs.reduce((sum, b) => sum + b.likes, 0)
    return all
  }

  //Favourite blog, with most likes
  const bestBlog = (blogs) => {
    
    let highestLike = Math.max(...blogs.map(b => b.likes))

    let bestestBlog = blogs.find(blog => blog.likes === highestLike)

    return bestestBlog
  }

  // Find the author who has the most blogs
  const mostBlogs = (blogs) => {
  let countsArray = [...blogs.reduce( (a, curr) => {
    if (!a.has(curr.author)) a.set(curr.author, {...curr, count: 0})
    a.get(curr.author).count++
    return a
  }, new Map).values()]

  let mostBlogentries = Math.max(...countsArray.map(o => o.count))

  let findright = countsArray.find(bl => bl.count === mostBlogentries)
 
  let rightAuthor = {
    "author": findright.author,
    "blogs": findright.count
  }

 return rightAuthor
  }
  // Make groups based on the authors name
  const mostLikesforAuthor = (blogs) => {
  const groupedArr = Object.values(_.groupBy(blogs, (blog) => {
    return blog.author
  }))
  // console.log(groupedArr)

  const likesArray = groupedArr.map((elem) => {
    const likescounted = elem.reduce((sum,curr) => {
      return sum + curr.likes
    }, 0)
    return { "author": elem[0].author, "likes": likescounted}
   })



   const mostLikedAuthor = _.maxBy(likesArray, function(o) {
    return o.likes
   })

   return mostLikedAuthor
  }


  module.exports = {
    dummy,
    totalLikes,
    bestBlog,
    mostBlogs,
    mostLikesforAuthor
  }
