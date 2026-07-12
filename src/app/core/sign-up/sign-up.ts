import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DevAppBtn } from '../../ui/dev-app-btn/dev-app-btn';
import { ModelInter } from '../../model/model.interface';
import { AuthService } from '../auth-service/auth-service';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, RouterLink, DevAppBtn],
  template: `
    <div class="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-slate-950 text-slate-200">
      <div
        class="hidden md:flex relative flex-col justify-between p-12 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-r border-slate-900"
      >
        <div
          class="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none"
        ></div>
        <div
          class="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl pointer-events-none"
        ></div>

        <div class="flex items-center gap-3 relative z-10">
          <div
            class="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
              />
            </svg>
          </div>
          <span
            class="text-base font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent"
          >
            DevSpace
          </span>
        </div>

        <div class="relative my-auto space-y-6 max-w-sm z-10">
          <div
            class="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-6 shadow-2xl backdrop-blur-sm space-y-4 transform hover:scale-[1.01] transition-transform duration-300"
          >
            <div class="flex gap-1.5 border-b border-slate-900 pb-3">
              <div class="h-2.5 w-2.5 rounded-full bg-blue-500/40"></div>
              <div class="h-2.5 w-2.5 rounded-full bg-purple-500/40"></div>
              <div class="h-2.5 w-2.5 rounded-full bg-slate-700/40"></div>
            </div>
            <div class="font-mono text-xs space-y-2 text-slate-400">
              <p>
                <span class="text-purple-400">const</span>
                <span class="text-blue-400">registerUser</span> =
                <span class="text-purple-400">async</span> () => &#123;
              </p>
              <p class="pl-4 text-slate-600">// Allocating cloud identity container...</p>
              <p class="pl-4">
                <span class="text-blue-400">const</span> res =
                <span class="text-purple-400">await</span> supabase.auth.<span
                  class="text-amber-400"
                  >signUp</span
                >(&#123;
              </p>
              <p class="pl-8">secure: <span class="text-emerald-400">true</span>,</p>
              <p class="pl-8">scope: <span class="text-emerald-400">"developer:workspace"</span></p>
              <p class="pl-4">&#125;);</p>
              <p>&#125;;</p>
            </div>
          </div>

          <div class="space-y-2">
            <h2 class="text-xl font-extrabold text-white tracking-tight">
              Claim Your Developer Node
            </h2>
            <p class="text-xs text-slate-400 leading-relaxed">
              Set up your cloud profile repository to share architectural write-ups, bookmark
              documentation assets, and review drafts cleanly.
            </p>
          </div>
        </div>

        <div class="text-[11px] text-slate-600 font-mono relative z-10">
          &copy; 2026 DevSpace Node Inc. All data blocks protected.
        </div>
      </div>

      <div class="flex items-center justify-center p-6 sm:p-12 bg-slate-950">
        <div class="w-full max-w-md space-y-8">
          <div class="space-y-2 md:text-left text-center">
            <h1 class="text-2xl font-extrabold text-white tracking-tight sm:text-3xl">
              Create Account
            </h1>
            <p class="text-xs sm:text-sm text-slate-400">
              Provision a new cryptographic signature key to register.
            </p>
          </div>

          <form [formGroup]="signUpForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <div class="space-y-1.5">
              <label class="text-xs font-bold tracking-wider uppercase text-slate-400"
                > Name</label
              >
              <input
                type="text"
                formControlName="name"
                placeholder="Name"
                class="w-full bg-slate-900/40 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all"
              />
              @if (signUpForm.get('name')?.touched && signUpForm.get('name')?.invalid) {
                <p class="text-xs text-red-400">Please declare your display name parameter.</p>
              }
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-bold tracking-wider uppercase text-slate-400"
                >Last Name</label
              >
              <input
                type="text"
                formControlName="lastname"
                placeholder="Last Name"

                class="w-full bg-slate-900/40 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all"
              />
              @if (signUpForm.get('lastname')?.touched && signUpForm.get('lastname')?.invalid) {
                <p class="text-xs text-red-400">Please declare your last name parameter.</p>
              }
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-bold tracking-wider uppercase text-slate-400"
                >Username Handle</label
              >
              <div class="relative">
                <span class="absolute left-4 top-3 text-sm font-mono text-slate-600 select-none"
                  >&#64;</span
                >
                <input
                  type="text"
                  formControlName="username"
                  placeholder="username"
                  class="w-full bg-slate-900/40 border border-slate-800 rounded-xl pl-8 pr-4 py-3 text-sm font-mono text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all"
                />
              </div>
              @if (signUpForm.get('username')?.touched && signUpForm.get('username')?.invalid) {
                <p class="text-xs text-red-400">A valid unique handle is required (min 3 chars).</p>
              }
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-bold tracking-wider uppercase text-slate-400"
                >Email Address</label
              >
              <input
                type="email"
                formControlName="email"
                placeholder="name&#64;domain.com"
                class="w-full bg-slate-900/40 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all"
              />
              @if (signUpForm.get('email')?.touched && signUpForm.get('email')?.invalid) {
                <p class="text-xs text-red-400">Provide a clean email routing string token.</p>
              }
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-bold tracking-wider uppercase text-slate-400"
                >Password Key</label
              >
              <input
                type="password"
                formControlName="password"
                placeholder="••••••••"
                class="w-full bg-slate-900/40 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all"
              />
              @if (signUpForm.get('password')?.touched && signUpForm.get('password')?.invalid) {
                <p class="text-xs text-red-400">Keys must consist of 6 characters or more.</p>
              }
            </div>

            <div class="flex items-center justify-between pt-1">
              <label
                class="relative flex items-center gap-2.5 cursor-pointer select-none text-xs text-slate-500 hover:text-slate-400"
              >
                <input type="checkbox" formControlName="termsConsent" class="peer sr-only" />
                <div
                  class="h-4 w-4 rounded bg-slate-900 border border-slate-800 peer-checked:bg-blue-600 peer-checked:border-blue-500 transition-all flex items-center justify-center text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="3"
                    stroke="currentColor"
                    class="w-2.5 h-2.5 hidden peer-checked:block"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                </div>
                <span>I consent to node storage terms & services</span>
              </label>
            </div>

            <div class="pt-3">
              <app-dev-app-btn
                type="submit"
                variant="primary"
                size="md"
                [disabled]="signUpForm.invalid || isLoading()"
                class="w-full"
              >
                <span>{{ isLoading() ? 'Registering Instance Node...' : 'Create Account' }}</span>
              </app-dev-app-btn>
            </div>
          </form>

          <div class="text-center pt-1">
            <p class="text-xs text-slate-500">
              Already part of the workspace grid?
              <a
                routerLink="/sign-in"
                class="text-blue-400 hover:text-blue-300 font-semibold transition-colors ml-1"
                >Sign In instead</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SignUp {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private readonly authService = inject(AuthService);


  // Structural operation flags
  readonly isLoading = signal<boolean>(false);

  // Form group definition schema mapping fields
  readonly signUpForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    termsConsent: [false, [Validators.requiredTrue]], // Blocks execution unless checked true
  });

  onSubmit(): void {
    if (this.signUpForm.invalid) return;

    this.isLoading.set(true);

    const { email, password, username, name, lastname }: ModelInter.SignUpUser = this.signUpForm.value;

    this.authService.signUp({ email, password, username, name, lastname }).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        this.signUpForm.reset()
        this.router.navigate(['/profile']);

      },
      error: (error) => {
        this.isLoading.set(false);
      },
    });

  }
}
