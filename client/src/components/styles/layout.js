import { makeStyles } from "@material-ui/core";

const drawerWidth = 240;

export default makeStyles((theme) => {
  return {
    page: {
      width: "100%",
      height: "100%",
      padding: theme.spacing(3),
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
      height: "100%",
    },
    drawT: {
      width: drawerWidth,
      height: "100%",
      background: "#000",
      color: "#fff",
      borderRight: "1px solid rgba(221, 221, 221, 0.4)",
    },
    root: {
      display: "flex",
      height: "100%",
    },
    divider: {
      background: "rgba(221, 221, 221, 0.4)",
    },
    active: {
      background: "#f4f4f4",
    },
    darkActive: {
      background: "#333",
    },
    title: {
      fontWeight: 700,
      flexGrow: 1,
    },
    appbar: {
      backgroundColor: "#fff",
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },

    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    toolbar: theme.mixins.toolbar,
    avatar: {
      marginLeft: theme.spacing(2),
      background: "green",
    },
    date: {
      [theme.breakpoints.only("xs")]: {
        display: "none",
      },
    },
    login: {
      marginRight: theme.spacing(1),
    },
    yo: {
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
  };
});
