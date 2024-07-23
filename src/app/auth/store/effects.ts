import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { AuthService } from "../services/auth.service";
import { authAction } from "./action";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { CurrentUserInterface } from "../../shared/types/currentUser.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { PersistenceService } from "../../shared/services/persistence.service";
import { Router } from "@angular/router";

export const registerEffect = createEffect((
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistence= inject(PersistenceService)
) => {
    return actions$.pipe(
        ofType(authAction.register),
        switchMap(({ request }) => {
            return authService.register(request).pipe(
                map((currentUser: CurrentUserInterface) => {
                    persistence.set('accessToken', currentUser.token)
                    return authAction.registerSuccess({ currentUser })
                }),
                catchError((errorResponse:HttpErrorResponse) => {
                    return of(authAction.registerFailure({
                        errors: errorResponse.error.errors
                    }))
                })
            )
        })
    )
}, { functional: true })



export const redirectAfterRegistrationEffect = createEffect((
    actions$ = inject(Actions),
    router= inject(Router),
) => {
    return actions$.pipe(
        ofType(authAction.registerSuccess),
        tap(() => {
            router.navigateByUrl('/')
        })
    )

 }, { functional: true, dispatch:false })