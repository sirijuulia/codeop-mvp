import React from 'react'

export default function SelectEmotion( { emotion , selector, newAction}) {
  return (
    <div>
        <button type='button' title="happy"
        //checks if the emotion represented by this button is the currently selected emotion and styles the button accordingly
        className={`emotionButton ${(newAction[emotion] === "happy") ? "buttonActive" : "buttonInactive"}`} 
        value="happy" 
        aria-label='I feel happy'
        onClick={(e) => {selector(e, emotion)}}>
        <span role="img">{String.fromCodePoint('0x1F60A	')}</span>
          </button>
        <button type='button' title="neutral"
        className={`emotionButton ${(newAction[emotion] === "neutral") ? "buttonActive" : "buttonInactive"}`} 
        value="neutral" 
        aria-label='I feel neutral'
        onClick={(e) => {selector(e, emotion)}}>
          <span role="img">{String.fromCodePoint('0x1F610')}</span>
        </button>
        <button type='button' title="sad"
        className={`emotionButton ${(newAction[emotion] === "sad") ? "buttonActive" : "buttonInactive"}`} 
        value="sad" 
        aria-label='I feel sad'
        onClick={(e) => {selector(e, emotion)}}>
        <span role="img">{String.fromCodePoint('0x1F622')}</span>
        </button>
        <button type='button' 
        className={`emotionButton ${(newAction[emotion] === "confused") ? "buttonActive" : "buttonInactive"}`} 
        value="confused" 
        aria-label='I feel confused'
        onClick={(e) => {selector(e, emotion)}}>
        <span role="img">{String.fromCodePoint('0x1F633')}</span>
        </button>
        <button type='button' 
        className={`emotionButton ${(newAction[emotion] === "excited") ? "buttonActive" : "buttonInactive"}`} 
        value="excited" 
        aria-label='I feel excited'
        onClick={(e) => {selector(e, emotion)}}>
        <span role="img">{String.fromCodePoint('0x1F601')}</span>
        </button>
        
    </div>
  )
}
