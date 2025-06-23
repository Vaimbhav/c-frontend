// import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// import {
// 	fetchLoggedInUser,
// 	fetchLoggedInUserOrders,
// 	updateUser,
// } from './UserApi';

// const initialState = {
// 	status: 'idle',
// 	userInfo: null, // this info will be used in case of detailed user info, while auth will
// 	// only be used for loggedInUser id etc checks
// };

// export const fetchLoggedInUserOrderAsync = createAsyncThunk(
// 	'user/fetchLoggedInUserOrders',
// 	async () => {
// 		const response = await fetchLoggedInUserOrders();
// 		// console.log('at demand- ', response.data);
// 		// The value we return becomes the `fulfilled` action payload
// 		return response.data;
// 	}
// );

// export const fetchLoggedInUserAsync = createAsyncThunk(
// 	'user/fetchLoggedInUser',
// 	async () => {
// 		const response = await fetchLoggedInUser();
// 		// The value we return becomes the `fulfilled` action payload
// 		return response.data;
// 	}
// );

// export const updateUserAsync = createAsyncThunk(
// 	'user/updateUser',
// 	async (update) => {
// 		// console.log('update- ', update);
// 		const response = await updateUser(update);
// 		// The value we return becomes the `fulfilled` action payload
// 		return response.data;
// 	}
// );

// export const UserSlice = createSlice({
// 	name: 'user',
// 	initialState,
// 	reducers: {},
// 	extraReducers: (builder) => {
// 		builder
// 			.addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
// 				state.status = 'loading';
// 			})
// 			.addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
// 				state.status = 'idle';
// 				state.userInfo.orders = action.payload;
// 			})
// 			.addCase(updateUserAsync.pending, (state) => {
// 				state.status = 'loading';
// 			})
// 			.addCase(updateUserAsync.fulfilled, (state, action) => {
// 				state.status = 'idle';
// 				state.userInfo = action.payload;
// 			})
// 			.addCase(fetchLoggedInUserAsync.pending, (state) => {
// 				state.status = 'loading';
// 			})
// 			.addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
// 				state.status = 'idle';
// 				// this info can be different or more from logged-in User info
// 				state.userInfo = action.payload;
// 			});
// 	},
// });

// export const selectUserOrders = (state) => state.user.userInfo.orders;
// export const selectUserInfo = (state) => state.user.userInfo;
// export const selectUserInfoStatus = (state) => state.user.status;
// // export const { increment } = userSlice.actions;

// export default UserSlice.reducer;

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
	fetchLoggedInUser,
	fetchLoggedInUserOrders,
	updateUser,
} from './UserApi';

const initialState = {
	status: 'idle',
	userInfo: null,
	error: null,
};

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
	'user/fetchLoggedInUserOrders',
	async (_, {rejectWithValue}) => {
		try {
			const response = await fetchLoggedInUserOrders();
			return response.data;
		} catch (err) {
			return rejectWithValue(err.message || 'Failed to fetch orders');
		}
	}
);

export const fetchLoggedInUserAsync = createAsyncThunk(
	'user/fetchLoggedInUser',
	async (_, {rejectWithValue}) => {
		try {
			const response = await fetchLoggedInUser();
			return response.data;
		} catch (err) {
			return rejectWithValue(err.message || 'Failed to fetch user');
		}
	}
);

export const updateUserAsync = createAsyncThunk(
	'user/updateUser',
	async (update, {rejectWithValue}) => {
		try {
			const response = await updateUser(update);
			return response.data;
		} catch (err) {
			return rejectWithValue(err.message || 'Failed to update user');
		}
	}
);

export const UserSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// fetchLoggedInUserOrders
			.addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
				state.status = 'idle';
				state.userInfo.orders = action.payload;
			})
			.addCase(fetchLoggedInUserOrderAsync.rejected, (state, action) => {
				state.status = 'idle';
				state.error = action.payload;
			})

			// updateUser
			.addCase(updateUserAsync.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(updateUserAsync.fulfilled, (state, action) => {
				state.status = 'idle';
				state.userInfo = action.payload;
			})
			.addCase(updateUserAsync.rejected, (state, action) => {
				state.status = 'idle';
				state.error = action.payload;
			})

			// fetchLoggedInUser
			.addCase(fetchLoggedInUserAsync.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
				state.status = 'idle';
				state.userInfo = action.payload;
			})
			.addCase(fetchLoggedInUserAsync.rejected, (state, action) => {
				state.status = 'idle';
				state.error = action.payload;
			});
	},
});

export const selectUserOrders = (state) => state.user.userInfo?.orders;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserInfoStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;

export default UserSlice.reducer;
