import React from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { useState, useMemo, useRef } from 'react'
import '../App.css'
import 'leaflet/dist/leaflet.css'
import arcades from '../arcades.json'

export default function SelectLocation( { action, locationSetter }) {
  const initial = {
    lat: 55.9,
    lng: -3
  }
  const [position, setPosition] = useState(initial);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          locationSetter(marker.getLatLng());
        }
      },
    }),
    [],
  )
  return (
        <MapContainer
            className="mini-map" 
            center={initial}
            zoom={11}
            minZoom={3}
            maxZoom={18}
            maxBounds={[[-85.06, -180], [85.06, 180]]}
            scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
                url="https://tiles-eu.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                />
                <Marker 
                ref={markerRef}
                eventHandlers={eventHandlers}
                position={position}
                draggable={true}
                autoPan={true}
                >
                
                </Marker>
            
            
        </MapContainer>
  )
}