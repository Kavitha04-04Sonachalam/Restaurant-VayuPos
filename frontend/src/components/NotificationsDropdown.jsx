import { useState, useRef, useEffect } from 'react';
import { Bell, Clock, CheckCheck, Trash2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotificationsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Sample notifications - should match your main notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New order received',
      description: 'Order #1256 has been placed',
      time: '2m ago',
      isRead: false,
    },
    {
      id: 2,
      title: 'Table 5 requested service',
      description: 'Customer needs assistance',
      time: '15m ago',
      isRead: false,
    },
    {
      id: 3,
      title: 'Low stock alert',
      description: 'Tomatoes running low',
      time: '1h ago',
      isRead: false,
    },
    {
      id: 4,
      title: 'Payment received',
      description: '₹450 via UPI',
      time: '2h ago',
      isRead: true,
    },
    {
      id: 5,
      title: 'New customer registered',
      description: 'Sarah Williams joined',
      time: '3h ago',
      isRead: true,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleViewAll = () => {
    setIsOpen(false);
    navigate('/notifications');
  };

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const displayedNotifications = notifications.slice(0, 5); // Show only 5 in dropdown

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon Button with Number Badge */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-secondary rounded-lg transition-colors"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5 text-foreground" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div 
            className="fixed inset-0 bg-black/20 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Dropdown content */}
          <div className="fixed md:absolute left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 top-14 md:top-full md:mt-2 w-[95vw] md:w-96 max-w-md bg-card border border-border rounded-lg shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between p-3 md:p-4 border-b border-border">
              <div>
                <h3 className="text-sm md:text-base font-semibold text-foreground">Notifications</h3>
                {unreadCount > 0 && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {unreadCount} unread
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1 md:gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="p-1.5 md:p-2 hover:bg-secondary rounded-lg transition-colors"
                    title="Mark all as read"
                  >
                    <CheckCheck className="h-4 w-4 text-teal-600" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 md:p-2 hover:bg-secondary rounded-lg transition-colors"
                  aria-label="Close notifications"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-[60vh] md:max-h-[400px] overflow-y-auto">
              {displayedNotifications.length > 0 ? (
                <div className="divide-y divide-border">
                  {displayedNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 md:p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
                        !notification.isRead ? 'bg-muted/30' : ''
                      }`}
                    >
                      <div className="flex items-start gap-2 md:gap-3">
                        {/* Status indicator */}
                        <div className="mt-1 flex-shrink-0">
                          {!notification.isRead ? (
                            <div className="h-2 w-2 bg-teal-600 rounded-full"></div>
                          ) : (
                            <div className="h-2 w-2"></div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-xs md:text-sm font-semibold ${
                            !notification.isRead ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {notification.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-0.5 md:mt-1 line-clamp-2">
                            {notification.description}
                          </p>
                          <div className="flex items-center gap-1 mt-1 md:mt-2">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {notification.time}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col md:flex-row items-center gap-1 flex-shrink-0">
                          {!notification.isRead && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMarkAsRead(notification.id);
                              }}
                              className="p-1.5 hover:bg-secondary rounded transition-colors"
                              title="Mark as read"
                            >
                              <CheckCheck className="h-3.5 w-3.5 text-muted-foreground hover:text-teal-600" />
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(notification.id);
                            }}
                            className="p-1.5 hover:bg-destructive/10 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5 text-destructive" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 md:p-12 text-center">
                  <Bell className="h-12 w-12 md:h-16 md:w-16 mx-auto mb-3 md:mb-4 text-muted-foreground opacity-50" />
                  <p className="text-sm text-muted-foreground">No notifications</p>
                </div>
              )}
            </div>

            {/* Footer */}
            {displayedNotifications.length > 0 && (
              <div className="p-3 border-t border-border">
                <button
                  onClick={handleViewAll}
                  className="w-full py-2 text-xs md:text-sm font-medium text-teal-600 hover:text-teal-700 hover:bg-teal-600/10 rounded-lg transition-colors"
                >
                  View all notifications
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationsDropdown;