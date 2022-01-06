import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem/index'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

const initalCommentArray = []
// Write your code here

class Comments extends Component {
  state = {
    commentArray: initalCommentArray,
    username: '',
    comment: '',
    isLiked: false,
  }

  userLikedComment = id => {
    this.setState(prevState => ({
      commentArray: prevState.commentArray.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  userDeletedComment = id => {
    const {commentArray} = this.state
    const filteredComments = commentArray.filter(
      eachComment => eachComment.id !== id,
    )
    this.setState({commentArray: [...filteredComments]})
  }

  inputAreaValue = event => {
    if (event.target.value !== undefined)
      this.setState({username: event.target.value})
  }

  textAreaValue = event => {
    if (event.target.value !== undefined)
      this.setState({comment: event.target.value})
  }

  submitDetails = event => {
    event.preventDefault()
    const {username, comment, isLiked} = this.state
    const colorIndex = Math.floor(Math.random() * 7)
    const profileNameBackground =
      initialContainerBackgroundClassNames[colorIndex]
    const commentObject = {
      id: uuidv4(),
      username,
      comment,
      isLiked,
      initialBackgroundColor: profileNameBackground,
    }
    if (username.trim() !== '' && comment.trim() !== '') {
      this.setState(prevState => ({
        username: '',
        comment: '',
        commentArray: [...prevState.commentArray, commentObject],
      }))
    } else {
      this.setState({
        username: '',
        comment: '',
      })
    }
  }

  render() {
    const {username, comment, commentArray, isLiked} = this.state
    const noOfComments = commentArray.length
    return (
      <div className="main-bg-container">
        <div className="header-section">
          <div className="input-area-container">
            <h1 className="main-heading">Comments</h1>
            <p className="main-desc">say something about 4.0 Technologies</p>
            <form className="form-container" onSubmit={this.submitDetails}>
              <input
                type="text"
                className="input-area"
                placeholder="your name"
                onChange={this.inputAreaValue}
                value={username}
                required
              />
              <textarea
                placeholder="Your Comment"
                className="text-area"
                onChange={this.textAreaValue}
                value={comment}
                required
              />
              <button type="submit" className="submit-button">
                Add Comment
              </button>
            </form>
          </div>
          <div className="comment-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png "
              alt="comments"
              className="comment-image"
            />
          </div>
        </div>
        <div className="comments-section">
          <p>
            {' '}
            <span className="comments-count">{noOfComments}</span> comments
          </p>
          <ul className="comments-card-container">
            {commentArray.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                commentDetails={eachComment}
                userLikedComment={this.userLikedComment}
                isLiked={isLiked}
                userDeletedComment={this.userDeletedComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
