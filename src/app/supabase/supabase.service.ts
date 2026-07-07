import { Injectable } from "@angular/core";
import { createClient, SupabaseClient } from "@supabase/supabase-js"
import { environment } from "../core/env/envirmennt";


@Injectable({
    providedIn: 'root',
})

export class SupabaseService {
    public supabase: SupabaseClient

    private readonly supabase_url = environment.SUPABASE_URL;
    private readonly supabase_key = environment.SUPABASE_KEY;

    constructor() {
        this.supabase = createClient(
            this.supabase_url,
            this.supabase_key
        )


        // console.log("supabase client created", this.supabase)
    }
}