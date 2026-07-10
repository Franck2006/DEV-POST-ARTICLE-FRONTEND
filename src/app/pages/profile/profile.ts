import { Component, input, OnChanges, OnInit, signal } from '@angular/core';
import { Dashboard } from '../../shared/dashboard/dashboard';
import { DevAppBtn } from '../../ui/dev-app-btn/dev-app-btn';
import { DevAppImgProfile } from '../../ui/dev-app-img-profile/dev-app-img-profile';
import { ArticleCard, ArticleItem } from '../../components/article-card/article-card';
import { SAMPLE_PROFILE } from '../../core/data/data.data';
import { ModelInter } from '../../model/model.interface';

export interface UserProfileData {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  bio: string;
  skills: string[];
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
  links: {
    website?: string;
    github?: string;
  };
}

@Component({
  selector: 'app-profile',
  imports: [Dashboard, DevAppBtn, DevAppImgProfile, ArticleCard],
  template: `
    <app-dashboard>
      <div class="min-h-screen space-y-8 text-slate-200">
        <div
          class="relative rounded-2xl border border-slate-800 bg-slate-900/30 p-6 md:p-8 overflow-hidden shadow-xl"
        >
          <div
            class="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-blue-600/10 blur-3xl pointer-events-none"
          ></div>
          <div
            class="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-purple-600/10 blur-3xl pointer-events-none"
          ></div>

          <div
            class="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6 z-10"
          >
            <div
              class="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-5 text-center sm:text-left"
            >
              <app-dev-app-img-profile
                img_size="xl"
                [user_name]="profile()?.name"
                [user_image]="profile()?.avatarUrl"
              >
              </app-dev-app-img-profile>

              <div class="space-y-1">
                <h1 class="text-2xl font-extrabold text-white tracking-tight">
                  {{ profile()?.name }}
                </h1>
                <p class="text-sm font-medium text-blue-400 font-mono">
                  &#64;{{ profile()?.username }}
                </p>
                <p class="text-sm text-slate-400 max-w-md leading-relaxed pt-1">
                  {{ profile()?.bio }}
                </p>
              </div>
            </div>

            <div class="flex sm:justify-end gap-3 shrink-0">
              @if (isCurrentUser()) {
                <app-dev-app-btn variant="secondary" size="md" routerLink="/settings">
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
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.767a1.123 1.123 0 0 0-.417 1.03c.004.074.006.148.006.222 0 .074-.002.148-.006.222a1.123 1.123 0 0 0 .417 1.03l1.003.767a1.125 1.125 0 0 1 .26 1.43l-1.296 2.247a1.125 1.125 0 0 1-1.37.49l-1.216-.456a1.125 1.125 0 0 0-1.075.124c-.073.044-.146.087-.22.128-.332.183-.582.495-.645.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281a1.125 1.125 0 0 0-.646-.87c-.074-.041-.147-.084-.22-.129a1.125 1.125 0 0 0-1.075-.124l-1.217.456a1.125 1.125 0 0 1-1.37-.49l-1.296-2.247a1.125 1.125 0 0 1 .26-1.43l1.002-.767a1.122 1.122 0 0 0 .418-1.03c-.004-.074-.006-.148-.006-.222 0-.074.002-.148.006-.222a1.122 1.122 0 0 0-.418-1.03l-1.002-.767a1.125 1.125 0 0 1-.26-1.43l1.296-2.247a1.125 1.125 0 0 1 1.37-.49l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.646-.869l.213-1.281Z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  <span>Edit Profile</span>
                </app-dev-app-btn>
              } @else {
                <app-dev-app-btn variant="primary" size="md" (click)="toggleFollow()">
                  <span>{{ isFollowing() ? 'Following' : 'Follow User' }}</span>
                </app-dev-app-btn>
              }
            </div>
          </div>

          <div class="flex gap-6 mt-6 pt-6 border-t border-slate-800/60 text-sm">
            <div>
              <span class="font-extrabold text-white">{{ profile()?.stats?.posts }}</span>
              <span class="text-slate-500">Articles</span>
            </div>
            <div>
              <span class="font-extrabold text-white">{{ profile()?.stats?.followers }}</span>
              <span class="text-slate-500">Followers</span>
            </div>
            <div>
              <span class="font-extrabold text-white">{{ profile()?.stats?.following }}</span>
              <span class="text-slate-500">Following</span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div class="space-y-6 lg:sticky lg:top-6">
            <div class="rounded-2xl border border-slate-800 bg-slate-900/20 p-5 space-y-4">
              <h3 class="text-xs font-bold tracking-wider uppercase text-slate-400">
                Core Tech Stack
              </h3>
              <div class="flex flex-wrap gap-1.5">
                @for (tech of profile()?.skills; track tech) {
                  <span
                    class="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300"
                  >
                    {{ tech }}
                  </span>
                }
              </div>
            </div>

            <div class="rounded-2xl border border-slate-800 bg-slate-900/20 p-5 space-y-3">
              <h3 class="text-xs font-bold tracking-wider uppercase text-slate-400">
                Online Footprint
              </h3>

              <div class="space-y-2 text-xs">
                @if (profile()?.links?.website) {
                  <a
                    [href]="profile()?.links?.website"
                    target="_blank"
                    class="flex items-center gap-2.5 text-slate-400 hover:text-blue-400 transition-colors py-1"
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
                        d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.417 0 4.6-.3 6.242-.773M12 21c-2.417 0-4.6-.3-6.242-.773M17.283 14.25c.105-.42.167-.858.167-1.308a7.5 7.5 0 0 0-7.5-7.5 7.5 7.5 0 0 0-7.5 7.5c0 .45.062.888.167 1.308M17.283 14.25c-.243.974-.701 1.861-1.332 2.593m1.499-2.593a8.96 8.96 0 0 0 .167-1.308c0-3.66-2.187-6.812-5.362-8.306m-5.362 8.306a8.96 8.96 0 0 1-.167-1.308c0-3.66 2.187-6.812 5.362-8.306m-5.362 8.306c.243.974.701 1.861 1.332 2.593m0 0a5.959 5.959 0 0 1-1.012-3.899m1.012 3.899c.557.65 1.258 1.151 2.055 1.458"
                      />
                    </svg>
                    <span>Portfolio Hub</span>
                  </a>
                }
                @if (profile()?.links?.github) {
                  <a
                    [href]="'https://github.com/' + profile()?.links?.github"
                    target="_blank"
                    class="flex items-center gap-2.5 text-slate-400 hover:text-blue-400 transition-colors py-1"
                  >
                    <span class="font-mono font-bold text-sm select-none text-slate-500 w-4"
                      >⚡</span
                    >
                    <span>GitHub (&#64;{{ profile()?.links?.github }})</span>
                  </a>
                }
              </div>
            </div>
          </div>

          <div class="lg:col-span-2 space-y-6">
            <div class="flex items-center gap-1 border-b border-slate-800 pb-px">
              <button
                (click)="activeTab.set('articles')"
                [class]="
                  activeTab() === 'articles'
                    ? 'text-sm font-semibold px-4 py-2.5 text-blue-400 border-b-2 border-blue-500 transition-all'
                    : 'text-sm font-medium px-4 py-2.5 text-slate-500 hover:text-slate-300 transition-all'
                "
              >
                Authored Feed
              </button>
              <button
                (click)="activeTab.set('about')"
                [class]="
                  activeTab() === 'about'
                    ? 'text-sm font-semibold px-4 py-2.5 text-blue-400 border-b-2 border-blue-500 transition-all'
                    : 'text-sm font-medium px-4 py-2.5 text-slate-500 hover:text-slate-300 transition-all'
                "
              >
                Core Background
              </button>
            </div>

            @if (activeTab() === 'articles') {
              <div class="space-y-4">
                @for (article of userArticles(); track article.id) {
                  <app-article-card
                    [article]="article"
                    (likeChanged)="onArticleLike($event)"
                    (archiveChanged)="onArticleArchive($event)"
                  ></app-article-card>
                } @empty {
                  <div
                    class="rounded-2xl border border-slate-800 border-dashed p-12 text-center text-slate-500 text-sm"
                  >
                    No articles published on this node profile space yet.
                  </div>
                }
              </div>
            } @else {
              <div
                class="rounded-2xl border border-slate-800 bg-slate-900/10 p-6 space-y-4 text-sm leading-relaxed text-slate-400"
              >
                <h4 class="text-base font-bold text-slate-200">About Section Workspace</h4>
                <p>
                  Welcome to my research and development container cell. I specialize in scaling
                  enterprise web configurations, optimizing change detection signals across complex
                  asynchronous layouts, and managing transactional multi-image storage streaming
                  buffers.
                </p>
              </div>
            }
          </div>
        </div>
      </div>
    </app-dashboard>
  `,
})
export class Profile implements OnInit {
  // Safe modern Input signals accepting external context mapping models
  readonly profile = signal<UserProfileData | null>(null);
  readonly userArticles = input<ModelInter.Article[]>([]);
  readonly isCurrentUser = input<boolean>(false);


  ngOnInit(): void {
    this.profile.set(SAMPLE_PROFILE);
  }
  // private profile = SAMPLE_PROFILE

  // Component Reactive layout management views flags
  readonly activeTab = signal<'articles' | 'about'>('articles');
  readonly isFollowing = signal<boolean>(false);

  toggleFollow(): void {
    this.isFollowing.update((state) => !state);
    // Wire immediately into your platform graph interaction state service layer
  }

  onArticleLike(id: string): void {
    console.log('Profile context intercepted like calculation trigger for id:', id);
  }

  onArticleArchive(id: string): void {
    console.log('Profile context intercepted archive mutation execution for id:', id);
  }
}
