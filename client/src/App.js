import { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Notes from "./components/Notes";
import NoteDetails from "./components/NoteDetails";
import Create from "./components/Create";
import Profile from "./components/Profile";
import Layout from "./components/Layout";
import Login from "./components/auth/Login";
import VerifyEmail from "./components/auth/VerifyEmail";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import { AuthContext } from "./context/AuthContextProvider";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1da1f2",
    },
    secondary: {
      main: "#e91e63",
    },
    tet: {
      main: "#fff",
    },
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

function App() {
  const { user } = useContext(AuthContext);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" render={() => (!user ? <Redirect to="/login" /> : <Notes />)} />
            <Route path="/create" component={Create} />
            <Route path="/notes/:id" component={NoteDetails} />
            <Route path="/profile" component={Profile} />
            <Route path="/login" component={Login} />
            <Route path="/verification" component={VerifyEmail} />
            <Route path="/register/:verifyToken" component={Register} />
            <Route path="/forgotpassword" component={ForgotPassword} />
            <Route path="/resetpassword/:resetToken" component={ResetPassword} />
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
