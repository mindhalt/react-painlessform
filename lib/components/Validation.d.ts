/// <reference types="react" />
import * as React from "react";
import * as Yup from "yup";
import { IValidator } from "../ArrayValidator";
import { IErrorMessage } from "../FormValidator";
import { IFormStorage } from "../interfaces/form";
import { IValidationConfiguration, IValidationErrors, IValidationMeta } from "../interfaces/validation";
/**
 * Describes [[Validation]] props
 */
export interface IValidationProps<T> {
    /**
     * You can pass own errors via [[ValidationContext]]
     */
    errors?: IValidationErrors[];
    isValid?: boolean;
    /**
     * Function or `Yup.Schema` object that accepts form values and returns errors
     */
    validator?: IValidator<T, IValidationErrors, IValidationMeta<T>> | Yup.Schema<T>;
    /**
     * Via this prop you can configure `Yup` validation
     */
    configure?: IValidationConfiguration & Yup.ValidateOptions;
    [rest: string]: any;
}
/**
 * Describes [[ValidationContext]]
 */
export interface IValidationContext<T extends object> {
    scope: Array<IErrorMessage<any>>;
    isValid: boolean;
    mountValidation?: (validator: Validation<T>) => any;
    unMountValidation?: (validator: Validation<T>) => any;
}
export declare const Provider: React.ComponentType<React.ProviderProps<IValidationContext<any>>>, Consumer: React.ComponentType<React.ConsumerProps<IValidationContext<any>>>;
export interface IValidation<T extends object = {}> extends Validation<T> {
    new (props: IValidationProps<T>): Validation<T>;
}
/**
 * React Component that accepts [[IValidationProps]] as props
 * That component connect to [[FormContext]] and use passed `validator`, `scopeValidator`
 * to validate [[Form]] model, errors was passed via [[ValidationContext]]
 */
export declare class Validation<TModel extends object> extends React.Component<IValidationProps<TModel>, any> {
    static defaultProps: IValidationProps<any>;
    private validationContext;
    private validators;
    private _context;
    constructor(props: IValidationProps<TModel>);
    smartValidate(storage: IFormStorage<TModel>): void;
    render(): any;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private scope;
    private validate;
    /**
     * Validation function that accepts [[FormContext]] and validate [[Form]] `model`
     */
    private validator(model);
    private mountValidation;
    private unMountValidation;
}
