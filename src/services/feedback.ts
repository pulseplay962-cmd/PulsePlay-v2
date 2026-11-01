import { supabase } from "../lib/supabase";

export type Feedback = {
    id?: string;
    name?: string;
    email?: string;
    rating: number;
    category: string;
    message: string;
    created_at?: string;
};

export async function submitFeedback(
    feedback: Omit<Feedback, "id" | "created_at">
): Promise<void> {
    const { error } = await supabase
        .from("feedback")
        .insert([
            feedback
        ]);

    if (error) {
        throw error;
    }
}