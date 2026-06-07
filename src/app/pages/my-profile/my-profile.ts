import { Component, inject, OnInit, signal } from '@angular/core';
import { Dashboard } from '../../shared/dashboard/dashboard';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DevAppBtn } from '../../ui/dev-app-btn/dev-app-btn';
import { DevAppImgProfile } from '../../ui/dev-app-img-profile/dev-app-img-profile';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  imports: [Dashboard, ReactiveFormsModule, DevAppBtn, DevAppImgProfile, RouterLink],
  template: `
    <app-dashboard>
      <form
        [formGroup]="profileForm"
        (ngSubmit)="onSubmit()"
        class="min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-8 text-slate-200"
      >
        <div class="lg:col-span-2 space-y-6">
          <div class="border-b border-slate-800/60 pb-4">
            <h1 class="text-2xl font-extrabold text-white tracking-tight">Profile Settings</h1>
            <p class="text-sm text-slate-400">
              Manage your public presence, developer bio, and online handles.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-xs font-bold tracking-wider uppercase text-slate-400"
                >Public Name</label
              >
              <input
                type="text"
                formControlName="name"
                placeholder="e.g., Franck Amani"
                class="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all"
              />
              @if (profileForm.get('name')?.touched && profileForm.get('name')?.invalid) {
                <p class="text-xs text-red-400">A public display name is required.</p>
              }
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-bold tracking-wider uppercase text-slate-400"
                >Username Handle</label
              >
              <div class="relative">
                <span class="absolute left-4 top-2.5 text-sm font-mono text-slate-600 select-none"
                  >&#64;</span
                >
                <input
                  type="text"
                  formControlName="username"
                  placeholder="username"
                  class="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-8 pr-4 py-2.5 text-sm font-mono text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all"
                />
              </div>
              @if (profileForm.get('username')?.touched && profileForm.get('username')?.invalid) {
                <p class="text-xs text-red-400">A unique handle is required (min 3 chars).</p>
              }
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-bold tracking-wider uppercase text-slate-400"
              >Avatar Image URL</label
            >
            <input
              type="text"
              formControlName="avatarUrl"
              placeholder="https://images.unsplash.com/..."
              class="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-all"
            />
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-bold tracking-wider uppercase text-slate-400"
              >Short Bio</label
            >
            <textarea
              formControlName="bio"
              placeholder="Tell the developer ecosystem who you are..."
              class="w-full h-28 bg-slate-950/60 border border-slate-800 rounded-xl p-4 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all resize-none leading-relaxed"
            ></textarea>
            <p class="text-[11px] text-slate-500">
              Brief summaries work best for feed profiles. Maximum 200 characters.
            </p>
          </div>

          <div formGroupName="links" class="space-y-4 border-t border-slate-800/60 pt-4">
            <h3 class="text-xs font-bold tracking-wider uppercase text-slate-400">
              Online Footprint
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label class="text-[11px] font-medium text-slate-500">Personal Website</label>
                <input
                  type="text"
                  formControlName="website"
                  placeholder="https://myportfolio.dev"
                  class="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-all"
                />
              </div>

              <div class="space-y-1.5">
                <label class="text-[11px] font-medium text-slate-500">GitHub Username</label>
                <input
                  type="text"
                  formControlName="github"
                  placeholder="github-handle"
                  class="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-all"
                />
              </div>
            </div>
          </div>

          <div class="space-y-2 border-t border-slate-800/60 pt-4">
            <label class="text-xs font-bold tracking-wider uppercase text-slate-400"
              >Core Tech Stack Skills</label
            >
            <input
              #skillInput
              type="text"
              placeholder="e.g., nestjs (Press Enter to stack)"
              (keydown.enter)="addSkill($event, skillInput)"
              class="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-all"
            />

            <div class="flex flex-wrap gap-1.5 pt-1">
              @for (skill of skills(); track skill) {
                <span
                  class="inline-flex items-center gap-1 text-[11px] font-semibold pl-2.5 pr-1.5 py-1 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400"
                >
                  {{ skill }}
                  <button
                    type="button"
                    (click)="removeSkill(skill)"
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
                <p class="text-xs text-slate-600 italic">
                  No technologies mapped to your node yet.
                </p>
              }
            </div>
          </div>
        </div>

        <div class="space-y-6 lg:sticky lg:top-6 lg:border-l lg:border-slate-800/80 lg:pl-6">
          <h3 class="text-xs font-bold tracking-wider uppercase text-slate-500">
            Live Preview Look
          </h3>

          <div
            class="rounded-2xl border border-slate-800 bg-slate-900/30 p-5 space-y-4 shadow-xl relative overflow-hidden"
          >
            <div
              class="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-blue-500/5 blur-xl pointer-events-none"
            ></div>

            <div class="flex items-center gap-4">
              <app-dev-app-img-profile
                img_size="lg"
                [user_name]="profileForm.get('name')?.value || 'New User'"
                [user_image]="profileForm.get('avatarUrl')?.value"
              >
              </app-dev-app-img-profile>

              <div class="min-w-0">
                <h4 class="text-sm font-bold text-white truncate">
                  {{ profileForm.get('name')?.value || 'Anonymous Node' }}
                </h4>
                <p class="text-xs font-mono text-blue-400 truncate">
                  &#64;{{ profileForm.get('username')?.value || 'handle' }}
                </p>
              </div>
            </div>

            <p class="text-xs text-slate-400 leading-relaxed min-h-[2.5rem] line-clamp-3">
              {{
                profileForm.get('bio')?.value ||
                  'Write a biography statement in the fields adjacent to preview this text block configuration matrix...'
              }}
            </p>

            @if (skills().length > 0) {
              <div class="flex flex-wrap gap-1 pt-2 border-t border-slate-800/40">
                @for (skill of skills(); track skill) {
                  <span
                    class="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400"
                  >
                    {{ skill }}
                  </span>
                }
              </div>
            }
          </div>

          <div class="space-y-3 pt-4 border-t border-slate-800/60">
            <app-dev-app-btn
              type="submit"
              variant="primary"
              size="md"
              [disabled]="profileForm.invalid || isSaving()"
              class="w-full"
            >
              <span>{{ isSaving() ? 'Saving Structural Updates...' : 'Save Changes' }}</span>
            </app-dev-app-btn>

            <app-dev-app-btn
              type="button"
              variant="ghost"
              size="md"
              [routerLink]="['/profile', profileForm.get('username')?.value]"
              class="w-full"
            >
              <span>View Public Profile</span>
            </app-dev-app-btn>
          </div>
        </div>
      </form>
    </app-dashboard>
  `,
})
export class MyProfile implements OnInit {
  private fb = inject(FormBuilder);

