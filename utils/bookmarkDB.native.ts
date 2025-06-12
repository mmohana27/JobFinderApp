import * as SQLite from 'expo-sqlite'; 

let db: SQLite.WebSQLDatabase | null = null;

/**
 * Initializes the database. Call this once when the app starts.
 */
export const initDB = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!SQLite.openDatabase) {
      console.error('❌ SQLite.openDatabase is undefined. Did you forget to install expo-sqlite? Or are you running in web?');
      return reject('SQLite unavailable');
    }

    if (!db) {
      db = SQLite.openDatabase('bookmarks.db');
      console.log("✅ Database opened");
    }

    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS bookmarks (
          id INTEGER PRIMARY KEY NOT NULL,
          job_json TEXT NOT NULL
        );`,
        [],
        () => {
          console.log("✅ Table created or already exists");
          resolve(); // ✅ Only resolve after table is created
        },
        (_, error) => {
          console.error("❌ Failed to create table", error);
          reject(error);
          return false;
        }
      );
    });
  });
};

export const addBookmark = (job: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!db) return reject(new Error('Database not initialized'));

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO bookmarks (id, job_json) VALUES (?, ?)',
        [job.id, JSON.stringify(job)],
        (_, result) => resolve(result),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export const removeBookmark = (id: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!db) return reject(new Error('Database not initialized'));

    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM bookmarks WHERE id = ?',
        [id],
        (_, result) => resolve(result),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export const isBookmarked = (id: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (!db) return reject(new Error('Database not initialized'));

    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM bookmarks WHERE id = ?',
        [id],
        (_, { rows }) => resolve(rows.length > 0),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export const getBookmarks = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    if (!db) return reject(new Error('Database not initialized'));

    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM bookmarks',
        [],
        (_, { rows }) => {
          const items = [];
          for (let i = 0; i < rows.length; i++) {
            items.push(JSON.parse(rows.item(i).job_json));
          }
          resolve(items);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}; 