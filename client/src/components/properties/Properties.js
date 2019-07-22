import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getPropertiesOfUserCity } from "../../actions/propertyActions";
// Material UI imports
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {
  HotelOutlined,
  HotTubOutlined,
  EventAvailableOutlined
} from "@material-ui/icons";
import ListItemText from "@material-ui/core/ListItemText";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/styles";
import { Paper } from "@material-ui/core";

const styles = theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: "#FAFAFA",
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    background: "#fff"
  },
  cardMedia: {
    // paddingTop: "56.25%" // 16:9
    padding: "150px"
  },
  cardContent: {
    flexGrow: 1,
    backgroundColor: "#FAFAFA"
  },
  cardActions: {
    backgroundColor: "#FAFAFA"
  },
  list: {
    display: "flex",
    flexDirection: "row",
    padding: 0
  },
  margin: {
    margin: theme.spacing(1.4, 7, 0, 0)
  },
  padding: {
    padding: theme.spacing(0, 2)
  },
  paper: {}
});
class Properties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      picName: "",
      city: "",
      address: "Pox box #21 Model Town ",
      desc: "",
      amenties: [],
      monthlyRent: 500,
      beds: "",
      baths: "",
      unitType: "",
      petsAllowed: "",
      furnished: "",
      leaseTerm: ""
    };
  }
  componentDidMount() {
    this.props.getPropertiesOfUserCity();
  }

  render() {
    const { properties, loading } = this.props.properties;
    const { classes } = this.props;
    const cards = [1, 2, 3, 4, 5, 6];
    return (
      <div>
        <CssBaseline />

        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h4"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Find the Perfect Home
              </Typography>
              <div style={{ textAlign: "center" }}>
                <TextField
                  id="standard-full-width"
                  style={{ margin: 8 }}
                  placeholder="Type City Name"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                />

                <button
                  type="button"
                  className="btn btn-outline-success"
                  style={{ display: "inline-block", marginTop: "15px" }}
                >
                  Success
                </button>
              </div>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {cards.map(card => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <Badge
                      component="h6"
                      className={classes.margin}
                      badgeContent={"Monthly Rent $800"}
                      color="primary"
                    >
                      <CardMedia
                        className={classes.cardMedia}
                        image="https://source.unsplash.com/random"
                        title="Image title"
                      />
                    </Badge>
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Property Type
                      </Typography>
                      <Typography variant="h4">City</Typography>
                      <address>{this.state.address}</address>
                      <List className={classes.list}>
                        <ListItem>
                          <ListItemIcon>
                            <HotelOutlined />{" "}
                          </ListItemIcon>
                          <span style={{ marginLeft: "-20px" }}>3</span>
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <HotTubOutlined /> 2
                          </ListItemIcon>
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <EventAvailableOutlined /> 2
                          </ListItemIcon>
                        </ListItem>
                      </List>
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                      <Button fullWidth color="secondary">
                        Details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  properties: state.properties
});

export default connect(
  mapStateToProps,
  { getPropertiesOfUserCity }
)(withRouter(withStyles(styles)(Properties)));
