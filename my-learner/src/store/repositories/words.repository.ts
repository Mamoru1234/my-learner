import { openDbResult } from "../db.setup";

export const wordsRepository = {
  async insert() {
    const db = await openDbResult;
    const allWords = await db.getAllFromIndex('words', 'by-dictionary', 'test');
    console.log(allWords);
  },
};
