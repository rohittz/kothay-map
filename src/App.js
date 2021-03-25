import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as parkData from "./Data/skateboard.json"
import "./App.css"
export default function App() {
  // This setViewPort will enable the zooming and moving functionality of the static map
  const [viewPort, setViewPort] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    width: "100vw",
    height: "100vh",
    zoom: 10
  });
  // now if the users click on a button, they should see some details
  const [clickedPark, setClickedPark] = useState(null);
  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape")
        setClickedPark(null);
    };
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    }
  }, [])
  return (
    <ReactMapGL {...viewPort} mapboxApiAccessToken="pk.eyJ1IjoidmlldzcxIiwiYSI6ImNrbWttd2dlcTBsNTYydmxzejNmNW1menkifQ.iRhtXqsCP74dx2tpXFmbQw" mapStyle="mapbox://styles/view71/ckmp8lplh3r3s17pnok9ntqn1" onViewportChange={nextViewPort => setViewPort(nextViewPort)} >
      {
        parkData.features.map((park) => (
          <Marker key={park.properties.PARK_ID} latitude={park.geometry.coordinates[1]} longitude={park.geometry.coordinates[0]}>
            <button className="skateIconContainer" onClick={(e) => {
              e.preventDefault();
              setClickedPark(park);
            }}>
              <img src="/skateIcon.svg" alt="SkateIcon" />
            </button>
          </Marker>
        ))
      }
      {clickedPark ? (
        <Popup latitude={clickedPark.geometry.coordinates[1]} longitude={clickedPark.geometry.coordinates[0]} onClose={() => {
          setClickedPark(null);
        }}>
          <div>
            <h2>{clickedPark.properties.NAME}</h2>
            <p>{clickedPark.properties.DESCRIPTIO}</p>
          </div>
        </Popup>
      ) : console.log("nothing")}
    </ ReactMapGL>
  );
}