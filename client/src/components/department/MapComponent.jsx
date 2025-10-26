import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapComponent = ({ lat, lng }) => {

  return (
    <div style={{ width: "100%", height: "300px" }}> 
      <MapContainer
        center={[lat, lng]}
        zoom={10}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }} // ✅ full size inside parent
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Optional marker */}
        <Marker position={[lat, lng]}>
          <Popup>
            Latitude: {lat}, Longitude: {lng}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;

