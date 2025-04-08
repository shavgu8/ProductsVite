
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cwdeztssaoeivmkdpmuo.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3ZGV6dHNzYW9laXZta2RwbXVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA5ODU2MjksImV4cCI6MjAzNjU2MTYyOX0.51M94jmxcY2-eJGzHqyxnxtxAQMCbM7wnzRmteG0lM8"

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;