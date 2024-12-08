import React from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

const YangiYil = () => {
  const { getProductsByCategory } = useProducts();
  const yangiYilProducts = getProductsByCategory('Yangi Yil');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#0B2441]">Yangi Yil Sovg'alari</h1>
      
      {yangiYilProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">Hozircha Yangi Yil sovg'alari mavjud emas.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {yangiYilProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default YangiYil;
