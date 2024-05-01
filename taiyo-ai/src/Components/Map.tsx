import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

interface MapProps {
  lat: number;
  long: number;
}

const Map = ({ lat, long }: MapProps) => {
  const position: [number, number] = [lat, long];
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState("");
  return (
    <div style={{ height: "400px", width: "100%" }}>
    
    </div>
  );
};

export default Map;
