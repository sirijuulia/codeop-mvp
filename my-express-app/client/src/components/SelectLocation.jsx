import React from 'react'
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet'
import { useState,  useRef } from 'react'
import '../App.css'
import 'leaflet/dist/leaflet.css'
import redIcon from "../assets/redMarker.png"

export default function SelectLocation( { locationSetter, latitude, longtitude }) {
  const RI = new L.Icon({iconUrl: redIcon,
        iconRetinaUrl: redIcon,
        iconAnchor: [25,50],
        popupAnchor: [25,0],
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: new L.Point(50, 50)})
  const [geolocate, setGeoLocate] = useState(false)
  const markerRef = useRef(null);
  const handleMarkerDrag = 
    () => {
        const marker = markerRef.current;
        if (marker) {
          const newPos = marker.getLatLng();
          locationSetter(newPos);}
      }
  function LocationPlacer() {
    const map = useMapEvents({
      dblclick(e) {
        locationSetter(e.latlng)
      },
    })
    return latitude === null ? null : (
      <Marker position={[latitude, longtitude]}
      ref={markerRef}
      icon={RI}
      eventHandlers={{dragend: handleMarkerDrag}}
      draggable={true}
      autoPan={true}>
      </Marker>
    )
  }

  function UseCurrentLocation() { 
    setGeoLocate(true);
    const map = useMap();
    map.locate().on("locationfound", function (e) {
      locationSetter(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      }
    )
  setGeoLocate(false)
    return latitude === null ? null : (
      <Marker position={[latitude, longtitude]}
      ref={markerRef}
      eventHandlers={{dragend: handleMarkerDrag}}
      draggable={true}
      autoPan={true}>
      </Marker>

    )}


  return (<div className='location-selection'>
    
        <MapContainer
            className="mini-map" 
            center={[latitude, longtitude]}
            zoom={14}
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
                <LocationPlacer />
                {geolocate && <UseCurrentLocation />}
        </MapContainer>
        <button type="button" id="current-location" onClick={UseCurrentLocation}>Use current location</button>
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