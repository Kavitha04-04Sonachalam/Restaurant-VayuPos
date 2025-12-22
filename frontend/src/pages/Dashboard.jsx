import React, { useState } from 'react';
import { DollarSign, ShoppingBag, TrendingUp, Wallet } from 'lucide-react';

const Dashboard = ({ isDarkMode = true, onNavigate }) => {
  const [showAllOrders, setShowAllOrders] = useState(false);
  
  // Modal states
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  // Form states
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', email: '' });
  const [newOffer, setNewOffer] = useState({ code: '', type: 'Percentage', value: '', category: '' });
  const [newStaff, setNewStaff] = useState({ name: '', role: 'Cashier', salary: '', joinDate: '' });
  const [newExpense, setNewExpense] = useState({ title: '', amount: '', date: '', category: 'Supplies' });

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
      setStaff([...staff, { 
        name: newStaff.name, 
        role: newStaff.role, 
        payscale: `₹${newStaff.salary}`, 
        joined: newStaff.joinDate || new Date().toLocaleDateString() 
      }]);
      setNewStaff({ name: '', role: 'Cashier', salary: '', joinDate: '' });
      setShowStaffModal(false);
      alert('Staff member added successfully!');
    } else {
      alert('Please fill in name and salary');
    }
  };

  const addExpense = () => {
    if (newExpense.title && newExpense.amount) {
      setExpenses([...expenses, { 
        ...newExpense, 
        amount: `₹ ${newExpense.amount}`, 
        source: 'Manual' 
      }]);
      setNewExpense({ title: '', amount: '', date: '', category: 'Supplies' });
      setShowExpenseModal(false);
      alert('Expense added successfully!');
    } else {
      alert('Please fill in title and amount');
    }
  };

  const displayedOrders = showAllOrders ? recentOrders : recentOrders.slice(0, 3);

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
    <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen">
      {/* Modals */}
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <h2 className="text-2xl font-semibold text-foreground">Dashboard</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-card rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <p className="text-muted-foreground text-xs sm:text-sm">Today Sales</p>
            <DollarSign className="text-teal-400" size={18} />
          </div>
          <p className="text-xl sm:text-3xl font-bold text-card-foreground">₹12,450</p>
        </div>
        <div className="bg-card rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <p className="text-muted-foreground text-xs sm:text-sm">Orders</p>
            <ShoppingBag className="text-teal-400" size={18} />
          </div>
          <p className="text-xl sm:text-3xl font-bold text-card-foreground">86</p>
        </div>
        <div className="bg-card rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <p className="text-muted-foreground text-xs sm:text-sm">Avg Ticket</p>
            <TrendingUp className="text-teal-400" size={18} />
          </div>
          <p className="text-xl sm:text-3xl font-bold text-card-foreground">₹145</p>
        </div>
        <div className="bg-card rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <p className="text-muted-foreground text-xs sm:text-sm">Expenses</p>
            <Wallet className="text-teal-400" size={18} />
          </div>
          <p className="text-xl sm:text-3xl font-bold text-card-foreground">₹3,120</p>
        </div>
      </div>

      {/* Quick Links, Recent Orders, Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Quick Links */}
        <div className="bg-card rounded-xl p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-card-foreground mb-4">Quick Links</h3>
          <div className="space-y-3">
            <button 
              onClick={handleNavigateToPOS}
              className="w-full flex items-center justify-between px-3 sm:px-4 py-3 bg-muted rounded-lg hover:bg-secondary transition text-foreground"
            >
              <div className="text-left">
                <p className="font-medium text-sm sm:text-base">Open POS</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Start billing and print KOT</p>
              </div>
              <span className="px-2 sm:px-3 py-1 bg-teal-600 text-xs sm:text-sm rounded whitespace-nowrap text-white">Open</span>
            </button>
            <button 
              onClick={handleNavigateToMenu}
              className="w-full flex items-center justify-between px-3 sm:px-4 py-3 bg-muted rounded-lg hover:bg-secondary transition text-foreground"
            >
              <div className="text-left">
                <p className="font-medium text-sm sm:text-base">Manage Menu</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Categories, items and prices</p>
              </div>
              <span className="px-2 sm:px-3 py-1 bg-teal-600 text-xs sm:text-sm rounded whitespace-nowrap text-white">Menu</span>
            </button>
            <button 
              onClick={handleNavigateToReports}
              className="w-full flex items-center justify-between px-3 sm:px-4 py-3 bg-muted rounded-lg hover:bg-secondary transition text-foreground"
            >
              <div className="text-left">
                <p className="font-medium text-sm sm:text-base">View Reports</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Sales and orders</p>
              </div>
              <span className="px-2 sm:px-3 py-1 bg-teal-600 text-xs sm:text-sm rounded whitespace-nowrap text-white">Reports</span>
            </button>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-card rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-card-foreground">Recent Orders</h3>
            <button 
              onClick={handleSeeAllOrders}
              className="text-teal-400 text-xs sm:text-sm hover:underline"
            >
              See all
            </button>
          </div>
          <div className="space-y-3">
            {displayedOrders.map(order => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="text-foreground">
                  <p className="font-medium text-xs sm:text-sm">#{order.id} • {order.type}</p>
                  <p className="text-xs text-muted-foreground">{order.time}</p>
                </div>
                <p className="font-semibold text-foreground text-sm sm:text-base">₹ {order.amount}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div className="bg-card rounded-xl p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-card-foreground mb-4">Activity</h3>
          <div className="space-y-4">
            {activities.map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <p className="text-foreground text-sm sm:text-base">{activity.action}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customers, Offers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Customers */}
        <div className="bg-card rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-card-foreground">Customers</h3>
            <button 
              onClick={() => setShowCustomerModal(true)}
              className="px-2 sm:px-3 py-1 bg-teal-600 text-white rounded text-xs sm:text-sm hover:bg-teal-700"
            >
              Add
            </button>
          </div>
          <div className="space-y-2 mb-4">
            {customers.map((cust, idx) => (
              <div key={idx} className="p-3 bg-muted rounded-lg">
                <p className="font-medium text-foreground text-sm sm:text-base">{cust.name}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{cust.phone} • {cust.orders} orders</p>
              </div>
            ))}
          </div>
        </div>

        {/* Offers */}
        <div className="bg-card rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-card-foreground">Offers</h3>
            <button 
              onClick={() => setShowOfferModal(true)}
              className="px-2 sm:px-3 py-1 bg-teal-600 text-white rounded text-xs sm:text-sm hover:bg-teal-700"
            >
              Create
            </button>
          </div>
          <div className="space-y-2">
            {offers.map((offer, idx) => (
              <div key={idx} className="p-3 bg-muted rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-foreground text-sm sm:text-base">{offer.code}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{offer.type} • {offer.value} • {offer.category}</p>
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

      {/* Staff, Expenses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Staff */}
        <div className="bg-card rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-card-foreground">Staff</h3>
            <button 
              onClick={() => setShowStaffModal(true)}
              className="px-2 sm:px-3 py-1 bg-teal-600 text-white rounded text-xs sm:text-sm hover:bg-teal-700"
            >
              Add
            </button>
          </div>
          <div className="space-y-2">
            {staff.map((member, idx) => (
              <div key={idx} className="p-3 bg-muted rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-foreground text-sm sm:text-base">{member.name}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{member.role} • {member.payscale}</p>
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
        <div className="bg-card rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-card-foreground">Expenses</h3>
            <button 
              onClick={() => setShowExpenseModal(true)}
              className="px-2 sm:px-3 py-1 bg-teal-600 text-white rounded text-xs sm:text-sm hover:bg-teal-700"
            >
              Add
            </button>
          </div>
          <div className="space-y-2">
            {expenses.map((exp, idx) => (
              <div key={idx} className="p-3 bg-muted rounded-lg">
                <p className="font-medium text-sm text-foreground">{exp.title}</p>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">{exp.date}</p>
                  <p className="font-semibold text-foreground text-sm sm:text-base">{exp.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;