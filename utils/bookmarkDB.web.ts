export const initDB = () => {
  console.warn('SQLite is not supported on web. Skipping DB init.');
};

export const addBookmark = (_job: any) => {
  console.warn('SQLite is not supported on web.');
};

export const removeBookmark = (_id: number) => {
  console.warn('SQLite is not supported on web.');
};

export const getBookmarks = (): Promise<any[]> => {
  return Promise.resolve([]);
};

export const isBookmarked = (_id: number): Promise<boolean> => {
  return Promise.resolve(false);
};
