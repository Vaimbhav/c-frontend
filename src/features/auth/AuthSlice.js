import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
	checkAuth,
	createUser,
	loginUser,
	resetPassword,
	resetPasswordRequest,
	signOut,
} from './AuthApi';

const initialState = {
	loggedInUserToken: null,
	status: 'idle',
	error: null,
	userChecked: false,
	mailSent: false,
	passwordReset: false,
};

export const createUserAsync = createAsyncThunk(
	'user/createUser',
	async (userData) => {
		const response = await createUser(userData);
		// The value we return becomes the `fulfilled` action payload
		return response.data;
	}
);

export const loginUserAsync = createAsyncThunk(
	'user/loginUser',
	async (loginInfo, {rejectWithValue}) => {
		try {
			// console.log('val- ', loginInfo);
			const response = await loginUser(loginInfo);
			// The value we return becomes the `fulfilled` action payload
			// console.log('val- ', response.data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const checkAuthAsync = createAsyncThunk('user/checkAuth', async () => {
	try {
		const response = await checkAuth();
		// The value we return becomes the `fulfilled` action payload
		return response.data;
	} catch (error) {
		console.error(error);
	}
});

export const signOutAsync = createAsyncThunk('user/signOut', async () => {
	const response = await signOut();
	// The value we return becomes the `fulfilled` action payload
	// console.log(response.data);
	return response.data;
});

export const resetPasswordRequestAsync = createAsyncThunk(
	'user/resetPasswordRequest',
	async (email, {rejectWithValue}) => {
		try {
			const response = await resetPasswordRequest(email);
			return response.data;
		} catch (error) {
			// console.log(error);
			return rejectWithValue(error);
		}
	}
);

export const resetPasswordAsync = createAsyncThunk(
	'user/resetPassword',
	async (data, {rejectWithValue}) => {
		try {
			const response = await resetPassword(data);
			// console.log(response);
			return response.data;
		} catch (error) {
			// console.log(error);
			return rejectWithValue(error);
		}
	}
);

export const AuthSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createUserAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(createUserAsync.fulfilled, (state, action) => {
				state.status = 'idle';
				state.loggedInUserToken = action.payload;
			})
			.addCase(loginUserAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(loginUserAsync.fulfilled, (state, action) => {
				state.status = 'idle';
				state.loggedInUserToken = action.payload;
			})
			.addCase(loginUserAsync.rejected, (state, action) => {
				state.status = 'idle';
				state.error = action.payload;
			})
			.addCase(signOutAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(signOutAsync.fulfilled, (state) => {
				state.status = 'idle';
				state.loggedInUserToken = null;
				// state.userChecked = false;
			})
			.addCase(checkAuthAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(checkAuthAsync.fulfilled, (state, action) => {
				state.status = 'idle';
				state.loggedInUserToken = action.payload;
				state.userChecked = true;
			})
			.addCase(checkAuthAsync.rejected, (state) => {
				state.status = 'idle';
				state.userChecked = true;
			})
			.addCase(resetPasswordRequestAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(resetPasswordRequestAsync.fulfilled, (state) => {
				state.status = 'idle';
				state.mailSent = true;
			})
			.addCase(resetPasswordAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(resetPasswordAsync.fulfilled, (state) => {
				state.status = 'idle';
				state.passwordReset = true;
			})
			.addCase(resetPasswordAsync.rejected, (state, action) => {
				state.status = 'idle';
				state.error = action.payload;
			});
	},
});

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) => state.auth.userChecked;
export const selectMailSent = (state) => state.auth.mailSent;
export const selectPasswordReset = (state) => state.auth.passwordReset;
// export const { } = authSlice.actions;

export default AuthSlice.reducer;
