import { useState } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import './App.css'
import 'leaflet/dist/leaflet.css'
import arcades from './arcades.json'
import Map from './pages/Map'
import { NavLink, Link, Routes, Route } from 'react-router-dom'
import Form from './pages/Form'


function App() {
  return (
    <>
    <nav>
      <h1>MOI - mapping our impact</h1>
      <ul>
    <NavLink to="/map">Map</NavLink>
    <NavLink to="/form">Form</NavLink>
    </ul>
    </nav>
    <Routes>
      <Route path="/map" element={<Map />}/>
      <Route path="form" element={<Form/>}/>
    </Routes>
    
    </>
  )
}

export default App
