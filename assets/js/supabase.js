// Import dari CDN
const SUPABASE_URL = "https://lbmvxdehkcuvqyjejlce.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxibXZ4ZGVoa2N1dnF5amVqbGNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5ODE1NjgsImV4cCI6MjA5MTU1NzU2OH0.EupExqwoqLah4XNdD15CHcR5LB7etkI0EWQd_2RCSEQ"

// Inisialisasi client
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);