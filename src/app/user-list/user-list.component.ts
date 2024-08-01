import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import {MatTableModule} from '@angular/material/table';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string
}


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTableModule,],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['id', 'email', 'first_name', 'last_name' ,'avatar']; 
  dataSource : User[] = [];
  clickedRows = new Set<User>();


  currentPage = 1;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers(this.currentPage).subscribe(
      (data: any) => {
        this.users = data.data;
        this.dataSource = this.users
      },
      error => console.error('Error fetching users:', error)
    );
  }

  
  nextPage(): void {
    this.currentPage++;
    this.loadUsers();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUsers();
    }
  }

  navigateToUser(id: number): void {
    console.log("clicked on " + id);
    this.router.navigate([`/users/user/${id}`]);
  }
}