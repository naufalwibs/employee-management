import {
  Injectable,
  Injector,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  ApplicationRef,
} from '@angular/core';
import { ToastMessageComponent } from '../components/toast-message/toast-message.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DomService {
  componentRef: any;
  xDown: any;
  yDown: any;
  toastTimeout: any;
  destroyToastTimeout: any;
  isToastShowing = false;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private router: Router
  ) {}

  showToastMessage(message: any, duration = 3500) {
    if (message) {
      // prevent multiple toasts
      clearTimeout(this.toastTimeout);
      clearTimeout(this.destroyToastTimeout);
      const appToastEl = document.querySelector('app-toast-message');
      if (appToastEl) appToastEl.parentElement.removeChild(appToastEl);

      this.componentRef = this.componentFactoryResolver
        .resolveComponentFactory(ToastMessageComponent)
        .create(this.injector);

      this.appRef.attachView(this.componentRef.hostView);
      const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;
      document.body.appendChild(domElem);

      this.componentRef.instance.message = message;

      const toastEl = document.getElementById('toast-message');
      toastEl.addEventListener('touchstart', this.handleTouchStart, false);
      toastEl.addEventListener('touchmove', this.handleTouchMove, false);

      this.toastTimeout = setTimeout(() => {
        clearTimeout(this.toastTimeout);
        toastEl.classList.remove('slide-in-top');
        toastEl.classList.add('slide-out-top');
      }, duration);

      this.destroyToastTimeout = setTimeout(() => {
        clearTimeout(this.destroyToastTimeout);
        this.appRef.detachView(this.componentRef.hostView);
        this.componentRef.destroy();
      }, duration + 100);
    }
  }

  handleTouchStart = (evt) => {
    this.xDown = evt.touches[0].clientX;
    this.yDown = evt.touches[0].clientY;
    // tslint:disable-next-line: semicolon
  };

  handleTouchMove = (evt) => {
    if (!this.xDown || !this.yDown) return;

    var xUp = evt.touches[0].clientX,
      yUp = evt.touches[0].clientY,
      xDiff = this.xDown - xUp,
      yDiff = this.yDown - yUp;

    if (Math.abs(xDiff) < Math.abs(yDiff) && yDiff > 0) {
      console.log('close toast');
      clearTimeout(this.toastTimeout);
      clearTimeout(this.destroyToastTimeout);

      const toastEl = document.getElementById('toast-message');
      toastEl.classList.remove('slide-in-top');
      toastEl.classList.add('slide-out-top');

      setTimeout(() => {
        this.appRef.detachView(this.componentRef.hostView);
        this.componentRef.destroy();
      }, 100);
    }
    /* reset values */
    this.xDown = null;
    this.yDown = null;

    // tslint:disable-next-line: semicolon
  };
}
