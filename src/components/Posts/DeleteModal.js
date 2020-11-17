import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

import Button from "@material-ui/core/Button";
import { deletePost } from "../../model/actions/postsAction";
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

function DeleteModal(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deletePostRedux = async () => {
    const postID = props.post.id;

    const action = deletePost(postID);
    await props.dispatch(action);
  };

  const deleteHandler = (event) => {
    event.preventDefault();

    props.post.user_id === +localStorage.getItem("user_id")
      ? deletePostRedux()
      : alert("Вы не можете удалить чужой пост");

    handleClose();
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className="delete-text">Вы уверены что хотите удалить пост?</div>
      <form className="form-post-delete">
        <Button variant="contained" color="primary" onClick={deleteHandler}>
          Да
        </Button>
        <Button variant="contained" color="secondary" onClick={handleClose}>
          Нет
        </Button>
      </form>
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Delete post
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

export default connect(null, null)(DeleteModal);
