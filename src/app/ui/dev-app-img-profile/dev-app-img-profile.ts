import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-dev-app-img-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col md:flex-row items-center gap-x-3">
      <div [class]="classes()">
        @if (user_image()) {
          <img [src]="user_image()" [alt]="user_name()" class="w-full h-full object-cover" />
        }@else {
          <div class="h-full w-full flex items-center justify-center">
            @if (user_name() && user_lastname()) {
              <span class="uppercase">
                {{user_name()?.charAt(0)}}
              </span>
              <span class="uppercase">
                {{user_lastname()?.charAt(0)}}
              </span>
            }
            @else {
              <span class="uppercase">
                {{user_full_email()?.charAt(0)}}
              </span>
            }
          </div>
        }
    
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
  readonly user_lastname = input<string | undefined>('');
  readonly user_full_email = input<string | undefined>('');


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
