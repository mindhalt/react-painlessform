"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Field_1 = require("../components/Field");
const Form_1 = require("../components/Form");
const Scope_1 = require("../components/Scope");
const Subscribe_1 = require("../components/Subscribe");
const Transform_1 = require("../components/Transform");
const Validation_1 = require("../components/Validation");
/**
 * Used for typings [[Form]], [[Field]], [[Transform]], [[Validation]]
 * and their contexts with `model` type
 */
function createFormFactory() {
    return {
        Form: Form_1.Form,
        Field: Field_1.Field,
        Transform: Transform_1.Transform,
        Validation: Validation_1.Validation,
        Scope: Scope_1.Scope,
        Subscribe: Subscribe_1.Subscribe,
        FormContext: Form_1.Consumer,
        FieldContext: Field_1.Consumer,
        TransformContext: Transform_1.Consumer,
        ValidationContext: Validation_1.Consumer,
        ScopeContext: Scope_1.Consumer,
        SubscribeContext: Subscribe_1.Consumer
    };
}
exports.createFormFactory = createFormFactory;
//# sourceMappingURL=formFactory.js.map