import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { changePost } from "../../model/actions/postsAction";
import { connect } from "react-redux";

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function EditModal(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [post, setPost] = React.useState({});

  React.useEffect(() => {
    if (props.post) {
      setPost(props.post);
    }
  }, [props.post]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changePostredux = async () => {
    const postID = props.post.id;
    const newPost = {
      title: post.title,
      description: post.description,
    };
    const action = changePost(postID, newPost);
    await props.dispatch(action);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    props.post.user_id === +localStorage.getItem("user_id")
      ? changePostredux()
      : alert("Вы не можете изменить чужой пост");

    handleClose();
  };

  const handleChangeTitle = (event) => {
    event.persist();
    const newPost = { ...post };

    newPost.title = event.target.value;
    setPost(newPost);
  };

  const handleChangeDescription = (event) => {
    event.persist();
    const newPost = { ...post };

    newPost.description = event.target.value;
    setPost(newPost);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <form className="form-post" onSubmit={submitHandler}>
        <TextField
          id="title-input"
          label="Type your title"
          variant="outlined"
          className="input-post"
          name="title"
          onChange={handleChangeTitle}
          value={post.title}
        />
        <TextField
          id="description-input"
          name="description"
          label="Type your description"
          variant="outlined"
          className="input-post"
          onChange={handleChangeDescription}
          value={post.description}
        />
        <Button
          id="modal-save"
          onClick={submitHandler}
          variant="contained"
          color="primary"
        >
          Save changes
        </Button>
      </form>
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Edit Post
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

export default connect(null, null)(EditModal);
