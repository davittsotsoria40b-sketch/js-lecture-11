import React, { useState, useEffect } from 'react';

const ShoppingCart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/carts/5')
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const increment = (id) => {
    setProducts(products.map(p => p.id === id ? { ...p, quantity: p.quantity + 1 } : p));
  };

  const decrease = (id) => {
    setProducts(products.map(p => 
      p.id === id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
    ));
  };

  const remove = (id) => {
    
    setProducts(products.filter(p => p.id !== id));
  };

  const total = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);

  return (
    <div className="max-w-2xl mx-auto p-4">
      

      <div className="divide-y">
        {products.map((product) => (
          <div key={product.id} className="py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={product.thumbnail} alt="" className="w-12 h-12 rounded bg-gray-100" />
              <div>
                <h3 className="text-sm font-medium">{product.title}</h3>
                <p className="text-xs text-gray-500">${product.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md">
                <button onClick={() => decrease(product.id)} className="px-2 py-1 hover:bg-gray-50">-</button>
                <span className="px-2 text-sm">{product.quantity}</span>
                <button onClick={() => increment(product.id)} className="px-2 py-1 hover:bg-gray-50">+</button>
              </div>
              <button onClick={() => remove(product.id)} className="text-gray-400 hover:text-red-500 text-sm">X</button>
            </div>
          </div>
        ))}
      </div>

      {products.length > 0 && (
        <div className="mt-6 pt-4 border-t flex justify-between items-center">
          <span className="font-bold">ჯამი:</span>
          <span className="text-lg font-bold text-blue-600">${total.toFixed(2)}</span>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;