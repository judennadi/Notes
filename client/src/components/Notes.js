import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import axios from "axios";
import { Container, Grid, Typography, CircularProgress } from "@material-ui/core";
import NoteCard from "./NoteCard";
import { Link } from "react-router-dom";

export default function Notes() {
  const { isDarkMode, dispatch } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  // const [creators, setCreators] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get("/notes", config, { cancelToken: source.token });
        setNotes(data.notes);
        dispatch({ type: "SET_NOTES", payload: data.notes });
        dispatch({ type: "SET_USER", payload: data.user });
        setIsLoading(false);
      } catch (error) {
        if (!axios.isCancel(error)) {
          setIsLoading(false);
          setIsError("Some error occured");
        }
      }
    };
    fetchData();

    return () => {
      source.cancel();
    };
  }, [dispatch]);

  return (
    <Container style={{ height: "100%" }}>
      {isLoading ? (
        <div className="loader" style={isDarkMode ? { background: "rgba(0,0,0,0.9)" } : null}>
          <CircularProgress size="40px" thickness={4} color="secondary" />
        </div>
      ) : isError ? (
        <div style={isDarkMode ? { height: "100vh", color: "#fff" } : null}>
          <Typography variant="h5">{isError} Please refresh the page</Typography>
        </div>
      ) : (
        <Grid container spacing={3}>
          {notes.map((note) => (
            <Grid item key={note._id} xs={12} sm={6} md={4} lg={3}>
              <NoteCard note={note} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
