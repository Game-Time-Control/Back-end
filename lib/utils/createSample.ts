/* Models */
import {parentModel} from "../resources/parent/parentModel";
import {childModel} from "../resources/child/childModel";

const parentDoc = new parentModel({
    name: "Steve Jobs",
    email: "steve@teste.com",
    password: "123",
});

const childDoc = new childModel({
    name: 'Steve child',
    parentId: parentDoc,
    maxWeekTime: 3,
    maxDayTime: [0, 2, 3, 2, 0, 0, 0],
    period: [true, false],
    timePlayedToday: 1,
    lastDayPlayed: Date.now()
});

parentDoc.save().then(r => console.log("parent Saved"))

childDoc.save().then(r => console.log("Saved"))