import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared-module';
import { TableColumn } from '../../../../shared/components/table/table.component';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: Date;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  loading = false;
  searchTerm = '';

  columns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, width: '80px' },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true, width: '120px' },
    { key: 'status', label: 'Status', sortable: true, width: '100px' },
    { key: 'joinDate', label: 'Join Date', sortable: true, width: '150px' }
  ];

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    // Simulate API call
    setTimeout(() => {
      this.users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', joinDate: new Date('2024-01-15') },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', joinDate: new Date('2024-02-20') },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive', joinDate: new Date('2024-03-10') },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Moderator', status: 'Active', joinDate: new Date('2024-01-25') },
        { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'Active', joinDate: new Date('2024-04-05') },
        { id: 6, name: 'Diana Martinez', email: 'diana@example.com', role: 'Admin', status: 'Active', joinDate: new Date('2024-02-15') },
        { id: 7, name: 'Edward Davis', email: 'edward@example.com', role: 'User', status: 'Inactive', joinDate: new Date('2024-03-20') },
        { id: 8, name: 'Fiona Garcia', email: 'fiona@example.com', role: 'Moderator', status: 'Active', joinDate: new Date('2024-01-30') }
      ];
      this.filteredUsers = [...this.users];
      this.loading = false;
    }, 1000);
  }

  onSearch(event: any): void {
    this.searchTerm = event.target.value.toLowerCase();
    this.filterUsers();
  }

  filterUsers(): void {
    if (!this.searchTerm) {
      this.filteredUsers = [...this.users];
    } else {
      this.filteredUsers = this.users.filter(user =>
        user.name.toLowerCase().includes(this.searchTerm) ||
        user.email.toLowerCase().includes(this.searchTerm) ||
        user.role.toLowerCase().includes(this.searchTerm) ||
        user.status.toLowerCase().includes(this.searchTerm)
      );
    }
  }

  onSort(event: any): void {
    const { column, direction } = event;
    this.filteredUsers.sort((a: any, b: any) => {
      const aVal = a[column];
      const bVal = b[column];

      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  onRowClick(user: User): void {
    console.log('User clicked:', user);
  }

  addUser(): void {
    console.log('Add new user');
  }

  editUser(user: User): void {
    console.log('Edit user:', user);
  }

  deleteUser(user: User): void {
    console.log('Delete user:', user);
  }
}