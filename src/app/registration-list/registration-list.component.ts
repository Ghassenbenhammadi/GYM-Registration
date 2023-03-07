import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { User } from '../user';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss']
})
export class RegistrationListComponent  implements OnInit{
  public dataSource!: MatTableDataSource<User>;
  public registerForm!: FormGroup;
  public users!: User[] | any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string [] = ['id','firstName','lastName','email','mobile','bmiResult','gender','package','enquiryDate','action'];

 constructor(private api:ApiService,private router:Router,
  private confirmService: NgConfirmService,private toastService: NgToastService){}
  ngOnInit() {
    this.getUsers();
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUsers(){
    this.api.getRegistratedUser()
    .subscribe(res=>{
      this.users = res;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })
  }
  edit(id:number){
    this.router.navigate(['update',id]);
  }
  delete(id : number){
    this.confirmService.showConfirm("Are you sure want to delete?",
    ()=>{
      this.api.deleteRegistratedUser(id).subscribe(res=>{
        this.toastService.success({detail:"Success", summary:"Delete successfully",duration:3000});
      this.registerForm.reset();
      this.router.navigate(['list'])

      })
    },()=>{
      

    })
    
     
    }

  }


