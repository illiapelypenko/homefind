import React, { Component } from "react";
import PropertyCard from "../PropertyCard/PropertyCard";
import styles from "./PropertyList.module.scss";
import { connect } from "react-redux";

class PropertyListComponent extends Component {
  render() {
    return (
      <ul
        className={`${styles.propertyList} ${
          this.props.cardSize === "minified"
            ? styles.propertyListMinified
            : styles.propertyListStandart
        }`}
      >
        {this.state.properties.map((property, index) => (
          <PropertyCard
            property={property}
            cardSize={this.props.cardSize}
            key={index}
            checkFavorability={this.checkFavorability}
          />
        ))}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  const { cardSize, favs } = state;
  return { cardSize, favs };
}

export const PropertyList = connect(
  mapStateToProps,
  null
)(PropertyListComponent);
