/* ============================================================
   FeastHub – Data Layer (data.js)
   All static/sample data for populating the UI
   ============================================================ */

const FH = {

  /* ---- Food Categories ---- */
  categories: [
    { icon: '🍔', name: 'Burgers',  filter: 'burger'  },
    { icon: '🍕', name: 'Pizza',    filter: 'pizza'   },
    { icon: '🍣', name: 'Sushi',    filter: 'sushi'   },
    { icon: '🍜', name: 'Noodles',  filter: 'noodles' },
    { icon: '🥗', name: 'Salads',   filter: 'salad'   },
    { icon: '🍰', name: 'Desserts', filter: 'dessert' },
    { icon: '🍹', name: 'Drinks',   filter: 'drinks'  },
    { icon: '🌮', name: 'Tacos',    filter: 'taco'    },
  ],

  /* ---- Popular Dishes ---- */
  dishes: [
    {
      id: 1, name: 'Classic Smash Burger',
      category: 'burger', catLabel: 'Burger',
      price: 349, origPrice: 449,
      rating: 4.8, reviews: 1240,
      desc: 'Double smash patty with cheddar, caramelised onions, and our secret sauce.',
      img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=75',
      badge: 'Bestseller', vegBadge: false
    },
    {
      id: 2, name: 'Margherita Wood-Fire',
      category: 'pizza', catLabel: 'Pizza',
      price: 299, origPrice: null,
      rating: 4.7, reviews: 980,
      desc: 'San Marzano tomatoes, fresh buffalo mozzarella, basil on a wood-fired crust.',
      img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=75',
      badge: 'veg', vegBadge: true
    },
    {
      id: 3, name: 'Salmon Sashimi Set',
      category: 'sushi', catLabel: 'Sushi',
      price: 699, origPrice: 849,
      rating: 4.9, reviews: 620,
      desc: 'Premium Norwegian salmon, tuna, and yellowtail with pickled ginger and wasabi.',
      img: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400&q=75',
      badge: 'sale', vegBadge: false
    },
    {
      id: 4, name: 'Chocolate Lava Cake',
      category: 'dessert', catLabel: 'Dessert',
      price: 189, origPrice: 249,
      rating: 4.8, reviews: 1560,
      desc: 'Warm dark chocolate cake with a molten centre, served with vanilla bean ice cream.',
      img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=75',
      badge: 'Popular', vegBadge: true
    },
    {
      id: 5, name: 'Truffle Ramen',
      category: 'noodles', catLabel: 'Noodles',
      price: 449, origPrice: null,
      rating: 4.6, reviews: 430,
      desc: 'Rich tonkotsu broth infused with black truffle, topped with chashu pork.',
      img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=75',
      badge: 'New', vegBadge: false
    },
    {
      id: 6, name: 'Tropical Açaí Bowl',
      category: 'salad', catLabel: 'Healthy',
      price: 259, origPrice: null,
      rating: 4.5, reviews: 318,
      desc: 'Blended açaí with mango, granola, chia seeds, and a drizzle of raw honey.',
      img: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&q=75',
      badge: 'veg', vegBadge: true
    },
    {
      id: 7, name: 'Mango Passion Smoothie',
      category: 'drinks', catLabel: 'Drinks',
      price: 149, origPrice: 199,
      rating: 4.7, reviews: 870,
      desc: 'Blended Alphonso mango, passion fruit, coconut water, and a hint of lime.',
      img: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&q=75',
      badge: 'sale', vegBadge: true
    },
    {
      id: 8, name: 'BBQ Pulled Pork Tacos',
      category: 'taco', catLabel: 'Tacos',
      price: 319, origPrice: 399,
      rating: 4.6, reviews: 540,
      desc: 'Slow-smoked pulled pork, chipotle slaw, pico de gallo in warm corn tortillas.',
      img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=75',
      badge: 'Bestseller', vegBadge: false
    },
  ],

  /* ---- Why Choose Us ---- */
  whyItems: [
    { icon: 'fa-bolt', title: '30-Min Delivery',    desc: 'We guarantee your order arrives hot and fresh within 30 minutes or your next delivery is free.' },
    { icon: 'fa-leaf', title: 'Fresh Ingredients',  desc: 'Every ingredient is sourced daily from local farms and certified suppliers.' },
    { icon: 'fa-star', title: 'Top-Rated Chefs',    desc: 'Our culinary team includes award-winning chefs with decades of experience.' },
    { icon: 'fa-shield-halved', title: 'Hygiene First', desc: 'FSSAI-certified kitchens with daily health checks and contactless packaging.' },
    { icon: 'fa-credit-card', title: 'Secure Payment', desc: 'Bank-grade encryption for all transactions. Pay with UPI, cards, or COD.' },
    { icon: 'fa-headset', title: '24/7 Support',    desc: 'Round-the-clock customer care via chat, call, or email.' },
  ],

  /* ---- Gallery Images ---- */
  gallery: [
    { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=70', label: 'Chef's Special' },
    { src: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=70', label: 'Vibrant Bowls' },
    { src: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=70', label: 'Breakfast Plates' },
    { src: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=70', label: 'Street Food' },
    { src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&q=70', label: 'Dessert Art' },
    { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=70', label: 'Fine Dining' },
  ],

  /* ---- Testimonials ---- */
  testimonials: [
    {
      text: 'FeastHub changed how I eat. The food arrives piping hot, the app is buttery smooth, and I love the loyalty rewards. Easily the best food delivery I've used.',
      name: 'Priya Sharma', role: 'Food Blogger, Pune',
      avatar: 'https://i.pravatar.cc/80?img=47', stars: 5
    },
    {
      text: 'Ordered for a team lunch — 15 people, different preferences — and everything arrived perfectly on time. The packaging is premium and eco-friendly too!',
      name: 'Rohan Mehta', role: 'Startup Founder, Mumbai',
      avatar: 'https://i.pravatar.cc/80?img=12', stars: 5
    },
    {
      text: 'The Truffle Ramen is absolutely divine. I've ordered it 6 times in a month. Fast delivery every time and the quality never drops. 10/10!',
      name: 'Aisha Khan', role: 'Architect, Hyderabad',
      avatar: 'https://i.pravatar.cc/80?img=23', stars: 5
    },
    {
      text: 'Super transparent about ingredients, which matters a lot to me as someone with food allergies. Customer support resolved my query in under 2 minutes.',
      name: 'Vikram Nair', role: 'Doctor, Bengaluru',
      avatar: 'https://i.pravatar.cc/80?img=33', stars: 4
    },
    {
      text: 'Absolutely love the variety — from authentic sushi to street-style tacos, all under one roof. FeastHub is my go-to for every occasion.',
      name: 'Kavya Reddy', role: 'UX Designer, Chennai',
      avatar: 'https://i.pravatar.cc/80?img=56', stars: 5
    },
  ],

  /* ---- Chefs ---- */
  chefs: [
    {
      name: 'Chef Marco Rossi', role: 'Head Chef – Italian',
      exp: '18 years experience',
      img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=75'
    },
    {
      name: 'Chef Aisha Patel', role: 'Pastry & Desserts',
      exp: '12 years experience',
      img: 'https://images.unsplash.com/photo-1583394293214-0e806e8f9f5d?w=400&q=75'
    },
    {
      name: 'Chef Kenji Tanaka', role: 'Sushi Master',
      exp: '20 years experience',
      img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=75'
    },
    {
      name: 'Chef Priya Nair', role: 'Regional Cuisine',
      exp: '15 years experience',
      img: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=400&q=75'
    },
  ]
};