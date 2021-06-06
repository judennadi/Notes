import React, { useState, useContext } from "react";
import axios from "axios";
import {
  Typography,
  Button,
  Container,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { AuthContext } from "../context/AuthContextProvider";
import useStyles from "./styles/auth";

export default function Create({ history }) {
  const { user, isDarkMode } = useContext(AuthContext);
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("money");

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
        await axios.post("/notes/create", { title, category, details }, config);
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

        <FormControl className={classes.field} style={isDarkMode ? { color: "#ddd" } : null}>
          <FormLabel style={isDarkMode ? { color: "#ddd" } : null}>Note Category</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlLabel value="money" control={<Radio />} label="Money" />
            <FormControlLabel value="todos" control={<Radio />} label="Todos" />
            <FormControlLabel value="reminders" control={<Radio />} label="Reminders" />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>

        <Button type="submit" variant="contained" color="secondary" endIcon={<SendIcon />}>
          Submit
        </Button>
      </form>
    </Container>
  );
}
