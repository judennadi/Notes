import React, { useState, useContext } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography } from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import green from "@material-ui/core/colors/green";
import useStyles from "../styles/auth";
import { AuthContext } from "../../context/AuthContextProvider";

const VerifyEmail = () => {
  const { isDarkMode } = useContext(AuthContext);
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post("/auth/verification", { email }, config);
      setData(data.data);
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
              REGISTER AN ACCOUNT
            </Typography>
            <form noValidate autoComplete="off" onSubmit={handleSubmit} className={data ? "div-clear" : ""}>
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
            {data && (
              <>
                <CheckCircleIcon fontSize="large" style={{ color: green[500] }} />
                <h4>Email was sent successfully.</h4>
                <h4>Please complete your Registration via the Link we sent to your Email address.</h4>
                <h4>The Link will expire after 24hrs and this Email address can't be used again!</h4>
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default VerifyEmail;
