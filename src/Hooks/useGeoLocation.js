import { useState } from 'react';

const useGeoLocation = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [position, setPosition] = useState({});
	const [error, setError] = useState(null);
	const getPosition = () => {
		if (!navigator.geolocation) return setError('Your BrowserRouter does not support geolocation');
		setIsLoading(true);
		navigator.geolocation.getCurrentPosition(
			pos => {
				setPosition({
					lat: pos.coords.latitude,
					lng: pos.coords.longitude,
				});
				setIsLoading(false);
			},
			error => {
				setError(error.message);
				setIsLoading(false);
			},
		);
	};
	return { isLoading, error, position, getPosition };
};

export default useGeoLocation;
