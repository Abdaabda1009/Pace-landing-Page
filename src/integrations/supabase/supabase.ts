import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://qhydmtfzqutlroodbjhr.supabase.co'
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoeWRtdGZ6cXV0bHJvb2RiamhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxMzU4NjAsImV4cCI6MjA1NzcxMTg2MH0.vrWuGzVvkDHhAVogvjMC7ZXKjvtFfCkbrXbg2CVXKaQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
