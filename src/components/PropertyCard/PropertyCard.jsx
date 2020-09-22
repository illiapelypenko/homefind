import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ReactComponent as StarIcon } from "../../assets/icons/starIcon.svg";
import { ReactComponent as StarIconDisabled } from "../../assets/icons/starIconDisabled.svg";
import { ReactComponent as MediumSpinner } from "../../assets/icons/mediumSpinner.svg";
import { numberWithSpaces } from "../../utils/utils";
import { addFav, removeFav } from "../../store/actions";
import styles from "./PropertyCard.module.scss";
import PropertyCardMinified from "./PropertyCardMinified";
import PropertyCardStandart from "./PropertyCardStandart";

class PropertyCard extends Component {
  state = {
    propertyIsLoading: false,
  };

  handlePropertyClick = () => {
    this.setState({ propertyIsLoading: true });

    setTimeout(() => {
      this.setState({ propertyIsLoading: false });

      this.props.history.push("/property", { property: this.props.property });
    }, 2000);
  };

  addToFavs = (e) => {
    e.stopPropagation();
    const { dispatch, property, favs } = this.props;
    dispatch(addFav(property, favs));
  };

  removeFromFavs = (e) => {
    e.stopPropagation();
    const { dispatch, property, favs } = this.props;
    dispatch(removeFav(property, favs));
  };

  render() {
    const { cardSize, property } = this.props;

    return cardSize === "standart" ? (
      <PropertyCardStandart
        property={property}
        propertyIsLoading={this.state.propertyIsLoading}
        onPropertyClick={this.handlePropertyClick}
        addToFavs={this.addToFavs}
        removeFromFavs={this.removeFromFavs}
      />
    ) : (
      <PropertyCardMinified
        property={property}
        propertyIsLoading={this.state.propertyIsLoading}
        onPropertyClick={this.handlePropertyClick}
        addToFavs={this.addToFavs}
        removeFromFavs={this.removeFromFavs}
      />
    );
  }
}

function mapStateToProps(state) {
  const { favs } = state;
  return { favs };
}

export default connect(mapStateToProps, null)(withRouter(PropertyCard));
