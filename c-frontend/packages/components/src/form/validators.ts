//@ts-ignore
export const compose = (validators: any[]) => value => validators.reduce((error, validator) => error || validator(value), undefined);

export function required(value: any) {
    const result = ((typeof value !== 'undefined' && value !== null) ? undefined : 'Musí být vyplněno');
    if (result) {
        console.log('required validation value=' + value +' failed with result %s', value,  result);
    }
    return result;
}

export function mustBeTrue(value: any) {
    const result = ((typeof value === 'boolean' && value) ? undefined : 'Musí být vyplněno');
    if (result) {
        console.log('required validation value=' + value +' failed with result %s', value,  result);
    }
    return result;
}

export const minLength = (min: number) => (value: string) => {
    if (typeof value !== 'undefined' && value !== null && value.length > 0 ) {
        return (value.length >= min) ? undefined : `Musí mít délku větší než ${min}`;
    }
};
export const maxLength = (max: number) => (value: string) => {
    if (typeof value !== 'undefined' && value !== null && value.length > 0 ) {
        return (value.length <= max) ? undefined : `Musí mít délku menší než ${max}`;
    }
};

export const email = (value: string) => value ? ( emailIsValid(value) ? undefined : 'musí být být email') : undefined;



function emailIsValid (email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
