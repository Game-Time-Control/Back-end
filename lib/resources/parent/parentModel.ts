import {createSchema, Type, typedModel} from "ts-mongoose";

const parentSchema = createSchema
({
    name: Type.string( {required: true} ),
    email: Type.string( {required: true}),
    password: Type.string( {required: true}),
});

const parentModel = typedModel('Parent', parentSchema);

export {parentModel, parentSchema}