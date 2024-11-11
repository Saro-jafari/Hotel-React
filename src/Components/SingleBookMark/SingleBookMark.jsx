import  { useEffect } from 'react';
import { useBookMarks } from '../Context/BookMarkListProvider';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import ReactCountryFlag from 'react-country-flag';

const SingleBookMark = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { getBookMark, isLoading, currentBookMark } = useBookMarks();
	useEffect(() => {
		getBookMark(id);
	}, [id]);
	if (isLoading || !currentBookMark) return <Loader />;
	const handleBack = () => {
		navigate(-1);
	};
	return (
		<div>
			<button onClick={handleBack} className="btn btn--back">
				&larr; Back
			</button>
			<h2>{currentBookMark.cityName} </h2>
			<div className={`bookmarkItem `}>
				<ReactCountryFlag countryCode={currentBookMark.countryCode} svg />
				{/* &nbsp;<strong>{item.cityName}</strong> */}
				&nbsp; <span>{currentBookMark.country}</span>
			</div>
		</div>
	);
};

export default SingleBookMark;
