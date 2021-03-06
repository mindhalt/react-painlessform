import "./styles.css";
import React from "react";
import { render } from "react-dom";
import { createFormFactory } from "react-painlessform";
import classnames from "classnames";

const { Field, Form, FormContex } = createFormFactory();

class MyForm extends React.Component {
  render() {
    return (
      <Form onReset={this.handleReset} onSubmit={this.handleSubmit}>
        <Field name={f => f.user.firstName}>
          {({ inputHook }) => (
            <div className={"input-group"}>
              <label className="label" htmlFor={inputHook.name}>First Name</label>
              <input className="text-input" placeholder="John" id={inputHook.name} {...inputHook} />
            </div>
          )}
        </Field>
        <Field name={f => f.user.lastName}>
          {({ inputHook }) => (
            <div className={"input-group"}>
              <label className="label" htmlFor={inputHook.name}>Last Name</label>
              <input className="text-input" placeholder="Doe" id={inputHook.name} {...inputHook} />
            </div>
          )}
        </Field>
        <Field name={f => f.email} type="email">
          {({ inputHook }) => (
            <div className={"input-group"}>
              <label className="label" htmlFor={inputHook.name}>Email</label>
              <input className="text-input" placeholder="Enter your email" id={inputHook.name} {...inputHook} />
            </div>
          )}
        </Field>
        <Field name={f => f.agree} type="checkbox">
          {({ inputHook }) => (
            <div className={"input-group"}>
              <input {...inputHook} id={inputHook.name} />
              <label htmlFor={inputHook.name}>I agree with terms</label>
            </div>
          )}
        </Field>
        <button type="reset" className="outline">Reset</button>
        <button type="submit">Submit</button>
      </Form>
    );
  }
  handleReset = () => { };
  handleSubmit = event => model => console.log(model);
}

const App = () => (
  <div className="app">
    <h3>
      Building input primitives with{" "}
      <a href="https://github.com/Wroud/react-painlessform">Painless Form</a>
    </h3>
    <p>
      Example shows how create simple form.
    </p>
    <MyForm />
  </div>
);

render(<App />, document.getElementById("root"));
