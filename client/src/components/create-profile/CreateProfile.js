import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import {
  createWishlist,
  getCurrentWishlist
} from "../../actions/wishlistActions";
import Box from "@material-ui/core/Box";
import Slider from "@material-ui/core/Slider";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import clsx from "clsx";
import SaveIcon from "@material-ui/icons/Save";
import Cancel from "@material-ui/icons/Cancel";
import { withStyles } from "@material-ui/styles";

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  fab: {
    margin: theme.spacing(1),
    height: 50,
    width: 50
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    backgroundColor: "#eee",
    margin: 15,
    width: 80,
    height: 80
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  button: {
    margin: theme.spacing(1)
  },
  leftIcon: {
    marginRight: theme.spacing(2)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 20
  },
  select: {
    "&:before": {
      borderColor: "#FAFAFA"
    },
    "&:after": {
      borderColor: "#FAFAFA"
    }
  },
  icon: {
    fill: "#FAFAFA"
  }
});

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(Slider);

class CreateWishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      leaseTerm: "",
      shortBio: "",
      desiredRent: 500,
      numberOfRenters: 1,
      numberOfCars: 1,
      numberOfPets: 1,
      city: "",
      rentalType: [],
      beds: "",
      baths: "",
      petsAllowed: false,
      furnished: false,
      priceRange: 1000,
      rt_room: false,
      rt_apartment: false,
      rt_singlefamily: false,
      rt_delux: false,
      rt_commercial: false,
      rt_triplex: false,
      rt_townhouse: false,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getCurrentWishlist();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.wishlist.wishlist) {
      const wishlist = nextProps.wishlist.wishlist;
      if (wishlist.rentalType) {
        wishlist.rentalType.map(options => {
          this.setState({
            [options]: true
          });
        });
      }

      this.setState({
        leaseTerm: wishlist.leaseTerm,
        shortBio: wishlist.shortBio,
        desiredRent: wishlist.desiredRent,
        numberOfRenters: wishlist.numberOfRenters,
        numberOfCars: wishlist.numberOfCars,
        numberOfPets: wishlist.numberOfPets,
        city: wishlist.city,
        rentalType: wishlist.rentalType,
        beds: wishlist.beds,
        baths: wishlist.baths,
        petsAllowed: wishlist.petsAllowed,
        furnished: wishlist.furnished,
        priceRange: wishlist.priceRange
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const profileData = {
      shortBio: this.state.shortBio,
      leaseTerm: this.state.leaseTerm,
      desiredRent: this.state.desiredRent,
      numberOfRenters: this.state.numberOfRenters,
      numberOfCars: this.state.numberOfCars,
      numberOfPets: this.state.numberOfPets,
      city: this.state.city,
      rentalType: this.state.rentalType,
      beds: this.state.beds,
      baths: this.state.baths,
      petsAllowed: this.state.petsAllowed,
      furnished: this.state.furnished
    };
    // console.log(profileData);
    this.props.createWishlist(profileData, this.props.history);
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  cancelClick = e => {
    this.props.history.push("/dashboard");
  };
  onCheckBoxClick = e => {
    const newElement = e.target.name;
    this.setState({ [e.target.name]: e.target.checked });
    this.setState(prevState => ({
      rentalType: [...prevState.rentalType, newElement]
    }));
  };
  onCheckBox = e => {
    this.setState({ [e.target.name]: e.target.checked });
  };
  onChagePrice = name => (e, value) => {
    this.setState({
      [name]: value
    });
  };

  onDragStop = e => {
    this.props.update(this.state.value);
  };
  onEditClick = e => {
    e.preventDefault();
    this.setState({ disabled: !this.state.disabled });
    console.log(this.state.disabled);
  };
  render() {
    const { errors } = this.state;

    const errorClass = {
      t: true,
      f: false
    };
    const { wishlist, loading } = this.props.wishlist;
    const { classes } = this.props;
    let editMode = this.state.disabled;

    let profileAction;
    if (wishlist === null || loading) {
      profileAction = <Spinner />;
    } else if (Object.keys(wishlist).length > 0) {
      profileAction = (
        <Grid item xs={12}>
          <Fab
            color="secondary"
            aria-label="Edit"
            className={classes.fab}
            onClick={this.onEditClick}
          >
            <Icon>edit_icon</Icon>
          </Fab>
        </Grid>
      );
    } else {
      editMode = !editMode;
      profileAction = " ";
    }

    const leaseTerm = [
      {
        value: "Monthly",
        label: "Monthly"
      },
      {
        value: "Six Month",
        label: "Six Month"
      },
      {
        value: "One Year",
        label: "One Year"
      }
    ];
    const beds = [
      {
        value: "1",
        label: "1"
      },
      {
        value: "2",
        label: "2"
      },
      {
        value: "3",
        label: "3"
      },
      {
        value: "4",
        label: "4"
      },
      {
        value: "5",
        label: "5"
      },
      {
        value: "6",
        label: "6"
      },
      {
        value: "7",
        label: "7"
      },
      {
        value: "studio",
        label: "studio"
      }
    ];
    const baths = [
      {
        value: "1",
        label: "1"
      },
      {
        value: "2",
        label: "2"
      },
      {
        value: "3",
        label: "3"
      },
      {
        value: "4",
        label: "4"
      },
      {
        value: "5",
        label: "5"
      },
      {
        value: "6",
        label: "6"
      },
      {
        value: "7",
        label: "7"
      },
      {
        value: "shared",
        label: "shared"
      }
    ];

    return (
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <img src="/img/wishlist.jpg" alt="wishlist" />
          </Avatar>
          <Typography component="h1" variant="h3">
            Wishlist
          </Typography>
          {profileAction}
          <form className={classes.form} onSubmit={this.onSubmit} noValidate>
            <Grid container spacing={2}>
              <Typography variant="h6"> Genral Information</Typography>
              <Grid item xs={12}>
                <TextField
                  error={errors.shortBio ? errorClass.t : errorClass.f}
                  disabled={editMode}
                  autoComplete="ShortBio"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="shortBio"
                  label="Short Bio"
                  name="shortBio"
                  value={this.state.shortBio}
                  onChange={this.onChange}
                  multiline={true}
                  rows={2}
                  rowsMax={4}
                  helperText={errors.shortBio ? errors.shortBio : " "}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errors.desiredRent ? errorClass.t : errorClass.f}
                  disabled={editMode}
                  name="desiredRent"
                  variant="outlined"
                  value={this.state.desiredRent}
                  onChange={this.onChange}
                  required
                  fullWidth
                  id="standard-number"
                  type="number"
                  inputProps={{ min: "500", max: "15000", step: "1" }}
                  label="Desireable Monthly Rent $"
                  helperText={errors.desiredRent ? errors.desiredRent : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errors.leaseTerm ? errorClass.t : errorClass.f}
                  disabled={editMode}
                  id="leaseTerm"
                  select
                  required
                  variant="outlined"
                  label="Select Your Desired Lease Term"
                  name="leaseTerm"
                  fullWidth
                  className={classes.select}
                  value={this.state.leaseTerm}
                  onChange={this.onChange}
                  helperText={errors.leaseTerm ? errors.leaseTerm : ""}
                >
                  {leaseTerm.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  error={errors.numberOfRenters ? errorClass.t : errorClass.f}
                  disabled={editMode}
                  autoComplete="numberOfRenters"
                  name="numberOfRenters"
                  variant="outlined"
                  value={this.state.numberOfRenters}
                  onChange={this.onChange}
                  required
                  fullWidth
                  id="standard-number"
                  type="number"
                  label="Number of Renters $"
                  helperText={
                    errors.numberOfRenters ? errors.numberOfRenters : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  error={errors.numberOfCars ? errorClass.t : errorClass.f}
                  disabled={editMode}
                  autoComplete="numberOfCars"
                  name="numberOfCars"
                  variant="outlined"
                  value={this.state.numberOfCars}
                  onChange={this.onChange}
                  required
                  fullWidth
                  id="standard-number"
                  type="number"
                  label="Number of Cars"
                  helperText={errors.numberOfCars ? errors.numberOfCars : " "}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  error={errors.numberOfPets ? errorClass.t : errorClass.f}
                  disabled={editMode}
                  autoComplete="numberOfPets"
                  name="numberOfPets"
                  variant="outlined"
                  value={this.state.numberOfPets}
                  onChange={this.onChange}
                  required
                  fullWidth
                  id="standard-number"
                  type="number"
                  label="Number of Pets"
                  helperText={errors.numberOfPets ? errors.numberOfPets : ""}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  error={errors.city ? errorClass.t : errorClass.f}
                  disabled={editMode}
                  name="city"
                  value={this.state.city}
                  onChange={this.onChange}
                  required
                  fullWidth
                  variant="outlined"
                  label="Enter The City"
                  helperText={errors.city ? errors.city : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Rental Type</Typography>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="rt_room"
                      checked={this.state.rt_room}
                      onChange={this.onCheckBoxClick}
                      value={this.state.rt_room}
                      disabled={editMode}
                    />
                  }
                  label="Room"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="rt_apartment"
                      checked={this.state.rt_apartment}
                      onChange={this.onCheckBoxClick}
                      value={this.state.rt_apartment}
                      disabled={editMode}
                    />
                  }
                  label="Apartment"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="rt_singlefamily"
                      checked={this.state.rt_singlefamily}
                      onChange={this.onCheckBoxClick}
                      value={this.state.rt_singlefamily}
                      disabled={editMode}
                    />
                  }
                  label="Single Family"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="rt_delux"
                      checked={this.state.rt_delux}
                      onChange={this.onCheckBoxClick}
                      value={this.state.rt_delux}
                      disabled={editMode}
                    />
                  }
                  label="Delux"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="rt_commercial"
                      checked={this.state.rt_commercial}
                      onChange={this.onCheckBoxClick}
                      value={this.state.rt_commercial}
                      disabled={editMode}
                    />
                  }
                  label="Commercial"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="rt_triplex"
                      checked={this.state.rt_triplex}
                      onChange={this.onCheckBoxClick}
                      value={this.state.rt_triplex}
                      disabled={editMode}
                    />
                  }
                  label="Triplex"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="rt_townhouse"
                      checked={this.state.rt_townhouse}
                      onChange={this.onCheckBoxClick}
                      value={this.state.rt_townhouse}
                      disabled={editMode}
                    />
                  }
                  label="Townhouse"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errors.beds ? errorClass.t : errorClass.f}
                  id="beds"
                  select
                  variant="outlined"
                  label="# of beds"
                  name="beds"
                  fullWidth
                  className={classes.textField}
                  value={this.state.beds}
                  onChange={this.onChange}
                  disabled={editMode}
                  helperText={errors.beds ? errors.beds : ""}
                >
                  {beds.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errors.baths ? errorClass.t : errorClass.f}
                  id="baths"
                  select
                  variant="outlined"
                  label="# of baths"
                  name="baths"
                  fullWidth
                  className={classes.textField}
                  value={this.state.baths}
                  onChange={this.onChange}
                  disabled={editMode}
                  helperText={errors.baths ? errors.baths : ""}
                >
                  {baths.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      name="petsAllowed"
                      checked={this.state.petsAllowed}
                      onChange={this.onCheckBox}
                      value={this.state.petsAllowed}
                      disabled={editMode}
                    />
                  }
                  label={
                    this.state.petsAllowed
                      ? "Pets Allowed(Yes)"
                      : "Pets Allowed (No)"
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      name="furnished"
                      checked={this.state.furnished}
                      onChange={this.onCheckBox}
                      value={this.state.furnished}
                      disabled={editMode}
                    />
                  }
                  label={
                    this.state.furnished ? "Furnished (Yes)" : "Furnished (No)"
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">Price Range</Typography>
                <Box component="span" style={{ fontSize: "18px" }}>
                  From:{" "}
                  <span style={{ fontWeight: "700px", color: "green" }}>
                    500$
                  </span>
                </Box>

                <Box
                  component="span"
                  style={{ marginLeft: "350px ", fontSize: "18px" }}
                >
                  To:{" "}
                  <span
                    style={{
                      fontWeight: "700px",
                      color: "green"
                    }}
                  >
                    {this.state.priceRange}
                    {"$"}
                  </span>
                </Box>
                <PrettoSlider
                  valueLabelDisplay="auto"
                  aria-label="Price Range"
                  min={500}
                  max={15000}
                  name="priceRange"
                  value={this.state.priceRange}
                  onChange={this.onChagePrice("priceRange")}
                  disabled={editMode}
                />
              </Grid>

              <Button
                type="submit"
                variant="contained"
                size="medium"
                onClick={this.cancelClick}
                className={classes.button}
              >
                <Cancel className={clsx(classes.leftIcon, classes.iconSmall)} />
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                size="medium"
                className={classes.button}
                style={{ marginLeft: "288px" }}
              >
                <SaveIcon className={clsx(classes.leftIcon)} />
                Save
              </Button>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

CreateWishlist.propTypes = {
  wishlist: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  wishlist: state.wishlist,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createWishlist, getCurrentWishlist }
)(withRouter(withStyles(styles)(CreateWishlist)));
