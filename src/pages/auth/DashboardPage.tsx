import { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { Package, Clock, RefreshCw, FileText, CheckCircle, ChevronRight, Download } from 'lucide-react';

export default function DashboardPage() {
    const { session, profile, isLoading, signOut } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState<any[]>([]);
    const [loadingOrders, setLoadingOrders] = useState(true);

    useEffect(() => {
        if (session?.user) {
            fetchOrders(session.user.id);
        }
    }, [session]);

    const fetchOrders = async (userId: string) => {
        try {
            // Using standard select for orders. Assumes standard RLS policies.
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Error fetching orders:", error);
                throw error;
            }

            setOrders(data || []);
        } catch (error) {
            console.error("Failed to load dashboard data.", error);
        } finally {
            setLoadingOrders(false);
        }
    };

    const handleSignOut = async () => {
        await signOut();
        navigate('/login');
    };

    // Protection logic
    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>;
    }

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;
    const totalOrdersCount = orders.length;
    const lastOrderDate = orders.length > 0 ? new Date(orders[0].created_at).toLocaleDateString() : 'N/A';

    return (
        <div className="bg-gray-50 min-h-screen pb-12">

            {/* SaaS Header Area */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-black tracking-tight text-gray-900 border-l-4 border-blue-600 pl-3">
                        Dealer Portal
                    </h1>
                    <div className="flex items-center space-x-4">
                        <div className="hidden sm:block text-right">
                            <p className="text-sm font-bold text-gray-900 leading-tight">{profile?.company_name || 'Dealer Account'}</p>
                            <p className="text-[11px] font-medium text-gray-500 uppercase tracking-widest">{profile?.role}</p>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="text-sm font-bold text-gray-500 hover:text-red-600 transition-colors bg-gray-50 hover:bg-red-50 px-4 py-2 rounded-lg"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">

                {/* Welcome Card */}
                <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-3xl p-8 sm:p-10 mb-8 shadow-xl shadow-blue-900/10 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black mb-2">Welcome back, {profile?.company_name || 'Partner'}</h2>
                        <p className="text-blue-200 font-medium max-w-xl">
                            Manage your bulk orders, view pricing agreements, and track active fulfillments from your centralized dashboard.
                        </p>
                    </div>
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 opacity-10">
                        <Package className="w-96 h-96" />
                    </div>
                </div>

                {/* KPI Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4 hover:border-blue-100 hover:shadow-md transition-all">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Package className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Total Orders</p>
                            <p className="text-2xl font-black text-gray-900">{loadingOrders ? '-' : totalOrdersCount}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4 hover:border-amber-100 hover:shadow-md transition-all">
                        <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Pending Processing</p>
                            <p className="text-2xl font-black text-gray-900">{loadingOrders ? '-' : pendingOrdersCount}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4 hover:border-emerald-100 hover:shadow-md transition-all">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Last Order</p>
                            <p className="text-xl font-bold text-gray-900 mt-1">{loadingOrders ? '-' : lastOrderDate}</p>
                        </div>
                    </div>
                </div>

                {/* Orders Data Table */}
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                        <h3 className="text-lg font-black text-gray-900">Recent Purchase Orders</h3>
                        <button className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center">
                            View All <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200/50 text-xs uppercase tracking-wider font-bold text-gray-500 bg-gray-50/30">
                                    <th className="px-6 py-4">Order ID</th>
                                    <th className="px-6 py-4">Date Submited</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Total Amount</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loadingOrders ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500 font-medium">
                                            <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-blue-500" />
                                            Loading records...
                                        </td>
                                    </tr>
                                ) : orders.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500 font-medium">
                                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <FileText className="w-6 h-6 text-gray-400" />
                                            </div>
                                            No active orders found.<br />
                                            <button onClick={() => navigate('/products')} className="mt-4 text-blue-600 font-bold hover:underline">Browse Catalog</button>
                                        </td>
                                    </tr>
                                ) : (
                                    orders.slice(0, 5).map((order) => (
                                        <tr key={order.id} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="px-6 py-4 font-mono text-xs font-bold text-gray-900">
                                                #{order.id.slice(0, 8).toUpperCase()}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                                                {new Date(order.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === 'pending' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                                                        order.status === 'processing' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                                                            order.status === 'completed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                                                                'bg-gray-100 text-gray-800 border border-gray-200'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-black text-gray-900">
                                                ₹{order.total_amount?.toLocaleString() || 'TBD'}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end space-x-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent shadow-sm bg-white" title="Invoice Print">
                                                        <Download className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
