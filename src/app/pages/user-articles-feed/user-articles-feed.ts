import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Dashboard } from '../../shared/dashboard/dashboard';
import { DevAppImgProfile } from '../../ui/dev-app-img-profile/dev-app-img-profile';
import { DevAppBtn } from '../../ui/dev-app-btn/dev-app-btn';
import { DatePipe } from '@angular/common';

export interface AuthorNode {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
}

export interface StreamArticle {
  id: string;
  authorId: string;
  title: string;
  description: string;
  createdAt: Date;
  likes: number;
}

export interface ActivityBundle {
  author: AuthorNode;
  featuredArticle: StreamArticle | null;
  olderArticles: StreamArticle[];
}

@Component({
  selector: 'app-user-articles-feed',
  standalone: true,
  imports: [RouterModule, Dashboard, DevAppImgProfile, DevAppBtn, DatePipe],
  template: `
    <app-dashboard>
      <div
        class="w-full max-w-3xl mx-auto px-2 sm:px-4 md:px-6 py-6 space-y-6 text-slate-200 overflow-x-hidden"
      >
        <div class="border-b border-slate-800/60 pb-5 text-center sm:text-left px-2">
          <h1 class="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Latest Network Updates
          </h1>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">
            See what other developers are publishing across the workspace grid.
          </p>
        </div>

        <div class="space-y-5">
          @for (item of authorActivityFeed(); track item.author.id) {
            <div
              class="w-full rounded-2xl border border-slate-800 bg-slate-900/30 p-4 sm:p-6 space-y-4 sm:space-y-5 hover:border-slate-700/60 transition-all duration-300 shadow-xl relative overflow-hidden"
            >
              <div
                class="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-blue-600/5 blur-xl pointer-events-none"
              ></div>

              <div
                class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 sm:pb-0"
              >
                <div class="flex items-center gap-3 min-w-0">
                  <div class="shrink-0">
                    <app-dev-app-img-profile
                      img_size="md"
                      [user_name]="item.author.name"
                      [user_image]="item.author.avatarUrl"
                    >
                    </app-dev-app-img-profile>
                  </div>

                  <div class="min-w-0">
                    <h3
                      class="text-sm font-bold text-white tracking-tight hover:text-blue-400 transition-colors cursor-pointer truncate"
                      [routerLink]="['/profile', item.author.username]"
                    >
                      {{ item.author.name }}
                    </h3>
                    <p class="text-[11px] font-mono text-slate-500 truncate">
                      &#64;{{ item.author.username }}
                    </p>
                  </div>
                </div>

                <span
                  class="text-[10px] font-mono text-slate-600 sm:text-right self-start sm:self-center bg-slate-950 sm:bg-transparent px-2 py-0.5 sm:p-0 rounded border border-slate-900 sm:border-none shrink-0"
                >
                  Active Node
                </span>
              </div>

              @if (item.featuredArticle; as article) {
                <div
                  class="w-full rounded-xl border border-slate-800/80 bg-slate-950/50 p-4 sm:p-5 space-y-3 group hover:bg-slate-950 transition-colors"
                >
                  <div
                    class="flex items-center justify-between text-[10px] text-slate-500 font-mono gap-4"
                  >
                    <span class="text-blue-400 font-bold uppercase tracking-wider truncate"
                      >Most Recent Entry</span
                    >
                    <span class="shrink-0">{{ article.createdAt | date: 'mediumDate' }}</span>
                  </div>

                  <div class="space-y-1 min-w-0">
                    <h4
                      class="text-sm sm:text-base font-extrabold text-slate-200 group-hover:text-blue-400 transition-colors duration-200 truncate"
                    >
                      {{ article.title }}
                    </h4>
                    <p class="text-xs text-slate-400 line-clamp-2 leading-relaxed break-words">
                      {{ article.description }}
                    </p>
                  </div>

                  <div
                    class="flex flex-col sm:flex-row sm:items-center justify-between pt-3 border-t border-slate-900 mt-2 gap-3"
                  >
                    <button
                      type="button"
                      (click)="onLikeClick(article.id)"
                      class="inline-flex items-center justify-center sm:justify-start gap-1.5 text-slate-500 hover:text-red-400 transition-colors py-2 px-3 sm:p-0 bg-slate-900/40 sm:bg-transparent rounded-xl border border-slate-800/40 sm:border-none w-full sm:w-auto"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        class="w-4 h-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                      <span class="font-mono text-[11px]">{{ article.likes }} likes</span>
                    </button>

                    <div class="w-full sm:w-auto">
                      <app-dev-app-btn
                        variant="ghost"
                        size="sm"
                        [routerLink]="['/article', article.id]"
                        class="w-full text-center block"
                      >
                        <span>Read Article</span>
                      </app-dev-app-btn>
                    </div>
                  </div>
                </div>
              } @else {
                <p class="text-xs text-slate-600 italic pl-1">
                  No articles logged under this profile cell instance yet.
                </p>
              }

              @if (item.olderArticles.length > 0) {
                <div class="space-y-2.5 pt-3 border-t border-slate-800/40">
                  <h5 class="text-[10px] font-bold tracking-wider uppercase text-slate-500 pl-1">
                    Other Recent Posts
                  </h5>

                  <ul class="space-y-2 text-xs">
                    @for (oldPost of item.olderArticles; track oldPost.id) {
                      <li
                        class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 p-2 rounded-xl bg-slate-950/20 sm:bg-transparent hover:bg-slate-800/20 transition-colors min-w-0"
                      >
                        <a
                          [routerLink]="['/article', oldPost.id]"
                          class="text-slate-400 hover:text-blue-400 transition-colors font-medium truncate max-w-full sm:max-w-md block"
                        >
                          → {{ oldPost.title }}
                        </a>
                        <span class="text-[10px] font-mono text-slate-600 shrink-0 pl-4 sm:pl-0">
                          {{ oldPost.createdAt | date: 'shortDate' }}
                        </span>
                      </li>
                    }
                  </ul>
                </div>
              }
            </div>
          } @empty {
            <div
              class="rounded-2xl border border-slate-800 border-dashed p-12 text-center text-slate-500 text-sm"
            >
              No active structural streams available to map out on the live feed array.
            </div>
          }
        </div>
      </div>
    </app-dashboard>
  `,
})
export class UserArticlesFeed {
  // Core authors register node pool
  readonly authorsRegister = signal<AuthorNode[]>([
    {
      id: 'usr-01',
      name: 'Franck Amani',
      username: 'franck_dev',
      avatarUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 'usr-02',
      name: 'Antoinette M.',
      username: 'antoinette_biz',
      avatarUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    },
  ]);

