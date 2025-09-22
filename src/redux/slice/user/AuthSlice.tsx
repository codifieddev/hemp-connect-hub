import { LoginCredentials, User } from '@/model/AuthModel';
import { AuthService } from '@/service/authService/authService';
import { buildCreateSlice, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthUserDetails {
	id: string;
	email?: string;
	phone?: string | null;
	role?: string;
}

export interface SessionModel {
	access_token: string;
	expires_at?: number;
	expires_in: number;
	refresh_token: string;
	token_type: string;
}

interface AuthState {
	user: AuthUserDetails | null;
	session: SessionModel | null;
	userProfile: User | null;
	isAuthenticated: boolean;
}

const initialState: AuthState = {
	user: null,
	session: null,
	userProfile: null,
	isAuthenticated: false,
};

 // Create thunk for login
 export const login = createAsyncThunk('auth/login', async (credentials: LoginCredentials) => {
   // Simulate API call
   const response = await AuthService.login(credentials.email, credentials.password);
   return response;
 });    

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<AuthUserDetails | null>) {
			state.user = action.payload;
		},
		setSession(state, action: PayloadAction<SessionModel | null>) {
			state.session = action.payload;
		},
		logout(state) {
			state.user = null;
			state.session = null;
		},
	},	
	extraReducers: (builder) => {
		builder
		.addCase(login.fulfilled, (state, action) => {
			state.user = action.payload.user;
			state.session = action.payload.session;
			state.userProfile = action.payload.userProfile;
			state.isAuthenticated = true;
		})
	   .addCase(login.rejected, (state, action) => {
			state.user = null;
			state.session = null;
			state.isAuthenticated = false;
		});
	},

	
});

// extra reducers: (builder) => 

export const { setUser, setSession, logout } = authSlice.actions;
export default authSlice.reducer;
