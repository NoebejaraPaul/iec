import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from './post';
import {  map, switchMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

const url = 'https://iec-ls-default-rtdb.firebaseio.com/'
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public totalPollingStations: number;
  customers: Post[] = []
  totalCandidates : number;
  pollingDivision: any

  constructor(private httpClient: HttpClient) { }

  
  // createData(customer: Post): void {
  //   this.httpClient.post<Post>(`${url}.json`, customer, httpOptions).subscribe(
  //     {
  //       next: res => this.customers.push({ ...{ key: res.name }, ...customer }),
  //       error: err => console.error('An error occurred:', err)
  //       // error: catchError(this.errorHandler('POST'))
  //     }
  //   )
  // }

  getData(): void {
    this.httpClient.get<Post[]>(`${url}polling_divisions.json`, httpOptions).subscribe(
      {
        next: (res: Post[]) => {
          for (let key in res) {
            const customer = { key, ...res[key] }
            this.customers.push(customer)
            console.log(customer);
          }
        },
        error: err => console.error('An error occurred:', err)
        // error: catchError(this.errorHandler('GET'))
      }
    )
  }

  getAllData(cally: string): Observable<number> {
    console.log(`${url + cally}.json`)
    return this.httpClient.get<Post[]>(`${url + cally}.json`, httpOptions)
      .pipe(
        map(res => Object.keys(res).length)
      );
  }

  

  // getDataofDivision(): Observable<number> {
  //   console.log(`${url}polling_divisions.json`)
  //   return this.httpClient.get<Post[]>(`${url}polling_divisions.json`, httpOptions)
  //     .pipe(
  //       map(res => Object.keys(res).length)
  //     );
  // }
//  getDataUsers(): Observable<number> {
//     return this.httpClient.get<Post[]>(`${url}Users.json`, httpOptions).subscribe({
//       next: (res: Post[]) => {
//         //console.log(res.keys);

//         //const jsonArray = Object.keys(res).map((key) => res[key]);
//        // console.log(jsonArray)
//         this.customers = Object.keys(res).map((key) => res[key]); // Assign the entire response to the customers array
//         const totalPollingStations = this.customers.length; // Get the length of the customers array
//         console.log(`Total number of polling stations: ${totalPollingStations}`);
//       },
//       error: err => console.error('An error occurred:', err)
//     });
//   }
 

  
  updateData(customer: Post, i: number): void {
    const { key, ...data } = customer;
    this.httpClient.put<Post>(`${url}/polling_divisions/${customer.key}.json`, data, httpOptions).subscribe({
      next: () => {
        // Update the customer object passed in as a parameter
        Object.assign(customer, data);
        this.customers[i] = customer;
      },
      error: err => console.error('An error occurred:', err)
    });
  }
  

  
  deleteData(customer: Post): void {
    this.httpClient.delete<void>(`${url}/polling_divisions/${customer.key}.json`, httpOptions).subscribe({
      next: () => {
        // Remove the customer object from the customers array
        const index = this.customers.indexOf(customer);
        if (index >= 0) {
          this.customers.splice(index, 1);
        }
      },
      error: err => console.error('An error occurred:', err)
    });
  }
  
  // deleteData(customer: Customer): void {
  //   this.httpClient.delete<void>(`${url}/${customer.key}polling_divisions.json`, httpOptions).subscribe(
  //     {
  //       next: () => this.customers.splice(this.customers.indexOf(customer), 1),
  //       error: catchError(this.errorHandler('DELETE'))
  //     }
  //   )
  // }



  getPollingDivisions(): Observable<any> {
    return this.httpClient.get(`${url}polling_divisions.json`);
  }
  getCandidatesCount(): Observable<number[]> {
    return this.getPollingDivisions().pipe(
      switchMap((pollingDivisions: any) => {
        const candidatesCount$: Observable<number>[] = Object.values(pollingDivisions).map((pollingDivision) => {
          const candidates$: Observable<number> = this.httpClient.get(`${url}$/polling_divisions/polling_division1/candidates.json`).pipe(
            map((candidates: any) => Object.keys(candidates).length)
          );
          return candidates$;
        });
        return combineLatest(candidatesCount$);
      })
    );
  }

  getTotalCandidates(): Observable<number> {
    return this.getCandidatesCount().pipe(
      map((counts: number[]) => counts.reduce((acc, val) => acc + val, 0))
    );
  }

  // getTotalCandidates(): Observable<any> {
  //   return this.httpClient.get(`${url}/polling_divisions.json`).pipe(
  //     map((pollingDivisions: any) => {
  //       const candidatesCount$ = Object.keys(pollingDivisions).map(key => {
  //         return this.httpClient.get(`${url}polling_divisions/${key}/candidates.json`).pipe(
  //           map((candidates: any) => candidates ? Object.keys(candidates).length : 0)
  //         );
  //       });
  //       return combineLatest(candidatesCount$).pipe(
  //         map(counts => counts.reduce((acc, val) => acc + val, 0))
  //       );
  //     })
  //   );
  // }

  // getTotalCandidates(): Observable<number> {
  //   return this.httpClient.get<any[]>(`${url}polling_divisions.json`)
  //     .pipe(
  //       map(data => {
  //         const candidatesCount$ = Object.keys(data).map(key => {
  //           return this.httpClient.get<any[]>(`${url}polling_divisions/${key}/candidates.json`)
  //             .pipe(
  //               map(candidates => candidates ? Object.keys(candidates).length : 0)
  //             );
  //         });

  //         return combineLatest(candidatesCount$)
  //           .pipe(
  //             map(counts => counts.reduce((acc, val) => acc + val, 0))
  //           );
  //       })
  //     );
  //}

  private errorHandler(operation: string, res?: object): any {
    return (error: any): Observable<object> => {
      console.error(`${operation} failed:${error}`)
      return of(res as object)
    }
  }
}

