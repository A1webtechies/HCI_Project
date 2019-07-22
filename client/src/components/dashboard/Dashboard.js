import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
import Properties from "../properties/Properties";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { FavoriteBorder, ListAlt } from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";

const drawerWidth = 240;
const styles = theme => ({
  primaryLight: {
    backgroundColor: theme.palette.primary.light
  }
});
const stylesheet = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      open: false
    };
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }
  onClickExpand = e => {
    this.setState({ expanded: !this.state.expanded });
  };
  handleDrawerOpen = e => {
    this.setState({ open: true });
  };
  handleDrawerClose = e => {
    this.setState({ open: false });
  };
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    const { classes } = this.props;
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <div>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a
              href=""
              onClick={this.onLogoutClick.bind(this)}
              className="nav-link"
            >
              <img
                className="rounded-circle"
                src={user.avatar}
                alt={user.name}
                style={{ width: "25px", marginRight: "5px" }}
                title="You must have a Gravatar connected to your email to display an image"
              />{" "}
              Logout
            </a>
          </li>
        </ul>
      </div>
    );

    const guestLinks = (
      <div>
        <Link
          to="/register"
          className="btn btn-outline-warning "
          style={{ marginRight: "20px" }}
        >
          SignUp
        </Link>
        <Link to="/login" className="btn btn-outline-success">
          Login
        </Link>
      </div>
    );

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      // <div className="dashboard">
      //   <div className="container">
      //     <div className="row">
      //       <div className="col-md-12">
      //         <h1 className="display-4">Dashboard</h1>
      //         {dashboardContent}
      //       </div>
      //     </div>
      //   </div>
      // </div>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: this.state.open
          })}
          color="secondary"
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: this.state.open
              })}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h5"
              type="title"
              color="inherit"
              style={{ flex: 1 }}
            >
              Home
            </Typography>
            {isAuthenticated ? authLinks : guestLinks}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open
            })
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <div className="list-item-hover">
              <ListItem>
                <ListItemIcon>
                  <FavoriteBorder style={{ color: "#FFFFFF" }} />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography type="body2" style={{ color: "#FFFFFF" }}>
                      Saved Properties
                    </Typography>
                  }
                />
              </ListItem>
            </div>
            <div className="list-item-hover">
              <Link to="/create-profile" style={{ textDecoration: "none" }}>
                <ListItem>
                  <ListItemIcon>
                    <ListAlt style={{ color: "#FFFFFF" }} />
                  </ListItemIcon>

                  <ListItemText
                    disableTypography
                    primary={
                      <Typography type="body2" style={{ color: "#FFFFFF" }}>
                        Wishlist
                      </Typography>
                    }
                  />
                </ListItem>
              </Link>
            </div>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className={classes.root}>
            <Properties />
          </div>
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,

  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount, logoutUser, clearCurrentProfile }
)(withStyles(stylesheet)(Dashboard));
