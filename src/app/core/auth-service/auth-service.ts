import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../env/envirmennt';
import { tap } from 'rxjs';
import { ModelInter } from '../../model/model.interface';

const USERKEY = 'user'
const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly user = signal<ModelInter.User | null>(null)
  private readonly access_token = signal<string | null>(null)
  private readonly refresh_token = signal<string | null>(null)
  private readonly http = inject(HttpClient)

  signUp(user: ModelInter.SignUpUser) {
    return this.http.post(environment.LOCAL_BACKEND_URL + '/auth/signup', user)
      .pipe(
        tap((response: any) => {

          console.log('SignUp response:', response)

          this.user.set(response.user)
          this.access_token.set(response.access_token)
          this.refresh_token.set(response.refresh_token)

          this.storeUserData(response.user)
          this.storeAccessToken(response.access_token)
          this.storeRefreshToken(response.refresh_token)

        })
      )
  }

  signIn(user: ModelInter.SignInUser) {
    return this.http.post(environment.LOCAL_BACKEND_URL + '/auth/signin', user)
      .pipe(
        tap((response: any) => {
          this.user.set(response.user)
          this.access_token.set(response.access_token)
          this.refresh_token.set(response.refresh_token)

          this.storeUserData(response.user)
          this.storeAccessToken(response.access_token)
          this.storeRefreshToken(response.refresh_token)
        })
      )
  }

  signOut() {
    this.user.set(null)
    this.access_token.set(null)
    this.refresh_token.set(null)

    localStorage.removeItem(USERKEY)
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  }

  storeUserData(user: any) {
    localStorage.setItem(USERKEY, JSON.stringify(user))
  }

  storeAccessToken(access_token: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, access_token)
  }

  storeRefreshToken(refresh_token: string) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token)
  }

  getUserData() {
    return JSON.parse(localStorage.getItem(USERKEY) || '{}') as ModelInter.User | null;
  }

  getAccessTokenData() {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
  }

  getRefreshTokenData() {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
  }

}
