import React, { useState, useContext } from "react";
import { Typography, AppBar, Toolbar, IconButton, Avatar, Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { format } from "date-fns";
import useStyles from "./styles/layout";
import ElevationScroll from "./ElevateAppbar";
import Navbar from "./Navbar";
import { AuthContext } from "../context/AuthContextProvider";
import { Link } from "react-router-dom";

const Layout = (props) => {
  const { children } = props;
  const { user, isDarkMode } = useContext(AuthContext);
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root} style={isDarkMode ? { background: "#000", color: "#ddd" } : null}>
      <ElevationScroll {...props}>
        <AppBar className={classes.appbar} style={isDarkMode ? { background: "#333", color: "#fff" } : null}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h5" color="secondary" className={classes.title} noWrap>
              <Link to="/">Notes</Link>
            </Typography>
            {!user ? (
              <div className={classes.yo}>
                <Link to="/login">
                  <Button color="secondary" className={classes.login}>
                    Login
                  </Button>
                </Link>
                <Link to="/register/user">
                  <Button variant="contained" color="secondary">
                    Register
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <Typography className={classes.date}>{user.username}</Typography>
                <Link to="/profile">
                  <Avatar src={user.image} className={classes.avatar}>
                    {!user.image ? user.username[0].toUpperCase() : ""}
                  </Avatar>
                </Link>
              </>
            )}
            {/* <Typography className={classes.date}>{format(new Date(), "E',' do MMM Y")}</Typography> */}
          </Toolbar>
        </AppBar>
      </ElevationScroll>

      {/* Side Bar */}
      <Navbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} handleDrawerToggle={handleDrawerToggle} />

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
