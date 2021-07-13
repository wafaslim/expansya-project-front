import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImportFileService } from '../services/import-file.service';
import { MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.scss']
})
export class MatchingComponent implements OnInit {
  response: any;
  validation: FormGroup;
  filename: any;
  constructor(private snackBar: MatSnackBar, private uploadService: ImportFileService) { }
  ngOnInit(): void {
    this.response = this.uploadService.getresponse();
    this.validation = new FormGroup({
      matchedHeader: new FormArray([]),
      notmatchedHeader: new FormArray([])
    });
    this.remplirFormArray();
  }

  get matchedHeader(): FormArray
  {
    return this.validation.get('matchedHeader') as FormArray;
  }
  get notmatchedHeader(): FormArray
  {
    return this.validation.get('notmatchedHeader') as FormArray;
  }

  remplirFormArray(){
    this.filename = this.response.fichierUp._id;
    for (let i = 0; i < this.response?.matching.length; i++) {
      this.matchedHeader.push(new FormGroup({
        key: new FormControl(this.response?.matching[i]),
        value:new FormControl(this.response?.matching[i])
      }))
    }
    for (let j = 0; j < this.response?.similarkeys.length; j++) {
      this.notmatchedHeader.push(new FormGroup({
        key: new FormControl(this.response?.similarkeys[j].key),
        value: new FormControl('', Validators.required)
      }))
    }
    console.log(this.validation.value);
  }

  onSubmit() {
    if(this.validation.invalid)
    {
      return;
    }else{
      this.uploadService.saveData(this.filename, this.validation.value).subscribe(res=>{ 
          this.snackBar.open('fichier ajouté avec succes','×',{panelClass: 'success', verticalPosition: 'top', duration: 3000});
        },
        err=>{ 
          console.log(err);
        });
    }
  }
}
