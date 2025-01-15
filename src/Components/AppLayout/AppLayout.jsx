import { Outlet } from 'react-router-dom';
import Map from '../Map/map';
import { useHotels } from '../Context/HotelsProvider';

const AppLayout = () => {
	const { hotels } = useHotels();
	return (
		<div className="appLayout">
			<div className="sidebar">
				<Outlet />
			</div>
			<Map markerLocation={hotels} />
		</div>
	);
};

export default AppLayout;
