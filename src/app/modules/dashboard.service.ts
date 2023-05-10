import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

const url = 'https://iec-ls-default-rtdb.firebaseio.com/'

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getPollingDivisions(): Observable<any> {
    return this.http.get(`${url}polling_divisions.json`);
  }

  getCandidatesCount(pollingDivisionId: string): Observable<number> {
    return this.http.get(`${url}polling_divisions/${pollingDivisionId}/candidates.json`)
      .pipe(
        map((candidates: any) => Object.keys(candidates).length)
      );
  }

  getTotalCandidatesCount(): Observable<number> {
    return this.getPollingDivisions().pipe(
      switchMap((pollingDivisions: any) => {
        const pollingDivisionIds = Object.keys(pollingDivisions);
        const candidatesCount$ = pollingDivisionIds.map(id => this.getCandidatesCount(id));
        return forkJoin(candidatesCount$).pipe(
          map(counts => counts.reduce((acc, val) => acc + val, 0))
        );
      })
    );
  }

  bigChart() {
    return [{
      name: 'Asia',
      data: [502, 635, 809, 947, 1402, 3634, 5268]
    }, {
      name: 'Africa',
      data: [106, 107, 111, 133, 221, 767, 1766]
    }, {
      name: 'Europe',
      data: [163, 203, 276, 408, 547, 729, 628]
    }, {
      name: 'America',
      data: [18, 31, 54, 156, 339, 818, 1201]
    }, {
      name: 'Oceania',
      data: [2, 2, 2, 6, 13, 30, 46]
    }];
  }

  cards() {
    return [71, 78, 39, 66];
  }

  pieChart() {
    return [{
      name: 'RFP',
      y: 61.41,
      sliced: true,
      selected: true
    }, {
      name: 'DC',
      y: 11.84
    }, {
      name: 'AD',
      y: 10.85
    }, {
      name: 'LCD',
      y: 4.67
    }, {
      name: 'ABC',
      y: 4.18
    }, {
      name: 'EFF',
      y: 1.64
    }, {
      name: 'BNP',
      y: 1.6
    }, {
      name: 'BCP',
      y: 1.2
    }, {
      name: 'Other',
      y: 2.61
    }];
  }
}
