'use client';

import { LogIn, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Clear login status
    router.push('/login'); // Redirect to login page
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-200 w-full">
      <Link href="/login" className="flex items-center">
        <LogIn />
      </Link>
      
      <div className="flex items-center">
        
        <button onClick={handleLogout}><LogOut /></button>
      </div>
      
    </div>
  );
};

export default Navbar;