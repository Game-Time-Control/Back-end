import {createSchema, Type, typedModel} from "ts-mongoose";
import {parentSchema} from "../parent/parentModel";
import {daySchema} from "../day/dayModel";

const childSchema = createSchema
({
    name: Type.string( {required: true} ),
    parent: Type.ref( Type.objectId({required: true})).to('Parent', parentSchema),
    maxWeekTime: Type.number( {required: true}),
    days: Type.array({required: true}).of(Type.object().of(daySchema)),
    timePlayedToday: Type.number( {required: true}),
    lastDayPlayed: Type.date( {required: true}),
});

const childModel = typedModel('Child', childSchema);

export {childModel, childSchema}