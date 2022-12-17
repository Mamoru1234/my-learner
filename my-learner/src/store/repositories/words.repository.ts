import { openDbResult } from "../db.setup";
import { WordEntity } from "../entities/word.entity";

export const wordsRepository = {
  async insert(word: WordEntity) {
    const db = await openDbResult;
    await db.add('words', word);
  },

  async getByDictionary(dictionaryId: string): Promise<WordEntity[]> {
    const db = await openDbResult;
    return db.getAllFromIndex('words', 'by-dictionary', dictionaryId);
  },
};
