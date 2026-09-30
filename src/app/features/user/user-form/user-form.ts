import { Component, OnInit, Type, inject, signal } from '@angular/core';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { HttpErrorResponse } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { PageHeader, FormError, Select } from '@supremenetwork/ui';

import { UserService } from '../../../core/service/user.service';
import { RoleService } from '../../../core/service/role.service';
import { NotificationService } from '../../../core/service/notification.service';

import { RoleResponseDTO } from '../../../shared/dto/response/role-response.dto';
import { ApiResponseDTO } from '../../../shared/dto/response/api-response.dto';
import { UserResponseDTO } from '../../../shared/dto/response/user-response.dto';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    Select,
    PageHeader,
    RouterLink,
    FormError,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly notificationService = inject(NotificationService);
  private readonly userService = inject(UserService);
  private readonly roleService = inject(RoleService);

  id: string | null = null;

  roles = signal<RoleResponseDTO[]>([]);

  pageHeaderComponent = signal<Type<unknown> | null>(null);

  formErrorComponent = signal<Type<unknown> | null>(null);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    roleIds: this.fb.control<string[]>([], {
      validators: [Validators.required],
    }),
    enabled: [true],
    password: ['', [Validators.minLength(8)]],
    emailVerified: [true],
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadRoles();

    if (this.id) {
      this.loadUser(this.id);
    } else {
      const passwordControl = this.form.controls.password;
      passwordControl.addValidators(Validators.required);
      passwordControl.updateValueAndValidity();
    }
  }

  private loadRoles(): void {
    this.roleService.getAllRole().subscribe({
      next: (response) => {
        this.roles.set(response.data ?? []);
      },
    });
  }

  private loadUser(id: string): void {
    this.userService.findById(id).subscribe({
      next: (response) => {
        if (!response.data) {
          return;
        }

        const user = response.data;

        this.form.patchValue({
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          enabled: user.enabled,
          emailVerified: user.emailVerified,
          roleIds: user.roles.map((r) => r.id),
        });
      },
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const user = this.form.getRawValue();

    if (this.id) {
      this.userService.editUser(this.id, user).subscribe({
        next: (resp: ApiResponseDTO<UserResponseDTO>) => {
          this.notificationService.success(resp.message);
          this.router.navigate(['/user/grid']);
        },
        error: (err: HttpErrorResponse) => {
          this.notificationService.error(err);
        },
      });

      return;
    }

    this.userService.insertUser(user).subscribe({
      next: (resp: ApiResponseDTO<UserResponseDTO>) => {
        this.notificationService.success(resp.message);
        this.router.navigate(['/user/grid']);
      },
      error: (err: HttpErrorResponse) => {
        this.notificationService.error(err);
      },
    });
  }

  compareFn = (roleId1: string | null, roleId2: string | null): boolean => {
    return roleId1 === roleId2;
  };
}
