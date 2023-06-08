import { supabase } from '../lib/supabaseService';

export async function fetchData() {
    try {
        const { data, error } = await supabase.from('todoList Table').select('*');
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        console.error('There was an error fetching data:', error);
        return [];
    }
};