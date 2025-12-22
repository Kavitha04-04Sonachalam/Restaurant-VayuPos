import React, { useState } from 'react';
import { 
  ArrowLeft, Save, Download, Edit, Copy, IndianRupee, Clock, 
  ShoppingBag, Trash2, PlusCircle, Search 
} from 'lucide-react';

// ============================================
// MOCK DATA
// ============================================

const MOCK_CUSTOMERS = [
  {
    id: 1,
    name: 'Anita Sharma',
    memberSince: 'Jan 2023',
    loyaltyPoints: 820,
    phone: '+91 98765 43210',
    email: 'anita.sharma@example.com',
    address: '12, MG Road, Mumbai',
    notes: 'Prefers less sugar, takeaway on weekdays',
    totalOrders: 34,
    lifetimeSpend: 12450,
    avgOrder: 366,
    lastVisit: '3 days ago'
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    memberSince: 'Mar 2023',
    loyaltyPoints: 650,
    phone: '+91 98765 43211',
    email: 'rajesh.kumar@example.com',
    address: '45, Brigade Road, Bangalore',
    notes: 'Regular customer, prefers spicy food',
    totalOrders: 28,
    lifetimeSpend: 9800,
    avgOrder: 350,
    lastVisit: '1 day ago'
  },
  {
    id: 3,
    name: 'Priya Patel',
    memberSince: 'Feb 2023',
    loyaltyPoints: 950,
    phone: '+91 98765 43212',
    email: 'priya.patel@example.com',
    address: '78, Nehru Place, Delhi',
    notes: 'VIP customer, allergic to peanuts',
    totalOrders: 42,
    lifetimeSpend: 15600,
    avgOrder: 371,
    lastVisit: '2 days ago'
  },
  {
    id: 4,
    name: 'Mohammed Ali',
    memberSince: 'Apr 2023',
    loyaltyPoints: 480,
    phone: '+91 98765 43213',
    email: 'mohammed.ali@example.com',
    address: '23, Park Street, Kolkata',
    notes: 'Prefers vegetarian options',
    totalOrders: 22,
    lifetimeSpend: 7200,
    avgOrder: 327,
    lastVisit: '5 days ago'
  },
  {
    id: 5,
    name: 'Sneha Reddy',
    memberSince: 'May 2023',
    loyaltyPoints: 720,
    phone: '+91 98765 43214',
    email: 'sneha.reddy@example.com',
    address: '56, Anna Salai, Chennai',
    notes: 'Loves South Indian cuisine',
    totalOrders: 31,
    lifetimeSpend: 10500,
    avgOrder: 339,
    lastVisit: '4 days ago'
  }
];

const MOCK_ORDERS = [
  {
    id: '#PO-10234',
    date: '05 Nov 2025, 12:41',
    items: 'Masala Dosa, Coffee',
    total: 245,
    payment: ['Paid', 'UPI']
  },
  {
    id: '#PO-10198',
    date: '29 Oct 2025, 19:05',
    items: 'Veg Sandwich, Tea',
    total: 180,
    payment: ['Paid', 'Cash']
  },
  {
    id: '#PO-10165',
    date: '18 Oct 2025, 14:12',
    items: 'Idli Sambar, Filter Coffee',
    total: 210,
    payment: ['Paid', 'Card']
  },
  {
    id: '#PO-10134',
    date: '12 Oct 2025, 11:30',
    items: 'Paneer Sandwich, Cold Coffee',
    total: 195,
    payment: ['Pending', 'Cash']
  },
  {
    id: '#PO-10098',
    date: '28 Sep 2025, 16:45',
    items: 'Masala Dosa, Filter Coffee',
    total: 230,
    payment: ['Paid', 'UPI']
  }
];

// ============================================
// MODAL COMPONENTS
// ============================================

