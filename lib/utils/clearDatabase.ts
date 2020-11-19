import * as mongoose from "mongoose";

export async function clearDatabase(): Promise<void>
{
    await mongoose.connection.db.dropDatabase();
}