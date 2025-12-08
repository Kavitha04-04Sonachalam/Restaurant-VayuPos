import { ShoppingCart, UtensilsCrossed, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const QuickLinks = () => {
  const navigate = useNavigate();

  const links = [
    { label: 'Open POS', icon: ShoppingCart, path: '/pos' },
    { label: 'Manage Menu', icon: UtensilsCrossed, path: '/menu' },
    { label: 'View Reports', icon: BarChart3, path: '/reports' },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
      <div className="flex flex-wrap gap-3">
        {links.map((link) => (
          <Button
            key={link.path}
            onClick={() => navigate(link.path)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
          >
            <link.icon className="h-4 w-4 mr-2" />
            {link.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
