import React from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import '../App.css';
import 'leaflet/dist/leaflet.css';
import greenIcon from "../assets/greenMarker.png"

export default function Map( { actions, user, selectForDeletion } ) {
    //set up green custom marker that shows on the map
    const GI = new L.Icon({iconUrl: greenIcon,
        iconRetinaUrl: greenIcon,
        iconAnchor: [25,50],
        popupAnchor: [0,-50],
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: new L.Point(50, 50)})
    
    //set up purple custom marker - might want this for something else later
    // const PI = new L.Icon({iconUrl: purpleIcon,
    //     iconRetinaUrl: greenIcon,
    //     iconAnchor: [25,50],
    //     popupAnchor: [25,0],
    //     shadowUrl: null,
    //     shadowSize: null,
    //     shadowAnchor: null,
    //     iconSize: new L.Point(50, 50)})

    //emojis are stored as text in database
    //this function can convert them back to emojis to show on map pop-ups
    const emojis = (feeling) =>{
        switch (feeling) {
            case "happy":
                return <span role='img'>{String.fromCodePoint('0x1F60A	')}</span>; 
            case "sad":
                return <span role='img'>{String.fromCodePoint('0x1F622	')}</span>;
            case "confused":
                return <span role='img'>{String.fromCodePoint('0x1F633	')}</span>;
            case "excited":
                return <span role='img'>{String.fromCodePoint('0x1F601	')}</span>;
            case "neutral":
                return <span role='img'>{String.fromCodePoint('0x1F610	')}</span>;
            case "angry":
                return <span role='img'>{String.fromCodePoint('0x1F621')}</span>
            default:
                return feeling;
        }}
        
        //this function converts SQL timestamp string into a neater date string
        //there are probably tools for doing this
        const toDateString = (ts) => {
            const date = {day: "",
                month: "",
                year: ""
            }
            date.day = ts.slice(8, 10);
            date.month = ts.slice(5, 7);
            date.year = ts.slice(0, 4);
            const dateString = `${date.day}/${date.month}/${date.year}`
            return dateString;
        }
        
  return (
    <div id="map">
        {/* renders the map data with options on where to center it and how zoomed in it can be and should be by default */}
        <MapContainer
            className="full-height-map"
            center={[55.9533, -3.18827]} 
            zoom={13}
            minZoom={6}
            maxZoom={18}
            maxBounds={[[-85.06, -180], [85.06, 180]]}
            scrollWheelZoom={true}>
                {/* renders the map tiles from stadiamaps API. 
                These are not automatically included in a leaflet map*/}
            <TileLayer
                attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
                url="https://tiles-eu.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                />
                {/*renders the markers from the actions in the action database, as imported in App.jsx */}
            {actions.map((action, index) => (
                <Marker
                    key={action.actionID}
                    icon={GI}
                    position={[action.latitude, action.longtitude]}
                    >
                    <Tooltip> Click for more!</Tooltip>
                    <Popup 
                    // opening a pop-up pans the map by default so the pop-up is completely visible
                    //as the map renders under the navbar, autoPanPaddingTopLeft adds extra padding at the top so the pop-up is not hidden under the navbar
                    autoPanPaddingTopLeft={[0,120]}
                    minWidth="275"
                    maxWidth="275"
                    >
                        <h4>{toDateString(action.date)}</h4>
                        <h4>{`Conversation by: ${action.username}`}</h4>

                        <div className="popup-feeling-container">
                            <h5>I'm feeling:</h5>
                            {emojis(action.emotionSelf)}
                            <h5>I think they felt:</h5> 
                            {emojis(action.emotionPartner)}
                        </div>
                        <div className="popup-text-container">
                            <p>{action.actionDescription}</p>
                            <h3>Successes</h3>
                            <p>{action.successes}</p>
                            <h3>Lessons</h3>
                            <p>{action.lessons}</p>
                        </div>
                        {/* checks if the action was added by the active user
                        if so, includes a delete button on the pop-up
                        uses selectForDeletion prop */}
                        { action.userID === user 
                        ? <button className="deleteButton" onClick={() => selectForDeletion(action.actionID)}>Delete action</button> 
                        : ""}
                    </Popup>
                </Marker>
                    )
                )
            }
        </MapContainer>
      </div>

        )
}
