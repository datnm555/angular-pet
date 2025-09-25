import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface User {
  id: bigint;
  name: string;
  email: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apiService: ApiService) {}

  // Get all users
  getAllUsers(): Observable<User[]> {
    return this.apiService.get<User[]>('/users');
  }

  // Get single user by ID
  getUserById(userId: bigint): Observable<User> {
    return this.apiService.get<User>(`/users/${userId}`);
  }

  // Create new user
  createUser(user: Partial<User>): Observable<User> {
    return this.apiService.post<User>('/users', user);
  }

  // Update user
  updateUser(userId: bigint, user: Partial<User>): Observable<User> {
    return this.apiService.put<User>(`/users/${userId}`, user);
  }

  // Delete user
  deleteUser(userId: bigint): Observable<any> {
    return this.apiService.delete(`/users/${userId}`);
  }
}
