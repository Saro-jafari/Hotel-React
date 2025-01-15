import { Outlet } from 'react-router-dom';
import Map from '../Map/map';
import { useBookMarks } from '../Context/BookMarkListProvider';

const BookMarkLayout = () => {
	const { bookmarks } = useBookMarks();
	return (
		<div className="appLayout">
			<div className="sidebar">
				<Outlet />
			</div>
			<Map markerLocation={bookmarks} />
		</div>
	);
};

export default BookMarkLayout;
