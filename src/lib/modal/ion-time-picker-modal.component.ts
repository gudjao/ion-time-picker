import { Component, ViewChild } from '@angular/core';
import { NavParams, ModalController, IonSlides } from '@ionic/angular';
import { Observable } from 'rxjs';

import * as _moment from 'moment';
import { IonTimePickerService } from '../ion-time-picker.service';
const moment = _moment;

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ion-time-picker-modal',
  templateUrl: './ion-time-picker-modal.component.html',
  styleUrls: ['./ion-time-picker-modal.component.scss'],
})
export class TimePickerModalComponent {

  @ViewChild('sliderHours', { static: false, read: IonSlides }) protected sliderHours: IonSlides;
  @ViewChild('sliderMinutes', { static: false, read: IonSlides }) protected sliderMinutes: IonSlides;
  @ViewChild('sliderSeconds', { static: false, read: IonSlides }) protected sliderSeconds: IonSlides;
  @ViewChild('sliderMeridian', { static: false, read: IonSlides }) protected sliderMeridian: IonSlides;

  hoursArray: any = [];
  minutesArray: any = [];
  secondsArray: any = [];
  meridianArray: any = [];

  slideOptsHours = {
    centeredSlides: true,
    slidesPerView: 5,
    initialSlide: 0,
    direction: 'vertical',
    loop: true
  };

  slideOptsMinutes = {
    centeredSlides: true,
    slidesPerView: 5,
    initialSlide: 0,
    direction: 'vertical',
    loop: true
  };

  slideOptsSeconds = {
    centeredSlides: true,
    slidesPerView: 5,
    initialSlide: 0,
    direction: 'vertical',
    loop: true
  };

  slideOptsMeridian = {
    centeredSlides: true,
    slidesPerView: 5,
    initialSlide: 0,
    direction: 'vertical',
    loop: false
  };

  sliderHoursActiveIndex = 0;
  sliderMinutesActiveIndex = 0;
  sliderSecondsActiveIndex = 0;
  sliderMeridianActiveIndex = 0;

  momentObj;
  mainObj: any = {};
  selectedTime: any;

  isReady = false;

  constructor(
    private modalCtrl: ModalController,
    private ionTimePickerService: IonTimePickerService,
  ) {
    this.mainObj = this.initTimePickerObject(this.ionTimePickerService.objConfig);
    this.initialSlide();
    setTimeout(() => {
      this.inItTimePicker();
    }, 50);
  }

  initialSlide() {
    const timeFormat = this.mainObj.timeFormat;
    if (timeFormat.indexOf('HH') >= 0) {
      this.slideOptsHours.initialSlide = Number(this.momentObj.locale('en').format('HH'));
    } else if (timeFormat.indexOf('H') >= 0) {
      this.slideOptsHours.initialSlide = Number(this.momentObj.locale('en').format('H'));
    } else if (timeFormat.indexOf('hh') >= 0) {
      this.slideOptsHours.initialSlide = Number(this.momentObj.locale('en').format('hh') - 1);
    } else if (timeFormat.indexOf('h') >= 0) {
      this.slideOptsHours.initialSlide = Number(this.momentObj.locale('en').format('h') - 1);
    } else if (timeFormat.indexOf('kk') >= 0) {
      this.slideOptsHours.initialSlide = Number(this.momentObj.locale('en').format('kk') - 1);
    } else if (timeFormat.indexOf('k') >= 0) {
      this.slideOptsHours.initialSlide = Number(this.momentObj.locale('en').format('k') - 1);
    }
    if (timeFormat.indexOf('mm') >= 0) {
      this.slideOptsMinutes.initialSlide = Number(this.momentObj.format('mm'));
    } else if (timeFormat.indexOf('m') >= 0) {
      this.slideOptsMinutes.initialSlide = Number(this.momentObj.format('m'));
    }
    if (timeFormat.indexOf('ss') >= 0) {
      this.slideOptsSeconds.initialSlide = Number(this.momentObj.format('ss'));
    } else if (timeFormat.indexOf('s') >= 0) {
      this.slideOptsSeconds.initialSlide = Number(this.momentObj.format('s'));
    }
    if (timeFormat.indexOf('a') >= 0) {
      this.slideOptsMeridian.initialSlide = this.momentObj.format('a') === 'am' ? 0 : 1;
    } else if (timeFormat.indexOf('A') >= 0) {
      this.slideOptsMeridian.initialSlide = this.momentObj.format('A') === 'AM' ? 0 : 1;
    }
  }

  updateSlide(slides: IonSlides, i = 0) {
    if (slides) {
      slides.update();
    } else if (i < 20) {
      setTimeout(() => {
        this.updateSlide(slides, i);
      }, 50);
    }
  }

