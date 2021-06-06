import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, TextField, Button, Typography } from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import green from "@material-ui/core/colors/green";
import useStyles from "../styles/auth";
import { AuthContext } from "../../context/AuthContextProvider";

const Register = ({ history, match }) => {
  const { isDarkMode, dispatch } = useContext(AuthContext);
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const source = axios.CancelToken.source();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post(
        `/auth/register/${match.params.verifyToken}`,
        { username, email, password },
        config,
        { cancelToken: source.token }
      );
      dispatch({ type: "SET_USER", payload: data });
      setUser(data);
      setTimeout(() => {
        history.push("/");
      }, 5000);
    } catch (error) {
      if (!axios.isCancel(error)) {
        setError("Error");
      }
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  useEffect(() => {
    return () => {
      source.cancel();
    };
  });

  return (
    <>
      <Container className={classes.con} style={isDarkMode ? { background: "#9b0b3b" } : null}>
        <div className="form-con1">
          <div className="form-icon" style={isDarkMode ? { background: "rgba(0,0,0,0.9)" } : null}>
            <LockOpenIcon color="secondary" fontSize="large" />
          </div>
          <div
            className="form-con"
            style={isDarkMode ? { background: "#333", color: "#ddd" } : { color: "#000" }}
          >
            <Typography variant="h6" color="secondary" className={classes.loginH}>
              REGISTER AN ACCOUNT
            </Typography>
            <form noValidate autoComplete="off" onSubmit={handleSubmit} className={user ? "div-clear" : ""}>
              <TextField
                onChange={(e) => setUsername(e.target.value)}
                label="Username"
                variant="outlined"
                InputLabelProps={isDarkMode ? { className: classes.textLab } : null}
                fullWidth
                value={username}
                size="small"
                className={isDarkMode ? classes.root : classes.field}
                InputProps={isDarkMode ? { style: { color: "#fff" } } : null}
              />
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                className={isDarkMode ? classes.root : classes.field}
                InputProps={isDarkMode ? { style: { color: "#fff" } } : null}
                label="Email"
                variant="outlined"
                InputLabelProps={isDarkMode ? { className: classes.textLab } : null}
                fullWidth
                value={email}
                size="small"
              />
              <TextField
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className={isDarkMode ? classes.root : classes.field}
                InputProps={isDarkMode ? { style: { color: "#fff" } } : null}
                label="Password"
                variant="outlined"
                InputLabelProps={isDarkMode ? { className: classes.textLab } : null}
                fullWidth
                value={password}
                size="small"
              />
              <TextField
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={isDarkMode ? classes.root : classes.field}
                InputProps={isDarkMode ? { style: { color: "#fff" } } : null}
                label="Confirm Password"
                variant="outlined"
                InputLabelProps={isDarkMode ? { className: classes.textLab } : null}
                fullWidth
                value={confirmPassword}
                size="small"
              />

              {error && <span className="error-msg">{error}</span>}

              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
                size="large"
                className={classes.btn}
              >
                <Typography className={classes.btnText}>REGISTER</Typography>
              </Button>
              <p>
                <Link to="/register">Already have an account? Login</Link>
              </p>
            </form>
            {user && (
              <>
                <CheckCircleIcon fontSize="large" style={{ color: green[500] }} />
                <h3>Registered successfully!</h3>
                <h4>Please wait while we redirect you to the Home page.</h4>
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Register;
