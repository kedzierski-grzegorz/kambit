import {HttpClientModule} from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { CtiModule } from './cti/cti.module';
import { HomeModule } from './home/home.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './login/login.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingComponent } from './loading/loading.component';
import { TokenGetterService } from './auth/token-getter.service';
import { HttpOptionsService } from './auth/http-options.service';
import { GridModule } from '@progress/kendo-angular-grid';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    CtiModule,
    AppRoutingModule,
    LoginModule,
    ButtonsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GridModule
  ],
  providers: [AuthService, HttpOptionsService, TokenGetterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
