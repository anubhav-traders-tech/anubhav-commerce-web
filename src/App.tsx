import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import HomePage from './pages/HomePage';
import BrandPage from './pages/BrandPage';
import BrandsPage from './pages/BrandsPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import InquiryPage from './pages/InquiryPage';
import ContactPage from './pages/ContactPage';
import ImportDashboard from './pages/admin/ImportDashboard';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Navbar />
      <main className="flex-grow pt-[120px]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/brand/:slug" element={<BrandPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/inquiry" element={<InquiryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<ImportDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
