import React, { useState } from 'react';
import {
    Search,
    UserPlus,
    Upload,
    Edit2,
    Trash2,
    RotateCw,
    Filter,
    Calendar,
    Play,
    Save,
    PlusCircle,
    X,
    Download,
} from 'lucide-react';

const StaffManagement = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('Active');
    const [joinedAfter, setJoinedAfter] = useState('2023-01-01');
    const [salaryRange, setSalaryRange] = useState('₹10k - ₹30k');
    const [showSearch, setShowSearch] = useState(false);
    const [showNewStaffModal, setShowNewStaffModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingStaff, setEditingStaff] = useState(null);
    const [showSimulationModal, setShowSimulationModal] = useState(false);
    const [simulationResults, setSimulationResults] = useState([]);

    const [newStaff, setNewStaff] = useState({
        name: '',
        phone: '',
        role: 'Cashier',
        salary: '',
        joined: new Date().toISOString().split('T')[0],
        aadhar: '',
    });

    const [staff, setStaff] = useState([
        {
            id: 1,
            name: 'Aarti Verma',
            phone: '+91 98301 11223',
            role: 'Cashier',
            salary: '₹18,000 / month',
            salaryAmount: 18000,
            joined: '12 Feb 2024',
            joinedDate: '2024-02-12',
            avatar: 'A',
            color: '#E74C3C',
            status: 'Active',
            aadhar: '1234 5678 9012',
        },
        {
            id: 2,
            name: 'Rahul Sinha',
            phone: '+91 99300 44556',
            role: 'Chef',
            salary: '₹25,000 / month',
            salaryAmount: 25000,
            joined: '01 Jun 2023',
            joinedDate: '2023-06-01',
            avatar: 'R',
            color: '#95A5A6',
            status: 'Active',
            aadhar: '2345 6789 0123',
        },
        {
            id: 3,
            name: 'Sana Khan',
            phone: '+91 88009 77881',
            role: 'Waiter',
            salary: '₹12,500 / month',
            salaryAmount: 12500,
            joined: '20 Sep 2024',
            joinedDate: '2024-09-20',
            avatar: 'S',
            color: '#D4A574',
            status: 'Active',
            aadhar: '3456 7890 1234',
        },
    ]);

    const [upcomingSalaries, setUpcomingSalaries] = useState([
        {
            id: 1,
            name: 'Aarti Verma',
            role: 'Cashier',
            avatar: 'A',
            color: '#E74C3C',
            amount: '₹18,000',
            dueDate: '12 Nov 2025',
            category: 'Salaries & Wages',
        },
        {
            id: 2,
            name: 'Rahul Sinha',
            role: 'Chef',
            avatar: 'R',
            color: '#95A5A6',
            amount: '₹25,000',
            dueDate: '01 Dec 2025',
            category: 'Salaries & Wages',
        },
    ]);

    const [automation, setAutomation] = useState({
        enabled: true,
        cycle: 'Monthly',
        expenseCategory: 'Salaries & Wages',
        expenseAccount: 'Cashbook',
        autoAddTime: '09:00 AM',
        notes: 'Monthly staff payroll auto-entry',
    });

    const colors = [
        '#E74C3C',
        '#3498DB',
        '#2ECC71',
        '#F39C12',
        '#9B59B6',
        '#1ABC9C',
        '#E67E22',
        '#95A5A6',
        '#D4A574',
        '#34495E',
    ];

    const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

    const formatAadhar = (value) => {
        const numbers = value.replace(/\D/g, '');
        const limited = numbers.slice(0, 12);
        const formatted = limited.replace(/(\d{4})(\d{4})?(\d{4})?/, (match, p1, p2, p3) => {
            let result = p1;
            if (p2) result += ' ' + p2;
            if (p3) result += ' ' + p3;
            return result;
        });
        return formatted;
    };

    const handleExport = () => {
        // Create CSV content
        const headers = ['ID', 'Name', 'Phone', 'Role', 'Monthly Salary', 'Salary Amount', 'Joined Date', 'Status', 'Aadhar'];
        
        const csvRows = [
            headers.join(','),
            ...filteredStaff.map(member => [
                member.id,
                `"${member.name}"`,
                `"${member.phone}"`,
                member.role,
                `"${member.salary}"`,
                member.salaryAmount,
                member.joined,
                member.status,
                `"${member.aadhar || 'N/A'}"`
            ].join(','))
        ];
        
        const csvContent = csvRows.join('\n');
        
        // Create blob and download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', `staff_export_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        alert('Export completed! CSV file downloaded.');
    };

    const handleSimulateNextRun = () => {
        // Calculate next salary dates for all active staff
        const today = new Date();
        const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        
        const simulations = staff
            .filter(member => member.status === 'Active')
            .map(member => {
                // Parse the joined date
                const joinedDate = new Date(member.joinedDate);
                const dayOfMonth = joinedDate.getDate();
                
                // Calculate next payment date
                let nextPaymentDate = new Date(today.getFullYear(), today.getMonth(), dayOfMonth);
                
                // If the date has passed this month, move to next month
                if (nextPaymentDate <= today) {
                    nextPaymentDate = new Date(today.getFullYear(), today.getMonth() + 1, dayOfMonth);
                }
                
                return {
                    id: member.id,
                    name: member.name,
                    role: member.role,
                    avatar: member.avatar,
                    color: member.color,
                    amount: member.salary,
                    amountNumber: member.salaryAmount,
                    nextPaymentDate: nextPaymentDate.toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                    }),
                    category: automation.expenseCategory,
                    account: automation.expenseAccount,
                    time: automation.autoAddTime,
                };
            })
            .sort((a, b) => new Date(a.nextPaymentDate) - new Date(b.nextPaymentDate));
        
        const totalAmount = simulations.reduce((sum, sim) => sum + sim.amountNumber, 0);
        
        setSimulationResults({
            entries: simulations,
            totalAmount: totalAmount,
            nextRunDate: simulations.length > 0 ? simulations[0].nextPaymentDate : 'N/A',
        });
        
        setShowSimulationModal(true);
    };

    const handleAddStaff = () => {
        if (!newStaff.name || !newStaff.phone || !newStaff.salary) {
            alert('Please fill all required fields');
            return;
        }

        if (newStaff.aadhar && newStaff.aadhar.replace(/\s/g, '').length !== 12) {
            alert('Please enter a valid 12-digit Aadhar number');
            return;
        }

        const salaryNum = parseFloat(newStaff.salary.replace(/[^0-9]/g, ''));
        const newId = Math.max(...staff.map((s) => s.id), 0) + 1;
        const avatar = newStaff.name.charAt(0).toUpperCase();
        const color = getRandomColor();

        const staffMember = {
            id: newId,
            name: newStaff.name,
            phone: newStaff.phone,
            role: newStaff.role,
            salary: `₹${salaryNum.toLocaleString('en-IN')} / month`,
            salaryAmount: salaryNum,
            joined: new Date(newStaff.joined).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
            }),
            joinedDate: newStaff.joined,
            avatar: avatar,
            color: color,
            status: 'Active',
            aadhar: newStaff.aadhar,
        };

        setStaff([...staff, staffMember]);
        setNewStaff({
            name: '',
            phone: '',
            role: 'Cashier',
            salary: '',
            joined: new Date().toISOString().split('T')[0],
            aadhar: '',
        });
        setShowNewStaffModal(false);
        alert('Staff member added successfully!');
    };

    const handleEdit = (id) => {
        const member = staff.find((s) => s.id === id);
        if (member) {
            setEditingStaff({
                ...member,
                salary: member.salaryAmount.toString(),
            });
            setShowEditModal(true);
        }
    };

    const handleUpdateStaff = () => {
        if (!editingStaff.name || !editingStaff.phone || !editingStaff.salary) {
            alert('Please fill all required fields');
            return;
        }

        if (editingStaff.aadhar && editingStaff.aadhar.replace(/\s/g, '').length !== 12) {
            alert('Please enter a valid 12-digit Aadhar number');
            return;
        }

        const salaryNum = parseFloat(editingStaff.salary.replace(/[^0-9]/g, ''));

        setStaff(
            staff.map((s) =>
                s.id === editingStaff.id
                    ? {
                        ...s,
                        name: editingStaff.name,
                        phone: editingStaff.phone,
                        role: editingStaff.role,
                        salary: `₹${salaryNum.toLocaleString('en-IN')} / month`,
                        salaryAmount: salaryNum,
                        avatar: editingStaff.name.charAt(0).toUpperCase(),
                        aadhar: editingStaff.aadhar,
                    }
                    : s
            )
        );

        setShowEditModal(false);
        setEditingStaff(null);
        alert('Staff member updated successfully!');
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this staff member?')) {
            setStaff(staff.filter((s) => s.id !== id));
            alert('Staff member deleted successfully!');
        }
    };

    const handleAddSalary = (id) => {
        const salary = upcomingSalaries.find((s) => s.id === id);
        if (salary) {
            alert(`Added ${salary.amount} salary for ${salary.name} to expenses!`);
            setUpcomingSalaries(upcomingSalaries.filter((s) => s.id !== id));
        }
    };

    const handleSaveRules = () => {
        alert('Automation rules saved successfully!');
    };

    const handleResetFilters = () => {
        setSearchQuery('');
        setRoleFilter('All');
        setStatusFilter('Active');
        setJoinedAfter('2023-01-01');
        setSalaryRange('₹10k - ₹30k');
    };

    const getFilteredStaff = () => {
        return staff.filter((member) => {
            const matchesSearch =
                member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.phone.includes(searchQuery);
            const matchesRole = roleFilter === 'All' || member.role === roleFilter;
            const matchesStatus = member.status === statusFilter;

            return matchesSearch && matchesRole && matchesStatus;
        });
    };

    const filteredStaff = showSearch ? getFilteredStaff() : staff;

    return (
        <div className="min-h-screen bg-background">
            <div className="p-3 sm:p-4 lg:p-6 xl:p-8 max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 sm:mb-6">
                    <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground">Staff</h1>
                    <div className="flex gap-2 flex-wrap w-full sm:w-auto">
                        <button
                            onClick={handleExport}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors bg-teal-600 text-white hover:bg-teal-700 text-xs sm:text-sm"
                        >
                            <Download size={14} className="sm:w-4 sm:h-4" />
                            <span>Export</span>
                        </button>
                        <button
                            onClick={() => alert('Import functionality triggered!')}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors bg-teal-600 text-white hover:bg-teal-700 text-xs sm:text-sm"
                        >
                            <Upload size={14} className="sm:w-4 sm:h-4" />
                            <span>Import</span>
                        </button>
                        <button
                            onClick={() => setShowNewStaffModal(true)}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors bg-teal-600 text-white hover:bg-teal-700 text-xs sm:text-sm"
                        >
                            <UserPlus size={14} className="sm:w-4 sm:h-4" />
                            <span>New Staff</span>
                        </button>
                    </div>
                </div>

                {/* Filters Section - Horizontal Cards */}
                <div className="rounded-xl px-3 sm:px-4 lg:px-5 py-3 sm:py-4 mb-4 sm:mb-6 bg-card border border-border">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-card-foreground">Filters</h3>
                        <button
                            onClick={handleResetFilters}
                            className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-lg font-medium transition-colors bg-teal-600 text-white hover:bg-teal-700 text-xs sm:text-sm w-full sm:w-auto justify-center"
                        >
                            <RotateCw size={14} />
                            Reset
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-3 sm:mb-4">
                        <div className="relative">
                            <Search
                                className="absolute left-2.5 sm:left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                                size={14}
                            />
                            <input
                                type="text"
                                placeholder="Search name or phone..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full text-xs sm:text-sm pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-lg border border-border bg-muted text-foreground placeholder-muted-foreground focus:outline-none focus:border-teal-600"
                            />
                        </div>
                    </div>

                    {/* Horizontal Filter Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                        {/* Role Filter Card */}
                        <div className="bg-muted rounded-lg p-2 sm:p-3 border border-border">
                            <label className="block text-xs font-medium mb-1.5 sm:mb-2 text-muted-foreground">
                                Role
                            </label>
                            <select
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className="w-full text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:border-teal-600 appearance-none cursor-pointer"
                            >
                                <option>All</option>
                                <option>Cashier</option>
                                <option>Chef</option>
                                <option>Waiter</option>
                                <option>Manager</option>
                            </select>
                        </div>

                        {/* Status Filter Card */}
                        <div className="bg-muted rounded-lg p-2 sm:p-3 border border-border">
                            <label className="block text-xs font-medium mb-1.5 sm:mb-2 text-muted-foreground">
                                Status
                            </label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:border-teal-600 appearance-none cursor-pointer"
                            >
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>
                        </div>

                        {/* Joined After Card */}
                        <div className="bg-muted rounded-lg p-2 sm:p-3 border border-border">
                            <label className="block text-xs font-medium mb-1.5 sm:mb-2 text-muted-foreground">
                                Joined After
                            </label>
                            <input
                                type="date"
                                value={joinedAfter}
                                onChange={(e) => setJoinedAfter(e.target.value)}
                                className="w-full text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:border-teal-600"
                            />
                        </div>

                        {/* Salary Range Card */}
                        <div className="bg-muted rounded-lg p-2 sm:p-3 border border-border">
                            <label className="block text-xs font-medium mb-1.5 sm:mb-2 text-muted-foreground">
                                Salary Range
                            </label>
                            <input
                                type="text"
                                value={salaryRange}
                                onChange={(e) => setSalaryRange(e.target.value)}
                                className="w-full text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:border-teal-600"
                                placeholder="₹10k - ₹30k"
                            />
                        </div>
                    </div>

                    {/* Apply Button */}
                    <div className="flex justify-end mt-3 sm:mt-4">
                        <button
                            onClick={() => {
                                setShowSearch(true);
                                alert('Filters applied successfully!');
                            }}
                            className="flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-medium transition-colors text-xs sm:text-sm bg-teal-600 text-white hover:bg-teal-700 w-full sm:w-auto justify-center"
                        >
                            <Filter size={14} />
                            Apply Filters
                        </button>
                    </div>
                </div>

                {/* Staff Members Section */}
                <div className="rounded-xl px-3 sm:px-4 lg:px-5 py-3 sm:py-4 lg:py-5 mb-4 sm:mb-6 bg-card border border-border">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-card-foreground">Staff Members</h2>
                        <button
                            onClick={() => setShowSearch(!showSearch)}
                            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-colors bg-teal-600 text-white hover:bg-teal-700 text-xs sm:text-sm w-full sm:w-auto justify-center"
                        >
                            <Search size={14} className="sm:w-4 sm:h-4" />
                            <span>{showSearch ? 'Hide Search' : 'Search'}</span>
                        </button>
                    </div>

                    {showSearch && (
                        <div className="mb-3 sm:mb-4">
                            <div className="relative">
                                <Search
                                    className="absolute left-2.5 sm:left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                                    size={14}
                                />
                                <input
                                    type="text"
                                    placeholder="Search by name or phone..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full text-xs sm:text-sm pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-lg border border-border bg-muted text-foreground placeholder-muted-foreground focus:outline-none"
                                />
                            </div>
                        </div>
                    )}

                    {/* Staff Table */}
                    <div className="overflow-x-auto -mx-3 sm:mx-0">
                        <div className="inline-block min-w-full align-middle">
                            <div className="overflow-hidden">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="bg-primary/10 border-b border-border">
                                            <th className="text-left font-semibold py-2 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm text-muted-foreground">#</th>
                                            <th className="text-left font-semibold py-2 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm text-muted-foreground">
                                                Name
                                            </th>
                                            <th className="text-left font-semibold py-2 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm text-muted-foreground hidden md:table-cell">
                                                Role
                                            </th>
                                            <th className="text-left font-semibold py-2 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm text-muted-foreground hidden lg:table-cell">
                                                Pay Scale
                                            </th>
                                            <th className="text-left font-semibold py-2 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm text-muted-foreground hidden xl:table-cell">
                                                Joined
                                            </th>
                                            <th className="text-right font-semibold py-2 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm text-muted-foreground">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredStaff.map((member, index) => (
                                            <tr key={member.id} className="border-b border-border">
                                                <td className="py-2 sm:py-3 lg:py-4 px-2 sm:px-3">
                                                    <span className="text-xs sm:text-sm text-foreground">{index + 1}</span>
                                                </td>
                                                <td className="py-2 sm:py-3 lg:py-4 px-2 sm:px-3">
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center font-semibold text-xs flex-shrink-0 text-white"
                                                            style={{ backgroundColor: member.color }}
                                                        >
                                                            {member.avatar}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="font-semibold text-xs sm:text-sm text-foreground truncate">{member.name}</div>
                                                            <div className="text-xs text-muted-foreground truncate">{member.phone}</div>
                                                            <div className="text-xs text-muted-foreground md:hidden mt-0.5">
                                                                {member.role} • {member.salary}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-2 sm:py-3 lg:py-4 px-2 sm:px-3 hidden md:table-cell">
                                                    <span className="text-xs sm:text-sm text-foreground">{member.role}</span>
                                                </td>
                                                <td className="py-2 sm:py-3 lg:py-4 px-2 sm:px-3 hidden lg:table-cell">
                                                    <span className="text-xs sm:text-sm text-foreground">{member.salary}</span>
                                                </td>
                                                <td className="py-2 sm:py-3 lg:py-4 px-2 sm:px-3 hidden xl:table-cell">
                                                    <span className="text-xs sm:text-sm text-foreground">{member.joined}</span>
                                                </td>
                                                <td className="py-2 sm:py-3 lg:py-4 px-2 sm:px-3">
                                                    <div className="flex items-center justify-end gap-1 sm:gap-2">
                                                        <button
                                                            onClick={() => handleEdit(member.id)}
                                                            className="flex items-center justify-center p-1.5 sm:p-2 rounded-lg font-medium transition-colors bg-teal-600 text-white hover:bg-teal-700"
                                                            aria-label={`Edit ${member.name}`}
                                                        >
                                                            <Edit2 size={12} className="sm:w-3.5 sm:h-3.5" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(member.id)}
                                                            className="flex items-center justify-center p-1.5 sm:p-2 rounded-lg font-medium transition-colors bg-card text-card-foreground hover:bg-red-600 hover:text-white border border-border"
                                                            aria-label={`Delete ${member.name}`}
                                                        >
                                                            <Trash2 size={12} className="sm:w-3.5 sm:h-3.5" />
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

                {/* Staff Payroll & Automation */}
                <div className="mb-4 sm:mb-6">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-3 sm:mb-4 gap-2">
                        <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-foreground">
                            Staff Payroll & Automation
                        </h2>
                        <span className="text-xs sm:text-sm text-muted-foreground">
                            Payscale auto-added to Expenses monthly
                        </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                        {/* Automation Summary */}
                        <div className="rounded-xl px-3 sm:px-4 lg:px-5 py-3 sm:py-4 lg:py-5 bg-card border border-border">
                            <h3 className="text-xs sm:text-sm lg:text-base font-semibold mb-3 sm:mb-4 text-card-foreground">Automation Summary</h3>

                            <div className="flex items-start justify-between mb-4 sm:mb-5 pb-3 sm:pb-4 border-b border-border">
                                <div className="flex items-start gap-2 sm:gap-3">
                                    <Calendar size={16} className="text-foreground mt-0.5 flex-shrink-0 sm:w-[18px] sm:h-[18px]" />
                                    <div>
                                        <div className="text-sm sm:text-base lg:text-lg font-semibold text-foreground">Cycle</div>
                                        <div className="text-xs sm:text-sm text-muted-foreground">
                                            Runs on each joining date monthly
                                        </div>
                                    </div>
                                </div>
                                <span className="inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-teal-600 text-white flex-shrink-0">
                                    Enabled
                                </span>
                            </div>

                            <div className="space-y-3 sm:space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <label className="block text-xs sm:text-sm mb-1.5 sm:mb-2 text-muted-foreground">
                                            Expense Category
                                        </label>
                                        <input
                                            type="text"
                                            value={automation.expenseCategory}
                                            onChange={(e) =>
                                                setAutomation({ ...automation, expenseCategory: e.target.value })
                                            }
                                            className="w-full text-xs sm:text-sm px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-lg border border-border bg-muted text-foreground focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm mb-1.5 sm:mb-2 text-muted-foreground">
                                            Expense Account
                                        </label>
                                        <input
                                            type="text"
                                            value={automation.expenseAccount}
                                            onChange={(e) =>
                                                setAutomation({ ...automation, expenseAccount: e.target.value })
                                            }
                                            className="w-full text-xs sm:text-sm px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-lg border border-border bg-muted text-foreground focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <label className="block text-xs sm:text-sm mb-1.5 sm:mb-2 text-muted-foreground">
                                            Auto Add Time
                                        </label>
                                        <input
                                            type="text"
                                            value={automation.autoAddTime}
                                            onChange={(e) =>
                                                setAutomation({ ...automation, autoAddTime: e.target.value })
                                            }
                                            className="w-full text-xs sm:text-sm px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-lg border border-border bg-muted text-foreground focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm mb-1.5 sm:mb-2 text-muted-foreground">Notes</label>
                                        <input
                                            type="text"
                                            value={automation.notes}
                                            onChange={(e) =>
                                                setAutomation({ ...automation, notes: e.target.value })
                                            }
                                            className="w-full text-xs sm:text-sm px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-lg border border-border bg-muted text-foreground focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-2 sm:pt-4 flex-wrap">
                                    <button 
                                        onClick={handleSimulateNextRun}
                                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm bg-teal-600 text-white hover:bg-teal-700"
                                    >
                                        <Play size={14} />
                                        <span className="hidden sm:inline">Simulate Next Run</span>
                                        <span className="sm:hidden">Simulate</span>
                                    </button>
                                    <button
                                        onClick={handleSaveRules}
                                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm bg-teal-600 text-white hover:bg-teal-700"
                                    >
                                        <Save size={14} />
                                        Save Rules
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Upcoming Salary Entries */}
                        <div className="rounded-xl px-3 sm:px-4 lg:px-5 py-3 sm:py-4 lg:py-5 bg-card border border-border">
                            <h3 className="text-xs sm:text-sm lg:text-base font-semibold mb-3 sm:mb-4 text-card-foreground">Upcoming Salary Entries</h3>

                            <div className="overflow-x-auto -mx-3 sm:mx-0">
                                <div className="inline-block min-w-full align-middle">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full">
                                            <thead>
                                                <tr className="bg-primary/10 border-b border-border">
                                                    <th className="text-left font-semibold py-2 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm text-muted-foreground">
                                                        Staff
                                                    </th>
                                                    <th className="text-left font-semibold py-2 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm text-muted-foreground hidden sm:table-cell">
                                                        Amount
                                                    </th>
                                                    <th className="text-left font-semibold py-2 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm text-muted-foreground hidden md:table-cell">
                                                        Due On
                                                    </th>
                                                    <th className="text-right font-semibold py-2 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm text-muted-foreground">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {upcomingSalaries.map((salary) => (
                                                    <tr key={salary.id} className="border-b border-border">
                                                        <td className="py-2 sm:py-3 lg:py-4 px-2 sm:px-3">
                                                            <div className="flex items-center gap-2">
                                                                <div
                                                                    className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center font-semibold text-xs flex-shrink-0 text-white"
                                                                    style={{ backgroundColor: salary.color }}
                                                                >
                                                                    {salary.avatar}
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <div className="font-semibold text-xs sm:text-sm text-foreground truncate">
                                                                        {salary.name}
                                                                    </div>
                                                                    <div className="text-xs text-muted-foreground">
                                                                        {salary.role}
                                                                    </div>
                                                                    <div className="text-xs text-muted-foreground sm:hidden">
                                                                        {salary.amount} • {salary.dueDate}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="py-2 sm:py-3 lg:py-4 px-2 sm:px-3 hidden sm:table-cell">
                                                            <span className="text-xs sm:text-sm font-semibold text-foreground">
                                                                {salary.amount}
                                                            </span>
                                                        </td>
                                                        <td className="py-2 sm:py-3 lg:py-4 px-2 sm:px-3 hidden md:table-cell">
                                                            <span className="text-xs sm:text-sm text-foreground">{salary.dueDate}</span>
                                                        </td>
                                                        <td className="py-2 sm:py-3 lg:py-4 px-2 sm:px-3">
                                                            <div className="flex justify-end">
                                                                <button
                                                                    onClick={() => handleAddSalary(salary.id)}
                                                                    className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm bg-teal-600 text-white hover:bg-teal-700"
                                                                >
                                                                    <PlusCircle size={12} className="sm:w-3.5 sm:h-3.5" />
                                                                    <span className="hidden sm:inline">Add Now</span>
                                                                    <span className="sm:hidden">Add</span>
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
                    </div>
                </div>
            </div>

            {/* New Staff Modal */}
            {showNewStaffModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
                    <div className="bg-card rounded-xl p-3 sm:p-4 lg:p-6 max-w-md w-full border border-border my-8">
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-card-foreground">Add New Staff</h3>
                            <button
                                onClick={() => setShowNewStaffModal(false)}
                                className="text-muted-foreground hover:text-foreground"
                                aria-label="Close new staff modal"
                            >
                                <X size={18} className="sm:w-5 sm:h-5" />
                            </button>
                        </div>

                        <div className="space-y-3 sm:space-y-4">
                            <div>
                                <label className="block text-xs sm:text-sm mb-1.5 sm:mb-2 text-muted-foreground">Name *</label>
                                <input
                                    type="text"
                                    value={newStaff.name}
                                    onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                                    className="w-full text-xs sm:text-sm px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-lg border border-border bg-muted text-foreground focus:outline-none"
                                    placeholder="Enter staff name"
                                />
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm mb-1.5 sm:mb-2 text-muted-foreground">Phone *</label>
                                <input
                                    type="text"
                                    value={newStaff.phone}
                                    onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                                    className="w-full text-xs sm:text-sm px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-lg border border-border bg-muted text-foreground focus:outline-none"
                                    placeholder="+91 98765 43210"
                                />
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm mb-1.5 sm:mb-2 text-muted-foreground">Aadhar Number</label>
                                <input
                                    type="text"
                                    value={newStaff.aadhar}
                                    onChange={(e) => setNewStaff({ ...newStaff, aadhar: formatAadhar(e.target.value) })}
                                    className="w-full text-xs sm:text-sm px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-lg border border-border bg-muted text-foreground focus:outline-none"
                                    placeholder="1234 5678 9012"
                                    maxLength={14}
                                />
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm mb-1.5 sm:mb-2 text-muted-foreground">Role</label>
                                <select
                                    value={newStaff.role}
                                    onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                                    className="w-full text-xs sm:text-sm px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-lg border border-border bg-muted text-foreground focus:outline-none"
                                >
                                    <option>Cashier</option>
                                    <option>Chef</option>
                                    <option>Waiter</option>
                                    <option>Manager</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm mb-1.5 sm:mb-2 text-muted-foreground">
                                    Monthly Salary (₹) *
                                </label>
                                <input
                                    type="number"
                                    value={newStaff.salary}
                                    onChange={(e) => setNewStaff({ ...newStaff, salary: e.target.value })}
                                    className="w-full text-xs sm:text-sm px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-lg border border-border bg-muted text-foreground focus:outline-none"
                                    placeholder="15000"
                                />
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm mb-1.5 sm:mb-2 text-muted-foreground">Joining Date</label>
                                <input
                                    type="date"
                                    value={newStaff.joined}
                                    onChange={(e) => setNewStaff({ ...newStaff, joined: e.target.value })}
                                    className="w-full text-xs sm:text-sm px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-lg border border-border bg-muted text-foreground focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-6">
                            <button
                                onClick={() => setShowNewStaffModal(false)}
                                className="flex-1 flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-colors text-xs sm:text-sm bg-card text-card-foreground hover:bg-muted border border-border"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddStaff}
                                className="flex-1 flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-colors text-xs sm:text-sm bg-teal-600 text-white hover:bg-teal-700"
                            >
                                Add Staff
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Staff Modal */}
            {showEditModal && editingStaff && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
                    <div className="bg-card rounded-xl p-3 sm:p-4 lg:p-6 max-w-md w-full border border-border my-8">
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-card-foreground">Edit Staff</h3>
                            <button
                                onClick={() => {
                                    setShowEditModal(false);
                                    setEditingStaff(null);
                                }}
                                className="text-muted-foreground hover:text-foreground"
                                aria-label="Close edit staff modal"
                            >
                                <X size={18} className="sm:w-5 sm:h-5" />
                            </button>
                        </div>

                        <div className="space-y-3 sm:space-y-4">
                            <div>
                                <label className="block text-xs sm:text-sm mb-1.5 sm:mb-2 text-muted-foreground">Name *</label>
                                <input
                                    type="text"
                                    value={editingStaff.name}
                                    onChange={(e) =>
                                        setEditingStaff({
                                            ...editingStaff,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full text-xs sm:text-sm px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-lg border border-border bg-muted text-foreground focus:outline-none"
                                    placeholder="Enter staff name"
                                />
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm mb-1.5 sm:mb-2 text-muted-foreground">Phone *</label>
                                <input
                                    type="text"
                                    value={editingStaff.phone}
                                    onChange={(e) =>
                                        setEditingStaff({
                                            ...editingStaff,
                                            phone: e.target.value,
                                        })
                                    }
                                    className="w-full text-xs sm:text-sm px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-lg border border-border bg-muted text-foreground focus:outline-none"
                                    placeholder="+91 98765 43210"
                                />
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm mb-1.5 sm:mb-2 text-muted-foreground">Aadhar Number</label>
                                <input
                                    type="text"
                                    value={editingStaff.aadhar || ''}
                                    onChange={(e) =>
                                        setEditingStaff({
                                            ...editingStaff,
                                            aadhar: formatAadhar(e.target.value),
                                        })
                                    }
                                    className="w-full text-xs sm:text-sm px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-lg border border-border bg-muted text-foreground focus:outline-none"
                                    placeholder="1234 5678 9012"
                                    maxLength={14}
                                />
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm mb-1.5 sm:mb-2 text-muted-foreground">Role</label>
                                <select
                                    value={editingStaff.role}
                                    onChange={(e) =>
                                        setEditingStaff({
                                            ...editingStaff,
                                            role: e.target.value,
                                        })
                                    }
                                    className="w-full text-xs sm:text-sm px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-lg border border-border bg-muted text-foreground focus:outline-none"
                                >
                                    <option>Cashier</option>
                                    <option>Chef</option>
                                    <option>Waiter</option>
                                    <option>Manager</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm mb-1.5 sm:mb-2 text-muted-foreground">
                                    Monthly Salary (₹) *
                                </label>
                                <input
                                    type="number"
                                    value={editingStaff.salary}
                                    onChange={(e) =>
                                        setEditingStaff({
                                            ...editingStaff,
                                            salary: e.target.value,
                                        })
                                    }
                                    className="w-full text-xs sm:text-sm px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-lg border border-border bg-muted text-foreground focus:outline-none"
                                    placeholder="15000"
                                />
                            </div>
                        </div>

                        <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-6">
                            <button
                                onClick={() => {
                                    setShowEditModal(false);
                                    setEditingStaff(null);
                                }}
                                className="flex-1 flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-colors text-xs sm:text-sm bg-card text-card-foreground hover:bg-muted border border-border"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateStaff}
                                className="flex-1 flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-colors text-xs sm:text-sm bg-teal-600 text-white hover:bg-teal-700"
                            >
                                Update Staff
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Simulation Results Modal */}
            {showSimulationModal && simulationResults && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
                    <div className="bg-card rounded-xl p-3 sm:p-4 lg:p-6 max-w-2xl w-full border border-border my-8">
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-card-foreground">
                                Simulation: Next Payroll Run
                            </h3>
                            <button
                                onClick={() => setShowSimulationModal(false)}
                                className="text-muted-foreground hover:text-foreground"
                                aria-label="Close simulation modal"
                            >
                                <X size={18} className="sm:w-5 sm:h-5" />
                            </button>
                        </div>

                        <div className="mb-4 p-3 sm:p-4 bg-teal-50 dark:bg-teal-950/30 rounded-lg border border-teal-200 dark:border-teal-800">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs sm:text-sm font-medium text-teal-900 dark:text-teal-100">
                                    Next Run Date
                                </span>
                                <span className="text-xs sm:text-sm font-semibold text-teal-900 dark:text-teal-100">
                                    {simulationResults.nextRunDate}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs sm:text-sm font-medium text-teal-900 dark:text-teal-100">
                                    Total Amount
                                </span>
                                <span className="text-sm sm:text-base lg:text-lg font-bold text-teal-900 dark:text-teal-100">
                                    ₹{simulationResults.totalAmount?.toLocaleString('en-IN')}
                                </span>
                            </div>
                        </div>

                        <div className="mb-3 sm:mb-4">
                            <h4 className="text-xs sm:text-sm font-semibold text-card-foreground mb-2">
                                Scheduled Entries ({simulationResults.entries?.length})
                            </h4>
                        </div>

                        <div className="overflow-x-auto -mx-3 sm:mx-0 max-h-96 overflow-y-auto">
                            <div className="inline-block min-w-full align-middle">
                                <div className="overflow-hidden">
                                    <table className="min-w-full">
                                        <thead className="sticky top-0 bg-card z-10">
                                            <tr className="bg-primary/10 border-b border-border">
                                                <th className="text-left font-semibold py-2 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm text-muted-foreground">
                                                    Staff
                                                </th>
                                                <th className="text-left font-semibold py-2 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm text-muted-foreground hidden sm:table-cell">
                                                    Amount
                                                </th>
                                                <th className="text-left font-semibold py-2 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm text-muted-foreground hidden md:table-cell">
                                                    Payment Date
                                                </th>
                                                <th className="text-left font-semibold py-2 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm text-muted-foreground hidden lg:table-cell">
                                                    Category
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {simulationResults.entries?.map((entry) => (
                                                <tr key={entry.id} className="border-b border-border">
                                                    <td className="py-2 sm:py-3 px-2 sm:px-3">
                                                        <div className="flex items-center gap-2">
                                                            <div
                                                                className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center font-semibold text-xs flex-shrink-0 text-white"
                                                                style={{ backgroundColor: entry.color }}
                                                            >
                                                                {entry.avatar}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <div className="font-semibold text-xs sm:text-sm text-foreground truncate">
                                                                    {entry.name}
                                                                </div>
                                                                <div className="text-xs text-muted-foreground">
                                                                    {entry.role}
                                                                </div>
                                                                <div className="text-xs text-muted-foreground sm:hidden">
                                                                    {entry.amount} • {entry.nextPaymentDate}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-2 sm:py-3 px-2 sm:px-3 hidden sm:table-cell">
                                                        <span className="text-xs sm:text-sm font-semibold text-foreground">
                                                            {entry.amount}
                                                        </span>
                                                    </td>
                                                    <td className="py-2 sm:py-3 px-2 sm:px-3 hidden md:table-cell">
                                                        <span className="text-xs sm:text-sm text-foreground">
                                                            {entry.nextPaymentDate}
                                                        </span>
                                                    </td>
                                                    <td className="py-2 sm:py-3 px-2 sm:px-3 hidden lg:table-cell">
                                                        <span className="text-xs text-muted-foreground">
                                                            {entry.category}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 sm:mt-6 p-3 bg-muted rounded-lg">
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                <strong>Note:</strong> This is a simulation based on current automation rules. 
                                The system will automatically add these entries to expenses on their respective payment dates at {automation.autoAddTime}.
                            </p>
                        </div>

                        <div className="flex justify-end mt-4 sm:mt-6">
                            <button
                                onClick={() => setShowSimulationModal(false)}
                                className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium transition-colors text-xs sm:text-sm bg-teal-600 text-white hover:bg-teal-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StaffManagement;