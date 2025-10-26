import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import { Product } from '../types';
import ProductCard from '../components/ui/ProductCard';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import AnimatedPage from '../components/AnimatedPage';
import { FaSearch, FaExclamationTriangle } from 'react-icons/fa';

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    setIsLoading(true);
    const decodedCategory = decodeURIComponent(categoryName || '');
    // Simulate API call
    setTimeout(() => {
      const prods = products.filter(
        (product) => product.category === decodedCategory
      );
      setCategoryProducts(prods);
      setIsLoading(false);
    }, 500);
  }, [categoryName]);
  
  const filteredAndSortedProducts = useMemo(() => {
    let result = categoryProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return result;
  }, [categoryProducts, searchTerm, sortOption]);


  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {decodeURIComponent(categoryName || '')}
          </h1>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-black border-2 border-primary-green/50 rounded-lg focus:ring-primary-green focus:border-primary-green"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-green/70" />
            </div>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 bg-gray-100 dark:bg-black border-2 border-primary-green/50 rounded-lg focus:ring-primary-green focus:border-primary-green"
            >
              <option value="default">Default Sort</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <LoadingSkeleton count={8} />
        ) : filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            <FaExclamationTriangle className="mx-auto text-5xl text-primary-green mb-4" />
            <h3 className="text-2xl font-semibold mb-2 text-white">No Products Found</h3>
            <p>Your search for "{searchTerm}" did not match any products in this category.</p>
            <p>Try clearing the search or checking another category.</p>
          </div>
        )}
      </div>
    </AnimatedPage>
  );
};

export default CategoryPage;
