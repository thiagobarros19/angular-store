import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleDashboardService {

  private pageTitleSource = new Subject<string>();

  pageTitle = this.pageTitleSource.asObservable();

  setPageTitle(title: string){
    this.pageTitleSource.next(title);
  }
}
