import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { HttpService } from 'src/app/shared/http.service';
import { Observable,  } from 'rxjs';

export interface PeriodicElement {
  name: string;
  position: number;
  constituencies: number;
  villages: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Botha-Bothe', constituencies: 15, villages: '600' },
  { position: 2, name: 'Berea', constituencies: 43, villages: '432' },
  { position: 3, name: 'Leribe', constituencies: 60, villages: '689' },
  { position: 4, name: 'Thaba-Tseka', constituencies: 19, villages: '97' },
  { position: 5, name: 'Maseru', constituencies: 74, villages: '953' },
  { position: 6, name: 'Mafeteng', constituencies: 120, villages: '731' },
  { position: 7, name: 'Mokhotlong', constituencies: 14, villages: '538' },
  { position: 8, name: 'Mohale s Hoek', constituencies: 25, villages: '79' },
  { position: 9, name: 'Qacha s Neck', constituencies: 18, villages: '127' },
  { position: 10, name: 'Quthing', constituencies: 20, villages: '83' },
  { position: 11, name: 'Republic of South Africa', constituencies: 2, villages: '1' },
  { position: 12, name: 'Botswana', constituencies: 3, villages: '3' },
  { position: 13, name: 'Eswatini', constituencies: 1, villages: '1' },
  { position: 14, name: 'Zimbawe', constituencies: 1, villages: '3' },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  totalCandidatesInDevision: number = 0;
  totalCandidates: number;
  totalUsers: number;
  totalPollingStations: number

  pollingDivisions: any[] = [];
  totalCandidatesInPollingDevision: number = 0;
  
  bigChart = [];
  cards = [];
  pieChart = [];

  displayedColumns: string[] = ['position', 'name', 'constituencies', 'villages'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private dashboardService: DashboardService, public httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getAllData('polling_divisions').subscribe(totalPollingStations => {
      this.totalPollingStations = totalPollingStations;
        console.log(`Total number of polling stations: ${this.totalPollingStations}`);
      });
      this.httpService.getAllData('Users').subscribe(totalUsers => {
        this.totalUsers = totalUsers;
          console.log(`Total number of polling stations: ${this.totalUsers}`);
        });

      this.httpService.getAllData('polling_divisions').subscribe(totalCandidates => {
        this.totalCandidates = totalCandidates;
          console.log(`Total number of polling stations: ${this.totalCandidates}`);
        });

        
        this.dashboardService.getPollingDivisions().subscribe((data: any) => {
          this.pollingDivisions = Object.keys(data).map(key => ({
            name: data[key].name,
            candidatesCount: Object.keys(data[key].candidates).length
          }));
        });
        this.dashboardService.getTotalCandidatesCount().subscribe(count => {
          this.totalCandidatesInPollingDevision = count;

        });
      
        

       

    this.bigChart = this.dashboardService.bigChart();
    this.cards = this.dashboardService.cards();
    this.pieChart = this.dashboardService.pieChart();

    this.dataSource.paginator = this.paginator;
    
    console.log(this.totalPollingStations);
  }
  

}
