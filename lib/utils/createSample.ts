/* Models */
import {parentModel} from "../resources/parent/parentModel";
import {childModel} from "../resources/child/childModel";
import {gameModel} from "../resources/game/gameModel";

const parentDoc = new parentModel(
{
    name: "Luiz",
    email: "luiz@gmail.com",
    password: "123456789",
});

const childDoc = new childModel(
{
    name: 'Enzo',
    parent: parentDoc,
    maxWeekTime: 12,
    maxDayTime: [],
    period: [true, false],
    timePlayedToday: 1,
    lastDayPlayed: Date.now()
});

const gameDoc = new gameModel({
    name: 'Valorant',
    child: childDoc,
    computer: 'Leopard',
    maxWeekTime: 9,
    maxDayTime: [2, 1, 1, 1, 1, 1, 2],
    period: [true, false],
    timePlayedToday: 1,
    lastDayPlayed: Date.now()
});

export async function createSample(): Promise<void>
{
    await parentDoc.save();
    console.log("Parent Saved");
    
    await childDoc.save();
    console.log("Child Saved");
    
    await gameDoc.save();
    console.log("Game Saved");
}
