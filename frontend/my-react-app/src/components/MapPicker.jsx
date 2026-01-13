import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const LocationMarker = ({ position, setPosition }) => {
    useMapEvents({
        click(e) {
            setPosition(e.latlng);
        },
    });

    return position === null ? null : (
        <Marker position={position}></Marker>
    );
};

const RecenterMap = ({ position }) => {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.setView(position, map.getZoom());
        }
    }, [position, map]);
    return null;
};

const MapPicker = ({ onLocationSelect }) => {
    const [position, setPosition] = useState(null);
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Try to get current location on load
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const newPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                setPosition(newPos);
                reverseGeocode(newPos);
            });
        }
    }, []);

    const reverseGeocode = async (pos) => {
        setLoading(true);
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.lat}&lon=${pos.lng}`);
            const data = await response.json();
            const addr = data.display_name || 'Unknown Location';
            setAddress(addr);
            onLocationSelect({ ...pos, address: addr });
        } catch (error) {
            console.error("Geocoding error", error);
            onLocationSelect({ ...pos, address: 'Custom Location' });
        } finally {
            setLoading(false);
        }
    };

    const handlePositionChange = (newPos) => {
        setPosition(newPos);
        reverseGeocode(newPos);
    };

    return (
        <div className="space-y-2">
            <div className="h-64 w-full rounded-lg overflow-hidden border border-gray-300">
                <MapContainer center={[22.2536, 76.0407]} zoom={13} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <LocationMarker position={position} setPosition={handlePositionChange} />
                    <RecenterMap position={position} />
                </MapContainer>
            </div>
            <p className="text-xs text-gray-500">
                {loading ? 'Fetching address...' : `Selected: ${address || 'Click on map to select location'}`}
            </p>
            {!position && <p className="text-xs text-red-500 font-bold">* Location is mandatory</p>}
        </div>
    );
};

export default MapPicker;
