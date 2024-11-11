import useFetch from './../../Hooks/useFetch';

const LocationList = () => {
	const { data, isLoading } = useFetch('http://localhost:5000/hotels', '');
	if (isLoading) <p>Loading...</p>;
	return (
		<div className="nearbyLocation">
			<h2>near by Location</h2>
			<div className="locationList">
				{data.map(item => {
					return (
						<div className="locationItem" key={item.id}>
							<img src={item.picture_url.url} alt={item.name} />
							<div className="locationItemDesc">
								<p className="location">{data.smart_location}</p>
								<p className="name">{item.name}</p>
								<p className="price">
									€&nbsp;{item.price}&nbsp;
									<span>night</span>
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default LocationList;
