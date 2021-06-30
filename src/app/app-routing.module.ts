import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchingComponent } from './matching/matching.component';
import { UploadFileComponent } from './upload-file/upload-file.component';

const routes: Routes = [
   {path:'matching',
     component:MatchingComponent
   },
  { path:'',
     component:UploadFileComponent
    }
    
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export default routes;