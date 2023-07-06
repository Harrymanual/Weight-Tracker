import { SQLite } from 'expo-sqlite';

const db = SQLite.openDatabase('mydb.db');

const setupDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS weight_entries (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, weight REAL);',
      [],
      () => console.log('Success'),
      (_, error) => console.log('Error: ', error)
    );
  });
};

export { db, setupDatabase };