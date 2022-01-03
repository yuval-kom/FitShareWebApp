import React, { useCallback } from 'react';
import { useEffect, useState , useRef} from "react";
import ReactMapGL, {Marker, Popup, } from 'react-map-gl';
import axios from 'axios';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import {Geocoder , mbxGeocoding}  from 'react-mapbox-gl-geocoder';




function GenerateMap() {

const fetchData = useCallback(() => {
    const geocodingClient = mbxGeocoding({
      accessToken: mapboxgl.accessToken,
    });

    // geocoding with countries
    return geocodingClient
      .forwardGeocode({
        query: 'Ikeja, Lagos',
        countries: ['ng'],
        limit: 2,
      })
      .send()
      .then((response) => {
        const match = response.body;
        const coordinates = match.features[0].geometry.coordinates;
        const placeName = match.features[0].place_name;
        const center = match.features[0].center;

        return {
          type: 'Feature',
          center: center,
          geometry: {
            type: 'Point',
            coordinates: coordinates,
          },
          properties: {
            description: placeName,
          },
        };
      });
  }, []);