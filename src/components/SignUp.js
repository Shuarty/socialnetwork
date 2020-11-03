import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAuthUser } from "../model/actions/signUpAction";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firs_name: "",
      last_name: "",
      email: "",
      password: "",
      passwrod_confirmation: "",
    };
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  handleChangeInput = (event) => {
    event.persist();
    this.setState((prev) => ({
      ...prev,
      ...{ [event.target.name]: event.target.value },
    }));
  };

  handleSubmitForm = (event) => {
    event.preventDefault();
    const action = fetchAuthUser({
      firs_name: this.state.firs_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      passwrod_confirmation: this.state.passwrod_confirmation,
    });
    this.props.dispatch(action);

    setTimeout(() => (window.location.href = "/login"), 1000);
  };

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <Avatar style={{ marginTop: 100, marginBottom: 15 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{ marginBottom: 15 }}>
            Sign up
          </Typography>
          <form noValidate onSubmit={this.handleSubmitForm}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="first_name"
                  variant="outlined"
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  autoFocus
                  onChange={this.handleChangeInput}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  autoComplete="lname"
                  onChange={this.handleChangeInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={this.handleChangeInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handleChangeInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="passwrod_confirmation"
                  label="Confirm password"
                  type="password"
                  id="passwrod_confirmation"
                  autoComplete="current-password"
                  onChange={this.handleChangeInput}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginBottom: 15 }}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default connect(null, null)(SignUp);
