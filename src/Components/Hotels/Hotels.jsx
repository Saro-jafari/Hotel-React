import { Link } from 'react-router-dom';
import Loader from './../Loader/Loader';
import { useHotels } from '../Context/HotelsProvider';

const Hotels = () => {
	const { isLoading, hotels, currentHotel } = useHotels();
	if (isLoading) <Loader />;

	return (
		<div className="searchList">
			<h2>Search Results {hotels.length}</h2>
			{hotels.map(item => {
				return (
					<Link key={item.id} to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
						<div className={`searchItem   ${currentHotel?.id === item.id ? 'current-hotel' : ''}`}>
							<img src={item.picture_url.url} alt={item.name} />
							<div className="searchItemDesc ">
								<p className="location">{item.smart_location}</p>
								<p className="location">{item.name}</p>
								€&nbsp;{item.price}&nbsp;
								<span>night</span>
							</div>
						</div>
					</Link>
				);
			})}
		</div>
	);
};

export default Hotels;
