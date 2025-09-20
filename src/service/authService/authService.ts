import { supabase } from '@/lib/supabaseClient';
import { AuthAPI } from './api/AuthApi';

export const AuthService = {
    /**
     * Login with email and password
     */
    async login(email: string, password: string) {
       // authApi function for login
       return await AuthAPI.login(email, password);
    },

    /**
     * Sign up with email, password, and optional full_name
     */
    async signup(email: string, password: string, full_name?: string) {
       // authApi function for signup
       return await AuthAPI.signup(email, password, full_name);
    }
};
