import React, { useState } from 'react';
import { Search, Plus, Download, Upload, Coffee, Pizza, Utensils, Cookie, X, Pencil, IceCream, Sandwich, Soup, Wine, Cake, Apple } from 'lucide-react';

// Product Card Component with Size Selection
const ProductCard = ({ product, onEdit, onDelete }) => {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  
  const enabledSizes = product.sizes.filter(s => s.enabled);
  const selectedSize = enabledSizes[selectedSizeIndex];

  return (
    <div className="bg-muted border border-border rounded-lg p-4">
      <h3 className="text-foreground font-medium mb-3 text-sm sm:text-base">{product.name}</h3>
      
      {/* Size Selection Chips */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {enabledSizes.map((sizeData, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedSizeIndex(idx)}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              selectedSizeIndex === idx
                ? 'bg-teal-600 text-white border-2 border-teal-700 shadow-md'
                : 'bg-background text-foreground border-2 border-border hover:border-teal-400'
            }`}
          >
            {sizeData.size} ₹{sizeData.price}
          </button>
        ))}
      </div>

      {/* Selected Size Display */}
      <div className="mb-3 p-2 bg-background rounded-lg border border-border">
        <p className="text-xs text-muted-foreground">Selected:</p>
        <p className="text-sm font-semibold text-foreground">
          {selectedSize.size} - ₹{selectedSize.price}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onEdit(product);
          }}
          className="flex-1 border border-teal-500 text-teal-500 bg-transparent hover:bg-secondary transition-colors px-3 py-1.5 rounded text-xs">
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(product.name);
          }}
          className="flex-1 border border-red-500 text-red-500 bg-transparent hover:bg-red-50 transition-colors px-3 py-1.5 rounded text-xs">
          Delete
        </button>
      </div>
    </div>
  );
};

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('Beverages');
  const [searchTerm, setSearchTerm] = useState('');
  const [categorySearchTerm, setCategorySearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedProductSizes, setSelectedProductSizes] = useState({}); // Track selected size per product
  
  // Available icons for categories
  const availableIcons = [
    { name: 'Coffee', icon: Coffee },
    { name: 'Pizza', icon: Pizza },
    { name: 'Utensils', icon: Utensils },
    { name: 'Cookie', icon: Cookie },
    { name: 'IceCream', icon: IceCream },
    { name: 'Sandwich', icon: Sandwich },
    { name: 'Soup', icon: Soup },
    { name: 'Wine', icon: Wine },
    { name: 'Cake', icon: Cake },
    { name: 'Apple', icon: Apple },
  ];

  const [categories, setCategories] = useState([
    { id: 1, name: 'Beverages', items: 12, iconName: 'Coffee' },
    { id: 2, name: 'Snacks', items: 18, iconName: 'Cookie' },
    { id: 3, name: 'South Indian', items: 9, iconName: 'Utensils' },
    { id: 4, name: 'Combos', items: 6, iconName: 'Pizza' },
  ]);

  const [products, setProducts] = useState({
    Beverages: [
      { 
        name: 'Tea', 
        sizes: [
          { size: 'Small', price: 15, enabled: true },
          { size: 'Medium', price: 20, enabled: true },
          { size: 'Large', price: 25, enabled: false }
        ]
      },
      { 
        name: 'Coffee', 
        sizes: [
          { size: 'Regular', price: 25, enabled: true },
          { size: 'Large', price: 35, enabled: true }
        ]
      },
      { 
        name: 'Cold Coffee', 
        sizes: [
          { size: 'Medium', price: 60, enabled: true },
          { size: 'Large', price: 80, enabled: true }
        ]
      },
      { 
        name: 'Masala Chai', 
        sizes: [
          { size: 'Regular', price: 20, enabled: true }
        ]
      },
      { 
        name: 'Lassi', 
        sizes: [
          { size: 'Regular', price: 40, enabled: true },
          { size: 'Large', price: 55, enabled: true }
        ]
      },
      { 
        name: 'Buttermilk', 
        sizes: [
          { size: 'Regular', price: 25, enabled: true }
        ]
      },
    ],
    Snacks: [
      { 
        name: 'Vada Pav', 
        sizes: [
          { size: 'Regular', price: 35, enabled: true }
        ]
      },
      { 
        name: 'Samosa', 
        sizes: [
          { size: 'Regular', price: 20, enabled: true },
          { size: 'Large', price: 30, enabled: true }
        ]
      },
    ],
    'South Indian': [
      { 
        name: 'Masala Dosa', 
        sizes: [
          { size: 'Regular', price: 90, enabled: true }
        ]
      },
      { 
        name: 'Plain Dosa', 
        sizes: [
          { size: 'Regular', price: 70, enabled: true }
        ]
      },
    ],
    Combos: [
      { 
        name: 'Breakfast Combo', 
        sizes: [
          { size: 'Regular', price: 120, enabled: true }
        ]
      },
    ],
  });

  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [showQuickPriceEditModal, setShowQuickPriceEditModal] = useState(false);
  
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newProductData, setNewProductData] = useState({ 
    name: '', 
    sizes: [
      { size: 'Small', price: '', enabled: false },
      { size: 'Regular', price: '', enabled: true },
      { size: 'Medium', price: '', enabled: false },
      { size: 'Large', price: '', enabled: false }
    ]
  });

  const [editingCategory, setEditingCategory] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [quickPriceEdit, setQuickPriceEdit] = useState(null); // { productName, sizeIndex, currentPrice, size }
  const [recentEdits, setRecentEdits] = useState([
    { action: 'Updated price: Coffee → ₹ 25', time: new Date(Date.now() - 120000) },
    { action: 'Added category: Combos', time: new Date(Date.now() - 600000) },
    { action: 'Deleted product: Plain Dosa', time: new Date(Date.now() - 3600000) },
  ]);

  const suggestions = ['Beverages', 'Snacks', 'South Indian', 'Combos'];

  // Helper function to get icon component
  const getIconComponent = (iconName) => {
    const iconObj = availableIcons.find(i => i.name === iconName);
    return iconObj ? iconObj.icon : Coffee;
  };

  // Helper function to format time ago
  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  // Add edit to recent edits
  const addRecentEdit = (action) => {
    setRecentEdits(prev => [
      { action, time: new Date() },
      ...prev
    ].slice(0, 10)); // Keep only last 10 edits
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCat = {
        id: categories.length + 1,
        name: newCategoryName,
        items: 0,
        iconName: 'Coffee',
      };
      setCategories([...categories, newCat]);
      setProducts({ ...products, [newCategoryName]: [] });
      addRecentEdit(`Added category: ${newCategoryName}`);
      setNewCategoryName('');
      setShowNewCategoryModal(false);
      setSelectedCategory(newCategoryName);
    }
  };

  const handleAddCategoryFromSearch = () => {
    if (categorySearchTerm.trim()) {
      const exists = categories.some(cat => cat.name.toLowerCase() === categorySearchTerm.toLowerCase());
      if (exists) {
        alert('Category already exists!');
        return;
      }
      const newCat = {
        id: categories.length + 1,
        name: categorySearchTerm,
        items: 0,
        iconName: 'Coffee',
      };
      setCategories([...categories, newCat]);
      setProducts({ ...products, [categorySearchTerm]: [] });
      addRecentEdit(`Added category: ${categorySearchTerm}`);
      setSelectedCategory(categorySearchTerm);
      setCategorySearchTerm('');
      alert(`Category "${categorySearchTerm}" added successfully!`);
    } else {
      alert('Please enter a category name');
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory({
      ...category,
      originalName: category.name
    });
    setShowEditCategoryModal(true);
  };

  const handleSaveEditCategory = () => {
    if (editingCategory && editingCategory.name.trim()) {
      const oldName = editingCategory.originalName;
      const newName = editingCategory.name;
      
      // Update categories
      const updatedCategories = categories.map(cat =>
        cat.name === oldName ? { ...cat, name: newName, iconName: editingCategory.iconName } : cat
      );
      setCategories(updatedCategories);

      // Update products object if name changed
      if (oldName !== newName) {
        const updatedProducts = { ...products };
        updatedProducts[newName] = updatedProducts[oldName];
        delete updatedProducts[oldName];
        setProducts(updatedProducts);
        
        if (selectedCategory === oldName) {
          setSelectedCategory(newName);
        }
      }

      addRecentEdit(`Updated category: ${oldName} → ${newName}`);
      setShowEditCategoryModal(false);
      setEditingCategory(null);
    }
  };

  const handleAddProduct = () => {
    const enabledSizes = newProductData.sizes.filter(s => s.enabled && s.price);
    
    if (newProductData.name.trim() && enabledSizes.length > 0) {
      const updatedProducts = {
        ...products,
        [selectedCategory]: [
          ...products[selectedCategory],
          {
            name: newProductData.name,
            sizes: enabledSizes.map(s => ({ ...s, price: parseInt(s.price) }))
          },
        ],
      };
      setProducts(updatedProducts);
      
      const updatedCategories = categories.map(cat =>
        cat.name === selectedCategory ? { ...cat, items: cat.items + 1 } : cat
      );
      setCategories(updatedCategories);
      
      addRecentEdit(`Added product: ${newProductData.name} to ${selectedCategory}`);
      
      setNewProductData({ 
        name: '', 
        sizes: [
          { size: 'Small', price: '', enabled: false },
          { size: 'Regular', price: '', enabled: true },
          { size: 'Medium', price: '', enabled: false },
          { size: 'Large', price: '', enabled: false }
        ]
      });
      setShowNewProductModal(false);
    } else {
      alert('Please enter product name and at least one size with price');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct({
      ...product,
      originalName: product.name,
      category: selectedCategory
    });
    setShowEditProductModal(true);
  };

  const handleSaveEditProduct = () => {
    if (editingProduct && editingProduct.name.trim()) {
      const enabledSizes = editingProduct.sizes.filter(s => s.enabled && s.price);
      
      if (enabledSizes.length === 0) {
        alert('Please enable at least one size with a price');
        return;
      }

      const updatedProducts = {
        ...products,
        [editingProduct.category]: products[editingProduct.category].map(p =>
          p.name === editingProduct.originalName
            ? { ...editingProduct, sizes: enabledSizes.map(s => ({ ...s, price: parseInt(s.price) })) }
            : p
        )
      };
      setProducts(updatedProducts);

      const priceChanges = editingProduct.sizes
        .filter(s => s.enabled)
        .map(s => `${s.size} → ₹${s.price}`)
        .join(', ');
      
      addRecentEdit(`Updated product: ${editingProduct.originalName} (${priceChanges})`);
      
      setShowEditProductModal(false);
      setEditingProduct(null);
    }
  };

  const handleDeleteCategory = (catName) => {
    if (window.confirm(`Are you sure you want to delete category "${catName}"?`)) {
      setCategories(categories.filter(cat => cat.name !== catName));
      const newProducts = { ...products };
      delete newProducts[catName];
      setProducts(newProducts);
      
      addRecentEdit(`Deleted category: ${catName}`);
      
      if (selectedCategory === catName) {
        setSelectedCategory(categories[0]?.name || 'Beverages');
      }
    }
  };

  const handleDeleteProduct = (productName) => {
    if (window.confirm(`Are you sure you want to delete "${productName}"?`)) {
      const updatedProducts = {
        ...products,
        [selectedCategory]: products[selectedCategory].filter(p => p.name !== productName),
      };
      setProducts(updatedProducts);
      
      const updatedCategories = categories.map(cat =>
        cat.name === selectedCategory ? { ...cat, items: Math.max(0, cat.items - 1) } : cat
      );
      setCategories(updatedCategories);
      
      addRecentEdit(`Deleted product: ${productName} from ${selectedCategory}`);
    }
  };

  const handleQuickPriceEdit = (product, sizeIndex) => {
    setQuickPriceEdit({
      productName: product.name,
      sizeIndex: sizeIndex,
      currentPrice: product.sizes[sizeIndex].price.toString(),
      size: product.sizes[sizeIndex].size
    });
    setShowQuickPriceEditModal(true);
  };

  const handleSaveQuickPriceEdit = () => {
    if (quickPriceEdit && quickPriceEdit.currentPrice && parseInt(quickPriceEdit.currentPrice) > 0) {
      const updatedProducts = {
        ...products,
        [selectedCategory]: products[selectedCategory].map(p => {
          if (p.name === quickPriceEdit.productName) {
            const updatedSizes = [...p.sizes];
            const oldPrice = updatedSizes[quickPriceEdit.sizeIndex].price;
            updatedSizes[quickPriceEdit.sizeIndex].price = parseInt(quickPriceEdit.currentPrice);
            
            addRecentEdit(
              `Updated price: ${quickPriceEdit.productName} (${quickPriceEdit.size}) ₹${oldPrice} → ₹${quickPriceEdit.currentPrice}`
            );
            
            return { ...p, sizes: updatedSizes };
          }
          return p;
        })
      };
      setProducts(updatedProducts);
      setShowQuickPriceEditModal(false);
      setQuickPriceEdit(null);
    } else {
      alert('Please enter a valid price');
    }
  };

  const handleCategoryCardClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  // Filter and sort products
  const getFilteredAndSortedProducts = () => {
    let filtered = (products[selectedCategory] || []).filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-low':
        filtered.sort((a, b) => {
          const minPriceA = Math.min(...a.sizes.filter(s => s.enabled).map(s => s.price));
          const minPriceB = Math.min(...b.sizes.filter(s => s.enabled).map(s => s.price));
          return minPriceA - minPriceB;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const maxPriceA = Math.max(...a.sizes.filter(s => s.enabled).map(s => s.price));
          const maxPriceB = Math.max(...b.sizes.filter(s => s.enabled).map(s => s.price));
          return maxPriceB - maxPriceA;
        });
        break;
      default:
        break;
    }

    return filtered;
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
                onClick={() => handleCategoryCardClick(suggestion)}
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
            const Icon = getIconComponent(category.iconName);
            return (
              <div
                key={category.id}
                onClick={() => handleCategoryCardClick(category.name)}
                className="bg-muted rounded-lg cursor-pointer hover:bg-secondary transition-colors p-4"
                style={{ border: selectedCategory === category.name ? '1px solid #1ABC9C' : '1px solid transparent' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="text-foreground" size={18} />
                  <h3 className="text-foreground font-medium text-sm sm:text-base flex-1">{category.name}</h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditCategory(category);
                    }}
                    className="text-teal-500 hover:text-teal-600 transition-colors p-1"
                  >
                    <Pencil size={16} />
                  </button>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <p className="text-muted-foreground text-xs sm:text-sm">{category.items} items</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCategory(category.name);
                    }}
                    className="border border-red-500 text-red-500 bg-transparent hover:bg-red-50 transition-colors px-2 sm:px-3 py-1 text-xs rounded">
                    Delete
                  </button>
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
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
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
            {getFilteredAndSortedProducts().map((product, index) => (
              <ProductCard 
                key={index} 
                product={product} 
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>
          {getFilteredAndSortedProducts().length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No products found in {selectedCategory}
            </div>
          )}
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
              <span className="text-muted-foreground text-xs">{formatTimeAgo(edit.time)}</span>
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

      {/* Edit Category Modal */}
      {showEditCategoryModal && editingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-card-foreground">Edit Category</h3>
              <button
                onClick={() => {
                  setShowEditCategoryModal(false);
                  setEditingCategory(null);
                }}
                className="bg-transparent border-none text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-4">
              <label className="text-xs text-muted-foreground uppercase tracking-wide mb-2 block">Category Name</label>
              <input
                type="text"
                placeholder="Category name"
                value={editingCategory.name}
                onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                className="w-full bg-muted text-foreground border border-border rounded-lg px-4 py-2.5 text-sm outline-none"
              />
            </div>

            <div className="mb-5">
              <label className="text-xs text-muted-foreground uppercase tracking-wide mb-2 block">Category Icon</label>
              <div className="grid grid-cols-5 gap-2">
                {availableIcons.map((iconObj) => {
                  const IconComp = iconObj.icon;
                  const isSelected = editingCategory.iconName === iconObj.name;
                  return (
                    <button
                      key={iconObj.name}
                      onClick={() => setEditingCategory({ ...editingCategory, iconName: iconObj.name })}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-teal-500 bg-teal-500/20'
                          : 'border-border bg-muted hover:bg-teal-500/10 hover:border-teal-400'
                      }`}
                    >
                      <IconComp 
                        size={20} 
                        className={`mx-auto transition-colors ${
                          isSelected ? 'text-teal-600' : 'text-foreground'
                        }`} 
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowEditCategoryModal(false);
                  setEditingCategory(null);
                }}
                className="flex-1 bg-muted border border-border text-foreground hover:bg-secondary transition-colors px-4 py-2.5 rounded-lg text-sm">
                Cancel
              </button>
              <button
                onClick={handleSaveEditCategory}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white transition-colors border-none px-4 py-2.5 rounded-lg text-sm">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Product Modal */}
      {showNewProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-card-foreground">Add New Product</h3>
              <button
                onClick={() => {
                  setShowNewProductModal(false);
                  setNewProductData({ 
                    name: '', 
                    sizes: [
                      { size: 'Small', price: '', enabled: false },
                      { size: 'Regular', price: '', enabled: true },
                      { size: 'Medium', price: '', enabled: false },
                      { size: 'Large', price: '', enabled: false }
                    ]
                  });
                }}
                className="bg-transparent border-none text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <input
              type="text"
              placeholder="Product name"
              value={newProductData.name}
              onChange={(e) => setNewProductData({ ...newProductData, name: e.target.value })}
              className="w-full bg-muted text-foreground border border-border rounded-lg px-4 py-2.5 text-sm mb-4 outline-none"
            />

            <div className="mb-5">
              <label className="text-xs text-muted-foreground uppercase tracking-wide mb-2 block">Sizes & Prices</label>
              {newProductData.sizes.map((sizeData, idx) => (
                <div key={idx} className="flex items-center gap-3 mb-3">
                  <input
                    type="checkbox"
                    checked={sizeData.enabled}
                    onChange={(e) => {
                      const updatedSizes = [...newProductData.sizes];
                      updatedSizes[idx].enabled = e.target.checked;
                      setNewProductData({ ...newProductData, sizes: updatedSizes });
                    }}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <span className="text-foreground text-sm w-16">{sizeData.size}</span>
                  <input
                    type="number"
                    placeholder="Price"
                    value={sizeData.price}
                    disabled={!sizeData.enabled}
                    onChange={(e) => {
                      const updatedSizes = [...newProductData.sizes];
                      updatedSizes[idx].price = e.target.value;
                      setNewProductData({ ...newProductData, sizes: updatedSizes });
                    }}
                    className="flex-1 bg-muted text-foreground border border-border rounded-lg px-3 py-2 text-sm outline-none disabled:opacity-50"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowNewProductModal(false);
                  setNewProductData({ 
                    name: '', 
                    sizes: [
                      { size: 'Small', price: '', enabled: false },
                      { size: 'Regular', price: '', enabled: true },
                      { size: 'Medium', price: '', enabled: false },
                      { size: 'Large', price: '', enabled: false }
                    ]
                  });
                }}
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

      {/* Edit Product Modal */}
      {showEditProductModal && editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-card-foreground">Edit Product</h3>
              <button
                onClick={() => {
                  setShowEditProductModal(false);
                  setEditingProduct(null);
                }}
                className="bg-transparent border-none text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <input
              type="text"
              placeholder="Product name"
              value={editingProduct.name}
              onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
              className="w-full bg-muted text-foreground border border-border rounded-lg px-4 py-2.5 text-sm mb-4 outline-none"
            />

            <div className="mb-5">
              <label className="text-xs text-muted-foreground uppercase tracking-wide mb-2 block">Sizes & Prices</label>
              {editingProduct.sizes.map((sizeData, idx) => (
                <div key={idx} className="flex items-center gap-3 mb-3">
                  <input
                    type="checkbox"
                    checked={sizeData.enabled}
                    onChange={(e) => {
                      const updatedSizes = [...editingProduct.sizes];
                      updatedSizes[idx].enabled = e.target.checked;
                      setEditingProduct({ ...editingProduct, sizes: updatedSizes });
                    }}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <span className="text-foreground text-sm w-16">{sizeData.size}</span>
                  <input
                    type="number"
                    placeholder="Price"
                    value={sizeData.price}
                    disabled={!sizeData.enabled}
                    onChange={(e) => {
                      const updatedSizes = [...editingProduct.sizes];
                      updatedSizes[idx].price = e.target.value;
                      setEditingProduct({ ...editingProduct, sizes: updatedSizes });
                    }}
                    className="flex-1 bg-muted text-foreground border border-border rounded-lg px-3 py-2 text-sm outline-none disabled:opacity-50"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowEditProductModal(false);
                  setEditingProduct(null);
                }}
                className="flex-1 bg-muted border border-border text-foreground hover:bg-secondary transition-colors px-4 py-2.5 rounded-lg text-sm">
                Cancel
              </button>
              <button
                onClick={handleSaveEditProduct}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white transition-colors border-none px-4 py-2.5 rounded-lg text-sm">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;