import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropertyCardMinified from './PropertyCardMinified';
import PropertyCardStandart from './PropertyCardStandart';

class PropertyCard extends Component {
  state = {
    propertyIsLoading: false,
  };

  handlePropertyClick = () => {
    this.setState({ propertyIsLoading: true });

    setTimeout(() => {
      this.setState({ propertyIsLoading: false });

      this.props.history.push('/property', { property: this.props.property });
    }, 2000);
  };

  addToFavs = e => {
    e.stopPropagation();

    const persistedData = localStorage.getItem('favs');
    let favs = [];

    if (persistedData) favs = JSON.parse(persistedData);

    favs.push(this.props.property);
    localStorage.setItem('favs', JSON.stringify(favs));

    this.props.checkFavorability();
  };

  removeFromFavs = e => {
    e.stopPropagation();

    const persistedData = localStorage.getItem('favs');
    const favs = JSON.parse(persistedData);
    const removeIndex = favs.findIndex(
      fav => fav.property_id === this.props.property.property_id
    );

    favs.splice(removeIndex, 1);
    localStorage.setItem('favs', JSON.stringify(favs));

    this.props.checkFavorability();
  };

  render() {
    const { cardSize, property } = this.props;

    return cardSize === 'standart' ? (
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

export default withRouter(PropertyCard);
