import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {Toaster} from 'react-hot-toast';
import {store} from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
				<Toaster />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
);

reportWebVitals();

// {
// 	/* <BrowserRouter>
// 	<Provider store={store}>
// 		<App />
// 		<Toaster />
// 	</Provider>
// </BrowserRouter>; */
// }
