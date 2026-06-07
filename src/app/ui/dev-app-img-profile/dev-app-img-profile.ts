import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-dev-app-img-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col md:flex-row items-center gap-x-3">
      <div [class]="classes()">
        <img [src]="user_image()" [alt]="user_name()" class="w-full h-full object-cover" />
      </div>
      <div>
        <ng-content />
      </div>
    </div>
  `,
})
export class DevAppImgProfile {
  readonly img_size = input<'sm' | 'md' | 'lg' | 'xl'>('sm');
  readonly user_name = input<string | undefined>('');
  readonly user_image = input<string | undefined>('');

  readonly classes = computed(() => {
    const size = this.img_size();

    const common_style =
      'rounded-full border border-slate-800 overflow-hidden shrink-0 shadow-inner';

    // FIXED: Adjusted to standard Tailwind metric values
    const sizes = {
      sm: 'w-9 h-9',
      md: 'w-16 h-16',
      lg: 'w-24 h-24',
      xl: 'w-32 h-32',
    }[size];

    return [sizes, common_style].join(' ');
  });
}