  inItTimePicker() {
    this.setHoursArray(this.mainObj.timeFormat);
    this.setMinutesArray(this.mainObj.timeFormat);
    this.setSecondsArray(this.mainObj.timeFormat);
    this.setMeridianArray(this.mainObj.timeFormat);
    this.updateSlide(this.sliderHours);
    this.updateSlide(this.sliderMinutes);
    this.updateSlide(this.sliderSeconds);
    this.updateSlide(this.sliderMeridian);
    this.isReady = true;
  }


  // get slider hours active index
  onChangeHoursSlide(event) {
    if (event.target.swiper.previousIndex === 0 && this.selectedTime === undefined) {
      this.sliderHoursActiveIndex = event.target.swiper.realIndex;
    } else if (event.target.swiper.previousIndex === 0) {
      this.sliderHoursActiveIndex = event.target.swiper.realIndex - event.target.swiper.loopedSlides;
    } else {
      this.sliderHoursActiveIndex = event.target.swiper.realIndex;
    }
  }

  // get slider minutes active index
  onChangeMinutesSlide(event) {
    if (event.target.swiper.previousIndex === 0 && this.selectedTime === undefined) {
      this.sliderMinutesActiveIndex = event.target.swiper.realIndex;
    } else if (event.target.swiper.previousIndex === 0) {
      this.sliderMinutesActiveIndex = event.target.swiper.realIndex - event.target.swiper.loopedSlides;
    } else {
      this.sliderMinutesActiveIndex = event.target.swiper.realIndex;
    }
  }

  // get slider seconds active index
  onChangeSecondsSlide(event) {
    if (event.target.swiper.previousIndex === 0 && this.selectedTime === undefined) {
      this.sliderSecondsActiveIndex = event.target.swiper.realIndex;
    } else if (event.target.swiper.previousIndex === 0) {
      this.sliderSecondsActiveIndex = event.target.swiper.realIndex - event.target.swiper.loopedSlides;
    } else {
      this.sliderSecondsActiveIndex = event.target.swiper.realIndex;
    }
  }

  // get slider seconds active index
  onChangeMeridianSlide(event) {
    this.sliderMeridianActiveIndex = event.target.swiper.realIndex;
  }

  // initialize timepicker Object
  initTimePickerObject(config) {
    const format = config.timeFormat ? config.timeFormat : 'hh:mm A';
    this.selectedTime = this.ionTimePickerService.selectedTime || moment().format(format);
    if (config.inputTime && !this.selectedTime) {
      this.selectedTime = config.inputTime;
    }
    const objConfig: any = {};
    objConfig.inputTime = this.selectedTime;
    objConfig.momentLocale = config.momentLocale ? config.momentLocale : 'en-US';
    moment.locale(objConfig.momentLocale);

    objConfig.timeFormat = format;
    if (typeof (this.selectedTime) === 'string') {
      this.momentObj = this.selectedTime ?
        moment(this.selectedTime, objConfig.timeFormat) :
        moment(moment(new Date().getTime()));
    } else {
      this.momentObj = this.selectedTime ?
        moment(this.selectedTime) :
        moment(moment(new Date().getTime()));
    }

    objConfig.setLabel = config.setLabel ? config.setLabel : 'Set';
    objConfig.closeLabel = config.closeLabel ? config.closeLabel : 'Close';
    objConfig.titleLabel = config.titleLabel ? config.titleLabel : 'Time';
    objConfig.btnCloseSetInReverse = config.btnCloseSetInReverse ? config.btnCloseSetInReverse : false;

    objConfig.btnProperties = {};
    if (config.btnProperties) {
      const btnProperties = config.btnProperties;
      objConfig.btnProperties.expand = btnProperties.expand ? btnProperties.expand : 'block';
      objConfig.btnProperties.fill = btnProperties.fill ? btnProperties.fill : 'solid';
      objConfig.btnProperties.size = btnProperties.size ? btnProperties.size : 'default';
      objConfig.btnProperties.color = btnProperties.color ? btnProperties.color : '';
      objConfig.btnProperties.disabled = btnProperties.disabled ? btnProperties.disabled : false;
      objConfig.btnProperties.strong = btnProperties.strong ? btnProperties.strong : false;
    } else {
      objConfig.btnProperties.expand = 'block';
      objConfig.btnProperties.fill = 'solid';
      objConfig.btnProperties.size = 'default';
      objConfig.btnProperties.disabled = false;
      objConfig.btnProperties.strong = false;
    }
    return objConfig;
  }

  // close modal
  async closeIonicTimePickerModal() {
    const modal = await this.modalCtrl.getTop();
    modal.dismiss('');
  }

  // set time in modal dismiss method
  async setIonicTimePickerTime() {
    const modal = await this.modalCtrl.getTop();
    this.selectedTime = this.setTimeInMomentObject();
    modal.dismiss({ time: (this.selectedTime) });
  }

