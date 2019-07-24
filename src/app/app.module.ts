import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeLayoutComponent } from './shared/layouts/home-layout.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { HomeLayoutModule } from './shared/layouts/home-layout.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminHeaderComponent } from './shared/header/admin-header.component';
import { AdminFooterComponent } from './shared/footer/admin-footer.component';
import { AdminLayoutComponent } from './shared/layouts/admin-layout.component';
import { AdminLayoutModule } from './shared/layouts/admin-layout.module';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeLayoutComponent,
    SpinnerComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    AdminLayoutComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    HomeLayoutModule,
    AdminLayoutModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
