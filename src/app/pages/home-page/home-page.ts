import { Component } from '@angular/core';
import { Dashboard } from '../../shared/dashboard/dashboard';
import { ArticleCard } from '../../components/article-card/article-card';
import { MOCK_ARTICLES } from '../../core/data/data.data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [Dashboard, ArticleCard, CommonModule],
  template: `
    <app-dashboard>
      <div class="space-y-5">
        <div *ngFor="let item of data">
          <app-article-card [article]="item" />
        </div>
      </div>
    </app-dashboard>
  `,
})
export class HomePage {
  data = MOCK_ARTICLES;
}
