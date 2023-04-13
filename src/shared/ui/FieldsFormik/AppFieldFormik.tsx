import React, { ChangeEvent, FC } from 'react';
import { Field, FieldAttributes, FieldProps } from 'formik';
import AppField from '@/shared/ui/Fields/AppField';
import { FieldBaseTypes } from '@/shared/ui/Fields/AppField.types';

interface IProps {
  formikName: string;
  onBlur?: (value: string) => void;
  onChange?: (value: string) => void;
  inputTextAlign?: 'center' | 'right' | 'left';
}
const AppFormikField: FC<IProps & FieldBaseTypes> = <T extends Record<string, string | number>>({
  formikName,
  onBlur: onBlurAddon,
  onChange: onChangeAddon,
  inputTextAlign,
  ...otherProps
}: IProps & FieldBaseTypes) => {
  return (
    <Field name={formikName}>
      {({
        field: { name, onBlur, onChange, value },
        form: { errors, touched, setFieldTouched },
      }: FieldAttributes<FieldProps<string | number, T>>) => {
        const hasError = !!(touched[name] && errors[name]);

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
          onChangeAddon && onChangeAddon(event.target.value);
          onChange(name)(event);
        };

        const handleBlur = (event: FocusEvent) => {
          setFieldTouched(name);
          const eventTarget = event.target as HTMLTextAreaElement;
          onBlurAddon && eventTarget && onBlurAddon(eventTarget.value);
          onBlur(name);
        };

        const errorData = (hasError && typeof errors[name] === 'string' ? errors[name] : undefined) as
          | string
          | undefined;

        const actualValue = typeof value === 'number' || 'string' ? value : '';

        return (
          <AppField value={actualValue} onChange={handleChange} onBlur={handleBlur} error={errorData} {...otherProps} />
        );
      }}
    </Field>
  );
};

export default AppFormikField;
