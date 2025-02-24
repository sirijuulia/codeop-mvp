import React from 'react'
import SelectLocation from '../components/SelectLocation'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SelectEmotion from '../components/SelectEmotion'

//sets up the default state of an action - an empty form
const defaultAction = {
  locationType : "Point",
  actionDescription : "",
  successes : "",
  lessons : "",
  emotionSelf : "",
  emotionPartner : "",
  userID : 1
}

export default function Form( {pushAction }) {
  //the key state variables collecting data from the form
  const [latitude, setLatitude] = useState(55.9533);
  const [longtitude, setLongtitude] = useState(-3.18827);
  let [newAction, setNewAction] = useState(defaultAction);

  //react-router function to trigger move to another route
  const navigate=useNavigate();

  //input handlers for text (handleChange), location (updateLocation) and buttons (selectButton)
  function handleChange (e) {
    const name = e.target.name;
    const value = e.target.value;
    const tempAction = {...newAction};
    tempAction[name] = value;
    setNewAction(tempAction);
  }

  function updateLocation (object) {
    setLatitude(object.lat)
    setLongtitude(object.lng)
   }

   function selectButton (e, str) {
    const name = str;
    const value = e.target.value;
    const tempAction = {...newAction};
    tempAction[name] = value;
    setNewAction(tempAction)
   }

  //submission handler
   function handleSubmit (e) {
    e.preventDefault();
    {
      if 
        (
          newAction.actionDescription 
          && newAction.emotionSelf 
          && newAction.emotionPartner) 
      { pushAction({...newAction, latitude: latitude, longtitude: longtitude});
        setNewAction(defaultAction);
        navigate("/")
      } else {
        let alertTextFull = `please fill in the following fields: ${!newAction.actionDescription ? "description, ":""}${!newAction.emotionSelf ? "how you felt, ":""}${!newAction.emotionPartner ? "how your conversation partner felt, ":""}`
        let alertTextTrimmed = alertTextFull.slice(0, -2);
        alert(alertTextTrimmed)}
  }
  }

  return (
    <div className='sidebar-content'>

      {/* navigation link to move to the map view */}
      <Link id="closeForm" to="/" className="navLink">Back to Map</Link>

      <form onSubmit={(e) => handleSubmit(e)}>
        <h2>Add your conversation!</h2>

        <label htmlFor="description">
            What was your conversation? <span className='required'>*required</span>
            </label>
            {/* the fields do not use the required attribute as that can't be set for the map and the emotions
            instead handleSubmit checks for relevant values in the submission */}
        <textarea name="actionDescription" id="description" value={newAction.actionDescription} onChange={(e) => handleChange(e)} maxLength="1000"></textarea>
        
        <h3 className="label">
            Where did it happen? <span className='required'>*required</span><span>Use current location, drag marker, or double click to place it!</span>
            </h3>
        <SelectLocation className="location-selection" id="location-selection" latitude={latitude} longtitude={longtitude} locationSetter={(object) => {updateLocation(object)}}/>
        
        <label htmlFor="successes">What went well?</label>
        <textarea name="successes" id='successes' value={newAction.successes} onChange={(e) => handleChange(e)} maxLength="1000"></textarea>
        <label htmlFor="lessons">What will you do differently next time?</label>
        <textarea name="lessons" type="text" id='lessons' value={newAction.lessons} onChange={(e) => handleChange(e)} maxLength="1000"></textarea>
        
        <label htmlFor="self-feelings">How do you feel about the conversation? <span className='required'>*required</span></label>
        <SelectEmotion id="self-feelings" emotion="emotionSelf" selector={(e, em) => selectButton(e, em)} newAction={newAction}/>
        
        <label htmlFor="partner-feelings">How do you think your conversation partner feels about the conversation? <span className='required'>*required</span></label>
        <SelectEmotion id="partner-feelings" emotion="emotionPartner" selector={(e, em) => selectButton(e, em)} newAction={newAction}/>
        
        <button type='submit' id="formSubmit">Submit your action!</button>
    </form>
    </div>
  )
}
