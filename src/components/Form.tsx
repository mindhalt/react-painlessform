import * as React from "react";
import shallowequal = require("shallowequal");
import { IValidator } from "../ArrayValidator";
import { FormErrors } from "../FormValidator";
import { mergeFormErrors } from "../tools";

export interface IFormProps<T> extends React.FormHTMLAttributes<HTMLFormElement> {
    values?: Partial<T>;
    onModelChange?: (nextModel: T, prevModel: T) => any;
    onReset?: () => any;
    [rest: string]: any;
}

export interface IFormState {
    model: any;
    isSubmitting: boolean;
    handleReset: () => any;
    handleChange: (field: string, value: any) => any;
}

export const { Provider, Consumer } = React.createContext<IFormState>();
const EmptyModel = {};

export class Form<T = {}> extends React.Component<IFormProps<T>, IFormState> {
    static getDerivedStateFromProps(props: IFormProps<any>, state: IFormState) {
        const { values } = props;
        let nextState = null;

        nextState = {
            model: values ? values : state.model,
        };

        return nextState;
    }

    constructor(props: IFormProps<T>) {
        super(props);

        this.state = {
            model: EmptyModel,
            isSubmitting: false,
            handleReset: this.handleReset,
            handleChange: this.handleChange,
        };
    }

    shouldComponentUpdate(nextProps: IFormProps<T>, nextState: IFormState) {
        const { model, ...rest } = this.state;
        const { model: nextModel, ...nextRest } = nextState;
        if (
            !shallowequal(this.props, nextProps)
            || !shallowequal(model, nextModel)
            || !shallowequal(rest, nextRest)
        ) {
            return true;
        }
        return false;
    }

    componentDidUpdate(prevProps: IFormProps<any>, prevState: IFormState) {
        if (
            this.props.onModelChange
            && !shallowequal(this.state.model, prevState.model)
        ) {
            this.props.onModelChange(this.state.model, prevState.model);
        }
    }

    render() {
        const {
            componentId,
            children,
            onModelChange,
            onSubmit,
            ...rest,
        } = this.props;

        return (
            <Provider value={this.state}>
                <form onSubmit={this.handleSubmit} {...rest}>
                    {children}
                </form>
            </Provider>
        );
    }

    private handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const { onSubmit } = this.props;
        if (onSubmit) {
            onSubmit(event);
        }
    }

    private handleReset = () => {
        const { onReset } = this.props;
        if (onReset) {
            onReset();
        }
        if (!this.props.values) {
            this.setState({
                model: EmptyModel,
            });
        }
    }

    private handleChange = (field: string, value: any) => {
        if (this.props.values) {
            const { model } = this.state;
            if (model[field] === value) {
                return;
            }
            const nextModel = {
                ...model,
                [field]: value,
            };
            this.props.onModelChange(nextModel, this.state.model);
            return;
        }

        this.setState((prev, props) => {
            if (prev.model[field] === value) {
                return null;
            }
            const nextModel = {
                ...prev.model,
                [field]: value,
            };

            return {
                model: nextModel,
            };
        });
    }
}
