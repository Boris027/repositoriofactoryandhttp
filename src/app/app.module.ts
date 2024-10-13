import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GETVALUEFROM, REPOSITORYPEOPLE_TOKEN, URLAPI } from './core/repositories/repository.token';
import { BaseRepository } from './core/repositories/impl/base-repository-localstorage.service';
import { SharedmoduleModule } from './shared/sharedmodule.module';
import { repositoryProvider } from './core/repositories/repository.factory';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,SharedmoduleModule,HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide:GETVALUEFROM, useValue:"data"},
    {provide:URLAPI,useValue:"http://localhost:3000/persons"},
    repositoryProvider
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
