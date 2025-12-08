import { Clock, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const orders = [
  { id: '#1256', type: 'Dine-In', time: '2m ago', amount: '₹320', status: 'completed' },
  { id: '#1255', type: 'Takeaway', time: '10m ago', amount: '₹580', status: 'completed' },
  { id: '#1254', type: 'UPI', time: '18m ago', amount: '₹210', status: 'completed' },
];

const RecentOrders = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Recent Orders</h2>
        <button
          onClick={() => navigate('/orders')}
          className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1"
        >
          See all
          <ExternalLink className="h-3 w-3" />
        </button>
      </div>

      <div className="space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors cursor-pointer"
            onClick={() => navigate('/orders')}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">{order.id.slice(-2)}</span>
              </div>
              <div>
                <p className="font-medium text-foreground">{order.id}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{order.type}</span>
                  <span>•</span>
                  <Clock className="h-3 w-3" />
                  <span>{order.time}</span>
                </div>
              </div>
            </div>
            <p className="text-lg font-bold text-foreground">{order.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;
