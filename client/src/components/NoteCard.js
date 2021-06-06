import { useContext } from "react";
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

  return (
    <>
      <Card elevation={2} style={isDarkMode ? { background: "#333", color: "#fff" } : null}>
        <CardMedia className={classes.media} height={note.image ? 140 : ""} image="" />
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
        <CardActions>
          <Avatar src={note.creator ? note.creator.image : ""}></Avatar>
          <Typography>{note.creator ? note.creator.username : ""}</Typography>
          <IconButton aria-label="settings" style={{ marginLeft: "auto", color: "#fff" }}>
            <MoreVertIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default NoteCard;
