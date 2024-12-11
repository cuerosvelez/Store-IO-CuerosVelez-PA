declare module 'vtex.store-newsletter' {
  import type { ComponentType, PropsWithChildren } from 'react';
  import type { CssHandlesTypes } from 'vtex.css-handles';

  export interface FormEmailInputProps {
    placeholderText?: string;
    inputLabel?: string;
    errorMessage?: string;
    classes?: CssHandlesTypes.CustomClasses<T>;
  }

  export interface FormSubmitProps {
    submitButtonLabel?: string;
    classes?: CssHandlesTypes.CustomClasses<T>;
  }

  export interface FormConfirmationCheckboxProps {
    checkboxLabel?: string;
    classes?: CssHandlesTypes.CustomClasses<T>;
    firstLabelLink?: {
      url: string;
      text: string;
    };
    secondLabelLink?: {
      url: string;
      text: string;
    };
  }

  export const FormSubmit: ComponentType<FormSubmitProps>;
  export const FormEmailInput: ComponentType<FormEmailInputProps>;
  export const Newsletter: ComponentType<PropsWithChildren<Props>>;
  export const FormConfirmationCheckbox: ComponentType<FormConfirmationCheckboxProps>;
}
