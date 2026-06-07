import { Component, signal } from '@angular/core';
import { DevAppImgProfile } from '../dev-app-img-profile/dev-app-img-profile';

@Component({
  selector: 'app-dev-app-card',
  imports: [DevAppImgProfile],
  template: `
    <div>
      <app-dev-app-img-profile />
      <div></div>
    </div>
  `,
})
export class DevAppCard {
  img = signal<string>('');
  user_name = signal<string>('');
  // readonly
}
