import React, {useContext} from "react";
import { Field } from 'react-final-form'
import * as _validators from "./validators";
import {FormHelperText, TextField, TextFieldProps, Typography} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {AutocompleteProps} from "@material-ui/lab/Autocomplete/Autocomplete";

type OptionType = {

};
declare interface SelectProps<T = any> {
    label: string
    name: string
    options:T[],
    getOptionLabel:(item:T)=>string
    getOptionId:(item:T)=>any
    required?: boolean
}

export const FormSelect: React.FC<SelectProps> =
    ({name, label, required=false, getOptionLabel, getOptionId, options}) => {
    let lvalidators = [];
    if (required) lvalidators.push(_validators.required);

    const lValidator = _validators.compose(lvalidators);

    return (
        <Field name={name} validate={lValidator}>
            {({ input, meta }) => (
                <>
                    <Autocomplete
                        value={options.find(i=>getOptionId(i) === input.value)}
                        onChange={(event:any, values:any|any[]) => input.onChange(getOptionId(values)||null)}
                        options={options}
                        getOptionLabel={getOptionLabel}
                        renderInput={params => <TextField {...params} label={label} variant="outlined" />}
                    />
                    {meta.touched&&meta.error&&<Typography className={"MuiFormHelperText-root MuiFormHelperText-contained Mui-error"}>{meta.error}</Typography>}
                </>
            )}
        </Field>
    );
};

//





