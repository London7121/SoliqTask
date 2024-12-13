import { getDatabase, ref, push, set } from 'firebase/database';
import { database } from '../services/firebaseConfig';

export const createInstagramProductLink = async () => {
  try {
    const linksRef = ref(database, 'dynamicLinks');
    const newLinkRef = push(linksRef);
    
    await set(newLinkRef, {
      productId: 'OYINCHOQ_MASHINA_001',
      category: 'bolalar',
      name: 'Qizil Elektr Oyinchoq Mashina',
      price: 150000,
      createdAt: Date.now(),
      source: 'instagram'
    });

    // Localhost uchun link
    const dynamicLink = `http://localhost:3000/d/${newLinkRef.key}`;
    
    const postText = `
🚗 Bolangiz uchun ENG ZO'R SOVG'A! 

🔥 Qizil Elektr Oyinchoq Mashina
💰 Narxi: 150,000 so'm

📱 Mahsulotni ko'rish uchun havolaga bosing:
${dynamicLink}

#OyinchoqMashina #BalalarUchunSovga #PowerUz
    `;


    return { dynamicLink, postText };
  } catch (error) {
    console.error('Link yaratishda xatolik:', error);
    return null;
  }
};

createInstagramProductLink();
