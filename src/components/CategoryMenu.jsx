import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';
import { useProducts } from '../context/ProductContext';
import { useLanguage } from '../context/LanguageContext';

const CategoryMenu = () => {
  const navigate = useNavigate();
  const { categories } = useProducts();
  const { t, currentLanguage } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleCategoryClick = (categoryPath) => {
    navigate(categoryPath);
    setIsHovered(false);
    setDrawerVisible(false);
  };

  const getCategoryName = (category) => {
    if (typeof category.name === 'object' && category.name[currentLanguage]) {
      return category.name[currentLanguage];
    }
    return category.name;
  };

  const menuItems = categories.map((category) => ({
    key: category.id,
    icon: <span className="text-xl mr-2">{category.icon}</span>,
    label: (
      <Menu.Item onClick={() => handleCategoryClick(`/${category.id}`)}>
        {getCategoryName(category)}
      </Menu.Item>
    ),
  }));

  const menuProps = {
    items: menuItems,
    style: {
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
  };

  return (
    <Dropdown 
      menu={menuProps}
      trigger={['hover', 'click']}
      onOpenChange={(visible) => setIsHovered(visible)}
    >
      <button 
        className={`
          flex items-center gap-2 
          px-4 py-2 
          rounded-lg 
          text-[#2189FF] 
          border border-[#2189FF] 
          transition-all 
          duration-300 
          ${isHovered ? 'shadow-md' : ''}
        `}
      >
        {t('categories')}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`
            h-5 w-5 
            transition-transform 
            duration-300 
            ${isHovered ? 'rotate-180' : ''}
          `} 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
            clipRule="evenodd" 
          />
        </svg>
      </button>
    </Dropdown>
  );
};

export default CategoryMenu;
