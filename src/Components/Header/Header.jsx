import { MdLocationOn } from 'react-icons/md';
import { HiCalendar, HiMinus, HiPlus, HiSearch } from 'react-icons/hi';
import { MdLogout } from 'react-icons/md';
import { useRef, useState } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import { createSearchParams, useNavigate, useSearchParams, NavLink, Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthProvider';
function Header() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [destination, setDestination] = useState(searchParams.get('destination') || '');
	const [openOptions, setOpenOptions] = useState(false);
	const [options, setOptions] = useState({
		adult: 1,
		children: 0,
		room: 1,
	});
	const [date, setDate] = useState([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: 'selection',
		},
	]);
	const [openDate, setOpenDate] = useState(false);
	const navigate = useNavigate();

	const handleOptions = (name, operation) => {
		setOptions(prev => {
			return {
				...prev,
				[name]: operation === 'inc' ? options[name] + 1 : options[name] - 1,
				//                 در تابع `handleOptions`، `[name]` به عنوان یک dynamic key (کلید پویا) استفاده شده است. وقتی `[name]` را استفاده می‌کنید، نام ویژگی (`name`) که به عنوان ورودی به تابع داده شده است، به عنوان نام کلید ویژگی جدید در وضعیت جدید (`...prev`) استفاده می‌شود.

				// این شیوه نوشتن به شما امکان می‌دهد تا نام کلید را به صورت دینامیک تعیین کنید. به عنوان مثال، اگر مقدار `name` برابر با `"count"` باشد، آنگاه کلید `"count"` در وضعیت جدید (`...prev`) ایجاد خواهد شد و مقدار آن بر اساس شرط `operation === 'inc' ? options[name] + 1 : options[name] - 1` تنظیم خواهد شد.

				// با استفاده از `[name]` می‌توانید یک کلید با نام متغیر ایجاد کنید و با استفاده از ارزیابی شرطی (`operation === 'inc' ? options[name] + 1 : options[name] - 1`) مقدار متغیر مربوطه را تغییر دهید.

				// به طور خلاصه، `[name]` در اینجا برای ایجاد یک کلید با نام متغیر `name` در وضعیت جدید (`...prev`) استفاده می‌شود.
			};
		});
	};
	const handleSearch = () => {
		const encodedParams = createSearchParams({
			date: JSON.stringify(date),
			destination,
			options: JSON.stringify(options),
		});
		//note : =>  setSearchParams(encodedParams);
		navigate({
			pathname: '/hotels',
			search: encodedParams.toString(),
		});
	};

	return (
		<div className="header">
			<NavLink to="/bookmark">Bookmarks</NavLink>
			<div className="headerSearch">
				<div className="headerSearchItem">
					<MdLocationOn className="headerIcon locationIcon" />
					<input
						value={destination}
						onChange={e => setDestination(e.target.value)}
						type="text"
						placeholder="where to go?"
						className="headerSearchInput"
						name="destination"
						id="destination"
					/>
					<span className="seperator"></span>
				</div>
				<div className="headerSearchItem">
					<HiCalendar className="headerIcon dateIcon" />
					<div onClick={() => setOpenDate(!openDate)} className="dateDropDown">
						{`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(date[0].endDate, 'MM/dd/yyyy')}`}
					</div>
					{openDate && (
						<DateRange
							onChange={item => setDate([item.selection])}
							ranges={date}
							className="date"
							minDate={new Date()}
							moveRangeOnFirstSelection={true}
						/>
					)}
					<span className="seperator"></span>
				</div>
				<div className="headerSearchItem">
					<div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}>
						{options.adult} adult &nbsp;&bull;&nbsp; {options.children} children &nbsp;&bull;&nbsp;
						{options.room} room
					</div>
					{openOptions && <GuestOptionList setOpenOptions={setOpenOptions} handleOptions={handleOptions} options={options} />}
					<span className="seperator"></span>
				</div>
				<div className="headerSearchItem">
					<button className="headerSearchBtn" onClick={handleSearch}>
						<HiSearch className="headerIcon" />
					</button>
				</div>
			</div>
			<User />
		</div>
	);
}
export default Header;

function GuestOptionList({ options, handleOptions, setOpenOptions }) {
	const optionsRef = useRef();
	useOutsideClick(optionsRef, 'optionDropDown', () => setOpenOptions(false));
	return (
		<div className="guestOptions" ref={optionsRef}>
			<OptionItem handleOptions={handleOptions} type="adult" options={options} minLimit={1} />
			<OptionItem handleOptions={handleOptions} type="children" options={options} minLimit={0} />
			<OptionItem handleOptions={handleOptions} type="room" options={options} minLimit={1} />
		</div>
	);
}

function OptionItem({ options, type, minLimit, handleOptions }) {
	return (
		<div className="guestOptionItem">
			<span className="optionText">{type}</span>
			<div className="optionCounter">
				<button onClick={() => handleOptions(type, 'dec')} className="optionCounterBtn" disabled={options[type] <= minLimit}>
					<HiMinus className="icon" />
				</button>
				<span className="optionCounterNumber">{options[type]}</span>
				<button onClick={() => handleOptions(type, 'inc')} className="optionCounterBtn">
					<HiPlus className="icon" />
				</button>
			</div>
		</div>
	);
}

const User = () => {
	const { user, isAuthenticated, logout } = useAuth();
	const handleLogout = () => {
		logout();
		Navigate('/');
	};

	return (
		<div>
			{isAuthenticated ? (
				<div>
					<strong>{user.name}</strong>
					<button>
						&nbsp; <MdLogout onClick={handleLogout} className="logout icon" />
					</button>
				</div>
			) : (
				<NavLink to="/login">login</NavLink>
			)}
		</div>
	);
};
