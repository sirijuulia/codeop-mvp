import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

export default function CurrentLocation({ geolocate, locationSetter, setGeoLocate }) {
    const map = useMap(); // This works because it's inside a component that is being rendered in the MapContainer
  
    //this useEffect listens to changes in geolocate and runs when it changes
    useEffect(() => {
      if (!geolocate) return; // Exit if geolocation is false - avoids infinity loop (as geolocate is set to false inside the function)
  
      //function to process a received currentLocation value - including setting geolocate back to false
      const handleLocationFound = (e) => {
        if (!e.latlng || e.latlng.lat === undefined || e.latlng.lng === undefined) {
          console.error("Invalid location data received:", e.latlng);
          setGeoLocate(false);
          return;
        }
  
        locationSetter(e.latlng); // Update the state with valid lat/lng
        map.flyTo(e.latlng, map.getZoom());
        setGeoLocate(false); // Stop tracking after first successful location
      };

      // locate here is set up with an event listener listening to "locationfound" 
      // Once that event happens it triggers a callback function 
      // The CB automatically gets the event as a param, in this case it includes the location
      // here we set the CB to handleLocationFound
      map.locate().on("locationfound", handleLocationFound);
  
      return () => {
        map.off("locationfound", handleLocationFound); //Cleanup turns off the locationfound event listener
      };
    }, [geolocate, locationSetter, setGeoLocate, map]); // Runs only when `geolocate` changes
  
    return null; //No need to render anything
  }