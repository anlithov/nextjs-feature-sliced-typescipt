import React, { HTMLInputTypeAttribute } from 'react';

export interface FieldBaseTypes {
  label?: string;
  value?: string | number;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  error?: string;
}
