import {createSchema, Type, typedModel} from "ts-mongoose";
import {parentSchema} from "../parent/parentModel";

const childSchema = createSchema
({
    name: Type.string( {required: true} ),
    parentId: Type.ref( Type.objectId({required: true})).to('Parent', parentSchema),
    maxWeekTime: Type.number( {required: true}),
    maxDayTime: Type.array({ required: true }).of(Type.number({required: true})),
    period: Type.array({ required: true }).of(Type.boolean({required: true})),
    timePlayedToday: Type.number( {required: true}),
    lastDayPlayed: Type.date( {required: true}),
});

const childModel = typedModel('Child', childSchema);

export {childModel, childSchema}