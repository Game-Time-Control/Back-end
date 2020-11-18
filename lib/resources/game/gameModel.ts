import {createSchema, Type, typedModel} from "ts-mongoose";
import {childSchema} from "../child/childModel";

const gameSchema = createSchema
({
    name: Type.string( {required: true} ),
    child: Type.ref( Type.objectId({required: true})).to('Child', childSchema),
    computer: Type.string( {required: true} ),
    maxWeekTime: Type.number( {required: true}),
    maxDayTime: Type.array({ required: true }).of(Type.number({required: true})),
    period: Type.array({ required: true }).of(Type.boolean({required: true})),
    timePlayedToday: Type.number( {required: true}),
    lastDayPlayed: Type.date( {required: true}),
});

const gameModel = typedModel('Game', gameSchema);

export {gameModel, gameSchema}