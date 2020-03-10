import React, {useContext} from "react";
import {Field} from 'react-final-form'
import * as _validators from "./validators";
import {TextField, TextFieldProps} from "@material-ui/core";


declare interface TextProps {
    label: string
    name: string
    minLength?: number
    maxLength?: number
    type?: 'email'|'text'|'password'|'number',

    required?: boolean

    textFieldProps?: TextFieldProps

}

export const FormText: React.FC<TextProps> =
    ({
         type = 'text', name, label, required = false, minLength, maxLength, textFieldProps
     }) => {
        let lvalidators = [];
        if (required) lvalidators.push(_validators.required);
        if (minLength) lvalidators.push(_validators.minLength(minLength));
        if (maxLength) lvalidators.push(_validators.maxLength(maxLength));

        if (type === 'email') lvalidators.push(_validators.email);

        const lValidator = _validators.compose(lvalidators);

        return (
            <Field name={name} validate={lValidator}>
                {({input, meta}) => (
                    <TextField
                        {...textFieldProps}
                        type={type}
                        label={label + (required && '*')}
                        value={input.value}
                        onChange={input.onChange}
                        fullWidth variant="outlined"
                        error={meta.touched && typeof meta.error !== 'undefined'}
                        helperText={meta.touched && meta.error}
                    />
                )}
            </Field>
        );
    };





