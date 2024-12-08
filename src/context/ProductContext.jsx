import React, { createContext, useState, useContext, useEffect } from 'react';
import { products } from '../data/products';
import { ayollar } from '../data/ayollar';
import yangi_yil from '../data/yangi_yil.json';
import bolalarData from '../data/bolalar.json';
import kitoblarData from '../data/kitoblar.json';
import maishiy_tex from '../data/maishiy_tex.json';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  console.log(yangi_yil);


  useEffect(() => {
    // Mahsulotlarni birlashtirish
    const combinedProducts = [
      ...yangi_yil.products.map(item => ({
        ...item,
        id: `yangi-yil-${item.id}`,
        category: 'Yangi Yil',
        categoryId: 'yangi-yil',
        price: item.price
      })),
      ...products.map(product => ({
        ...product,
        id: `products-${product.id}`,
        category: 'Erkaklar',
        categoryId: 'erkaklar',
        price: product.price || parseInt(product.job_name?.replace(/\D/g, '') || '0')
      })),
      ...ayollar.map(item => ({
        ...item,
        id: `ayollar-${item.id}`,
        category: 'Ayollar',
        categoryId: 'ayollar',
        price: parseInt(item.job_name?.replace(/\D/g, '') || '0')
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
      ...maishiy_tex.products.map(item => ({
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
        name: 'Yangi Yil'
      },
      {
        id: 'erkaklar',
        name: 'Erkaklar'
      },
      {
        id: 'ayollar',
        name: 'Ayollar'
      },
      {
        id: 'bolalar',
        name: 'Bolalar'
      },
      {
        id: 'kitoblar',
        name: 'Kitoblar'
      },
      {
        id: 'maishiy-texnika',
        name: 'Maishiy Texnika'
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
