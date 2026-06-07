import { Routes } from '@angular/router';
import { SignIn } from './core/sign-in/sign-in';
import { HomePage } from './pages/home-page/home-page';
import { UploadArticle } from './pages/upload-article/upload-article';
import { Profile } from './pages/profile/profile';
import { Bookmark } from './pages/bookmark/bookmark';
import { MyDafts } from './pages/my-dafts/my-dafts';
import { MyProfile } from './pages/my-profile/my-profile';
import { SignUp } from './core/sign-up/sign-up';
import { UserArticlesFeed } from './pages/user-articles-feed/user-articles-feed';
import { ArticleDetailsPage } from './pages/article-details-page/article-details-page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
  {
    path: 'sign-in',
    component: SignIn,
  },
  {
    path: 'sign-up',
    component: SignUp,
  },
  {
    path: 'home-page',
    component: HomePage,
    title: 'Home Page',
  },
  {
    path: 'upload-article',
    component: UploadArticle,
    title: 'create a post',
  },
  {
    path: 'profile',
    component: Profile,
    title: 'Profile',
  },
  {
    path: 'bookmark',
    component: Bookmark,
    title: 'bookmarks',
  },
  {
    path: 'my-drafts',
    component: MyDafts,
    title: 'My drafts',
  },
  {
    path: 'my-profile',
    component: MyProfile,
    title: 'My profile',
  },
  {
    path: 'user-articles-feed',
    component: UserArticlesFeed,
    title: 'User post Contents',
  },
  {
    path: 'article/:id',
    component: ArticleDetailsPage,
    // loadComponent: () => import('./pages/article-details-page/article-details-page.component').then(m => m.ArticleDetailsPageComponent),
    title: 'Reading Article | DevSpace',
  },
];
