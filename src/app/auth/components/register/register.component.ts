import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, Validators ,ReactiveFormsModule} from "@angular/forms";
import { RouterLink, RouterOutlet } from "@angular/router";
import { Store } from "@ngrx/store";
import { register } from "../../store/action";
import { RegisterRequestInterface } from "../../types/registerRequest.interface";
import { selectIsSubmitting } from "../../store/reducer";
import { AuthStateInterface } from "../../types/authState.interface";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'register',
    standalone: true,
     imports: [CommonModule, RouterLink, ReactiveFormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
  })
export class RegisterComponent {
    form = this.fb.nonNullable.group({
        username:['', Validators.required],
        email:['', Validators.required],
        password: ['', Validators.required],
    });
    isSubmitting$= this.store.select(selectIsSubmitting)
    constructor(private fb: FormBuilder,
        private store: Store,
     private authService: AuthService,
        
    ) { }
    
    onSubmit() {
        console.log('submit', this.form.getRawValue())
        const request:  RegisterRequestInterface = {
            user: this.form.getRawValue()
        }
        this.store.dispatch(register({ request }))
        this.authService.register(request).subscribe(res=>console.log(res))

        
    }

  }
  