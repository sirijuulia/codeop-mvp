import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './App.css'
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
      console.log(`Error fetching actions: ${error.message} `)
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
    <nav className="navbar">
      <div className="logoset">
      <img className='logo' src="../src/assets/MOI_logo.png"/>
      <h1>mapping our impact</h1>
      </div>
      <NavLink to="/form" className="navLink" id="formLink">Add your conversation</NavLink>
    </nav>
    <Routes>
      <Route path="/" element={<div>
        <Map actions={actions}/>
        <div className='sidebar'>
          <Form pushAction={(action) => addAction(action)} lastAction={actions[actions.length-1]}/> 
          </div></div>
    }/>
      <Route path="/form/" element={
        <div>
          <Map actions={actions}/>
          <div className='sidebar showSidebar'>
          <Form pushAction={(action) => addAction(action)} lastAction={actions[actions.length-1]}/> 
          </div></div>}/>
          
    </Routes>
    
    </>
  )
}

export default App
