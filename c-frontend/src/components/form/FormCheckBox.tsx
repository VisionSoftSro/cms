import React, {useContext} from "react";
import { Field } from 'react-final-form'
import * as _validators from "./validators";
import {Checkbox, FormControlLabel, FormHelperText, TextField, TextFieldProps, Typography} from "@material-ui/core";


interface CheckBoxProps {
    label: string
    name: string
    mustChecked?: boolean
}
export const FormCheckBox: React.FC<CheckBoxProps> =
    ({label, name, mustChecked}) => {
    let lvalidators = [];
    if (mustChecked) lvalidators.push(_validators.mustBeTrue);
    const lValidator = _validators.compose(lvalidators);
    return (
        <Field name={name} validate={lValidator}>
            {({ input, meta }) => (
                <>
                    <FormControlLabel
                        control={
                            (
                                <Checkbox  checked={input.value === true} onChange={input.onChange} />
                            )
                        }
                        label={label}
                    />
                    {
                        //TODO zjistit proc nefunguje FormTextHelper
                    }
                    {meta.touched&&meta.error&&<Typography className={"MuiFormHelperText-root MuiFormHelperText-contained Mui-error"}>{meta.error}</Typography>}
                </>
            )}
        </Field>
    );
};





