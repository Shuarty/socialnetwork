import React from "react";
import { connect } from "react-redux";
import { fetchGetComments } from "../../model/actions/commentAction";

import { CommentContentxxx } from "./Comment";

class CommentsAll extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: [] };
  }

  getComment = async () => {
    const action = fetchGetComments();
    await this.props.dispatch(action);
  };

  componentDidMount() {
    this.getComment();
  }

  filteredComments = (arr, id) => {
    const result = arr
      .filter((comment) => comment.commentable_id === +id)
      .sort((a, b) => {
        const dateOne = new Date(a.created_at),
          dateTwo = new Date(b.created_at);
        return dateTwo - dateOne;
      });

    return result;
  };

  render() {
    return (
      <>
        {this.props.comments.length &&
        this.filteredComments(this.props.comments, this.props.postID).length ? (
          <>
            {this.filteredComments(this.props.comments, this.props.postID).map(
              (comment) => (
                <CommentContentxxx
                  comment={comment}
                  key={comment.id}
                  {...this.props}
                />
              )
            )}
          </>
        ) : (
          <>
            <p style={{ textAlign: "center" }}>Sorry, comments are out</p>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.commentReducer.comments,
  };
};

export default connect(mapStateToProps, null)(CommentsAll);
