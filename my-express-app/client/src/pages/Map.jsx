import React from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import '../App.css'
import 'leaflet/dist/leaflet.css'

export default function Map( { actions } ) {
  return (
    <div id="map">
        <h1></h1>
        <MapContainer
            className="full-height-map"
            center={[55.9533, -3.18827]} 
            zoom={13}
            minZoom={6}
            maxZoom={18}
            maxBounds={[[-85.06, -180], [85.06, 180]]}
            scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
                url="https://tiles-eu.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                />
            {actions.map((action, index) => (
                <Marker
                    key={action.actionID}
                    position={[action.latitude, action.longtitude]}
                    >
                    <Popup>
                        <h3>Description</h3>
                        <p>{action.actionDescription}</p>
                        <br />
                        <h3>Left feeling: {action.emotionSelf}</h3>

                        {}
                    </Popup>
                </Marker>
                    )
                )
            }
        </MapContainer>
      </div>

        )
}
