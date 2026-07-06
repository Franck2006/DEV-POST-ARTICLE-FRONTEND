import { inject, Injectable, signal } from "@angular/core";
import { SupabaseService } from "../../supabase/supabase.service";

@Injectable({
    providedIn: 'root'
})
export class RealTimeArticlesService {
    private readonly supabase = inject(SupabaseService).supabase;

    public readonly articles = signal<any[]>([]);

    constructor() {
        this.fetchArticles();
        console.log('RealTimeArticlesService initialized and articles fetched.');
    }

    private async fetchArticles() {
        const { data: articleData, error: articleError } = await this.supabase
            .from('Article')
            .select('*')
            .order('id', { ascending: true });

        if (articleError) {
            console.error('Error fetching articles:', articleError);
            return;
        }

        this.articles.set(articleData);

        console.log('Fetched articles:', articleData);

    }
}