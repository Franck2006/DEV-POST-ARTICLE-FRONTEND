import { Component, signal } from '@angular/core';
import { DevAppBtn } from '../../ui/dev-app-btn/dev-app-btn';
import { Dashboard } from '../../shared/dashboard/dashboard';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

export interface DraftItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  updatedAt: string | Date;
}

@Component({
  selector: 'app-my-dafts',
  imports: [DevAppBtn, Dashboard, RouterLink, DatePipe],
  template: `
    <app-dashboard>
      <div class="space-y-8 text-slate-200">
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800/60 pb-6"
        >
          <div class="space-y-1">
            <h1 class="text-2xl font-extrabold text-white tracking-tight">Saved Drafts</h1>
            <p class="text-sm text-slate-400">
              Pick up right where you left off. Your work autosaves locally.
            </p>
          </div>

          <span
            class="self-start sm:self-center text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20"
          >
            {{ draftsList().length }} Work in Progress
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          @for (draft of draftsList(); track draft.id) {
            <div
              class="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/40 p-5 hover:bg-slate-900/80 hover:border-slate-700/60 transition-all duration-300 shadow-sm"
            >
              <div class="space-y-3">
                <div class="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Saved {{ draft.updatedAt | date: 'medium' }}</span>
                  <span
                    class="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 uppercase text-[10px] tracking-wider text-slate-400"
                  >
                    {{ draft.tags[0] || 'Uncategorized' }}
                  </span>
                </div>

                <div class="space-y-1.5">
                  <h3
                    class="text-base font-bold text-slate-200 group-hover:text-blue-400 transition-colors duration-200 line-clamp-1"
                  >
                    {{ draft.title || 'Untitled Draft Asset' }}
                  </h3>
                  <p class="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {{
                      draft.description ||
                        'No summary configured yet. Click edit to begin formatting your article data parameters...'
                    }}
                  </p>
                </div>

                @if (draft.tags.length > 0) {
                  <div class="flex flex-wrap gap-1 pt-1">
                    @for (tag of draft.tags; track tag) {
                      <span
                        class="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-950 border border-slate-900 text-slate-500"
                      >
                        #{{ tag }}
                      </span>
                    }
                  </div>
                }
              </div>

              <div
                class="flex items-center justify-end gap-2.5 mt-6 pt-4 border-t border-slate-800/40"
              >
                <button
                  type="button"
                  (click)="onDeleteDraft(draft.id)"
                  class="p-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all"
                  title="Discard draft"
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
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>

                <app-dev-app-btn variant="ghost" size="sm" [routerLink]="['/edit-post', draft.id]">
                  <span>Resume Writing</span>
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
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                </app-dev-app-btn>
              </div>
            </div>
          } @empty {
            <div
              class="col-span-full rounded-2xl border border-slate-800 border-dashed p-12 text-center text-slate-500 text-sm space-y-3"
            >
              <p>No offline draft sessions active right now.</p>
              <div class="flex justify-center">
                <app-dev-app-btn variant="primary" size="sm" routerLink="/create-post">
                  <span>Start Writing</span>
                </app-dev-app-btn>
              </div>
            </div>
          }
        </div>
      </div>
    </app-dashboard>
  `,
})
export class MyDafts {
  // Local reactive array stream handling active mock drafts data states
  readonly draftsList = signal<DraftItem[]>([
    {
      id: 'drf-001',
      title: 'Optimizing Supabase Image Storage Streams for Mobile Apps',
      description:
        'An unreleased deep dive into handling high-throughput base64 mutations directly using Supabase object buckets inside background tasks.',
      tags: ['supabase', 'backend'],
      updatedAt: new Date('2026-06-07T14:22:00Z'),
    },
    {
      id: 'drf-002',
      title: '', // Testing template empty fallback text layout states
      description: '',
      tags: [],
      updatedAt: new Date('2026-05-28T09:12:15Z'),
    },
    {
      id: 'drf-003',
      title: 'Building a Custom SerialPort Automation Dashboard with NestJS',
      description:
        'Drafting out the hardware configuration interface parameters required to pass commands to local USB microcontrollers straight from a standard web interface node loop.',
      tags: ['nestjs', 'hardware'],
      updatedAt: new Date('2026-06-03T18:45:00Z'),
    },
  ]);

  onDeleteDraft(id: string): void {
    // Optimistically update local array list state parameters
    this.draftsList.update((currentDrafts) => currentDrafts.filter((d) => d.id !== id));
    console.log('Draft target node wiped from internal state storage context for id:', id);
  }
}
