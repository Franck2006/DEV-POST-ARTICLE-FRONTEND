import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../core/env/envirmennt";
import { ModelInter } from "../../model/model.interface";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ArticlesService {
    constructor(private readonly http: HttpClient) { }

    public articleSubject = new BehaviorSubject<ModelInter.Article[]>([])
    public article$ = this.articleSubject.asObservable()

    setarticleSubject(articles: ModelInter.Article[]) {
        this.articleSubject.next(articles)
    }

    getArticles(limit: number, cursor: string | null) {
        let params = new HttpParams()
            .set('limit', limit.toString())
        if (cursor) {
            params = params.set('cursor', cursor)
        }

        console.log("this is the params", params.toString())

        return this.http.get<ModelInter.Article[]>(environment.LOCAL_BACKEND_URL + "/article/get-all-articles", { params })
    }

    postArticle(article: ModelInter.Article) {
        return this.http.post(environment.LOCAL_BACKEND_URL + "/article/create-article", article)
    }

    updateArticle(articleId: string, article: ModelInter.Article) {
        return this.http.put(`${environment.LOCAL_BACKEND_URL}/article/update-article/${articleId}`, article)
    }

    deleteArticle(articleId: string) {
        return this.http.delete(`${environment.LOCAL_BACKEND_URL}/article/delete-article/${articleId}`)
    }

}