import {createSchema, Type, typedModel} from "ts-mongoose";
import {childSchema} from "../child/childModel";
import {daySchema} from "../day/dayModel";

const gameSchema = createSchema
({
    name: Type.string( {required: true} ),
    child: Type.ref( Type.objectId({required: true})).to('Child', childSchema),
    computer: Type.string( {required: true} ),
    maxWeekTime: Type.number( {required: true}),
    days: Type.array({required: true}).of(Type.object().of(daySchema)),
    timePlayedToday: Type.number( {required: true}),
    lastDayPlayed: Type.date( {required: true}),
});

const gameModel = typedModel('Game', gameSchema);

export {gameModel, gameSchema}