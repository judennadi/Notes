import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, TextField, Button, Typography } from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import green from "@material-ui/core/colors/green";
import useStyles from "../styles/auth";
import { AuthContext } from "../../context/AuthContextProvider";

const ResetPassword = ({ match }) => {
  const { isDarkMode } = useContext(AuthContext);
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    if (password.length < 6 || confirmPassword.length < 6) {
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Password must contain at least 6 characters");
    }
    try {
      const { data } = await axios.patch(
        `/auth/resetpassword/${match.params.resetToken}`,
        { password },
        config
      );
      setSuccess(data.data);
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
            style={isDarkMode ? { background: "#333", color: "#ddd" } : { color: "#000" }}
          >
            <Typography variant="h6" color="secondary" className={classes.loginH}>
              RESET PASSWORD
            </Typography>
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
              className={success ? "div-clear" : ""}
            >
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
                label="Confirm Password"
                variant="outlined"
                InputLabelProps={isDarkMode ? { className: classes.textLab } : null}
                fullWidth
                value={confirmPassword}
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
                <Typography className={classes.btnText}>RESET</Typography>
              </Button>
            </form>
            {success && (
              <>
                <CheckCircleIcon fontSize="large" style={{ color: green[500] }} />
                <h3>Password reset was successful!</h3>
                <h4>Please click the button below to login.</h4>
                <Link to="/login">
                  <Button variant="contained" color="secondary">
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default ResetPassword;
