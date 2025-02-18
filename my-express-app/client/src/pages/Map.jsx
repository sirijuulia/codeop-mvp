import React from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import '../App.css'
import 'leaflet/dist/leaflet.css'
import arcades from '../arcades.json'

export default function Map() {
  return (
    <div id="map">
        <MapContainer
            className="full-height-map"
            center={[arcades.features[0].geometry.coordinates[1], arcades.features[0].geometry.coordinates[0]]}
            zoom={12}
            minZoom={3}
            maxZoom={18}
            maxBounds={[[-85.06, -180], [85.06, 180]]}
            scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
                url="https://tiles-eu.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                />
            {arcades.features.map((arcade, index) => (
                <Marker
                    key={arcade.properties['@id']}
                    position={[arcade.geometry.coordinates[1], arcade.geometry.coordinates[0]]}
                    >
                    <Popup>
                        {arcade.properties.name}
                        <br />
                        {arcade.properties['name:en']}
                    </Popup>
                </Marker>
                    )
                )
            }
        </MapContainer>
      </div>

        )
}
