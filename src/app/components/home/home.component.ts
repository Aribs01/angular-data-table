import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { User } from 'src/app/schemas/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('dt1') 
  dt1: Table | undefined;

  users: User[] = []
  allUsers: User[] = []

  selectedUserIds: any[] = []

  user: User = {}
  status: String = ""
  items: MenuItem[] = [];
  loading: boolean = false

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers()
    this.items = [
      {label:'Edit'},
      {label:'View Profile'},
      {label:'Activate User'},
      {separator:true},
      {label:'Delete'}
    ];
  }

  getUsers(){
    this.userService.getAllUser().subscribe(data=>{
      this.allUsers = data.data
      this.users = this.allUsers
    })

    this.status = 'all'
  }
  
  clear(table: Table) {
    table.clear();
  }

  toggleStatus(status: string){
    this.status = status
    if (status == 'all') {
      this.users = this.allUsers
    }
    else{
      this.users = this.allUsers.filter((x:any)=> x.paymentStatus == status)
    }
  }

  payDues(){
    if (this.selectedUserIds.length < 1) {
      // do nothing
    } 
    else {
      this.loading = true
      this.selectedUserIds.forEach((x:number)=>{
        console.log(x);
        
        this.userService.markPaid(x).subscribe((data)=>{
          this.getUsers()
          this.loading = false
        })
      })
    }
  }

  selectUser(data:User){
    if (this.selectedUserIds.includes(data)) {
      let index = this.selectedUserIds.indexOf(data);
      this.selectedUserIds.splice(index, 1)
    }
    else{
      this.selectedUserIds.push(data)
    }
  }

  applyFilterGlobal($event:any, stringVal:any) {
    this.dt1!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

}
