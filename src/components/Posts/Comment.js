import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { fetchGetComments } from "../../model/actions/commentAction";
import { connect } from "react-redux";

import CommentForm from "./CommentForm";
import CommentsAll from "./CommentsAll";

import DeleteComment from "./DeleteComment";

export class CommentContentxxx extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: [],
    };
  }

  render() {
    let date = `${new Date(this.props.comment.created_at)}`;
    return (
      <AccordionDetails className="comment">
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h5>{this.props.comment.message}</h5>
            <DeleteComment {...this.props} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <p>User id: {this.props.comment.user_id}</p>
            </div>
            <div>
              <p>Created at: {date}</p>
            </div>
          </div>
        </div>
      </AccordionDetails>
    );
  }
}

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.clickHandler = this.clickHandler.bind(this);
  }

  getComments = () => {
    const action = fetchGetComments();
    this.props.dispatch(action);
  };

  clickHandler = () => {
    this.getComments();
  };

  render() {
    return (
      <div className="show-comments">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            onClick={this.clickHandler}
          >
            Show Comments
          </AccordionSummary>
          <CommentForm {...this.props} />
          <CommentsAll {...this.props} />
        </Accordion>
      </div>
    );
  }
}

export default connect(null, null)(Comment);
