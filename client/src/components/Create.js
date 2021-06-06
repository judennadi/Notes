import React, { useState, useContext } from "react";
import axios from "axios";
import { Typography, Button, Container, TextField } from "@material-ui/core";
import Resizer from "react-image-file-resizer";
import { AuthContext } from "../context/AuthContextProvider";
import useStyles from "./styles/auth";

export default function Create({ history }) {
  const { user, isDarkMode } = useContext(AuthContext);
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState("");
  const [imgName, setImgName] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if (!user) {
      history.push("/login");
    }

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (title === "") {
      setTitleError(true);
    }
    if (details === "") {
      setDetailsError(true);
    }

    if (title && details) {
      try {
        await axios.post("/notes/create", { title, details, image }, config);
        history.push("/");
      } catch (error) {
        console.log(error.response.data);
      }
    }

    setTitle("");
    setDetails("");
  };

  return (
    <Container style={{ height: "100vh" }}>
      <Typography variant="h6" component="h2" gutterBottom style={isDarkMode ? { color: "#ddd" } : null}>
        Create a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            className={isDarkMode ? classes.root : classes.field}
            label="Note Title"
            variant="outlined"
            fullWidth
            required
            error={titleError}
            InputLabelProps={isDarkMode ? { className: classes.textLab } : null}
            InputProps={isDarkMode ? { style: { color: "#fff" } } : null}
          />
          <TextField
            onChange={(e) => setDetails(e.target.value)}
            className={isDarkMode ? classes.root : classes.field}
            label="Details"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            required
            error={detailsError}
            InputLabelProps={isDarkMode ? { className: classes.textLab } : null}
            InputProps={isDarkMode ? { style: { color: "#fff" } } : null}
          />
          <div className="img-create" style={isDarkMode ? { background: "#333", color: "#ddd" } : null}>
            <label htmlFor="dp" style={{ placeSelf: "center" }}>
              <input id="dp" type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
              <Button
                component="span"
                variant="outlined"
                style={isDarkMode ? { border: " 1px solid #ddd", color: "#ddd" } : null}
              >
                Select Image
              </Button>
            </label>
            {imgName && <span style={{ fontSize: "14px", marginLeft: "20px" }}>{imgName}</span>}
          </div>

          <Button type="submit" variant="contained" color="secondary">
            Submit
          </Button>
        </div>
      </form>
    </Container>
  );
}
