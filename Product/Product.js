import React, { useEffect, useState } from 'react';
import Header from '../main/Header';
import './Product.css';
import eco from '../img/eco.png';
import green from '../img/green.png';
import lowcarbon from '../img/lowcarbon.png';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchProducts = async (category = '') => {
    const url = category
      ? `http://localhost:8080/api/products/category/${category}`
      : 'http://localhost:8080/api/products';
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to the first page
    fetchProducts(category);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleNextPage = () => {
    setCurrentPage(currentPage < totalPages ? currentPage + 1 : currentPage);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Utility function to get image source
  const getImageSource = (mark) => {
    switch (mark) {
      case 'green':
        return green;
      case 'lowcarbon':
        return lowcarbon;
      case 'eco':
        return eco;
      default:
        return '';
    }
  };

  return (
    <div>
      <Header />
      <div className="header-container">
        <h1 className='eco'>ECO-제품</h1>
        <div className="category-list">
          {[
            { name: '전체 상품 보기', value: '' },
            { name: '주방용품', value: 'Eco_Kitchen' },
            { name: '욕실용품', value: 'Eco_Bathroom' },
            { name: '청소용품', value: 'Eco_Clean' },
            { name: '세탁용품', value: 'Eco_Laundry' }
          ].map((category) => (
            <button
              key={category.value}
              className={`category-button ${selectedCategory === category.value ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category.value)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      <div className="product-list">
        {currentProducts.map((product) => (
          <div key={product.id} className="product-item">
            <img src={`data:image/jpeg;base64,${product.image}`} alt={product.productName} />
            <div className="product-details">
              <span className="product-name">{product.productName}</span>
              <div className="certification">
                {product.mark_1 && <img src={getImageSource(product.mark_1)} alt="" className="eco-mark" />}
                {product.mark_2 && <img src={getImageSource(product.mark_2)} alt="" className="eco-mark" />}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination" style={{ textAlign: 'center' }}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>이전</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <span key={i + 1} onClick={() => handlePageClick(i + 1)}>{i + 1}</span>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>다음</button>
      </div>
    </div>
  );
};

export default ProductPage;
