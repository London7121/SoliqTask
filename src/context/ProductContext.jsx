import React, { createContext, useContext, useState, useEffect } from 'react';
import allProductsData from '../data/allProducts.json';

// Kategoriyalarni ma'lumotlar asosida shakllantirish
const defaultCategories = [
  {
    id: 'erkaklar', 
    name: "Erkaklar",
    icon: '👔'
  },
  {
    id: 'ayollar', 
    name: "Ayollar",
    icon: '👗'
  },
  {
    id: 'bolalar', 
    name: "Bolalar",
    icon: '👶'
  },
  {
    id: 'maishiyTexnika', 
    name: "Maishiy Texnika",
    icon: '🔧'
  },
  {
    id: 'kitoblar', 
    name: "Kitoblar",
    icon: '📚'
  }
];

// Mahsulotlarni ma'lumotlar asosida shakllantirish
const getDefaultProducts = () => {
  const allProducts = Object.values(allProductsData).flat().map(product => ({
    ...product,
    language: 'uz',
    images: [product.image].filter(Boolean)
  }));

  return allProducts;
};

const processProducts = (rawProducts) => {
  return rawProducts.map(product => {
    // Agar name ob'ekt bo'lmasa, multilingual formatga o'tkazamiz
    const processedName = typeof product.name === 'string' 
      ? { uz: product.name, ru: product.name } 
      : product.name || { uz: 'Nomi ko\'rsatilmagan', ru: 'Не указано' };

    return {
      ...product,
      name: processedName,
      price: product.price || 0,  // Default price to 0 if undefined
      images: (product.images && product.images.length > 0) 
        ? product.images 
        : [product.image].filter(Boolean),  // Ensure at least one image
      description: product.description || 'Tavsif yo\'q',  // Default description
      categoryId: product.categoryId || 'boshqa',  // Default category
      language: product.language || 'uz'  // Default language
    };
  });
};

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  // Til sozlamalari
  const [language, setLanguage] = useState(() => {
    // Agar localStorage da til saqlangan bo'lsa, uni olish
    const storedLanguage = localStorage.getItem('language') || sessionStorage.getItem('language');
    return storedLanguage || 'uz'; // Agar hech narsa saqlanmagan bo'lsa, default o'zbekcha
  });

  // localStorage va sessionStorage dan kategoriyalar va mahsulotlarni olish
  const [categories, setCategories] = useState(() => {
    const storedCategories = localStorage.getItem('categories') || sessionStorage.getItem('categories');
    return storedCategories ? JSON.parse(storedCategories) : defaultCategories;
  });

  const [products, setProducts] = useState(() => {
    const storedProducts = localStorage.getItem('products') || sessionStorage.getItem('products');
    return storedProducts ? processProducts(JSON.parse(storedProducts)) : processProducts(getDefaultProducts());
  });

  // Kategoriyalar va mahsulotlarni localStorage va sessionStorage ga saqlash
  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
    sessionStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
    sessionStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  // Til o'zgaruvchisini localStorage ga saqlash
  useEffect(() => {
    localStorage.setItem('language', language);
    sessionStorage.setItem('language', language);
  }, [language]);

  // Til o'zgartirish funksiyasi
  const changeLanguage = (newLanguage) => {
    if (['uz', 'ru'].includes(newLanguage)) {
      setLanguage(newLanguage);
    }
  };

  // Til bo'yicha nom olish funksiyasi
  const getLocalizedName = (item) => {
    if (typeof item.name === 'object') {
      return item.name[language] || item.name['uz'] || '';
    }
    return item.name || '';
  };

  const addProduct = (newProduct) => {
    // Agar name ob'ekt bo'lmasa, multilingual formatga o'tkazamiz
    const processedProduct = {
      ...newProduct,
      id: newProduct.id || Date.now().toString(),
      name: newProduct.name || 'Nomi kiritilmagan',
      description: newProduct.description || '',
      price: parseFloat(newProduct.price) || 0,
      categoryId: newProduct.categoryId || '',
      images: newProduct.images || [],
      icon: newProduct.icon,
      language: newProduct.language || 'uz'  // Default to Uzbek if no language specified
    };

    // Agar kategoriya mavjud bo'lmasa, kategoriyalar ro'yxatiga qo'shamiz
    if (newProduct.categoryId && !categories.some(cat => cat.id === newProduct.categoryId)) {
      addCategory({
        id: newProduct.categoryId,
        name: newProduct.categoryName || 'Kategoriya',
        icon: '📦'
      });
    }

    // Agar mahsulot allaqachon mavjud bo'lsa, uni yangilaymiz
    const existingProductIndex = products.findIndex(p => p.id === processedProduct.id);

    if (existingProductIndex !== -1) {
      setProducts(prevProducts => {
        const updatedProducts = [...prevProducts];
        updatedProducts[existingProductIndex] = processedProduct;
        
        // localStorage hajmini tekshirish va cheklash
        try {
          localStorage.setItem('products', JSON.stringify(updatedProducts));
          sessionStorage.setItem('products', JSON.stringify(updatedProducts));
        } catch (error) {
          if (error instanceof DOMException && error.name === 'QuotaExceededError') {
            // localStorage to'lib ketgan bo'lsa, eng eski mahsulotlarni o'chirib tashlash
            const trimmedProducts = updatedProducts.slice(-50);
            localStorage.setItem('products', JSON.stringify(trimmedProducts));
            sessionStorage.setItem('products', JSON.stringify(trimmedProducts));
          }
        }
        
        return updatedProducts;
      });
    } else {
      setProducts(prevProducts => {
        const updatedProducts = [...prevProducts, processedProduct];
        
        // localStorage hajmini tekshirish va cheklash
        try {
          localStorage.setItem('products', JSON.stringify(updatedProducts));
          sessionStorage.setItem('products', JSON.stringify(updatedProducts));
        } catch (error) {
          if (error instanceof DOMException && error.name === 'QuotaExceededError') {
            // localStorage to'lib ketgan bo'lsa, eng eski mahsulotlarni o'chirib tashlash
            const trimmedProducts = updatedProducts.slice(-50);
            localStorage.setItem('products', JSON.stringify(trimmedProducts));
            sessionStorage.setItem('products', JSON.stringify(trimmedProducts));
          }
        }
        
        return updatedProducts;
      });
    }
  };

  const addCategory = (category) => {
    const newCategory = {
      id: category.id || category.name.toLowerCase().replace(/\s+/g, '-'),
      name: category.name,
      icon: category.icon || '📦'
    };

    setCategories(prevCategories => {
      // Agar kategoriya allaqachon mavjud bo'lsa, uni yangilaymiz
      const existingCategoryIndex = prevCategories.findIndex(c => c.id === newCategory.id);
      
      let updatedCategories;
      if (existingCategoryIndex !== -1) {
        updatedCategories = [...prevCategories];
        updatedCategories[existingCategoryIndex] = newCategory;
      } else {
        updatedCategories = [...prevCategories, newCategory];
      }
      
      // localStorage hajmini tekshirish va cheklash
      try {
        localStorage.setItem('categories', JSON.stringify(updatedCategories));
        sessionStorage.setItem('categories', JSON.stringify(updatedCategories));
      } catch (error) {
        if (error instanceof DOMException && error.name === 'QuotaExceededError') {
          // localStorage to'lib ketgan bo'lsa, eng eski kategoriyalarni o'chirib tashlash
          const trimmedCategories = updatedCategories.slice(-20);
          localStorage.setItem('categories', JSON.stringify(trimmedCategories));
          sessionStorage.setItem('categories', JSON.stringify(trimmedCategories));
        }
      }
      
      return updatedCategories;
    });
  };

  const deleteProduct = (productId) => {
    setProducts(prevProducts => 
      prevProducts.filter(product => product.id !== productId)
    );
  };

  const deleteCategory = (categoryId) => {
    setCategories(prevCategories => 
      prevCategories.filter(category => category.id !== categoryId)
    );
  };

  return (
    <ProductContext.Provider 
      value={{ 
        products, 
        categories, 
        addProduct, 
        deleteProduct,
        addCategory,
        deleteCategory,
        language,
        changeLanguage,
        getLocalizedName
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
