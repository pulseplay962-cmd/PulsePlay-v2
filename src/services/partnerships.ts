import { supabase } from "../lib/supabase";

export type PartnershipInquiry = {
  id?: string;
  company_name: string;
  contact_name: string;
  email: string;
  website?: string;
  partnership_type: string;
  message: string;
  campaign_start?: string;
  campaign_end?: string;
  budget?: string;
  how_heard?: string;
  status?: string;
  admin_notes?: string;
  created_at?: string;
};

export async function submitPartnershipInquiry(
  inquiry: Omit<PartnershipInquiry, "id" | "status" | "admin_notes" | "created_at">
) {
  const { data, error } = await supabase
    .from("partnership_inquiries")
    .insert([inquiry])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as PartnershipInquiry;
}
