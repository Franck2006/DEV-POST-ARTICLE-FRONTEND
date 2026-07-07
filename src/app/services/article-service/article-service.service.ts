import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../core/env/envirmennt";

@Injectable({
    providedIn: 'root'
})

export class ArticlesService {
    constructor(private readonly http: HttpClient) { }

    postArticle(article: any) {
        return this.http.post(environment.LOCAL_BACKEND_URL + "/article/create-article", article)
    }

    updateArticle(articleId: string, article: any) {
        return this.http.put(`${environment.LOCAL_BACKEND_URL}/article/update-article/${articleId}`, article)
    }

    deleteArticle(articleId: string) {
        return this.http.delete(`${environment.LOCAL_BACKEND_URL}/article/delete-article${articleId}`)
    }

}