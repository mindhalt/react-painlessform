/// <reference types="react" />
import * as React from "react";
import { IFormState } from "./Form";
export interface IFieldProps<T> {
    name: string;
    value?: any;
    formState?: IFormState;
    validationErrors?: string[];
    onClick?: () => any;
    onChange?: (field: string, value) => any;
    children?: ((state: IFieldState) => React.ReactNode) | React.ReactNode;
}
export interface IFieldState {
    name: string;
    value: any;
    validationErrors?: string[];
    isVisited: boolean;
    isValid?: boolean;
    onClick: () => any;
    onChange: (value: any | React.ChangeEvent<HTMLInputElement>) => any;
}
export declare const Provider: React.ComponentClass<{
    value: {};
}>, Consumer: React.ComponentClass<{
    children?: (context: {}) => React.ReactNode;
}>;
export declare class FieldClass<T> extends React.Component<IFieldProps<T>, IFieldState> {
    private static getDerivedStateFromProps({validationErrors: nextErrors, value: nextValue, name}, {value: prevValue, validationErrors: prevValidationErrors});
    constructor(props: IFieldProps<T>);
    render(): JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(prevProps: IFieldProps<T>, prevState: IFieldState): void;
    shouldComponentUpdate(nextProps: IFieldProps<T>, nextState: IFieldState): boolean;
    private onClick;
    private handleChange;
    private update;
}
export declare function withFormState(Component: any): <T>(props: Pick<IFieldProps<T>, "children" | "name" | "onChange" | "onClick">) => JSX.Element;
export declare const Field: <T>(props: Pick<IFieldProps<T>, "children" | "name" | "onChange" | "onClick">) => JSX.Element;
