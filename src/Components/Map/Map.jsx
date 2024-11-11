import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import useGeoLocation from '../../Hooks/useGeoLocation';
import useUrlLocation from '../../Hooks/useUrlLocation';

const Map = ({ markerLocation }) => {
	const [mapCenter, setMapCenter] = useState([51, 4]);
	const [lat, lng] = useUrlLocation();
	// console.log(lng,lat) => correct
	const { isLoading: isLoadingPosition, position: GeoLocationPosition, getPosition } = useGeoLocation();
	useEffect(() => {
		if (lat && lng) {
			setMapCenter([lat, lng]);
		}
	}, [lat, lng]);
	useEffect(() => {
		if (GeoLocationPosition?.lat) setMapCenter([GeoLocationPosition.lat, GeoLocationPosition.lng]);
	});
	return (
		<div className="mapContainer">
			<MapContainer className="map" center={mapCenter} zoom={13} scrollWheelZoom={true}>
				<button onClick={getPosition} className="getLocation">
					{isLoadingPosition ? 'Loading...' : 'Use Your Location'}
				</button>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>
				<DetectClick />
				<ChangeCenter position={mapCenter} />
				{markerLocation.map(item => {
					return (
						<Marker key={item.id} position={[item.latitude, item.longitude]}>
							<Popup>{item.host_location}</Popup>
						</Marker>
					);
				})}
			</MapContainer>
			,
		</div>
	);
};

export default Map;

const ChangeCenter = ({ position }) => {
	const map = useMap();
	// console.log(map);
	map.setView(position);
	return null;
};
const DetectClick = () => {
	const navigate = useNavigate();
	useMapEvent({
		click: e => navigate(`/bookmarks/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
	});
	return null;
};
