import { DBSchema, openDB } from 'idb';
import { DictionaryEntity } from './entities/dictionary.entity';
import { WordEntity } from './entities/word.entity';

export interface AppDbV1 extends DBSchema {
  dictionaries: {
    key: DictionaryEntity['id'];
    value: DictionaryEntity;
  };
  words: {
    value: WordEntity;
    key: WordEntity['id'];
    indexes: {
      'by-dictionary': WordEntity['dictionary'];
    };
  };
}

export const openDbResult = openDB<AppDbV1>('my-learner', 1, {
  upgrade: async (db) => {
    console.log('Upgrading db');
    db.createObjectStore('dictionaries', {
      keyPath: 'id',
    });
    const wordsStore = db.createObjectStore('words', {
      keyPath: 'id',
    });
    wordsStore.createIndex('by-dictionary', 'dictionary');
  },
});
