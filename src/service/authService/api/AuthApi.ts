import { supabase } from '@/lib/supabaseClient';

export class AuthAPI {
	/**
	 * Login with email and password
	 */
	static async login(email: string, password: string) {
		const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        console.log("Login:", data, error);
		if (error) throw error;
		return data;
	}

	/**
	 * Sign up with email, password, and optional full_name
	 */
	static async signup(email: string, password: string, full_name?: string) {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: full_name ? { data: { full_name } } : undefined,
		});
		if (error) throw error;
		return data;
	}
}
