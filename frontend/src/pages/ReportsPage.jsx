import React, { useState } from 'react';
import { Download, Printer, Calendar, Filter, RotateCw, ChevronDown } from 'lucide-react';
import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const ReportsPage = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filters, setFilters] = useState({
    reportType: 'Sales',
    view: 'By Month',
    outlet: 'All',
    paymentMode: 'All',
    sort: 'Total Desc',
    dateRange: { start: '2025-01', end: '2025-12' }
  });

  const [keyMetrics] = useState({
    totalSales: '₹4,82,350',
    totalOrders: '1,284',
    totalExpenses: '₹1,12,150',
    avgOrderValue: '₹375',
    grossMargin: '63%',
    topCategory: 'Combos'
  });

  const [salesData] = useState([
    { period: 'Jan 2025', orders: 96, grossSales: '₹36,840', discounts: '₹2,120', net: '₹34,720' },
    { period: 'Feb 2025', orders: 102, grossSales: '₹39,210', discounts: '₹1,980', net: '₹37,230' },
    { period: 'Mar 2025', orders: 118, grossSales: '₹45,600', discounts: '₹2,340', net: '₹43,260' }
  ]);

  const salesChartData = [
    { month: 'Jan', sales: 36840, net: 34720 },
    { month: 'Feb', sales: 39210, net: 37230 },
    { month: 'Mar', sales: 45600, net: 43260 }
  ];

  const [ordersData] = useState({
    bySource: [
      { source: 'Dine-in', orders: 640, share: '49.8%', revenue: '₹2,38,400', rank: 1 },
      { source: 'Takeaway', orders: 420, share: '32.7%', revenue: '₹1,28,100', rank: 2 },
      { source: 'Delivery', orders: 224, share: '17.5%', revenue: '₹1,15,850', rank: 3 }
    ],
    byPayment: [
      { mode: 'UPI', count: 680, share: '53.0%', amount: '₹2,04,000', rank: 1 },
      { mode: 'Cash', count: 420, share: '32.7%', amount: '₹1,25,600', rank: 2 },
      { mode: 'Card', count: 184, share: '14.3%', amount: '₹74,750', rank: 3 }
    ]
  });

  const orderDistributionData = [
    { name: 'Dine-in', value: 640 },
    { name: 'Takeaway', value: 420 },
    { name: 'Delivery', value: 224 }
  ];

  const COLORS = ['#14b8a6', '#0d9488', '#0f766e'];

  const [expensesData] = useState([
    { category: 'Salaries & Wages', transactions: 6, amount: '₹55,500', share: '49.5%', rank: 1 },
    { category: 'Kitchen Supplies', transactions: 14, amount: '₹24,300', share: '21.7%', rank: 2 },
    { category: 'Utilities', transactions: 10, amount: '₹12,350', share: '11.0%', rank: 3 },
    { category: 'Rent', transactions: 1, amount: '₹18,000', share: '16.1%', rank: 4 }
  ]);

  const expensesChartData = [
    { category: 'Salaries', amount: 55500 },
    { category: 'Kitchen', amount: 24300 },
    { category: 'Rent', amount: 18000 },
    { category: 'Utilities', amount: 12350 }
  ];

  const handleExportCSV = () => {
    const csv = salesData.map(row => 
      `${row.period},${row.orders},${row.grossSales},${row.discounts},${row.net}`
    ).join('\n');
    const blob = new Blob([`Period,Orders,Gross Sales,Discounts,Net\n${csv}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sales_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setFilters({
      reportType: 'Sales',
      view: 'By Month',
      outlet: 'All',
      paymentMode: 'All',
      sort: 'Total Desc',
      dateRange: { start: '2025-01', end: '2025-12' }
    });
    alert('Filters have been reset to default values');
  };

  const handleApply = () => {
    const startDate = new Date(filters.dateRange.start);
    const endDate = new Date(filters.dateRange.end);
    const monthsDiff = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                       (endDate.getMonth() - startDate.getMonth()) + 1;
    
    alert(`Filters Applied!\n\nReport Type: ${filters.reportType}\nView: ${filters.view}\nOutlet: ${filters.outlet}\nPayment Mode: ${filters.paymentMode}\nSort: ${filters.sort}\nDate Range: ${formatDateRange(filters.dateRange.start)} - ${formatDateRange(filters.dateRange.end)}\nPeriods: ${monthsDiff} months`);
  };

  const formatDateRange = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 lg:mb-8 gap-3">
          <h1 className="text-xl sm:text-2xl font-semibold text-foreground">Reports</h1>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button 
              onClick={handleExportCSV}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-colors bg-teal-600 text-white hover:bg-teal-700 text-sm"
            >
              <Download size={16} />
              <span>Export</span>
            </button>
            <button 
              onClick={handlePrint}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-colors bg-teal-600 text-white hover:bg-teal-700 text-sm"
            >
              <Printer size={16} />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Filters and Key Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6 lg:mb-8">
          {/* Filters */}
          <div className="lg:col-span-2 rounded-xl px-3 sm:px-4 py-4 bg-card border border-border">
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between mb-3 sm:mb-4 gap-2">
              <h2 className="text-sm sm:text-base font-semibold text-card-foreground">Filters</h2>
              <span className="px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-teal-600 text-white whitespace-nowrap">
                Static Preview
              </span>
            </div>

            <div className="space-y-3">
              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                <div>
                  <label className="block text-xs mb-1 text-muted-foreground font-medium">Report Type</label>
                  <div className="relative">
                    <select
                      value={filters.reportType}
                      onChange={(e) => setFilters({...filters, reportType: e.target.value})}
                      className="w-full text-sm px-2.5 py-1.5 rounded-lg border border-border bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none"
                    >
                      <option>Sales</option>
                      <option>Orders</option>
                      <option>Expenses</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" size={14} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs mb-1 text-muted-foreground font-medium">View</label>
                  <div className="relative">
                    <select
                      value={filters.view}
                      onChange={(e) => setFilters({...filters, view: e.target.value})}
                      className="w-full text-sm px-2.5 py-1.5 rounded-lg border border-border bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none"
                    >
                      <option>By Month</option>
                      <option>By Day</option>
                      <option>By Year</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" size={14} />
                  </div>
                </div>
                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="block text-xs mb-1 text-muted-foreground font-medium">Range</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={`${formatDateRange(filters.dateRange.start)} - ${formatDateRange(filters.dateRange.end)}`}
                      readOnly
                      onClick={() => setShowDatePicker(!showDatePicker)}
                      className="w-full text-sm px-2.5 py-1.5 rounded-lg border border-border bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                    />
                    <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" size={14} />
                    
                    {showDatePicker && (
                      <div className="absolute top-full left-0 right-0 sm:right-auto mt-2 p-3 rounded-lg shadow-xl z-50 bg-card border border-border w-full sm:w-72">
                        <div className="space-y-2.5">
                          <div>
                            <label className="block text-xs mb-1 text-muted-foreground font-medium">Start Date</label>
                            <input
                              type="month"
                              value={filters.dateRange.start}
                              onChange={(e) => setFilters({...filters, dateRange: {...filters.dateRange, start: e.target.value}})}
                              className="w-full text-sm px-2.5 py-1.5 rounded-lg border border-border bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs mb-1 text-muted-foreground font-medium">End Date</label>
                            <input
                              type="month"
                              value={filters.dateRange.end}
                              onChange={(e) => setFilters({...filters, dateRange: {...filters.dateRange, end: e.target.value}})}
                              className="w-full text-sm px-2.5 py-1.5 rounded-lg border border-border bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                          </div>
                          <button
                            onClick={() => setShowDatePicker(false)}
                            className="w-full py-1.5 rounded-lg font-medium transition-colors text-sm bg-teal-600 text-white hover:bg-teal-700"
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                <div>
                  <label className="block text-xs mb-1 text-muted-foreground font-medium">Outlet</label>
                  <div className="relative">
                    <select
                      value={filters.outlet}
                      onChange={(e) => setFilters({...filters, outlet: e.target.value})}
                      className="w-full text-sm px-2.5 py-1.5 rounded-lg border border-border bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none"
                    >
                      <option>All</option>
                      <option>Main Branch</option>
                      <option>Downtown</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" size={14} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs mb-1 text-muted-foreground font-medium">Payment Mode</label>
                  <div className="relative">
                    <select
                      value={filters.paymentMode}
                      onChange={(e) => setFilters({...filters, paymentMode: e.target.value})}
                      className="w-full text-sm px-2.5 py-1.5 rounded-lg border border-border bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none"
                    >
                      <option>All</option>
                      <option>UPI</option>
                      <option>Cash</option>
                      <option>Card</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" size={14} />
                  </div>
                </div>
                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="block text-xs mb-1 text-muted-foreground font-medium">Sort</label>
                  <div className="relative">
                    <select
                      value={filters.sort}
                      onChange={(e) => setFilters({...filters, sort: e.target.value})}
                      className="w-full text-sm px-2.5 py-1.5 rounded-lg border border-border bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none"
                    >
                      <option>Total Desc</option>
                      <option>Total Asc</option>
                      <option>Date Desc</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" size={14} />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col xs:flex-row justify-end gap-2 pt-1">
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors text-sm text-teal-600 border border-teal-600 hover:bg-teal-600 hover:text-white"
                >
                  <RotateCw size={14} />
                  Reset
                </button>
                <button
                  onClick={handleApply}
                  className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors text-sm bg-teal-600 text-white hover:bg-teal-700"
                >
                  <Filter size={14} />
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="rounded-xl px-3 sm:px-4 py-4 bg-card border border-border">
            <h2 className="text-sm sm:text-base font-semibold mb-3 text-card-foreground">Key Metrics</h2>
            
            <div className="space-y-2.5">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <div className="text-center p-2 rounded-lg bg-muted">
                  <div className="text-xs text-muted-foreground mb-0.5">Sales</div>
                  <div className="text-sm sm:text-base font-bold text-foreground">{keyMetrics.totalSales}</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted">
                  <div className="text-xs text-muted-foreground mb-0.5">Orders</div>
                  <div className="text-sm sm:text-base font-bold text-foreground">{keyMetrics.totalOrders}</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted col-span-2 sm:col-span-1">
                  <div className="text-xs text-muted-foreground mb-0.5">Expenses</div>
                  <div className="text-sm sm:text-base font-bold text-foreground">{keyMetrics.totalExpenses}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 rounded-lg bg-muted">
                  <div className="text-xs text-muted-foreground mb-0.5">Avg</div>
                  <div className="text-xs sm:text-sm font-bold text-foreground">{keyMetrics.avgOrderValue}</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted">
                  <div className="text-xs text-muted-foreground mb-0.5">Margin</div>
                  <div className="text-xs sm:text-sm font-bold text-foreground">{keyMetrics.grossMargin}</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted">
                  <div className="text-xs text-muted-foreground mb-0.5">Top</div>
                  <div className="text-xs font-bold text-foreground">{keyMetrics.topCategory}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sales Report with Line Chart */}
        <div className="rounded-xl px-3 sm:px-4 py-4 mb-4 sm:mb-6 lg:mb-8 bg-card border border-border overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2">
            <h2 className="text-sm sm:text-base font-semibold text-card-foreground">Sales Report</h2>
            <span className="text-xs text-muted-foreground">By selected view</span>
          </div>

          {/* Line Chart */}
          <div className="mb-6">
            <h3 className="text-xs sm:text-sm font-semibold mb-3 text-card-foreground">Monthly Sales Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={salesChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#6b7280" />
                <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }} 
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="sales" stroke="#14b8a6" strokeWidth={2} name="Gross Sales" />
                <Line type="monotone" dataKey="net" stroke="#0d9488" strokeWidth={2} name="Net Sales" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="overflow-x-auto -mx-3 sm:-mx-4">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="text-left font-semibold py-2 px-2 sm:px-3 text-xs text-muted-foreground whitespace-nowrap">Period</th>
                    <th className="text-left font-semibold py-2 px-2 sm:px-3 text-xs text-muted-foreground whitespace-nowrap">Orders</th>
                    <th className="text-left font-semibold py-2 px-2 sm:px-3 text-xs text-muted-foreground whitespace-nowrap">Gross</th>
                    <th className="text-left font-semibold py-2 px-2 sm:px-3 text-xs text-muted-foreground whitespace-nowrap">Discount</th>
                    <th className="text-left font-semibold py-2 px-2 sm:px-3 text-xs text-muted-foreground whitespace-nowrap">Net</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map((row, index) => (
                    <tr key={index} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-2.5 px-2 sm:px-3">
                        <span className="text-xs font-medium text-foreground whitespace-nowrap">{row.period}</span>
                      </td>
                      <td className="py-2.5 px-2 sm:px-3">
                        <span className="text-xs text-foreground">{row.orders}</span>
                      </td>
                      <td className="py-2.5 px-2 sm:px-3">
                        <span className="text-xs text-foreground whitespace-nowrap">{row.grossSales}</span>
                      </td>
                      <td className="py-2.5 px-2 sm:px-3">
                        <span className="text-xs text-foreground whitespace-nowrap">{row.discounts}</span>
                      </td>
                      <td className="py-2.5 px-2 sm:px-3">
                        <span className="text-xs font-semibold text-foreground whitespace-nowrap">{row.net}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Orders Report with Pie Chart */}
        <div className="rounded-xl px-3 sm:px-4 py-4 mb-4 sm:mb-6 lg:mb-8 bg-card border border-border overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2">
            <h2 className="text-sm sm:text-base font-semibold text-card-foreground">Orders Report</h2>
            <span className="text-xs text-muted-foreground">Mix & payments</span>
          </div>

          {/* Pie Chart */}
          <div className="mb-6">
            <h3 className="text-xs sm:text-sm font-semibold mb-3 text-card-foreground">Order Distribution by Source</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {orderDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }} 
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Orders by Source */}
            <div className="overflow-hidden">
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-xs sm:text-sm font-semibold text-card-foreground">By Source</h3>
                <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">Desc</span>
              </div>
              <div className="overflow-x-auto -mx-3 sm:-mx-4 lg:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-muted border-b border-border">
                        <th className="text-left font-semibold py-2 px-2 text-xs text-muted-foreground whitespace-nowrap">Source</th>
                        <th className="text-left font-semibold py-2 px-2 text-xs text-muted-foreground whitespace-nowrap">Orders</th>
                        <th className="text-left font-semibold py-2 px-2 text-xs text-muted-foreground whitespace-nowrap">Share</th>
                        <th className="text-left font-semibold py-2 px-2 text-xs text-muted-foreground whitespace-nowrap">Revenue</th>
                        <th className="text-left font-semibold py-2 px-2 text-xs text-muted-foreground whitespace-nowrap">Rank</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordersData.bySource.map((row, index) => (
                        <tr key={index} className="border-b border-border hover:bg-muted/50 transition-colors">
                          <td className="py-2 px-2">
                            <span className="text-xs font-medium text-foreground whitespace-nowrap">{row.source}</span>
                          </td>
                          <td className="py-2 px-2">
                            <span className="text-xs text-foreground">{row.orders}</span>
                          </td>
                          <td className="py-2 px-2">
                            <span className="text-xs text-foreground">{row.share}</span>
                          </td>
                          <td className="py-2 px-2">
                            <span className="text-xs text-foreground whitespace-nowrap">{row.revenue}</span>
                          </td>
                          <td className="py-2 px-2">
                            <span className="text-xs text-foreground">{row.rank}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Payments by Mode */}
            <div className="overflow-hidden">
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-xs sm:text-sm font-semibold text-card-foreground">By Payment</h3>
                <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">Desc</span>
              </div>
              <div className="overflow-x-auto -mx-3 sm:-mx-4 lg:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-muted border-b border-border">
                        <th className="text-left font-semibold py-2 px-2 text-xs text-muted-foreground whitespace-nowrap">Mode</th>
                        <th className="text-left font-semibold py-2 px-2 text-xs text-muted-foreground whitespace-nowrap">Count</th>
                        <th className="text-left font-semibold py-2 px-2 text-xs text-muted-foreground whitespace-nowrap">Share</th>
                        <th className="text-left font-semibold py-2 px-2 text-xs text-muted-foreground whitespace-nowrap">Amount</th>
                        <th className="text-left font-semibold py-2 px-2 text-xs text-muted-foreground whitespace-nowrap">Rank</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordersData.byPayment.map((row, index) => (
                        <tr key={index} className="border-b border-border hover:bg-muted/50 transition-colors">
                          <td className="py-2 px-2">
                            <span className="text-xs font-medium text-foreground whitespace-nowrap">{row.mode}</span>
                          </td>
                          <td className="py-2 px-2">
                            <span className="text-xs text-foreground">{row.count}</span>
                          </td>
                          <td className="py-2 px-2">
                            <span className="text-xs text-foreground">{row.share}</span>
                          </td>
                          <td className="py-2 px-2">
                            <span className="text-xs text-foreground whitespace-nowrap">{row.amount}</span>
                          </td>
                          <td className="py-2 px-2">
                            <span className="text-xs text-foreground">{row.rank}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expenses Report with Bar Chart */}
        <div className="rounded-xl px-3 sm:px-4 py-4 bg-card border border-border overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2">
            <h2 className="text-sm sm:text-base font-semibold text-card-foreground">Expenses Report</h2>
            <span className="text-xs text-muted-foreground">By category</span>
          </div>

          {/* Bar Chart */}
          <div className="mb-6">
            <h3 className="text-xs sm:text-sm font-semibold mb-3 text-card-foreground">Monthly Expenses by Category</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={expensesChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="category" tick={{ fontSize: 12 }} stroke="#6b7280" />
                <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }} 
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="amount" fill="#14b8a6" name="Amount (₹)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="overflow-x-auto -mx-3 sm:-mx-4">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="text-left font-semibold py-2 px-2 sm:px-3 text-xs text-muted-foreground whitespace-nowrap">Category</th>
                    <th className="text-left font-semibold py-2 px-2 sm:px-3 text-xs text-muted-foreground whitespace-nowrap">Trans.</th>
                    <th className="text-left font-semibold py-2 px-2 sm:px-3 text-xs text-muted-foreground whitespace-nowrap">Amount</th>
                    <th className="text-left font-semibold py-2 px-2 sm:px-3 text-xs text-muted-foreground whitespace-nowrap">Share</th>
                    <th className="text-left font-semibold py-2 px-2 sm:px-3 text-xs text-muted-foreground whitespace-nowrap">Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {expensesData.map((row, index) => (
                    <tr key={index} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-2.5 px-2 sm:px-3">
                        <span className="text-xs font-medium text-foreground whitespace-nowrap">{row.category}</span>
                      </td>
                      <td className="py-2.5 px-2 sm:px-3">
                        <span className="text-xs text-foreground">{row.transactions}</span>
                      </td>
                      <td className="py-2.5 px-2 sm:px-3">
                        <span className="text-xs text-foreground whitespace-nowrap">{row.amount}</span>
                      </td>
                      <td className="py-2.5 px-2 sm:px-3">
                        <span className="text-xs text-foreground">{row.share}</span>
                      </td>
                      <td className="py-2.5 px-2 sm:px-3">
                        <span className="text-xs text-foreground">{row.rank}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;