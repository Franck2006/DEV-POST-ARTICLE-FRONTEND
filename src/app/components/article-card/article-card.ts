import { Component, input, output, WritableSignal } from '@angular/core';
import { DevAppImgProfile } from '../../ui/dev-app-img-profile/dev-app-img-profile';
import { DatePipe, I18nPluralPipe, NgIf } from '@angular/common';
import { ModelInter } from '../../model/model.interface';

export interface ArticleItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  createdAt: string | Date;
  readingTime?: string;
  isLiked?: boolean;
  isArchived?: boolean;
  author: {
    name: string;
    avatarUrl: string;
  };
}

@Component({
  selector: 'app-article-card',
  imports: [DevAppImgProfile, DatePipe, NgIf],
  template: `
    <article
      class="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/40 p-5 hover:bg-slate-900/80 hover:border-slate-700/60 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-blue-600/[0.02]"
    >
      <div>
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <app-dev-app-img-profile
              img_size="sm"
              [user_name]="article().author?.name"
              [user_lastname]="article().author?.lastname"
              [user_image]="article().author?.avatarUrl"
              [user_full_email]= "article().author?.email"
            >
            </app-dev-app-img-profile>

            <div class="flex flex-col">
              <span
                class="text-xs font-semibold text-slate-300 hover:text-blue-400 cursor-pointer transition-colors"
              >
                @if (article().author?.name && article().author?.lastname) {
                  {{ article().author?.name }}    {{ article().author?.lastname }}
                }@else {
                    {{ article().author?.email }}  
                }
              </span>
              <span class="text-[10px] text-slate-500">
                {{ article().createdAt | date: 'mediumDate' }}
              </span>
            </div>
          </div>

          <span
            class="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-800/60 text-slate-400"
          >
            {{  '5 min' }} read
          </span>
        </div>

        <div class="space-y-2 cursor-pointer">
          <h3
            class="text-lg font-bold text-slate-100 group-hover:text-blue-400 line-clamp-2 transition-colors duration-200"
          >
            {{ article().title }}
          </h3>
          <p class="text-sm text-slate-400 line-clamp-3 leading-relaxed">
            {{ article().content }}
          </p>
        </div>
      </div>

      <div
        class="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/60"
      >
        <div class="flex flex-wrap gap-1.5">
          @for (tag of article().tags; track tag) {
            <span
              class="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-blue-500/30 cursor-pointer transition-all"
            >
              #{{ tag }}
            </span>
          }
        </div>

        <div class="flex items-center gap-1">
          <button
            (click)="onLikeToggle($event)"
            [class]="
              true
                ? 'flex h-9 w-9 items-center justify-center rounded-xl border border-rose-500/20 text-rose-500 bg-rose-500/5 transition-all active:scale-90'
                : 'flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-500/5 hover:border-rose-500/20 transition-all active:scale-90'
            "
            title="Like article"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              [attr.fill]="false ? 'currentColor' : 'none'"
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
          </button>

          <button
            (click)="onArchiveToggle($event)"
            [class]="
              false
                ? 'flex h-9 w-9 items-center justify-center rounded-xl border border-amber-500/20 text-amber-500 bg-amber-500/5 transition-all active:scale-90'
                : 'flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 text-slate-400 hover:text-amber-400 hover:bg-amber-500/5 hover:border-amber-500/20 transition-all active:scale-90'
            "
            title="Archive article"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              [attr.fill]=" false? 'currentColor' : 'none'"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  `,
})
export class ArticleCard {
  // Reactive input for the complete article payload
  readonly article = input.required<ModelInter.Article>();

  // Outputs to emit IDs back to a service handler for backend updates
  readonly likeChanged = output<string>();
  readonly archiveChanged = output<string>();

  onLikeToggle(event: Event): void {
    event.stopPropagation(); // Prevents clicking the button from trigger-navigating to the article detail view
    // this.likeChanged.emit(this.article().id);
  }

  onArchiveToggle(event: Event): void {
    event.stopPropagation();
    // this.archiveChanged.emit(this.article().id);
  }
}
