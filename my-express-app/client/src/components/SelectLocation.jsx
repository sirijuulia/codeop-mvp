import React from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import { useState,  useRef } from 'react'
import '../App.css'
import 'leaflet/dist/leaflet.css'
import redIcon from "../assets/redMarker.png"
import CurrentLocation from './CurrentLocation'

export default function SelectLocation( { locationSetter, latitude, longtitude }) {
  //sets up custom red marker
  const RI = new L.Icon({iconUrl: redIcon,
        iconRetinaUrl: redIcon,
        iconAnchor: [25,50],
        popupAnchor: [25,0],
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: new L.Point(50, 50)})
  
  //a support variable - changing this to true sets off activity CurrentLocation component
  const [geolocate, setGeoLocate] = useState(false)

  //useRef enables creating a ref attribute for a DOM element, which then can be used to store that DOM element as a variable. 
  // This will have one attribute .current which gets the state of the DOM element at the time.
  const markerRef = useRef(null);

  //updates location when user drags and drops the pin
  const handleMarkerDrag = 
    () => {
      //access current state of DOM element with ref markerRef: the red marker on the map
        const marker = markerRef.current;
        
        if (marker) {
          //use this to access latitude and longtitude of the spot on the map
          const newPos = marker.getLatLng();
          //set latitude and longtitude using locationSetter prop and the spot on the map
          locationSetter(newPos);}
      }
  
  //leaflet map functions require function components placed inside the map
  //this function, below set as a component, moves the marker on double click to wherever it was clicked
  function DoubleClickLocation() {
    const map = useMapEvents({
      dblclick(e) {
        locationSetter(e.latlng)
      },
    })
    return;
  }

  //this function is kicked off by clicking the button. 
  // Changes in the geolocate variable are listened to by a useEffect in the CurrentLocation component
  function handleUseCurrentLocation () {
    setGeoLocate(true);
  }

  return (<div className='location-selection'>
    
        <MapContainer
            className="mini-map" 
            center={[latitude, longtitude]}
            zoom={14}
            minZoom={3}
            maxZoom={18}
            maxBounds={[[-85.06, -180], [85.06, 180]]}
            scrollWheelZoom={true}
            //as double click is used to move a pin I change doubleClickZoom from default true to falsse
            doubleClickZoom={false}
            >
                
            <TileLayer
                attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
                url="https://tiles-eu.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                />

            <Marker position={[latitude, longtitude]}
              //ref set up with useRef above
              ref={markerRef}
              icon={RI}
              //to give markers event handlers in react leaflet you need to use an eventHandlers attribute with an object
              eventHandlers={{dragend: handleMarkerDrag}}

              //this allows the marker to be moved and instructs the map to pan as it moves
              draggable={true}
              autoPan={true}>
            </Marker>
                <DoubleClickLocation />
                <CurrentLocation geolocate={geolocate} locationSetter={locationSetter} setGeoLocate={setGeoLocate} />
        </MapContainer>
        <button type="button" id="current-location" onClick={handleUseCurrentLocation}>Use current location</button>
        </div>
  )
}
