

const Comment = ({ comments }) => {
  console.log(comments)
  console.log(comments.length)
  if (comments.length === 0) {
    console.log('TYHJÄT COMMAT')
    return null
  }

  return (
    <ul>
      {comments.map(comment =>
        <li key={comment.id}>{comment.comment}</li>
      )}
    </ul>

  )


}

export default Comment