  // States flags parameters
  readonly isSaving = signal<boolean>(false);
  readonly skills = signal<string[]>([]);

  // Comprehensive profile field configuration schema mapping
  readonly profileForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    avatarUrl: [''],
    bio: ['', [Validators.maxLength(200)]],
    links: this.fb.group({
      website: [''],
      github: [''],
    }),
  });

  ngOnInit(): void {
    this.loadCurrentUserData();
  }

  private loadCurrentUserData(): void {
    // In production, wire this payload execution straight out of your Supabase authentication service state
    const userPayloadMock = {
      name: 'Franck Amani',
      username: 'franck_dev',
      avatarUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      bio: 'Full-Stack Software Engineer specializing in modern reactive micro-frontends and robust asynchronous APIs.',
      skills: ['Angular', 'NestJS', 'TypeScript', 'Supabase'],
      links: {
        website: 'https://emprovesmart.dev',
        github: 'franck-amani',
      },
    };

    // Update the reactive form state nodes cleanly
    this.profileForm.patchValue(userPayloadMock);
    this.skills.set(userPayloadMock.skills);
  }

  addSkill(event: Event, inputEl: HTMLInputElement): void {
    event.preventDefault(); // Blocks unexpected form triggers on keyboard Enter click events
    const rawValue = inputEl.value.trim();

    if (rawValue && !this.skills().includes(rawValue) && this.skills().length < 8) {
      this.skills.update((currentSkills) => [...currentSkills, rawValue]);
      inputEl.value = ''; // Wipes text element state stream cleanly
    }
  }

  removeSkill(skillToRemove: string): void {
    this.skills.update((currentSkills) => currentSkills.filter((s) => s !== skillToRemove));
  }

  onSubmit(): void {
    if (this.profileForm.invalid) return;

    this.isSaving.set(true);

    const consolidatedUpdatePayload = {
      ...this.profileForm.value,
      skills: this.skills(),
    };

    console.log(
      'Update payload package bundled ready for NestJS/Prisma patch mutation:',
      consolidatedUpdatePayload,
    );

    // Simulate database network trip latency
    setTimeout(() => {
      this.isSaving.set(false);
      this.profileForm.markAsPristine();
    }, 1000);
  }
}
