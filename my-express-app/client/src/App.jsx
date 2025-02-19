import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import './App.css'
import 'leaflet/dist/leaflet.css'
import arcades from './arcades.json'
import Map from './pages/Map'
import { NavLink, Link, Routes, Route } from 'react-router-dom'
import Form from './pages/Form'


function App() {
  let [actions, setActions] = useState([]);
  useEffect(() => {
    getActions();
  }, [])

  const getActions = async function () {
    try {
    const response = await fetch("/api/actions");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const list = await response.json();
    setActions(list)}
    catch(error) {
      console.log(`Error fetchign actions: ${error.message} `)
    }
  }

  function addAction (action) {
    let options = {
      method: "POST",
      body: JSON.stringify(action),
      headers: {
        "Content-Type": "application/json"
      }
    };
    fetch("/api/actions/", options)
      .then(response => response.json())
      .then(actions => {
        setActions(actions);
      })
      .catch(error => console.log(error));
  };

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
      <Route path="/map" element={<Map actions={actions}/>}/>
      <Route path="form" element={<Form pushAction={(action) => addAction(action)}/>}/>
    </Routes>
    
    </>
  )
}

export default App
