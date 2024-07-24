import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthStateInterface } from '../types/authState.interface';
import { authAction } from './action';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: undefined,
  isLoading: false,
  validationErrors: null,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authAction.register, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authAction.registerSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
      isLoading: false,
    })),
    on(authAction.registerFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
      isLoading: false,
    })),

    on(authAction.login, (state) => ({
        ...state,
        isSubmitting: true,
        validationErrors: null,
      })),
      on(authAction.loginSuccess, (state, action) => ({
        ...state,
        isSubmitting: false,
        currentUser: action.currentUser,
        isLoading: false,
      })),
      on(authAction.loginFailure, (state, action) => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors,
        isLoading: false,
      }))
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectCurrentUser,
  selectValidationErrors,
  selectIsLoading,
} = authFeature;
