import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, TextField, Button, Typography } from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import useStyles from "../styles/auth";
import { AuthContext } from "../../context/AuthContextProvider";

const Login = ({ history }) => {
  const { isDarkMode, dispatch } = useContext(AuthContext);
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post("auth/login", { email, password }, config);
      dispatch({ type: "SET_USER", payload: data });
      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <>
      <Container className={classes.con} style={isDarkMode ? { background: "#9b0b3b" } : null}>
        <div className="form-con1">
          <div className="form-icon" style={isDarkMode ? { background: "rgba(0,0,0,0.9)" } : null}>
            <LockOpenIcon color="secondary" fontSize="large" />
          </div>
          <div
            className="form-con"
            style={isDarkMode ? { background: "rgba(0,0,0,0.9)", color: "#ddd" } : { color: "#000" }}
          >
            <Typography variant="h6" color="secondary" className={classes.loginH}>
              LOGIN TO YOUR ACCOUNT
            </Typography>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                variant="outlined"
                InputLabelProps={isDarkMode ? { className: classes.textLab } : null}
                fullWidth
                value={email}
                size="small"
                className={isDarkMode ? classes.root : classes.field}
                InputProps={isDarkMode ? { style: { color: "#fff" } } : null}
              />
              <TextField
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                variant="outlined"
                InputLabelProps={isDarkMode ? { className: classes.textLab } : null}
                fullWidth
                value={password}
                size="small"
                className={isDarkMode ? classes.root : classes.field}
                InputProps={isDarkMode ? { style: { color: "#fff" } } : null}
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
                <Typography className={classes.btnText}>LOGIN</Typography>
              </Button>
              <p>
                <Link to="/verification">Don't have an account? Register</Link>
              </p>
              <p>
                <Link to="/forgotpassword">Forgot Password?</Link>
              </p>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
