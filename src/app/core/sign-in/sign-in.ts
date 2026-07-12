import { Component, inject, signal } from '@angular/core';
import { DevAppImgProfile } from '../../ui/dev-app-img-profile/dev-app-img-profile';
import { DevAppBtn } from '../../ui/dev-app-btn/dev-app-btn';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth-service/auth-service';
import { ModelInter } from '../../model/model.interface';

@Component({
  selector: 'app-sign-in',
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
              <div class="h-2.5 w-2.5 rounded-full bg-red-500/40"></div>
              <div class="h-2.5 w-2.5 rounded-full bg-amber-500/40"></div>
              <div class="h-2.5 w-2.5 rounded-full bg-green-500/40"></div>
            </div>
            <div class="font-mono text-xs space-y-2 text-slate-400">
              <p>
                <span class="text-purple-400">import</span> &#123;
                <span class="text-blue-400">Hub</span> &#125;
                <span class="text-purple-400">from</span>
                <span class="text-emerald-400">"&#64;devspace/core"</span>;
              </p>
              <p class="text-slate-600">// Establishing secure network link...</p>
              <p>
                <span class="text-blue-400">const</span>
                <span class="text-amber-400">session</span> =
                <span class="text-purple-400">new</span>
                <span class="text-blue-400">Hub</span>(&#123;
              </p>
              <p class="pl-4">node: <span class="text-emerald-400">"Goma_Center_01"</span>,</p>
              <p class="pl-4">status: <span class="text-emerald-400">"CONNECTED"</span></p>
              <p>&#125;);</p>
            </div>
          </div>

          <div class="space-y-2">
            <h2 class="text-xl font-extrabold text-white tracking-tight">
              Expand Your Engineering Horizons
            </h2>
            <p class="text-xs text-slate-400 leading-relaxed">
              Join an elite circle of developers tracking system architectures, language modules,
              and dynamic physical automations.
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
              Welcome Back
            </h1>
            <p class="text-xs sm:text-sm text-slate-400">
              Initialize your access token to enter your developer workspace.
            </p>
          </div>

          <form [formGroup]="signInForm" (ngSubmit)="onSubmit()" class="space-y-5">
            <div class="space-y-1.5">
              <label class="text-xs font-bold tracking-wider uppercase text-slate-400"
                >Email Address</label
              >
              <div class="relative">
                <input
                  type="email"
                  formControlName="email"
                  placeholder="name&#64;domain.com"
                  class="w-full bg-slate-900/40 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all"
                />
              </div>
              @if (signInForm.get('email')?.touched && signInForm.get('email')?.invalid) {
                <p class="text-xs text-red-400">
                  Please provide a valid structural email routing token.
                </p>
              }
            </div>

            <div class="space-y-1.5">
              <div class="flex justify-between items-center">
                <label class="text-xs font-bold tracking-wider uppercase text-slate-400"
                  >Password</label
                >
                <a
                  routerLink="/forgot-password"
                  class="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >Forgot Key?</a
                >
              </div>
              <div class="relative">
                <input
                  type="password"
                  formControlName="password"
                  placeholder="••••••••"
                  class="w-full bg-slate-900/40 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all"
                />
              </div>
              @if (signInForm.get('password')?.touched && signInForm.get('password')?.invalid) {
                <p class="text-xs text-red-400">
                  Security keys must contain a minimum of 6 string values.
                </p>
              }
            </div>

            <div class="flex items-center justify-between pt-1">
              <label
                class="relative flex items-center gap-2.5 cursor-pointer select-none text-xs text-slate-400 hover:text-slate-300"
              >
                <input type="checkbox" formControlName="rememberMe" class="peer sr-only" />
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
                <span>Remember this device node</span>
              </label>
            </div>

            <div class="pt-2">
              <app-dev-app-btn
                type="submit"
                variant="primary"
                size="md"
                [disabled]="signInForm.invalid || isLoading()"
                class="w-full"
              >
                <span>{{ isLoading() ? 'Verifying Credentials...' : 'Sign In' }}</span>
              </app-dev-app-btn>
            </div>
          </form>

          <div class="text-center pt-2">
            <p class="text-xs text-slate-500">
              New to the network container cell?
              <a
                routerLink="/sign-up"
                class="text-blue-400 hover:text-blue-300 font-semibold transition-colors ml-1"
                >Create an Account</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SignIn {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private readonly authService = inject(AuthService);


  // Operation state indicators
  readonly isLoading = signal<boolean>(false);

  // Authentication configuration group parameters
  readonly signInForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false],
  });

  onSubmit(): void {
    if (this.signInForm.invalid) return;

    const { email, password }: ModelInter.SignInUser = this.signInForm.value;

    this.isLoading.set(true);

    this.authService.signIn({ email, password })
      .subscribe({
        next: (data) => {
          this.isLoading.set(false);
          this.router.navigate(['/upload-article']);
          console.log(data)
        },
        error: (err) => {
          this.isLoading.set(false);
          console.log(err)
        }
      })


  }
}
