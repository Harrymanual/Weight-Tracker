import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('weights.db');

export const initializeDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      "create table if not exists weights (id integer primary key not null, date text, weight real);"
    );
  });
}

export const getWeights = (callback) => {
  db.transaction(tx => {
    tx.executeSql('select * from weights;', [], (_, { rows }) =>
      callback(rows._array)
    );
  });
}

export const insertWeight = (date, weight) => {
  db.transaction(tx => {
    tx.executeSql('insert into weights (date, weight) values (?, ?);', [date, weight]);
  });
}

export const updateWeight = (id, weight) => {
  db.transaction(tx => {
    tx.executeSql('update weights set weight = ? where id = ?;', [weight, id]);
  });
}

export const getWeightByDate = (date, callback) => {
    db.transaction(tx => {
      tx.executeSql('select * from weights where date = ?;', [date], (_, { rows }) =>
        callback(rows._array)
      );
    });
  };