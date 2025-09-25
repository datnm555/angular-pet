import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared-module';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  loading = false;
  searchTerm = '';

  // Modal state
  showAddUserModal = false;
  addUserForm: FormGroup;
  submitting = false;

  // Alert state
  showSuccessAlert = false;
  successMessage = '';

  columns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, width: '80px' },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true, width: '120px' },
    { key: 'status', label: 'Status', sortable: true, width: '100px' },
    { key: 'joinDate', label: 'Join Date', sortable: true, width: '150px' }
  ];

  constructor(private fb: FormBuilder) {
    this.addUserForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['User', [Validators.required]],
      status: ['Active', [Validators.required]]
    });
  }

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
    this.showAddUserModal = true;
    this.addUserForm.reset({
      name: '',
      email: '',
      role: 'User',
      status: 'Active'
    });
  }

  closeAddUserModal(): void {
    this.showAddUserModal = false;
    this.addUserForm.reset();
    this.submitting = false;
  }

  submitAddUser(): void {
    if (this.addUserForm.valid) {
      this.submitting = true;

      // Simulate API call
      setTimeout(() => {
        const newUser: User = {
          id: this.users.length + 1,
          name: this.addUserForm.value.name,
          email: this.addUserForm.value.email,
          role: this.addUserForm.value.role,
          status: this.addUserForm.value.status,
          joinDate: new Date()
        };

        this.users.unshift(newUser);
        this.filterUsers();
        this.submitting = false;
        this.closeAddUserModal();

        // Show success message
        this.showSuccessMessage(`User "${newUser.name}" has been added successfully!`);
      }, 1000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.addUserForm.controls).forEach(key => {
        this.addUserForm.get(key)?.markAsTouched();
      });
    }
  }

  editUser(user: User): void {
    console.log('Edit user:', user);
  }

  deleteUser(user: User): void {
    console.log('Delete user:', user);
  }

  showSuccessMessage(message: string): void {
    this.successMessage = message;
    this.showSuccessAlert = true;

    // Auto-hide after 5 seconds
    setTimeout(() => {
      this.showSuccessAlert = false;
    }, 5000);
  }

  dismissAlert(): void {
    this.showSuccessAlert = false;
  }
}