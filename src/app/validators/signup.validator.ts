import { FormControl } from '@angular/forms';

export class SignUpValidator {

  static validDate(fc: FormControl) {
    const date = new Date(fc.value);
    const today = new Date();
    const minAge = 13;
    const minDateAge = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    if ( date > minDateAge ) {
      return { validDate: true };
    } else {
      return null;
    }
  }

}
