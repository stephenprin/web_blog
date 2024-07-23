import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, Validators ,ReactiveFormsModule} from "@angular/forms";
import { RouterLink, RouterOutlet } from "@angular/router";
import { Store } from "@ngrx/store";
import { authAction } from "../../store/action";
import { RegisterRequestInterface } from "../../types/registerRequest.interface";
import { selectIsSubmitting, selectValidationErrors } from "../../store/reducer";

import { AuthService } from "../../services/auth.service";
import { combineLatest } from "rxjs";
import { BackendErrorMessagesComponent } from "../../../shared/components/backendErrorMessages/backendErrorMessages.component";

@Component({
    selector: 'register',
    standalone: true,
     imports: [CommonModule, RouterLink, ReactiveFormsModule,BackendErrorMessagesComponent],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
  })
export class RegisterComponent {
    form = this.fb.nonNullable.group({
        username:['', Validators.required],
        email:['', Validators.required],
        password: ['', Validators.required],
    });
    
    data$ = combineLatest({
        isSubmitting: this.store.select(selectIsSubmitting),
        backendErrors: this.store.select(selectValidationErrors)
    })

    constructor(private fb: FormBuilder,
        private store: Store,
     private authService: AuthService,
        
    ) { }
    
    onSubmit() {
        
        const request:  RegisterRequestInterface = {
            user: this.form.getRawValue()
        }
        this.store.dispatch(authAction.register({ request }))
        

        
    }

  }
  