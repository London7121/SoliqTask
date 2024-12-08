import { getDatabase, ref, push, set } from 'firebase/database';

export const generateUTMLink = (productId, category) => {
  return `https://power.uz/product/${productId}?utm_source=instagram&utm_medium=social&utm_campaign=product_promo&utm_content=${category}`;
};

export const createDynamicProductLink = async (productId, category) => {
  const db = getDatabase();
  const linksRef = ref(db, 'dynamicLinks');
  
  const newLinkRef = push(linksRef);
  
  await set(newLinkRef, {
    productId,
    category,
    createdAt: Date.now(),
    source: 'instagram'
  });

  return `https://power.uz/d/${newLinkRef.key}`;
};
