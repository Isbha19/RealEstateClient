import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { ConfirmEmailComponent } from './components/account/confirm-email/confirm-email.component';
import { SendEmailComponent } from './components/account/send-email/send-email.component';
import { ResetPasswordComponent } from './components/account/reset-password/reset-password.component';
import { RegisterWithThirdPartyComponent } from './components/account/register-with-third-party/register-with-third-party.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [{ path: '', component: HomeComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'not-found', component: NotFoundComponent },
      { path: 'confirm-email', component: ConfirmEmailComponent },
      { path: 'send-email/:mode', component: SendEmailComponent },
      { path: 'register/third-party/:provider', component: RegisterWithThirdPartyComponent },

      { path: '**', component: NotFoundComponent },
    ],
  },


];
