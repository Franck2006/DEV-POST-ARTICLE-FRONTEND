import { Component, inject, signal, OnInit } from '@angular/core';
import { Dashboard } from '../../shared/dashboard/dashboard';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RealTimeArticlesService } from '../../realtime/artciles/retrieve-realtime-articles.service';
import { DevAppBtn } from "../../ui/dev-app-btn/dev-app-btn";
import { ArticlesService } from '../../services/article-service/article-service.service';
import { ModelInter } from '../../model/model.interface';
import { AuthService } from '../../core/auth-service/auth-service';

@Component({
  selector: 'app-upload-article',
  imports: [Dashboard, ReactiveFormsModule, CommonModule, DevAppBtn],
  template: `
    <app-dashboard>
      <form
        [formGroup]="postForm"
        (ngSubmit)="onSubmit()"
        class="min-h-screen grid grid-cols-1 lg:grid-cols-4 gap-8 text-slate-200"
      >
        <div class="lg:col-span-3 space-y-6">
          <div class="space-y-2">
            <input
              type="text"
              formControlName="title"
              placeholder="An absolute banger of a title..."
              class="w-full bg-transparent border-b border-slate-800 focus:border-blue-500 py-3 text-2xl md:text-3xl font-extrabold text-white placeholder-slate-600 focus:outline-none transition-colors"
            />
            @if (postForm.get('title')?.touched && postForm.get('title')?.invalid) {
              <p class="text-xs text-red-400">A compelling title is required (min 5 characters).</p>
            }
          </div>

          <div class="flex items-center gap-2 border-b border-slate-800/60 pb-2">
            <button
              type="button"
              (click)="previewMode.set(false)"
              [class]="
                !previewMode()
                  ? 'text-xs font-semibold px-3 py-1.5 rounded-lg text-blue-400 bg-blue-600/10 border border-blue-500/20 transition-all'
                  : 'text-xs font-semibold px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 border border-transparent transition-all'
              "
            >
              Write Markdown
            </button>

            <button
              type="button"
              (click)="previewMode.set(true)"
              [class]="
                previewMode()
                  ? 'text-xs font-semibold px-3 py-1.5 rounded-lg text-blue-400 bg-blue-600/10 border border-blue-500/20 transition-all'
                  : 'text-xs font-semibold px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 border border-transparent transition-all'
              "
            >
              Preview Output
            </button>
          </div>

          @if (!previewMode()) {
            <div class="space-y-1">
              <textarea
                formControlName="content"
                placeholder="Write your article core content here using Markdown syntax..."
                class="w-full min-h-[450px] bg-slate-950/40 border border-slate-800 rounded-2xl p-5 text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 resize-y font-mono text-sm leading-relaxed transition-all"
              ></textarea>
              @if (postForm.get('content')?.touched && postForm.get('content')?.invalid) {
                <p class="text-xs text-red-400 mt-1">Don't leave the canvas blank!</p>
              }
            </div>
          } @else {
            <div
              class="w-full min-h-[450px] bg-slate-900/20 border border-slate-800 border-dashed rounded-2xl p-6 overflow-y-auto max-w-none"
            >
              @if (postForm.get('content')?.value) {
                <h1 class="text-xl font-bold text-slate-100 mb-4">
                  {{ postForm.get('title')?.value }}
                </h1>
                <p class="whitespace-pre-wrap text-slate-300 font-sans leading-relaxed">
                  {{ postForm.get('content')?.value }}
                </p>
              } @else {
                <p class="text-sm text-slate-500 italic">Nothing to preview yet.</p>
              }
            </div>
          }
        </div>

        <div class="space-y-6 lg:border-l lg:border-slate-800/80 lg:pl-6">
          <div class="space-y-2">
            <label class="text-xs font-bold tracking-wider uppercase text-slate-400"
              >Short Summary</label
            >
            <textarea
              formControlName="description"
              placeholder="An engaging summary..."
              class="w-full h-24 bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-all resize-none"
            ></textarea>
          </div>

          <div class="space-y-2">
            <label class="text-xs font-bold tracking-wider uppercase text-slate-400"
              >Article Tags</label
            >
            <input
              #tagInput
              type="text"
              placeholder="e.g., angular"
              (keydown.enter)="addTag($event, tagInput)"
              class="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-all"
            />

            <div class="flex flex-wrap gap-1.5 pt-2">
              @for (tag of tags(); track tag) {
                <span
                  class="inline-flex items-center gap-1 text-[11px] font-semibold pl-2.5 pr-1.5 py-1 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400"
                >
                  #{{ tag }}
                  <button
                    type="button"
                    (click)="removeTag(tag)"
                    class="hover:text-red-400 p-0.5 rounded transition-colors"
                  >
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
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </span>
              } @empty {
                <p class="text-[11px] text-slate-600 italic">
                  Press enter inside the box to add tags.
                </p>
              }
            </div>
          </div>

          <div class="w-full h-px bg-slate-800/60 my-2"></div>

          <div class="flex flex-col gap-3 pt-2">
            <app-dev-app-btn
              type="submit"
              variant="primary"
              size="md"
              [disabled]="postForm.invalid"
              class="w-full"
              [isLoading]="isPostFormSubmitted()"
            >
              <span>Publish Article</span>
            </app-dev-app-btn>

            <app-dev-app-btn
              type="button"
              variant="secondary"
              size="md"
              (click)="saveDraft()"
              class="w-full"
            >
              <span>Save Draft</span>
            </app-dev-app-btn>
          </div>
        </div>
      </form>
    </app-dashboard>
  `,
})
export class UploadArticle implements OnInit {
  private formBuilder = inject(FormBuilder);
  private readonly supabase = inject(RealTimeArticlesService);
  private readonly articlesService = inject(ArticlesService);
  private readonly authService = inject(AuthService);

