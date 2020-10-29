import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseDirectivesModule } from '@fuse/directives/directives';
import { FusePipesModule } from '@fuse/pipes/pipes.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    imports  : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        FlexLayoutModule,
        FuseDirectivesModule,
        FusePipesModule
    ],
    exports  : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        FlexLayoutModule,
        FuseDirectivesModule,
        FusePipesModule
    ]
})
export class FuseSharedModule
{
}
