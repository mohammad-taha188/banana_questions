import { createClient } from "@supabase/supabase-js";

let supabaseInfo = {
  projectURL: "https://exjvpihzcosrpgwnlgil.supabase.co",
  key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4anZwaWh6Y29zcnBnd25sZ2lsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1MzY4NTAsImV4cCI6MjA2OTExMjg1MH0.6dT3W1Ae1hReII1QLAprXUzIQq-eCOe8i8lyUrOdJ0M",
};

export const supabase = createClient(supabaseInfo.projectURL, supabaseInfo.key);
