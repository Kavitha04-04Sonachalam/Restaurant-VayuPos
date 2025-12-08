import React, { useState } from 'react';
import { Search, Plus, Minus, Printer, Database, Tag, Trash2 } from 'lucide-react';

function POS() {
  const [selectedCustomer, setSelectedCustomer] = useState('Ravi Kumar');
  const [notes, setNotes] = useState('No onions, extra spicy');
  const [searchMenu, setSearchMenu] = useState('');
  const [searchCustomer, setSearchCustomer] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All / South Indian / Beverages / Breads / Combos');
  const [couponCode, setCouponCode] = useState('NEW20');
  const [paymentMethod, setPaymentMethod] = useState('UPI / Cash');
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', email: '' });
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [inputCoupon, setInputCoupon] = useState('');

  const customers = ['Ravi Kumar', 'Anita', 'Mohit', 'Guest'];
  
  // Available coupons
  const availableCoupons = [
    { code: 'NEW20', discount: 20, type: 'percentage', description: '20% off for new customers' },
    { code: 'FLAT50', discount: 50, type: 'fixed', description: '₹50 flat discount' },
    { code: 'SAVE100', discount: 100, type: 'fixed', description: '₹100 off on orders above ₹200' },
    { code: 'WELCOME10', discount: 10, type: 'percentage', description: '10% off welcome offer' }
  ];
  
  const menuItems = [
    { 
      name: 'Masala Dosa', 
      price: 80, 
      category: 'South Indian',
      image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=300&h=300&fit=crop'
    },
    { 
      name: 'Idli (2 pcs)', 
      price: 40, 
      category: 'South Indian',
      image: 'https://images.unsplash.com/photo-1589301773859-34462e28a3e6?w=300&h=300&fit=crop'
    },
    { 
      name: 'Vada', 
      price: 35, 
      category: 'South Indian',
      image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300&h=300&fit=crop'
    },
    { 
      name: 'Filter Coffee', 
      price: 25, 
      category: 'Beverages',
      image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=300&h=300&fit=crop'
    },
    { 
      name: 'Lemon Soda', 
      price: 30, 
      category: 'Beverages',
      image: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe1f0b?w=300&h=300&fit=crop'
    },
    { 
      name: 'Veg Combo', 
      price: 150, 
      category: 'Combos',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=300&fit=crop'
    }
  ];

  // Filter customers based on search
  const filteredCustomers = customers.filter(customer =>
    customer.toLowerCase().includes(searchCustomer.toLowerCase())
  );

  // Filter menu items based on search and category
  const filteredMenuItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchMenu.toLowerCase());
    const matchesCategory = selectedCategory === 'All / South Indian / Beverages / Breads / Combos' || 
                           item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const [cartItems, setCartItems] = useState([
    { name: 'Masala Dosa', qty: 2, price: 80 },
    { name: 'Filter Coffee', qty: 1, price: 25 }
  ]);

  const updateQuantity = (index, change) => {
    const newCart = [...cartItems];
    newCart[index].qty += change;
    if (newCart[index].qty <= 0) {
      newCart.splice(index, 1);
    }
    setCartItems(newCart);
  };

  const addToCart = (item) => {
    const existingIndex = cartItems.findIndex(ci => ci.name === item.name);
    if (existingIndex >= 0) {
      updateQuantity(existingIndex, 1);
    } else {
      setCartItems([...cartItems, { ...item, qty: 1 }]);
    }
  };

  const updateMenuQuantity = (itemName, change) => {
    const existingIndex = cartItems.findIndex(ci => ci.name === itemName);
    if (existingIndex >= 0) {
      const newCart = [...cartItems];
      newCart[existingIndex].qty += change;
      if (newCart[existingIndex].qty <= 0) {
        newCart.splice(existingIndex, 1);
      }
      setCartItems(newCart);
    }
  };

  const getMenuItemQuantity = (itemName) => {
    const cartItem = cartItems.find(ci => ci.name === itemName);
    return cartItem ? cartItem.qty : 0;
  };

  const addCustomer = () => {
    if (newCustomer.name) {
      alert(`Customer ${newCustomer.name} added successfully!`);
      setNewCustomer({ name: '', phone: '', email: '' });
      setShowAddCustomerModal(false);
    } else {
      alert('Please enter customer name');
    }
  };

  const applyCoupon = () => {
    const coupon = availableCoupons.find(c => c.code.toUpperCase() === inputCoupon.toUpperCase());
    if (coupon) {
      setCouponCode(coupon.code);
      setInputCoupon('');
      setShowCouponModal(false);
      alert(`Coupon "${coupon.code}" applied successfully!`);
    } else {
      alert('Invalid coupon code');
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
  // Calculate discount based on coupon
  let discount = 0;
  if (couponCode) {
    const appliedCoupon = availableCoupons.find(c => c.code === couponCode);
    if (appliedCoupon) {
      if (appliedCoupon.type === 'percentage') {
        discount = subtotal * (appliedCoupon.discount / 100);
      } else {
        discount = appliedCoupon.discount;
      }
    }
  }
  
  const cgst = subtotal * 0.025;
  const sgst = subtotal * 0.025;
  const total = subtotal - discount + cgst + sgst;

  return (
    <div className="min-h-screen bg-background text-foreground p-2 sm:p-4 md:p-5 max-w-[100vw] overflow-x-hidden" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Coupon Modal */}
      {showCouponModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3">
          <div className="bg-card rounded-lg p-4 sm:p-5 md:p-6 w-full max-w-[92vw] sm:max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-sm sm:text-lg md:text-xl font-semibold text-card-foreground mb-3 sm:mb-4">Apply Coupon</h3>
            <input 
              type="text"
              placeholder="Enter coupon code"
              value={inputCoupon}
              onChange={(e) => setInputCoupon(e.target.value.toUpperCase())}
              className="w-full bg-muted border border-border rounded px-3 py-2 text-sm sm:text-base text-foreground mb-3 sm:mb-4"
            />
            <div className="mb-3 sm:mb-4">
              <p className="text-sm text-muted-foreground mb-2">Available Coupons:</p>
              <div className="space-y-2">
                {availableCoupons.map((coupon, i) => (
                  <div key={i} className="bg-muted rounded p-2 sm:p-3 cursor-pointer hover:bg-teal-600 hover:text-white transition-colors" onClick={() => setInputCoupon(coupon.code)}>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-sm sm:text-base">{coupon.code}</span>
                      <span className="text-xs sm:text-sm">{coupon.type === 'percentage' ? `${coupon.discount}% off` : `₹${coupon.discount} off`}</span>
                    </div>
                    <p className="text-xs sm:text-sm mt-1 opacity-80">{coupon.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={applyCoupon} className="flex-1 py-2 sm:py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm sm:text-base font-medium">Apply</button>
              <button onClick={() => { setShowCouponModal(false); setInputCoupon(''); }} className="flex-1 py-2 sm:py-2.5 bg-muted text-foreground rounded-lg text-sm sm:text-base font-medium">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {showAddCustomerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3">
          <div className="bg-card rounded-lg p-4 sm:p-5 md:p-6 w-full max-w-[92vw] sm:max-w-md">
            <h3 className="text-sm sm:text-lg md:text-xl font-semibold text-card-foreground mb-3 sm:mb-4">Add New Customer</h3>
            <input 
              type="text"
              placeholder="Full name"
              value={newCustomer.name}
              onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
              className="w-full bg-muted border border-border rounded px-3 py-2 text-sm sm:text-base text-foreground mb-2 sm:mb-3"
            />
            <input 
              type="text"
              placeholder="+91 Phone number"
              value={newCustomer.phone}
              onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
              className="w-full bg-muted border border-border rounded px-3 py-2 text-sm sm:text-base text-foreground mb-2 sm:mb-3"
            />
            <input 
              type="email"
              placeholder="example@mail.com (optional)"
              value={newCustomer.email}
              onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
              className="w-full bg-muted border border-border rounded px-3 py-2 text-sm sm:text-base text-foreground mb-3 sm:mb-4"
            />
            <div className="flex gap-2">
              <button onClick={addCustomer} className="flex-1 py-2 sm:py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm sm:text-base font-medium">Add</button>
              <button onClick={() => setShowAddCustomerModal(false)} className="flex-1 py-2 sm:py-2.5 bg-muted text-foreground rounded-lg text-sm sm:text-base font-medium">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-5">
        <h2 className="text-base sm:text-xl md:text-2xl font-semibold text-foreground">POS System</h2>
      </div>

      {/* Customer Panel - Full Width */}
      <div className="bg-card rounded-lg shadow-sm p-3 sm:p-4 md:p-5 w-full mb-3 sm:mb-4 md:mb-5">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h2 className="text-foreground text-sm sm:text-base md:text-lg font-semibold">Customer</h2>
          <button 
            onClick={() => setShowAddCustomerModal(true)}
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-teal-600 text-white border-none rounded-md text-sm cursor-pointer flex items-center gap-1 sm:gap-2 hover:bg-teal-700 flex-shrink-0"
          >
            <Plus size={16} />
            <span>Add</span>
          </button>
        </div>
        <div className="mb-3 sm:mb-4">
          <label className="text-muted-foreground text-sm mb-2 block">Select customer</label>
          <div className="relative">
            <Search size={16} className="text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search name, phone..."
              value={searchCustomer}
              onChange={(e) => setSearchCustomer(e.target.value)}
              className="w-full bg-muted text-foreground border border-border rounded-md outline-none px-4 py-2 pl-10 text-sm sm:text-base"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
          {filteredCustomers.map((customer, i) => {
            const initial = customer.charAt(0).toUpperCase();
            const colors = ['#4A5568', '#2D5A7B', '#8B6F47', '#6B7280'];
            const bgColor = colors[i % colors.length];
            return (
              <button
                key={i}
                onClick={() => setSelectedCustomer(customer)}
                className="px-2.5 py-1.5 sm:px-3 sm:py-2 text-white border border-teal-600 rounded-full text-sm cursor-pointer flex items-center gap-1.5 sm:gap-2 hover:bg-teal-700 transition-colors flex-shrink-0"
                style={{
                  backgroundColor: selectedCustomer === customer ? '#1ABC9C' : 'transparent'
                }}
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0" style={{ backgroundColor: bgColor }}>
                  {customer === 'Guest' ? '👤' : initial}
                </div>
                <span className="text-sm whitespace-nowrap">{customer}</span>
              </button>
            );
          })}
        </div>
        <div>
          <label className="text-muted-foreground text-sm mb-2 block">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="2"
            className="w-full bg-muted text-foreground border border-border rounded-md outline-none resize-y px-3 py-2 text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Menu and Cart Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-3 sm:gap-4 md:gap-5">
        {/* Menu Panel */}
        <div className="bg-card rounded-lg shadow-sm p-3 sm:p-4 md:p-5 w-full">
          <div className="flex items-center justify-between mb-3 sm:mb-4 flex-wrap gap-2">
            <h2 className="text-foreground text-sm sm:text-base md:text-lg font-semibold">Menu</h2>
            <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-teal-600 text-white border-none rounded-md text-sm cursor-pointer flex items-center gap-1 sm:gap-2 hover:bg-teal-700 flex-shrink-0">
              <Database size={16} />
              <span>DB</span>
            </button>
          </div>
          <div className="mb-3 sm:mb-4">
            <label className="text-muted-foreground text-sm mb-2 block">Search items</label>
            <div className="relative">
              <Search size={16} className="text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                value={searchMenu}
                onChange={(e) => setSearchMenu(e.target.value)}
                className="w-full bg-muted text-foreground border border-border rounded-md outline-none px-4 py-2 pl-10 text-sm sm:text-base"
              />
            </div>
          </div>
          <div className="mb-3 sm:mb-4">
            <label className="text-muted-foreground text-sm mb-2 block">Categories</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-muted text-foreground border border-border rounded-md outline-none px-3 py-2 text-sm sm:text-base"
            >
              <option>All / South Indian / Beverages / Breads / Combos</option>
              <option>South Indian</option>
              <option>Beverages</option>
              <option>Breads</option>
              <option>Combos</option>
            </select>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {filteredMenuItems.map((item, i) => {
              const quantity = getMenuItemQuantity(item.name);
              return (
                <div key={i} className="bg-secondary rounded-lg overflow-hidden flex flex-col shadow-sm">
                  <div className="aspect-square w-full overflow-hidden bg-gray-200">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/200x200/1ABC9C/FFFFFF?text=' + encodeURIComponent(item.name.substring(0, 3));
                      }}
                    />
                  </div>
                  <div className="p-2 sm:p-2.5 flex flex-col gap-1.5 sm:gap-2">
                    <div>
                      <h3 className="text-foreground text-sm font-semibold mb-0.5 sm:mb-1 line-clamp-2 leading-tight">{item.name}</h3>
                      <p className="text-foreground text-sm font-medium">₹{item.price}</p>
                    </div>
                    {quantity === 0 ? (
                      <button
                        onClick={() => addToCart(item)}
                        className="px-3 py-1.5 bg-teal-600 text-white border-none rounded-full text-sm cursor-pointer flex items-center justify-center gap-1 hover:bg-teal-700 w-full"
                      >
                        <Plus size={14} />
                        <span>Add</span>
                      </button>
                    ) : (
                      <div className="flex items-center justify-between gap-1 bg-teal-600 rounded-full px-1.5 py-1">
                        <button
                          onClick={() => updateMenuQuantity(item.name, -1)}
                          className="w-6 h-6 bg-white text-teal-600 rounded-full cursor-pointer flex items-center justify-center hover:bg-gray-100 transition-colors flex-shrink-0"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-white font-semibold text-sm min-w-[16px] text-center">{quantity}</span>
                        <button
                          onClick={() => updateMenuQuantity(item.name, 1)}
                          className="w-6 h-6 bg-white text-teal-600 rounded-full cursor-pointer flex items-center justify-center hover:bg-gray-100 transition-colors flex-shrink-0"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cart & Billing Panel */}
        <div className="bg-card rounded-lg shadow-sm p-3 sm:p-4 md:p-5 w-full h-fit">
          <div className="flex items-center justify-between mb-3 sm:mb-4 flex-wrap gap-2">
            <h2 className="text-foreground text-sm sm:text-base md:text-lg font-semibold">Cart & Billing</h2>
            <div className="flex gap-2">
              <button 
                onClick={() => setShowCouponModal(true)}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-teal-600 text-white border-none rounded-md text-sm cursor-pointer flex items-center gap-1 sm:gap-2 hover:bg-teal-700 flex-shrink-0">
                <Tag size={16} />
                <span>Coupon</span>
              </button>
              <button
                onClick={() => setCartItems([])}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-teal-600 text-white border-none rounded-md text-sm cursor-pointer flex items-center gap-1 sm:gap-2 hover:bg-teal-700 flex-shrink-0"
              >
                <Trash2 size={16} />
                <span>Clear</span>
              </button>
            </div>
          </div>

          {/* Cart Items Table */}
          <div className="mb-4">
            <div className="border-b border-border text-muted-foreground grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 p-2 text-xs sm:text-sm">
              <div>Item</div>
              <div>Qty</div>
              <div>Price</div>
              <div>Total</div>
            </div>
            <div className="max-h-[200px] overflow-y-auto">
              {cartItems.map((item, i) => (
                <div key={i} className="border-b border-border grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 p-2 sm:p-2.5 items-center">
                  <div className="text-foreground text-xs sm:text-sm truncate">{item.name}</div>
                  <div className="text-foreground text-xs sm:text-sm">{item.qty}</div>
                  <div className="text-foreground text-xs sm:text-sm">₹{item.price}</div>
                  <div className="text-foreground text-xs sm:text-sm">₹{item.price * item.qty}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Billing Summary */}
          <div className="border-t border-border pt-3 sm:pt-4 flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground font-semibold">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-muted-foreground">Discount</span>
                {couponCode && (
                  <span className="px-2 py-0.5 bg-teal-600 text-white text-xs rounded cursor-pointer hover:bg-red-600 transition-colors" onClick={removeCoupon} title="Click to remove">
                    {couponCode} ×
                  </span>
                )}
              </div>
              <span className="text-foreground font-semibold">{discount > 0 ? `- ₹${discount.toFixed(2)}` : '₹0.00'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">CGST 2.5%</span>
              <span className="text-foreground">₹{cgst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">SGST 2.5%</span>
              <span className="text-foreground">₹{sgst.toFixed(2)}</span>
            </div>
            <div className="border-t border-border flex justify-between text-base font-semibold pt-2 sm:pt-3">
              <span className="text-foreground">Total</span>
              <span className="text-foreground">₹{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mt-4">
            <label className="text-muted-foreground text-xs sm:text-sm mb-2 block">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full bg-muted text-foreground border border-border rounded-md outline-none px-3 py-2 text-xs sm:text-sm mb-3"
            >
              <option>UPI / Cash</option>
              <option>UPI</option>
              <option>Cash</option>
              <option>Card</option>
            </select>
            <div className="flex justify-between items-center mb-3">
              <span className="text-foreground text-sm">To collect</span>
              <span className="text-foreground font-semibold text-lg">₹{total.toFixed(2)}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button className="px-2 py-2 sm:py-2.5 bg-teal-600 text-white border-none rounded-lg text-xs sm:text-sm cursor-pointer font-medium hover:bg-teal-700">
                UPI
              </button>
              <button className="px-2 py-2 sm:py-2.5 bg-teal-600 text-white border-none rounded-lg text-xs sm:text-sm cursor-pointer font-medium hover:bg-teal-700">
                Cash
              </button>
              <button className="px-2 py-2 sm:py-2.5 bg-teal-600 text-white border-none rounded-lg text-xs sm:text-sm cursor-pointer flex items-center justify-center gap-1 font-medium hover:bg-teal-700">
                <Printer size={14} />
                <span>Print</span>
              </button>
            </div>
            <p className="text-muted-foreground text-xs mt-2 leading-relaxed">
              Print sends KOT/receipt to printer and logs to Past Orders.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default POS;