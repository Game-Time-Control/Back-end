import { createSchema, Type, typedModel } from 'ts-mongoose';

const childSchema = createSchema
({
    name: Type.string( {required:true} ),
    parentId: Type.number( {required:true} )
});

const ChildModel = typedModel('Child', childSchema)
export {ChildModel, childSchema}
