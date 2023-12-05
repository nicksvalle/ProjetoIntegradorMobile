import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular'; // Adição do módulo do Ionic
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ManageTeacherComponent } from './components/manage-teacher/manage-teacher.component';
import { CoordenadorPortalComponent } from './components/coordenador-portal/coordenador-portal.component';
import { MenuCoordenadorComponent } from './components/menu-coordenador/menu-coordenador.component';
import { ManageCourseComponent } from './components/manage-course/manage-course.component';
import { BotaoLogoComponent } from './components/botao-logo/botao-logo.component';
import { ManageCourseFormComponent } from './components/manage-course-form/manage-course-form.component';
import { ManageClassComponent } from './components/manage-class/manage-class.component';
import { ManageClassFormComponent } from './components/manage-class-form/manage-class-form.component';
import { ManageRoomComponent } from './components/manage-room/manage-room.component';
import { ManageRoomFormComponent } from './components/manage-room-form/manage-room-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ManageTeacherComponent,
    CoordenadorPortalComponent,
    MenuCoordenadorComponent,
    ManageCourseComponent,
    BotaoLogoComponent,
    ManageCourseFormComponent,
    ManageClassComponent,
    ManageClassFormComponent,
    ManageRoomComponent,
    ManageRoomFormComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), // Inicialização do módulo do Ionic
    AppRoutingModule,
    RouterModule, // Remova se não for necessário
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
