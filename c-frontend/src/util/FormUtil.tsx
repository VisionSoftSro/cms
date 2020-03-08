import {exist} from "./Exist";
import _ from 'lodash';
type GenericMap = {
    [key:string]:string
}
type jsonToFormDataType = {
    dataConverter?:(key:string, value:any)=>any
    skipNull?:boolean
};
export const jsonToFormUrlEncoded = (json:GenericMap, userOptions?:jsonToFormDataType) => {
    let formData = [] as string[];
    jsonTo({set:(name, value)=>{
            const encodedKey = encodeURIComponent(name);
            const encodedValue = encodeURIComponent(value);
            formData.push(encodedKey + "=" + encodedValue);
        }}, json, userOptions);
    return formData.join("&");
};
export const jsonToFormData = (json:GenericMap, userOptions?:jsonToFormDataType):FormData => {
    const formData = new FormData();
    jsonTo({set:(name, value)=>formData.set(name, value)}, json, userOptions);
    return formData;
};

export const jsonTo = ({set}:{set:(name:string, value:any)=>void}, json:GenericMap, userOptions?:jsonToFormDataType) => {
    const defaultOptions:jsonToFormDataType = {dataConverter:(key, value)=>value, skipNull:true};
    const {dataConverter, skipNull} = _.merge(defaultOptions, userOptions);
    Object.keys(json).forEach(e=>{
        const value = json[e];
        if(exist(value)) {
            const resultValue = dataConverter(e, value);
            if(resultValue !== null || !skipNull) {
                if(Array.isArray(resultValue)) {
                    for (let i = 0; i < resultValue.length; i++) {
                        let o = resultValue[i];
                        if(typeof o === "object") {
                            Object.keys(o).forEach(oe => {
                                set(`${e}[${i}].${oe}`, dataConverter(oe, o[oe]));
                            })
                        } else {
                            set(`${e}[${i}]`, o);
                        }
                    }
                    set(`${e}_length`, resultValue.length.toString())
                } else if(typeof resultValue === "object") {
                    jsonTo({set:(name, value) => {
                            set(`${e}.${name}`, value);
                        }}, resultValue);
                } else {
                    set(e, resultValue);
                }
            }
        }
    });
};
