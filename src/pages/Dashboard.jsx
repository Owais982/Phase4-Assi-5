import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import { LogOut, User, Mail, Shield, LayoutDashboard, DollarSign, ShoppingCart, TrendingUp, Activity, Package, Users, Settings, Bell, Search, Menu } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.firstName === 'Muhammad') {
          setProfileData(storedUser);
          setLoading(false);
          return;
        }

        const response = await api.get('/auth/me');
        setProfileData(response.data);
      } catch (err) {
        setError('Failed to fetch protected profile data. Your session may have expired.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-darker)', color: 'var(--text-light)' }}>
      
      {/* Sidebar Navigation */}
      <aside style={{ width: '260px', background: 'rgba(15, 23, 42, 0.8)', borderRight: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
        <div className="logo mb-8" style={{ fontSize: '1.5rem', fontWeight: '700' }}>
          <LayoutDashboard className="text-primary" size={28} />
          LumiStore
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '8px', background: 'var(--primary)', color: 'white', fontWeight: '500' }}>
            <LayoutDashboard size={20} /> Overview
          </a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '8px', color: 'var(--text-muted)', transition: 'all 0.2s ease' }} className="hover:bg-white/5">
            <ShoppingCart size={20} /> Orders
          </a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '8px', color: 'var(--text-muted)', transition: 'all 0.2s ease' }} className="hover:bg-white/5">
            <Package size={20} /> Products
          </a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '8px', color: 'var(--text-muted)', transition: 'all 0.2s ease' }} className="hover:bg-white/5">
            <Users size={20} /> Customers
          </a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '8px', color: 'var(--text-muted)', transition: 'all 0.2s ease' }} className="hover:bg-white/5">
            <Settings size={20} /> Settings
          </a>
        </nav>

        {/* User Profile in Sidebar */}
        <div style={{ marginTop: 'auto', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <img 
              src={user?.image} 
              alt={user?.firstName} 
              style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid var(--primary)' }}
            />
            <div style={{ overflow: 'hidden' }}>
              <p style={{ fontWeight: '600', fontSize: '0.875rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{user?.firstName} {user?.lastName}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Administrator</p>
            </div>
          </div>
          <button onClick={logout} className="btn btn-outline" style={{ width: '100%', padding: '0.5rem', fontSize: '0.875rem', borderColor: 'rgba(239, 68, 68, 0.3)', color: '#fca5a5' }}>
            <LogOut size={16} style={{ marginRight: '0.5rem' }} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* Top Header */}
        <header style={{ height: '70px', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem', background: 'rgba(2, 6, 23, 0.5)', backdropFilter: 'blur(10px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Menu size={20} style={{ color: 'var(--text-muted)', cursor: 'pointer' }} />
            <div style={{ position: 'relative', width: '300px' }}>
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input type="text" placeholder="Search orders, products..." style={{ width: '100%', padding: '0.5rem 1rem 0.5rem 2.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '20px', color: 'white', outline: 'none' }} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <Bell size={20} style={{ color: 'var(--text-muted)' }} />
              <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '8px', height: '8px', background: 'var(--error)', borderRadius: '50%' }}></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <img src={user?.image} alt="Profile" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="animate-fade-in" style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
          
          <div className="mb-8 flex items-center" style={{ justifyContent: 'space-between' }}>
            <div>
              <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Dashboard Overview</h1>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Welcome back, {user?.firstName}! Here's what's happening today.</p>
            </div>
            <button className="btn btn-primary">Generate Report</button>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          {/* Quick Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ background: 'rgba(99, 102, 241, 0.2)', padding: '1rem', borderRadius: '12px', color: 'var(--primary)' }}><DollarSign size={24} /></div>
              <div><p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Total Revenue</p><h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>$24,592.00</h3></div>
            </div>
            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '1rem', borderRadius: '12px', color: 'var(--success)' }}><ShoppingCart size={24} /></div>
              <div><p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>New Orders</p><h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>342</h3></div>
            </div>
            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ background: 'rgba(245, 158, 11, 0.2)', padding: '1rem', borderRadius: '12px', color: '#f59e0b' }}><Package size={24} /></div>
              <div><p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Pending Deliveries</p><h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>89</h3></div>
            </div>
            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ background: 'rgba(236, 72, 153, 0.2)', padding: '1rem', borderRadius: '12px', color: '#ec4899' }}><Activity size={24} /></div>
              <div><p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Active Users</p><h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>1,204</h3></div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', alignItems: 'start' }}>
            
            {/* Recent Orders Table */}
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h2 className="flex items-center gap-2" style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>
                <TrendingUp className="text-primary" /> Recent Transactions
              </h2>
              
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                      <th style={{ padding: '1rem 0.5rem', fontWeight: '500' }}>Order ID</th>
                      <th style={{ padding: '1rem 0.5rem', fontWeight: '500' }}>Customer</th>
                      <th style={{ padding: '1rem 0.5rem', fontWeight: '500' }}>Status</th>
                      <th style={{ padding: '1rem 0.5rem', fontWeight: '500', textAlign: 'right' }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: '#ORD-001', name: 'Michael Chen', status: 'Completed', amount: '$120.00', color: 'var(--success)' },
                      { id: '#ORD-002', name: 'Sarah Jenkins', status: 'Processing', amount: '$45.50', color: '#f59e0b' },
                      { id: '#ORD-003', name: 'David Smith', status: 'Completed', amount: '$320.00', color: 'var(--success)' },
                      { id: '#ORD-004', name: 'Emma Wilson', status: 'Pending', amount: '$85.00', color: '#ec4899' },
                      { id: '#ORD-005', name: 'James Carter', status: 'Completed', amount: '$210.00', color: 'var(--success)' },
                    ].map((order, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '1rem 0.5rem', fontWeight: '500' }}>{order.id}</td>
                        <td style={{ padding: '1rem 0.5rem' }}>{order.name}</td>
                        <td style={{ padding: '1rem 0.5rem' }}>
                          <span style={{ background: `rgba(255,255,255,0.1)`, color: order.color, padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600' }}>{order.status}</span>
                        </td>
                        <td style={{ padding: '1rem 0.5rem', textAlign: 'right', fontWeight: '600' }}>{order.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* User Profile Mini Card */}
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h2 className="flex items-center gap-2" style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>
                <User className="text-primary" /> Profile Data
              </h2>
              
              {loading ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}><Activity className="text-primary" style={{ animation: 'spin 2s linear infinite' }} /></div>
              ) : profileData ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <img src={profileData.image} alt="Profile" style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', padding: '4px', marginBottom: '1rem' }} />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{profileData.firstName} {profileData.lastName}</h3>
                    <p style={{ color: 'var(--primary)', fontWeight: '500', fontSize: '0.875rem' }}>@{profileData.username}</p>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(0,0,0,0.2)', padding: '1.25rem', borderRadius: '12px' }}>
                    <div className="flex items-center gap-3"><Mail size={16} style={{ color: 'var(--text-muted)' }} /><span style={{ fontSize: '0.875rem' }}>{profileData.email}</span></div>
                    <div className="flex items-center gap-3"><Shield size={16} style={{ color: 'var(--text-muted)' }} /><span style={{ fontSize: '0.875rem', textTransform: 'capitalize' }}>Role: {profileData.role || 'Admin'}</span></div>
                  </div>
                </div>
              ) : null}
            </div>
            
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
