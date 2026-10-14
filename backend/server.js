const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const productsFilePath = path.join(__dirname, 'data', 'products.json');
const ordersFilePath = path.join(__dirname, 'data', 'orders.json');

// Initialize orders file if not present
if (!fs.existsSync(ordersFilePath)) {
  fs.writeFileSync(ordersFilePath, JSON.stringify([], null, 2));
}

// Helper to read products
function getProducts() {
  try {
    const raw = fs.readFileSync(productsFilePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading products:', err);
    return [];
  }
}

// Helper to read orders
function getOrders() {
  try {
    const raw = fs.readFileSync(ordersFilePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

// Helper to save orders
function saveOrders(orders) {
  fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));
}

// Banners for Flipkart-style Carousel
const banners = [
  {
    id: 'b1',
    title: 'Mega Pet Food Fest',
    subtitle: 'Up to 50% Off on Royal Canin, Pedigree & Whiskas',
    tag: 'BIGGEST ANIMAL SALE',
    badge: 'Special Price',
    bgGradient: 'from-amber-500 via-orange-500 to-red-500',
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=900&auto=format&fit=crop&q=80',
    categoryTarget: 'Dog'
  },
  {
    id: 'b2',
    title: 'Birds & Aviary Feast',
    subtitle: 'Premium Millets, Pellets, Hanging Cages & Toys',
    tag: 'EXPLORE BIRDS',
    badge: 'Min. 35% Off',
    bgGradient: 'from-emerald-600 via-teal-600 to-cyan-600',
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=900&auto=format&fit=crop&q=80',
    categoryTarget: 'Bird'
  },
  {
    id: 'b3',
    title: 'Feline Delights & Treats',
    subtitle: 'Gravy Pouches, Creamy Treats & Scratching Posts',
    tag: 'PURR-FECT DEALS',
    badge: 'Starting ₹115',
    bgGradient: 'from-blue-600 via-indigo-600 to-purple-600',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=900&auto=format&fit=crop&q=80',
    categoryTarget: 'Cat'
  },
  {
    id: 'b4',
    title: 'Aquatic World Specials',
    subtitle: 'High Protein Fish Pellets, Filters & LED Lights',
    tag: 'AQUARIUM ESSENTIALS',
    badge: 'Up to 40% Off',
    bgGradient: 'from-sky-600 via-blue-700 to-indigo-800',
    image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=900&auto=format&fit=crop&q=80',
    categoryTarget: 'Fish'
  }
];

// Categories definition
const categories = [
  { id: 'all', name: 'All Pets', icon: '🐾', count: 16 },
  { id: 'Dog', name: 'Dogs', icon: '🐶', count: 6 },
  { id: 'Cat', name: 'Cats', icon: '🐱', count: 5 },
  { id: 'Bird', name: 'Birds', icon: '🦜', count: 4 },
  { id: 'Fish', name: 'Fish & Aqua', icon: '🐠', count: 2 },
  { id: 'Small Pet', name: 'Small Pets', icon: '🐰', count: 1 },
  { id: 'Healthcare', name: 'Healthcare', icon: '🩺', count: 2 },
  { id: 'Toys', name: 'Toys & Gear', icon: '🎾', count: 3 }
];

// API Health
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'Petszoo - Flipkart Pet Store Backend',
    version: '1.0.0',
    totalProducts: getProducts().length,
    timestamp: new Date().toISOString()
  });
});

// GET Banners
app.get('/api/banners', (req, res) => {
  res.json(banners);
});

// GET Categories
app.get('/api/categories', (req, res) => {
  res.json(categories);
});

// GET Deals of the Day
app.get('/api/deals', (req, res) => {
  const products = getProducts();
  const deals = products.filter(p => p.isDealOfTheDay);
  res.json(deals);
});

