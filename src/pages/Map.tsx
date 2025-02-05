import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

import 'leaflet/dist/leaflet.css';

function Map() {
    const position = { lng: 30, lat: 50 }
    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}
            style={{ width: '100wh', height: 'calc(100vh - 80px)'}}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default Map
