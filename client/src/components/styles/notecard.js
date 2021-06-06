import { makeStyles } from "@material-ui/core";
import { blue, green, pink, yellow } from "@material-ui/core/colors";

export default makeStyles({
  avatar: {
    backgroundColor: (note) => {
      if (note.category === "work") {
        return yellow[700];
      }
      if (note.category === "money") {
        return green[500];
      }
      if (note.category === "todos") {
        return pink[500];
      }
      return blue[500];
    },
  },
  title: {
    fontSize: "18px",
    fontWeight: "500",
  },
  titleDark: {
    color: "#ddd",
  },
  // media: {
  //   height: 0,
  //   paddingTop: "56.25%", // 16:9
  // },
});
