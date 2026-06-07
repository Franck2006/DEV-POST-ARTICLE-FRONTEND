import { Component, computed, signal } from '@angular/core';
import { Dashboard } from '../../shared/dashboard/dashboard';

export interface BookItem {
  id: string;
  title: string;
  author: string;
  description: string;
  category: 'architecture' | 'frontend' | 'backend';
  pages: number;
  downloadUrl: string;
}

@Component({
  selector: 'app-bookmark',
  imports: [Dashboard],
  template: `
    <app-dashboard>
      <div class="space-y-8 text-slate-200">
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800/60 pb-6"
        >
          <div class="space-y-1">
            <h1 class="text-2xl font-extrabold text-white tracking-tight">Engineering Library</h1>
            <p class="text-sm text-slate-400">
              Curated reference manuals, technical documentation, and deep dives.
            </p>
          </div>

          <div class="relative max-w-xs w-full">
            <input
              type="text"
              placeholder="Search engineering manuals..."
              class="w-full bg-slate-950/40 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-all"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-4 h-4 text-slate-600 absolute left-3 top-2.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.603 10.601Z"
              />
            </svg>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            (click)="activeCategory.set('all')"
            [class]="
              activeCategory() === 'all'
                ? 'text-xs font-semibold px-4 py-2 rounded-xl text-blue-400 bg-blue-600/10 border border-blue-500/20 transition-all'
                : 'text-xs font-medium px-4 py-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent transition-all'
            "
          >
            All Resources
          </button>
          <button
            (click)="activeCategory.set('architecture')"
            [class]="
              activeCategory() === 'architecture'
                ? 'text-xs font-semibold px-4 py-2 rounded-xl text-blue-400 bg-blue-600/10 border border-blue-500/20 transition-all'
                : 'text-xs font-medium px-4 py-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent transition-all'
            "
          >
            System Architecture
          </button>
          <button
            (click)="activeCategory.set('frontend')"
            [class]="
              activeCategory() === 'frontend'
                ? 'text-xs font-semibold px-4 py-2 rounded-xl text-blue-400 bg-blue-600/10 border border-blue-500/20 transition-all'
                : 'text-xs font-medium px-4 py-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent transition-all'
            "
          >
            Frontend Ecosystem
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          @for (book of filteredBooks(); track book.id) {
            <div
              class="group relative flex gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-5 hover:bg-slate-900/80 hover:border-slate-700/60 transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              <div
                class="w-24 h-32 shrink-0 rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700/40 flex flex-col justify-between p-2.5 relative overflow-hidden shadow-md group-hover:scale-[1.02] transition-transform duration-300"
              >
                <div
                  class="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity"
                ></div>
                <span
                  class="text-[9px] font-mono font-bold tracking-widest text-slate-500 uppercase"
                  >{{ book.category }}</span
                >
                <div class="h-1.5 w-6 rounded bg-blue-500"></div>
              </div>

              <div class="flex flex-col justify-between flex-1 min-w-0">
                <div class="space-y-1">
                  <h3
                    class="text-sm font-bold text-slate-100 group-hover:text-blue-400 transition-colors truncate"
                  >
                    {{ book.title }}
                  </h3>
                  <p class="text-[11px] text-slate-400 font-medium">By {{ book.author }}</p>
                  <p class="text-xs text-slate-500 line-clamp-2 pt-1 leading-relaxed">
                    {{ book.description }}
                  </p>
                </div>

                <div
                  class="flex items-center justify-between pt-2 border-t border-slate-800/40 mt-2"
                >
                  <span class="text-[10px] text-slate-500 font-mono">{{ book.pages }} pages</span>

                  <a
                    [href]="book.downloadUrl"
                    target="_blank"
                    class="inline-flex items-center gap-1 text-[11px] font-bold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>Read Manual</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2.5"
                      stroke="currentColor"
                      class="w-3 h-3"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          } @empty {
            <div
              class="col-span-full rounded-2xl border border-slate-800 border-dashed p-12 text-center text-slate-500 text-sm"
            >
              No engineering materials cataloged under this workspace filter node yet.
            </div>
          }
        </div>
      </div>
    </app-dashboard>
  `,
})
export class Bookmark {
  // Navigation categories filter pointer state tracking
  readonly activeCategory = signal<'all' | 'architecture' | 'frontend' | 'backend'>('all');

  // Hardcoded engineering library resources dataset pool
  readonly booksCatalog = signal<BookItem[]>([
    {
      id: 'bk-901',
      title: 'Patterns of Enterprise Application Architecture',
      author: 'Martin Fowler',
      description:
        'An absolute handbook guide mapping structural persistence contexts, distributed system schemas, and safe domain models.',
      category: 'architecture',
      pages: 533,
      downloadUrl: '#',
    },
    {
      id: 'bk-902',
      title: 'Mastering Angular Reactivity Hooks',
      author: 'Alex Rivera',
      description:
        'A deep-dive text guide detailing manual signal optimization strategies, zone-free runtime loops, and scalable component graph links.',
      category: 'frontend',
      pages: 284,
      downloadUrl: '#',
    },
    {
      id: 'bk-903',
      title: 'Designing Data-Intensive Applications',
      author: 'Martin Kleppmann',
      description:
        'Explore fundamental architectural data layout parameters, query parsing schemas, transaction guarantees, and sharding systems.',
      category: 'architecture',
      pages: 611,
      downloadUrl: '#',
    },
  ]);

  // Reactive calculation filtering computed engine slice
  readonly filteredBooks = computed(() => {
    const category = this.activeCategory();
    const books = this.booksCatalog();

    if (category === 'all') return books;
    return books.filter((b) => b.category === category);
  });
}