  // Comprehensive chronological article stream index
  readonly completeArticlesCatalog = signal<StreamArticle[]>([
    {
      id: 'art-201',
      authorId: 'usr-01',
      title: 'Synchronizing Real-Time Datastores with NestJS & Supabase',
      description:
        'Reviewing active channel subscription hooks, real-time message broadcasting structures, and relational row security assertions.',
      createdAt: new Date('2026-06-07T10:15:00Z'), // NEWEST ENTRY - Franck
      likes: 42,
    },
    {
      id: 'art-202',
      authorId: 'usr-01',
      title: 'Automating SerialPort Connections in Background Processes',
      description:
        'How to manage local hardware elements using standard runtime libraries straight from an active multi-device application stream loop.',
      createdAt: new Date('2026-06-03T14:20:00Z'), // OLDER ENTRY - Franck
      likes: 18,
    },
    {
      id: 'art-203',
      authorId: 'usr-02',
      title: 'Scaling Local Educational Platforms for High-Throughput Course Audits',
      description:
        'An architectural outline tracing asset buffer optimization and server-side curriculum index caching configurations.',
      createdAt: new Date('2026-06-06T18:00:00Z'), // NEWEST ENTRY - Antoinette
      likes: 95,
    },
    {
      id: 'art-204',
      authorId: 'usr-01',
      title: 'Designing Tailwind Layout Grids for Modern Dark-Mode SaaS Templates',
      description:
        'A deep design review mapping structural grid spacing parameters and avoiding parsing exceptions in compiled templates.',
      createdAt: new Date('2026-05-20T09:11:00Z'), // COMPACT PREVIOUS ENTRY - Franck
      likes: 64,
    },
  ]);

  // COMPUTED CALCULATOR: Maps each user with exactly ONE featured post + their previous history array
  readonly authorActivityFeed = computed<ActivityBundle[]>(() => {
    const authors = this.authorsRegister();
    const articles = this.completeArticlesCatalog();

    return authors.map((author) => {
      // Find all articles owned by this author, sorted in chronological descending order
      const sortedUserArticles = articles
        .filter((art) => art.authorId === author.id)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      // Separate the topmost entry from the remaining collection
      const featured = sortedUserArticles.length > 0 ? sortedUserArticles[0] : null;
      const older = sortedUserArticles.length > 1 ? sortedUserArticles.slice(1) : [];

      return {
        author,
        featuredArticle: featured,
        olderArticles: older,
      };
    });
  });

  onLikeClick(articleId: string): void {
    console.log(
      'Registering incremental interaction score updates for data element ID:',
      articleId,
    );
  }
}
