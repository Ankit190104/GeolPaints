import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Package,
  Palette,
  MessageSquare,
  Star,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Phone,
  Eye,
  CheckCircle2,
  AlertCircle,
  Home
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import SEO from '../components/SEO';

const AdminDashboard = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products');

  // Data states
  const [products, setProducts] = useState([]);
  const [shades, setShades] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name_en: '',
    name_pa: '',
    category: 'Paints',
    description_en: '',
    description_pa: '',
    price: '',
    unit: 'Ltr',
    imageUrl: '',
    inStock: true,
    featured: false,
  });

  const [isShadeModalOpen, setIsShadeModalOpen] = useState(false);
  const [shadeForm, setShadeForm] = useState({
    name: '',
    hex: '#FFD700',
    category: 'Interior',
    code: '',
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'products') {
        const res = await api.get('/products');
        if (res.data.success) setProducts(res.data.products);
      } else if (activeTab === 'shades') {
        const res = await api.get('/shades');
        if (res.data.success) setShades(res.data.shades);
      } else if (activeTab === 'enquiries') {
        const res = await api.get('/enquiries');
        if (res.data.success) setEnquiries(res.data.enquiries);
      } else if (activeTab === 'reviews') {
        const res = await api.get('/reviews/all');
        if (res.data.success) setReviews(res.data.reviews);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  // PRODUCT ACTIONS
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, productForm);
      } else {
        await api.post('/products', productForm);
      }
      setIsProductModalOpen(false);
      setEditingProduct(null);
      setProductForm({
        name_en: '',
        name_pa: '',
        category: 'Paints',
        description_en: '',
        description_pa: '',
        price: '',
        unit: 'Ltr',
        imageUrl: '',
        inStock: true,
        featured: false,
      });
      fetchData();
    } catch (err) {
      console.error('Save product error:', err);
      alert(err.response?.data?.message || 'Error saving product');
    }
  };

  const handleToggleStock = async (prod) => {
    try {
      await api.put(`/products/${prod._id}`, { inStock: !prod.inStock });
      setProducts(products.map(p => p._id === prod._id ? { ...p, inStock: !p.inStock } : p));
    } catch (err) {
      console.error('Toggle stock error:', err);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      console.error('Delete product error:', err);
    }
  };

  // SHADE ACTIONS
  const handleSaveShade = async (e) => {
    e.preventDefault();
    try {
      await api.post('/shades', shadeForm);
      setIsShadeModalOpen(false);
      setShadeForm({ name: '', hex: '#FFD700', category: 'Interior', code: '' });
      fetchData();
    } catch (err) {
      console.error('Save shade error:', err);
      alert('Error adding shade');
    }
  };

  const handleDeleteShade = async (id) => {
    if (!window.confirm('Delete this paint shade?')) return;
    try {
      await api.delete(`/shades/${id}`);
      setShades(shades.filter(s => s._id !== id));
    } catch (err) {
      console.error('Delete shade error:', err);
    }
  };

  // ENQUIRY ACTIONS
  const handleToggleEnquiryStatus = async (enq) => {
    const nextStatus = enq.status === 'new' ? 'contacted' : 'new';
    try {
      await api.patch(`/enquiries/${enq._id}/status`, { status: nextStatus });
      setEnquiries(enquiries.map(e => e._id === enq._id ? { ...e, status: nextStatus } : e));
    } catch (err) {
      console.error('Toggle enquiry status error:', err);
    }
  };

  const handleDeleteEnquiry = async (id) => {
    if (!window.confirm('Delete this enquiry record?')) return;
    try {
      await api.delete(`/enquiries/${id}`);
      setEnquiries(enquiries.filter(e => e._id !== id));
    } catch (err) {
      console.error('Delete enquiry error:', err);
    }
  };

  // REVIEW ACTIONS
  const handleToggleApproveReview = async (rev) => {
    try {
      await api.patch(`/reviews/${rev._id}/toggle-approve`);
      setReviews(reviews.map(r => r._id === rev._id ? { ...r, approved: !r.approved } : r));
    } catch (err) {
      console.error('Toggle review approval error:', err);
    }
  };

  const handleDeleteReview = async (id) => {
    if (!window.confirm('Delete customer review?')) return;
    try {
      await api.delete(`/reviews/${id}`);
      setReviews(reviews.filter(r => r._id !== id));
    } catch (err) {
      console.error('Delete review error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 pb-12">
      <SEO title="Admin Dashboard" />

      {/* Header Bar */}
      <header className="bg-brand-blue text-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="p-2 bg-blue-900 text-brand-yellow rounded-xl hover:bg-blue-800 transition-colors">
              <Home className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-lg font-bold">Goel Store Owner Panel</h1>
              <p className="text-xs text-blue-200">{admin?.email || 'Shop Manager'}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'products'
                ? 'bg-brand-blue text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Package className="h-4 w-4" /> Products ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('shades')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'shades'
                ? 'bg-brand-blue text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Palette className="h-4 w-4" /> Paint Shades ({shades.length})
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'enquiries'
                ? 'bg-brand-blue text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-200'
            }`}
          >
            <MessageSquare className="h-4 w-4" /> Enquiries ({enquiries.length})
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'reviews'
                ? 'bg-brand-blue text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Star className="h-4 w-4" /> Customer Reviews ({reviews.length})
          </button>
        </div>

        {/* TAB 1: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="font-bold text-base text-slate-900">Store Products</h2>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setProductForm({
                    name_en: '',
                    name_pa: '',
                    category: 'Paints',
                    description_en: '',
                    description_pa: '',
                    price: '',
                    unit: 'Ltr',
                    imageUrl: '',
                    inStock: true,
                    featured: false,
                  });
                  setIsProductModalOpen(true);
                }}
                className="flex items-center gap-1.5 bg-brand-yellow hover:bg-amber-400 text-brand-blue font-extrabold text-xs px-4 py-2.5 rounded-xl shadow"
              >
                <Plus className="h-4 w-4" /> Add New Product
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12 text-slate-500">Loading products...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((prod) => (
                  <div key={prod._id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div className="flex gap-4">
                      <img
                        src={prod.imageUrl}
                        alt={prod.name_en}
                        className="w-20 h-20 object-cover rounded-xl bg-slate-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue bg-blue-50 px-2 py-0.5 rounded">
                          {prod.category}
                        </span>
                        <h3 className="font-bold text-slate-900 text-sm truncate mt-1">{prod.name_en}</h3>
                        <p className="text-xs text-slate-500 truncate">{prod.name_pa}</p>
                        {prod.price && (
                          <p className="text-xs font-bold text-emerald-600 mt-1">₹{prod.price} / {prod.unit}</p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => handleToggleStock(prod)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${
                          prod.inStock
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                        }`}
                      >
                        {prod.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingProduct(prod);
                            setProductForm(prod);
                            setIsProductModalOpen(true);
                          }}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(prod._id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SHADES MANAGEMENT */}
        {activeTab === 'shades' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="font-bold text-base text-slate-900">Paint Colour Palette</h2>
              <button
                onClick={() => setIsShadeModalOpen(true)}
                className="flex items-center gap-1.5 bg-brand-yellow text-brand-blue font-extrabold text-xs px-4 py-2.5 rounded-xl shadow"
              >
                <Plus className="h-4 w-4" /> Add Colour Shade
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {shades.map((shade) => (
                <div key={shade._id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-3 text-center flex flex-col justify-between">
                  <div
                    className="h-20 rounded-xl mb-2 border border-slate-200"
                    style={{ backgroundColor: shade.hex }}
                  ></div>
                  <div>
                    <h4 className="font-bold text-xs truncate">{shade.name}</h4>
                    <p className="text-[10px] text-slate-400">{shade.hex} &bull; {shade.category}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteShade(shade._id)}
                    className="mt-2 w-full text-[11px] text-rose-600 hover:bg-rose-50 font-semibold py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-4">
            <h2 className="font-bold text-base text-slate-900">Customer Enquiries</h2>
            <div className="space-y-3">
              {enquiries.map((enq) => (
                <div key={enq._id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        enq.type === 'bulk' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {enq.type} enquiry
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(enq.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">{enq.name} ({enq.phone})</h4>
                    <p className="text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200 mt-1">
                      "{enq.message}"
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={`https://wa.me/${enq.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi ${enq.name}, regarding your Goel Paints enquiry...`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1"
                    >
                      WhatsApp Reply
                    </a>
                    <button
                      onClick={() => handleToggleEnquiryStatus(enq)}
                      className={`text-xs font-bold px-3 py-2 rounded-xl border ${
                        enq.status === 'contacted'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-amber-100 text-amber-800 border-amber-300'
                      }`}
                    >
                      {enq.status === 'contacted' ? '✓ Contacted' : 'Mark Contacted'}
                    </button>
                    <button
                      onClick={() => handleDeleteEnquiry(enq._id)}
                      className="p-2 text-rose-600 hover:bg-rose-100 rounded-xl"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-4">
            <h2 className="font-bold text-base text-slate-900">Moderate Customer Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map((rev) => (
                <div key={rev._id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-sm">{rev.name}</h4>
                      <span className="text-xs font-bold text-amber-500">★ {rev.rating}/5</span>
                    </div>
                    <p className="text-xs text-slate-600 italic">"{rev.text}"</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                    <button
                      onClick={() => handleToggleApproveReview(rev)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${
                        rev.approved
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-slate-200 text-slate-700 border-slate-300'
                      }`}
                    >
                      {rev.approved ? '✓ Approved (Live)' : 'Pending Approval'}
                    </button>

                    <button
                      onClick={() => handleDeleteReview(rev._id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ADD/EDIT PRODUCT MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsProductModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="font-bold text-lg text-slate-900 mb-4">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">English Name *</label>
                <input
                  type="text"
                  required
                  value={productForm.name_en}
                  onChange={(e) => setProductForm({ ...productForm, name_en: e.target.value })}
                  placeholder="e.g. Asian Paints Apex Royale"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Punjabi Name (ਪੰਜਾਬੀ)</label>
                <input
                  type="text"
                  value={productForm.name_pa}
                  onChange={(e) => setProductForm({ ...productForm, name_pa: e.target.value })}
                  placeholder="ਜਿਵੇਂ ਏਸ਼ੀਅਨ ਪੈਂਟਸ ਏਪੈਕਸ"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-gurmukhi"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                  >
                    <option value="Paints">Paints</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Tools">Tools</option>
                    <option value="Waterproofing">Waterproofing</option>
                    <option value="Sanitary">Sanitary</option>
                    <option value="Adhesives">Adhesives</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={productForm.price || ''}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    placeholder="340"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Image URL (or Cloudinary URL)</label>
                <input
                  type="url"
                  value={productForm.imageUrl}
                  onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">English Description</label>
                <textarea
                  rows="2"
                  value={productForm.description_en}
                  onChange={(e) => setProductForm({ ...productForm, description_en: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                ></textarea>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.inStock}
                    onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                    className="rounded text-brand-blue"
                  />
                  <span>In Stock</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-blue text-white font-bold py-3 rounded-xl text-sm shadow mt-2"
              >
                Save Product
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADD SHADE MODAL */}
      {isShadeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsShadeModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="font-bold text-lg text-slate-900 mb-4">Add Paint Shade</h3>

            <form onSubmit={handleSaveShade} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Shade Name *</label>
                <input
                  type="text"
                  required
                  value={shadeForm.name}
                  onChange={(e) => setShadeForm({ ...shadeForm, name: e.target.value })}
                  placeholder="e.g. Royal Ivory"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Color HEX *</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={shadeForm.hex}
                    onChange={(e) => setShadeForm({ ...shadeForm, hex: e.target.value })}
                    className="h-10 w-12 rounded cursor-pointer border border-slate-200"
                  />
                  <input
                    type="text"
                    value={shadeForm.hex}
                    onChange={(e) => setShadeForm({ ...shadeForm, hex: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Shade Code</label>
                <input
                  type="text"
                  value={shadeForm.code}
                  onChange={(e) => setShadeForm({ ...shadeForm, code: e.target.value })}
                  placeholder="AP-101"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={shadeForm.category}
                  onChange={(e) => setShadeForm({ ...shadeForm, category: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                >
                  <option value="Interior">Interior</option>
                  <option value="Exterior">Exterior</option>
                  <option value="Wood & Metal">Wood & Metal</option>
                  <option value="Accent">Accent</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-blue text-white font-bold py-3 rounded-xl text-sm shadow mt-2"
              >
                Add Shade
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
