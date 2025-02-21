import { useEffect, useState } from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import 'leaflet/dist/leaflet.css'
import './App.css'
import Map from './pages/Map'
import Form from './pages/Form'

function App() {
  let [actions, setActions] = useState([]); //all actions
  const [user, setUser] = useState(0) //setting up user selection

  //as user login isn't set up, useEffect sets the default user as 1 (which gets matched with UserID later)
  //change this if setting up user authentication
  //also fetch all actions at the start
  useEffect(() => {
    setUser(1);
    getActions();
  }, []) 

  //function for accessing all actions from the database 
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
  
  //function for adding an action into the database 
  async function addAction (action) {
    let options = {
      method: "POST",
      body: JSON.stringify(action),
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const response = await fetch("/api/actions/", options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const list = await response.json();
      setActions(list)}
      catch(error) {
        console.log(`Error adding action: ${error.message}`)
      }
    }
  
  //function for deleting an action from the database
  const deleteAction = async function( id ) {
    //when user clicks on a delete, this creates a pop-up asking them to confirm
    confirm("Are you sure you want to delete this action?")
    let options = {
      method: "DELETE"
    }
    try {
      const response = await fetch(`/api/actions/${id}`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const list = await response.json();
      setActions(list)}
      catch(error) {
      console.log(`Error fetching actions: ${error.message} `)
    }
  }

  return (
    <>
    {/* top navbar */}
    <nav className="navbar">
      <div className="logoset">
      <img className='logo' src="../src/assets/MOI_logo.png"/>
      <h1 className='titleText'>mapping our impact</h1>
      </div>
      <NavLink to="/form" className="navLink" id="formLink">Add your conversation</NavLink>
    </nav>

    {/* routes - both routes render both elements, the difference is that the sidebar with the form is visible or hidden depending on CSS class. 
    This enables sliding in effect and the map remaining visible under the form on wider devices*/}
    <Routes>
      <Route path="/" element={
        <div>
          <Map actions={actions} user={user} selectForDeletion={(id) => deleteAction(id)}/>
          <div className='sidebar'>
            <Form pushAction={(action) => addAction(action)}/> 
          </div>
          
        </div>
    }/>
      <Route path="/form/" element={
        <div>
          <Map actions={actions} user={user} selectForDeletion={(id) => deleteAction(id)}/>
          <div className='sidebar showSidebar'>
            <Form pushAction={(action) => addAction(action)} /> 
          </div>

          </div>
        }/>
    </Routes>
    </>
  )
}

export default App
