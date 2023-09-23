import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { HomeComponent } from './components/home/home.component';



@NgModule({
    declarations: [
        DashboardComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        MaterialModule
    ]
})
export class DashboardModule { }
