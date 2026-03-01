import { supabase } from '../lib/supabase';

/**
 * Handle user signup and profile creation.
 */
export async function signUpUser(data: {
    email: string;
    password: string;
    companyName: string;
    gstNumber?: string;
    phone: string;
    businessType: string;
}) {
    // 1. Create Auth User
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
    });

    if (authError) throw authError;

    if (!authData.user) {
        throw new Error("Unable to create user account. Please try again.");
    }

    // 2. Insert Profile Data
    const { error: profileError } = await supabase
        .from('profiles')
        .insert([
            {
                id: authData.user.id,
                company_name: data.companyName,
                gst_number: data.gstNumber || null,
                business_type: data.businessType,
                phone: data.phone,
                role: 'dealer'
            }
        ]);

    if (profileError) {
        console.error("Profile creation error:", profileError);
        throw new Error("Account created, but failed to save profile details. Please contact support.");
    }

    return authData.user;
}

/**
 * Handle user signin
 */
export async function signInUser(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        if (error.message.includes('Invalid login credentials')) {
            throw new Error('Invalid email or password. Please try again.');
        } else {
            throw error;
        }
    }

    return data;
}

/**
 * Log the user out
 */
export async function signOutUser() {
    return await supabase.auth.signOut();
}