// GET Products with search, filtering, and sorting
app.get('/api/products', (req, res) => {
  let products = getProducts();
  const { petType, category, q, sort, minPrice, maxPrice, assuredOnly } = req.query;

  // Filter by Pet Type (Dog, Cat, Bird, Fish, Small Pet)
  if (petType && petType.toLowerCase() !== 'all') {
    products = products.filter(p => p.petType.toLowerCase() === petType.toLowerCase());
  }

  // Filter by Category
  if (category) {
    products = products.filter(p => 
      p.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  // Search keyword (matches title, brand, description, category, flavor)
  if (q && q.trim()) {
    const query = q.toLowerCase().trim();
    products = products.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.petType.toLowerCase().includes(query) ||
      (p.flavor && p.flavor.toLowerCase().includes(query)) ||
      (p.description && p.description.toLowerCase().includes(query))
    );
  }

  // Filter by Price range
  if (minPrice) {
    products = products.filter(p => p.price >= Number(minPrice));
  }
  if (maxPrice) {
    products = products.filter(p => p.price <= Number(maxPrice));
  }

  // Assured only filter
  if (assuredOnly === 'true') {
    products = products.filter(p => p.assured);
  }

  // Sorting
  if (sort === 'price_asc') {
    products.sort((a, b) => a.price - b.price);
  } else if (sort === 'price_desc') {
    products.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    products.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'discount') {
    products.sort((a, b) => b.discountPercent - a.discountPercent);
  } else {
    // Default popularity: ratingCount * rating
    products.sort((a, b) => (b.ratingCount * b.rating) - (a.ratingCount * a.rating));
  }

  res.json(products);
});

// GET Single Product
app.get('/api/products/:id', (req, res) => {
  const products = getProducts();
  const product = products.find(p => p.id === req.params.id);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // Also send 4 recommended products from same petType or category
  const related = products
    .filter(p => p.id !== product.id && (p.petType === product.petType || p.category === product.category))
    .slice(0, 4);

  res.json({ product, related });
});

// POST Create Order (Checkout)
app.post('/api/orders', (req, res) => {
  const { items, shippingAddress, paymentMethod, totalAmount, discountAmount, superCoinsUsed } = req.body;

  if (!items || !items.length) {
    return res.status(400).json({ error: 'Order must contain at least one item' });
  }

  const orderId = 'PZ' + Math.floor(10000000 + Math.random() * 90000000);
  const now = new Date();
  const deliveryDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // 2 days from now

  const newOrder = {
    orderId,
    createdAt: now.toISOString(),
    expectedDelivery: deliveryDate.toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    }),
    items,
    shippingAddress: shippingAddress || {
      name: 'Petszoo Customer',
      phone: '+91 98765 43210',
      pincode: '560001',
      addressLine: 'Flat 402, Green Meadows',
      city: 'Bangalore',
      state: 'Karnataka'
    },
    paymentMethod: paymentMethod || 'Cash on Delivery (COD)',
    paymentStatus: paymentMethod === 'Cash on Delivery (COD)' ? 'Pending (Pay on Delivery)' : 'Paid',
    totalAmount,
    discountAmount: discountAmount || 0,
    superCoinsUsed: superCoinsUsed || 0,
    superCoinsEarned: Math.floor(totalAmount / 50),
    status: 'Order Placed',
    trackingSteps: [
      { step: 'Order Placed', time: 'Just now', completed: true, current: true },
      { step: 'Packed & Dispatched', time: 'Expected tomorrow', completed: false, current: false },
      { step: 'Shipped via Petszoo Express', time: 'In transit', completed: false, current: false },
      { step: 'Out for Delivery', time: 'Expected 2 days', completed: false, current: false },
      { step: 'Delivered', time: 'Arriving soon', completed: false, current: false }
    ]
  };

  const orders = getOrders();
  orders.unshift(newOrder);
  saveOrders(orders);

  res.status(201).json({
    success: true,
    message: 'Order placed successfully!',
    order: newOrder
  });
});

// GET Orders
app.get('/api/orders', (req, res) => {
  const orders = getOrders();
  res.json(orders);
});

// GET Order by ID
app.get('/api/orders/:id', (req, res) => {
  const orders = getOrders();
  const order = orders.find(o => o.orderId === req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🐾 Petszoo Backend API running on http://localhost:${PORT}`);
});
