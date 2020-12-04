import {createSchema, Type, typedModel} from "ts-mongoose";

const binarySchema = createSchema
({
    name: Type.string( {required: true} ),
    data: Type.string( {required: true} )
});

const binaryModel = typedModel('Binary', binarySchema);

export {binaryModel, binarySchema}