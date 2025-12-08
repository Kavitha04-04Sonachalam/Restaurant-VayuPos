import React, { useState } from 'react';
import { Search, Plus, Download, Upload, Coffee, Pizza, Utensils, Cookie, X } from 'lucide-react';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('Beverages');
  const [searchTerm, setSearchTerm] = useState('');
  const [categorySearchTerm, setCategorySearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('Name / Price / Popular');
  const [categories, setCategories] = useState([
    { id: 1, name: 'Beverages', items: 12, icon: Coffee },
    { id: 2, name: 'Snacks', items: 18, icon: Cookie },
    { id: 3, name: 'South Indian', items: 9, icon: Utensils },
    { id: 4, name: 'Combos', items: 6, icon: Pizza },
  ]);
  const [products, setProducts] = useState({
    Beverages: [
      { name: 'Tea', price: 15, size: 'Small' },
      { name: 'Coffee', price: 25, size: 'Regular' },
      { name: 'Cold Coffee', price: 60, size: 'Medium' },
      { name: 'Masala Chai', price: 20, size: '' },
      { name: 'Lassi', price: 40, size: '' },
      { name: 'Buttermilk', price: 25, size: '' },
    ],
    Snacks: [
      { name: 'Vada Pav', price: 35, size: '' },
      { name: 'Samosa', price: 20, size: '' },
    ],
    'South Indian': [
      { name: 'Masala Dosa', price: 90, size: '' },
      { name: 'Plain Dosa', price: 70, size: '' },
    ],
    Combos: [
      { name: 'Breakfast Combo', price: 120, size: '' },
    ],
  });

  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newProductData, setNewProductData] = useState({ name: '', price: '', size: '' });

  const suggestions = ['Beverages', 'Snacks', 'South Indian', 'Combos'];

  const bulkEditItems = [
    { product: 'Tea', category: 'Beverages', price: 15 },
    { product: 'Vada Pav', category: 'Snacks', price: 35 },
    { product: 'Masala Dosa', category: 'South Indian', price: 90 },
  ];

  const recentEdits = [
    { action: 'Updated price: Coffee → ₹ 25', time: '2m ago' },
    { action: 'Added category: Combos', time: '10m ago' },
    { action: 'Deleted product: Plain Dosa', time: '1h ago' },
  ];

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCat = {
        id: categories.length + 1,
        name: newCategoryName,
        items: 0,
        icon: Coffee,
      };
      setCategories([...categories, newCat]);
      setProducts({ ...products, [newCategoryName]: [] });
      setNewCategoryName('');
      setShowNewCategoryModal(false);
      setSelectedCategory(newCategoryName);
    }
  };

  const handleAddCategoryFromSearch = () => {
    if (categorySearchTerm.trim()) {
      // Check if category already exists
      const exists = categories.some(cat => cat.name.toLowerCase() === categorySearchTerm.toLowerCase());
      if (exists) {
        alert('Category already exists!');
        return;
      }
      const newCat = {
        id: categories.length + 1,
        name: categorySearchTerm,
        items: 0,
        icon: Coffee,
      };
      setCategories([...categories, newCat]);
      setProducts({ ...products, [categorySearchTerm]: [] });
      setSelectedCategory(categorySearchTerm);
      setCategorySearchTerm('');
      alert(`Category "${categorySearchTerm}" added successfully!`);
    } else {
      alert('Please enter a category name');
    }
  };

  const handleAddProduct = () => {
    if (newProductData.name.trim() && newProductData.price.trim()) {
      const updatedProducts = {
        ...products,
        [selectedCategory]: [
          ...products[selectedCategory],
          {
            name: newProductData.name,
            price: parseInt(newProductData.price),
            size: newProductData.size,
          },
        ],
      };
      setProducts(updatedProducts);
      const updatedCategories = categories.map(cat =>
        cat.name === selectedCategory ? { ...cat, items: cat.items + 1 } : cat
      );
      setCategories(updatedCategories);
      setNewProductData({ name: '', price: '', size: '' });
      setShowNewProductModal(false);
    }
  };

  const handleDeleteCategory = (catName) => {
    setCategories(categories.filter(cat => cat.name !== catName));
    const newProducts = { ...products };
    delete newProducts[catName];
    setProducts(newProducts);
    if (selectedCategory === catName) {
      setSelectedCategory(categories[0]?.name || 'Beverages');
    }
  };

  const handleDeleteProduct = (productName) => {
    const updatedProducts = {
      ...products,
      [selectedCategory]: products[selectedCategory].filter(p => p.name !== productName),
    };
    setProducts(updatedProducts);
    const updatedCategories = categories.map(cat =>
      cat.name === selectedCategory ? { ...cat, items: Math.max(0, cat.items - 1) } : cat
    );
    setCategories(updatedCategories);
  };

  // Filter categories based on search
  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(categorySearchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <h1 className="text-2xl font-semibold text-foreground">Menu Categories</h1>
        <div className="flex gap-2 sm:gap-3 flex-wrap">
          <button className="flex items-center gap-2 bg-card border border-teal-500 text-teal-500 hover:bg-muted transition-colors px-3 sm:px-4 py-2 rounded-lg text-sm">
            <Download size={16} />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button
            onClick={() => setShowNewCategoryModal(true)}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white transition-colors px-3 sm:px-4 py-2 rounded-lg text-sm">
            <Plus size={16} />
            <span className="hidden sm:inline">New Category</span>
          </button>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-card border border-border rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
        <h2 className="text-base sm:text-lg font-semibold text-card-foreground mb-4">Categories</h2>
        
        {/* Search */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Search categories (prefilled or add custom)</p>
          <div className="relative">
            <Search className="text-foreground absolute left-3 top-1/2 transform -translate-y-1/2" size={16} />
            <input
              type="text"
              placeholder="Type to search database..."
              value={categorySearchTerm}
              onChange={(e) => setCategorySearchTerm(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddCategoryFromSearch();
                }
              }}
              className="w-full bg-muted text-foreground border-none outline-none pl-10 pr-16 py-2 sm:py-2.5 rounded-lg text-sm"
            />
            <button 
              onClick={handleAddCategoryFromSearch}
              className="text-teal-500 font-medium bg-transparent border-none cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-sm hover:text-teal-600 transition-colors">
              + Add
            </button>
          </div>
        </div>

        {/* Suggestions */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Suggested:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setSelectedCategory(suggestion)}
                className="border border-teal-500 text-teal-500 bg-transparent hover:bg-muted transition-colors px-3 py-1.5 rounded-full text-xs sm:text-sm"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {filteredCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className="bg-muted rounded-lg cursor-pointer hover:bg-secondary transition-colors p-4"
                style={{ border: selectedCategory === category.name ? '1px solid #1ABC9C' : '1px solid transparent' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="text-foreground" size={18} />
                  <h3 className="text-foreground font-medium text-sm sm:text-base">{category.name}</h3>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <p className="text-muted-foreground text-xs sm:text-sm">{category.items} items</p>
                  <div className="flex gap-2">
                    <button className="border border-teal-500 text-teal-500 bg-transparent hover:bg-muted transition-colors px-2 sm:px-3 py-1 text-xs rounded">
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCategory(category.name);
                      }}
                      className="border border-teal-500 text-teal-500 bg-transparent hover:bg-muted transition-colors px-2 sm:px-3 py-1 text-xs rounded">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {filteredCategories.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No categories found matching "{categorySearchTerm}"
          </div>
        )}
      </div>

      {/* Category Products */}
      <div className="bg-card border border-border rounded-xl mb-4 sm:mb-6">
        <div className="border-b border-border flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 gap-3">
          <h2 className="text-base sm:text-lg font-semibold text-card-foreground">Category: {selectedCategory}</h2>
          <button
            onClick={() => setShowNewProductModal(true)}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white transition-colors px-3 sm:px-4 py-2 rounded-lg text-sm w-full sm:w-auto justify-center">
            <Plus size={16} />
            Add Product
          </button>
        </div>

        <div className="p-4 sm:p-5">
          {/* Search, Sort, Tax */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-5">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Product search</p>
              <input
                type="text"
                placeholder={`Search in ${selectedCategory}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-muted text-foreground border-none outline-none px-3 py-2 rounded-lg text-sm"
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Sort</p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-muted text-foreground border-none outline-none cursor-pointer px-3 py-2 rounded-lg text-sm"
              >
                <option>Name / Price / Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Tax</p>
              <div className="bg-secondary text-muted-foreground text-center font-medium px-3 py-2 rounded-lg text-sm">
                GST 5%
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {(products[selectedCategory] || []).map((product, index) => (
              <div key={index} className="bg-muted border border-border rounded-lg p-4">
                <h3 className="text-foreground font-medium mb-3 text-sm sm:text-base">{product.name}</h3>
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="bg-teal-600 text-white font-semibold px-3 py-1 rounded-full text-xs">
                    ₹ {product.price}
                  </span>
                  {product.size && (
                    <span className="bg-teal-600 text-white font-medium px-3 py-1 rounded-full text-xs">
                      {product.size}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 border border-teal-500 text-teal-500 bg-transparent hover:bg-secondary transition-colors px-3 py-1.5 rounded text-xs">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.name)}
                    className="flex-1 border border-teal-500 text-teal-500 bg-transparent hover:bg-secondary transition-colors px-3 py-1.5 rounded text-xs">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bulk Edit Prices */}
      <div className="bg-card border border-border rounded-xl mb-4 sm:mb-6">
        <div className="border-b border-border flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 gap-3">
          <h2 className="text-base sm:text-lg font-semibold text-card-foreground">Bulk Edit Prices</h2>
          <div className="flex gap-2 flex-wrap w-full sm:w-auto">
            <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white transition-colors px-3 py-2 rounded-lg text-sm flex-1 sm:flex-initial justify-center">
              <Upload size={16} />
              <span className="hidden sm:inline">Import CSV</span>
            </button>
            <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white transition-colors px-3 py-2 rounded-lg text-sm flex-1 sm:flex-initial justify-center">
              <Download size={16} />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left text-foreground font-semibold px-4 py-3 text-xs sm:text-sm">Product</th>
                <th className="text-left text-foreground font-semibold px-4 py-3 text-xs sm:text-sm">Category</th>
                <th className="text-left text-foreground font-semibold px-4 py-3 text-xs sm:text-sm">Price</th>
                <th className="text-left text-foreground font-semibold px-4 py-3 text-xs sm:text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bulkEditItems.map((item, index) => (
                <tr key={index} className="border-t border-border">
                  <td className="text-foreground px-4 py-3 text-xs sm:text-sm">{item.product}</td>
                  <td className="text-foreground px-4 py-3 text-xs sm:text-sm">{item.category}</td>
                  <td className="px-4 py-3">
                    <span className="bg-teal-600 text-white font-semibold inline-block px-3 py-1 rounded-full text-xs">
                      ₹ {item.price}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="border border-teal-500 text-teal-500 bg-transparent hover:bg-muted transition-colors px-3 py-1.5 rounded text-xs">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recently Edited */}
      <div className="bg-card border border-border rounded-xl">
        <div className="border-b border-border p-4 sm:p-5">
          <h2 className="text-base sm:text-lg font-semibold text-card-foreground">Recently Edited</h2>
        </div>
        <div className="p-4 sm:p-5 space-y-3">
          {recentEdits.map((edit, index) => (
            <div key={index} className="flex items-center justify-between bg-muted border border-border rounded-full px-4 py-3 flex-wrap gap-2">
              <span className="text-foreground text-xs sm:text-sm">{edit.action}</span>
              <span className="text-muted-foreground text-xs">{edit.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* New Category Modal */}
      {showNewCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-card-foreground">Add New Category</h3>
              <button
                onClick={() => setShowNewCategoryModal(false)}
                className="bg-transparent border-none text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                <X size={20} />
              </button>
            </div>
            <input
              type="text"
              placeholder="Category name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="w-full bg-muted text-foreground border border-border rounded-lg px-4 py-2.5 text-sm mb-5 outline-none"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowNewCategoryModal(false)}
                className="flex-1 bg-muted border border-border text-foreground hover:bg-secondary transition-colors px-4 py-2.5 rounded-lg text-sm">
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white transition-colors border-none px-4 py-2.5 rounded-lg text-sm">
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Product Modal */}
      {showNewProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-card-foreground">Add New Product</h3>
              <button
                onClick={() => setShowNewProductModal(false)}
                className="bg-transparent border-none text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                <X size={20} />
              </button>
            </div>
            <input
              type="text"
              placeholder="Product name"
              value={newProductData.name}
              onChange={(e) => setNewProductData({ ...newProductData, name: e.target.value })}
              className="w-full bg-muted text-foreground border border-border rounded-lg px-4 py-2.5 text-sm mb-3 outline-none"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProductData.price}
              onChange={(e) => setNewProductData({ ...newProductData, price: e.target.value })}
              className="w-full bg-muted text-foreground border border-border rounded-lg px-4 py-2.5 text-sm mb-3 outline-none"
            />
            <input
              type="text"
              placeholder="Size (optional)"
              value={newProductData.size}
              onChange={(e) => setNewProductData({ ...newProductData, size: e.target.value })}
              className="w-full bg-muted text-foreground border border-border rounded-lg px-4 py-2.5 text-sm mb-5 outline-none"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowNewProductModal(false)}
                className="flex-1 bg-muted border border-border text-foreground hover:bg-secondary transition-colors px-4 py-2.5 rounded-lg text-sm">
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white transition-colors border-none px-4 py-2.5 rounded-lg text-sm">
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;