  ngOnInit(): void {
    this.getInitialUserId()
  }

  isPostFormSubmitted = signal<boolean>(false)
  isPostDraftSubmitted = signal<boolean>(false)

  // Layout View Signal management flags
  readonly previewMode = signal<boolean>(false);
  readonly tags = signal<string[]>([]);

  // Form Group Core Definition Architecture
  readonly postForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    content: ['', [Validators.required, Validators.minLength(20)]],
    description: ['', [Validators.required, Validators.maxLength(200)]],
    authorId: ['', Validators.required]
  });

  // { value: '', disabled: true }

  private getInitialUserId() {
    const userId = this.authService.getUserData()?.id;
    this.postForm.get('authorId')?.setValue(userId);
  }

  addTag(event: Event, inputEl: HTMLInputElement): void {
    event.preventDefault(); // Prevents form submission on Enter keypress
    const value = inputEl.value.trim().toLowerCase();

    if (value && !this.tags().includes(value) && this.tags().length < 5) {
      this.tags.update((currentTags) => [...currentTags, value]);
      inputEl.value = ''; // Reset text field stream
    }
  }

  removeTag(tagToRemove: string): void {
    this.tags.update((currentTags) => currentTags.filter((t) => t !== tagToRemove));
  }

  saveDraft(): void {
    const draftPayload = {
      ...this.postForm.value,
      tags: this.tags(),
      status: 'DRAFT',
    };
    console.log('Draft payload configured ready for your NestJS endpoint:', draftPayload);
    // Wire this directly into your local Supabase post service slice
  }


  onSubmit(): void {
    if (this.postForm.invalid) return;
    this.isPostFormSubmitted.set(true)

    const { title, content, authorId, tags }: ModelInter.Article = this.postForm.value

    console.log('Initial authorId set in form:', this.postForm.value);

    this.articlesService.postArticle({ title, content, status: 'PUBLISHED', authorId, tags: this.tags() })
      .subscribe({
        next: (res) => {
          this.isPostFormSubmitted.set(false)
          this.postForm.reset()
          this.tags.set([]) // Clear tags after successful submission
        },
        error: (err) => {
          console.error('Error posting article:', err)
          this.isPostFormSubmitted.set(false)
        }
      })


  }
}
