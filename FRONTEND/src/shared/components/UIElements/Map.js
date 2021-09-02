import React, { useRef, useEffect, useState } from 'react';
import ReactMapGL from "react-map-gl"
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';

const Map = props => {


    const [viewport, setViewPort] = useState({
        latitude:props.center.lat,
        longitude:props.center.lng,
        width:'100%',
        height:'100%',
        zoom:15
    })

    return (

<ReactMapGL {...viewport} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
onViewportChange={(viewport)=>setViewPort(viewport)}
></ReactMapGL>

    );
};

export default Map;