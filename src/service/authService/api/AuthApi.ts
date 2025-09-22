import { supabase } from '@/lib/supabaseClient';

export class AuthAPI {
	/**
	 * Login with email and password
	 */
	static async login(email: string, password: string) {
		const { data, error } = await supabase.auth.signInWithPassword({ email, password });
       // console.log("Login:", data, error);
           
		if (error) throw error;

		if(data && data.user){
			// Fetch user profile from 'user_profiles' table
			const profile = await this.getUserProfile(data.user.id);
			return {
				user: {
					id: data.user.id,
					email: data.user.email || undefined,
					phone: data.user.phone || null,
					role: profile?.role || undefined,
				},
				session: data.session,
			};
		}
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

		if(data && data.user  && data.user.id){
			// Create user profile in 'user_profiles' table

			const data1={
				role:"mentee",
				user_id:data.user.id,
				full_name:full_name || email.split('@')[0],
				
			}
			await this.createUserProfile(data1)
		}
		return data;
	}

	// get userProfile based on id token
	static async getUserProfile(userId: string) {
		const { data, error } = await supabase
			.from('user_profiles')
			.select('*')
			.eq('user_id', userId)
			.single();
		console.log("Get User Profile:", data, error);
		if (error) throw error;
		return data;
	}

	//insert userProfile based on id token
	static async createUserProfile(profileData: { user_id: string; full_name?: string; role?: string }) {
		const { data, error } = await supabase
			.from('user_profiles')
			.insert(profileData)
			.single();
		if (error) throw error;
		return data;
	}
}


