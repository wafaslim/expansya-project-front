import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImportFileService } from '../services/import-file.service';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.scss']
})
export class MatchingComponent implements OnInit {
  response: any;
  validation: FormGroup;
  constructor(private uploadService: ImportFileService) { }
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
    for (let i = 0; i < this.response?.matching.length; i++) {
      this.matchedHeader.push(new FormGroup({
        key: new FormControl({value: this.response?.matching[i], disabled: true}),
        value:new FormControl({value:this.response?.matching[i],disabled:true})
      }))
    }
    for (let j = 0; j < this.response?.similarkeys.length; j++) {
      this.notmatchedHeader.push(new FormGroup({
        key: new FormControl({value:this.response?.similarkeys[j].key,disabled:true}),
        value: new FormControl('', Validators.required)
      }))
    }
  }

  onSubmit() {
    console.log(this.validation.value);
  }
}
