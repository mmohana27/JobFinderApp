const STORAGE_KEY = 'bookmarked_jobs';

export const initDB = () => {
  console.log('✅ Web DB initialized using localStorage');
};

export const addBookmark = async (job: any): Promise<void> => {
  try {
    const bookmarks = await getBookmarks();
    const exists = bookmarks.find((item) => item.id === job.id);

    if (!exists) {
      bookmarks.push(job);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
      console.log('✅ Job bookmarked');
    } else {
      console.log('ℹ️ Job already bookmarked');
    }
  } catch (err) {
    console.error('❌ Error adding bookmark', err);
  }
};

export const removeBookmark = async (id: number): Promise<void> => {
  try {
    const bookmarks = await getBookmarks();
    const filtered = bookmarks.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    console.log('✅ Bookmark removed');
  } catch (err) {
    console.error('❌ Error removing bookmark', err);
  }
};

export const getBookmarks = async (): Promise<any[]> => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('❌ Error fetching bookmarks', err);
    return [];
  }
};

export const isBookmarked = async (id: number): Promise<boolean> => {
  try {
    const bookmarks = await getBookmarks();
    return bookmarks.some((item) => item.id === id);
  } catch (err) {
    console.error('❌ Error checking bookmark', err);
    return false;
  }
};
