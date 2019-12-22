import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatTabsModule,
  MatCardModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatSnackBarModule
} from '@angular/material';


@NgModule({
  imports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSnackBarModule,
    MatNativeDateModule, MatCheckboxModule, MatSidenavModule, MatProgressSpinnerModule, MatDialogModule, MatPaginatorModule,
    MatToolbarModule, MatListModule, MatTabsModule, MatCardModule, MatSelectModule, MatTableModule, MatSortModule],
  exports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
    MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatProgressSpinnerModule, MatDialogModule, MatPaginatorModule,
    MatListModule, MatTabsModule, MatCardModule, MatSelectModule, MatTableModule, MatSortModule, MatSnackBarModule]
})
export class MaterialModule {

}
