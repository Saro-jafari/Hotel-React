import { createContext, useContext, useEffect, useReducer } from 'react';

import axios from 'axios';
import toast from 'react-hot-toast';

const BookMarkContext = createContext();
const Base_URL = 'http://localhost:5000';

const initialState = {
	bookmarks: [],
	isLoading: false,
	currentBookMark: null,
	error: null,
};
const bookMarkReducer = (state, action) => {
	switch (action.type) {
		case 'loading':
			return {
				...state,
				isLoading: true,
			};
		case 'bookmarks/loaded':
			return {
				...state,
				isLoading: false,
				bookmarks: action.payload,
			};
		case 'bookmark/created':
			return {
				...state,
				isLoading: false,
				currentBookMark: action.payload,
				bookmarks: [...state.bookmarks, action.payload],
			};
		case 'bookmark/deleted':
			return {
				...state,
				isLoading: false,
				bookmarks: state.bookmarks.filter(item => item.id !== action.payload),
				currentBookmark: null,
			};
		case 'bookmark/loaded':
			return {
				...state,
				isLoading: false,
				currentBookMark: action.payload,
			};
		case 'rejected':
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		default:
			throw new Error('Invalid action');
	}
};
const BookMarkListProvider = ({ children }) => {
	const [{ bookmarks, isLoading, currentBookMark }, dispatch] = useReducer(bookMarkReducer, initialState);
	useEffect(() => {
		const fetchBookmarkList = async id => {
			dispatch({ type: 'loading' });
			try {
				const { data } = await axios.get(`${Base_URL}/bookmarks`);
				dispatch({ type: 'bookmark/loaded', payload: data });
			} catch (error) {
				toast.error(error.message);
				dispatch({ type: 'rejected', payload: error.message });
			}
		};
		fetchBookmarkList();
	}, []);
	const getBookMark = async id => {
		if (Number(id) === currentBookMark?.id) return;
		dispatch({ type: 'loading' });
		try {
			const { data } = await axios.get(`${Base_URL}/bookmarks/${id}`);
			dispatch({ type: 'bookmark/loaded', payload: data });
		} catch (error) {
			toast.error(error.message);
			dispatch({ type: 'rejected', payload: error.message });
		}
	};

	const createBookmark = async newBookMark => {
		dispatch({ type: 'loading' });
		try {
			const { data } = await axios.post(`${Base_URL}/bookmarks/`, newBookMark);
			dispatch({ type: 'bookmark/created', payload: data });
		} catch (error) {
			toast.error(error.message);
			dispatch({ type: 'rejected', payload: error.message });
		}
	};
	const deleteBookmark = async id => {
		dispatch({ type: 'loading' });
		try {
			const { data } = await axios.delete(`${Base_URL}/bookmarks/${id}`);
			console.log(data);
			dispatch({ type: 'bookmark/deleted', payload: id });
		} catch (error) {
			toast.error(error.message);
			dispatch({ type: 'rejected', payload: error.message });
		}
	};
	return (
		<BookMarkContext.Provider value={{ isLoading, bookmarks, getBookMark, currentBookMark, createBookmark, deleteBookmark }}>
			{children}
		</BookMarkContext.Provider>
	);
};
export default BookMarkListProvider;
export const useBookMarks = () => useContext(BookMarkContext);
