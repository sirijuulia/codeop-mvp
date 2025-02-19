import React from 'react'
import SelectLocation from '../components/SelectLocation'
import { useState } from 'react'
import SelectEmotion from '../components/SelectEmotion'

const defaultAction = {
  locationType : "Point",
  latitude : 0,
  longtitude : 0,
  actionDescription : "",
  successes : "",
  lessons : "",
  emotionSelf : "",
  emotionPartner : "",
  userID : 1
}

export default function Form( {pushAction, lastAction }) {
  let [newAction, setNewAction] = useState(defaultAction)

  function handleChange (e) {
    const name = e.target.name;
    const value = e.target.value;
    const tempAction = {...newAction};
    tempAction[name] = value;
    setNewAction(tempAction)
  }

  function handleSubmit (e) {
    e.preventDefault();
    pushAction(newAction);
    setNewAction(defaultAction)
  }


  function updateLocation (object) {
    console.log(newAction);
    const tempAction = {...newAction};
    tempAction.latitude = object.lat;
    tempAction.longtitude = object.lng;
    setNewAction(tempAction)
   }

   function selectButton (e, str) {
    const name = str;
    const value = e.target.value;
    const tempAction = {...newAction};
    tempAction[name] = value;
    setNewAction(tempAction)
   }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
        <h2>Add your conversation!</h2>
        <label htmlFor="description">
            What was your conversation?
            </label>
        <textarea name="actionDescription" id="description" value={newAction.actionDescription} onChange={(e) => handleChange(e)} maxLength="1000"></textarea>
              {/* <label htmlFor="training-content">What training content did you use?</label>
              <div className='trainingSelectors'>
                <button type='button' className='trainingSelector'></button>
                <button type='button' className='trainingSelector'></button>
                <button type='button' className='trainingSelector'></button>
              </div> 
              <h3>Can't remember? Click here for a reminder</h3>*/}
        <label htmlFor="location-selection">
            Where did it happen?
            </label>
        <SelectLocation id="location-selection" locationSetter={(object) => {updateLocation(object)}} lastAction={lastAction}/>
        <label htmlFor="successes">What went well?</label>
        <textarea name="successes" id='successes' value={newAction.successes} onChange={(e) => handleChange(e)} maxLength="1000"></textarea>
        <label htmlFor="lessons">What will you do differently next time?</label>
        <textarea name="lessons" type="text" id='lessons' value={newAction.lessons} onChange={(e) => handleChange(e)} maxLength="1000"></textarea>
        <label htmlFor="self-feelings">How do you feel about the conversation?</label>
        <SelectEmotion emotion="emotionSelf" selector={(e, em) => selectButton(e, em)} newAction={newAction}/>
        <label htmlFor="partner-feelings">How do you think your partner feels about the conversation?</label>
        <SelectEmotion emotion="emotionPartner" selector={(e, em) => selectButton(e, em)} newAction={newAction}/>
        <button type='submit' id="formSubmit">Submit your action!</button>

    </form>
  )
}

// <button type='button' className={`emotionButton ${(newAction.emotionSelf === "happy") ? "buttonActive" : "buttonInactive"}`} value="happy" onClick={(e) => {selectButton(e, "emotionSelf")}}>
//         <span role="img">{String.fromCodePoint('0x1F60A	')}</span>
//           </button>
//         <button type='button' className={`emotionButton ${(newAction.emotionSelf === "neutral") ? "buttonActive" : "buttonInactive"}`} value="neutral" onClick={(e) => {selectButton(e, "emotionSelf")}}>
//           <span role="img" value="neutral">{String.fromCodePoint('0x1F610')}</span>
//         </button>
//         <button type='button' className={`emotionButton ${(newAction.emotionSelf === "sad") ? "buttonActive" : "buttonInactive"}`} value="sad" onClick={(e) => {selectButton(e, "emotionSelf")}}>
//         <span role="img" value="sad">{String.fromCodePoint('0x1F622')}</span>
//         </button>
//         <button type='button' className={`emotionButton ${(newAction.emotionSelf === "confused") ? "buttonActive" : "buttonInactive"}`} value="confused" onClick={(e) => {selectButton(e, "emotionSelf")}}>
//         <span role="img" value="confused">{String.fromCodePoint('0x1F633')}</span>
//         </button>
//         <button type='button' className={`emotionButton ${(newAction.emotionSelf === "excited") ? "buttonActive" : "buttonInactive"}`} value="excited" onClick={(e) => {selectButton(e, "emotionSelf")}}>
//         <span role="img" value="excited">{String.fromCodePoint('0x1F601')}</span>
//         </button>