import { Component, OnInit, Type, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { loadRemoteModule } from '@angular-architects/native-federation';

import { UserService } from '../../../core/service/user.service';
import { NotificationService } from '../../../core/service/notification.service';

import { UserResponseDTO } from '../../../shared/dto/response/user-response.dto';
import { ApiResponseDTO, PageResponseDTO } from '../../../shared/dto/response/api-response.dto';
import { ConfirmDialogData } from '../../../shared/dto/confirm-dialog-data.dto';

import { PageHeader, HasRoleDirective } from '@supremenetwork/ui';

@Component({
  selector: 'app-user-grid',
  standalone: true,
  imports: [
    PageHeader,
    HasRoleDirective,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatTooltipModule,
  ],
  templateUrl: './user-grid.html',
  styleUrl: './user-grid.scss',
})
export class UserGrid implements OnInit {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly notificationService = inject(NotificationService);

  users = signal<UserResponseDTO[]>([]);
  filteredUsers = signal<UserResponseDTO[]>([]);

  pageHeaderComponent = signal<Type<unknown> | null>(null);

  search = '';

  displayedColumns: string[] = ['username', 'name', 'email', 'enabled', 'actions'];

  totalUsers = 0;
  activeUsers = 0;
  inactiveUsers = 0;

  page = 0;
  size = 10;

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.userService.getAllUser(this.page, this.size).subscribe({
      next: (response: PageResponseDTO<UserResponseDTO[]>) => {
        const users = response.data ?? [];

        this.users.set(users);
        this.totalUsers = response.total;
        this.updateStats();
        this.filterUsers();
      },
      error: (err: HttpErrorResponse) => {
        this.notificationService.error(err);
      },
    });
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex;
    this.size = event.pageSize;

    this.findAll();
  }

  filterUsers(): void {
    const search = this.search.trim().toLowerCase();

    const users = this.users();

    if (!search) {
      this.filteredUsers.set([...users]);
      return;
    }

    this.filteredUsers.set(
      users.filter(
        (user) =>
          user.username?.toLowerCase().includes(search) ||
          user.firstName?.toLowerCase().includes(search) ||
          user.lastName?.toLowerCase().includes(search) ||
          user.email?.toLowerCase().includes(search),
      ),
    );
  }

  clearSearch(): void {
    this.search = '';
    this.filterUsers();
  }

  viewUser(id: string): void {
    this.router.navigate(['/user/view', id]);
  }

  editUser(id: string): void {
    this.router.navigate(['/user/form', id]);
  }

  async confirmaticonDeleteUser(id: string, name: string): Promise<void> {
    const data: ConfirmDialogData = {
      title: 'Excluir usuario',
      message: `Deseja realmente excluir usuario "${name}"?`,
      confirmText: 'Excluir',
      cancelText: 'Cancelar',
      icon: 'delete',
    };

    const { ConfirmDialogComponent } = await loadRemoteModule(
      'supremenetwork-client-web',
      './ConfirmDialogComponent',
    );

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data,
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) {
        return;
      }

      this.deleteUser(id);
    });
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe({
      next: (resp: ApiResponseDTO<void>) => {
        this.findAll();
        this.notificationService.success(resp.message);
      },

      error: (err: HttpErrorResponse) => {
        this.notificationService.error(err);
      },
    });
  }

  newUser(): void {
    this.router.navigate(['/user/form']);
  }

  updateStats(): void {
    const users = this.users();

    this.activeUsers = users.filter((user) => user.enabled).length;
    this.inactiveUsers = users.filter((user) => !user.enabled).length;
  }
}
