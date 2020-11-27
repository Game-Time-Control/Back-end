/* Models */
import {parentModel} from "../resources/parent/parentModel";
import {childModel} from "../resources/child/childModel";
import {gameModel} from "../resources/game/gameModel";
import {dayModel} from "../resources/day/dayModel";

const parentDoc = new parentModel(
{
    name: "Luiz",
    email: "luiz@gmail.com",
    password: "123456789",
});

let tempPeriod = []
for(let i=0;i<48;i++){
    tempPeriod[i] = true;
}

const sunday = new dayModel(
{
    maxTime: 2,
    period: tempPeriod
});

const monday = new dayModel(
{
    maxTime: 1,
    period: tempPeriod
});

const tuesday = new dayModel(
{
    maxTime: 1,
    period: tempPeriod
});

const wednesday = new dayModel(
{
    maxTime: 0,
    period: tempPeriod
});

const thursday = new dayModel(
{
    maxTime: 1,
    period: tempPeriod
});

const friday = new dayModel(
{
    maxTime: 1,
    period: tempPeriod
});

const saturday = new dayModel(
{
    maxTime: 2,
    period: tempPeriod
});

const childDoc = new childModel(
{
    name: 'Enzo',
    parent: parentDoc,
    maxWeekTime: 12,
    days : [sunday, monday, tuesday, wednesday, thursday, friday, saturday],
    timePlayedToday: 1,
    lastDayPlayed: Date.now()
});

const gameDoc = new gameModel({
    name: 'Valorant',
    child: childDoc,
    computer: 'Leopard',
    maxWeekTime: 9,
    days: [sunday, monday, tuesday, wednesday, thursday, friday, saturday],
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
