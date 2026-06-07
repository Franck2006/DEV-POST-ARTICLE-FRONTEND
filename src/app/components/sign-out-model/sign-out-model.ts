import { Component, model, output } from '@angular/core';
import { DevAppBtn } from '../../ui/dev-app-btn/dev-app-btn';

@Component({
  selector: 'app-sign-out-model',
  imports: [DevAppBtn],
  template: `@if (isOpen()) {
    <div
      class="fixed inset-0 z-90 flex items-center justify-center p-4 backdrop-blur-md bg-slate-950/60 animate-fade-in"
    >
      <div
        class="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl space-y-6 relative overflow-hidden transform scale-95 animate-modal-entrance"
      >
        <div
          class="absolute -top-12 -left-12 h-24 w-24 rounded-full bg-red-600/10 blur-xl pointer-events-none"
        ></div>

        <div class="flex flex-col items-center text-center space-y-3">
          <div
            class="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400 border border-red-500/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
          </div>

          <div class="space-y-1.5">
            <h2 class="text-lg font-extrabold text-white tracking-tight">
              Terminate Session Node?
            </h2>
            <p class="text-xs text-slate-400 leading-relaxed max-w-[280px]">
              Are you sure you want to log out? Your unpublished changes in the workspace will be
              saved to your local draft pool.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 pt-2">
          <app-dev-app-btn
            type="button"
            variant="secondary"
            size="md"
            (click)="closeModal()"
            class="w-full"
          >
            <span>Cancel</span>
          </app-dev-app-btn>

          <app-dev-app-btn
            type="button"
            variant="primary"
            size="md"
            (click)="confirmSignout()"
            class="w-full"
          >
            <span class="text-red-400 group-hover:text-red-300">Sign Out</span>
          </app-dev-app-btn>
        </div>
      </div>
    </div>
  }`,
})
export class SignOutModel {
  // Bi-directional modern state connection mapping
  readonly isOpen = model<boolean>(false);

  // Emitters output channels to prompt service actions up the component graph
  readonly onConfirmed = output<void>();

  closeModal(): void {
    this.isOpen.set(false);
  }

  confirmSignout(): void {
    // 1. Notify listeners that logout sequence was requested
    this.onConfirmed.emit();

    // 2. Clear state views locally
    this.closeModal();
  }
}
