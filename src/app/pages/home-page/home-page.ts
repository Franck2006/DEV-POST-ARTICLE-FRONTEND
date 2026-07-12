import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { Dashboard } from '../../shared/dashboard/dashboard';
import { ArticleCard } from '../../components/article-card/article-card';
import { MOCK_ARTICLES } from '../../core/data/data.data';
import { CommonModule } from '@angular/common';
import { RealTimeArticlesService } from '../../realtime/artciles/retrieve-realtime-articles.service';
import { ModelInter } from '../../model/model.interface';
import { ArticlesService } from '../../services/article-service/article-service.service';
import { ArticlePreloader } from "../../ui/article-preloader/article-preloader";

@Component({
  selector: 'app-home-page',
  imports: [Dashboard, ArticleCard, CommonModule, ArticlePreloader],
  template: `
    <app-dashboard>
      <div class="space-y-5">
        <div *ngFor="let item of articles()" > 
         <app-article-card [article]="item" /> 
        </div>

        <app-article-preloader *ngIf="isLoading()"/>
        <div #scrollAnchor class="h-16"></div>
      </div>
    </app-dashboard>
  `,
})
export class HomePage implements OnInit, AfterViewInit, OnDestroy {

  public readonly articlesRealtime = inject(RealTimeArticlesService);
  private readonly articlesService = inject(ArticlesService);

  public newdata = this.articlesRealtime.articles as WritableSignal<ModelInter.Article[]>;
  data = MOCK_ARTICLES;
  constructor() {
    console.log("this is the data from the home page", this.newdata())
  }

  // this is the new code that i am going to add to the home page component to get the articles from the backend and display them in the home page component
  @ViewChild('scrollAnchor') scrollAnchor !: ElementRef<HTMLDivElement>;

  articles = signal<any[]>([])
  isLoading = signal<boolean>(false)
  nextCursor = signal<string | null>(null)
  limit = signal<number>(4)

  private observer !: IntersectionObserver;
  ngOnInit() {
    this.loadArticles()
  }

  ngAfterViewInit() {
    this.setupIntersectionObserver()
  }

  private loadArticles() {
    this.isLoading.set(true)

    this.articlesService.getArticles(this.limit(), this.nextCursor()).subscribe({
      next: (response: any) => {
        this.articles.set([...this.articles(), ...response.articles])
        this.nextCursor.set(response.nextCursor)
        this.isLoading.set(false)

        console.log("this is the articles from the backend", response)

      },
      error: (error) => {
        console.error('Error fetching articles:', error)
        this.isLoading.set(false)
      }
    })
  }

  private setupIntersectionObserver() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !this.isLoading() && this.nextCursor()) {
        this.loadArticles()
      }
    }, {
      rootMargin: '200px',
      // threshold: 1.0
    })

    this.observer.observe(this.scrollAnchor.nativeElement)
  }


  ngOnDestroy() {
    if (this.observer) this.observer.disconnect()
  }
}
