import { Component, Input, OnInit } from "@angular/core";
import { BackendErrorsInterface } from "../../types/backendErrors.interface";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";


@Component({
    selector: 'backend-error-messages',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './backendErrorMessages.component.html',
    
})


export class BackendErrorMessagesComponent implements OnInit{
    @Input() backendErrors: BackendErrorsInterface = {};
    
    errorMessages: string[] = [];
 
    ngOnInit(): void {
        this.errorMessages = Object.keys(this.backendErrors).map((name: string) => {
            const messages = this.backendErrors[name].join(' ');
            return `${name} ${messages}`;
        })
    }

    
}