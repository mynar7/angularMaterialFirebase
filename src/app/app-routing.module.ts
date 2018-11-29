import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { ModeratorComponent } from './components/moderator/moderator.component';
import { DocumentUploadComponent } from './components/document-upload/document-upload.component';
import { DocumentValidateComponent } from './components/document-validate/document-validate.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'moderator', component: ModeratorComponent },
  { path: 'upload', component: DocumentUploadComponent },
  { path: 'validate', component: DocumentValidateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
