import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qkbzwnufethqqaiorsvi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrYnp3bnVmZXRocXFhaW9yc3ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUxMzEyMDMsImV4cCI6MjAwMDcwNzIwM30.54VqBetuMUWdECwEeVvW98lS6TO3zDf8Zft0SY-8GSY'
const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase