import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../core/env/envirmennt";
import { ModelInter } from "../../model/model.interface";

@Injectable({
    providedIn: 'root'
})

export class ArticlesService {
    constructor(private readonly http: HttpClient) { }

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