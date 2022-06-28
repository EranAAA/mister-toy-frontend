
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import { API } from '../api.js'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export class Map extends Component {
   state = {
      center: {
         lat: 32.0716623,
         lng: 34.7848943
      },
      zoom: 15
   };

   componentDidUpdate() {
      const { branch } = this.props
      if (this.state.center.lat !== branch.lat) {
         this.setState({ center: { lat: branch.lat, lng: branch.lng } })
      }
   }

   onSetCenter = ({ x, y, lat, lng, event }) => {
      // console.log({ x, y, lat, lng, event });
      this.setState({
         center: {
            lat,
            lng
         }
      })
   }

   render() {

      return (
         // Important! Always set the container height explicitly
         <div style={{ height: '70%', width: '100%' }}>
            <GoogleMapReact
               bootstrapURLKeys={{ key: API }}
               defaultCenter={this.state.center}
               center={this.state.center}
               defaultZoom={this.state.zoom}
               onClick={this.onSetCenter}
            >
               <AnyReactComponent
                  lat={this.state.center.lat}
                  lng={this.state.center.lng}
                  text="📍"
               />
            </GoogleMapReact>
         </div>
      );
   }
}

