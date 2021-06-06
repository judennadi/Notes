import { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Hidden, Divider } from "@material-ui/core";
import { AddCircleOutlineOutlined, SubjectOutlined } from "@material-ui/icons";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import useStyles from "./styles/layout";
import { AuthContext } from "../context/AuthContextProvider";

const Navbar = (props) => {
  const { mobileOpen, setMobileOpen, handleDrawerToggle } = props;
  const { user, isDarkMode, dispatch } = useContext(AuthContext);
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  let mql = window.matchMedia("(max-width: 600px)");

  const menuItems = [
    {
      text: "My Notes",
      icon: <SubjectOutlined color="secondary" />,
      path: "/",
    },
    {
      text: "Create Note",
      icon: <AddCircleOutlineOutlined color="secondary" />,
      path: "/create",
    },
  ];

  const handleMenu = (path) => {
    history.push(path);

    if (mql.matches) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleLogout = async () => {
    await axios.get("auth/logout");
    history.push("/login");
    dispatch({ type: "SET_USER", payload: null });
    if (mql.matches) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div className={classes.nav}>
      <div className={classes.toolbar}></div>
      <Divider classes={isDarkMode ? { root: classes.divider } : null} />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => handleMenu(item.path)}
            className={
              location.pathname === item.path && !isDarkMode
                ? classes.active
                : location.pathname === item.path && isDarkMode
                ? classes.darkActive
                : null
            }
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}

        {!user ? (
          <>
            <ListItem
              button
              onClick={() => handleMenu("/login")}
              className={
                location.pathname === "/login" && !isDarkMode
                  ? classes.active
                  : location.pathname === "/login" && isDarkMode
                  ? classes.darkActive
                  : null
              }
            >
              <ListItemIcon>
                <LockOpenIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
            {mql.matches && (
              <ListItem
                button
                onClick={() => handleMenu("/verification")}
                className={
                  location.pathname === "/verification" && !isDarkMode
                    ? classes.active
                    : location.pathname === "/verification" && isDarkMode
                    ? classes.darkActive
                    : null
                }
              >
                <ListItemIcon>
                  <LockOpenIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Register" />
              </ListItem>
            )}
          </>
        ) : (
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppOutlinedIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        )}
      </List>
    </div>
  );

  return (
    <>
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: isDarkMode ? classes.drawT : classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>

        <Hidden xsDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{ paper: isDarkMode ? classes.drawT : classes.drawerPaper }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </>
  );
};

export default Navbar;
