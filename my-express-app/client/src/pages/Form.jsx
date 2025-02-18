import React from 'react'
import SelectLocation from '../components/SelectLocation'

export default function Form() {
  return (
    <form>
        <h2>Add your conversation!</h2>
        <label htmlFor="description">
            What was your conversation?
            </label>
            <textarea name="description" id="description"></textarea>
        <label htmlFor="training-content">What training content did you use?</label>
        <div className='trainingSelectors'>
        <button type='button' className='trainingSelector'></button>
        <button type='button' className='trainingSelector'></button>
        <button type='button' className='trainingSelector'></button>
        </div>
        <h3>Can't remember? Click here for a reminder</h3>
        <label htmlFor="location-selection">
            Where did it happen?
            </label>
            <SelectLocation/>
            <label htmlFor="current-location"> Use current location
                <input type="checkbox" name="location" id="current-location" value="current-location" />
        </label>
        <label htmlFor="successes">What went well?</label>
        <input id='successes'/>
        <label htmlFor="lessons">What will you do differently next time?</label>
        <input type="text" id='lessons' />
        <label htmlFor="self-feelings">How do you feel about the conversation?</label>
        <div className='emotionSelectors'>
        <button type='button' className='emotionSelector'></button>
        <button type='button' className='emotionSelector'></button>
        <button type='button' className='emotionSelector'></button>
        </div>
        <label htmlFor="partner-feelings">How do you think your partner feels about the conversation?</label>
        <div className='emotionSelectors'>
        <button type='button' className='emotionSelector'></button>
        <button type='button' className='emotionSelector'></button>
        <button type='button' className='emotionSelector'></button>
        </div>
        <button type='submit' id="formSubmit">Submit your action!</button>

    </form>
  )
}
