import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { createPost, fetchPosts } from "../../model/actions/postsAction";

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  getPosts = async () => {
    const action = fetchPosts();
    await this.props.dispatch(action);
  };

  addPost = async () => {
    const { title } = this.state;
    const { description } = this.state;

    const newPost = {
      title,
      description,
    };
    const action = createPost(newPost);
    await this.props.dispatch(action);
  };

  submitHandler = (event) => {
    this.addPost().then(setTimeout(this.getPosts, 500));

    this.setState({ title: "", description: "" });

    event.preventDefault();
  };

  handleChangeInput = (event) => {
    event.persist();
    this.setState((prev) => ({
      ...prev,
      ...{
        [event.target.name]: event.target.value,
      },
    }));
  };

  render() {
    return (
      <form className="form-post" onSubmit={this.submitHandler}>
        <TextField
          id="title-input"
          label="Type your title"
          variant="outlined"
          className="input-post"
          name="title"
          onChange={this.handleChangeInput}
          value={this.state.title}
        />
        <TextField
          id="description-input"
          name="description"
          label="Type your description"
          variant="outlined"
          className="input-post"
          style={{ marginTop: 10 }}
          onChange={this.handleChangeInput}
          value={this.state.description}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: 10, width: "100%" }}
        >
          Add Post
        </Button>
      </form>
    );
  }
}

export default connect(null, null)(PostForm);
