
import { createClient } from '@supabase/supabase-js'
import {supaKey, supaUrl} from "../env";

// Create a single supabase client for interacting with your database
export const supabase = createClient(supaUrl, supaKey)
