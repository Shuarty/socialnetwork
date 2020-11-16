import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { fetchComment } from "../../model/actions/commentAction";
import { connect } from "react-redux";

export class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      commentable_id: null,
      commentable_type: "Comment",
      postID: this.props.postID,
    };
    this.changeInput = this.changeInput.bind(this);
    this.submitComment = this.submitComment.bind(this);
  }

  changeInput = (event) => {
    event.persist();
    this.setState((prev) => ({
      ...prev,
      ...{
        [event.target.name]: event.target.value,
      },
    }));
  };

  addComment = async () => {
    const newComment = {
      message: this.state.message,
      commentable_id: this.props.postID,
      commentable_type: "Comment",
    };

    const action = fetchComment(newComment);
    await this.props.dispatch(action);
  };

  submitComment(event) {
    event.preventDefault();
    this.addComment();

    this.setState({
      message: "",
    });
  }

  render() {
    return (
      <form onSubmit={this.submitComment}>
        <TextField
          id="comment-input"
          label="Type your comment"
          variant="outlined"
          className="input-comment"
          name="message"
          value={this.state.message}
          style={{ marginTop: 10 }}
          onChange={this.changeInput}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: 10, width: "100%" }}
        >
          Add Comment
        </Button>
      </form>
    );
  }
}

export default connect(null, null)(CommentForm);