const DeleteModal = ({ isOpen, customerName, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl p-5 sm:p-6 max-w-md w-full mx-4">
        <h3 className="text-base sm:text-lg font-semibold text-card-foreground mb-3 sm:mb-4">
          Delete Customer
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground mb-5 sm:mb-6">
          Are you sure you want to delete {customerName}? This will remove their profile and all order history. This action cannot be undone.
        </p>
        <div className="flex gap-2 sm:gap-3">
          <button 
            onClick={onConfirm}
            className="flex-1 py-2 sm:py-2.5 text-sm sm:text-base bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
          >
            Delete
          </button>
          <button 
            onClick={onCancel}
            className="flex-1 py-2 sm:py-2.5 text-sm sm:text-base bg-muted text-foreground rounded-lg hover:bg-secondary font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const OfferModal = ({ isOpen, customerName, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl p-5 sm:p-6 max-w-md w-full mx-4">
        <h3 className="text-base sm:text-lg font-semibold text-card-foreground mb-3 sm:mb-4">
          Apply Offer
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
          Select an offer to apply to {customerName}'s next order:
        </p>
        <select className="w-full bg-muted border border-border rounded px-3 py-2 text-sm text-foreground mb-5 sm:mb-6">
          <option>TEA5 - ₹5 off on Beverages</option>
          <option>SAVE10 - 10% off on total bill</option>
          <option>COMBO20 - 20% off on combo meals</option>
        </select>
        <div className="flex gap-2 sm:gap-3">
          <button 
            onClick={onConfirm}
            className="flex-1 py-2 sm:py-2.5 text-sm sm:text-base bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium"
          >
            Apply Offer
          </button>
          <button 
            onClick={onCancel}
            className="flex-1 py-2 sm:py-2.5 text-sm sm:text-base bg-muted text-foreground rounded-lg hover:bg-secondary font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// CUSTOMER STATS COMPONENT
// ============================================

const CustomerStats = ({ customer }) => {
  const stats = [
    {
      icon: Copy,
      label: 'Total Orders',
      value: customer.totalOrders
    },
    {
      icon: IndianRupee,
      label: 'Lifetime Spend',
      value: `₹${customer.lifetimeSpend.toLocaleString()}`
    },
    {
      icon: ShoppingBag,
      label: 'Avg Order',
      value: `₹${customer.avgOrder}`
    },
    {
      icon: Clock,
      label: 'Last Visit',
      value: customer.lastVisit
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:gap-4 mt-4 sm:mt-5 lg:mt-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-muted rounded-lg p-3 sm:p-4">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
            <stat.icon size={14} className="sm:w-4 sm:h-4 text-muted-foreground" />
            <span className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground font-medium">
              {stat.label}
            </span>
          </div>
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-card-foreground">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
};

// ============================================
// ORDER TABLE COMPONENTS
// ============================================

const OrderTableDesktop = ({ orders, onViewOrder, onReorder }) => (
  <div className="hidden md:block overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="border-b border-border">
          <th className="text-left py-3 px-2 text-xs lg:text-sm text-muted-foreground font-semibold">Order ID</th>
          <th className="text-left py-3 px-2 text-xs lg:text-sm text-muted-foreground font-semibold">Date</th>
          <th className="text-left py-3 px-2 text-xs lg:text-sm text-muted-foreground font-semibold">Items</th>
          <th className="text-left py-3 px-2 text-xs lg:text-sm text-muted-foreground font-semibold">Total</th>
          <th className="text-left py-3 px-2 text-xs lg:text-sm text-muted-foreground font-semibold">Payment</th>
          <th className="text-left py-3 px-2 text-xs lg:text-sm text-muted-foreground font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr key={index} className="border-b border-border hover:bg-muted transition">
            <td className="py-3 px-2 text-xs lg:text-sm text-foreground font-medium">{order.id}</td>
            <td className="py-3 px-2 text-xs lg:text-sm text-foreground whitespace-nowrap">{order.date}</td>
            <td className="py-3 px-2 text-xs lg:text-sm text-foreground">{order.items}</td>
            <td className="py-3 px-2 text-xs lg:text-sm text-foreground font-semibold">₹{order.total}</td>
            <td className="py-3 px-2">
              <div className="flex gap-1.5 flex-wrap">
                {order.payment.map((method, i) => (
                  <span 
                    key={i} 
                    className={`px-2 py-0.5 text-[10px] lg:text-xs rounded-full font-medium ${
                      method === 'Pending' ? 'bg-yellow-600' : 'bg-teal-600'
                    } text-white`}
                  >
                    {method}
                  </span>
                ))}
              </div>
            </td>
            <td className="py-3 px-2">
              <div className="flex gap-1.5">
                <button 
                  onClick={() => onViewOrder(order)}
                  className="px-2.5 py-1 bg-teal-600 text-white rounded text-[10px] lg:text-xs hover:bg-teal-700 font-medium"
                >
                  View
                </button>
                <button 
                  onClick={() => onReorder(order)}
                  className="px-2.5 py-1 bg-teal-600 text-white rounded text-[10px] lg:text-xs hover:bg-teal-700 font-medium"
                >
                  Reorder
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const OrderCardsMobile = ({ orders, onViewOrder, onReorder }) => (
  <div className="md:hidden space-y-3">
    {orders.map((order, index) => (
      <div key={index} className="bg-muted rounded-lg p-3 sm:p-4">
        <div className="flex justify-between items-start mb-2 sm:mb-3 gap-2">
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-foreground text-xs sm:text-sm truncate">{order.id}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">{order.date}</p>
          </div>
          <div className="flex gap-1.5 flex-shrink-0">
            {order.payment.map((method, i) => (
              <span 
                key={i} 
                className={`px-2 py-0.5 text-[10px] rounded-full font-medium whitespace-nowrap ${
                  method === 'Pending' ? 'bg-yellow-600' : 'bg-teal-600'
                } text-white`}
              >
                {method}
              </span>
            ))}
          </div>
        </div>
        <p className="text-xs sm:text-sm text-foreground mb-2 sm:mb-3 line-clamp-2">{order.items}</p>
        <div className="flex justify-between items-center gap-2">
          <p className="text-base sm:text-lg font-bold text-foreground">₹{order.total}</p>
          <div className="flex gap-1.5 sm:gap-2">
            <button 
              onClick={() => onViewOrder(order)}
              className="px-2.5 sm:px-3 py-1 bg-teal-600 text-white rounded text-[10px] sm:text-xs hover:bg-teal-700 font-medium"
            >
              View
            </button>
            <button 
              onClick={() => onReorder(order)}
              className="px-2.5 sm:px-3 py-1 bg-teal-600 text-white rounded text-[10px] sm:text-xs hover:bg-teal-700 font-medium"
            >
              Reorder
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// ============================================
// CUSTOMER DETAIL VIEW
// ============================================

const CustomerDetailView = ({ 
  customer, 
  editData,
  isEditing,
  onBack,
  onSave,
  onEdit,
  onEditDataChange,
  onStartPOS,
  onApplyOffer,
  onDeleteCustomer,
  onViewOrder,
  onReorder,
  onExport
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('Last 30 days');
  const [statusFilter, setStatusFilter] = useState('All / Paid / Pending');

  // Filter orders
  const filteredOrders = MOCK_ORDERS.filter(order => {
    const matchesSearch = searchQuery === '' || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All / Paid / Pending' ||
      order.payment.some(p => p.toLowerCase() === statusFilter.toLowerCase());

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background text-foreground p-3 sm:p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 lg:mb-8 gap-3 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            onClick={onBack}
            className="text-teal-400 hover:text-teal-300 p-1"
          >
            <ArrowLeft size={20} className="sm:w-6 sm:h-6" />
          </button>
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Customer Details</h2>
        </div>
        <button 
          onClick={onSave}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm sm:text-base font-medium"
        >
          <Save size={16} className="sm:w-[18px] sm:h-[18px]" />
          Save
        </button>
      </div>

      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-5 lg:space-y-6">
        {/* Basic Details Card */}
        <div className="bg-card rounded-xl p-4 sm:p-5 lg:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-5 lg:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-card-foreground">Basic Details</h3>
            <button 
              onClick={onEdit}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-xs sm:text-sm font-medium"
            >
              {isEditing ? (
                <>
                  <Save size={14} className="sm:w-4 sm:h-4" /> Save
                </>
              ) : (
                <>
                  <Edit size={14} className="sm:w-4 sm:h-4" /> Edit
                </>
              )}
            </button>
          </div>

          {/* Customer Header */}
          <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5 lg:mb-6">
            <div className="bg-muted text-foreground w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold flex-shrink-0">
              {customer.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-card-foreground mb-1">
                {customer.name}
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                Customer since {customer.memberSince}
              </p>
              <span className="inline-block px-2.5 sm:px-3 py-1 bg-teal-600 text-white text-xs sm:text-sm rounded-full font-medium">
                Loyalty: {customer.loyaltyPoints} pts
              </span>
            </div>
          </div>

          {/* Editable Fields */}
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-2 font-medium">Phone</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.phone}
                  onChange={(e) => onEditDataChange({ ...editData, phone: e.target.value })}
                  className="w-full bg-muted text-foreground rounded-lg border border-border px-3 py-2 text-sm sm:text-base outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
              ) : (
                <div className="bg-muted text-foreground rounded-lg px-3 py-2 text-sm sm:text-base">
                  {customer.phone}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-2 font-medium">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => onEditDataChange({ ...editData, email: e.target.value })}
                  className="w-full bg-muted text-foreground rounded-lg border border-border px-3 py-2 text-sm sm:text-base outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
              ) : (
                <div className="bg-muted text-foreground rounded-lg px-3 py-2 text-sm sm:text-base break-all">
                  {customer.email}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-2 font-medium">Address</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.address}
                  onChange={(e) => onEditDataChange({ ...editData, address: e.target.value })}
                  className="w-full bg-muted text-foreground rounded-lg border border-border px-3 py-2 text-sm sm:text-base outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
              ) : (
                <div className="bg-muted text-foreground rounded-lg px-3 py-2 text-sm sm:text-base">
                  {customer.address}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-2 font-medium">Notes</label>
              {isEditing ? (
                <textarea
                  value={editData.notes}
                  onChange={(e) => onEditDataChange({ ...editData, notes: e.target.value })}
                  className="w-full bg-muted text-foreground rounded-lg border border-border px-3 py-2 text-sm sm:text-base outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 min-h-[80px]"
                />
              ) : (
                <div className="bg-muted text-foreground rounded-lg px-3 py-2 text-sm sm:text-base">
                  {customer.notes}
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <CustomerStats customer={customer} />
        </div>

        {/* Past Orders */}
        <div className="bg-card rounded-xl p-4 sm:p-5 lg:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-5 lg:mb-6 gap-3">
            <h3 className="text-base sm:text-lg font-semibold text-card-foreground">Past Orders</h3>
            <button 
              onClick={onExport}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-xs sm:text-sm font-medium"
            >
              <Download size={14} className="sm:w-[18px] sm:h-[18px]" />
              Export
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-5 lg:mb-6">
            <div>
              <label className="block text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-2 font-medium">
                Search orders
              </label>
              <input
                type="text"
                placeholder="Order ID, items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-muted text-foreground border border-border rounded-lg px-3 py-2 text-xs sm:text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-2 font-medium">
                Date range
              </label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full bg-muted text-foreground border border-border rounded-lg px-3 py-2 text-xs sm:text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              >
                <option>Last 30 days</option>
                <option>Last 7 days</option>
                <option>Last 90 days</option>
                <option>All time</option>
              </select>
            </div>
            <div>
              <label className="block text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-2 font-medium">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-muted text-foreground border border-border rounded-lg px-3 py-2 text-xs sm:text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              >
                <option>All / Paid / Pending</option>
                <option>Paid</option>
                <option>Pending</option>
              </select>
            </div>
          </div>

          <OrderTableDesktop orders={filteredOrders} onViewOrder={onViewOrder} onReorder={onReorder} />
          <OrderCardsMobile orders={filteredOrders} onViewOrder={onViewOrder} onReorder={onReorder} />

          {filteredOrders.length === 0 && (
            <div className="text-center py-10 sm:py-12">
              <p className="text-muted-foreground text-xs sm:text-sm">
                No orders found matching your filters
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-card rounded-xl p-4 sm:p-5 lg:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-card-foreground mb-3 sm:mb-4">
            Quick Actions
          </h3>
          <div className="space-y-2.5 sm:space-y-3">
            <div className="flex items-center justify-between p-3 sm:p-4 bg-muted rounded-lg hover:bg-secondary transition gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-xs sm:text-sm lg:text-base text-foreground mb-0.5 sm:mb-1">
                  Create New Order
                </p>
                <p className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground">
                  Start POS with {customer.name.split(' ')[0]}'s details
                </p>
              </div>
              <button 
                onClick={onStartPOS}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 whitespace-nowrap text-xs sm:text-sm font-medium flex-shrink-0"
              >
                <PlusCircle size={14} className="sm:w-[18px] sm:h-[18px]" />
                Start
              </button>
            </div>

            <div className="flex items-center justify-between p-3 sm:p-4 bg-muted rounded-lg hover:bg-secondary transition gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-xs sm:text-sm lg:text-base text-foreground mb-0.5 sm:mb-1">
                  Send Offer
                </p>
                <p className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground">
                  Apply coupon to next order
                </p>
              </div>
              <button 
                onClick={onApplyOffer}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 whitespace-nowrap text-xs sm:text-sm font-medium flex-shrink-0"
              >
                <Copy size={14} className="sm:w-[18px] sm:h-[18px]" />
                Apply
              </button>
            </div>

            <div className="flex items-center justify-between p-3 sm:p-4 bg-muted rounded-lg hover:bg-secondary transition gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-xs sm:text-sm lg:text-base text-foreground mb-0.5 sm:mb-1">
                  Delete Customer
                </p>
                <p className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground">
                  Remove profile and history
                </p>
              </div>
              <button 
                onClick={onDeleteCustomer}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 whitespace-nowrap text-xs sm:text-sm font-medium flex-shrink-0"
              >
                <Trash2 size={14} className="sm:w-[18px] sm:h-[18px]" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// CUSTOMER LIST VIEW
// ============================================

const CustomerListView = ({ customers, onSelectCustomer }) => {
  const [customerSearchQuery, setCustomerSearchQuery] = useState('');

  // Filter customers
  const filteredCustomers = customers.filter(customer => 
    customerSearchQuery === '' ||
    customer.name.toLowerCase().includes(customerSearchQuery.toLowerCase()) ||
    customer.phone.includes(customerSearchQuery) ||
    customer.email.toLowerCase().includes(customerSearchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground p-3 sm:p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 lg:mb-8 gap-3 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            onClick={() => alert('Going back...')}
            className="text-teal-400 hover:text-teal-300 p-1"
          >
            <ArrowLeft size={20} className="sm:w-6 sm:h-6" />
          </button>
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Customer List</h2>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-5 lg:space-y-6">
        {/* Customer List Card */}
        <div className="bg-card rounded-xl p-4 sm:p-5 lg:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-5 gap-3">
            <h3 className="text-base sm:text-lg font-semibold text-card-foreground">Customers</h3>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="text"
                placeholder="Search customers..."
                value={customerSearchQuery}
                onChange={(e) => setCustomerSearchQuery(e.target.value)}
                className="w-full bg-muted text-foreground border border-border rounded-lg pl-10 pr-3 py-2 text-xs sm:text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-xs lg:text-sm text-muted-foreground font-semibold">Name</th>
                  <th className="text-left py-3 px-2 text-xs lg:text-sm text-muted-foreground font-semibold">Phone</th>
                  <th className="text-left py-3 px-2 text-xs lg:text-sm text-muted-foreground font-semibold">Email</th>
                  <th className="text-left py-3 px-2 text-xs lg:text-sm text-muted-foreground font-semibold">Orders</th>
                  <th className="text-left py-3 px-2 text-xs lg:text-sm text-muted-foreground font-semibold">Loyalty</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr 
                    key={customer.id}
                    onClick={() => onSelectCustomer(customer)}
                    className="border-b border-border cursor-pointer transition hover:bg-muted"
                  >
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <div className="bg-muted text-foreground w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-xs lg:text-sm text-foreground font-medium">{customer.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-xs lg:text-sm text-foreground">{customer.phone}</td>
                    <td className="py-3 px-2 text-xs lg:text-sm text-foreground">{customer.email}</td>
                    <td className="py-3 px-2 text-xs lg:text-sm text-foreground font-semibold">{customer.totalOrders}</td>
                    <td className="py-3 px-2">
                      <span className="inline-block px-2 py-0.5 bg-teal-600 text-white text-xs rounded-full font-medium">
                        {customer.loyaltyPoints} pts
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                onClick={() => onSelectCustomer(customer)}
                className="p-3 sm:p-4 rounded-lg cursor-pointer transition bg-muted hover:bg-secondary"
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className="bg-background text-foreground w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {customer.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">{customer.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{customer.email}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{customer.phone}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-border">
                  <span className="text-xs text-muted-foreground">
                    Orders: <span className="font-semibold text-foreground">{customer.totalOrders}</span>
                  </span>
                  <span className="inline-block px-2 py-0.5 bg-teal-600 text-white text-xs rounded-full font-medium">
                    {customer.loyaltyPoints} pts
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredCustomers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground text-xs sm:text-sm">No customers found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN CUSTOMERS COMPONENT
// ============================================

function Customers() {
  const [view, setView] = useState('list');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);

  // Handlers
  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setEditData({ ...customer });
    setIsEditing(false);
    setView('detail');
  };

  const handleBack = () => {
    setView('list');
    setIsEditing(false);
    setSelectedCustomer(null);
    setEditData(null);
  };

  const handleEdit = () => {
    if (isEditing) {
      // Save changes
      setSelectedCustomer({ ...editData });
      alert('Customer details saved successfully!');
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    if (isEditing) {
      handleEdit();
    } else {
      alert('All changes saved successfully!');
    }
  };

  const handleStartPOS = () => {
    alert(`Starting POS with customer: ${selectedCustomer.name}\nPhone: ${selectedCustomer.phone}`);
  };

  const handleApplyOffer = () => {
    setShowOfferModal(true);
  };

  const confirmApplyOffer = () => {
    alert(`Offer applied to ${selectedCustomer.name}'s account!\nThey will receive a notification.`);
    setShowOfferModal(false);
  };

  const handleDeleteCustomer = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    alert(`Customer ${selectedCustomer.name} has been deleted along with all order history.`);
    setShowDeleteModal(false);
    handleBack();
  };

  const handleViewOrder = (order) => {
    alert(`Order Details:\n\nOrder ID: ${order.id}\nDate: ${order.date}\nItems: ${order.items}\nTotal: ₹${order.total}\nPayment: ${order.payment.join(', ')}`);
  };

  const handleReorder = (order) => {
    alert(`Reordering items:\n${order.items}\n\nAdded to POS cart for ${selectedCustomer.name}`);
  };

  const handleExport = () => {
    alert('Exporting order history...\n\nFormat: CSV\nIncluding: All orders, payments, and customer details');
  };

  return (
    <>
      {/* Modals */}
      <DeleteModal 
        isOpen={showDeleteModal}
        customerName={selectedCustomer?.name}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
      
      <OfferModal 
        isOpen={showOfferModal}
        customerName={selectedCustomer?.name}
        onConfirm={confirmApplyOffer}
        onCancel={() => setShowOfferModal(false)}
      />

      {/* Views */}
      {view === 'list' ? (
        <CustomerListView 
          customers={MOCK_CUSTOMERS}
          onSelectCustomer={handleSelectCustomer}
        />
      ) : (
        <CustomerDetailView 
          customer={selectedCustomer}
          editData={editData}
          isEditing={isEditing}
          onBack={handleBack}
          onSave={handleSave}
          onEdit={handleEdit}
          onEditDataChange={setEditData}
          onStartPOS={handleStartPOS}
          onApplyOffer={handleApplyOffer}
          onDeleteCustomer={handleDeleteCustomer}
          onViewOrder={handleViewOrder}
          onReorder={handleReorder}
          onExport={handleExport}
        />
      )}
    </>
  );
}

export default Customers;