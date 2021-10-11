// @ts-nocheck

import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AbstractValueAccessor, MakeProvider} from '../abstract/abstract-value-accessor';

@Component({
  selector: 'app-auto-input',
  templateUrl: './auto-input.component.html',
  styleUrls: ['./auto-input.component.scss'],
  providers: [
    MakeProvider(AutoInputComponent)
  ],

})
export class AutoInputComponent extends AbstractValueAccessor {

  name = new FormControl('');

  public value: boolean = false;

  public onKeyup(login) {
    this.value = login;
  }

}
