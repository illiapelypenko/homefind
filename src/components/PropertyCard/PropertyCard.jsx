import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropertyCardMinified from "./PropertyCardMinified";
import PropertyCardStandart from "./PropertyCardStandart";
import { addFav, removeFav } from "../../store/actions";

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

  addFav = (e) => {
    e.stopPropagation();
    const { property, addFav } = this.props;
    addFav(property);
  };

  removeFav = (e) => {
    e.stopPropagation();
    const { property, removeFav } = this.props;
    removeFav(property);
  };

  render() {
    const { cardSize, property, favs } = this.props;

    const isFav = !!favs.find(
      (fav) => fav.property_id === property.property_id
    );

    const Component =
      cardSize === "standart" ? PropertyCardStandart : PropertyCardMinified;

    return (
      <Component
        property={property}
        propertyIsLoading={this.state.propertyIsLoading}
        onPropertyClick={this.handlePropertyClick}
        addFav={this.addFav}
        removeFav={this.removeFav}
        isFav={isFav}
      />
    );
  }
}

const mapStateToProps = ({ favs }) => ({ favs });

const mapDispatchToProps = {
  addFav,
  removeFav,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PropertyCard));
