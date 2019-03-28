import {
  drawerWidth,
  transition,
  container
} from "assets/jss/material-dashboard-react";

const appStyle = theme => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh",
    overflow: 'hidden',
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch",
    marginTop: '65px',
  },
  content: {
    minHeight: "calc(100vh - 123px)",
    padding: '5px',
  },
  container,
  map: {
  }
});

export default appStyle;
