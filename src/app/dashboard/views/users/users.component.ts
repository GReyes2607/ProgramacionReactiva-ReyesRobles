import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User } from './models';

const ELEMENT_DATA: User[] = [
  {
    id: 1,
    name: 'Gustavo',
    surname: 'Reyes Robles',
    email: 'gustavo_reyes@hotmail.es',
    password: '123456'
  },
  {
    id: 2,
    name: 'Juan Carlos',
    surname: 'Dominguez Gomez',
    email: 'jcdg83@gmail.com',
    password: '123456'
  }
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  public users: User[] = ELEMENT_DATA;

  constructor(private matDialog: MatDialog) { }

  onCreateUser(): void {
    const dialogRef = this.matDialog.open(UserFormDialogComponent)
    dialogRef.afterClosed().subscribe({
      next: (newUser) => {
        if (newUser) {
          this.users = [
            ...this.users,
            {
              id: this.users.length + 1,
              name: newUser.name,
              surname: newUser.surname,
              email: newUser.email,
              password: newUser.password
            }
          ]
        }

      }
    })
  }

  onDeleteUser(userDelete: User): void {
    if (confirm(`¿Esta seguro que desea eleminar a ${userDelete.name} ${userDelete.surname} ?`)) {
      this.users = this.users.filter((u) => u.id !== userDelete.id);
    }

  }

  onEditUser(userEdit: User): void {
    this.matDialog.open(UserFormDialogComponent, {
      data: userEdit
    })
      .afterClosed()
      .subscribe({
        next: (data) => {
          if (data) {
            this.users = this.users.map((user) => {
              return user.id === userEdit.id
                ? { ...user, ...data }
                : user
            })
          }

        }
      })
  }
}
