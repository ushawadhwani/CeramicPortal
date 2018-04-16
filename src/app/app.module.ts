import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { MaterialModule } from '@angular/material';
import { HttpModule } from '@angular/http';

// Imports for loading & configuring the in-memory web api
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { ProductData } from './products/product-data';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { LoginComponent } from './login/login/login.component';
import { PageNotFoundComponent } from './page-not-found.component';

/* Feature Modules */
import { LoginModule } from './login/login.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    // MaterialModule.forRoot(),
    // InMemoryWebApiModule.forRoot(ProductData, { delay: 1000 }),
    LoginModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    // LoginComponent,
    PageNotFoundComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
