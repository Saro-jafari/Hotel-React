import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../Context/AuthProvider';

function ProtectedRoute({ children }) {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) navigate('/login');
	}, [isAuthenticated, navigate]);

	return isAuthenticated ? children : null;
}
export default ProtectedRoute;
