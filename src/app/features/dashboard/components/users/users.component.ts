import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared-module';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableColumn } from '../../../../shared/components/table/table.component';
import { UserService, User } from '../../../../core/services/user.service';

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

  // Modal states
  showAddUserModal = false;
  showUserDetailModal = false;
  addUserForm: FormGroup;
  submitting = false;
  selectedUser: User | null = null;
  loadingUserDetails = false;

  // Alert state
  showSuccessAlert = false;
  showErrorAlert = false;
  alertMessage = '';

  columns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, width: '80px' },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'createdAt', label: 'Created Date', sortable: true, width: '150px' }
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.addUserForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.showErrorAlert = false;

    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users.map(user => ({
          ...user
        }));
        this.filteredUsers = [...this.users];
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.showError('Failed to load users. Please try again.');
        console.error('Error loading users:', error);
      }
    });
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
        user.name?.toLowerCase().includes(this.searchTerm) ||
        user.email?.toLowerCase().includes(this.searchTerm)
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
    this.viewUserDetails(user.id);
  }

  viewUserDetails(userId: bigint): void {
    this.loadingUserDetails = true;
    this.showUserDetailModal = true;
    this.selectedUser = null;

    this.userService.getUserById(userId).subscribe({
      next: (user) => {
        this.selectedUser = user;
        this.loadingUserDetails = false;
      },
      error: (error) => {
        this.loadingUserDetails = false;
        this.showError('Failed to load user details.');
        this.closeUserDetailModal();
        console.error('Error loading user details:', error);
      }
    });
  }

  closeUserDetailModal(): void {
    this.showUserDetailModal = false;
    this.selectedUser = null;
    this.loadingUserDetails = false;
  }

  addUser(): void {
    this.showAddUserModal = true;
    this.addUserForm.reset({
      name: '',
      email: '',
      role: 'User',
      status: 'Active',
      phone: '',
      department: '',
      address: ''
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

      const newUser = {
        ...this.addUserForm.value,
        createdAt: new Date().toISOString()
      };

      this.userService.createUser(newUser).subscribe({
        next: (user) => {
          this.submitting = false;
          this.closeAddUserModal();
          this.showSuccess(`User "${user.name}" has been added successfully!`);
          this.loadUsers(); // Refresh the list
        },
        error: (error) => {
          this.submitting = false;
          this.showError('Failed to add user. Please try again.');
          console.error('Error creating user:', error);
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.addUserForm.controls).forEach(key => {
        this.addUserForm.get(key)?.markAsTouched();
      });
    }
  }

  editUser(user: User): void {
    // TODO: Implement edit functionality
    console.log('Edit user:', user);
  }

  deleteUser(userId: bigint): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.showSuccess('User deleted successfully!');
          this.loadUsers(); // Refresh the list
        },
        error: (error) => {
          this.showError('Failed to delete user. Please try again.');
          console.error('Error deleting user:', error);
        }
      });
    }
  }

  showSuccess(message: string): void {
    this.alertMessage = message;
    this.showSuccessAlert = true;
    this.showErrorAlert = false;

    // Auto-hide after 5 seconds
    setTimeout(() => {
      this.showSuccessAlert = false;
    }, 5000);
  }

  showError(message: string): void {
    this.alertMessage = message;
    this.showErrorAlert = true;
    this.showSuccessAlert = false;

    // Auto-hide after 5 seconds
    setTimeout(() => {
      this.showErrorAlert = false;
    }, 5000);
  }

  dismissAlert(): void {
    this.showSuccessAlert = false;
    this.showErrorAlert = false;
  }

  formatDate(dateString: string): string {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  refreshData(): void {
    this.loadUsers();
  }
}
