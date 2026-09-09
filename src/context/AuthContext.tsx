import React, { createContext, useContext, useState } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  isAdminOrOfficer: boolean;
  isExpert: boolean;
  loginAsCitizen: (emailOrPhone: string, name?: string) => void;
  loginWithPhone: (phone: string, otp: string) => void;
  loginAsOfficial: (role: UserRole, email: string) => void;
  loginAdmin: (email: string, pass: string, role: UserRole) => void;
  logout: () => void;
  switchRoleForDemo: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_CITIZEN: User = {
  id: 'usr-citizen-101',
  name: 'Aarav Deshmukh',
  email: 'aarav.deshmukh@example.org',
  phone: '+91 98201 ****4',
  role: 'citizen',
  wardOrDistrict: 'Ward 14, Pune Central',
};

const OFFICIAL_PROFILES: Record<UserRole, User> = {
  citizen: DEMO_CITIZEN,
  officer: {
    id: 'off-784',
    name: 'Sanjay Shinde',
    email: 's.shinde@civic-works.internal',
    role: 'officer',
    department: 'Roads & Infrastructure',
    designation: 'Executive Engineer (Zone 3)',
    wardOrDistrict: 'Central Zone',
  },
  department_admin: {
    id: 'adm-302',
    name: 'Dr. Meera Kulkarni',
    email: 'm.kulkarni@civic-works.internal',
    role: 'department_admin',
    department: 'Sanitation & Solid Waste Management',
    designation: 'Additional Commissioner (Public Health)',
  },
  super_admin: {
    id: 'adm-001',
    name: 'Administrative Control Officer',
    email: 'portal.admin@civicbridge.internal',
    role: 'super_admin',
    department: 'Municipal Coordination Cell',
    designation: 'Chief Administrative Officer',
  },
  expert: {
    id: 'exp-505',
    name: 'Prof. Ananya Sen',
    email: 'a.sen@urban-institute.ac.in',
    role: 'expert',
    department: 'Urban Planning & Mobility Institute',
    designation: 'Civic Innovation Advisory Committee Member',
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to citizen (logged in by default for a frictionless exploration experience, with option to switch or logout)
  const [user, setUser] = useState<User | null>(DEMO_CITIZEN);

  const loginAsCitizen = (emailOrPhone: string, name = 'Citizen User') => {
    setUser({
      id: `usr-cit-${Date.now()}`,
      name: name || 'Citizen User',
      email: emailOrPhone.includes('@') ? emailOrPhone : 'citizen@example.org',
      phone: emailOrPhone.includes('@') ? '+91 98200 00000' : emailOrPhone,
      role: 'citizen',
      wardOrDistrict: 'Ward 12, West Zone',
    });
  };

  const loginAsOfficial = (role: UserRole, email: string) => {
    const base = OFFICIAL_PROFILES[role] || OFFICIAL_PROFILES.officer;
    setUser({
      ...base,
      email: email || base.email,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const switchRoleForDemo = (role: UserRole) => {
    setUser(OFFICIAL_PROFILES[role] || DEMO_CITIZEN);
  };

  const loginWithPhone = (phone: string, _otp: string) => {
    loginAsCitizen(phone, 'Verified Citizen');
  };

  const loginAdmin = (email: string, _pass: string, roleToUse: UserRole) => {
    loginAsOfficial(roleToUse, email);
  };

  const role = user?.role || 'citizen';
  const isAuthenticated = !!user;
  const isAdminOrOfficer = role === 'officer' || role === 'department_admin' || role === 'super_admin' || role === 'expert';
  const isExpert = role === 'expert' || role === 'super_admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        isAdminOrOfficer,
        isExpert,
        loginAsCitizen,
        loginWithPhone,
        loginAsOfficial,
        loginAdmin,
        logout,
        switchRoleForDemo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
