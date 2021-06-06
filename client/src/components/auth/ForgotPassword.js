import React, { useState, useContext } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography } from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import green from "@material-ui/core/colors/green";
import useStyles from "../styles/auth";
import { AuthContext } from "../../context/AuthContextProvider";

const ForgotPassword = () => {
  const { isDarkMode } = useContext(AuthContext);
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post("/auth/forgotpassword", { email }, config);
      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
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
              FORGOT PASSWORD
            </Typography>
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
              className={success ? "div-clear" : ""}
            >
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

              {error && <span className="error-msg">{error}</span>}

              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
                size="large"
                className={classes.btn}
              >
                <Typography className={classes.btnText}>VERIFY EMAIL</Typography>
              </Button>
            </form>
            {success && (
              <>
                <CheckCircleIcon fontSize="large" style={{ color: green[500] }} />
                <h3>Email was sent successfully!</h3>
                <h4>Please check your Email to reset your password.</h4>
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default ForgotPassword;
