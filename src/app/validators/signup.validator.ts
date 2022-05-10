import { FormControl } from '@angular/forms';

export class SignUpValidator {

  static validDate(fc: FormControl) {
    const date = new Date(fc.value);
    const today = new Date();
    if ( date > today ) {
      return { validDate: true };
    } else {
      return null;
    }
  }

}
