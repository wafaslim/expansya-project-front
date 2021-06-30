import { HttpClient } from '@angular/common/http';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ImportFileService {
  url = environment.baseURL;
  response: any;

  constructor(private http: HttpClient) { }

  ImportFiles(formdata): Observable<any> {
    return this.http.post<any>(this.url + "/upload/uploadfichier", formdata)
  }

  saveresponse(res: any): void {
    this.response = res;
  }
  getresponse(): any {
    return this.response
  }

}
