import { createAction, createActionGroup,  props } from '@ngrx/store';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { BackendErrorsInterface } from '../../shared/types/backendErrors.interface';



export const authAction = createActionGroup({
  source: 'Auth',
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),
    RegisterSuccess: props<{ currentUser: CurrentUserInterface }>(),
    RegisterFailure: props<{errors:BackendErrorsInterface}>()
  }
})


// export const register = createAction(
//   '[Auth] Register',
//     props<{ request: RegisterRequestInterface }>()
// );