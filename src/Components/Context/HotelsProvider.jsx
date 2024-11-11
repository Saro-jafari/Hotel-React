import { createContext, useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import axios from 'axios';
import toast from 'react-hot-toast';

const HotelContext = createContext();
const Base_URL = 'http://localhost:5000/hotels';
const HotelsProvider = ({ children }) => {
	const [currentHotel, setCurrentHotel] = useState(null);
	const [isLoadingCurrentHotel, setIsLoadingCurrentHotel] = useState(false);

	const [searchParams, setSearchParams] = useSearchParams();
	const destination = searchParams.get('destination');
	const rooms = JSON.parse(searchParams.get('options'))?.room;

	const { isLoading, data: hotels } = useFetch(Base_URL, `q=${destination || ''}&accommodates_gte=${rooms || 1}`);
	// console.log(hotels);
	const getHotel = async id => {
		setIsLoadingCurrentHotel(true);
		try {
			const { data } = await axios.get(`${Base_URL}/${id}`);
			setCurrentHotel(data);
			setIsLoadingCurrentHotel(false);
		} catch (error) {
			toast.error(error.message);
			setIsLoadingCurrentHotel(false);
		}
	};
	return (
		<HotelContext.Provider value={{ isLoading, hotels, getHotel, currentHotel, isLoadingCurrentHotel }}>{children}</HotelContext.Provider>
	);
};
export default HotelsProvider;
export const useHotels = () => useContext(HotelContext);
