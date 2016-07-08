import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide } from '@angular/core';
import {HTTP_PROVIDERS, BaseRequestOptions, RequestOptions } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import { AppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

class CustomRequestOptions extends BaseRequestOptions {
  private _apiKey = '9061b8ea-432c-11e6-8547-0a5449992ecf';

  constructor() {
    super();
    this.headers.append("Application-ID", this._apiKey);
  }
}

bootstrap(AppComponent, [ 
  [HTTP_PROVIDERS],
  disableDeprecatedForms(),
  provideForms(),
  provide(RequestOptions, { useClass: CustomRequestOptions })
]).catch((err: any) => {console.error(err)});
