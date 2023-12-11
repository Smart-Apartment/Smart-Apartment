import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles";

class Loading extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.parent}>
        <div className={classes.loader}>
          <div className={classes.loading}></div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Loading);
