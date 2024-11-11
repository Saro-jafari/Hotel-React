import { Toaster } from 'react-hot-toast';
import './App.css';
import Header from './Components/Header/Header';
import LocationList from './Components/Locationlist/LocationList';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './Components/AppLayout/AppLayout';
import Hotels from './Components/Hotels/Hotels';
import HotelsProvider from './Components/Context/HotelsProvider';
import SingleHotel from './Components/SingleHotel/SingleHotel';
import BookMarkLayout from './Components/BookMarkLayout/BookMarkLayout';
import BookMarkListProvider from './Components/Context/BookMarkListProvider';
import BookMark from './Components/BookMark/BookMark';
import SingleBookMark from './Components/SingleBookMark/SingleBookMark';
import AddNewBookMark from './Components/AddNewBookMark/AddNewBookMark';
import AuthProvider from './Components/Context/AuthProvider';
import Login from './Components/Login/Login';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

function App() {
	return (
		<div>
			<AuthProvider>
				<BookMarkListProvider>
					<HotelsProvider>
						<Toaster />
						<Header />
						<Routes>
							<Route path="/" element={<LocationList />} />
							<Route path="/login" element={<Login />} />
							<Route path="/hotels" element={<AppLayout />}>
								<Route index element={<Hotels />} />
								<Route path=":id" element={<SingleHotel />} />
							</Route>
							<Route
								path="/bookmark"
								element={
									<ProtectedRoute>
										<BookMarkLayout />
									</ProtectedRoute>
								}>
								<Route index element={<BookMark />} />
								<Route path=":id" element={<SingleBookMark />} />
								<Route path="add" element={<AddNewBookMark />} />
							</Route>
						</Routes>
					</HotelsProvider>
				</BookMarkListProvider>
			</AuthProvider>
		</div>
	);
}

export default App;
