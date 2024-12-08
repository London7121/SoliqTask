import { getDatabase, ref, get } from 'firebase/database';

export const resolveDynamicLink = async (linkId) => {
  const db = getDatabase();
  const linkRef = ref(db, `dynamicLinks/${linkId}`);
  
  try {
    const snapshot = await get(linkRef);
    if (snapshot.exists()) {
      const linkData = snapshot.val();
      return `/product/${linkData.productId}`;
    }
    return null;
  } catch (error) {
    console.error("Link resolve qilishda xatolik:", error);
    return null;
  }
};
