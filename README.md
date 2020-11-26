# Ion Time Picker

Here is how it looks

![ionic-timepicker Gif](https://www.logisticinfotech.com/wp-content/uploads/2019/03/ionic4-TimePicker.gif)

## Installation

`npm i ion-time-picker@latest`.

## Quickstart

Import ion-time-picker in you module page.

```typescript
// Import the module
import { IonTimePickerModule } from 'ion-time-picker';
...
@NgModule({
    (...)
    imports: [
        IonTimePickerModule
    ],
    exports: [
        IonTimePickerModule
    ],
    (...)
})
export class AppModule {}
```

## Usage ion-time-picker As a Component

```javascript
time = 'YOUR_TIME'; 
// (please assign time with proper format which is describe below)
timePickerObj = {
    inputTime: '11:01 PM', // for 12 hour time in timePicker
    timeFormat: '', // default 'hh:mm A'
    setLabel: 'Set', // default 'Set'
    closeLabel: 'Close', // default 'Close'
    titleLabel: 'Select a Time', // default 'Time'
    clearButton: false, // default true
    btnCloseSetInReverse: true, // default false
    momentLocale: 'pt-BR', //  default 'en-US'

    btnProperties: {
        expand: '', // "block" | "full" (deafault 'block')
        fill: '', // "clear" | "default" | "outline" | "solid" 
                 // (deafault 'solid')
        size: '', // "default" | "large" | "small" (deafault 'default')
        disabled: '', // boolean (default false)
        strong: '', // boolean (default false)
        color: ''
        // "primary", "secondary", "tertiary", "success", 
        // "warning", "danger", "light", "medium", "dark" , 
        // and give color in string (default 'primary')
      }
};
```

```html
 <ion-time-picker 
    [inputTimeConfig]="timePickerObj" 
    [times]="time"
    [readOnly]="readOnly"
    (clickTime)="time = $event"
></ion-time-picker>
```

## Events

```html
<ion-img
    #elRef
    [url]="image"
    [customCache]="{ fallbackUrl: '/assets/img/bienvenida.png', cache_expire: {time: n.component?.expire_subimage, data: data } }"
    (onExpireCache)="onExpireCache($event, elRef)"
    (ionImgDidLoad)="ionImgDidLoad($event)"
    (ionError)="ionError($event)"
></ion-img>
```
## Credits to
[ionic-timepicker](https://github.com/logisticinfotech/ionic-timepicker)
Documentation [this link](https://www.logisticinfotech.com/blog/ionic-timepicker-component)


