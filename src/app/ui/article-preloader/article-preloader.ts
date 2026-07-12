import { Component } from '@angular/core';

@Component({
  selector: 'app-article-preloader',
  imports: [],
  template: `
 <article
  class="animate-pulse flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/40 p-5 shadow-sm"
>
  <div>
    <!-- Header Section (Author info & read time) -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <!-- Profile Image Avatar Placeholder -->
        <div class="h-8 w-8 rounded-full bg-slate-800"></div>

        <!-- Name & Date Placeholder -->
        <div class="flex flex-col gap-1.5">
          <div class="h-3 w-24 rounded bg-slate-800"></div>
          <div class="h-2 w-16 rounded bg-slate-800/60"></div>
        </div>
      </div>

      <!-- Read Time Badge Placeholder -->
      <div class="h-5 w-12 rounded-md bg-slate-800/60"></div>
    </div>

    <!-- Content Section (Title & Body) -->
    <div class="space-y-3">
      <!-- Title Placeholder (2 lines) -->
      <div class="space-y-2">
        <div class="h-5 w-3/4 rounded bg-slate-800"></div>
        <div class="h-5 w-1/2 rounded bg-slate-800"></div>
      </div>
      
      <!-- Content Paragraph Placeholder (3 lines) -->
      <div class="space-y-2 pt-1">
        <div class="h-3.5 w-full rounded bg-slate-800/60"></div>
        <div class="h-3.5 w-full rounded bg-slate-800/60"></div>
        <div class="h-3.5 w-2/3 rounded bg-slate-800/60"></div>
      </div>
    </div>
  </div>

  <!-- Footer Section (Tags & Buttons) -->
  <div
    class="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/60"
  >
    <!-- Tags Placeholder -->
    <div class="flex flex-wrap gap-1.5">
      <div class="h-6 w-14 rounded-lg bg-slate-950 border border-slate-800/80"></div>
      <div class="h-6 w-16 rounded-lg bg-slate-950 border border-slate-800/80"></div>
      <div class="h-6 w-12 rounded-lg bg-slate-950 border border-slate-800/80"></div>
    </div>

    <!-- Action Buttons Placeholder -->
    <div class="flex items-center gap-1">
      <div class="h-9 w-9 rounded-xl border border-slate-800 bg-slate-900/20"></div>
      <div class="h-9 w-9 rounded-xl border border-slate-800 bg-slate-900/20"></div>
    </div>
  </div>
</article>
  `
})
export class ArticlePreloader { }
