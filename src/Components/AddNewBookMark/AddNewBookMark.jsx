import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import useUrlLocation from '../../Hooks/useUrlLocation';
import axios from 'axios';
import Loader from '../Loader/Loader';
import ReactCountryFlag from 'react-country-flag';
import { useBookMarks } from '../Context/BookMarkListProvider';
const BASE_GEOCODING_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';
// console.log(BASE_GEOCODING_URL);
const AddNewBookMark = () => {
	const navigate = useNavigate();
	const [lat, lng] = useUrlLocation();
	console.log(lat, lng);
	const [cityName, setCityName] = useState('');
	const [country, setCountry] = useState('');
	const [countryCode, setCountryCode] = useState('');
	const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
	const [geoCodingError, setGeoCodingError] = useState(null);
	const { createBookmark } = useBookMarks();
	useEffect(() => {
		setIsLoadingGeoCoding(true);
		setGeoCodingError(null);
		const getLocation = async () => {
			if (!lat || !lng) return;
			try {
				const { data } = await axios.get(`${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`);
				if (!data.countryCode) throw new Error('this location is not a city! please click somewhere else.');

				setCityName(data.city || data.locality || '');
				setCountry(data.countryName);
				setCountryCode(data.countryCode);
			} catch (error) {
				setGeoCodingError(error.message);
			} finally {
				setIsLoadingGeoCoding(false);
			}
		};
		getLocation();
	}, [lat, lng]);
	const handleSubmit = async e => {
		e.preventDefault();
		if (!cityName || !country) return;

		const newBookmark = {
			cityName,
			country,
			countryCode,
			latitude: lat,
			longitude: lng,
			host_location: cityName + ' ' + country,
		};
		await createBookmark(newBookmark);
		navigate('/bookmarks');
	};

	if (isLoadingGeoCoding) return <Loader />;
	if (geoCodingError) return <storng>{geoCodingError}</storng>;

	return (
		<div>
			<h2>BookMark New Loaction</h2>
			<form className="form" onSubmit={handleSubmit}>
				<div className="formControl">
					<label htmlFor="ityName">CityName</label>
					<input onChange={e => setCityName(e.target.value)} type="text" id="CityName" name="CityName" value={cityName} />
				</div>
				<div className="formControl">
					<label htmlFor="Country">Country</label>
					<input value={country} type="text" id="Country" name="Country" onChange={e => setCountry(e.target.value)} />
					<ReactCountryFlag
						className="flag"
						svg
						countryCode={countryCode}
						style={{
							fontSize: '23px',
						}}
					/>
				</div>
				<div className="buttons">
					<button
						className="btn btn--back"
						onClick={e => {
							e.preventDefault();
							navigate(-1);
						}}>
						&larr; Back
					</button>
					<button className="btn btn--primary">Add</button>
				</div>
			</form>
		</div>
	);
};

export default AddNewBookMark;
