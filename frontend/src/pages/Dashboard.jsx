import React, { useState } from 'react';
import { DollarSign, ShoppingBag, TrendingUp, Wallet, Clock, Printer, Bluetooth, Edit, Trash2, Check, X, Plus } from 'lucide-react';

const Dashboard = ({ isDarkMode = true, onNavigate }) => {
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [cartItems, setCartItems] = useState([
    { name: 'Masala Dosa', quantity: 1, price: 90 },
    { name: 'Coffee', quantity: 2, price: 25 }
  ]);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  
  // Modal states
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showDateRangeModal, setShowDateRangeModal] = useState(false);
  const [dateRangeType, setDateRangeType] = useState('');

  // Form states
  const [newCategory, setNewCategory] = useState({ name: '', items: 0 });
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', email: '' });
  const [newOffer, setNewOffer] = useState({ code: '', type: 'Percentage', value: '', category: '' });
  const [newStaff, setNewStaff] = useState({ name: '', role: 'Cashier', salary: '', joinDate: '' });
  const [newExpense, setNewExpense] = useState({ title: '', amount: '', date: '', category: 'Supplies' });

  const [menuItems, setMenuItems] = useState([
    { name: 'Masala Dosa', price: 90, category: 'snacks' },
    { name: 'Idli Sambar', price: 60, category: 'snacks' },
    { name: 'Vada Pav', price: 35, category: 'snacks' },
    { name: 'Tea', price: 15, category: 'beverages' },
    { name: 'Coffee', price: 25, category: 'beverages' },
    { name: 'Veg Sandwich', price: 70, category: 'combos' }
  ]);

  const [recentOrders, setRecentOrders] = useState([
    { id: 1256, type: 'Dine-In', time: '2m ago', amount: 320 },
    { id: 1255, type: 'Takeaway', time: '10m ago', amount: 580 },
    { id: 1254, type: 'UPI', time: '18m ago', amount: 210 },
    { id: 1253, type: 'Cash', time: '25m ago', amount: 450 },
    { id: 1252, type: 'Dine-In', time: '32m ago', amount: 280 }
  ]);

  const activities = [
    { action: 'Staff login', time: 'just now' },
    { action: 'Menu updated', time: '20m ago' },
    { action: 'Expense added', time: '1h ago' }
  ];

  const [categories, setCategories] = useState([
    { name: 'Beverages', items: 12 },
    { name: 'Snacks', items: 18 },
    { name: 'South Indian', items: 9 }
  ]);

  const [customers, setCustomers] = useState([
    { name: 'Rahul Verma', phone: '98765 43210', orders: 12, email: 'rahul@example.com' },
    { name: 'Anita Desai', phone: '99887 66554', orders: 5, email: 'anita@example.com' }
  ]);

  const [offers, setOffers] = useState([
    { code: 'TEA5', type: 'Flat', value: '₹5', category: 'Beverages' }
  ]);

  const [staff, setStaff] = useState([
    { name: 'Satish', role: 'Cashier', payscale: '₹15,000', joined: '12 Jan 2025' }
  ]);

  const [expenses, setExpenses] = useState([
    { title: 'Staff salary - Satish', amount: '₹ 15,000', date: '01 Nov 2025', source: 'Auto' },
    { title: 'Vegetables', amount: '₹ 2,150', date: '02 Nov 2025', source: 'Manual' }
  ]);

  const [notifications, setNotifications] = useState([
    { text: 'New order', detail: 'Table 3 placed an order', time: 'just now' },
    { text: 'Low stock', detail: 'Tea leaves running low', time: '10m' },
    { text: 'Printer connected', detail: 'KOT-58 paired', time: '1h' },
    { text: 'Payment received', detail: 'Order #1256 paid via UPI', time: '2h' },
    { text: 'Staff clocked in', detail: 'Satish started shift', time: '3h' }
  ]);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst - discount;

  const addToCart = (item) => {
    const existingItem = cartItems.find(i => i.name === item.name);
    if (existingItem) {
      setCartItems(cartItems.map(i => 
        i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const applyCoupon = () => {
    if (couponCode === 'TEA5') {
      setDiscount(5);
      alert('Coupon applied! ₹5 off');
    } else if (couponCode === 'SAVE10') {
      setDiscount(Math.round(subtotal * 0.1));
      alert('Coupon applied! 10% off');
    } else {
      alert('Invalid coupon code');
    }
  };

  const removeCoupon = () => {
    setDiscount(0);
    setCouponCode('');
    alert('Coupon removed');
  };

  const handlePayment = (method) => {
    setPaymentMethod(method);
    alert(`Payment via ${method} - Total: ₹${total}`);
  };

  const handlePrintBill = () => {
    alert('Printing bill...\n\nItems:\n' + cartItems.map(i => `${i.name} x${i.quantity} - ₹${i.price * i.quantity}`).join('\n') + `\n\nTotal: ₹${total}`);
  };

  const addCategory = () => {
    if (newCategory.name) {
      setCategories([...categories, { ...newCategory, items: 0 }]);
      setNewCategory({ name: '', items: 0 });
      setShowCategoryModal(false);
      alert('Category added successfully!');
    }
  };

  const deleteCategory = (index) => {
    if (confirm('Delete this category?')) {
      setCategories(categories.filter((_, i) => i !== index));
    }
  };

  const addCustomer = () => {
    if (newCustomer.name && newCustomer.phone) {
      setCustomers([...customers, { ...newCustomer, orders: 0 }]);
      setNewCustomer({ name: '', phone: '', email: '' });
      setShowCustomerModal(false);
      alert('Customer added successfully!');
    } else {
      alert('Please fill in name and phone');
    }
  };

  const addOffer = () => {
    if (newOffer.code && newOffer.value) {
      setOffers([...offers, newOffer]);
      setNewOffer({ code: '', type: 'Percentage', value: '', category: '' });
      setShowOfferModal(false);
      alert('Offer created successfully!');
    } else {
      alert('Please fill in code and value');
    }
  };

  const addStaff = () => {
    if (newStaff.name && newStaff.salary) {
      setStaff([...staff, { name: newStaff.name, role: newStaff.role, payscale: `₹${newStaff.salary}`, joined: newStaff.joinDate || new Date().toLocaleDateString() }]);
      setNewStaff({ name: '', role: 'Cashier', salary: '', joinDate: '' });
      setShowStaffModal(false);
      alert('Staff member added successfully!');
    } else {
      alert('Please fill in name and salary');
    }
  };

  const addExpense = () => {
    if (newExpense.title && newExpense.amount) {
      setExpenses([...expenses, { ...newExpense, amount: `₹ ${newExpense.amount}`, source: 'Manual' }]);
      setNewExpense({ title: '', amount: '', date: '', category: 'Supplies' });
      setShowExpenseModal(false);
      alert('Expense added successfully!');
    } else {
      alert('Please fill in title and amount');
    }
  };

  const testPrint = () => {
    alert('Testing KOT Printer...\n\nKOT-58 Connected\nTest print successful!');
  };

  const selectDateRange = (type) => {
    setDateRangeType(type);
    setShowDateRangeModal(true);
  };

  const filteredItems = activeFilter === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeFilter);

  const displayedOrders = showAllOrders ? recentOrders : recentOrders.slice(0, 3);
  const displayedNotifications = showAllNotifications ? notifications : notifications.slice(0, 3);

  // Navigation handlers
  const handleNavigateToPOS = () => {
    if (onNavigate) {
      onNavigate('pos');
    }
  };

  const handleNavigateToMenu = () => {
    if (onNavigate) {
      onNavigate('menu');
    }
  };

  const handleNavigateToReports = () => {
    if (onNavigate) {
      onNavigate('reports');
    }
  };

  const handleNavigateToPastOrders = () => {
    if (onNavigate) {
      onNavigate('past-orders');
    }
  };

  const handleSeeAllOrders = () => {
    handleNavigateToPastOrders();
  };

  return (
    <div className={`p-4 sm:p-6 lg:p-8 bg-background min-h-screen`}>
      {/* Modals */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Add Category</h3>
            <input 
              type="text"
              placeholder="Category name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
              className="w-full bg-muted border border-border rounded px-3 py-2 text-sm text-foreground mb-3"
            />
            <div className="flex gap-2">
              <button onClick={addCategory} className="flex-1 py-2 bg-teal-600 text-white rounded-lg">Add</button>
              <button onClick={() => setShowCategoryModal(false)} className="flex-1 py-2 bg-muted text-foreground rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showCustomerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Add Customer</h3>
            <input 
              type="text"
              placeholder="Full name"
              value={newCustomer.name}
              onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
              className="w-full bg-muted border border-border rounded px-3 py-2 text-sm text-foreground mb-3"
            />
            <input 
              type="text"
              placeholder="+91 Phone number"
              value={newCustomer.phone}
              onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
              className="w-full bg-muted border border-border rounded px-3 py-2 text-sm text-foreground mb-3"
            />
            <input 
              type="email"
              placeholder="example@mail.com"
              value={newCustomer.email}
              onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
              className="w-full bg-muted border border-border rounded px-3 py-2 text-sm text-foreground mb-3"
            />
            <div className="flex gap-2">
              <button onClick={addCustomer} className="flex-1 py-2 bg-teal-600 text-white rounded-lg">Save</button>
              <button onClick={() => setShowCustomerModal(false)} className="flex-1 py-2 bg-muted text-foreground rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showOfferModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Create Offer</h3>
            <input 
              type="text"
              placeholder="Coupon code (e.g. SAVE10)"
              value={newOffer.code}
              onChange={(e) => setNewOffer({...newOffer, code: e.target.value.toUpperCase()})}
              className="w-full bg-muted border border-border rounded px-3 py-2 text-sm text-foreground mb-3"
            />
            <select 
              value={newOffer.type}
              onChange={(e) => setNewOffer({...newOffer, type: e.target.value})}
              className="w-full bg-muted border border-border rounded px-3 py-2 text-sm text-foreground mb-3"
            >
              <option value="Percentage">Percentage</option>
              <option value="Flat">Flat</option>
            </select>
            <input 
              type="text"
              placeholder="Value (e.g. 10 or 50)"
              value={newOffer.value}
              onChange={(e) => setNewOffer({...newOffer, value: e.target.value})}
              className="w-full bg-muted border border-border rounded px-3 py-2 text-sm text-foreground mb-3"
            />
            <input 
              type="text"
              placeholder="Category (optional)"
              value={newOffer.category}
              onChange={(e) => setNewOffer({...newOffer, category: e.target.value})}
              className="w-full bg-muted border border-border rounded px-3 py-2 text-sm text-foreground mb-3"
            />
            <div className="flex gap-2">
              <button onClick={addOffer} className="flex-1 py-2 bg-teal-600 text-white rounded-lg">Create</button>
              <button onClick={() => setShowOfferModal(false)} className="flex-1 py-2 bg-muted text-foreground rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showStaffModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Add Staff</h3>
            <input 
              type="text"
              placeholder="Full name"
              value={newStaff.name}
              onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
              className="w-full bg-muted border border-border rounded px-3 py-2 text-sm text-foreground mb-3"
            />
            <select 
              value={newStaff.role}
              onChange={(e) => setNewStaff({...newStaff, role: e.target.value})}
              className="w-full bg-muted border border-border rounded px-3 py-2 text-sm text-foreground mb-3"
            >
              <option value="Cashier">Cashier</option>
              <option value="Chef">Chef</option>
              <option value="Waiter">Waiter</option>
              <option value="Manager">Manager</option>
            </select>
            <input 
              type="text"
              placeholder="Monthly salary (e.g. 15000)"
              value={newStaff.salary}
              onChange={(e) => setNewStaff({...newStaff, salary: e.target.value})}
              className="w-full bg-muted border border-border rounded px-3 py-2 text-sm text-foreground mb-3"
            />
            <input 
              type="date"
              value={newStaff.joinDate}
              onChange={(e) => setNewStaff({...newStaff, joinDate: e.target.value})}
              className="w-full bg-muted border border-border rounded px-3 py-2 text-sm text-foreground mb-3"
            />
            <div className="flex gap-2">
              <button onClick={addStaff} className="flex-1 py-2 bg-teal-600 text-white rounded-lg">Save</button>
              <button onClick={() => setShowStaffModal(false)} className="flex-1 py-2 bg-muted text-foreground rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showExpenseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Add Expense</h3>
            <input 
              type="text"
              placeholder="Expense title (e.g. Milk purchase)"
              value={newExpense.title}
              onChange={(e) => setNewExpense({...newExpense, title: e.target.value})}
              className="w-full bg-muted border border-border rounded px-3 py-2 text-sm text-foreground mb-3"
            />
            <input 
              type="text"
              placeholder="Amount (e.g. 2150)"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
              className="w-full bg-muted border border-border rounded px-3 py-2 text-sm text-foreground mb-3"
            />
            <input 
              type="date"
              value={newExpense.date}
              onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
              className="w-full bg-muted border border-border rounded px-3 py-2 text-sm text-foreground mb-3"
            />
            <select 
              value={newExpense.category}
              onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
              className="w-full bg-muted border border-border rounded px-3 py-2 text-sm text-foreground mb-3"
            >
              <option value="Supplies">Supplies</option>
              <option value="Utilities">Utilities</option>
              <option value="Salary">Salary</option>
              <option value="Maintenance">Maintenance</option>
            </select>
            <div className="flex gap-2">
              <button onClick={addExpense} className="flex-1 py-2 bg-teal-600 text-white rounded-lg">Save</button>
              <button onClick={() => setShowExpenseModal(false)} className="flex-1 py-2 bg-muted text-foreground rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showDateRangeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Select Date Range - {dateRangeType}</h3>
            <div className="space-y-3 mb-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">From</label>
                <input 
                  type="date"
                  className="w-full bg-muted border border-border rounded px-3 py-2 text-sm text-foreground"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">To</label>
                <input 
                  type="date"
                  className="w-full bg-muted border border-border rounded px-3 py-2 text-sm text-foreground"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => {
                alert(`Date range selected for ${dateRangeType} report`);
                setShowDateRangeModal(false);
              }} className="flex-1 py-2 bg-teal-600 text-white rounded-lg">Apply</button>
              <button onClick={() => setShowDateRangeModal(false)} className="flex-1 py-2 bg-muted text-foreground rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <h2 className={`text-2xl font-semibold text-foreground`}>Dashboard</h2>
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <button className={`flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700`}>
            <Download size={18} />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button className={`flex items-center gap-2 px-4 py-2 bg-card text-card-foreground rounded-lg hover:bg-muted`}>
            <RefreshCw size={18} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        <div className={`bg-card rounded-xl p-4 sm:p-6`}>
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <p className={`text-muted-foreground text-xs sm:text-sm`}>Today Sales</p>
            <DollarSign className="text-teal-400" size={18} />
          </div>
          <p className={`text-xl sm:text-3xl font-bold text-card-foreground`}>₹12,450</p>
        </div>
        <div className={`bg-card rounded-xl p-4 sm:p-6`}>
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <p className={`text-muted-foreground text-xs sm:text-sm`}>Orders</p>
            <ShoppingBag className="text-teal-400" size={18} />
          </div>
          <p className={`text-xl sm:text-3xl font-bold text-card-foreground`}>86</p>
        </div>
        <div className={`bg-card rounded-xl p-4 sm:p-6`}>
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <p className={`text-muted-foreground text-xs sm:text-sm`}>Avg Ticket</p>
            <TrendingUp className="text-teal-400" size={18} />
          </div>
          <p className={`text-xl sm:text-3xl font-bold text-card-foreground`}>₹145</p>
        </div>
        <div className={`bg-card rounded-xl p-4 sm:p-6`}>
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <p className={`text-muted-foreground text-xs sm:text-sm`}>Expenses</p>
            <Wallet className="text-teal-400" size={18} />
          </div>
          <p className={`text-xl sm:text-3xl font-bold text-card-foreground`}>₹3,120</p>
        </div>
      </div>

      {/* Quick Links, Recent Orders, Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Quick Links */}
        <div className={`bg-card rounded-xl p-4 sm:p-6`}>
          <h3 className={`text-base sm:text-lg font-semibold text-card-foreground mb-4`}>Quick Links</h3>
          <div className="space-y-3">
            <button 
              onClick={handleNavigateToPOS}
              className={`w-full flex items-center justify-between px-3 sm:px-4 py-3 bg-muted rounded-lg hover:bg-secondary transition text-foreground`}
            >
              <div className="text-left">
                <p className="font-medium text-sm sm:text-base">Open POS</p>
                <p className={`text-xs sm:text-sm text-muted-foreground`}>Start billing and print KOT</p>
              </div>
              <span className="px-2 sm:px-3 py-1 bg-teal-600 text-xs sm:text-sm rounded whitespace-nowrap text-white">Open</span>
            </button>
            <button 
              onClick={handleNavigateToMenu}
              className={`w-full flex items-center justify-between px-3 sm:px-4 py-3 bg-muted rounded-lg hover:bg-secondary transition text-foreground`}
            >
              <div className="text-left">
                <p className="font-medium text-sm sm:text-base">Manage Menu</p>
                <p className={`text-xs sm:text-sm text-muted-foreground`}>Categories, items and prices</p>
              </div>
              <span className="px-2 sm:px-3 py-1 bg-teal-600 text-xs sm:text-sm rounded whitespace-nowrap text-white">Menu</span>
            </button>
            <button 
              onClick={handleNavigateToReports}
              className={`w-full flex items-center justify-between px-3 sm:px-4 py-3 bg-muted rounded-lg hover:bg-secondary transition text-foreground`}
            >
              <div className="text-left">
                <p className="font-medium text-sm sm:text-base">View Reports</p>
                <p className={`text-xs sm:text-sm text-muted-foreground`}>Sales and orders</p>
              </div>
              <span className="px-2 sm:px-3 py-1 bg-teal-600 text-xs sm:text-sm rounded whitespace-nowrap text-white">Reports</span>
            </button>
          </div>
        </div>

        {/* Recent Orders */}
        <div className={`bg-card rounded-xl p-4 sm:p-6`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-base sm:text-lg font-semibold text-card-foreground`}>Recent Orders</h3>
            <button 
              onClick={handleSeeAllOrders}
              className="text-teal-400 text-xs sm:text-sm hover:underline"
            >
              See all
            </button>
          </div>
          <div className="space-y-3">
            {displayedOrders.map(order => (
              <div key={order.id} className={`flex items-center justify-between p-3 bg-muted rounded-lg`}>
                <div className={`text-foreground`}>
                  <p className="font-medium text-xs sm:text-sm">#{order.id} • {order.type}</p>
                  <p className={`text-xs text-muted-foreground`}>{order.time}</p>
                </div>
                <p className={`font-semibold text-foreground text-sm sm:text-base`}>₹ {order.amount}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div className={`bg-card rounded-xl p-4 sm:p-6`}>
          <h3 className={`text-base sm:text-lg font-semibold text-card-foreground mb-4`}>Activity</h3>
          <div className="space-y-4">
            {activities.map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <p className={`text-foreground text-sm sm:text-base`}>{activity.action}</p>
                <p className={`text-xs sm:text-sm text-muted-foreground`}>{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* POS Section */}
      <div className={`bg-card rounded-xl p-4 sm:p-6 mb-6 sm:mb-8`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
          <h3 className={`text-lg sm:text-xl font-semibold text-card-foreground`}>POS</h3>
          <button 
            onClick={handlePrintBill}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 w-full sm:w-auto justify-center"
          >
            <Printer size={18} />
            Print Bill
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left: Menu Items */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <label className={`block text-xs sm:text-sm text-muted-foreground mb-2`}>Customer</label>
              <select 
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                className={`w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground text-sm sm:text-base`}
              >
                <option value="">Select customer</option>
                <option value="walk-in">Walk-in</option>
                {customers.map((cust, idx) => (
                  <option key={idx} value={cust.name}>{cust.name}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 mb-4 flex-wrap">
              <button 
                onClick={() => setActiveFilter('all')}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm ${activeFilter === 'all' ? 'bg-teal-600 text-white' : `bg-muted hover:bg-secondary text-foreground`}`}
              >
                All
              </button>
              <button 
                onClick={() => setActiveFilter('beverages')}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm ${activeFilter === 'beverages' ? 'bg-teal-600 text-white' : `bg-muted hover:bg-secondary text-foreground`}`}
              >
                Beverages
              </button>
              <button 
                onClick={() => setActiveFilter('snacks')}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm ${activeFilter === 'snacks' ? 'bg-teal-600 text-white' : `bg-muted hover:bg-secondary text-foreground`}`}
              >
                Snacks
              </button>
              <button 
                onClick={() => setActiveFilter('combos')}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm ${activeFilter === 'combos' ? 'bg-teal-600 text-white' : `bg-muted hover:bg-secondary text-foreground`}`}
              >
                Combos
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {filteredItems.map((item, idx) => (
                <div key={idx} className={`bg-muted rounded-lg p-3 sm:p-4`}>
                  <p className={`font-medium text-foreground mb-2 text-sm sm:text-base`}>{item.name}</p>
                  <p className={`text-muted-foreground mb-3 text-xs sm:text-sm`}>₹ {item.price}</p>
                  <button 
                    onClick={() => addToCart(item)}
                    className="w-full py-2 bg-teal-600 rounded-lg text-xs sm:text-sm hover:bg-teal-700 text-white"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Bill Summary */}
          <div>
            <div className={`bg-muted rounded-lg p-4 mb-4`}>
              <label className={`block text-xs sm:text-sm text-muted-foreground mb-2`}>Coupon</label>
              <div className="flex gap-2 mb-2">
                <input 
                  type="text"
                  placeholder="Enter code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className={`flex-1 bg-card border border-border rounded px-3 py-2 text-xs sm:text-sm text-foreground`}
                />
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={applyCoupon}
                  className={`flex items-center gap-1 px-3 py-2 bg-teal-600 text-white rounded text-xs sm:text-sm hover:bg-teal-700`}
                >
                  <Check size={14} />
                  Apply
                </button>
                <button 
                  onClick={removeCoupon}
                  className={`flex items-center gap-1 px-3 py-2 bg-card text-card-foreground rounded text-xs sm:text-sm hover:bg-secondary`}
                >
                  <X size={14} />
                  Remove
                </button>
              </div>
            </div>

            <div className={`bg-muted rounded-lg p-4 mb-4`}>
              {cartItems.map((item, idx) => (
                <div key={idx} className={`flex justify-between mb-2 text-foreground text-sm sm:text-base`}>
                  <span>{item.name} x{item.quantity}</span>
                  <span>₹ {item.price * item.quantity}</span>
                </div>
              ))}
              <div className={`border-t border-border mt-3 pt-3 space-y-2`}>
                <div className={`flex justify-between text-muted-foreground text-sm`}>
                  <span>Subtotal</span>
                  <span>₹ {subtotal}</span>
                </div>
                <div className={`flex justify-between text-muted-foreground text-sm`}>
                  <span>GST (5%)</span>
                  <span>₹ {gst}</span>
                </div>
                <div className={`flex justify-between text-muted-foreground text-sm`}>
                  <span>Discount</span>
                  <span>₹ {discount}</span>
                </div>
                <div className={`flex justify-between text-lg sm:text-xl font-bold text-foreground`}>
                  <span>Total</span>
                  <span>₹ {total}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => handlePayment('UPI')}
                className="flex-1 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm sm:text-base transition-colors"
              >
                UPI
              </button>
              <button 
                onClick={() => handlePayment('Cash')}
                className={`flex-1 py-2 bg-card text-card-foreground rounded-lg hover:bg-teal-600 hover:text-white border border-border text-sm sm:text-base transition-colors`}
              >
                Cash
              </button>
              <button 
                onClick={() => alert('Order saved!')}
                className={`flex-1 py-2 bg-card text-card-foreground rounded-lg hover:bg-teal-600 hover:text-white border border-border text-sm sm:text-base transition-colors`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Categories, Customers, Offers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Menu Categories */}
        <div className={`bg-card rounded-xl p-4 sm:p-6`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-base sm:text-lg font-semibold text-card-foreground`}>Menu Categories</h3>
            <button 
              onClick={() => setShowCategoryModal(true)}
              className="px-2 sm:px-3 py-1 bg-teal-600 text-white rounded text-xs sm:text-sm hover:bg-teal-700"
            >
              Add
            </button>
          </div>
          <div className="mb-4">
            <input 
              type="text"
              placeholder="Search categories/products"
              className={`w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground text-sm`}
            />
          </div>
          <div className="space-y-2">
            {categories.map((cat, idx) => (
              <div key={idx} className={`flex items-center justify-between p-3 bg-muted rounded-lg`}>
                <div>
                  <p className={`font-medium text-foreground text-sm sm:text-base`}>{cat.name}</p>
                  <p className={`text-xs sm:text-sm text-muted-foreground`}>{cat.items} items</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => alert(`Edit ${cat.name}`)}
                    className={`p-2 hover:bg-secondary rounded text-muted-foreground`}
                  >
                    <Edit size={14} />
                  </button>
                  <button 
                    onClick={() => deleteCategory(idx)}
                    className={`p-2 hover:bg-secondary rounded text-muted-foreground`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customers */}
        <div className={`bg-card rounded-xl p-4 sm:p-6`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-base sm:text-lg font-semibold text-card-foreground`}>Customers</h3>
            <button 
              onClick={() => setShowCustomerModal(true)}
              className="px-2 sm:px-3 py-1 bg-teal-600 text-white rounded text-xs sm:text-sm hover:bg-teal-700"
            >
              Add
            </button>
          </div>
          <div className="space-y-2 mb-4">
            {customers.map((cust, idx) => (
              <div key={idx} className={`p-3 bg-muted rounded-lg`}>
                <p className={`font-medium text-foreground text-sm sm:text-base`}>{cust.name}</p>
                <p className={`text-xs sm:text-sm text-muted-foreground`}>{cust.phone} • {cust.orders} orders</p>
              </div>
            ))}
          </div>
        </div>

        {/* Offers */}
        <div className={`bg-card rounded-xl p-4 sm:p-6`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-base sm:text-lg font-semibold text-card-foreground`}>Offers</h3>
            <button 
              onClick={() => setShowOfferModal(true)}
              className="px-2 sm:px-3 py-1 bg-teal-600 text-white rounded text-xs sm:text-sm hover:bg-teal-700"
            >
              Create
            </button>
          </div>
          <div className="space-y-2">
            {offers.map((offer, idx) => (
              <div key={idx} className={`p-3 bg-muted rounded-lg`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className={`font-medium text-foreground text-sm sm:text-base`}>{offer.code}</p>
                    <p className={`text-xs sm:text-sm text-muted-foreground`}>{offer.type} • {offer.value} • {offer.category}</p>
                  </div>
                  <button 
                    onClick={() => alert(`Offer ${offer.code} disabled`)}
                    className="text-xs text-red-400 hover:text-red-500"
                  >
                    Disable
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KOT Printer, Staff, Expenses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* KOT Printer */}
        <div className={`bg-card rounded-xl p-4 sm:p-6`}>
          <h3 className={`text-base sm:text-lg font-semibold text-card-foreground mb-4`}>KOT Printer Settings</h3>
          <div className="space-y-4">
            <div>
              <p className={`text-xs sm:text-sm text-muted-foreground mb-2`}>Bluetooth</p>
              <button 
                onClick={() => alert('Searching for Bluetooth devices...')}
                className={`w-full py-2 bg-muted text-foreground rounded-lg mb-2 hover:bg-secondary text-sm`}
              >
                Search devices
              </button>
              <div className="flex gap-2">
                <button 
                  onClick={() => alert('Pairing with KOT printer...')}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-teal-600 text-white rounded-lg text-xs sm:text-sm hover:bg-teal-700"
                >
                  <Bluetooth size={16} />
                  Pair
                </button>
                <button 
                  onClick={testPrint}
                  className={`px-3 sm:px-4 py-2 bg-muted text-foreground rounded-lg text-xs sm:text-sm hover:bg-secondary`}
                >
                  Test Print
                </button>
              </div>
            </div>
            <p className={`text-xs sm:text-sm text-muted-foreground`}>Ensure printer is turned on and in pairing mode.</p>
          </div>
        </div>

        {/* Staff */}
        <div className={`bg-card rounded-xl p-4 sm:p-6`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-base sm:text-lg font-semibold text-card-foreground`}>Staff</h3>
            <button 
              onClick={() => setShowStaffModal(true)}
              className="px-2 sm:px-3 py-1 bg-teal-600 text-white rounded text-xs sm:text-sm hover:bg-teal-700"
            >
              Add
            </button>
          </div>
          <div className="space-y-2">
            {staff.map((member, idx) => (
              <div key={idx} className={`p-3 bg-muted rounded-lg`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className={`font-medium text-foreground text-sm sm:text-base`}>{member.name}</p>
                    <p className={`text-xs sm:text-sm text-muted-foreground`}>{member.role} • {member.payscale}</p>
                  </div>
                  <button 
                    onClick={() => alert(`Edit ${member.name}`)}
                    className="text-xs text-teal-400 hover:text-teal-500"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expenses */}
        <div className={`bg-card rounded-xl p-4 sm:p-6`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-base sm:text-lg font-semibold text-card-foreground`}>Expenses</h3>
            <button 
              onClick={() => setShowExpenseModal(true)}
              className="px-2 sm:px-3 py-1 bg-teal-600 text-white rounded text-xs sm:text-sm hover:bg-teal-700"
            >
              Add
            </button>
          </div>
          <div className="space-y-2">
            {expenses.map((exp, idx) => (
              <div key={idx} className={`p-3 bg-muted rounded-lg`}>
                <p className={`font-medium text-sm text-foreground`}>{exp.title}</p>
                <div className="flex justify-between items-center mt-1">
                  <p className={`text-xs sm:text-sm text-muted-foreground`}>{exp.date}</p>
                  <p className={`font-semibold text-foreground text-sm sm:text-base`}>{exp.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reports and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Reports */}
        <div className={`bg-card rounded-xl p-4 sm:p-6`}>
          <h3 className={`text-base sm:text-lg font-semibold text-card-foreground mb-4`}>Reports</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <p className={`text-xs sm:text-sm text-muted-foreground mb-2`}>Sales Report</p>
                <select className={`w-full bg-muted border border-border rounded px-3 py-2 text-sm text-foreground`}>
                  <option>Month</option>
                  <option>Day</option>
                  <option>Year</option>
                </select>
              </div>
              <div>
                <p className={`text-xs sm:text-sm text-muted-foreground mb-2`}>Order Report</p>
                <button 
                  onClick={() => selectDateRange('Order')}
                  className={`w-full py-2 bg-muted text-foreground rounded-lg text-sm hover:bg-secondary`}
                >
                  Select range
                </button>
              </div>
            </div>
            <div>
              <p className={`text-xs sm:text-sm text-muted-foreground mb-2`}>Expenses Report</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => selectDateRange('Expenses')}
                  className={`flex-1 py-2 bg-muted text-foreground rounded-lg text-sm hover:bg-secondary`}
                >
                  Select range
                </button>
                <button 
                  onClick={() => alert('Generating report...')}
                  className="px-4 sm:px-6 py-2 bg-teal-600 text-white rounded-lg text-sm hover:bg-teal-700"
                >
                  Generate
                </button>
              </div>
            </div>
            <div className={`bg-muted rounded-lg p-4`}>
              <div className="space-y-2">
                <div className={`flex justify-between text-xs sm:text-sm text-muted-foreground`}>
                  <span>Report</span>
                  <span>Period</span>
                  <span>Total</span>
                </div>
                <div className={`flex justify-between text-foreground text-sm`}>
                  <span>Sales (Month)</span>
                  <span className={`text-muted-foreground`}>Nov 2025</span>
                  <span className="font-semibold">₹ 2,45,000</span>
                </div>
                <div className={`flex justify-between text-foreground text-sm`}>
                  <span>Orders (Day)</span>
                  <span className={`text-muted-foreground`}>09 Nov 2025</span>
                  <span className="font-semibold">156</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className={`bg-card rounded-xl p-4 sm:p-6`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-base sm:text-lg font-semibold text-card-foreground`}>Notifications</h3>
            <button 
              onClick={() => setShowAllNotifications(!showAllNotifications)}
              className="text-teal-400 text-xs sm:text-sm hover:underline"
            >
              {showAllNotifications ? 'Show less' : 'See more'}
            </button>
          </div>
          <div className="space-y-3">
            {displayedNotifications.map((notif, idx) => (
              <div key={idx} className={`p-4 bg-muted rounded-lg`}>
                <div className="flex justify-between items-start mb-1">
                  <p className={`font-medium text-foreground text-sm sm:text-base`}>{notif.text}</p>
                  <span className={`text-xs text-muted-foreground`}>{notif.time}</span>
                </div>
                <p className={`text-xs sm:text-sm text-muted-foreground`}>{notif.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper icon components
const Download = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
  </svg>
);

const RefreshCw = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
  </svg>
);

export default Dashboard;