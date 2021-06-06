import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    field: {
      marginTop: 20,
      marginBottom: 20,
      display: "block",
    },
    root: {
      marginTop: 20,
      marginBottom: 20,
      display: "block",
      backgroundColor: "#333",
      "&:hover": {
        backgroundColor: "#333",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#ddd",
        },
        "&:hover fieldset": {
          borderColor: "#ddd",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#ddd",
          color: "#ddd",
        },
      },
    },
    btnText: {
      fontWeight: 600,
    },
    btn: {
      marginTop: 20,
    },
    loginH: {
      fontWeight: 700,
      marginBottom: 40,
    },
    toolbar: theme.mixins.toolbar,
    con: {
      background: "#e91e63",
      position: "fixed",
      top: 0,
      right: 0,
      bottom: 0,
      display: "grid",
      placeItems: "center",
    },
    textLab: {
      color: "#ddd !important",
    },
  };
});

export default useStyles;
