// Write your code here
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails, userLikedComment, userDeletedComment} = props
  const {
    id,
    username,
    comment,
    isLiked,
    initialBackgroundColor,
  } = commentDetails
  const profileLetter = username.slice(0, 2).toUpperCase()
  const timeUpdated = formatDistanceToNow(new Date())

  const likeButtonUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : ' https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const clickLikeButton = () => {
    userLikedComment(id)
  }

  const clickedDeleteButton = () => {
    userDeletedComment(id)
  }

  return (
    <li className="card-main-container">
      <div className="card-list">
        <div className="display-pic">
          <div className={`profile-pic ${initialBackgroundColor}`}>
            {profileLetter}
          </div>
        </div>

        <div className="detailed-comment-container">
          <div className="name-box">
            <p className="user-name-styling">{username}</p>
            <p className="time-updated">{timeUpdated} ago</p>
          </div>
          <p className="comment-styling">{comment}</p>
        </div>
      </div>
      <div className="button-container">
        <button
          type="button"
          className="action-button"
          onClick={clickLikeButton}
        >
          <img src={likeButtonUrl} alt="like-dislike-button" />
        </button>
        <button
          type="button"
          className="action-button"
          onClick={clickedDeleteButton}
          testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png "
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
