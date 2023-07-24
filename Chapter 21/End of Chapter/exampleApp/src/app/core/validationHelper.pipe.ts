import { Pipe } from "@angular/core";
import { FormControl, ValidationErrors } from "@angular/forms";

@Pipe({
    name: "validationFormat"
})
export class ValidationHelper {

    transform(source: any, name: any) : string[] {
        if (source instanceof FormControl) {
            return this.format((source as FormControl).errors, name)
        }
        return this.format(source as ValidationErrors, name)
    }

    format(errors: ValidationErrors | null, name: string): string[] {
        let messages: string[] = [];
        for (let errorName in errors) {
            switch (errorName) {
                case "required":
                    messages.push(`You must enter a ${name}`);
                    break;
                case "minlength":
                    messages.push(`A ${name} must be at least
                        ${errors['minlength'].requiredLength}
                        characters`);
                    break;
                case "pattern":
                    messages.push(`The ${name} contains
                            illegal characters`);
                    break;
            }
        }
        return messages;
    }
}
