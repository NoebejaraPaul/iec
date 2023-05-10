import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/http.service';
import { Post } from 'src/app/shared/post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  constructor(public httpService: HttpService) { }

  isEditPos: number | null = null;
  isChanged: boolean = false;
  private tempCustomer!: Post;

  ngOnInit(): void {
    this.httpService.getData();
  }

  editCustomer(i: number): void {
    this.isEditPos = i;
    this.tempCustomer = this.resetCustomer();
  }

  cancelEdit(): void {
    this.isEditPos = null;
    this.isChanged = false;
  }

  saveCustomer(customer: Post, i: number): void {
    const mergeCustomer: Post = this.mergeCustomer(customer, this.tempCustomer)
    this.httpService.updateData(mergeCustomer, i)
    this.cancelEdit();
  }

  deleteCustomer(customer: Post): void {
    this.httpService.deleteData(customer);
  }

  setValue(key: string, value: string, original: string): void {
    const valueTrim = value.trim() // обрезает пробелы если они в конце

    if (valueTrim !== original && valueTrim !== this.tempCustomer[key as keyof Post]) {
      this.tempCustomer[key as keyof Post] = valueTrim;
      this.isChanged = true;
    }
  }


  private resetCustomer = (): Post => ({
    key: null,
    ID: null,
    Name: null,
    Party: null,
    Phone: null,
    Vode: null,
    Password: null
  })

  private mergeCustomer<T>(original: T, temp: T) {
    const result: T = { ...original }
    for (let key in temp) {
      if (temp[key]) {
        result[key] = temp[key]
      }
    }
    return result;
  }


}
