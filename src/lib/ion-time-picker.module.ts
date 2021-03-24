import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TimePickerComponent } from './ion-time-picker.component';
import { TimePickerModalComponent } from './modal/ion-time-picker-modal.component';
import { IonTimePickerService } from './ion-time-picker.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
    ],
    entryComponents: [
        TimePickerComponent,
        TimePickerModalComponent,
    ],
    declarations: [
        TimePickerComponent,
        TimePickerModalComponent,
    ],
    exports: [
        // FormsModule,
        // CommonModule,
        TimePickerComponent,
        TimePickerModalComponent,
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    providers: [
        IonTimePickerService
    ]
})
export class IonTimePickerModule { }
