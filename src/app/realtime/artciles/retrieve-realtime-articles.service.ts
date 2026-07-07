import { inject, Injectable, signal } from "@angular/core";
import { SupabaseService } from "../../supabase/supabase.service";
import { RealtimeChannel, RealtimePostgresChangesPayload } from "@supabase/supabase-js";

@Injectable({
    providedIn: 'root'
})
export class RealTimeArticlesService {
    private articlesReatimeChannel!: RealtimeChannel
    public readonly articles = signal<any[]>([]);
    private readonly supabase = inject(SupabaseService).supabase;



    constructor() {
        // these are triggering the realtime 

        console.log(" ")
        console.log(" ")
        this.fetchArticles();
        this.setUpArticleRealTime()
        console.log(" this is where the real time is on init ")
        console.log(" ")
        console.log(" ")
    }

    private async fetchArticles() {
        const { data: articleData, error: articleError } = await this.supabase
            .from('Article')
            .select('*')
        // .order('id', { ascending: true });

        if (articleError)
            console.log('Error fetching articles:', articleError);
        else
            this.articles.set(articleData);

        console.log('Fetched articles:', articleData);

    }

    private async setUpArticleRealTime() {
        this.articlesReatimeChannel = this.supabase
            .channel("arcticle-channel")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "Article" },
                async (payload: RealtimePostgresChangesPayload<any>) => {
                    await this.handleArticleEvent(payload)
                }
            )
            .subscribe((status, error) => {
                if (error) console.log("REALTIME ERROR", error)
                console.log(status)
            })
    }

    private handleArticleEvent(paload: RealtimePostgresChangesPayload<any>) {
        const { eventType, new: newRecord } = paload

        // these are coming from the payload 
        console.log(eventType)
        console.log(newRecord)

    }
}