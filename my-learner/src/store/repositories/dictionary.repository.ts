import { openDbResult } from "../db.setup";
import { DictionaryEntity } from "../entities/dictionary.entity";

export const dictionaryRepository = {
  async insert(entity: DictionaryEntity): Promise<void> {
    const db = await openDbResult;
    await db.add('dictionaries', entity);
  },
  
  async getById(id: DictionaryEntity['id']): Promise<DictionaryEntity> {
    const db = await openDbResult;
    const value = await db.get('dictionaries', id) as DictionaryEntity;
    return {
      ...value,
      id,
    };
  },

  async delete(id: string): Promise<void> {
    const db = await openDbResult;
    await db.delete('dictionaries', id);
  },

  async getAll(): Promise<DictionaryEntity[]> {
    const db = await openDbResult;
    return db.getAll('dictionaries');
  }
};
