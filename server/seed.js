const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dns = require('dns');
require('dotenv').config();

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

const Admin = require('./models/Admin');
const Product = require('./models/Product');
const Shade = require('./models/Shade');
const Review = require('./models/Review');

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/goel_paints';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await Admin.deleteMany({});
    await Product.deleteMany({});
    await Shade.deleteMany({});
    await Review.deleteMany({});

    // Seed Admin Account
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@goelpaints.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(adminPassword, salt);

    await Admin.create({
      email: adminEmail,
      passwordHash,
      name: 'Goel Store Manager',
    });
    console.log(`✅ Admin created with email: ${adminEmail}`);

    // Seed Sample Products
    const sampleProducts = [
      {
        name_en: 'Asian Paints Apex Royale Emulsion',
        name_pa: 'ਏਸ਼ੀਅਨ ਪੈਂਟਸ ਏਪੈਕਸ ਰੋਇਲ ਇਮਲਸ਼ਨ',
        category: 'Paints',
        description_en: 'Premium luxury exterior interior acrylic wall emulsion with rich sheen finish and anti-fungal properties.',
        description_pa: 'ਸ਼ਾਨਦਾਰ ਚਮਕ ਅਤੇ ਐਂਟੀ-ਫੰਗਲ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਵਾਲੀ ਵਧੀਆ ਕੰਧ ਪੇਂਟ।',
        price: 340,
        unit: 'Ltr',
        imageUrl: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&auto=format&fit=crop&q=80',
        inStock: true,
        featured: true,
      },
      {
        name_en: 'Nerolac Beauty Gold Washable Interior',
        name_pa: 'ਨੇਰੋਲੈਕ ਬਿਊਟੀ ਗੋਲਡ ਵਾਸ਼ੇਬਲ ਪੇਂਟ',
        category: 'Paints',
        description_en: 'High durability smooth stain-resistant washable paint for living rooms and bedrooms.',
        description_pa: 'ਲਿਵਿੰਗ ਰੂਮਾਂ ਅਤੇ ਬੈੱਡਰੂਮਾਂ ਲਈ ਦਾਗ-ਰੋਧਕ ਵਾਸ਼ੇਬਲ ਪੇਂਟ।',
        price: 280,
        unit: 'Ltr',
        imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80',
        inStock: true,
        featured: true,
      },
      {
        name_en: 'Dr. Fixit 301 LW+ Waterproofing Liquid',
        name_pa: 'ਡਾ. ਫਿਕਸਿਟ 301 ਵਾਟਰਪ੍ਰੂਫਿੰਗ ਲਿਕਵਿਡ',
        category: 'Waterproofing',
        description_en: 'Integral liquid waterproofing compound for concrete and plaster work to prevent dampness.',
        description_pa: 'ਕੰਕਰੀਟ ਅਤੇ ਪਲਾਸਟਰ ਲਈ ਵਾਟਰਪ੍ਰੂਫਿੰਗ ਕੰਪਾਊਂਡ।',
        price: 185,
        unit: 'Ltr',
        imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80',
        inStock: true,
        featured: true,
      },
      {
        name_en: 'Pidilite Fevicol SH Synthetic Resin Adhesive',
        name_pa: 'ਪੀਡੀਲਾਈਟ ਫੇਵੀਕੋਲ SH ਵੁੱਡ ਗਲੂ',
        category: 'Adhesives',
        description_en: 'The ultimate woodworking glue for bonding wood, plywood, laminate, and furniture.',
        description_pa: 'ਲੱਕੜ, ਪਲਾਈਵੁੱਡ ਅਤੇ ਫਰਨੀਚਰ ਲਈ ਭਰੋਸੇਮੰਦ ਗੋਂਦ।',
        price: 240,
        unit: 'Kg',
        imageUrl: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&auto=format&fit=crop&q=80',
        inStock: true,
        featured: false,
      },
      {
        name_en: 'Jaquar Brass Chrome Pillar Tap',
        name_pa: 'ਜੈਕੁਆਰ ਬ੍ਰਾਸ ਕ੍ਰੋਮ ਟੂਟੀ',
        category: 'Plumbing',
        description_en: 'Heavy-duty chrome plated solid brass faucet tap with smooth ceramic disc cartridge.',
        description_pa: 'ਮਜ਼ਬੂਤ ​​ਅਤੇ ਚਮਕਦਾਰ ਬ੍ਰਾਸ ਕ੍ਰੋਮ ਟੂਟੀ।',
        price: 850,
        unit: 'Piece',
        imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80',
        inStock: true,
        featured: false,
      },
      {
        name_en: 'Professional Heavy-Duty Paint Roller & Frame Set',
        name_pa: 'ਪੇਂਟ ਰੋਲਰ ਅਤੇ ਫਰੇਮ ਸੈੱਟ',
        category: 'Tools',
        description_en: '9-inch micro-fiber roller with sturdy comfort grip handle for uniform walls and ceilings.',
        description_pa: 'ਦਿਵਾਰਾਂ ਅਤੇ ਛੱਤਾਂ ਲਈ ਪ੍ਰੋਫੈਸ਼ਨਲ ਪੇਂਟ ਰੋਲਰ।',
        price: 220,
        unit: 'Piece',
        imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80',
        inStock: true,
        featured: false,
      },
      {
        name_en: 'Havells Modular 6A Switch & Socket Set',
        name_pa: 'ਹੈਵਲਜ਼ ਮੋਡਿਊਲਰ ਸਵਿੱਚ ਅਤੇ ਸਾਕਟ ਸੈੱਟ',
        category: 'Electrical',
        description_en: 'Fire-retardant high grade polycarbonate electrical switch & socket setup.',
        description_pa: 'ਵਧੀਆ ਗੁਣਵੱਤਾ ਵਾਲੇ ਇਲੈਕਟ੍ਰਿਕ ਸਵਿੱਚ।',
        price: 130,
        unit: 'Pack',
        imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
        inStock: true,
        featured: false,
      },
      {
        name_en: 'Godrej Stainless Steel Door Lock & Handles',
        name_pa: 'ਗੋਦਰੇਜ ਡੋਰ ਲਾਕ ਅਤੇ ਹੈਂਡਲ',
        category: 'Hardware',
        description_en: 'Premium anti-theft mortise door lock set with double lock mechanism for main entrance doors.',
        description_pa: 'ਦਰਵਾਜ਼ਿਆਂ ਲਈ ਮਜ਼ਬੂਤ ਸਟੀਲ ਲਾਕ ਅਤੇ ਹੈਂਡਲ।',
        price: 1450,
        unit: 'Set',
        imageUrl: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=600&auto=format&fit=crop&q=80',
        inStock: true,
        featured: true,
      }
    ];

    await Product.insertMany(sampleProducts);
    console.log(`✅ Seeded ${sampleProducts.length} products`);

    // Seed Sample Paint Shades
    const sampleShades = [
      { name: 'Royal Ivory', hex: '#FFF8DC', category: 'Interior', code: 'AP-101' },
      { name: 'Warm Cream', hex: '#FAF0E6', category: 'Interior', code: 'AP-102' },
      { name: 'Punjabi Sunshine Yellow', hex: '#FFD700', category: 'Accent', code: 'AP-103' },
      { name: 'Mohali Sky Blue', hex: '#87CEEB', category: 'Interior', code: 'AP-104' },
      { name: 'Fresh Mint Green', hex: '#98FB98', category: 'Interior', code: 'AP-105' },
      { name: 'Heritage Teak Brown', hex: '#8B4513', category: 'Wood & Metal', code: 'WM-201' },
      { name: 'Imperial Crimson Red', hex: '#990000', category: 'Accent', code: 'AP-106' },
      { name: 'Terracotta Red', hex: '#E25822', category: 'Exterior', code: 'EX-301' },
      { name: 'Slate Weather Grey', hex: '#708090', category: 'Exterior', code: 'EX-302' },
      { name: 'Golden Sand', hex: '#E6C280', category: 'Interior', code: 'AP-107' },
      { name: 'Pearl White Satin', hex: '#F8F9FA', category: 'Interior', code: 'AP-108' },
      { name: 'Deep Mahogany Gloss', hex: '#4A2311', category: 'Wood & Metal', code: 'WM-202' },
    ];

    await Shade.insertMany(sampleShades);
    console.log(`✅ Seeded ${sampleShades.length} paint shades`);

    // Seed Sample Google Reviews
    const sampleReviews = [
      {
        name: 'Gurpreet Singh',
        rating: 5,
        text: 'Best paint shop in Sector 70 Mohali! Mr. Goel is very helpful and advised us the exact quantity of Asian Paints for our new house. Saved us money!',
        approved: true,
      },
      {
        name: 'Amit Sharma',
        rating: 4,
        text: 'Wide range of hardware tools and plumbing fittings. Ample parking space right in front of Booth No. 4, which is very convenient.',
        approved: true,
      },
      {
        name: 'Manpreet Kaur',
        rating: 5,
        text: 'Got same-day home delivery of paint buckets and Dr. Fixit waterproofing in Sector 70. Very reasonable prices compared to others.',
        approved: true,
      },
      {
        name: 'Rajesh Contractor',
        rating: 5,
        text: 'I buy bulk supplies for my building sites here. Great wholesale pricing and top quality original products.',
        approved: true,
      }
    ];

    await Review.insertMany(sampleReviews);
    console.log(`✅ Seeded ${sampleReviews.length} reviews`);

    console.log('🎉 Database seeding finished successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
