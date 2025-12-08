import React, { useState } from 'react';
import { Search, Calendar, RefreshCw, Printer, Download, Eye } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PastOrders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('2025-01-08');
  const [statusFilter, setStatusFilter] = useState('All / Paid / Refunded');
  const [paymentFilter, setPaymentFilter] = useState('All / UPI / Cash');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const initialOrders = [
    {
      id: '#1027',
      type: 'Dine-in',
      time: '10:42 AM',
      customer: { name: 'Ravi Kumar', avatar: 'R', color: '#F59E0B' },
      items: 3,
      subtotal: 285.00,
      gst: 7.13,
      discount: 20.00,
      total: 272.13,
      payment: 'UPI'
    },
    {
      id: '#1026',
      type: 'Takeaway',
      time: '10:18 AM',
      customer: { name: 'Anita', avatar: 'A', color: '#3B82F6' },
      items: 2,
      subtotal: 120.00,
      gst: 3.00,
      discount: null,
      total: 123.00,
      payment: 'Cash'
    },
    {
      id: '#1025',
      type: 'Dine-in',
      time: '9:55 AM',
      customer: { name: 'Walk-in', avatar: 'W', color: '#6B7280' },
      items: 4,
      subtotal: 340.00,
      gst: 8.50,
      discount: 34.00,
      total: 314.50,
      payment: 'UPI'
    },
    {
      id: '#1024',
      type: 'Delivery',
      time: '9:20 AM',
      customer: { name: 'Mohit', avatar: 'M', color: '#8B5CF6' },
      items: 2,
      subtotal: 180.00,
      gst: 4.50,
      discount: null,
      total: 184.50,
      payment: 'Cash'
    }
  ];

  // Weekly revenue data for the graph
  const weeklyRevenueData = [
    { day: 'Mon', revenue: 8500, orders: 35 },
    { day: 'Tue', revenue: 9200, orders: 38 },
    { day: 'Wed', revenue: 11300, orders: 45 },
    { day: 'Thu', revenue: 10800, orders: 42 },
    { day: 'Fri', revenue: 13500, orders: 52 },
    { day: 'Sat', revenue: 15200, orders: 58 },
    { day: 'Sun', revenue: 12540, orders: 48 }
  ];

  const [orders, setOrders] = useState(initialOrders);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPayment = paymentFilter === 'All / UPI / Cash' || 
                          order.payment.toLowerCase() === paymentFilter.toLowerCase();
    return matchesSearch && matchesPayment;
  });

  const todayOrders = 48;
  const revenue = 12540;
  const avgTicketSize = 261;
  const weeklyTotal = weeklyRevenueData.reduce((sum, day) => sum + day.revenue, 0);

  const handleRefresh = () => {
    setIsRefreshing(true);
    console.log('Refreshing orders...');
    
    setTimeout(() => {
      setOrders([...initialOrders]);
      setIsRefreshing(false);
      console.log('Orders refreshed successfully');
    }, 1000);
  };

  const handlePrintBill = (order) => {
    console.log(`Printing bill for ${order.id}`);
    
    const billContent = `
      ============================
      RESTAURANT NAME
      ============================
      
      Order ID: ${order.id}
      Type: ${order.type}
      Date: ${selectedDate}
      Time: ${order.time}
      
      Customer: ${order.customer.name}
      
      ----------------------------
      Items: ${order.items}
      
      Subtotal:     ₹ ${order.subtotal.toFixed(2)}
      GST:          ₹ ${order.gst.toFixed(2)}
      ${order.discount ? `Discount:     - ₹ ${order.discount.toFixed(2)}` : ''}
      
      ----------------------------
      TOTAL:        ₹ ${order.total.toFixed(2)}
      ----------------------------
      
      Payment Method: ${order.payment}
      
      Thank you for your visit!
      ============================
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<pre>' + billContent + '</pre>');
    printWindow.document.close();
    printWindow.print();
  };

  const handleDownloadBill = (order) => {
    console.log(`Downloading bill for ${order.id}`);
    
    const billContent = `Restaurant Bill
    
Order ID: ${order.id}
Type: ${order.type}
Date: ${selectedDate}
Time: ${order.time}

Customer: ${order.customer.name}

Items: ${order.items}

Subtotal:     ₹ ${order.subtotal.toFixed(2)}
GST:          ₹ ${order.gst.toFixed(2)}
${order.discount ? `Discount:     - ₹ ${order.discount.toFixed(2)}\n` : ''}
TOTAL:        ₹ ${order.total.toFixed(2)}

Payment Method: ${order.payment}

Thank you for your visit!`;
    
    const blob = new Blob([billContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Bill_${order.id}_${selectedDate}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleViewBill = (order) => {
    console.log(`Viewing bill for ${order.id}`);
    
    const billContent = `
      <div style="font-family: monospace; padding: 20px; max-width: 400px; margin: 0 auto;">
        <h2 style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px;">RESTAURANT NAME</h2>
        
        <div style="margin: 20px 0;">
          <p><strong>Order ID:</strong> ${order.id}</p>
          <p><strong>Type:</strong> ${order.type}</p>
          <p><strong>Date:</strong> ${selectedDate}</p>
          <p><strong>Time:</strong> ${order.time}</p>
        </div>
        
        <p><strong>Customer:</strong> ${order.customer.name}</p>
        
        <hr style="border: 1px dashed #000; margin: 20px 0;">
        
        <p><strong>Items:</strong> ${order.items}</p>
        
        <div style="margin: 20px 0;">
          <p>Subtotal: <span style="float: right;">₹ ${order.subtotal.toFixed(2)}</span></p>
          <p>GST: <span style="float: right;">₹ ${order.gst.toFixed(2)}</span></p>
          ${order.discount ? `<p>Discount: <span style="float: right;">- ₹ ${order.discount.toFixed(2)}</span></p>` : ''}
        </div>
        
        <hr style="border: 2px solid #000; margin: 20px 0;">
        
        <p style="font-size: 18px;"><strong>TOTAL: <span style="float: right;">₹ ${order.total.toFixed(2)}</span></strong></p>
        
        <hr style="border: 2px solid #000; margin: 20px 0;">
        
        <p><strong>Payment Method:</strong> ${order.payment}</p>
        
        <p style="text-align: center; margin-top: 30px;">Thank you for your visit!</p>
      </div>
    `;
    
    const viewWindow = window.open('', '_blank');
    viewWindow.document.write(billContent);
    viewWindow.document.close();
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg">
          <p className="text-sm font-semibold text-foreground">{payload[0].payload.day}</p>
          <p className="text-sm text-muted-foreground">Revenue: ₹ {payload[0].value.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Orders: {payload[0].payload.orders}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-foreground">Past Orders</h1>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
            <span className="text-sm sm:text-[14px]">{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 mb-4 sm:mb-6">
          <div className="rounded-lg px-4 sm:px-6 py-4 sm:py-5 border border-border bg-card">
            <div className="text-xs sm:text-[13px] mb-2 font-medium text-muted-foreground">Today Orders</div>
            <div className="text-2xl sm:text-[32px] font-bold text-foreground">{todayOrders}</div>
          </div>
          <div className="rounded-lg px-4 sm:px-6 py-4 sm:py-5 border border-border bg-card">
            <div className="text-xs sm:text-[13px] mb-2 font-medium text-muted-foreground">Revenue</div>
            <div className="text-2xl sm:text-[32px] font-bold text-foreground">₹ {revenue.toLocaleString()}</div>
          </div>
          <div className="rounded-lg px-4 sm:px-6 py-4 sm:py-5 border border-border bg-card sm:col-span-2 lg:col-span-1">
            <div className="text-xs sm:text-[13px] mb-2 font-medium text-muted-foreground">Avg. Ticket Size</div>
            <div className="text-2xl sm:text-[32px] font-bold text-foreground">₹ {avgTicketSize}</div>
          </div>
        </div>

        {/* Weekly Analytics Graph */}
        <div className="rounded-lg shadow-md border border-border bg-card px-4 sm:px-6 py-4 sm:py-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
            <div>
              <h2 className="text-lg sm:text-xl lg:text-[22px] font-bold text-foreground">Week Analytics</h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Revenue trend for the past 7 days</p>
            </div>
            <div className="text-right">
              <div className="text-xs sm:text-sm text-muted-foreground">Weekly Total</div>
              <div className="text-xl sm:text-2xl font-bold text-foreground">₹ {weeklyTotal.toLocaleString()}</div>
            </div>
          </div>

          <div className="w-full" style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={weeklyRevenueData}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="day" 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                  tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Past Orders Card */}
        <div className="rounded-lg shadow-md border border-border bg-card px-4 sm:px-6 py-4 sm:py-6">
          {/* Orders Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
            <h2 className="text-lg sm:text-xl lg:text-[22px] font-bold text-foreground">Order History</h2>
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-4 sm:mb-6">
            {/* Search */}
            <div className="md:col-span-5">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={17} />
                <input
                  type="text"
                  placeholder="Order ID, customer name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-sm sm:text-[15px] pl-11 pr-4 py-2.5 rounded-md border border-border bg-muted text-foreground placeholder-muted-foreground focus:outline-none"
                />
              </div>
            </div>

            {/* Date */}
            <div className="md:col-span-2">
              <div className="relative">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full text-sm sm:text-[15px] px-3.5 py-2.5 rounded-md border border-border bg-muted text-foreground focus:outline-none"
                />
                <Calendar className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" size={17} />
              </div>
            </div>

            {/* Status */}
            <div className="md:col-span-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full text-sm sm:text-[15px] px-3.5 py-2.5 rounded-md border border-border bg-muted text-foreground focus:outline-none appearance-none cursor-pointer"
              >
                <option>All / Paid / Refunded</option>
                <option>Paid</option>
                <option>Refunded</option>
              </select>
            </div>

            {/* Payment */}
            <div className="md:col-span-2">
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="w-full text-sm sm:text-[15px] px-3.5 py-2.5 rounded-md border border-border bg-muted text-foreground focus:outline-none appearance-none cursor-pointer"
              >
                <option>All / UPI / Cash</option>
                <option>UPI</option>
                <option>Cash</option>
              </select>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="block lg:hidden space-y-3 sm:space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-muted rounded-lg p-3 sm:p-4">
                {/* Order Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-semibold text-sm sm:text-base text-foreground">{order.id}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground mt-0.5">{order.type} • {order.time}</div>
                  </div>
                  <span className="inline-block px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-md text-xs sm:text-[13px] font-medium bg-primary text-primary-foreground">
                    {order.payment}
                  </span>
                </div>

                {/* Customer */}
                <div className="flex items-center gap-2 sm:gap-2.5 mb-3 pb-3 border-b border-border">
                  <div
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-semibold text-xs sm:text-[13px] flex-shrink-0 text-white"
                    style={{ backgroundColor: order.customer.color }}
                  >
                    {order.customer.avatar}
                  </div>
                  <span className="text-sm sm:text-[15px] text-foreground">{order.customer.name}</span>
                </div>

                {/* Order Details */}
                <div className="space-y-1.5 sm:space-y-2 mb-3 pb-3 border-b border-border">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">Items</span>
                    <span className="text-foreground font-medium">{order.items}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">₹ {order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">GST</span>
                    <span className="text-foreground">₹ {order.gst.toFixed(2)}</span>
                  </div>
                  {order.discount && (
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">Discount</span>
                      <span className="text-foreground">- ₹ {order.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm sm:text-base font-semibold pt-1">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground">₹ {order.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handlePrintBill(order)}
                    className="flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-[13px] font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Printer size={14} className="sm:w-4 sm:h-4" />
                    <span>Print Bill</span>
                  </button>
                  <button
                    onClick={() => handleDownloadBill(order)}
                    className="flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded transition-colors text-foreground hover:bg-secondary border border-border text-xs sm:text-[13px]"
                  >
                    <Download size={14} className="sm:w-4 sm:h-4" />
                    <span>Download</span>
                  </button>
                  <button
                    onClick={() => handleViewBill(order)}
                    className="flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded transition-colors text-foreground hover:bg-secondary border border-border text-xs sm:text-[13px]"
                  >
                    <Eye size={14} className="sm:w-4 sm:h-4" />
                    <span>View</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-semibold py-3.5 px-3 text-[15px] text-muted-foreground">Order</th>
                  <th className="text-left font-semibold py-3.5 px-3 text-[15px] text-muted-foreground">Date & Time</th>
                  <th className="text-left font-semibold py-3.5 px-3 text-[15px] text-muted-foreground">Customer</th>
                  <th className="text-left font-semibold py-3.5 px-3 text-[15px] text-muted-foreground">Items</th>
                  <th className="text-left font-semibold py-3.5 px-3 text-[15px] text-muted-foreground">Subtotal</th>
                  <th className="text-left font-semibold py-3.5 px-3 text-[15px] text-muted-foreground">GST</th>
                  <th className="text-left font-semibold py-3.5 px-3 text-[15px] text-muted-foreground">Discount</th>
                  <th className="text-left font-semibold py-3.5 px-3 text-[15px] text-muted-foreground">Total</th>
                  <th className="text-left font-semibold py-3.5 px-3 text-[15px] text-muted-foreground">Payment</th>
                  <th className="text-right font-semibold py-3.5 px-3 text-[15px] text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-3">
                      <div className="font-semibold text-[15px] text-foreground">{order.id}</div>
                      <div className="text-[13px] mt-0.5 text-muted-foreground">{order.type}</div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="text-[15px] font-medium text-foreground">{order.time}</div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-[13px] flex-shrink-0 text-white"
                          style={{ backgroundColor: order.customer.color }}
                        >
                          {order.customer.avatar}
                        </div>
                        <span className="text-[15px] text-foreground">{order.customer.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <span className="text-[15px] text-foreground">{order.items}</span>
                    </td>
                    <td className="py-4 px-3">
                      <span className="text-[15px] text-foreground">₹ {order.subtotal.toFixed(2)}</span>
                    </td>
                    <td className="py-4 px-3">
                      <span className="text-[15px] text-foreground">₹ {order.gst.toFixed(2)}</span>
                    </td>
                    <td className="py-4 px-3">
                      <span className="text-[15px] text-foreground">
                        {order.discount ? `- ₹ ${order.discount.toFixed(2)}` : '-'}
                      </span>
                    </td>
                    <td className="py-4 px-3">
                      <div className="text-[15px] font-semibold text-foreground">
                        ₹ {order.total.toFixed(2)}
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <span className="inline-block px-3.5 py-1.5 rounded-md text-[13px] font-medium bg-primary text-primary-foreground">
                        {order.payment}
                      </span>
                    </td>
                    <td className="py-4 px-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handlePrintBill(order)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90"
                          title="Print Bill"
                        >
                          <Printer size={16} />
                          <span>Print Bill</span>
                        </button>
                        <button
                          onClick={() => handleDownloadBill(order)}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded transition-colors text-foreground hover:bg-muted"
                          title="Download Bill"
                        >
                          <Download size={16} />
                        </button>
                        <button
                          onClick={() => handleViewBill(order)}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded transition-colors text-foreground hover:bg-muted"
                          title="View Bill"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastOrders;