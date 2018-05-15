import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
    selector: '[appValueLimit]',
    providers: [{provide: NG_VALIDATORS, useExisting: ValueLimitDirective, multi: true}]
})
export class ValueLimitDirective implements Validator {

    @Input('appValueLimit') appValueLimit: {min: number, max: number};

    validate(control: AbstractControl): {[key: string]: any} {

        let inLimit: boolean;

        if (this.appValueLimit.max === undefined) {
            inLimit = control.value >= this.appValueLimit.min;
        } else if (this.appValueLimit.min === undefined) {
            inLimit = control.value <= this.appValueLimit.max;
        } else {
            inLimit = control.value >= this.appValueLimit.min && control.value <= this.appValueLimit.max;
        }

        return inLimit ? null : {'valueLimitValidator': {value: control.value}};
    }
}
