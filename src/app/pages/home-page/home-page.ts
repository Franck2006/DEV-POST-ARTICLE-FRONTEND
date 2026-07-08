import { Component, inject, WritableSignal } from '@angular/core';
import { Dashboard } from '../../shared/dashboard/dashboard';
import { ArticleCard } from '../../components/article-card/article-card';
import { MOCK_ARTICLES } from '../../core/data/data.data';
import { CommonModule } from '@angular/common';
import { RealTimeArticlesService } from '../../realtime/artciles/retrieve-realtime-articles.service';
import { ModelInter } from '../../model/model.interface';

@Component({
  selector: 'app-home-page',
  imports: [Dashboard, ArticleCard, CommonModule],
  template: `
    <app-dashboard>
      <div class="space-y-5">
        <div *ngFor="let item of data" > 
         <app-article-card [article]="item" /> 
        </div>
      </div>
    </app-dashboard>
  `,
})
export class HomePage {
  public readonly articlesRealtime = inject(RealTimeArticlesService);
  public newdata = this.articlesRealtime.articles as WritableSignal<ModelInter.Article[]>;
  data = MOCK_ARTICLES;
  constructor() {
    console.log("this is the data from the home page", this.newdata)
  }
}
