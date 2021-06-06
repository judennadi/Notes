import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    av: {
      width: 100,
      height: 100,
      marginBottom: 20,
    },
    root: {
      backgroundColor: "rgba(0,0,0,0.8)",
      "&:hover": {
        backgroundColor: "rgba(0,0,0,0.8)",
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
    avCon: {
      width: "100%",
      display: "grid",
      placeItems: "center",
    },
    liWidth: {
      marginTop: 20,
      [theme.breakpoints.up("sm")]: {
        width: 400,
        placeSelf: "center",
      },
    },
    textLab: {
      color: "#ddd !important",
    },
  };
});

export default useStyles;
