import { HiTrash } from 'react-icons/hi';
import { useBookMarks } from '../Context/BookMarkListProvider';
import Loader from '../Loader/Loader';
import ReactCountryFlag from 'react-country-flag';
import { Link } from 'react-router-dom';

const BookMark = () => {
	const { bookmarks, isLoading, currentBookMark, deleteBookmark } = useBookMarks();
	console.log(bookmarks);
	if (isLoading) return <Loader />;
	if (!bookmarks.length) return <p style={{ fontWeight: 'bold', fontSize: '18px' }}>there is no bookmarked location</p>;
	const handleDelete = async (e, id) => {
		// console.log(e, id);
		e.preventDefault();
		await deleteBookmark(id);
	};
	return (
		<div>
			<h2>BookMarkList</h2>
			<div className="bookmarkList">
				{bookmarks.map(item => (
					<Link key={item.id} to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
						<div className={`bookmarkItem   ${currentBookMark?.id === item.id ? 'current-bookmark-' : ''}`}>
							<div>
								<ReactCountryFlag countryCode={item.countryCode} svg />
								{/* &nbsp;<strong>{item.cityName}</strong> */}
								&nbsp; <span>{item.country}</span>
							</div>
							<div>
								<button onClick={e => handleDelete(e, item.id)}>
									<HiTrash className="trash" />
								</button>
							</div>{' '}
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default BookMark;
