import { Component } from '@angular/core';

import { TitleDashboardService } from './../title-dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [TitleDashboardService]
})
export class DashboardComponent {

  title: string;

  constructor(
    private titleDashboardService: TitleDashboardService
  ) {
    this.title = '';
    titleDashboardService.pageTitle.subscribe( title => this.title = title );
  }

  logout(){
    console.log('SAIR');
  }

}
