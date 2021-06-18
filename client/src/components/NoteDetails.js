import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContextProvider";
import { Container, Typography, CircularProgress, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const NoteDetails = ({ match, history }) => {
  const { isDarkMode, handleDelete } = useContext(AuthContext);
  const id = match.params.id;
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.navigator.vibrate(5000);
    const source = axios.CancelToken.source();
    const fetchNote = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/notes/${id}`, { cancelToken: source.token });
        setNote(data);
        setLoading(false);
      } catch (error) {
        if (!axios.isCancel(error)) {
          setLoading(false);
        }
        console.log(error);
      }
    };
    fetchNote();
    return () => {
      source.cancel();
    };
  }, [id]);

  return (
    <Container maxWidth="sm">
      {loading && (
        <div className="loader" style={isDarkMode ? { background: "rgba(0,0,0,0.9)" } : null}>
          <CircularProgress size="40px" thickness={4} color="secondary" />
        </div>
      )}
      <Typography variant="h4">{note.title}</Typography>
      <Typography>{note.details}</Typography>
      <IconButton
        onClick={() => {
          handleDelete(id);
          history.push("/");
        }}
      >
        <DeleteIcon style={isDarkMode ? { color: "#333" } : null} />
      </IconButton>
    </Container>
  );
};

export default NoteDetails;