  // set time in moment object
  setTimeInMomentObject() {
    const formateArray = [];
    const timeArray = [];

    const charZeroInLocale = moment().second(0).format('s');
    // //console.log('charZeroInLocale : ' + charZeroInLocale);
    if (this.mainObj.timeFormat.indexOf('H') >= 0) {
      formateArray.push('H');
      const hourString = this.hoursArray[this.sliderHoursActiveIndex];
      // hourString = hourString.replace(/^0+/, '');
      timeArray.push(hourString);
    }
    if (this.mainObj.timeFormat.indexOf('h') >= 0) {
      formateArray.push('h');
      const hourString = this.hoursArray[this.sliderHoursActiveIndex];
      // hourString = hourString.replace(/^0+/, '');
      timeArray.push(hourString);
    }
    if (this.mainObj.timeFormat.indexOf('k') >= 0) {
      formateArray.push('k');
      const hourString = this.hoursArray[this.sliderHoursActiveIndex];
      // hourString = hourString.replace(/^0+/, '');
      timeArray.push(hourString);
    }
    if (this.mainObj.timeFormat.indexOf('m') >= 0) {
      formateArray.push('m');
      const minString = this.minutesArray[this.sliderMinutesActiveIndex];
      // minString = minString.replace(/^0+/, '');
      timeArray.push(minString);
    }
    if (this.mainObj.timeFormat.indexOf('s') >= 0) {
      formateArray.push('s');
      const secString = this.secondsArray[this.sliderSecondsActiveIndex];
      // secString = secString.replace(/^0+/, '');
      timeArray.push(secString);
    }
    if (this.mainObj.timeFormat.indexOf('a') >= 0 || this.mainObj.timeFormat.indexOf('A') >= 0) {
      formateArray.push('a');
      const meridianString = this.meridianArray[this.sliderMeridianActiveIndex].toLowerCase();
      timeArray.push(meridianString);
    }

    const formateString = formateArray.join(':');
    const timeString = timeArray.join(':');
    // this.momentObj = mmObj;
    // //console.log('timeString: ' + timeString + '  formateString: ' + formateString);
    const mmObj = moment(timeString, formateString);
    return mmObj.format(this.mainObj.timeFormat);
  }

  // sets hours array
  setHoursArray(timeFormat) {
    const obj = moment().startOf('date');
    if (timeFormat.indexOf('HH') >= 0) {
      this.hoursArray = this.initHoursArray(obj, 23, 'HH');
    } else if (timeFormat.indexOf('H') >= 0) {
      this.hoursArray = this.initHoursArray(obj, 23, 'H');
    } else if (timeFormat.indexOf('hh') >= 0) {
      this.hoursArray = this.initHoursArray(obj.add(1, 'hours'), 11, 'hh');
    } else if (timeFormat.indexOf('h') >= 0) {
      this.hoursArray = this.initHoursArray(obj.add(1, 'hours'), 11, 'h');
    } else if (timeFormat.indexOf('kk') >= 0) {
      this.hoursArray = this.initHoursArray(obj.add(1, 'hours'), 23, 'kk');
    } else if (timeFormat.indexOf('k') >= 0) {
      this.hoursArray = this.initHoursArray(obj.add(1, 'hours'), 23, 'k');
    }
  }

  // Initialize hours array
  initHoursArray(momentObj, end, format) {
    const hoursArray: any = [];
    for (let i = 0; i <= end; i++) {
      hoursArray.push(momentObj.format(format));
      momentObj.add(1, 'hours');
    }
    return hoursArray;
  }

  // sets minutes array
  setMinutesArray(timeFormat) {
    if (timeFormat.indexOf('mm') >= 0) {
      this.minutesArray = this.initMinutesArray('mm');
    } else if (timeFormat.indexOf('m') >= 0) {
      this.minutesArray = this.initMinutesArray('m');
    }
  }

  // initialize minutes array
  initMinutesArray(format) {
    const obj = moment().startOf('hour');
    const minutesArray: any = [];
    for (let i = 0; i < 60; i++) {
      minutesArray.push(obj.format(format));
      obj.add(1, 'minutes');
    }
    return minutesArray;
  }

  // sets seconds array
  setSecondsArray(timeFormat) {
    if (timeFormat.indexOf('ss') >= 0) {
      this.secondsArray = this.initSecondsArray('ss');
    } else if (timeFormat.indexOf('s') >= 0) {
      this.secondsArray = this.initSecondsArray('s');
    }
  }

  // initialize seconds array
  initSecondsArray(format) {
    const obj = moment().startOf('minute');
    const secondsArray: any = [];
    for (let i = 0; i < 60; i++) {
      secondsArray.push(obj.format(format));
      obj.add(1, 'seconds');
    }
    return secondsArray;
  }

  // set meridian array
  setMeridianArray(timeFormat) {
    if (timeFormat.indexOf('a') >= 0 || timeFormat.indexOf('A') >= 0) {
      const format = timeFormat.indexOf('a') >= 0 ? 'a' : 'A';
      const obj = moment().startOf('date');
      this.meridianArray.push(obj.format(format));
      this.meridianArray.push(obj.add(12, 'hours').format(format));
    }
    this.updateSlide(this.sliderMeridian);
  }
}
