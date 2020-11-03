import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { fetchLoginUser } from "../model/actions/loginAction";

import { connect } from "react-redux";

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "Jojo@mail.jp",
      password: "Jojo123321",
    };
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  handleChangeInput = (event) => {
    event.persist();
    this.setState((prev) => ({
      ...prev,
      ...{
        [event.target.name]: event.target.value,
      },
    }));
  };

  handleSubmitForm = (event) => {
    event.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.login(data);
  };

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <Avatar style={{ marginTop: 100, marginBottom: 15 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <form noValidate onSubmit={this.handleSubmitForm}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.handleChangeInput}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.handleChangeInput}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginBottom: 15 }}
            >
              Log In
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}></Box>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(fetchLoginUser(data)),
  };
};

export default connect(null, mapDispatchToProps)(LogIn);
