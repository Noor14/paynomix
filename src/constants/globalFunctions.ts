import { FormGroup, FormControl } from '@angular/forms';

export function validateAllFormFields(formGroup: FormGroup) {         
    Object.keys(formGroup.controls).forEach(field => {  
      const control = formGroup.get(field);            
      if (control instanceof FormControl) {             
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        
        this.validateAllFormFields(control);            
      }
    });
};

export const validator = {
  emailPattern: /^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/
};