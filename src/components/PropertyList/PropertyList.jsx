import React, { Component } from "react";
import PropertyCard from "../PropertyCard/PropertyCard";
import { connect } from "react-redux";
import styles from "./PropertyList.module.scss";

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
        {this.props.properties.map((property, index) => (
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

const mapStateToProps = ({ cardSize, favs }) => ({ cardSize, favs });

export const PropertyList = connect(
  mapStateToProps,
  null
)(PropertyListComponent);
