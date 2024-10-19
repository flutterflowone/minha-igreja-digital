import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Users, DollarSign, LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Membros', path: '/membros' },
    { icon: DollarSign, label: 'Financeiro', path: '/financeiro' },
  ];

  return (
    <div className="flex flex-col h-screen w-64 bg-white/50 backdrop-blur-xl border-r border-gray-200">
      <div className="flex items-center justify-center h-16">
        <h1 className="text-xl font-semibold text-gray-800">Minha Igreja Digital</h1>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-1 py-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start px-4 rounded-lg",
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary"
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4">
        <Button variant="outline" className="w-full justify-start rounded-lg" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;