import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Dashboard } from '../../shared/dashboard/dashboard';
import { DevAppBtn } from '../../ui/dev-app-btn/dev-app-btn';
import { DevAppImgProfile } from '../../ui/dev-app-img-profile/dev-app-img-profile';

export interface DetailedAuthor {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  bio: string;
  skills: string[]; // Stacking all core engineering capacities directly
}

export interface FullArticleNode {
  id: string;
  authorId: string;
  title: string;
  description: string;
  bodyContent: string;
  createdAt: Date;
  likes: number;
  readingTime: number;
  isLiked: boolean;
}

@Component({
  selector: 'app-article-details-page',
  standalone: true,
  imports: [RouterModule, DatePipe, Dashboard, DevAppImgProfile],
  template: `
    <app-dashboard>
      <div class="min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-8 text-slate-200">
        <div class="lg:col-span-2 space-y-6">
          <button
            type="button"
            routerLink="/feed"
            class="inline-flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-blue-400 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              class="w-3.5 h-3.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            <span>Back to Activity Feed</span>
          </button>

          @if (mainArticle(); as article) {
            <article
              class="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/20 p-6 sm:p-8 shadow-xl"
            >
              <div class="space-y-3">
                <div
                  class="flex items-center gap-2 text-[11px] font-mono text-blue-400 font-bold uppercase tracking-wider"
                >
                  <span>Published Content</span>
                  <span class="text-slate-700">•</span>
                  <span class="text-slate-500 font-medium lowercase"
                    >{{ article.readingTime }} min read</span
                  >
                </div>

                <h1
                  class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight"
                >
                  {{ article.title }}
                </h1>

                <p class="text-[11px] font-mono text-slate-500">
                  Timestamp Identity Node: {{ article.createdAt | date: 'medium' }}
                </p>
              </div>

              <div class="w-full h-px bg-slate-800/60"></div>

              <div class="text-sm text-slate-300 leading-relaxed space-y-4 font-normal">
                <p
                  class="text-base text-slate-200 font-medium bg-slate-950/40 p-4 rounded-xl border border-slate-900 italic"
                >
                  "{{ article.description }}"
                </p>
                <div class="whitespace-pre-line pt-2 text-slate-300 space-y-4">
                  {{ article.bodyContent }}
                </div>
              </div>

              <div class="flex items-center justify-between pt-6 border-t border-slate-800/40 mt-8">
                <button
                  type="button"
                  (click)="onLikeToggle()"
                  [class]="
                    article.isLiked
                      ? 'inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono transition-all'
                      : 'inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-500 hover:text-slate-300 text-xs font-mono transition-all'
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    [attr.fill]="article.isLiked ? 'currentColor' : 'none'"
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
                  <span>{{ article.likes }}</span>
                </button>

                <span class="text-[10px] text-slate-600 font-mono">ID: {{ article.id }}</span>
              </div>
            </article>
          } @else {
            <div
              class="h-64 flex items-center justify-center rounded-2xl border border-slate-800 border-dashed text-slate-500 text-sm"
            >
              Fetching full article dataset chunk matrix...
            </div>
          }
        </div>

        <div class="space-y-6 lg:border-l lg:border-slate-800/80 lg:pl-6">
          @if (authorProfile(); as author) {
            <div
              class="rounded-2xl border border-slate-800 bg-slate-900/30 p-5 space-y-4 shadow-md relative overflow-hidden"
            >
              <div
                class="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-blue-500/5 blur-xl pointer-events-none"
              ></div>

              <div class="flex items-center gap-3">
                <app-dev-app-img-profile
                  img_size="md"
                  [user_name]="author.name"
                  [user_image]="author.avatarUrl"
                >
                </app-dev-app-img-profile>

                <div class="min-w-0">
                  <h3 class="text-sm font-bold text-white tracking-tight">{{ author.name }}</h3>
                  <p class="text-[11px] font-mono text-blue-400">&#64;{{ author.username }}</p>
                </div>
              </div>

              <p class="text-xs text-slate-400 leading-relaxed">
                {{ author.bio }}
              </p>

              <div class="space-y-2 pt-2 border-t border-slate-800/40">
                <h4 class="text-[10px] font-bold tracking-wider uppercase text-slate-500">
                  Core Engine Stack
                </h4>
                <div class="flex flex-wrap gap-1">
                  @for (skill of author.skills; track skill) {
                    <span
                      class="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400 font-mono"
                    >
                      {{ skill }}
                    </span>
                  }
                </div>
              </div>
            </div>

            <div class="space-y-3">
              <div class="space-y-1">
                <h4 class="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                  More From {{ author.name }}
                </h4>
                <p class="text-[11px] text-slate-600">
                  Suggested alternative reference documentation nodes.
                </p>
              </div>

              <div class="space-y-2.5">
                @for (suggestion of otherArticlesSuggestions(); track suggestion.id) {
                  <div
                    [routerLink]="['/article', suggestion.id]"
                    class="group block rounded-xl border border-slate-800/80 bg-slate-950/40 p-3.5 hover:bg-slate-900/40 hover:border-slate-700/60 transition-all duration-200 cursor-pointer"
                  >
                    <div class="space-y-1.5">
                      <h5
                        class="text-xs font-bold text-slate-300 group-hover:text-blue-400 transition-colors line-clamp-1"
                      >
                        {{ suggestion.title }}
                      </h5>
                      <div
                        class="flex items-center justify-between text-[10px] text-slate-500 font-mono"
                      >
                        <span>{{ suggestion.createdAt | date: 'mediumDate' }}</span>
                        <span>{{ suggestion.likes }} likes</span>
                      </div>
                    </div>
                  </div>
                } @empty {
                  <p class="text-xs text-slate-600 italic pl-1">
                    No alternative posts logged for this author context yet.
                  </p>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </app-dashboard>
  `,
})
export class ArticleDetailsPage implements OnInit {
  private route = inject(ActivatedRoute);

