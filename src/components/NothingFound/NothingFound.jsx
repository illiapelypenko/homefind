import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import background from "../../assets/nothingFoundBg.png";
import backgroundFav from "../../assets/nothingFoundBgFav.png";
import styles from "./NothingFound.module.scss";

function NothingFoundComponent(props) {
  return (
    <div className={styles.nothingFound}>
      <img src={props.fromFav ? backgroundFav : background} alt='background' />
      <p>{props.error || "Page not found"}</p>
      <Link to='/'>Back to search</Link>
    </div>
  );
}

const mapStateToProps = ({ error }, ownProps) => ({
  error: ownProps.error || error,
});

export const NothingFound = connect(
  mapStateToProps,
  null
)(withRouter(NothingFoundComponent));
