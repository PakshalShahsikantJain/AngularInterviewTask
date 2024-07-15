import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { NewUserRoutingModule } from './new-user-routing.module';
import {MatButtonModule} from '@angular/material/button';
import { AlertModule } from 'ngx-bootstrap/alert';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import {MatBadgeModule} from '@angular/material/badge';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    NewUserRoutingModule,
    MatButtonModule,
    BsDatepickerModule.forRoot(),
    AlertModule.forRoot(),
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSelectModule,
    FormsModule,
    MatCardModule,
    MatDividerModule,
    CarouselModule.forRoot(),
    MatBadgeModule,
    HttpClientModule,
    MatSnackBarModule
  ]
})
export class NewUserModule { }
