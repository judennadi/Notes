import { useContext, useState, useEffect } from "react";
import {
  Avatar,
  Container,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Popover,
  Button,
  TextField,
} from "@material-ui/core";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import green from "@material-ui/core/colors/green";
import CreateIcon from "@material-ui/icons/Create";
import { AuthContext } from "../context/AuthContextProvider";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import useStyles from "./styles/profile";

const Profile = ({ history }) => {
  const classes = useStyles();
  const { user, isDarkMode, dispatch } = useContext(AuthContext);
  const [image, setImage] = useState("");
  const [imgName, setImgName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [anchorImg, setAnchorImg] = useState(null);
  const [anchorUsername, setAnchorUsername] = useState(null);
  const [anchorPassword, setAnchorPassword] = useState(null);
  const imgOpen = Boolean(anchorImg);
  const usernameOpen = Boolean(anchorUsername);
  const passwordOpen = Boolean(anchorPassword);
  const source = axios.CancelToken.source();

  useEffect(() => {
    if (!user) {
      dispatch({ type: "SET_USER", payload: null });
      history.push("/login");
    }
  });

  const handleFile = async (e) => {
    let isFileInput = false;
    setImgName(e.target.files[0].name);
    if (e.target.files[0]) {
      isFileInput = true;
    }

    if (isFileInput) {
      try {
        Resizer.imageFileResizer(
          e.target.files[0],
          300,
          300,
          "PNG",
          100,
          0,
          (uri) => {
            setImage(uri);
          },
          "base64"
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSubmit = async (e, param) => {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      if (param === "image" && !image) {
        throw Error;
      }
      if (param === "password" && password !== confirmPassword) {
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          setError("");
        }, 5000);
        return setError("Passwords do not match");
      }
      if (param === "username" && !username) {
        throw Error;
      }

      const { data } = await axios.patch(
        `/user/${user._id}`,
        image ? { image } : username ? { username } : { password },
        config,
        { cancelToken: source.token }
      );
      if (data) {
        dispatch({ type: "SET_USER", payload: data });
        setData(data);
        setTimeout(() => {
          setData(null);
        }, 4000);
        setImage("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          setAnchorUsername(null);
          setAnchorPassword(null);
          setAnchorImg(null);
        }, 4000);
      }
    } catch (error) {
      console.log(error.response.data.error);
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
      setImage("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  const handleChange = () => {
    dispatch({ type: "TOGGLE_SWITCH" });
  };

  const handleDP = (e, param) => {
    if (param === "image") {
      setAnchorImg(e.currentTarget);
    }
    if (param === "password") {
      setAnchorPassword(e.currentTarget);
    }
    if (param === "username") {
      setAnchorUsername(e.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorImg(null);
    setAnchorUsername(null);
    setAnchorPassword(null);
  };

  useEffect(() => {
    return () => {
      source.cancel();
    };
  });

  return (
    <Container style={isDarkMode ? { height: "calc(100vh - 64px)" } : null}>
      {user && (
        <div style={isDarkMode ? { color: "#ddd", display: "grid" } : { display: "grid" }}>
          <div className={classes.avCon}>
            <Avatar src={user.image} className={classes.av}>
              {!user.image ? user.username[0].toUpperCase() : ""}
            </Avatar>
            <Typography variant="h5">{user.email}</Typography>
          </div>
          <div className={classes.liWidth}>
            <List>
              <ListItem>
                <ListItemIcon>
                  {!isDarkMode ? <Brightness4Icon color="secondary" /> : <WbSunnyIcon color="secondary" />}
                </ListItemIcon>
                <ListItemText primary="Dark Mode" />
                <Switch onChange={handleChange} checked={isDarkMode} />
              </ListItem>

              <ListItem button onClick={(e) => handleDP(e, "image")}>
                <ListItemIcon>
                  <AddAPhotoIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Add a Profile Photo" />
              </ListItem>
              <Popover
                open={imgOpen}
                anchorEl={anchorImg}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <div
                  className="pofile_form_con"
                  style={isDarkMode ? { background: "#333", color: "#fff" } : null}
                >
                  <form
                    onSubmit={(e) => handleSubmit(e, "image")}
                    style={data ? { display: "none" } : { display: "grid", width: "100%" }}
                  >
                    <label htmlFor="dp" style={{ placeSelf: "center" }}>
                      <input
                        id="dp"
                        type="file"
                        accept="image/*"
                        onChange={handleFile}
                        style={{ display: "none" }}
                      />
                      <Button
                        component="span"
                        variant="outlined"

                        // style={isDarkMode ? { background: "rgba(0,0,0,0.9)" } : null}
                      >
                        Select Image
                      </Button>
                    </label>
                    {imgName && <span style={{ fontSize: "14px" }}>{imgName}</span>}
                    <Button
                      type="submit"
                      color="secondary"
                      variant="contained"
                      size="small"
                      style={{ marginTop: "10px", placeSelf: "center" }}
                    >
                      Upload
                    </Button>
                  </form>
                  {data && (
                    <>
                      <CheckCircleIcon fontSize="large" style={{ color: green[500] }} />
                      <br></br>
                      <h4>Image was uploaded successfully!</h4>
                    </>
                  )}
                </div>
              </Popover>

              <ListItem button onClick={(e) => handleDP(e, "username")}>
                <ListItemIcon>
                  <CreateIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Change Username" />
              </ListItem>
              <Popover
                open={usernameOpen}
                anchorEl={anchorUsername}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <div
                  className="pofile_form_con"
                  style={isDarkMode ? { background: "#333", color: "#fff" } : null}
                >
                  <form
                    onSubmit={(e) => handleSubmit(e, "username")}
                    style={data ? { display: "none" } : { display: "grid", width: "100%" }}
                  >
                    <TextField
                      label="Username"
                      className={isDarkMode ? classes.root : null}
                      value={username}
                      variant="outlined"
                      style={{ marginBottom: "16px" }}
                      fullWidth
                      onChange={(e) => setUsername(e.target.value)}
                      size="small"
                      InputLabelProps={isDarkMode ? { className: classes.textLab } : null}
                      InputProps={isDarkMode ? { style: { color: "#fff" } } : null}
                    />

                    {error && <span className="error-msg">{error}</span>}

                    <Button
                      type="submit"
                      color="secondary"
                      variant="contained"
                      size="small"
                      style={{ marginTop: "10px", placeSelf: "center" }}
                    >
                      change username
                    </Button>
                  </form>
                  {data && (
                    <>
                      <CheckCircleIcon fontSize="large" style={{ color: green[500] }} />
                      <br></br>
                      <h4>Username was changed successfully!</h4>
                    </>
                  )}
                </div>
              </Popover>

              <ListItem button onClick={(e) => handleDP(e, "password")}>
                <ListItemIcon>
                  <CreateIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Change Password" />
              </ListItem>
              <Popover
                open={passwordOpen}
                anchorEl={anchorPassword}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <div
                  className="pofile_form_con"
                  style={isDarkMode ? { background: "#333", color: "#fff" } : null}
                >
                  <form
                    onSubmit={(e) => handleSubmit(e, "password")}
                    style={data ? { display: "none" } : { display: "grid", width: "100%" }}
                  >
                    <TextField
                      label="New Password"
                      type="password"
                      value={password}
                      variant="outlined"
                      style={{ marginBottom: "16px" }}
                      fullWidth
                      onChange={(e) => setPassword(e.target.value)}
                      size="small"
                      InputLabelProps={isDarkMode ? { className: classes.textLab } : null}
                      className={isDarkMode ? classes.root : null}
                      InputProps={isDarkMode ? { style: { color: "#fff" } } : null}
                    />
                    <TextField
                      label="Confirm New Password"
                      type="password"
                      value={confirmPassword}
                      variant="outlined"
                      style={{ marginBottom: "16px" }}
                      fullWidth
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      size="small"
                      InputLabelProps={isDarkMode ? { className: classes.textLab } : null}
                      className={isDarkMode ? classes.root : null}
                      InputProps={isDarkMode ? { style: { color: "#fff" } } : null}
                    />

                    {error && <span className="error-msg">{error}</span>}

                    <Button
                      type="submit"
                      color="secondary"
                      variant="contained"
                      size="small"
                      style={{ marginTop: "10px", placeSelf: "center" }}
                    >
                      Change password
                    </Button>
                  </form>
                  {data && (
                    <>
                      <CheckCircleIcon fontSize="large" style={{ color: green[500] }} />
                      <br></br>
                      <h4>Password was changed successfully!</h4>
                    </>
                  )}
                </div>
              </Popover>
            </List>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Profile;
