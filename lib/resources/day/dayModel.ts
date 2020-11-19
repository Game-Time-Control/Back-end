import {createSchema, Type, typedModel} from "ts-mongoose";

const daySchema = createSchema
({
    _id : false,
    maxTime: Type.number({required: true}),
    period: Type.array({required:true}).of(Type.boolean())
});

const dayModel = typedModel('Day', daySchema);

export {dayModel, daySchema}