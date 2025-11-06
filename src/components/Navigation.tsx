import { Link, useLocation } from "react-router-dom";
import { Heart, Home, FileText, Phone, Pill, BookOpen, Wifi, WifiOff, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

const Navigation = () => {
  const location = useLocation();
  const { signOut } = useAuth();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/dashboard", icon: Heart, label: "Dashboard" },
    { path: "/emergency", icon: Phone, label: "Emergency" },
    { path: "/medicine", icon: Pill, label: "Medicine" },
    { path: "/records", icon: FileText, label: "Records" },
    { path: "/education", icon: BookOpen, label: "Education" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center shadow-primary">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:inline">HealthConnect</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className={`hidden sm:flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
              isOnline 
                ? 'bg-secondary/10 text-secondary' 
                : 'bg-muted text-muted-foreground'
            }`}>
              {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
              <span className="hidden md:inline">{isOnline ? 'Online' : 'Offline'}</span>
            </div>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={location.pathname === item.path ? "default" : "ghost"}
                    size="sm"
                    className="gap-2"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border">
          <div className="grid grid-cols-7 gap-1 p-2">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={location.pathname === item.path ? "default" : "ghost"}
                  size="sm"
                  className="w-full flex flex-col gap-1 h-auto py-2"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              </Link>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="w-full flex flex-col gap-1 h-auto py-2"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-xs">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
