import * as React from "react";
import { isArray, isNumber } from "util";
import * as Yup from "yup";

export function deepExtend(destination, source) {
    if (Array.isArray(destination)) {
        destination.length = 0;
        destination.push.apply(destination, source);
        return;
    }
    for (const property in source) {
        if (typeof source[property] === "object"
            && source[property] !== null
            && !Array.isArray(source[property])) {

            destination[property] = { ...destination[property] } || {};
            this.deepExtend(destination[property], source[property]);
        } else if (source[property] !== "__delete__") {
            destination[property] = source[property];
        } else {
            delete destination[property];
        }
    }
}

export function isArrayEqual(array0: any[], array1: any[]) {
    if (!Array.isArray(array0) || !Array.isArray(array1)) {
        return array0 === array1;
    }
    if (array0.length !== array1.length) {
        return false;
    }
    return !array0.some((element, index) => {
        return element !== array1[index];
    });
}

export function isInputChangeEvent(object): object is React.ChangeEvent<HTMLInputElement> {
    return "target" in object;
}

export function isSelectChangeEvent(object): object is React.ChangeEvent<HTMLSelectElement> {
    return "target" in object && "options" in object.target;
}

export function isYup(object): object is Yup.Schema<any> {
    return "validateSync" in object;
}

export function getFromObject(object, keys: string | string[], defaultVal = null): any {
    keys = Array.isArray(keys) ? keys : keys.replace(/(\[(\d)\])/g, ".$2").split(".");
    object = object[keys[0]];
    if (object && keys.length > 1) {
        return getFromObject(object, keys.slice(1), defaultVal);
    }
    return object === undefined ? defaultVal : object;
}

export function fromProxy<TModel, TValue>(proxy: TModel, selector: (model: TModel) => TValue, defaultValue?): TValue {
    const value = selector(proxy);
    const bval = typeof value === "object" && (!isArray(value) || (value as any).length === 0)
        && value[Symbol("util.inspect.custom")] !== undefined
        ? defaultValue
        : value;
    // console.log(proxy);
    // console.log(value, bval);
    return bval;
}

export function autoCreateProxy<T extends object>(model: T): T {
    return new Proxy(model, {
        get(target, prop) {
            let selectedVal = target[prop];
            if (selectedVal === undefined) {
                selectedVal = {};
            }
            if (typeof selectedVal === "object") {
                return autoCreateProxy(selectedVal);
            }
            return selectedVal;
        }
    });
}

export function getPath(selector: (obj) => any, data) {
    let path = "";
    const proxyFactory = object => new Proxy(object, {
        get(target, prop) {
            if (prop === undefined) {
                return {};
            }
            path += !isNaN(prop.toString() as any)
                ? `[${prop}]`
                : path === ""
                    ? `${prop}`
                    : `.${prop}`;

            let selectedVal = target[prop];
            if (selectedVal === undefined) {
                selectedVal = {};
            }
            if (typeof selectedVal === "object") {
                return proxyFactory(selectedVal);
            } else {
                return selectedVal;
            }
        }
    });
    selector(proxyFactory(data));
    return path;
}

export function setPathValue(selector: (obj) => any, data, value: any) {
    let lastProperty: PropertyKey = "";
    let lastParent;
    // console.log(data);
    let path = "";
    const proxyFactory = object => new Proxy(object, {
        get(target, prop) {
            path += "." + prop.toString();
            if (prop === undefined) {
                return undefined;
            }
            const newTarget = lastParent
                ? !isNaN(prop.toString() as any) ? [...(isArray(target) ? target : [])] : { ...target }
                : target;
            if (lastParent) {
                lastParent[lastProperty] = newTarget;
            }
            lastProperty = prop;
            lastParent = newTarget;
            if (newTarget[prop] === undefined) {
                newTarget[prop] = {};
            }
            if (typeof newTarget[prop] === "object") {
                return proxyFactory(newTarget[prop]);
            } else {
                return newTarget[prop];
            }
        }
    });
    selector(proxyFactory(data));
    if (value === undefined) {
        delete lastParent[lastProperty];
    } else {
        lastParent[lastProperty] = value;
    }
    // console.log(path, value);
    // console.log(data);
}
