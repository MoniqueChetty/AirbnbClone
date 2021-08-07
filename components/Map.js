import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import { Result } from "postcss";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithubAlt,
  faAirbnb,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

function Map({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});

  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));
  const center = getCenter(coordinates);
  console.log(center);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });
  return (
    <ReactMapGL
      mapStyle="mapbox://styles/moniquechetty/cks1fb7gd37tn17qo10dkr22b"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker latitude={result.lat} longitude={result.long}>
            <p
              role="img"
              className="cursor-pointer text-2xl animate-bounce text-[#FE595E] text-bold"
              onClick={() => setSelectedLocation(result)}
              aria-label="push-pin"
            >
              <FontAwesomeIcon icon={faAirbnb} />
            </p>
          </Marker>
          {/* {popup when marker clicked} */}
          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
            >
              <div className="z-50 flex items-center m-2  mt-5 space-x-4 rounded-xl cursor-pointer">
                <div className="relative h-16 w-16  ">
                  <Image
                    className="rounded-lg"
                    src={result.img}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="w-35 flex-col ">
                  <h2 className="i">{result.title}</h2>
                  <h2 className="text-gray-500 flex justify-end ">
                    <StarIcon className="h-5 text-red-400 mr-1" />
                    {result.star}
                  </h2>
                  <h2 className="text-gray-500 flex justify-end ">
                    {result.price}
                  </h2>
                </div>
              </div>
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
