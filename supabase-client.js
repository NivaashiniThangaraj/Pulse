import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.38.0/+esm';

const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';

let supabaseClient = null;

export function getSupabaseClient() {
  if (!supabaseClient) {
    const url = localStorage.getItem('supabaseUrl') || SUPABASE_URL;
    const key = localStorage.getItem('supabaseKey') || SUPABASE_ANON_KEY;

    if (!url || !key || url === SUPABASE_URL) {
      console.warn('Supabase not configured. Using mock data mode.');
      return null;
    }

    supabaseClient = createClient(url, key);
  }
  return supabaseClient;
}

export async function fetchAppointments() {
  const client = getSupabaseClient();
  if (!client) return [];

  const { data, error } = await client
    .from('appointments')
    .select('*')
    .order('appointment_date', { ascending: true });

  if (error) {
    console.error('Error fetching appointments:', error);
    return [];
  }
  return data || [];
}

export async function createAppointment(appointmentData) {
  const client = getSupabaseClient();
  if (!client) {
    console.log('Appointment (mock):', appointmentData);
    return { success: true, data: appointmentData };
  }

  const { data, error } = await client
    .from('appointments')
    .insert([appointmentData])
    .select();

  if (error) {
    console.error('Error creating appointment:', error);
    return { success: false, error };
  }
  return { success: true, data };
}

export async function fetchStaff() {
  const client = getSupabaseClient();
  if (!client) return [];

  const { data, error } = await client
    .from('staff_members')
    .select('*, departments(name)');

  if (error) {
    console.error('Error fetching staff:', error);
    return [];
  }
  return data || [];
}

export async function fetchDepartments() {
  const client = getSupabaseClient();
  if (!client) return [];

  const { data, error } = await client
    .from('departments')
    .select('*');

  if (error) {
    console.error('Error fetching departments:', error);
    return [];
  }
  return data || [];
}

export async function updateVitalSigns(patientId, vitalSignsData) {
  const client = getSupabaseClient();
  if (!client) {
    console.log('Vital signs (mock):', vitalSignsData);
    return { success: true, data: vitalSignsData };
  }

  const { data, error } = await client
    .from('vital_signs')
    .insert([{
      patient_id: patientId,
      ...vitalSignsData,
      recorded_at: new Date().toISOString()
    }])
    .select();

  if (error) {
    console.error('Error updating vital signs:', error);
    return { success: false, error };
  }
  return { success: true, data };
}
