import React from 'react'
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet'
import { useState, useEffect, useMemo, useRef } from 'react'
import '../App.css'
import 'leaflet/dist/leaflet.css'
import redIcon from "../assets/redMarker.png"

export default function SelectLocation( { lastAction, locationSetter }) {
  const initial = {
    lat: 55.9,
    lng: -3
  }
  const RI = new L.Icon({iconUrl: redIcon,
        iconRetinaUrl: redIcon,
        iconAnchor: [25,50],
        popupAnchor: [25,0],
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: new L.Point(50, 50)})
  
  const [position, setPosition] = useState(initial);
  const [geolocate, setGeoLocate] = useState(false)
  const markerRef = useRef(null);
  const onDragEnd = 
    () => {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          locationSetter(marker.getLatLng());}
      }
  function LocationMarker() {
    const map = useMapEvents({
      dblclick(e) {
        setPosition(e.latlng)
        locationSetter(e.latlng)
      },
    })
    return position === null ? null : (
      <Marker position={position}
      ref={markerRef}
      icon={RI}
      eventHandlers={{dragend: onDragEnd}}
      draggable={true}
      autoPan={true}>
      </Marker>
    )
  }

  function UseCurrentLocation() { 
    setGeoLocate(true);
    const map = useMap();
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      locationSetter(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      }
    )
  setGeoLocate(false)
    return position === null ? null : (
      <Marker position={position}
      ref={markerRef}
      eventHandlers={{dragend: onDragEnd}}
      draggable={true}
      autoPan={true}>
      </Marker>

    )}


  return (<div>
    <button type="button" onClick={UseCurrentLocation}>Use current location</button>
        <MapContainer
            className="mini-map" 
            center={initial}
            zoom={11}
            minZoom={3}
            maxZoom={18}
            maxBounds={[[-85.06, -180], [85.06, 180]]}
            scrollWheelZoom={true}
            doubleClickZoom={false}
            >
                
              
            <TileLayer
                attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
                url="https://tiles-eu.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                />
                <LocationMarker />
                {geolocate && <UseCurrentLocation />}
        </MapContainer>
        </div>
  )
}

// function InitialLocation() {
//         const map = useMapEvents({
//           click(e) {
//             if (!clicked) {
//               setClicked(true);
//               map.setView([lastAction.latitude, lastAction.longtitude])
//             }
//           },
//         })
//       }