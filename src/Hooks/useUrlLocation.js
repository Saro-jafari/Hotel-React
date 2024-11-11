import { useSearchParams } from 'react-router-dom';

const useUrlLocation = () => {
	const [SearchParams, setSearchParams] = useSearchParams();
	const lat = SearchParams.get('lat');
	const lng = SearchParams.get('lng');
	return [lat, lng];
};

export default useUrlLocation;
