import { HomeComponent } from './home/home.component';
import { PostListComponent } from './post-list/post-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '',
  component: HomeComponent,
  },
  {
    path: 'posts',
    component: PostListComponent,
  },
  // {
  //   path: 'privacy-policy',
  //   loadChildren: () => import('./legal/legal.module').then(m => m.LegalModule),
  // },
  // {
  //   path: 'terms-condition',
  //   loadChildren: () => import('./legal/legal.module').then(m => m.LegalModule),
  // },
  // {
  //   path: 'inquiry',
  //   component: JpjMainComponent,
  //   canActivate: [AuthGuardService],
  // },
  // {
  //   path: 'replacement',
  //   component: JpnReplacementMainComponent,
  //   canActivate: [AuthGuardService],
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
