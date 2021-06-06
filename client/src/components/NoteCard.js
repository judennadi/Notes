import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  Avatar,
  CardMedia,
  CardActions,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import useStyles from "./styles/notecard";
import { AuthContext } from "../context/AuthContextProvider";
// import dp from "../img/mete.jpg";

const NoteCard = ({ note, handleDelete }) => {
  const { isDarkMode } = useContext(AuthContext);
  const classes = useStyles(note);

  console.log(note.image);

  return (
    <>
      <Card elevation={2} style={isDarkMode ? { background: "#333", color: "#fff" } : null}>
        <Link to={`/notes/${note._id}`}>
          <CardMedia className={note.image ? classes.media : null} component="img" src={note.image} />
          {/* <CardHeader
          avatar={<Avatar src={note.creator ? note.creator.image : ""} className={classes.avatar}></Avatar>}
          title={note.title}
          subheader={note.category}
          classes={
            !isDarkMode
              ? { title: classes.title }
              : { title: classes.titleDark, subheader: classes.titleDark }
          }
        /> */}
          <CardContent>
            <Typography variant="h6" color="textSecondary" style={isDarkMode ? { color: "#ddd" } : null}>
              {note.title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={isDarkMode ? { color: "#ddd" } : null}
            >
              {note.details}
            </Typography>
          </CardContent>
        </Link>
        <CardActions></CardActions>
      </Card>
    </>
  );
};

export default NoteCard;
