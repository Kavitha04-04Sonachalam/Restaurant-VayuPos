import React, { useState, useEffect } from 'react';
import { Download, Plus, RefreshCw, X, Save, Edit, Trash2, Link2, FolderOpen } from 'lucide-react';

// Reusable Modal Component
function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-3xl" }) {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      
      // Handle ESC key
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        // Restore body scroll when modal closes
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-3 sm:p-4 animate-fadeIn overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div 
        className={`bg-card rounded-xl shadow-2xl w-full ${maxWidth} my-8 animate-slideUp`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 lg:p-5 border-b border-border flex-shrink-0">
          <h2 className="text-foreground text-sm sm:text-base lg:text-lg font-semibold pr-4">{title}</h2>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 flex-shrink-0"
          >
            <X size={20} className="sm:w-[22px] sm:h-[22px]" />
          </button>
        </div>
        
        {/* Modal Body - Scrollable */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-3 sm:p-4 lg:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

function Offers() {
  const [coupons, setCoupons] = useState([
    {
      id: 1,
      name: 'Diwali Flat 50',
      code: 'DIW50',
      type: 'Flat',
      value: 50,
      startDate: '2025-11-01',
      endDate: '2025-11-30',
      usageLimit: 'Per user: 2',
      minOrder: 299,
      assignedTo: 'Categories: Beverages, South Indian',
      validity: '01-30 Nov 2025',
      status: 'Active'
    },
    {
      id: 2,
      name: 'New User 20%',
      code: 'NEW20',
      type: 'Percentage',
      value: 20,
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      usageLimit: 'Per user: 1',
      minOrder: 0,
      assignedTo: 'Orders',
      validity: '01 Jan 2025 – 31 Dec 2025',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Summer Combo 100',
      code: 'COMBO100',
      type: 'Flat',
      value: 100,
      startDate: '2025-04-01',
      endDate: '2025-05-31',
      usageLimit: 'Per user: 3',
      minOrder: 500,
      assignedTo: 'Categories: Combos',
      validity: '01 Apr 2025 – 31 May 2025',
      status: 'Expired'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All / Percentage / Flat');
  const [statusFilter, setStatusFilter] = useState('All / Active / Expired');
  const [editingId, setEditingId] = useState(null);
  const [showCouponModal, setShowCouponModal] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'Percentage',
    value: '',
    code: '',
    startDate: '',
    endDate: '',
    usageLimit: '',
    minOrder: '',
    assignTo: 'Orders',
    categories: '',
    notes: ''
  });

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [assignOrderId, setAssignOrderId] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = ['Beverages', 'Snacks', 'South Indian', 'Combos', 'North Indian', 'Chinese'];

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'Percentage',
      value: '',
      code: '',
      startDate: '',
      endDate: '',
      usageLimit: '',
      minOrder: '',
      assignTo: 'Orders',
      categories: '',
      notes: ''
    });
    setEditingId(null);
  };

  const handleNewCoupon = () => {
    resetForm();
    setShowCouponModal(true);
  };

  const handleSaveCoupon = () => {
    if (!formData.name || !formData.code || !formData.value) {
      alert('Please fill in all required fields (Name, Code, Value)');
      return;
    }

    if (editingId !== null) {
      setCoupons(coupons.map(c => 
        c.id === editingId 
          ? {
              ...c,
              name: formData.name,
              code: formData.code,
              type: formData.type,
              value: parseFloat(formData.value),
              startDate: formData.startDate,
              endDate: formData.endDate,
              usageLimit: formData.usageLimit,
              minOrder: parseFloat(formData.minOrder) || 0,
              assignedTo: formData.assignTo === 'Categories' ? `Categories: ${formData.categories}` : 'Orders',
              validity: formData.startDate && formData.endDate ? `${new Date(formData.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} – ${new Date(formData.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}` : '',
              status: formData.endDate && new Date(formData.endDate) < new Date() ? 'Expired' : 'Active'
            }
          : c
      ));
      alert('Coupon updated successfully!');
    } else {
      const newCoupon = {
        id: Math.max(...coupons.map(c => c.id), 0) + 1,
        name: formData.name,
        code: formData.code,
        type: formData.type,
        value: parseFloat(formData.value),
        startDate: formData.startDate,
        endDate: formData.endDate,
        usageLimit: formData.usageLimit,
        minOrder: parseFloat(formData.minOrder) || 0,
        assignedTo: formData.assignTo === 'Categories' ? `Categories: ${formData.categories}` : 'Orders',
        validity: formData.startDate && formData.endDate ? `${new Date(formData.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} – ${new Date(formData.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}` : '',
        status: formData.endDate && new Date(formData.endDate) < new Date() ? 'Expired' : 'Active'
      };
      setCoupons([...coupons, newCoupon]);
      alert('Coupon created successfully!');
    }
    resetForm();
    setShowCouponModal(false);
  };

  const handleCancel = () => {
    resetForm();
    setShowCouponModal(false);
  };

  const handleEdit = (coupon) => {
    setFormData({
      name: coupon.name,
      type: coupon.type,
      value: coupon.value.toString(),
      code: coupon.code,
      startDate: coupon.startDate,
      endDate: coupon.endDate,
      usageLimit: coupon.usageLimit,
      minOrder: coupon.minOrder.toString(),
      assignTo: coupon.assignedTo.includes('Categories') ? 'Categories' : 'Orders',
      categories: coupon.assignedTo.includes('Categories') ? coupon.assignedTo.replace('Categories: ', '') : '',
      notes: ''
    });
    setEditingId(coupon.id);
    setShowCouponModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      setCoupons(coupons.filter(c => c.id !== id));
      alert('Coupon deleted successfully!');
    }
  };

  const handleSync = () => {
    alert('Syncing coupons with server...');
    setTimeout(() => {
      alert('Coupons synced successfully!');
    }, 500);
  };

  const handleAssign = (coupon) => {
    setSelectedCoupon(coupon);
    setShowAssignModal(true);
  };

  const handleAssignToOrder = () => {
    if (!assignOrderId) {
      alert('Please enter an order ID');
      return;
    }
    alert(`Coupon ${selectedCoupon.code} assigned to Order #${assignOrderId}`);
    setShowAssignModal(false);
    setAssignOrderId('');
  };

  const handleQuickAssignOrder = () => {
    const orderId = window.prompt('Enter Order ID:');
    if (orderId) {
      alert(`Quick assign to Order #${orderId}`);
    }
  };

  const handleChooseCategories = () => {
    setShowCategoryModal(true);
  };

  const handleSaveCategories = () => {
    if (selectedCategories.length === 0) {
      alert('Please select at least one category');
      return;
    }
    alert(`Categories assigned: ${selectedCategories.join(', ')}`);
    setShowCategoryModal(false);
    setSelectedCategories([]);
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleExport = () => {
    // Create CSV content
    const headers = ['ID', 'Name', 'Code', 'Type', 'Value', 'Start Date', 'End Date', 'Usage Limit', 'Min Order', 'Assigned To', 'Validity', 'Status'];
    
    const csvRows = [
      headers.join(','),
      ...filteredCoupons.map(coupon => [
        coupon.id,
        `"${coupon.name}"`,
        coupon.code,
        coupon.type,
        coupon.value,
        coupon.startDate,
        coupon.endDate,
        `"${coupon.usageLimit}"`,
        coupon.minOrder,
        `"${coupon.assignedTo}"`,
        `"${coupon.validity}"`,
        coupon.status
      ].join(','))
    ];
    
    const csvContent = csvRows.join('\n');
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `coupons_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert('Export completed! CSV file downloaded.');
  };

  const filteredCoupons = coupons.filter(coupon => {
    const matchesSearch = coupon.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         coupon.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'All / Percentage / Flat' || coupon.type === typeFilter;
    const matchesStatus = statusFilter === 'All / Active / Expired' || coupon.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>

      {/* Create/Edit Coupon Modal */}
      <Modal 
        isOpen={showCouponModal} 
        onClose={handleCancel}
        title={editingId !== null ? 'Edit Coupon' : 'Create New Coupon'}
        maxWidth="max-w-md sm:max-w-xl lg:max-w-2xl xl:max-w-3xl"
      >
        <div className="flex flex-col gap-3 sm:gap-4">
          {/* Coupon Name */}
          <div>
            <label className="text-muted-foreground text-xs sm:text-sm mb-1.5 block">Coupon Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full bg-muted text-foreground border border-border rounded-md outline-none px-3 py-2 text-sm sm:text-base focus:border-teal-600"
              placeholder="e.g., Diwali Flat 50"
            />
          </div>

          {/* Type, Value, Code */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-muted-foreground text-xs sm:text-sm mb-1.5 block">Type *</label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="w-full bg-muted text-foreground border border-border rounded-md outline-none px-3 py-2 text-sm sm:text-base focus:border-teal-600"
              >
                <option>Percentage</option>
                <option>Flat</option>
              </select>
            </div>
            <div>
              <label className="text-muted-foreground text-xs sm:text-sm mb-1.5 block">Value *</label>
              <input
                type="text"
                value={formData.value}
                onChange={(e) => handleInputChange('value', e.target.value)}
                className="w-full bg-muted text-foreground border border-border rounded-md outline-none px-3 py-2 text-sm sm:text-base focus:border-teal-600"
                placeholder="e.g., 50 or 10"
              />
            </div>
            <div>
              <label className="text-muted-foreground text-xs sm:text-sm mb-1.5 block">Code *</label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => handleInputChange('code', e.target.value.toUpperCase())}
                className="w-full bg-muted text-foreground border border-border rounded-md outline-none px-3 py-2 text-sm sm:text-base focus:border-teal-600"
                placeholder="e.g., DIW50"
              />
            </div>
          </div>

          {/* Start Date, End Date, Usage Limit */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-muted-foreground text-xs sm:text-sm mb-1.5 block">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className="w-full bg-muted text-foreground border border-border rounded-md outline-none px-3 py-2 text-sm sm:text-base focus:border-teal-600"
              />
            </div>
            <div>
              <label className="text-muted-foreground text-xs sm:text-sm mb-1.5 block">End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                className="w-full bg-muted text-foreground border border-border rounded-md outline-none px-3 py-2 text-sm sm:text-base focus:border-teal-600"
              />
            </div>
            <div>
              <label className="text-muted-foreground text-xs sm:text-sm mb-1.5 block">Usage Limit</label>
              <input
                type="text"
                value={formData.usageLimit}
                onChange={(e) => handleInputChange('usageLimit', e.target.value)}
                className="w-full bg-muted text-foreground border border-border rounded-md outline-none px-3 py-2 text-sm sm:text-base focus:border-teal-600"
                placeholder="e.g., Per user: 2"
              />
            </div>
          </div>

          {/* Minimum Order Amount */}
          <div>
            <label className="text-muted-foreground text-xs sm:text-sm mb-1.5 block">Minimum Order Amount</label>
            <input
              type="text"
              value={formData.minOrder}
              onChange={(e) => handleInputChange('minOrder', e.target.value)}
              className="w-full bg-muted text-foreground border border-border rounded-md outline-none px-3 py-2 text-sm sm:text-base focus:border-teal-600"
              placeholder="e.g., 299"
            />
          </div>

          {/* Assign To */}
          <div>
            <label className="text-muted-foreground text-xs sm:text-sm mb-1.5 block">Assign To</label>
            <select
              value={formData.assignTo}
              onChange={(e) => handleInputChange('assignTo', e.target.value)}
              className="w-full bg-muted text-foreground border border-border rounded-md outline-none px-3 py-2 text-sm sm:text-base focus:border-teal-600"
            >
              <option>Orders</option>
              <option>Categories</option>
            </select>
          </div>

          {/* Categories */}
          {formData.assignTo === 'Categories' && (
            <div>
              <label className="text-muted-foreground text-xs sm:text-sm mb-1.5 block">Categories</label>
              <input
                type="text"
                value={formData.categories}
                onChange={(e) => handleInputChange('categories', e.target.value)}
                className="w-full bg-muted text-foreground border border-border rounded-md outline-none px-3 py-2 text-sm sm:text-base focus:border-teal-600"
                placeholder="e.g., Beverages, Snacks"
              />
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="text-muted-foreground text-xs sm:text-sm mb-1.5 block">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows="3"
              className="w-full bg-muted text-foreground border border-border rounded-md outline-none resize-y px-3 py-2 text-sm sm:text-base focus:border-teal-600"
              placeholder="Optional notes about this coupon..."
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-2">
            <button 
              onClick={handleCancel}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-border text-muted-foreground bg-transparent rounded-lg text-sm sm:text-base hover:bg-muted transition-colors order-2 sm:order-1"
            >
              <X size={16} className="sm:w-[18px] sm:h-[18px]" />
              Cancel
            </button>
            <button 
              onClick={handleSaveCoupon}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-lg text-sm sm:text-base font-medium hover:bg-teal-700 transition-colors order-1 sm:order-2"
            >
              <Save size={16} className="sm:w-[18px] sm:h-[18px]" />
              {editingId !== null ? 'Update Coupon' : 'Save Coupon'}
            </button>
          </div>

          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
            * Required fields. Create/manage coupons (X% off, flat discounts) and assign to orders or categories.
          </p>
        </div>
      </Modal>

      {/* Assign Modal */}
      <Modal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        title={`Assign Coupon: ${selectedCoupon?.code}`}
        maxWidth="max-w-sm sm:max-w-md"
      >
        <div className="space-y-4">
          <input 
            type="text"
            placeholder="Enter Order ID"
            value={assignOrderId}
            onChange={(e) => setAssignOrderId(e.target.value)}
            className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm sm:text-base text-foreground focus:border-teal-600 outline-none"
          />
          <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3">
            <button 
              onClick={() => setShowAssignModal(false)} 
              className="flex-1 py-2.5 bg-muted text-foreground rounded-lg text-sm sm:text-base hover:bg-secondary transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleAssignToOrder} 
              className="flex-1 py-2.5 bg-teal-600 text-white rounded-lg text-sm sm:text-base hover:bg-teal-700 transition-colors"
            >
              Assign
            </button>
          </div>
        </div>
      </Modal>

      {/* Category Selection Modal */}
      <Modal
        isOpen={showCategoryModal}
        onClose={() => {
          setShowCategoryModal(false);
          setSelectedCategories([]);
        }}
        title="Select Categories"
        maxWidth="max-w-sm sm:max-w-md"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            {categories.map(cat => (
              <label key={cat} className="flex items-center gap-3 p-3 bg-muted rounded-lg cursor-pointer hover:bg-secondary transition-colors">
                <input 
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                />
                <span className="text-foreground text-sm sm:text-base">{cat}</span>
              </label>
            ))}
          </div>
          <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3">
            <button 
              onClick={() => {
                setShowCategoryModal(false);
                setSelectedCategories([]);
              }} 
              className="flex-1 py-2.5 bg-muted text-foreground rounded-lg text-sm sm:text-base hover:bg-secondary transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSaveCategories} 
              className="flex-1 py-2.5 bg-teal-600 text-white rounded-lg text-sm sm:text-base hover:bg-teal-700 transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      </Modal>

      {/* Header */}
      <div className="bg-card border-b border-border p-3 sm:p-4 lg:p-6 sticky top-0 z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h1 className="text-foreground text-base sm:text-lg lg:text-xl font-semibold">Offers & Coupons</h1>
          <div className="flex gap-2 flex-wrap w-full sm:w-auto">
            <button 
              onClick={handleExport}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-teal-600 text-white rounded-lg text-xs sm:text-sm lg:text-base hover:bg-teal-700 transition-colors"
            >
              <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span>Export</span>
            </button>
            <button 
              onClick={handleNewCoupon}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-teal-600 text-white rounded-lg text-xs sm:text-sm lg:text-base font-medium hover:bg-teal-700 transition-colors"
            >
              <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
              New Coupon
            </button>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4 lg:p-6 max-w-[1600px] mx-auto">
        <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
          
          {/* Coupons List */}
          <div className="bg-card rounded-lg shadow-sm p-3 sm:p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
              <h2 className="text-foreground text-sm sm:text-base lg:text-lg font-semibold">Coupons List</h2>
              <button 
                onClick={handleSync}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 border border-teal-600 text-teal-600 bg-transparent rounded-lg text-xs sm:text-sm lg:text-base hover:bg-teal-50 dark:hover:bg-teal-950 transition-colors"
              >
                <RefreshCw size={16} className="sm:w-[18px] sm:h-[18px]" />
                Sync
              </button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div>
                <label className="text-muted-foreground text-xs sm:text-sm mb-1.5 block">Search coupons</label>
                <input
                  type="text"
                  placeholder="Name or code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-muted text-foreground border border-border rounded-md outline-none px-3 py-2 text-xs sm:text-sm lg:text-base focus:border-teal-600"
                />
              </div>
              <div>
                <label className="text-muted-foreground text-xs sm:text-sm mb-1.5 block">Type</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full bg-muted text-foreground border border-border rounded-md outline-none px-3 py-2 text-xs sm:text-sm lg:text-base focus:border-teal-600"
                >
                  <option>All / Percentage / Flat</option>
                  <option>Percentage</option>
                  <option>Flat</option>
                </select>
              </div>
              <div>
                <label className="text-muted-foreground text-xs sm:text-sm mb-1.5 block">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full bg-muted text-foreground border border-border rounded-md outline-none px-3 py-2 text-xs sm:text-sm lg:text-base focus:border-teal-600"
                >
                  <option>All / Active / Expired</option>
                  <option>Active</option>
                  <option>Expired</option>
                </select>
              </div>
            </div>

            {/* Coupons Table - Desktop */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-muted-foreground text-left py-3 px-2 text-xs font-medium">Name</th>
                    <th className="text-muted-foreground text-left py-3 px-2 text-xs font-medium">Code</th>
                    <th className="text-muted-foreground text-left py-3 px-2 text-xs font-medium">Type</th>
                    <th className="text-muted-foreground text-left py-3 px-2 text-xs font-medium">Value</th>
                    <th className="text-muted-foreground text-left py-3 px-2 text-xs font-medium">Assigned To</th>
                    <th className="text-muted-foreground text-left py-3 px-2 text-xs font-medium">Validity</th>
                    <th className="text-muted-foreground text-left py-3 px-2 text-xs font-medium">Status</th>
                    <th className="text-muted-foreground text-left py-3 px-2 text-xs font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCoupons.map((coupon) => (
                    <tr key={coupon.id} className="border-b border-border hover:bg-muted/50">
                      <td className="text-foreground py-3 px-2 text-sm">{coupon.name}</td>
                      <td className="text-foreground py-3 px-2 text-sm">{coupon.code}</td>
                      <td className="text-foreground py-3 px-2 text-sm">{coupon.type}</td>
                      <td className="text-foreground py-3 px-2 text-sm">
                        {coupon.type === 'Percentage' ? `${coupon.value}%` : `₹ ${coupon.value}`}
                      </td>
                      <td className="py-3 px-2 text-xs">
                        <span className="inline-block px-2.5 py-1 bg-teal-600 text-white text-xs rounded-full whitespace-nowrap">
                          {coupon.assignedTo}
                        </span>
                      </td>
                      <td className="text-foreground py-3 px-2 text-xs whitespace-nowrap">{coupon.validity}</td>
                      <td className="py-3 px-2">
                        <span className={`inline-block px-2.5 py-1 text-white text-xs rounded-full ${coupon.status === 'Active' ? 'bg-teal-600' : 'bg-red-500'}`}>
                          {coupon.status}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex gap-1.5 flex-wrap">
                          <button 
                            onClick={() => handleEdit(coupon)}
                            className="flex items-center gap-1 px-2.5 py-1.5 bg-teal-600 text-white rounded text-xs hover:bg-teal-700 transition-colors"
                          >
                            <Edit size={12} />
                            Edit
                          </button>
                          <button 
                            onClick={() => handleAssign(coupon)}
                            className="flex items-center gap-1 px-2.5 py-1.5 bg-teal-600 text-white rounded text-xs hover:bg-teal-700 transition-colors"
                          >
                            <Link2 size={12} />
                            Assign
                          </button>
                          <button 
                            onClick={() => handleDelete(coupon.id)}
                            className="flex items-center gap-1 px-2.5 py-1.5 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
                          >
                            <Trash2 size={12} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Coupons Cards - Mobile/Tablet */}
            <div className="lg:hidden space-y-3">
              {filteredCoupons.map((coupon) => (
                <div key={coupon.id} className="bg-muted rounded-lg p-3">
                  <div className="flex justify-between items-start mb-3 gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-foreground font-semibold text-sm mb-1 truncate">{coupon.name}</h3>
                      <p className="text-muted-foreground text-xs">Code: {coupon.code}</p>
                    </div>
                    <span className={`px-2 py-1 text-white text-xs rounded-full whitespace-nowrap flex-shrink-0 ${coupon.status === 'Active' ? 'bg-teal-600' : 'bg-red-500'}`}>
                      {coupon.status}
                    </span>
                  </div>
                  
                  <div className="space-y-1.5 mb-3 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="text-foreground">{coupon.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Value:</span>
                      <span className="text-foreground font-semibold">
                        {coupon.type === 'Percentage' ? `${coupon.value}%` : `₹ ${coupon.value}`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Assigned:</span>
                      <span className="px-2 py-0.5 bg-teal-600 text-white text-xs rounded-full">
                        {coupon.assignedTo}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Validity:</span>
                      <span className="text-foreground text-xs text-right">{coupon.validity}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={() => handleEdit(coupon)}
                      className="flex items-center justify-center gap-1 px-2 py-2 bg-teal-600 text-white rounded-lg text-xs hover:bg-teal-700 transition-colors"
                    >
                      <Edit size={12} />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button 
                      onClick={() => handleAssign(coupon)}
                      className="flex items-center justify-center gap-1 px-2 py-2 bg-teal-600 text-white rounded-lg text-xs hover:bg-teal-700 transition-colors"
                    >
                      <Link2 size={12} />
                      <span className="hidden sm:inline">Assign</span>
                    </button>
                    <button 
                      onClick={() => handleDelete(coupon.id)}
                      className="flex items-center justify-center gap-1 px-2 py-2 bg-red-600 text-white rounded-lg text-xs hover:bg-red-700 transition-colors"
                    >
                      <Trash2 size={12} />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredCoupons.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-xs sm:text-sm">
                No coupons found matching your filters.
              </div>
            )}
          </div>

          {/* Quick Assign Section */}
          <div className="bg-card rounded-lg shadow-sm p-3 sm:p-4 lg:p-6">
            <h2 className="text-foreground text-sm sm:text-base lg:text-lg font-semibold mb-4">Quick Assign</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-muted rounded-lg p-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-2 flex-1">
                    <Link2 size={18} className="text-teal-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-foreground text-xs sm:text-sm lg:text-base font-medium mb-1">Assign Coupon to Order</h3>
                      <p className="text-muted-foreground text-xs">Link coupon to a specific order ID quickly</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleQuickAssignOrder}
                    className="w-full sm:w-auto px-3 py-2 bg-teal-600 text-white rounded-lg text-xs sm:text-sm hover:bg-teal-700 transition-colors whitespace-nowrap"
                  >
                    Assign
                  </button>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-2 flex-1">
                    <FolderOpen size={18} className="text-teal-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-foreground text-xs sm:text-sm lg:text-base font-medium mb-1">Assign to Categories</h3>
                      <p className="text-muted-foreground text-xs">Apply coupon to selected menu categories</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleChooseCategories}
                    className="w-full sm:w-auto px-3 py-2 bg-teal-600 text-white rounded-lg text-xs sm:text-sm hover:bg-teal-700 transition-colors whitespace-nowrap"
                  >
                    Choose
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Offers;