  // Active highlighted identifier track handle
  readonly currentArticleId = signal<string | null>(null);

  // Global static datasets simulation models
  readonly authorsDb = signal<DetailedAuthor[]>([
    {
      id: 'usr-01',
      name: 'Franck Amani',
      username: 'franck_dev',
      avatarUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      bio: 'Full-Stack Software Engineer. Oversees custom cloud platforms, hardware automations, and educational infrastructure pipelines.',
      skills: [
        'Angular',
        'NestJS',
        'TypeScript',
        'Prisma',
        'Supabase',
        'TailwindCSS',
        'Johnny-Five',
        'SerialPort',
      ],
    },
  ]);

  readonly articlesDb = signal<FullArticleNode[]>([
    {
      id: 'art-201',
      authorId: 'usr-01',
      title: 'Synchronizing Real-Time Datastores with NestJS & Supabase',
      description:
        'Reviewing active channel subscription hooks, real-time message broadcasting structures, and relational row security assertions.',
      bodyContent: `Real-time application development requires robust event emission channels that stay clean under heavy compute stress.\n\nBy matching NestJS microservice controllers with a Supabase PostgreSQL replication stream, you can establish secure real-time listener nodes instantly. This tutorial highlights building persistent database hooks using custom channel parameter maps without overloading threads.\n\nNext, ensure your Row Level Security (RLS) conditions are compiled to authenticate data blocks prior to client broadcast delivery.`,
      createdAt: new Date('2026-06-07T10:15:00Z'),
      likes: 42,
      readingTime: 5,
      isLiked: true,
    },
    {
      id: 'art-202',
      authorId: 'usr-01',
      title: 'Automating SerialPort Connections in Background Processes',
      description:
        'How to manage local hardware elements using standard runtime libraries straight from an active multi-device application stream loop.',
      bodyContent: `Physical computing elements present interesting architectural patterns when run alongside central web containers.\n\nUsing Johnny-Five loops and USB serial interfaces inside background daemons allows you to safely process digital pin fluctuations. This deep dive maps out event processing setups designed to pass streaming controller inputs back to connected dashboard frontends using low-latency messaging pathways.`,
      createdAt: new Date('2026-06-03T14:20:00Z'),
      likes: 18,
      readingTime: 8,
      isLiked: false,
    },
    {
      id: 'art-204',
      authorId: 'usr-01',
      title: 'Designing Tailwind Layout Grids for Modern Dark-Mode SaaS Templates',
      description:
        'A deep design review mapping structural grid spacing parameters and avoiding parsing exceptions in compiled templates.',
      bodyContent:
        `Premium dark-mode experiences depend heavily on strict opacity tuning and high-contrast text sizing scales.\n\nWhen formatting your HTML layout markup, organize structural grid columns (` +
        '`grid-cols-1 md:grid-cols-3` ' +
        `) using explicitly isolated properties. This architectural strategy blocks compilation loops, keeping your frontends lightweight and predictable.`,
      createdAt: new Date('2026-05-20T09:11:00Z'),
      likes: 64,
      readingTime: 4,
      isLiked: false,
    },
  ]);

  // COMPUTED ENGINE: Identifies and fetches the primary targeted clicked article data matrix
  readonly mainArticle = computed(() => {
    const id = this.currentArticleId();
    return this.articlesDb().find((art) => art.id === id) || null;
  });

  // COMPUTED ENGINE: Automatically resolves the matching author model object block
  readonly authorProfile = computed(() => {
    const article = this.mainArticle();
    if (!article) return null;
    return this.authorsDb().find((auth) => auth.id === article.authorId) || null;
  });

  // COMPUTED ENGINE: Filters out the main active article, grouping all other entries as sidebar suggestions
  readonly otherArticlesSuggestions = computed(() => {
    const article = this.mainArticle();
    if (!article) return [];
    return this.articlesDb()
      .filter((art) => art.authorId === article.authorId && art.id !== article.id)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  });

  ngOnInit(): void {
    // Watch parameter updates reactively when the user transitions between suggestion nodes
    this.route.paramMap.subscribe((params) => {
      this.currentArticleId.set(params.get('id'));
    });
  }

  onLikeToggle(): void {
    const id = this.currentArticleId();
    this.articlesDb.update((currentArticles) =>
      currentArticles.map((art) => {
        if (art.id === id) {
          return {
            ...art,
            likes: art.isLiked ? art.likes - 1 : art.likes + 1,
            isLiked: !art.isLiked,
          };
        }
        return art;
      }),
    );
  }
}
