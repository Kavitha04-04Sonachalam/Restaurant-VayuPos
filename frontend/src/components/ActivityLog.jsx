import { UserCheck, Edit, DollarSign } from 'lucide-react';

const activities = [
  { 
    icon: UserCheck, 
    text: 'Staff login', 
    time: 'just now',
    color: 'text-green-500',
    bg: 'bg-green-500/10'
  },
  { 
    icon: Edit, 
    text: 'Menu updated', 
    time: '20m ago',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  },
  { 
    icon: DollarSign, 
    text: 'Expense added', 
    time: '1h ago',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10'
  },
];

const ActivityLog = () => {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
      
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
            <div className={`p-2 rounded-lg ${activity.bg}`}>
              <activity.icon className={`h-4 w-4 ${activity.color}`} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{activity.text}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLog;
