// const API_URL = import.meta.env.REACT_APP_API_URL;

// export function createUser(userData) {
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			const response = await fetch(`${API_URL}/api/v1/users/signup`, {
// 				method: 'POST',
// 				body: JSON.stringify(userData),
// 				headers: {'content-type': 'application/json'},
// 			});
// 			const data = await response.json();
// 			// TODO: on server it will only return some info of user (not password)
// 			resolve({data});
// 		} catch (error) {
// 			reject({message: error.message});
// 		}
// 	});
// }

// export function loginUser(loginInfo) {
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			const response = await fetch(`${API_URL}/api/v1/users/login`, {
// 				method: 'POST',
// 				body: JSON.stringify(loginInfo),
// 				headers: {'content-type': 'application/json'},
// 				// credentials: 'include',
// 				withCredentials: true,
// 			});
// 			if (response.ok) {
// 				const data = await response.json();
// 				// console.log({ data });
// 				resolve({data});
// 			} else {
// 				const error = await response.json();
// 				// console.log(error);
// 				reject(error);
// 			}
// 		} catch (error) {
// 			// console.log(error);
// 			reject(error);
// 		}
// 	});
// }

// export function checkAuth() {
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			const response = await fetch(`${API_URL}/api/v1/users/check`, {
// 				method: 'GET',
// 				credentials: 'include',
// 				withCredentials: true,
// 			});
// 			if (response.ok) {
// 				const data = await response.json();
// 				resolve({data});
// 			} else {
// 				const error = await response.text();
// 				reject(error);
// 			}
// 		} catch (error) {
// 			reject(error);
// 		}
// 	});
// }

// export function signOut() {
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			const response = await fetch(`${API_URL}/api/v1/users/logout`);
// 			if (response.ok) {
// 				resolve({data: 'success'});
// 			} else {
// 				const error = await response.text();
// 				reject(error);
// 			}
// 		} catch (error) {
// 			// console.log(error);
// 			reject(error);
// 		}
// 	});
// }

// export function resetPasswordRequest(email) {
// 	return new Promise(async (resolve, reject) => {
// 		// console.log('here-');
// 		try {
// 			const response = await fetch(
// 				`${API_URL}/api/v1/users/reset-password-request`,
// 				{
// 					method: 'POST',
// 					body: JSON.stringify({email}),
// 					headers: {'content-type': 'application/json'},
// 				}
// 			);
// 			if (response.ok) {
// 				const data = await response.json();
// 				resolve({data});
// 			} else {
// 				const error = await response.text();
// 				reject(error);
// 			}
// 		} catch (error) {
// 			reject(error);
// 		}
// 	});
// }

// export function resetPassword(data) {
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			const response = await fetch(
// 				`${API_URL}/api/v1/users/reset-password`,
// 				{
// 					method: 'POST',
// 					body: JSON.stringify(data),
// 					headers: {'content-type': 'application/json'},
// 				}
// 			);
// 			if (response.ok) {
// 				const data = await response.json();
// 				resolve({data});
// 			} else {
// 				const error = await response.text();
// 				reject(error);
// 			}
// 		} catch (error) {
// 			reject(error);
// 		}
// 	});
// }

const API_URL = process.env.REACT_APP_API_URL;

export function createUser(userData) {
	return new Promise((resolve, reject) => {
		(async () => {
			try {
				const response = await fetch(`${API_URL}/api/v1/users/signup`, {
					method: 'POST',
					body: JSON.stringify(userData),
					headers: {'content-type': 'application/json'},
					credentials: 'include',
				});
				const data = await response.json();
				resolve({data});
			} catch (error) {
				reject({message: error.message});
			}
		})();
	});
}

export function loginUser(loginInfo) {
	return new Promise((resolve, reject) => {
		(async () => {
			try {
				console.log(API_URL);
				const response = await fetch(`${API_URL}/api/v1/users/login`, {
					method: 'POST',
					body: JSON.stringify(loginInfo),
					headers: {'content-type': 'application/json'},
					credentials: 'include',
				});
				if (response.ok) {
					const data = await response.json();
					resolve({data});
				} else {
					const error = await response.json();
					reject(error);
				}
			} catch (error) {
				reject(error);
			}
		})();
	});
}

export function checkAuth() {
	return new Promise((resolve, reject) => {
		(async () => {
			try {
				const response = await fetch(`${API_URL}/api/v1/users/check`, {
					method: 'GET',
					credentials: 'include',
				});
				if (response.ok) {
					const data = await response.json();
					resolve({data});
				} else {
					const error = await response.text();
					reject(error);
				}
			} catch (error) {
				reject(error);
			}
		})();
	});
}

export function signOut() {
	return new Promise((resolve, reject) => {
		(async () => {
			try {
				const response = await fetch(`${API_URL}/api/v1/users/logout`, {
					credentials: 'include',
				});
				if (response.ok) {
					resolve({data: 'success'});
				} else {
					const error = await response.text();
					reject(error);
				}
			} catch (error) {
				reject(error);
			}
		})();
	});
}

export function resetPasswordRequest(email) {
	return new Promise((resolve, reject) => {
		(async () => {
			try {
				const response = await fetch(
					`${API_URL}/api/v1/users/reset-password-request`,
					{
						method: 'POST',
						body: JSON.stringify({email}),
						headers: {'content-type': 'application/json'},
						credentials: 'include',
					}
				);
				if (response.ok) {
					const data = await response.json();
					resolve({data});
				} else {
					const error = await response.text();
					reject(error);
				}
			} catch (error) {
				reject(error);
			}
		})();
	});
}

export function resetPassword(data) {
	return new Promise((resolve, reject) => {
		(async () => {
			try {
				const response = await fetch(
					`${API_URL}/api/v1/users/reset-password`,
					{
						method: 'POST',
						body: JSON.stringify(data),
						headers: {'content-type': 'application/json'},
						credentials: 'include',
					}
				);
				if (response.ok) {
					const data = await response.json();
					resolve({data});
				} else {
					const error = await response.text();
					reject(error);
				}
			} catch (error) {
				reject(error);
			}
		})();
	});
}
