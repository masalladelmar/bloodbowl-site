import { NgModule } from '@angular/core';
import { HomeLayoutComponent } from './home-layout.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { SpinnerModule } from '../spinner/spinner.module';
import { NavbarComponent } from '../header/navbar.component';

@NgModule({
  declarations: [HomeLayoutComponent, HeaderComponent, FooterComponent, NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot(),
    SpinnerModule
  ],
})
export class HomeLayoutModule { }
