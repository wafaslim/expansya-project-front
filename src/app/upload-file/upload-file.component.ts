import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImportFileService } from '../services/import-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  file:File=null;

  constructor(private uploadService:ImportFileService,private router : Router) { }

  ngOnInit(): void {}

  public changeListener(files: FileList){
    if(files && files.length > 0) {
       this.file = files.item(0); 
      }
  }

  public uploadFile()
  {
    if(this.file !== null){
      // upload to the server 
      const formdata = new FormData();
      formdata.append("fichier",this.file, this.file.name);
      // "fichier" doit etre le meme dans le backend au niveau de la fonction multer
      this.uploadService.ImportFiles(formdata).subscribe(
           res=>{
            this.uploadService.saveresponse(res);
            this.router.navigate(['/matching']) 
            },
           err=>{console.log(err)}
      )
      
      }
  
}

}

