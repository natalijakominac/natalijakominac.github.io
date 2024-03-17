/* global google */

import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

import classes from "./Map.module.css";
import FilterForm from "./FilterForm";

const mapStyle = {
  width: "100%",
  height: "90%",
};

const center = {
  lat: 0,
  lng: 0,
};

const citiesUrl = "https://wft-geo-db.p.rapidapi.com/v1/geo/places?limit=10";

const Map = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [info, setinfo] = useState();

  const [cities, setCities] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const [queryParams, setQueryParams] = useState("");
  const [error, setError] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAhb1KT8Cqi4kOZmwoqgRLtNlg4hRr67SE",
  });

  const searchHandler = (offset, cityNamePrefix, minPopulation) => {
    let query = `&offset=${offset}`;
    query = query.concat(cityNamePrefix ? `&namePrefix=${cityNamePrefix}` : "");
    query = query.concat(
      minPopulation ? `&minPopulation=${minPopulation}` : ""
    );
    setQueryParams(query);
  };

  const fetchCitiesHandler = useCallback(async () => {
    setError(null);

    try {
      const response = await fetch(citiesUrl.concat(queryParams), {
        headers: {
          "x-rapidapi-key":
            "5b1193f57fmsh6978ad214e1eae9p192a75jsnaa7e166e887a",
          "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();
      const data = responseData.data.map((city) => ({
        id: city.id,
        name: city.name,
        region: city.region,
        country: city.country,
        countryCode: city.countryCode,
        population: city.population,
        lat: city.latitude,
        lng: city.longitude,
      }));

      setCities(data);
      setTotalCount(responseData.metadata.totalCount);
    } catch (error) {
      setError(error.message);
    }
  }, [queryParams]);

  const mapLoadHandler = (map) => {
    const bounds = new google.maps.LatLngBounds();
    cities?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
  };

  const showInfoHandler = (city) => {
    setinfo(city);
    setIsOpen(true);
  };

  useEffect(() => {
    fetchCitiesHandler();
  }, [fetchCitiesHandler]);

  return (
    <div className={classes.mapWrapper}>
      <FilterForm onSearch={searchHandler} totalCount={totalCount}></FilterForm>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={mapStyle}
          center={center}
          zoom={1}
          onLoad={mapLoadHandler}
          onClick={() => setIsOpen(false)}
        >
          {cities.map((city) => {
            const lat = city.lat;
            const lng = city.lng;

            return (
              <Marker
                key={`${city.id}-${city.population}`}
                position={{ lat, lng }}
                onClick={() => {
                  showInfoHandler(city);
                }}
              >
                {isOpen && info?.id === city.id && (
                  <InfoWindow
                    onCloseClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <div className={classes.info}>
                      <h3>{info.name}</h3>
                      <span>Population: {info.population}</span>
                      <span>{info.region}</span>
                      <span>
                        {info.country}, {info.countryCode}
                      </span>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            );
          })}
        </GoogleMap>
      )}
      {error && (
        <h1>
          An error has occurred, map cannot be displayed. Please, try again.
        </h1>
      )}
    </div>
  );
};

export default Map;
