import {Navigate, Route, Routes} from 'react-router-dom';

import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import {useDispatch, useSelector} from 'react-redux';
import {
	checkAuthAsync,
	selectLoggedInUser,
	selectUserChecked,
} from './features/auth/AuthSlice';
import {useEffect} from 'react';
import {fetchLoggedInUserAsync} from './features/user/UserSlice';
import Protected from './components/Protected';
import LogoutPage from './pages/LogoutPage';
import NotFoundPage from './pages/NotFoundPage';
import PremiumPage from './pages/PremiumPage';
import ChatPage from './pages/ChatPage';
import ChatHistoryPage from './pages/ChatHistoryPage';
import {fetchChatHistoryAsync} from './features/chat/ChatThunk';

const App = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectLoggedInUser);
	const userChecked = useSelector(selectUserChecked);

	useEffect(() => {
		dispatch(checkAuthAsync());
	}, [dispatch]);

	useEffect(() => {
		if (user) {
			dispatch(fetchChatHistoryAsync());
			dispatch(fetchLoggedInUserAsync());
		}
	}, [dispatch, user]);

	return (
		<div>
			<Routes>
				<Route path="/" element={<ChatPage />} />
				<Route path="*" element={<NotFoundPage></NotFoundPage>} />
			</Routes>
		</div>
	);
};

export default App;
