import React, { createContext, useState, useContext, useEffect } from 'react';
import { ayollar } from '../data/JS/ayollar';
import {yangi_yil} from '../data/JS/yangi_yil';
import bolalarData from '../data/bolalar.json';
import kitoblarData from '../data/kitoblar.json';
import {maishiy_tex} from '../data/JS/maishiy_tex';
import { erkaklar } from '../data/JS/erkaklar';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  console.log(yangi_yil);


  useEffect(() => {
    // Mahsulotlarni birlashtirish
    const combinedProducts = [
      ...yangi_yil.map(item => ({
        ...item,
        id: `yangi-yil-${item.id}`,
        category: 'Yangi Yil',
        categoryId: 'yangi-yil',
        price: item.price || parseInt(item.job_name?.replace(/\D/g, '') || '0'),
        icon: item.icon || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTY_Mhafa-o6-RwLNsiw8PwXspog-M_WP0Tw&s'
      })),
      ...ayollar.map(item => ({
        ...item,
        id: `ayollar-${item.id}`,
        category: 'Ayollar',
        categoryId: 'ayollar',
        price: parseInt(item.price || '0')
      })),
      ...erkaklar.map(item => ({
        ...item,
        id: `ayollar-${item.id}`,
        category: 'Erkaklar',
        categoryId: 'erkaklar',
        price: parseInt(item.price || '0')
      })),
      ...bolalarData.products.map(item => ({
        ...item,
        id: `bolalar-${item.id}`,
        category: 'Bolalar',
        categoryId: 'bolalar',
        price: item.price
      })),
      ...kitoblarData.products.map(item => ({
        ...item,
        id: `kitoblar-${item.id}`,
        category: 'Kitoblar',
        categoryId: 'kitoblar',
        price: item.price
      })),
      ...maishiy_tex.map(item => ({
        ...item,
        id: `maishiy-tex-${item.id}`,
        category: 'Maishiy Texnika',
        categoryId: 'maishiy-texnika',
        price: item.price
      }))
    ];

    setAllProducts(combinedProducts);

    // Kategoriyalarni yaratish
    const uniqueCategories = [
      {
        id: 'yangi-yil',
        name: 'Yangi Yil',
        icon: 'https://static.review.uz/crop/1/6/1400__100_1697911004.jpg?v=1640014768'
      },
      {
        id: 'erkaklar',
        name: 'Erkaklar',
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqeESJnQLv8iz2MLkmYJUt9143e6aCgMs2Hg&s'
      },
      {
        id: 'ayollar',
        name: 'Ayollar',
        icon: 'https://olcha.uz/image/700x700/products/ROZ7LOVrAqeWBUUoO5mnFFGNAzeYKtfCwZm2q0kxhghdmpdxlmFMJciOjXH9.jpg'
      },
      {
        id: 'bolalar',
        name: 'Bolalar',
        icon: 'https://storage.kun.uz/source/7/QIadYO5buIleDHqqPMPABSx5HJ-7zr-W.jpg'
      },
      {
        id: 'kitoblar',
        name: 'Kitoblar',
        icon: 'https://rost24.uz/storage/72/b3/2a/57/conversions/unnamed-large.jpg'
      },
      {
        id: 'maishiy-texnika',
        name: 'Maishiy Texnika',
        icon: 'https://domtut.uz/resources/uploads/post/top-10-internet-magazinov-bytovoy-tehniki-v-tashkente.jpg'
      }
    ];

    setCategories(uniqueCategories);
  }, []);

  const getLocalizedName = (product) => {
    return product.name || product.title || '';
  };

  const getLocalizedDescription = (product) => {
    return product.description || '';
  };

  const getProductById = (productId) => {
    return allProducts.find(product => product.id === productId);
  };

  const getProductsByCategory = (categoryName) => {
    return allProducts.filter(product =>
      product.category.toLowerCase() === categoryName.toLowerCase()
    );
  };
  console.log(allProducts);


  return (
    <ProductContext.Provider
      value={{
        products: allProducts,
        categories,
        getLocalizedName,
        getLocalizedDescription,
        getProductById,
        getProductsByCategory
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
