import React from 'react'

export default function SelectEmotion( { emotion , selector, newAction}) {
  return (
    <div>
        <button type='button' className={`emotionButton ${(newAction[emotion] === "happy") ? "buttonActive" : "buttonInactive"}`} value="happy" onClick={(e) => {selector(e, emotion)}}>
        <span role="img">{String.fromCodePoint('0x1F60A	')}</span>
          </button>
        <button type='button' className={`emotionButton ${(newAction[emotion] === "neutral") ? "buttonActive" : "buttonInactive"}`} value="neutral" onClick={(e) => {selector(e, emotion)}}>
          <span role="img">{String.fromCodePoint('0x1F610')}</span>
        </button>
        <button type='button' className={`emotionButton ${(newAction[emotion] === "sad") ? "buttonActive" : "buttonInactive"}`} value="sad" onClick={(e) => {selector(e, emotion)}}>
        <span role="img">{String.fromCodePoint('0x1F622')}</span>
        </button>
        <button type='button' className={`emotionButton ${(newAction[emotion] === "confused") ? "buttonActive" : "buttonInactive"}`} value="confused" onClick={(e) => {selector(e, emotion)}}>
        <span role="img">{String.fromCodePoint('0x1F633')}</span>
        </button>
        <button type='button' className={`emotionButton ${(newAction[emotion] === "excited") ? "buttonActive" : "buttonInactive"}`} value="excited" onClick={(e) => {selector(e, emotion)}}>
        <span role="img">{String.fromCodePoint('0x1F601')}</span>
        </button>
    </div>
  )
}
