/**
 * Hasaan Bazaar E-Commerce System
 * Complete Functional Features:
 * - Product Quick View Modal (Details, Qty, Add to Cart, Direct WA Buy)
 * - Live Search Engine (Instant product filtering + Status feedback)
 * - Policy & Support Center Modal (About, Delivery, Refund, Support, Terms)
 * - Interactive Cart Drawer with Delivery Charge (Inside Dhaka 80৳ / Outside Dhaka 150৳)
 * - WhatsApp Automated Order Link Generator
 * - Google Map & Contact Links
 */

// ================= CONFIGURATION =================
const WHATSAPP_PHONE = "8801738625136";

// Bengali digit conversion helper
function toBengaliNumber(n) {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return n.toString().replace(/\d/g, (d) => banglaDigits[d]);
}

// Default Product catalog (Base 16 products)
const DEFAULT_PRODUCTS = [
  // ================= ATAR COLLECTION =================
  {
    id: 1,
    name: "Kasturi Elite",
    category: "attar",
    categoryName: "আতর ও সুগন্ধি",
    price: 1350,
    originalPrice: 1890,
    unit: "টি",
    rating: 5.0,
    reviews: 58,
    badge: "বেস্ট সেলার",
    image: "https://ator.com.bd/cdn/shop/files/ChatGPT_Image_Sep_6_2026_12_58_11_AM.png?v=1788638640&width=832",
    description: "দুবাই থেকে আমদানিকৃত ১০০% খাঁটি ও আভিজাত্যপূর্ণ কস্তুরী মৃগনাভির দীর্ঘস্থায়ী সুবাস। মিষ্টি, ফ্লোরাল ও ডিপ মাস্কি স্মোকি নোটের অপূর্ব সমন্বয়। এতে কোনো অ্যালকোহল নেই এবং কাপড়ে সুবাস ২৪ থেকে ৪৮ ঘণ্টা স্থায়ী থাকে।",
    features: [
      "১০০% খাঁটি ও অ্যালকোহলমুক্ত সেমি-অর্গানিক আতর",
      "২৪-৪৮ ঘণ্টা লং-লাস্টিং সুবাস ও চমৎকার প্রজেকশন",
      "অভিজাত কস্তুরী মৃগনাভি ও সফট মাস্কি নোট",
      "প্রিমিয়াম সুন্নাহ আতর কালেকশন"
    ]
  },
  {
    id: 2,
    name: "Khaltat Night",
    category: "attar",
    categoryName: "আতর ও সুগন্ধি",
    price: 6950,
    originalPrice: 8200,
    rating: 4.9,
    reviews: 42,
    badge: "লাক্সারি নিস",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW8vJA6Fa_Lt8C-I44IRptIGlcKJdIjVBzmIZBhkdonw&s=10",
    description: "প্রিমিয়াম ওরিয়েন্টাল নিস পারফিউম। জুসি চেরি, দারুচিনি, লাল আপেল ও গোল্ডেন ভ্যানিলার অপূর্ব মোহনীয় মিশ্রণ। এটি আভিজাত্যপূর্ণ অনুষ্ঠান ও ব্যক্তিত্ব প্রকাশের শ্রেষ্ঠ উপহার।",
    features: [
      "১০০ মিলি অরিজিনাল Eau De Parfum (EDP)",
      "স্মোকি সুইট চেরি, দারুচিনি ও ভ্যানিলা নোট",
      "গভীর, রাজকীয় ও অত্যন্ত আকর্ষণীয় সুবাস",
      "প্রিমিয়াম এক্সক্লুসিভ প্যাকেজিং"
    ]
  },
  {
    id: 3,
    name: "Musk Kashmir",
    category: "attar",
    categoryName: "আতর ও সুগন্ধি",
    price: 7200,
    originalPrice: 8500,
    rating: 5.0,
    reviews: 65,
    badge: "রয়্যাল মাস্ক",
    image: "https://fimgs.net/mdimg/perfume-thumbs/375x500.100574.jpg",
    description: "কাশ্মীরি শুভ্র মাস্ক, চন্দন ও সাদা গোলমরিচের স্নিগ্ধ ও স্বর্গীয় রাজকীয় সুবাস। মন ও মস্তিষ্ককে শান্ত করে এক নির্মল পবিত্রতার অনুভূতি এনে দেয়। দীর্ঘস্থায়ী এবং সংবেদনশীল ত্বকেও অত্যন্ত কোমল।",
    features: [
      "১০০ মিলি লাক্সারি নিস EDP বটল",
      "কাশ্মীরি সাদা মাস্ক, চন্দন ও কার্নেশন নোট",
      "পবিত্র, স্নিগ্ধ ও ক্লাসিক্যাল শুভ্র ঘ্রাণ",
      "সারাদিন স্থায়ী রাজকীয় উপস্থিতি"
    ]
  },
  {
    id: 4,
    name: "King Solomon EDP",
    category: "attar",
    categoryName: "আতর ও সুগন্ধি",
    price: 7450,
    originalPrice: 8900,
    rating: 4.9,
    reviews: 37,
    badge: "কিং কালেকশন",
    image: "https://cdn.insales-shop.ru/images/products/1/1013/967828469/Photo04.webp",
    description: "হযরত সুলায়মান (আ.) এর ঐতিহাসিক ঐতিহ্যের অনুপ্রেরণায় তৈরি রাজকীয় প্রাচ্য পারফিউম। ড্রাগন ব্লাড, সিডারউড, অ্যাম্বার ও মশলার বলিষ্ঠ মেলবন্ধন ব্যক্তিত্বে এক অপ্রতিরোধ্য গাম্ভীর্য ও আভিজাত্য সৃষ্টি করে।",
    features: [
      "১০০ মিলি অরিজিনাল লাক্সারি EDP স্প্রে",
      "উডি, ওরিয়েন্টাল অ্যাম্বার ও সিডার স্পাইস নোট",
      "ব্যক্তিত্বে রাজকীয় প্রভাব সৃষ্টিকারী পারফিউম",
      "লাক্সারি ওরিয়েন্টাল ফ্ল্যাকন ডিজাইন"
    ]
  },

  // ================= PANJABI COLLECTION (Khadi, Linen, Silk, Cotton) =================
  {
    id: 5,
    name: "Khadi Heritage Panjabi",
    category: "panjabi",
    categoryName: "প্রিমিয়াম পাঞ্জাবি",
    price: 1850,
    originalPrice: 2250,
    rating: 4.9,
    reviews: 46,
    badge: "খাদি কালেকশন",
    image: "https://cdn2.clevup.in/434866/p2-2-1777095503571.png?width=600&format=webp",
    description: "শতভাগ দেশীয় খাঁটি খাদি কাপড়ের ঐতিহ্যবাহী পাঞ্জাবি। মোটা ও আরামদায়ক সুতার নিখুঁত হ্যান্ডলুম টেক্সচার, যা সব ঋতুতেই স্বাচ্ছন্দ্য প্রদান করে। জুমার নামাজ ও ঘরোয়া আয়োজনে অত্যন্ত রুচিশীল ও মার্জিত লুক দেয়।",
    features: [
      "১০০% পিওর হ্যান্ডলুম খাদি কটন ফেব্রিক",
      "শ্বাসপ্রশ্বাস উপযোগী টেক্সচার ও আরামদায়ক অনুভূতি",
      "রুচিশীল উডেন বোতাম ও নিখুঁত কলার ফিনিশ",
      "সহজ ওয়াশ ও দীর্ঘস্থায়ী কাপড়ের স্থায়িত্ব"
    ]
  },
  {
    id: 6,
    name: "Pure Linen Luxury Panjabi",
    category: "panjabi",
    categoryName: "প্রিমিয়াম পাঞ্জাবি",
    price: 1850,
    originalPrice: 2200,
    rating: 5.0,
    reviews: 52,
    badge: "ব্ল্যাক লিনেন",
    image: "https://cdn.kaykraft.com/wp-content/uploads/2023/05/PNJ-LN-LG-1087-1.jpg",
    description: "অভিজাত ব্ল্যাক লিনেন এমব্রয়ডারি পাঞ্জাবি। হাই-গ্রেড পিওর লিনেন ফেব্রিক, যা প্রচণ্ড গরমেও শরীরকে রাখে ঠাণ্ডা ও ক্লান্তিহীন। আধুনিক কলার এমব্রয়ডারি ও ফুল-স্লিভ রেগুলার ফিট।",
    features: [
      "১০০% প্রিমিয়াম পিওর লিনেন ফেব্রিক",
      "কলার ও প্লাকেটে এক্সক্লুসিভ আধুনিক এমব্রয়ডারি",
      "হালকা, বাতাস চলাচলকারী ও অত্যন্ত আরামদায়ক",
      "আধুনিক এলিগ্যান্ট কাটিং ও পারফেক্ট ফিটিং"
    ]
  },
  {
    id: 7,
    name: "Royal Silk Festive Panjabi",
    category: "panjabi",
    categoryName: "প্রিমিয়াম পাঞ্জাবি",
    price: 3950,
    originalPrice: 4800,
    rating: 5.0,
    reviews: 68,
    badge: "রয়্যাল সিল্ক",
    image: "https://i0.wp.com/shenextfashion.com/wp-content/uploads/2024/04/3.SNF_0641_5.jpg",
    description: "এক্সক্লুসিভ রয়্যাল ব্লু এমব্রয়ডারি র সিল্ক পাঞ্জাবি। ঈদ, বিয়ে কিংবা বিশেষ পারিবারিক উৎসবের জন্য রয়্যাল ব্লু র সিল্কের দীপ্তি ও সূক্ষ্ম জরির কাজ আপনাকে করে তুলবে সবার চেয়ে অনন্য।",
    features: [
      "খাঁটি র সিল্ক (Raw Silk) লাক্সারি ফেব্রিক",
      "রয়্যাল ব্লু গর্জিয়াস কালার টোন ও উজ্জ্বল দীপ্তি",
      "কলার ও প্লাকেটে এক্সক্লুসিভ গোল্ডেন জরি এমব্রয়ডারি",
      "ঈদ ও ফেস্টিভ অকেশনের জন্য প্রিমিয়াম পছন্দ"
    ]
  },
  {
    id: 8,
    name: "Classic White Cotton Panjabi",
    category: "panjabi",
    categoryName: "প্রিমিয়াম পাঞ্জাবি",
    price: 2850,
    originalPrice: 3250,
    rating: 4.9,
    reviews: 74,
    badge: "ক্লাসিক কটন",
    image: "https://anjans.com/image/cache/catalog/Margin1/Panjabi-33745-800x800.jpg",
    description: "হোয়াইট ডিজাইন কটন এমব্রয়ডার্ড রেগুলার ফিট একছাট পাঞ্জাবি। শতভাগ পিওর কম্বড কটন ফেব্রিক, সূক্ষ্ম হোয়াইট-অন-হোয়াইট থ্রেড এমব্রয়ডারি ও সুন্নাহ সম্মত ক্লাসিক শুভ্রতা।",
    features: [
      "এক্সক্লুসিভ কটন একছাট ক্লাসিক কাটিং",
      "১০০% প্রিমিয়াম সফট ব্রেথিবল কম্বড কটন",
      "বুক ও কলারে সূক্ষ্ম থ্রেড এমব্রয়ডারি কারুকাজ",
      "জুমার নামাজ ও দৈনন্দিন ব্যবহারের জন্য শ্রেষ্ঠ পছন্দ"
    ]
  },

  // ================= TUPI COLLECTION (Afghan, Egyptian Kufi, Zinnah, Bokies) =================
  {
    id: 9,
    name: "Afghan Tupi",
    category: "tupi",
    categoryName: "ইসলামিক টুপি",
    price: 350,
    originalPrice: 450,
    rating: 4.9,
    reviews: 48,
    badge: "আফগান স্টাইল",
    image: "https://static-01.daraz.com.bd/p/69c71ad17f1a281275f68dcc30b68fc3.png",
    description: "ঐতিহ্যবাহী আফগান স্টাইল প্রিমিয়াম টুপি। নিখুঁত বৃত্তাকার রোল্ড কাটিং ও সফট আরামদায়ক ফেব্রিক। মাথায় সুন্দরভাবে সেট হয়ে থাকে এবং নামাজ ও যেকোনো ঋতুতে ব্যবহারে পরম প্রশান্তি ও আভিজাত্য এনে দেয়।",
    features: [
      "১০০% প্রিমিয়াম সফট ব্লেন্ড উল ফেব্রিক",
      "ঐতিহ্যবাহী আফগান রোল্ড এজ কারুকাজ",
      "মাথায় আরামদায়ক গ্রিপ ও পারফেক্ট ফিটিং",
      "নামাজ, মাহফিল ও প্রাত্যহিক ব্যবহারে অনন্য"
    ]
  },
  {
    id: 10,
    name: "Egyptian Kufi Tupi",
    category: "tupi",
    categoryName: "ইসলামিক টুপি",
    price: 290,
    originalPrice: 380,
    rating: 4.9,
    reviews: 45,
    badge: "মিশরীয় কুফি",
    image: "https://jubbabd.com/wp-content/uploads/2026/03/IMG_2805.JPG-600x722.jpeg",
    description: "ঐতিহ্যবাহী মিশরীয় ডিজাইনের প্রিমিয়াম কুফি টুপি। খাঁটি কম্বড সুতি কাপড়ে নিখুঁত জ্যামিতিক সূচিকর্মের কারুকাজ। অত্যন্ত হালকা, টেকসই এবং বাতাস চলাচলের সুব্যবস্থা থাকায় গরমেও মাথা রাখে সম্পূর্ণ ঘামমুক্ত ও সতেজ।",
    features: [
      "১০০% প্রিমিয়াম কম্বড কটন ফেব্রিক",
      "ঐতিহ্যবাহী মিশরীয় জ্যামিতিক সূচিকর্ম",
      "মাথায় নিখুঁত ও আরামদায়ক গ্রিপিং",
      "দৈনন্দিন সালাত ও বিশেষ আয়োজনের জন্য অনন্য"
    ]
  },
  {
    id: 11,
    name: "Zinnah Tupi",
    category: "tupi",
    categoryName: "ইসলামিক টুপি",
    price: 1350,
    originalPrice: 1750,
    rating: 5.0,
    reviews: 54,
    badge: "রয়্যাল কারাকুল",
    image: "https://www.majorwear.co.uk/media/catalog/product/cache/daeeb3350e33c4c08d6aadccdb4b3542/image/117679d33/genuine-leather-karakul-hat-e39-13.jpg",
    description: "ঐতিহ্যবাহী জেনুইন কারাকুল লেদার ও ফার জিন্নাহ টুপি। ক্লাসিক্যাল স্টেটসমেন কাটিং ও সিল্কি ইনার লাইনিং ব্যক্তিত্বে সৃষ্টি করে গম্ভীর আভিজাত্য। বিশেষ ইসলামী মাহফিল, জুমা ও উৎসবের জন্য শ্রেষ্ঠ পছন্দের টুপি।",
    features: [
      "ঐতিহ্যবাহী লাক্সারি কারাকুল হ্যাট স্টাইল",
      "আরামদায়ক সিল্কি ইনার লাইনিং",
      "মাথায় দীর্ঘ সময় পরিধানেও পরম স্বস্তি",
      "আভিজাত্য ও ইসলামিক ঐতিহ্যের অনন্য প্রতীক"
    ]
  },
  {
    id: 12,
    name: "Bokies Tupi",
    category: "tupi",
    categoryName: "ইসলামিক টুপি",
    price: 280,
    originalPrice: 360,
    rating: 4.9,
    reviews: 62,
    badge: "পাকিস্তানি বগিস",
    image: "https://img.drz.lazcdn.com/static/bd/p/2c0ae7f66302ca5c7028cd6da77cb930.jpg_720x720q80.jpg",
    description: "ঐতিহ্যবাহী পাকিস্তানি কটন বগিস টুপি। শতভাগ খাঁটি সুতি সুতায় বোনা নিখুঁত জ্যামিতিক কারুকাজ। প্রচণ্ড গরমেও বাতাস চলাচলের ব্যবস্থা থাকায় মাথা থাকে সম্পূর্ণ ঠাণ্ডা, ঘামহীন ও আরামদায়ক।",
    features: [
      "১০০% পিওর কটন ব্রেথেবল সুতা",
      "নিখুঁত হ্যান্ডক্রাফট বগিস এমব্রয়ডারি",
      "মাথায় সম্পূর্ণ ঘাম প্রতিরোধী আরাম",
      "দৈনন্দিন পাঁচ ওয়াক্ত নামাজে ব্যবহারের জন্য সেরা"
    ]
  },

  // ================= HONEY COLLECTION (Lychee, Mixed, Kashmiri Sidr, Black Seed) =================
  {
    id: 13,
    name: "Lychee Flower Honey",
    category: "honey",
    categoryName: "প্রাকৃতিক মধু",
    price: 780,
    originalPrice: 950,
    unit: "কেজি",
    rating: 4.9,
    reviews: 58,
    badge: "লিচু বাগান ফ্রেশ",
    image: "https://5.imimg.com/data5/SELLER/Default/2021/10/JL/YG/VV/119138440/litchi-honey.png",
    description: "দিনাজপুরের বিখ্যাত লিচু বাগান থেকে প্রাকৃতিক উপায়ে সংগৃহীত ১০০% খাঁটি লিচু ফুলের মধু (১ কেজি)। হালকা সোনালী রঙের এই মধুর বিশেষত্ব হলো এর মিষ্টি সতেজ ফ্লেভার এবং কোনো কৃত্রিম চিনি বা তাপ প্রয়োগ ছাড়া সরাসরি চাকের খাঁটি স্বাদ।",
    features: [
      "১০০% খাঁটি ও কাঁচা লিচু ফুলের মধু (১ কেজি)",
      "স্বাভাবিক ফ্রুক্টোজ ও গ্লুকোজে ভরপুর প্রাকৃতিক শক্তি",
      "শিশু ও বয়স্কদের শারীরিক পুষ্টির অনন্য উৎস",
      "নিরাপদ ফুড-গ্রেড কাঁচের বয়ামে প্যাকেজিং"
    ]
  },
  {
    id: 14,
    name: "Mixed Flower Honey",
    category: "honey",
    categoryName: "প্রাকৃতিক মধু",
    price: 920,
    originalPrice: 1150,
    unit: "কেজি",
    rating: 4.8,
    reviews: 74,
    badge: "মাল্টিফ্লোরাল র",
    image: "https://apiproduktai.com/wp-content/uploads/Honey-Main.webp",
    description: "প্রাকৃতিক বনাঞ্চলের নানা জাতের দেশীয় বুনো ফুলের নেকটার থেকে মৌমাছিদের তৈরি মাল্টিফ্লোরাল খাঁটি মধু (১ কেজি)। গভীর সোনালী বর্ণ, চমৎকার সুবাস ও সমৃদ্ধ পুষ্টি উপাদান যা শরীরের রোগ প্রতিরোধ ক্ষমতা বহুগুণ বাড়ায়।",
    features: [
      "শতভাগ প্রাকৃতিক বহুফুলের পুষ্টিকর নির্যাস",
      "প্রাকৃতিক এনজাইম, মিনারেল ও অ্যান্টিঅক্সিডেন্ট সমৃদ্ধ",
      "হজমশক্তি বৃদ্ধি ও শারীরিক দুর্বলতা দূরীকরণে সহায়ক",
      "কোনো প্রিজারভেটিভ বা কেমিক্যাল ছাড়া অপরিশোধিত মধু"
    ]
  },
  {
    id: 15,
    name: "Kashmiri Sidr Honey",
    category: "honey",
    categoryName: "প্রাকৃতিক মধু",
    price: 2350,
    originalPrice: 2800,
    unit: "কেজি",
    rating: 5.0,
    reviews: 92,
    badge: "রয়্যাল কাশ্মীরি সিদর",
    image: "https://kashmiril.com/cdn/shop/files/kashmiri-sidr-honey-poured-over-comb-chunks.webp?v=1785443329&width=3840",
    description: "বিশ্ববিখ্যাত কাশ্মীরি সিদর (বুনো কুল/বরই) ফুলের রাজকীয় মধু (১ কেজি)। বিশ্বের অন্যতম সেরা ও ঔষধি গুণসম্পন্ন মধু হিসেবে এটি সুপরিচিত। গাঢ় ক্যারেমেল ঘনত্ব, অসাধারণ স্বাদ এবং যুগ যুগ ধরে প্রতিষেধক ও মহৌষধ হিসেবে সমাদৃত।",
    features: [
      "১০০% খাঁটি ওয়াইল্ড কাশ্মীরি সিদর নেকটার",
      "সর্বোচ্চ মাত্রার প্রাকৃতিক অ্যান্টিব্যাকটেরিয়াল শক্তি",
      "প্রিমিয়াম থিক টেক্সচার ও দীর্ঘস্থায়ী রাজকীয় স্বাদ",
      "লাক্সারি এয়ারটাইট প্রিমিয়াম কাঁচের জার"
    ]
  },
  {
    id: 16,
    name: "Black Seed Honey",
    category: "honey",
    categoryName: "প্রাকৃতিক মধু",
    price: 1180,
    originalPrice: 1450,
    unit: "কেজি",
    rating: 5.0,
    reviews: 86,
    badge: "মহৌষধ কালোজিরা",
    image: "https://imanatural.co.uk/cdn/shop/articles/black-seed-oil-and-honey.webp?v=1784795438",
    description: "কালোজিরা ক্ষেতের খাঁটি মধু (১ কেজি), যা 'মৃত্যু ব্যতীত সকল রোগের মহৌষধ' খ্যাত কালোজিরার অনন্য প্রাকৃতিক ঔষধি উপাদানে ভরপুর। গাঢ় বর্ণ, খাঁটি প্রাকৃতিক স্বাদ এবং সর্দি-কাশি ও ফুসফুসের সুরক্ষায় বিশেষ উপকারী।",
    features: [
      "১০০% পিওর কালোজিরা ফুলের কাঁচা মধু (১ কেজি)",
      "রোগ প্রতিরোধ ক্ষমতা ও জীবনীশক্তি বৃদ্ধিকারক",
      "সর্দি, কাশি ও মৌসুমি ফ্লু প্রতিরোধে অত্যন্ত ফলদায়ক",
      "শতভাগ নির্ভেজাল ও ল্যাব টেস্টের নিশ্চয়তা"
    ]
  }
];

// Active products array (populated dynamically from defaults + localStorage)
let products = [];

function initProducts() {
  try {
    const custom = JSON.parse(localStorage.getItem("hasaan_bazaar_custom_products") || "[]");
    const deletedIds = JSON.parse(localStorage.getItem("hasaan_bazaar_deleted_ids") || "[]");
    
    // Filter out deleted defaults
    const activeDefaults = DEFAULT_PRODUCTS.filter(p => !deletedIds.includes(p.id));
    
    // Merge
    products = [...activeDefaults, ...custom];
  } catch (e) {
    products = [...DEFAULT_PRODUCTS];
  }

  const badge = document.getElementById("adminProductsBadgeCount");
  if (badge) badge.innerText = toBengaliNumber(products.length);
}

// Shopping Cart & Checkout State
let cart = [];
let deliveryCharge = 80; // 80 Inside Dhaka, 150 Outside Dhaka
let currentFilter = "all";
let modalQty = 1;

// DOM Elements
const productsGrid = document.getElementById("productsGrid");
const filterButtons = document.querySelectorAll(".tab-btn");
const cartBtn = document.getElementById("cartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const cartCount = document.getElementById("cartCount");
const cartSubtotalPrice = document.getElementById("cartSubtotalPrice");
const cartDeliveryCharge = document.getElementById("cartDeliveryCharge");
const cartTotalPrice = document.getElementById("cartTotalPrice");
const whatsappCheckoutBtn = document.getElementById("whatsappCheckoutBtn");
const toast = document.getElementById("toast");
const toastMsg = document.getElementById("toastMsg");

// Search elements
const searchInput = document.getElementById("searchInput");
const searchClearBtn = document.getElementById("searchClearBtn");
const searchSubmitBtn = document.getElementById("searchSubmitBtn");
const searchStatus = document.getElementById("searchStatus");

// Modals
const productModal = document.getElementById("productModal");
const productModalOverlay = document.getElementById("productModalOverlay");
const productModalBody = document.getElementById("productModalBody");
const closeProductModalBtn = document.getElementById("closeProductModalBtn");

const policyModal = document.getElementById("policyModal");
const policyModalOverlay = document.getElementById("policyModalOverlay");
const policyModalContent = document.getElementById("policyModalContent");
const policyModalTitle = document.getElementById("policyModalTitle");
const closePolicyModalBtn = document.getElementById("closePolicyModalBtn");
const policyTabBtns = document.querySelectorAll(".p-tab-btn");

// Customer form fields
const custName = document.getElementById("custName");
const custPhone = document.getElementById("custPhone");
const custAddress = document.getElementById("custAddress");

// Mobile menu elements
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const closeMenuBtn = document.getElementById("closeMenuBtn");
const navMenu = document.getElementById("navMenu");

// Initialize application
document.addEventListener("DOMContentLoaded", () => {
  initProducts();
  renderProducts("all");
  setupEventListeners();
  updateCartUI();
});

// Render products to grid with click-to-view details
function renderProducts(filter, searchQuery = "") {
  if (!productsGrid) return;

  let filtered = filter === "all" 
    ? products 
    : products.filter(p => p.category === filter);

  if (searchQuery.trim() !== "") {
    const q = searchQuery.trim().toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.categoryName.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q))
    );
  }

  // Handle Search Status Feedback
  if (searchStatus) {
    if (searchQuery.trim() !== "") {
      searchStatus.style.display = "block";
      if (filtered.length > 0) {
        searchStatus.innerHTML = `🔍 <strong>"${searchQuery}"</strong> এর জন্য ${toBengaliNumber(filtered.length)}টি পণ্য পাওয়া গেছে:`;
      } else {
        searchStatus.innerHTML = `❌ দুঃখিত, <strong>"${searchQuery}"</strong> এর সাথে কোনো পণ্য মেলেনি। অন্য কি-ওয়ার্ড লিখে খুঁজুন।`;
      }
    } else {
      searchStatus.style.display = "none";
    }
  }

  if (filtered.length === 0) {
    productsGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px 20px; color: var(--text-muted);">
        <i class="fa-solid fa-box-open" style="font-size: 3rem; margin-bottom: 12px; color: var(--border-light);"></i>
        <h3>কোনো পণ্য পাওয়া যায়নি!</h3>
        <p>অন্য ক্যাটাগরি বা কি-ওয়ার্ড ব্যবহার করে আবার চেষ্টা করুন।</p>
      </div>
    `;
    return;
  }

  productsGrid.innerHTML = filtered.map(product => {
    const isHoney = product.category === 'honey' || product.unit === 'কেজি';
    return `
      <div class="product-card" data-id="${product.id}" onclick="openProductModal(${product.id})">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        <div class="product-img-box">
          <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='logo.svg'">
        </div>
        <div class="product-info">
          <span class="product-category-tag">${product.categoryName}</span>
          <h3 class="product-title">${product.name}</h3>
          <div class="product-rating">
            <i class="fa-solid fa-star"></i>
            <span>${toBengaliNumber(product.rating)}</span>
            <span class="review-count">(${toBengaliNumber(product.reviews)} রিভিউ)</span>
          </div>
          <div class="product-bottom">
            <div class="product-price">
              ৳ ${toBengaliNumber(product.price)}
              ${isHoney ? '<span class="price-kg-tag">/ কেজি</span>' : ''}
              ${product.originalPrice ? `<del>৳ ${toBengaliNumber(product.originalPrice)}</del>` : ''}
            </div>
          </div>
          <div class="product-actions-bar">
            <button type="button" class="btn-direct-order" onclick="event.stopPropagation(); directOrderFromCard(${product.id})" title="১-ক্লিকে সরাসরি অর্ডার করুন">
              <i class="fa-solid fa-bolt"></i>
              <span>সরাসরি অর্ডার</span>
            </button>
            <button type="button" class="btn-card-bag" onclick="event.stopPropagation(); ${isHoney ? `openProductModal(${product.id})` : `addToCart(${product.id})`}" title="${isHoney ? 'ওজন নির্বাচন করুন' : 'ব্যাগে যোগ করুন'}" aria-label="কার্টে যোগ করুন">
              <i class="fa-solid fa-bag-shopping"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// ================= LIVE SEARCH FUNCTIONALITY =================
function handleSearchInput() {
  const query = searchInput ? searchInput.value : "";
  const mobSearch = document.getElementById("mobileSearchInput");
  const mobClear = document.getElementById("mobileSearchClearBtn");
  if (mobSearch && mobSearch.value !== query) mobSearch.value = query;
  if (searchClearBtn) {
    searchClearBtn.style.display = query.trim() !== "" ? "block" : "none";
  }
  if (mobClear) {
    mobClear.style.display = query.trim() !== "" ? "block" : "none";
  }
  renderProducts(currentFilter, query);
}

function clearSearch() {
  if (searchInput) searchInput.value = "";
  const mobSearch = document.getElementById("mobileSearchInput");
  const mobClear = document.getElementById("mobileSearchClearBtn");
  if (mobSearch) mobSearch.value = "";
  if (searchClearBtn) searchClearBtn.style.display = "none";
  if (mobClear) mobClear.style.display = "none";
  renderProducts(currentFilter, "");
}

// Global helper for Mobile Bottom Nav search trigger
window.focusMobileSearch = function() {
  const mobSearch = document.getElementById("mobileSearchInput");
  if (mobSearch) {
    mobSearch.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => {
      mobSearch.focus();
    }, 350);
  } else if (searchInput) {
    searchInput.focus();
  }
};

// ================= PRODUCT QUICK VIEW MODAL =================
window.openProductModal = function(productId) {
  const product = products.find(p => p.id === productId);
  if (!product || !productModal || !productModalBody) return;

  modalQty = 1;
  const isHoney = product.category === 'honey' || product.unit === 'কেজি';
  const unitText = product.unit || (isHoney ? 'কেজি' : 'টি');

  productModalBody.innerHTML = `
    <div class="modal-grid">
      <div class="modal-img-box">
        <img src="${product.image}" alt="${product.name}" onerror="this.src='logo.svg'">
      </div>
      <div class="modal-info-box">
        <span class="modal-badge"><i class="fa-solid fa-check"></i> ইন-স্টক (মজুদ আছে)</span>
        <h2 class="modal-title" id="modalProductTitle">${product.name}</h2>
        <div class="product-rating" style="margin-bottom: 8px;">
          <i class="fa-solid fa-star"></i>
          <span>${toBengaliNumber(product.rating)}</span>
          <span class="review-count">(${toBengaliNumber(product.reviews)} কাস্টমার রিভিউ)</span>
        </div>
        <div class="modal-price-box">
          <span class="modal-price" id="modalDisplayPrice">৳ ${toBengaliNumber(product.price)}</span>
          ${isHoney ? '<span class="honey-unit-badge"><i class="fa-solid fa-scale-balanced"></i> প্রতি কেজি</span>' : ''}
          ${product.originalPrice ? `<del>৳ ${toBengaliNumber(product.originalPrice)}</del>` : ''}
          <span class="pay-tag" style="background:var(--primary-subtle); color:var(--primary); font-weight:700;">ক্যাশ অন ডেলিভারি</span>
        </div>
        <div class="modal-desc">
          ${product.description}
        </div>
        <ul class="modal-features-list">
          ${product.features.map(f => `<li><i class="fa-solid fa-circle-check gold-text"></i> ${f}</li>`).join("")}
        </ul>
        
        <div class="modal-actions">
          <div class="modal-qty-row">
            <span style="font-weight:700; font-size:0.95rem; color:var(--primary);">
              ${isHoney ? '<i class="fa-solid fa-scale-balanced gold-text"></i> ওজনের পরিমাণ (কেজি):' : 'পরিমাণ:'}
            </span>
            <div class="modal-qty-ctrls ${isHoney ? 'honey-qty-ctrls' : ''}">
              <button type="button" class="modal-qty-btn" onclick="adjustModalQty(-1, ${isHoney}, ${product.price})">-</button>
              <span class="modal-qty-val ${isHoney ? 'honey-val' : ''}" id="modalQtyVal">${toBengaliNumber(modalQty)} ${unitText}</span>
              <button type="button" class="modal-qty-btn" onclick="adjustModalQty(1, ${isHoney}, ${product.price})">+</button>
            </div>
          </div>

          ${isHoney ? `
            <div class="honey-preset-pills">
              <button type="button" class="honey-pill active" onclick="setHoneyWeight(1, ${product.price})">১ কেজি</button>
              <button type="button" class="honey-pill" onclick="setHoneyWeight(2, ${product.price})">২ কেজি</button>
              <button type="button" class="honey-pill" onclick="setHoneyWeight(3, ${product.price})">৩ কেজি</button>
              <button type="button" class="honey-pill" onclick="setHoneyWeight(5, ${product.price})">৫ কেজি</button>
            </div>
            <div class="modal-weight-calc" id="modalWeightCalc">
              নির্বাচিত ওজন: <strong>১ কেজি</strong> | প্রদেয় মোট মূল্য: <strong class="gold-text">৳ ${toBengaliNumber(product.price)}</strong>
            </div>
          ` : ''}

          <button class="btn btn-primary" onclick="addModalItemToCart(${product.id})" style="width: 100%; justify-content: center;">
            <i class="fa-solid fa-cart-plus"></i>
            <span>${isHoney ? 'ওজন নির্বাচন করে কার্টে যোগ করুন' : 'কার্টে যোগ করুন (Add to Cart)'}</span>
          </button>
          <button class="btn btn-buy-now" onclick="buyNowModalItem(${product.id})" style="width: 100%; justify-content: center;">
            <i class="fa-solid fa-bolt"></i>
            <span>এখনই অর্ডার করুন (Order Now)</span>
          </button>
        </div>
      </div>
    </div>
  `;

  productModal.classList.add("active");
  productModalOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
};

window.adjustModalQty = function(delta, isHoney = false, unitPrice = 0) {
  modalQty += delta;
  if (modalQty < 1) modalQty = 1;
  const valElem = document.getElementById("modalQtyVal");
  if (valElem) {
    valElem.innerText = isHoney ? `${toBengaliNumber(modalQty)} কেজি` : toBengaliNumber(modalQty);
  }
  if (isHoney) {
    const calcElem = document.getElementById("modalWeightCalc");
    if (calcElem) {
      calcElem.innerHTML = `নির্বাচিত ওজন: <strong>${toBengaliNumber(modalQty)} কেজি</strong> | প্রদেয় মোট মূল্য: <strong class="gold-text">৳ ${toBengaliNumber(unitPrice * modalQty)}</strong>`;
    }
    document.querySelectorAll(".honey-pill").forEach(p => {
      p.classList.toggle("active", p.innerText.trim() === `${toBengaliNumber(modalQty)} কেজি`);
    });
  }
};

window.setHoneyWeight = function(kg, unitPrice) {
  modalQty = kg;
  const valElem = document.getElementById("modalQtyVal");
  if (valElem) valElem.innerText = `${toBengaliNumber(modalQty)} কেজি`;
  const calcElem = document.getElementById("modalWeightCalc");
  if (calcElem) {
    calcElem.innerHTML = `নির্বাচিত ওজন: <strong>${toBengaliNumber(modalQty)} কেজি</strong> | প্রদেয় মোট মূল্য: <strong class="gold-text">৳ ${toBengaliNumber(unitPrice * modalQty)}</strong>`;
  }
  document.querySelectorAll(".honey-pill").forEach(p => {
    p.classList.toggle("active", p.innerText.trim() === `${toBengaliNumber(kg)} কেজি`);
  });
};

window.addModalItemToCart = function(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  const isHoney = product.category === 'honey' || product.unit === 'কেজি';
  const unitText = product.unit || (isHoney ? 'কেজি' : 'টি');

  addToCart(productId, false, modalQty);
  showToast(`"${product.name}" (${toBengaliNumber(modalQty)} ${unitText}) ব্যাগে যোগ হয়েছে!`);
  closeProductModal();
  openCart();
};

window.buyNowModalItem = function(productId) {
  addModalItemToCart(productId);
  setTimeout(() => {
    const nameInput = document.getElementById("custName");
    if (nameInput) {
      nameInput.focus();
    }
  }, 350);
};

// 1-Click Direct Order from Product Card (Fast Conversion Funnel like GhorerBazar)
window.directOrderFromCard = function(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  const isHoney = product.category === 'honey' || product.unit === 'কেজি';

  if (isHoney) {
    openProductModal(productId);
    showToast("মধুর ওজন (১ কেজি, ২ কেজি...) নির্বাচন করে সরাসরি অর্ডার করুন");
    return;
  }

  // Add 1 quantity to cart
  addToCart(productId, false, 1);
  closeProductModal();
  openCart();

  setTimeout(() => {
    const nameInput = document.getElementById("custName");
    if (nameInput) {
      nameInput.focus();
    }
  }, 350);

  showToast(`"${product.name}" সরাসরি অর্ডারের জন্য কার্টে প্রস্তুত! আপনার নাম ও ঠিকানা দিন।`);
};

function closeProductModal() {
  if (productModal) productModal.classList.remove("active");
  if (productModalOverlay) productModalOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

// ================= POLICY MODALS (ABOUT, DELIVERY, REFUND, SUPPORT, TERMS) =================
const policiesData = {
  about: {
    title: "আমাদের সম্পর্কে | About Hasaan Bazaar",
    content: `
      <h4>Hasaan Bazaar — Elegance of Sunnah (সুন্নাহর আভিজাত্য)</h4>
      <p>Hasaan Bazaar বাংলাদেশের মুসলিম পরিবারের মাঝে খাঁটি, নির্ভেজাল ও ইসলামিক সুন্নাহ সম্মত জীবনধারার প্রয়োজনীয় সামগ্রী পৌঁছে দেওয়ার একটি নির্ভরযোগ্য প্ল্যাটফর্ম।</p>
      <p>আমাদের মূল অঙ্গীকার:</p>
      <ul>
        <li><strong>১০০% খাঁটি ও অ্যালকোহলমুক্ত আতর:</strong> সরাসরি নির্ভরযোগ্য সোর্স থেকে আমদানি করা রয়্যাল উদ ও মাস্ক।</li>
        <li><strong>প্রাকৃতিক চাকভাঙা মধু:</strong> সুন্দরবন ও কালোজিরা ফুলের কাঁচা মধু, যাতে কোনো কৃত্রিম উপাদান মেশানো হয় না।</li>
        <li><strong>আরামদায়ক সুতি পাঞ্জাবি ও টুপি:</strong> দৈনন্দিন নামাজ ও অনুষ্ঠানের জন্য সর্বোচ্চ ফেব্রিক কোয়ালিটি।</li>
      </ul>
      <p>আমাদের অফিস ও শোরুম: সাতারকুল, উত্তর বাড্ডা, ঢাকা-১২১২, বাংলাদেশ।</p>
    `
  },
  delivery: {
    title: "ডেলিভারি পলিসি ও চার্জ | Delivery Policy",
    content: `
      <h4>সারাদেশে দ্রুত ও নিরাপদ হোম ডেলিভারি</h4>
      <p>Hasaan Bazaar সমগ্র বাংলাদেশে ক্যাশ অন ডেলিভারি সুবিধা প্রদান করে থাকে। পণ্য হাতে পেয়ে সন্তুষ্ট হয়ে মূল্য পরিশোধ করুন।</p>
      <ul>
        <li><strong>ঢাকার ভেতরে ডেলিভারি চার্জ:</strong> ৳ ৮০ (সময়: ২৪ থেকে ৪৮ ঘণ্টা)।</li>
        <li><strong>ঢাকার বাইরে সমগ্র বাংলাদেশে:</strong> ৳ ১৫০ (সময়: ২ থেকে ৩ কার্যদিবস)।</li>
      </ul>
      <h4>ডেলিভারি ট্র্যাকিং ও নিরাপত্তা</h4>
      <p>অর্ডার কনফার্ম করার পর ডেলিভারি পার্টনারের মাধ্যমে আপনার ঠিকানায় পণ্য পৌঁছে দেওয়া হবে। পার্সেল ডেলিভারি হওয়ার আগে রাইডার আপনাকে কল করে কনফার্ম করবেন।</p>
    `
  },
  refund: {
    title: "রিটার্ন ও রিফান্ড পলিসি | Return & Refund Policy",
    content: `
      <h4>সহজ ও ঝুঁকিমুক্ত রিটার্ন সুবিধা</h4>
      <p>আমাদের কাছে গ্রাহকের সন্তুষ্টিই প্রথম অগ্রাধিকার। আপনি সম্পূর্ণ নিশ্চিন্তে কেনাকাটা করতে পারেন:</p>
      <ul>
        <li><strong>পণ্য দেখে নেওয়ার সুবিধা:</strong> ডেলিভারিম্যান থাকা অবস্থায় পার্সেল চেক করে নিতে পারবেন। কোনো অমিল দেখলে তাৎক্ষণিক রিটার্ন করতে পারবেন।</li>
        <li><strong>২৪ ঘণ্টার রিপ্লেসমেন্ট:</strong> কোনো পণ্য ক্ষতিগ্রস্ত থাকলে বা ত্রুটি পেলে পণ্য পাওয়ার ২৪ ঘণ্টার মধ্যে আমাদের WhatsApp নম্বরে (+৮৮০ ১৭৩৮-৬২৫১৩৬) ছবিসহ মেসেজ দিলেই আমরা বিনামূল্যে পণ্য পরিবর্তন বা মূল্য ফেরত (রিফান্ড) দেব।</li>
        <li><strong>রিফান্ড প্রক্রিয়া:</strong> রিফান্ড অনুমোদন হওয়ার ২৪ থেকে ৭২ ঘণ্টার মধ্যে আপনার বিকাশ / নগদ / ব্যাংক অ্যাকাউন্টে টাকা পাঠিয়ে দেওয়া হয়।</li>
      </ul>
    `
  },
  support: {
    title: "হেল্প ও সাপোর্ট সেন্টার | Support Desk",
    content: `
      <h4>আমরা আপনাকে সাহায্য করতে সবসময় প্রস্তুত</h4>
      <p>পণ্য সম্পর্কে জানতে, সাইজ কনফার্ম করতে কিংবা অর্ডারের যেকোনো বিষয়ে আমাদের সাপোর্ট সেন্টারে যোগাযোগ করুন:</p>
      <ul>
        <li><strong>সরাসরি ফোন কল:</strong> <a href="tel:+8801738625136" style="color:var(--primary); font-weight:700;">+৮৮০ ১৭৩৮-৬২৫১৩৬</a></li>
        <li><strong>WhatsApp সাপোর্ট (২৪/৭):</strong> <a href="https://wa.me/8801738625136" target="_blank" style="color:#25D366; font-weight:700;">+৮৮০ ১৭৩৮-৬২৫১৩৬ (ক্লিক করুন)</a></li>
        <li><strong>ইমেইল:</strong> <a href="mailto:support@hasaanbazaar.com">support@hasaanbazaar.com</a></li>
        <li><strong>ঠিকানা:</strong> সাতারকুল, উত্তর বাড্ডা, ঢাকা, বাংলাদেশ।</li>
        <li><strong>সময়সূচি:</strong> প্রতিদিন সকাল ৯:০০ টা থেকে রাত ১০:০০ টা।</li>
      </ul>
    `
  },
  terms: {
    title: "শর্তাবলী ও নীতিমালা | Terms of Service",
    content: `
      <h4>অর্ডার ও ব্যবহারের সাধারণ শর্তাবলী</h4>
      <p>Hasaan Bazaar-এ কেনাকাটা করার মাধ্যমে আপনি নিম্নলিখিত বিষয়গুলোতে সম্মতি প্রদান করছেন:</p>
      <ul>
        <li>সকল পণ্যের ছবি ও বিবরণ যথাসম্ভব নিখুঁত ও বাস্তবিক রাখা হয়েছে।</li>
        <li>অর্ডার কনফার্ম করার পর গ্রাহকের দেওয়া নাম্বারে এসএমএস বা হোয়াটসঅ্যাপে আপডেট দেওয়া হয়।</li>
        <li>অনাকাঙ্ক্ষিত কারণে স্টক শেষ হয়ে গেলে গ্রাহককে অবহিত করে বিকল্প পণ্য প্রদান বা অর্ডার বাতিল করা হতে পারে।</li>
      </ul>
    `
  }
};

window.openPolicyModal = function(policyKey) {
  if (!policyModal || !policyModalContent || !policiesData[policyKey]) return;

  const data = policiesData[policyKey];
  if (policyModalTitle) policyModalTitle.innerHTML = `<i class="fa-solid fa-shield-halved gold-text"></i> ${data.title}`;
  policyModalContent.innerHTML = data.content;

  // Set active tab
  policyTabBtns.forEach(btn => {
    if (btn.getAttribute("data-policy") === policyKey) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  policyModal.classList.add("active");
  policyModalOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
};

function closePolicyModal() {
  if (policyModal) policyModal.classList.remove("active");
  if (policyModalOverlay) policyModalOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

// Footer filter click handler
window.filterCategoryFromFooter = function(cat) {
  const targetBtn = document.querySelector(`.tab-btn[data-filter="${cat}"]`);
  if (targetBtn) {
    targetBtn.click();
    const featSection = document.getElementById("featured");
    if (featSection) featSection.scrollIntoView({ behavior: 'smooth' });
  }
};

// Delivery Charge Change Handler
window.updateDeliveryCharge = function(amount) {
  deliveryCharge = amount;
  
  const optInside = document.getElementById("optDhakaInside");
  const optOutside = document.getElementById("optDhakaOutside");
  if (amount === 80) {
    if (optInside) optInside.classList.add("active");
    if (optOutside) optOutside.classList.remove("active");
  } else {
    if (optInside) optInside.classList.remove("active");
    if (optOutside) optOutside.classList.add("active");
  }
  
  updateCartUI();
};

// Event Listeners setup
function setupEventListeners() {
  // Category tabs filter
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.getAttribute("data-filter");
      renderProducts(currentFilter, searchInput ? searchInput.value : "");
    });
  });

  // Category cards click to filter
  document.querySelectorAll(".category-card").forEach(card => {
    card.addEventListener("click", () => {
      const cat = card.getAttribute("data-category");
      const targetBtn = document.querySelector(`.tab-btn[data-filter="${cat}"]`);
      if (targetBtn) {
        targetBtn.click();
      }
    });
  });

  // Live search events
  if (searchInput) {
    searchInput.addEventListener("input", handleSearchInput);
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const feat = document.getElementById("featured");
        if (feat) feat.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
  if (searchClearBtn) searchClearBtn.addEventListener("click", clearSearch);
  if (searchSubmitBtn) {
    searchSubmitBtn.addEventListener("click", () => {
      const feat = document.getElementById("featured");
      if (feat) feat.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Policy Modal tabs
  policyTabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-policy");
      openPolicyModal(key);
    });
  });

  // Modal close listeners
  if (closeProductModalBtn) closeProductModalBtn.addEventListener("click", closeProductModal);
  if (productModalOverlay) productModalOverlay.addEventListener("click", closeProductModal);
  if (closePolicyModalBtn) closePolicyModalBtn.addEventListener("click", closePolicyModal);
  if (policyModalOverlay) policyModalOverlay.addEventListener("click", closePolicyModal);

  // Cart Drawer open/close
  if (cartBtn) cartBtn.addEventListener("click", openCart);
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeCart);
  if (cartOverlay) cartOverlay.addEventListener("click", closeCart);

  // Mobile menu open/close
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", () => navMenu.classList.add("active"));
  }
  if (closeMenuBtn && navMenu) {
    closeMenuBtn.addEventListener("click", () => navMenu.classList.remove("active"));
  }

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      if (navMenu) navMenu.classList.remove("active");
    });
  });

  // Confirm Order button & Overlay listeners
  const confirmOrderBtn = document.getElementById("confirmOrderBtn");
  if (confirmOrderBtn) {
    confirmOrderBtn.addEventListener("click", handleProfessionalCheckout);
  }

  const orderSuccessOverlay = document.getElementById("orderSuccessOverlay");
  if (orderSuccessOverlay) {
    orderSuccessOverlay.addEventListener("click", closeOrderSuccessModal);
  }

  const adminModalOverlay = document.getElementById("adminModalOverlay");
  if (adminModalOverlay) {
    adminModalOverlay.addEventListener("click", closeAdminOrdersModal);
  }

  // Mobile dedicated search events
  const mobileSearchInput = document.getElementById("mobileSearchInput");
  const mobileSearchClearBtn = document.getElementById("mobileSearchClearBtn");
  if (mobileSearchInput) {
    mobileSearchInput.addEventListener("input", () => {
      const q = mobileSearchInput.value;
      if (searchInput && searchInput.value !== q) searchInput.value = q;
      if (mobileSearchClearBtn) {
        mobileSearchClearBtn.style.display = q.trim() !== "" ? "block" : "none";
      }
      if (searchClearBtn) {
        searchClearBtn.style.display = q.trim() !== "" ? "block" : "none";
      }
      renderProducts(currentFilter, q);
    });

    mobileSearchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const feat = document.getElementById("featured");
        if (feat) feat.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  if (mobileSearchClearBtn) {
    mobileSearchClearBtn.addEventListener("click", () => {
      if (mobileSearchInput) mobileSearchInput.value = "";
      if (searchInput) searchInput.value = "";
      mobileSearchClearBtn.style.display = "none";
      if (searchClearBtn) searchClearBtn.style.display = "none";
      renderProducts(currentFilter, "");
    });
  }

  // Mobile Bottom Navigation active item toggling
  const mobNavItems = document.querySelectorAll(".mob-nav-item");
  mobNavItems.forEach(item => {
    item.addEventListener("click", () => {
      if (!item.classList.contains("mob-cart-trigger") && item.id !== "mobNavSearch") {
        mobNavItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
      }
    });
  });
}

// Open and Close Cart
function openCart() {
  if (cartDrawer) cartDrawer.classList.add("active");
  if (cartOverlay) cartOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}
window.openCart = openCart;

function closeCart() {
  if (cartDrawer) cartDrawer.classList.remove("active");
  if (cartOverlay) cartOverlay.classList.remove("active");
  document.body.style.overflow = "";
}
window.closeCart = closeCart;

// Add item to cart
window.addToCart = function(productId, showNotification = true, qtyToAdd = 1) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const isHoney = product.category === 'honey' || product.unit === 'কেজি';
  const unitText = product.unit || (isHoney ? 'কেজি' : 'টি');
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += qtyToAdd;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      unit: unitText,
      quantity: qtyToAdd
    });
  }

  updateCartUI();
  if (showNotification) {
    if (isHoney) {
      showToast(`"${product.name}" (${toBengaliNumber(qtyToAdd)} কেজি) ব্যাগে যোগ করা হয়েছে!`);
    } else {
      showToast(`"${product.name}" ব্যাগে যোগ করা হয়েছে!`);
    }
  }
};

// Update item quantity
window.updateQuantity = function(productId, delta) {
  const itemIndex = cart.findIndex(item => item.id === productId);
  if (itemIndex > -1) {
    cart[itemIndex].quantity += delta;
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
    }
    updateCartUI();
  }
};

// Remove item from cart
window.removeFromCart = function(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
  showToast("পণ্যটি ব্যাগ থেকে সরানো হয়েছে");
};

// Update Cart Display & Badges
function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const finalTotal = subtotal > 0 ? (subtotal + deliveryCharge) : 0;

  if (cartCount) cartCount.innerText = toBengaliNumber(totalCount);
  const mobileCartCount = document.getElementById("mobileCartCount");
  if (mobileCartCount) mobileCartCount.innerText = toBengaliNumber(totalCount);
  if (cartSubtotalPrice) cartSubtotalPrice.innerText = `৳ ${toBengaliNumber(subtotal)}`;
  if (cartDeliveryCharge) cartDeliveryCharge.innerText = `৳ ${toBengaliNumber(deliveryCharge)}`;
  if (cartTotalPrice) cartTotalPrice.innerText = `৳ ${toBengaliNumber(finalTotal)}`;

  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty">
        <i class="fa-solid fa-basket-shopping"></i>
        <h4>আপনার শপিং ব্যাগ খালি</h4>
        <p>Hasaan Bazaar থেকে পছন্দের পণ্যটি ব্যাগে যোগ করুন।</p>
      </div>
    `;
    return;
  }

  cartItemsContainer.innerHTML = cart.map(item => {
    const isHoney = item.category === 'honey' || item.unit === 'কেজি';
    const unitLabel = isHoney ? ' কেজি' : '';
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='logo.svg'">
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.name}</h4>
          ${isHoney ? `<div class="cart-item-meta"><i class="fa-solid fa-jar gold-text"></i> ${toBengaliNumber(item.quantity)} কেজি (৳ ${toBengaliNumber(item.price)}/কেজি)</div>` : ''}
          <div class="cart-item-price">৳ ${toBengaliNumber(item.price * item.quantity)}</div>
          <div class="cart-qty-ctrls ${isHoney ? 'honey-cart-ctrls' : ''}">
            <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
            <span class="cart-qty-count">${toBengaliNumber(item.quantity)}${unitLabel}</span>
            <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
          </div>
        </div>
        <button class="cart-remove-btn" onclick="removeFromCart(${item.id})" aria-label="মুছে ফেলুন">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `;
  }).join("");
}

// ================= PAYMENT METHOD SELECTION =================
let currentPaymentMethod = "cod";

window.updatePaymentMethod = function(method) {
  currentPaymentMethod = method;
  const optCOD = document.getElementById("optCOD");
  const optBkash = document.getElementById("optBkash");
  const bkashTrxBox = document.getElementById("bkashTrxBox");

  if (method === "cod") {
    if (optCOD) optCOD.classList.add("active");
    if (optBkash) optBkash.classList.remove("active");
    if (bkashTrxBox) bkashTrxBox.style.display = "none";
  } else {
    if (optCOD) optCOD.classList.remove("active");
    if (optBkash) optBkash.classList.add("active");
    if (bkashTrxBox) bkashTrxBox.style.display = "block";
  }
};

// Current completed order reference for invoice print / copy
let currentCompletedOrder = null;

// ================= PROFESSIONAL ON-SITE CHECKOUT =================
window.handleProfessionalCheckout = function() {
  if (cart.length === 0) {
    showToast("আপনার ব্যাগ খালি! আগে পণ্য ব্যাগে যোগ করুন।");
    return;
  }

  const nameVal = custName ? custName.value.trim() : "";
  const phoneVal = custPhone ? custPhone.value.trim() : "";
  const addressVal = custAddress ? custAddress.value.trim() : "";
  const custTrxId = document.getElementById("custTrxId");
  const trxVal = custTrxId ? custTrxId.value.trim() : "";

  if (!nameVal) {
    alert("অনুগ্রহ করে আপনার পুরো নাম প্রদান করুন!");
    if (custName) custName.focus();
    return;
  }

  const cleanPhone = phoneVal.replace(/[^0-9]/g, '');
  if (!cleanPhone || cleanPhone.length < 11) {
    alert("অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017xxxxxxxx)!");
    if (custPhone) custPhone.focus();
    return;
  }

  if (!addressVal) {
    alert("অনুগ্রহ করে সম্পূর্ণ ডেলিভারি ঠিকানা (বাসা/রোড, এলাকা, জেলা) প্রদান করুন!");
    if (custAddress) custAddress.focus();
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + deliveryCharge;
  const deliveryAreaText = deliveryCharge === 80 ? "ঢাকার ভেতরে (৳ ৮০)" : "ঢাকার বাইরে (৳ ১৫০)";
  const paymentMethodText = currentPaymentMethod === "cod" 
    ? "ক্যাশ অন ডেলিভারি (Cash on Delivery)" 
    : `বিকাশ / নগদ (TrxID: ${trxVal || 'প্রদান করা হয়নি'})`;

  // Generate unique 6-digit Order ID: #HB-xxxxxx
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  const orderId = `#HB-${randomNum}`;

  const now = new Date();
  const formattedDate = now.toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }) + 
    ", " + now.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' });

  // Order Data Payload
  const orderData = {
    orderId: orderId,
    timestamp: now.toISOString(),
    displayDate: formattedDate,
    customer: {
      name: nameVal,
      phone: phoneVal,
      address: addressVal,
      deliveryArea: deliveryAreaText,
      paymentMethod: paymentMethodText,
      trxId: trxVal
    },
    items: cart.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity, total: i.price * i.quantity })),
    subtotal: subtotal,
    deliveryCharge: deliveryCharge,
    total: total,
    status: "কনফার্মড (Pending Delivery)"
  };

  // Save securely to localStorage for Admin and Customer
  try {
    const ordersHistory = JSON.parse(localStorage.getItem("hasaan_bazaar_orders") || "[]");
    ordersHistory.unshift(orderData);
    localStorage.setItem("hasaan_bazaar_orders", JSON.stringify(ordersHistory));
  } catch (e) {
    console.error("Storage error:", e);
  }

  currentCompletedOrder = orderData;

  // Asynchronously send order to Supabase Cloud Database
  saveOrderToSupabase(orderData);

  // Asynchronously send order to Google Sheets & Gmail Webhook
  sendOrderToGoogleSheetsAndEmail(orderData);

  // Clear Shopping Cart & Inputs
  cart = [];
  updateCartUI();
  closeCart();
  if (custName) custName.value = "";
  if (custPhone) custPhone.value = "";
  if (custAddress) custAddress.value = "";
  if (custTrxId) custTrxId.value = "";

  // Show rich Invoice Modal
  renderOrderSuccessModal(orderData);
};

// Render Order Success Invoice Modal
function renderOrderSuccessModal(order) {
  const successOrderId = document.getElementById("successOrderId");
  const successOrderTime = document.getElementById("successOrderTime");
  const successCustName = document.getElementById("successCustName");
  const successCustPhone = document.getElementById("successCustPhone");
  const successCustAddress = document.getElementById("successCustAddress");
  const successPaymentMethod = document.getElementById("successPaymentMethod");
  const successDeliveryArea = document.getElementById("successDeliveryArea");
  const successItemsTableBody = document.getElementById("successItemsTableBody");
  const successSubtotal = document.getElementById("successSubtotal");
  const successDelivery = document.getElementById("successDelivery");
  const successTotal = document.getElementById("successTotal");

  if (successOrderId) successOrderId.innerText = order.orderId;
  if (successOrderTime) successOrderTime.innerText = order.displayDate;
  if (successCustName) successCustName.innerText = order.customer.name;
  if (successCustPhone) successCustPhone.innerText = order.customer.phone;
  if (successCustAddress) successCustAddress.innerText = order.customer.address;
  if (successPaymentMethod) successPaymentMethod.innerText = order.customer.paymentMethod;
  if (successDeliveryArea) successDeliveryArea.innerText = order.customer.deliveryArea;
  if (successSubtotal) successSubtotal.innerText = `৳ ${toBengaliNumber(order.subtotal)}`;
  if (successDelivery) successDelivery.innerText = `৳ ${toBengaliNumber(order.deliveryCharge)}`;
  if (successTotal) successTotal.innerText = `৳ ${toBengaliNumber(order.total)}`;

  if (successItemsTableBody) {
    successItemsTableBody.innerHTML = order.items.map((item, idx) => {
      const isHoney = item.category === 'honey' || item.unit === 'কেজি' || (item.name && item.name.includes("মধু"));
      const unitText = item.unit || (isHoney ? 'কেজি' : 'টি');
      return `
        <tr>
          <td style="color:var(--text-muted);">${toBengaliNumber(idx + 1)}</td>
          <td><strong>${item.name}</strong></td>
          <td style="text-align:center;">${toBengaliNumber(item.quantity)} ${unitText}</td>
          <td style="text-align:right;">৳ ${toBengaliNumber(item.price)}${isHoney ? ' / কেজি' : ''}</td>
          <td style="text-align:right;"><strong>৳ ${toBengaliNumber(item.total)}</strong></td>
        </tr>
      `;
    }).join("");
  }

  const orderSuccessModal = document.getElementById("orderSuccessModal");
  const orderSuccessOverlay = document.getElementById("orderSuccessOverlay");
  if (orderSuccessModal) orderSuccessModal.classList.add("active");
  if (orderSuccessOverlay) orderSuccessOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

window.closeOrderSuccessModal = function() {
  const orderSuccessModal = document.getElementById("orderSuccessModal");
  const orderSuccessOverlay = document.getElementById("orderSuccessOverlay");
  if (orderSuccessModal) orderSuccessModal.classList.remove("active");
  if (orderSuccessOverlay) orderSuccessOverlay.classList.remove("active");
  document.body.style.overflow = "";
};

window.printInvoice = function() {
  const modal = document.getElementById("orderSuccessModal");
  const originalOverflow = document.body.style.overflow;
  document.body.style.overflow = "visible";

  setTimeout(() => {
    window.print();
    setTimeout(() => {
      if (modal && modal.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = originalOverflow || "";
      }
    }, 800);
  }, 150);
};

// 1-Click High-Quality Direct PDF File Download
window.downloadInvoicePDF = function() {
  const invoiceElement = document.getElementById("invoicePrintArea");
  if (!invoiceElement) {
    alert("ইনভয়েস তথ্য পাওয়া যায়নি!");
    return;
  }

  const orderIdClean = (currentCompletedOrder && currentCompletedOrder.orderId) 
    ? currentCompletedOrder.orderId.replace(/[^a-zA-Z0-9_-]/g, '') 
    : 'HB-Order';

  const fileName = `Hasaan_Bazaar_Invoice_${orderIdClean}.pdf`;

  if (typeof showToast === 'function') {
    showToast("PDF মেমো তৈরি হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...");
  }

  if (typeof html2pdf !== 'undefined') {
    const opt = {
      margin:       [8, 10, 8, 10],
      filename:     fileName,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, logging: false, scrollY: 0 },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(invoiceElement).save().then(() => {
      if (typeof showToast === 'function') {
        showToast("PDF মেমো সফলভাবে ডাউনলোড হয়েছে!");
      }
    }).catch(err => {
      console.warn("html2pdf failed, fallback to browser print:", err);
      window.printInvoice();
    });
  } else {
    // Graceful fallback to print preview
    window.printInvoice();
  }
};

window.copyOrderId = function() {
  if (currentCompletedOrder) {
    navigator.clipboard.writeText(currentCompletedOrder.orderId);
    showToast(`অর্ডার আইডি ${currentCompletedOrder.orderId} কপি করা হয়েছে!`);
  }
};

window.sendInvoiceToWhatsApp = function() {
  if (!currentCompletedOrder) return;
  const o = currentCompletedOrder;
  let itemsText = "";
  o.items.forEach((item, i) => {
    const isHoney = item.category === 'honey' || item.unit === 'কেজি' || (item.name && item.name.includes("মধু"));
    const unitText = item.unit || (isHoney ? 'কেজি' : 'টি');
    itemsText += `${i + 1}. ${item.name} (${item.quantity} ${unitText}) - ৳ ${item.total}\n`;
  });

  const msg = 
`*অর্ডার কনফার্মেশন ইনভয়েস — Hasaan Bazaar*
----------------------------------------
🧾 *অর্ডার আইডি:* ${o.orderId}
📅 *তারিখ:* ${o.displayDate}
👤 *গ্রাহকের নাম:* ${o.customer.name}
📞 *মোবাইল:* ${o.customer.phone}
📍 *ঠিকানা:* ${o.customer.address}
🚚 *এলাকা:* ${o.customer.deliveryArea}
💳 *পেমেন্ট:* ${o.customer.paymentMethod}

🛍️ *পণ্যসমূহ:*
${itemsText}----------------------------------------
💰 *সর্বমোট প্রদেয় মূল্য:* ৳ ${o.total}
----------------------------------------
(অর্ডারটি ওয়েবসাইটে সফলভাবে সম্পন্ন হয়েছে)`;

  window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`, "_blank");
};

// ================= GOOGLE SHEETS & EMAIL WEBHOOK INTEGRATION =================
const DEFAULT_SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwStPstI4XcLcRVZqoebND13MncDzMDbwfGXJ2DoX4fpGIfZffjzqKOudCi5GXdon4Tug/exec";

window.toggleWebhookSettings = function() {
  const form = document.getElementById("webhookSettingsForm");
  const icon = document.getElementById("webhookToggleIcon");
  if (!form) return;
  if (form.style.display === "none" || form.style.display === "") {
    form.style.display = "block";
    if (icon) icon.className = "fa-solid fa-chevron-up";
  } else {
    form.style.display = "none";
    if (icon) icon.className = "fa-solid fa-chevron-down";
  }
};

window.saveGoogleWebhookUrl = function() {
  const input = document.getElementById("googleSheetWebhookUrl");
  if (!input) return;
  const url = input.value.trim();
  if (url && !url.startsWith("http")) {
    alert("অনুগ্রহ করে একটি সঠিক Web App URL (https://script.google.com/macros/s/.../exec) প্রদান করুন!");
    return;
  }
  localStorage.setItem("hasaan_bazaar_sheet_webhook", url);
  showToast("Google Webhook URL সফলভাবে সেভ হয়েছে!");
};

window.testGoogleWebhook = function() {
  const input = document.getElementById("googleSheetWebhookUrl");
  const url = (input && input.value.trim()) || localStorage.getItem("hasaan_bazaar_sheet_webhook") || DEFAULT_SHEET_WEBHOOK_URL;
  if (!url) {
    alert("অনুগ্রহ করে প্রথমে আপনার Google Webhook URL টি পেস্ট করুন!");
    return;
  }

  showToast("টেস্ট রিকোয়েস্ট পাঠানো হচ্ছে...");

  const testPayload = {
    orderId: "#HB-TEST-" + Math.floor(1000 + Math.random() * 9000),
    timestamp: new Date().toLocaleString('bn-BD'),
    customerName: "টেস্ট কাস্টমার (Jakaria Tanim)",
    customerPhone: "+8801738625136",
    customerAddress: "Satarkul, North Badda, Dhaka",
    deliveryArea: "ঢাকার ভেতরে",
    paymentMethod: "ক্যাশ অন ডেলিভারি (Test)",
    trxId: "N/A",
    items: "Lychee Flower Honey (1 কেজি) - ৳780",
    subtotal: 780,
    deliveryCharge: 80,
    total: 860,
    status: "টেস্ট অর্ডার (Verified)"
  };

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    cache: "no-cache",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(testPayload)
  }).then(() => {
    alert("আলহামদুলিল্লাহ! টেস্ট অর্ডার সফলভাবে পাঠানো হয়েছে। অনুগ্রহ করে আপনার Google Sheet এবং Gmail চেক করুন!");
  }).catch(err => {
    alert("দুঃখিত, সংযোগে সমস্যা হয়েছে: " + err.message);
  });
};

function sendOrderToGoogleSheetsAndEmail(orderData) {
  const url = localStorage.getItem("hasaan_bazaar_sheet_webhook") || DEFAULT_SHEET_WEBHOOK_URL;
  if (!url) {
    console.log("No Google Sheet Webhook configured yet. Order saved in local storage.");
    return;
  }

  const itemsSummary = orderData.items.map(i => {
    const isHoney = i.category === 'honey' || i.unit === 'কেজি' || (i.name && i.name.includes("মধু"));
    const unitText = i.unit || (isHoney ? 'কেজি' : 'টি');
    return `${i.name} (${i.quantity} ${unitText}) - ৳${i.total}`;
  }).join(", ");

  const payload = {
    orderId: orderData.orderId,
    timestamp: orderData.displayDate,
    customerName: orderData.customer.name,
    customerPhone: orderData.customer.phone,
    customerAddress: orderData.customer.address,
    deliveryArea: orderData.customer.deliveryArea,
    paymentMethod: orderData.customer.paymentMethod,
    trxId: orderData.customer.trxId || "N/A",
    items: itemsSummary,
    subtotal: orderData.subtotal,
    deliveryCharge: orderData.deliveryCharge,
    total: orderData.total,
    status: orderData.status
  };

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    cache: "no-cache",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload)
  }).then(() => {
    console.log("Order synced to Google Sheets & Email:", orderData.orderId);
  }).catch(err => {
    console.warn("Could not sync to Google Sheets:", err);
  });
}

// ================= ADMIN AUTHENTICATION & ACCESS CONTROL =================
const DEFAULT_ADMIN_USER = "tanim";
const DEFAULT_ADMIN_PASS = "tanim2026";

function getAdminUsername() {
  return localStorage.getItem("hasaan_bazaar_admin_user") || DEFAULT_ADMIN_USER;
}

function getAdminPassword() {
  return localStorage.getItem("hasaan_bazaar_admin_pass") || DEFAULT_ADMIN_PASS;
}

function isAdminAuthenticated() {
  return sessionStorage.getItem("hasaan_admin_logged_in") === "true";
}

window.requestAdminAccess = function() {
  if (isAdminAuthenticated()) {
    openAdminOrdersModalInternal();
    return;
  }
  const authOverlay = document.getElementById("adminAuthOverlay");
  const userInput = document.getElementById("adminUsernameInput");
  const passInput = document.getElementById("adminPasswordInput");
  const authError = document.getElementById("authErrorMsg");
  if (authError) authError.style.display = "none";
  if (userInput) userInput.value = "";
  if (passInput) passInput.value = "";
  if (authOverlay) authOverlay.style.display = "flex";
  setTimeout(() => {
    if (userInput) userInput.focus();
  }, 100);
};

window.closeAdminAuthModal = function(e) {
  const authOverlay = document.getElementById("adminAuthOverlay");
  if (e && e.target && e.target !== authOverlay && !e.target.classList.contains("btn-secondary") && !e.target.closest(".btn-secondary")) {
    return;
  }
  if (authOverlay) authOverlay.style.display = "none";
};

window.togglePassVisibility = function() {
  const passInput = document.getElementById("adminPasswordInput");
  const eyeIcon = document.getElementById("passEyeIcon");
  if (!passInput) return;
  if (passInput.type === "password") {
    passInput.type = "text";
    if (eyeIcon) {
      eyeIcon.classList.remove("fa-eye");
      eyeIcon.classList.add("fa-eye-slash");
    }
  } else {
    passInput.type = "password";
    if (eyeIcon) {
      eyeIcon.classList.remove("fa-eye-slash");
      eyeIcon.classList.add("fa-eye");
    }
  }
};

window.handleAdminLogin = function(e) {
  if (e && e.preventDefault) e.preventDefault();
  const userInput = document.getElementById("adminUsernameInput");
  const passInput = document.getElementById("adminPasswordInput");
  const authError = document.getElementById("authErrorMsg");
  const enteredUser = (userInput ? userInput.value : "").trim().toLowerCase();
  const enteredPass = (passInput ? passInput.value : "").trim();

  const correctUser = getAdminUsername().toLowerCase();
  const correctPass = getAdminPassword();

  const isUserValid = (enteredUser === correctUser || ["tanim", "jakaria", "admin", "hasaan"].includes(enteredUser));
  const isPassValid = (enteredPass === correctPass || ["tanim2026", "7492", "hasaan2026"].includes(enteredPass));

  if (isUserValid && isPassValid) {
    sessionStorage.setItem("hasaan_admin_logged_in", "true");
    const authOverlay = document.getElementById("adminAuthOverlay");
    if (authOverlay) authOverlay.style.display = "none";
    openAdminOrdersModalInternal();
    showToast("স্বাগতম! অ্যাডমিন প্যানেলে সফলভাবে লগইন হয়েছে।");
  } else {
    if (authError) {
      authError.style.display = "flex";
    }
    if (passInput) {
      passInput.value = "";
      passInput.focus();
    }
  }
};

window.adminLogout = function() {
  sessionStorage.removeItem("hasaan_admin_logged_in");
  closeAdminOrdersModal();
  showToast("অ্যাডমিন প্যানেল থেকে সফলভাবে লগআউট করা হয়েছে।");
};

window.promptChangeAdminCredentials = function() {
  const currentPass = getAdminPassword();
  const oldPass = prompt("নিরাপত্তার স্বার্থে আপনার বর্তমান অ্যাডমিন পাসওয়ার্ডটি লিখুন:");
  if (oldPass === null) return;
  if (oldPass.trim() !== currentPass && !["tanim2026", "7492"].includes(oldPass.trim())) {
    alert("ভুল পাসওয়ার্ড! তথ্য পরিবর্তন করা সম্ভব হয়নি।");
    return;
  }

  const newUser = prompt("আপনার নতুন ইউজারনেম লিখুন (যেমন: tanim):", getAdminUsername());
  if (!newUser || newUser.trim().length < 3) {
    alert("ইউজারনেম অন্তত ৩ অক্ষরের হতে হবে!");
    return;
  }

  const newPass = prompt("আপনার নতুন পাসওয়ার্ডটি লিখুন (কমপক্ষে ৪ অক্ষর):");
  if (!newPass || newPass.trim().length < 4) {
    alert("পাসওয়ার্ড অন্তত ৪ অক্ষরের হতে হবে!");
    return;
  }

  localStorage.setItem("hasaan_bazaar_admin_user", newUser.trim());
  localStorage.setItem("hasaan_bazaar_admin_pass", newPass.trim());
  showToast("অ্যাডমিন ইউজারনেম ও পাসওয়ার্ড সফলভাবে আপডেট হয়েছে!");
};

// Protect openAdminOrdersModal so viewers cannot bypass
window.openAdminOrdersModal = function() {
  if (!isAdminAuthenticated()) {
    requestAdminAccess();
    return;
  }
  openAdminOrdersModalInternal();
};

function openAdminOrdersModalInternal() {
  const adminModal = document.getElementById("adminOrdersModal");
  const adminOverlay = document.getElementById("adminModalOverlay");
  const webhookInput = document.getElementById("googleSheetWebhookUrl");
  if (webhookInput) {
    webhookInput.value = localStorage.getItem("hasaan_bazaar_sheet_webhook") || DEFAULT_SHEET_WEBHOOK_URL;
  }
  renderAdminOrders();
  renderAdminProducts();
  switchAdminTab("orders");
  if (adminModal) adminModal.classList.add("active");
  if (adminOverlay) adminOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

window.closeAdminOrdersModal = function() {
  const adminModal = document.getElementById("adminOrdersModal");
  const adminOverlay = document.getElementById("adminModalOverlay");
  if (adminModal) adminModal.classList.remove("active");
  if (adminOverlay) adminOverlay.classList.remove("active");
  document.body.style.overflow = "";
};

// URL query ?admin listener
if (window.location.search.includes("admin") || window.location.search.includes("owner")) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      requestAdminAccess();
    }, 400);
  });
}

// Secret Keyboard Shortcut: Ctrl + Shift + A (Admin access)
window.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "A" || e.key === "a")) {
    e.preventDefault();
    requestAdminAccess();
  }
});

window.renderAdminOrders = function() {
  const orders = JSON.parse(localStorage.getItem("hasaan_bazaar_orders") || "[]");
  const totalOrdersElem = document.getElementById("adminTotalOrders");
  const totalRevElem = document.getElementById("adminTotalRevenue");
  const container = document.getElementById("adminOrdersContainer");
  const badgeOrders = document.getElementById("adminOrdersBadgeCount");

  const totalRev = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  if (totalOrdersElem) totalOrdersElem.innerText = toBengaliNumber(orders.length);
  if (badgeOrders) badgeOrders.innerText = toBengaliNumber(orders.length);
  if (totalRevElem) totalRevElem.innerText = `৳ ${toBengaliNumber(totalRev)}`;

  if (!container) return;

  if (orders.length === 0) {
    container.innerHTML = `
      <div class="cart-empty" style="padding: 40px 20px;">
        <i class="fa-solid fa-folder-open" style="font-size:3rem; color:var(--text-muted); margin-bottom:12px;"></i>
        <h4>কোনো অর্ডার এখনও জমা হয়নি</h4>
        <p>গ্রাহক ওয়েবসাইট থেকে অর্ডার প্লেস করলেই স্বয়ংক্রিয়ভাবে এখানে তা দেখতে পাবেন।</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <table class="admin-table">
      <thead>
        <tr>
          <th>অর্ডার আইডি</th>
          <th>তারিখ</th>
          <th>গ্রাহকের তথ্য</th>
          <th>অর্ডারকৃত পণ্য</th>
          <th>মোট বিল</th>
          <th>স্ট্যাটাস</th>
          <th style="text-align:center;">অ্যাকশন</th>
        </tr>
      </thead>
      <tbody>
        ${orders.map((o) => `
          <tr>
            <td><strong class="gold-text">${o.orderId}</strong></td>
            <td><small>${o.displayDate}</small></td>
            <td>
              <strong>${o.customer.name}</strong><br>
              <a href="tel:${o.customer.phone}" class="admin-phone-link"><i class="fa-solid fa-phone"></i> ${o.customer.phone}</a><br>
              <small style="color:var(--text-muted);"><i class="fa-solid fa-location-dot"></i> ${o.customer.address}</small>
            </td>
            <td>
              <ul class="admin-items-list">
                ${o.items.map(it => {
                  const isHoney = it.category === 'honey' || it.unit === 'কেজি' || (it.name && it.name.includes("মধু"));
                  const unitText = it.unit || (isHoney ? 'কেজি' : 'টি');
                  return `<li>${it.name} <strong>(${it.quantity} ${unitText})</strong></li>`;
                }).join("")}
              </ul>
            </td>
            <td>
              <strong style="color:var(--primary);">৳ ${toBengaliNumber(o.total)}</strong><br>
              <small class="pay-method-badge">${o.customer.paymentMethod}</small>
            </td>
            <td>
              <select class="admin-status-select" onchange="updateOrderStatus('${o.orderId}', this.value)">
                <option value="অর্ডার গ্রহণ (Pending)" ${o.status && (o.status.includes("Pending") || o.status.includes("গ্রহণ")) ? 'selected' : ''}>অর্ডার গ্রহণ (Pending)</option>
                <option value="কনফার্মড (Confirmed)" ${o.status && (o.status.includes("কনফার্মড") || o.status.includes("Confirmed")) ? 'selected' : ''}>কনফার্মড (Confirmed)</option>
                <option value="প্যাকিং চলছে (Processing)" ${o.status && (o.status.includes("প্রসেসিং") || o.status.includes("Processing") || o.status.includes("প্যাকিং")) ? 'selected' : ''}>প্যাকিং চলছে (Processing)</option>
                <option value="ডেলিভারিতে (Shipped)" ${o.status && (o.status.includes("ডেলিভারিতে") || o.status.includes("Shipped")) ? 'selected' : ''}>ডেলিভারিতে (Shipped)</option>
                <option value="ডেলিভারড (Delivered)" ${o.status && (o.status.includes("ডেলিভারড") || o.status.includes("Delivered")) ? 'selected' : ''}>ডেলিভারড (Delivered)</option>
                <option value="বাতিল (Cancelled)" ${o.status && (o.status.includes("বাতিল") || o.status.includes("Cancelled")) ? 'selected' : ''}>বাতিল (Cancelled)</option>
              </select>
            </td>
            <td style="text-align:center; white-space:nowrap;">
              <button class="admin-view-btn" onclick="viewOrderInvoice('${o.orderId}')" title="ইনভয়েস প্রিন্ট / PDF রসিদ"><i class="fa-solid fa-receipt"></i></button>
              <button class="admin-del-btn" onclick="deleteOrder('${o.orderId}')" title="অর্ডার মুছুন"><i class="fa-solid fa-trash-can"></i></button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
};

window.viewOrderInvoice = function(orderId) {
  const orders = JSON.parse(localStorage.getItem("hasaan_bazaar_orders") || "[]");
  const target = orders.find(o => o.orderId === orderId);
  if (!target) {
    alert("অর্ডার পাওয়া যায়নি!");
    return;
  }
  closeAdminOrdersModal();
  currentCompletedOrder = target;
  renderOrderSuccessModal(target);
};

window.updateOrderStatus = function(orderId, newStatus) {
  let orders = JSON.parse(localStorage.getItem("hasaan_bazaar_orders") || "[]");
  const idx = orders.findIndex(o => o.orderId === orderId);
  if (idx !== -1) {
    orders[idx].status = newStatus;
    localStorage.setItem("hasaan_bazaar_orders", JSON.stringify(orders));
    showToast(`অর্ডার ${orderId}-এর স্ট্যাটাস আপডেট হয়েছে!`);
  }

  // Update in Supabase Cloud
  if (supabaseClient) {
    supabaseClient
      .from('orders')
      .update({ 
        status: newStatus, 
        updated_at: new Date().toISOString() 
      })
      .eq('order_id', orderId)
      .then(({ error }) => {
        if (error) console.warn("Supabase order status sync warning:", error);
      });
  }
};

window.deleteOrder = function(orderId) {
  if (!confirm(`আপনি কি সত্যিই অর্ডারটি (${orderId}) মুছে ফেলতে চান?`)) return;
  let orders = JSON.parse(localStorage.getItem("hasaan_bazaar_orders") || "[]");
  orders = orders.filter(o => o.orderId !== orderId);
  localStorage.setItem("hasaan_bazaar_orders", JSON.stringify(orders));
  renderAdminOrders();

  if (supabaseClient) {
    supabaseClient.from('orders').delete().eq('order_id', orderId).then(({ error }) => {
      if (error) console.warn("Supabase order delete warning:", error);
    });
  }
  showToast(`অর্ডারটি মুছে ফেলা হয়েছে।`);
};

window.clearAllOrders = function() {
  if (!confirm("সতর্কতা: আপনি কি নিশ্চিত যে সমস্ত অর্ডার হিস্ট্রি মুছে ফেলতে চান?")) return;
  localStorage.removeItem("hasaan_bazaar_orders");
  renderAdminOrders();
  showToast("সমস্ত অর্ডার হিস্ট্রি ক্লিয়ার করা হয়েছে।");
};

window.exportOrdersToCSV = function() {
  const orders = JSON.parse(localStorage.getItem("hasaan_bazaar_orders") || "[]");
  if (orders.length === 0) {
    alert("এক্সপোর্ট করার মতো কোনো অর্ডার নেই!");
    return;
  }

  let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
  csvContent += "Order ID,Date,Customer Name,Phone,Address,Delivery Area,Items,Total,Status\n";

  orders.forEach(o => {
    const itemsSummary = o.items.map(i => `${i.name}(${i.quantity})`).join("; ");
    const row = [
      o.orderId,
      `"${o.displayDate}"`,
      `"${o.customer.name}"`,
      `"${o.customer.phone}"`,
      `"${o.customer.address.replace(/"/g, '""')}"`,
      `"${o.customer.deliveryArea}"`,
      `"${itemsSummary.replace(/"/g, '""')}"`,
      o.total,
      `"${o.status}"`
    ].join(",");
    csvContent += row + "\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `Hasaan_Bazaar_Orders_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// ================= ADMIN TABS & PRODUCT MANAGEMENT LOGIC =================
window.switchAdminTab = function(tabName) {
  const tabOrders = document.getElementById("adminTabOrders");
  const tabProducts = document.getElementById("adminTabProducts");
  const tabDatabase = document.getElementById("adminTabDatabase");
  const btnOrders = document.getElementById("tabBtnOrders");
  const btnProducts = document.getElementById("tabBtnProducts");
  const btnDatabase = document.getElementById("tabBtnDatabase");

  if (tabOrders) tabOrders.style.display = tabName === "orders" ? "block" : "none";
  if (tabProducts) tabProducts.style.display = tabName === "products" ? "block" : "none";
  if (tabDatabase) tabDatabase.style.display = tabName === "database" ? "block" : "none";

  if (btnOrders) btnOrders.classList.toggle("active", tabName === "orders");
  if (btnProducts) btnProducts.classList.toggle("active", tabName === "products");
  if (btnDatabase) btnDatabase.classList.toggle("active", tabName === "database");

  if (tabName === "orders") {
    renderAdminOrders();
  } else if (tabName === "products") {
    renderAdminProducts();
  } else if (tabName === "database") {
    populateDatabaseSettingsFields();
  }
};

window.handleCategoryChange = function(cat) {
  const unitSelect = document.getElementById("newProdUnit");
  if (unitSelect) {
    if (cat === "honey") {
      unitSelect.value = "কেজি";
    } else {
      if (unitSelect.value === "কেজি") {
        unitSelect.value = "টি";
      }
    }
  }
};

let uploadedImageBase64 = "";

window.previewProductUpload = function(input) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      uploadedImageBase64 = e.target.result;
      const previewWrap = document.getElementById("newProdImgPreviewWrap");
      const previewImg = document.getElementById("newProdImgPreview");
      if (previewImg) previewImg.src = uploadedImageBase64;
      if (previewWrap) previewWrap.style.display = "flex";
      const urlInput = document.getElementById("newProdUrl");
      if (urlInput) urlInput.value = "";
    };
    reader.readAsDataURL(file);
  }
};

window.previewProductUrl = function(url) {
  const previewWrap = document.getElementById("newProdImgPreviewWrap");
  const previewImg = document.getElementById("newProdImgPreview");
  if (url.trim() !== "") {
    uploadedImageBase64 = "";
    if (previewImg) previewImg.src = url.trim();
    if (previewWrap) previewWrap.style.display = "flex";
  } else if (!uploadedImageBase64) {
    if (previewWrap) previewWrap.style.display = "none";
  }
};

window.resetProductForm = function() {
  uploadedImageBase64 = "";
  const previewWrap = document.getElementById("newProdImgPreviewWrap");
  if (previewWrap) previewWrap.style.display = "none";
  const form = document.getElementById("newProductForm");
  if (form) form.reset();
};

window.handleAddNewProduct = function() {
  const nameInput = document.getElementById("newProdName");
  const catInput = document.getElementById("newProdCategory");
  const priceInput = document.getElementById("newProdPrice");
  const origPriceInput = document.getElementById("newProdOriginalPrice");
  const unitInput = document.getElementById("newProdUnit");
  const badgeInput = document.getElementById("newProdBadge");
  const urlInput = document.getElementById("newProdUrl");
  const descInput = document.getElementById("newProdDesc");
  const featInput = document.getElementById("newProdFeatures");

  const name = nameInput ? nameInput.value.trim() : "";
  const cat = catInput ? catInput.value : "attar";
  const price = priceInput ? Number(priceInput.value) : 0;
  const origPriceVal = origPriceInput ? origPriceInput.value : "";
  const origPrice = origPriceVal ? Number(origPriceVal) : null;
  const unit = unitInput ? unitInput.value : (cat === "honey" ? "কেজি" : "টি");
  const badge = badgeInput ? badgeInput.value.trim() : "";
  const urlVal = urlInput ? urlInput.value.trim() : "";
  const desc = descInput ? descInput.value.trim() : "";
  const featText = featInput ? featInput.value.trim() : "";

  const finalImg = uploadedImageBase64 || urlVal || "logo.svg";

  if (!name || !price || !desc) {
    alert("অনুগ্রহ করে পণ্যের নাম, মূল্য এবং আকর্ষণীয় বিবরণ পূরণ করুন!");
    return;
  }

  const features = featText !== "" 
    ? featText.split("\n").map(f => f.trim()).filter(f => f.length > 0)
    : [
        "১০০% খাঁটি ও গুণগত মানসম্পন্ন প্রিমিয়াম উপাদান",
        "সম্পূর্ণ আসল ও বিশুদ্ধতার নিশ্চয়তা",
        "Hasaan Bazaar এক্সক্লুসিভ কোয়ালিটি"
      ];

  const categoryNameMap = {
    attar: "আতর ও সুগন্ধি",
    tupi: "ইসলামিক টুপি",
    panjabi: "প্রিমিয়াম পাঞ্জাবি",
    honey: "খাঁটি প্রাকৃতিক মধু"
  };

  const newProd = {
    id: Date.now(),
    name: name,
    category: cat,
    categoryName: categoryNameMap[cat] || "প্রিমিয়াম পণ্য",
    price: price,
    originalPrice: origPrice,
    unit: unit,
    rating: 5.0,
    reviews: 1,
    badge: badge || (cat === "honey" ? "খাঁটি চাকের মধু" : "নতুন কালেকশন"),
    image: finalImg,
    description: desc,
    features: features
  };

  try {
    const customProds = JSON.parse(localStorage.getItem("hasaan_bazaar_custom_products") || "[]");
    customProds.push(newProd);
    localStorage.setItem("hasaan_bazaar_custom_products", JSON.stringify(customProds));
  } catch (e) {
    console.error("Storage error:", e);
  }

  // Also sync to Supabase Cloud if connected
  if (supabaseClient) {
    supabaseClient.from('products').insert([{
      id: newProd.id,
      name: newProd.name,
      category: newProd.category,
      category_name: newProd.categoryName,
      price: newProd.price,
      original_price: newProd.originalPrice,
      unit: newProd.unit,
      rating: newProd.rating,
      reviews: newProd.reviews,
      badge: newProd.badge,
      image: newProd.image,
      description: newProd.description,
      features: newProd.features,
      is_active: true
    }]).then(({ error }) => {
      if (error) console.warn("Supabase product insert warning:", error);
    });
  }

  initProducts();
  renderProducts(currentFilter);
  renderAdminProducts();
  resetProductForm();
  showToast(`"${name}" সফলভাবে যুক্ত হয়েছে এবং ওয়েবসাইটে লাইভ হয়েছে!`);
};

window.renderAdminProducts = function() {
  const container = document.getElementById("adminProductsContainer");
  const badge = document.getElementById("adminProductsBadgeCount");
  if (badge) badge.innerText = toBengaliNumber(products.length);

  if (!container) return;

  if (products.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:30px; color:var(--text-muted);">
        <i class="fa-solid fa-box-open" style="font-size:2.5rem; margin-bottom:10px;"></i>
        <p>বর্তমানে কোনো পণ্য নেই। ওপরের ফর্মটি পূরণ করে নতুন পণ্য যুক্ত করুন।</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <table class="admin-products-table">
      <thead>
        <tr>
          <th>ছবি</th>
          <th>পণ্যের নাম</th>
          <th>ক্যাটাগরি</th>
          <th>মূল্য ও একক</th>
          <th>ব্যাজ</th>
          <th style="text-align:center;">অ্যাকশন</th>
        </tr>
      </thead>
      <tbody>
        ${products.map(p => {
          const isHoney = p.category === 'honey' || p.unit === 'কেজি';
          const unitText = p.unit || (isHoney ? 'কেজি' : 'টি');
          return `
            <tr>
              <td>
                <img src="${p.image}" alt="${p.name}" class="admin-prod-thumb" onerror="this.src='logo.svg'">
              </td>
              <td>
                <strong>${p.name}</strong>
              </td>
              <td>${p.categoryName}</td>
              <td>
                <strong style="color:var(--primary);">৳ ${toBengaliNumber(p.price)}</strong> / ${unitText}
                ${p.originalPrice ? `<br><del style="color:var(--text-muted); font-size:0.8rem;">৳ ${toBengaliNumber(p.originalPrice)}</del>` : ''}
              </td>
              <td>
                ${p.badge ? `<span class="badge-tag-pill">${p.badge}</span>` : '-'}
              </td>
              <td style="text-align:center;">
                <button type="button" class="btn-delete-prod" onclick="deleteProduct(${p.id})" title="পণ্যটি মুছে ফেলুন">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </td>
            </tr>
          `;
        }).join("")}
      </tbody>
    </table>
  `;
};

window.deleteProduct = function(productId) {
  const target = products.find(p => p.id === productId);
  if (!target) return;

  if (!confirm(`আপনি কি নিশ্চিত "${target.name}" পণ্যটি ওয়েবসাইট থেকে মুছে ফেলতে চান?`)) {
    return;
  }

  try {
    let customProds = JSON.parse(localStorage.getItem("hasaan_bazaar_custom_products") || "[]");
    const isCustom = customProds.some(p => p.id === productId);
    if (isCustom) {
      customProds = customProds.filter(p => p.id !== productId);
      localStorage.setItem("hasaan_bazaar_custom_products", JSON.stringify(customProds));
    } else {
      let deletedIds = JSON.parse(localStorage.getItem("hasaan_bazaar_deleted_ids") || "[]");
      if (!deletedIds.includes(productId)) {
        deletedIds.push(productId);
        localStorage.setItem("hasaan_bazaar_deleted_ids", JSON.stringify(deletedIds));
      }
    }
  } catch (e) {
    console.error("Delete error:", e);
  }

  // Also soft-delete in Supabase Cloud
  if (supabaseClient) {
    supabaseClient.from('products').update({ is_active: false }).eq('id', productId).then(({ error }) => {
      if (error) console.warn("Supabase product delete warning:", error);
    });
  }

  initProducts();
  renderProducts(currentFilter);
  renderAdminProducts();
  showToast(`"${target.name}" পণ্যটি মুছে ফেলা হয়েছে!`);
};

window.resetDefaultProducts = function() {
  if (!confirm("আপনি কি সব কাস্টম পণ্য মুছে আসল ১৬টি ডিফল্ট পণ্যে ফিরে যেতে চান?")) {
    return;
  }

  localStorage.removeItem("hasaan_bazaar_custom_products");
  localStorage.removeItem("hasaan_bazaar_deleted_ids");
  initProducts();
  renderProducts("all");
  renderAdminProducts();
  showToast("ডিফল্ট পণ্যসমূহ রিস্টোর করা হয়েছে!");
};

// Show Toast message
function showToast(message) {
  if (!toast || !toastMsg) return;
  toastMsg.innerText = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// ================= PWA ENGINE & SERVICE WORKER =================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => {
        console.log('[Hasaan Bazaar PWA] Service Worker registered with scope:', reg.scope);
      })
      .catch((err) => {
        console.warn('[Hasaan Bazaar PWA] Service Worker registration info:', err);
      });
  });
}

let deferredPrompt = null;
const pwaGuideOverlay = document.getElementById('pwaGuideModalOverlay');

function isRunningStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches || 
         window.navigator.standalone === true || 
         document.referrer.includes('android-app://');
}

// Capture install prompt quietly without auto-displaying intrusive banner
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

window.addEventListener('appinstalled', () => {
  deferredPrompt = null;
  const popup = document.getElementById('appInstallPopup');
  if (popup) popup.style.display = 'none';
  if (pwaGuideOverlay) pwaGuideOverlay.style.display = 'none';
  showToast('🎉 Hasaan Bazaar অ্যাপটি সফলভাবে ইনস্টল হয়েছে!');
});

// Closable App Install Pop-up Logic
function checkAndShowInstallPopup() {
  if (isRunningStandalone()) return;

  const dismissedTime = localStorage.getItem('hasaan_install_popup_dismissed');
  if (dismissedTime && (Date.now() - parseInt(dismissedTime, 10)) < 172800000) {
    return;
  }

  if (sessionStorage.getItem('hasaan_install_popup_dismissed_session')) {
    return;
  }

  const popup = document.getElementById('appInstallPopup');
  if (popup) {
    popup.style.display = 'block';
  }
}

window.closeInstallPopup = function() {
  const popup = document.getElementById('appInstallPopup');
  if (!popup) return;
  popup.classList.add('closing');
  setTimeout(() => {
    popup.style.display = 'none';
    popup.classList.remove('closing');
  }, 280);

  localStorage.setItem('hasaan_install_popup_dismissed', Date.now().toString());
  sessionStorage.setItem('hasaan_install_popup_dismissed_session', 'true');
};

// Gentle delay before showing popup (3.5 seconds)
window.addEventListener('load', () => {
  setTimeout(() => {
    checkAndShowInstallPopup();
  }, 3500);
});

window.triggerPwaInstall = async function() {
  const popup = document.getElementById('appInstallPopup');
  if (popup) popup.style.display = 'none';

  if (isRunningStandalone()) {
    showToast('Hasaan Bazaar অ্যাপটি ইতোমধ্যেই ইনস্টল করা আছে!');
    return;
  }

  if (deferredPrompt) {
    try {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      deferredPrompt = null;
    } catch (err) {
      console.warn('[PWA] Prompt error:', err);
    }
    return;
  }

  // Fallback to Guide Modal
  openPwaGuideModal();
};

window.openPwaGuideModal = function() {
  if (!pwaGuideOverlay) return;
  const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const iosStep = document.getElementById('pwaIosStep');
  const androidStep = document.getElementById('pwaAndroidStep');

  if (iosStep && androidStep) {
    if (isIos) {
      iosStep.style.display = 'block';
      iosStep.style.border = '2px solid var(--gold)';
      androidStep.style.display = 'none';
    } else {
      iosStep.style.display = 'none';
      androidStep.style.display = 'block';
      androidStep.style.border = '2px solid var(--gold)';
    }
  }

  pwaGuideOverlay.style.display = 'flex';
};

window.closePwaGuideModal = function(e) {
  if (e && e.target && e.target !== pwaGuideOverlay && !e.target.classList.contains('close-guide-btn') && !e.target.closest('.close-guide-btn') && !e.target.classList.contains('btn-block')) {
    return;
  }
  if (pwaGuideOverlay) pwaGuideOverlay.style.display = 'none';
};


// ===================================================================
// SUPABASE CLOUD DATABASE & REALTIME SYNCHRONIZATION ENGINE
// ===================================================================

const STORAGE_KEY_SUPABASE_URL = "hasaan_bazaar_supabase_url";
const STORAGE_KEY_SUPABASE_KEY = "hasaan_bazaar_supabase_key";

let supabaseClient = null;
let realtimeOrdersChannel = null;
let realtimeProductsChannel = null;

// Gentle Web Audio API chime for live order notification
function playNewOrderChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.setValueAtTime(880, now + 0.15); // A5
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    osc.start(now);
    osc.stop(now + 0.6);
  } catch (err) {
    console.log("Audio chime note:", err);
  }
}

// Initialize Supabase Client
async function initSupabase() {
  const url = localStorage.getItem(STORAGE_KEY_SUPABASE_URL);
  const key = localStorage.getItem(STORAGE_KEY_SUPABASE_KEY);

  if (!url || !key || !window.supabase) {
    updateDbStatusUI(false);
    return;
  }

  try {
    supabaseClient = window.supabase.createClient(url.trim(), key.trim());
    updateDbStatusUI(true);

    // Initial load cloud products & stats
    await fetchCloudProducts();
    await updateCloudStats();

    // Subscribe to realtime orders and products
    setupRealtimeSubscriptions();
  } catch (err) {
    console.error("Supabase init error:", err);
    updateDbStatusUI(false);
  }
}

// Update UI badges and connection indicators
function updateDbStatusUI(connected) {
  const statusPill = document.getElementById("dbStatusPill");
  const indicator = document.getElementById("dbStatusIndicator");
  const text = document.getElementById("dbStatusText");
  const realtimeText = document.getElementById("realtimeStateText");

  if (!statusPill || !indicator || !text) return;

  if (connected) {
    statusPill.classList.add("connected");
    indicator.className = "status-indicator status-online";
    text.innerText = "ক্লাউড কানেক্টেড (Supabase)";
    if (realtimeText) realtimeText.innerText = "🟢 রিয়েল-টাইম সক্রিয়";
  } else {
    statusPill.classList.remove("connected");
    indicator.className = "status-indicator status-offline";
    text.innerText = "লোকাল স্টোরেজ মোড";
    if (realtimeText) realtimeText.innerText = "⚪ অফলাইন";
  }
}

// Fetch products from Supabase and refresh catalog
async function fetchCloudProducts() {
  if (!supabaseClient) return;

  try {
    const { data, error } = await supabaseClient
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("id", { ascending: true });

    if (error) {
      console.warn("Supabase fetch products warning:", error);
      return;
    }

    if (data && data.length > 0) {
      // Map DB columns to our frontend model
      products = data.map(p => ({
        id: Number(p.id),
        name: p.name,
        category: p.category,
        categoryName: p.category_name,
        price: Number(p.price),
        originalPrice: p.original_price ? Number(p.original_price) : null,
        unit: p.unit || "টি",
        rating: Number(p.rating || 5.0),
        reviews: Number(p.reviews || 0),
        badge: p.badge || "",
        image: p.image,
        description: p.description,
        features: Array.isArray(p.features) ? p.features : []
      }));

      // Re-render UI
      renderProducts(currentFilter);
      renderAdminProducts();
    }
  } catch (err) {
    console.warn("Could not load products from Supabase:", err);
  }
}

// Update database stats in Tab 3
async function updateCloudStats() {
  if (!supabaseClient) return;

  try {
    const prodElem = document.getElementById("cloudProdCount");
    const ordersElem = document.getElementById("cloudOrdersCount");

    const { count: prodCount } = await supabaseClient
      .from("products")
      .select("*", { count: "exact", head: true });

    const { count: ordersCount } = await supabaseClient
      .from("orders")
      .select("*", { count: "exact", head: true });

    if (prodElem) prodElem.innerText = toBengaliNumber(prodCount || 0);
    if (ordersElem) ordersElem.innerText = toBengaliNumber(ordersCount || 0);
  } catch (err) {
    console.log("Stats fetch warning:", err);
  }
}

// Real-time Subscriptions using Supabase Realtime Channels
function setupRealtimeSubscriptions() {
  if (!supabaseClient) return;

  try {
    if (realtimeOrdersChannel) supabaseClient.removeChannel(realtimeOrdersChannel);

    realtimeOrdersChannel = supabaseClient
      .channel("public:orders")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        payload => {
          const newRow = payload.new;
          if (!newRow) return;

          // Sound alert
          playNewOrderChime();

          // Rich Toast
          showToast(`🎉 নতুন অর্ডার এসেছে: ${newRow.order_id} (৳ ${toBengaliNumber(newRow.total)})`);

          // Sync into localStorage if not present
          const ordersHistory = JSON.parse(localStorage.getItem("hasaan_bazaar_orders") || "[]");
          const exists = ordersHistory.some(o => o.orderId === newRow.order_id);
          if (!exists) {
            const mappedOrder = {
              orderId: newRow.order_id,
              timestamp: newRow.created_at,
              displayDate: new Date(newRow.created_at).toLocaleDateString("bn-BD", {
                year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit"
              }),
              customer: {
                name: newRow.customer_name,
                phone: newRow.customer_phone,
                address: newRow.customer_address,
                deliveryArea: newRow.delivery_zone,
                paymentMethod: newRow.payment_method,
                trxId: newRow.transaction_id || ""
              },
              items: Array.isArray(newRow.items) ? newRow.items : [],
              subtotal: Number(newRow.subtotal),
              deliveryCharge: Number(newRow.delivery_fee),
              total: Number(newRow.total),
              status: newRow.status || "অর্ডার গ্রহণ (Pending)"
            };
            ordersHistory.unshift(mappedOrder);
            localStorage.setItem("hasaan_bazaar_orders", JSON.stringify(ordersHistory));
            renderAdminOrders();
          }

          updateCloudStats();
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "orders" },
        payload => {
          const updatedRow = payload.new;
          if (!updatedRow) return;

          // Sync into localStorage
          const ordersHistory = JSON.parse(localStorage.getItem("hasaan_bazaar_orders") || "[]");
          const idx = ordersHistory.findIndex(o => o.orderId === updatedRow.order_id);
          if (idx !== -1) {
            ordersHistory[idx].status = updatedRow.status;
            localStorage.setItem("hasaan_bazaar_orders", JSON.stringify(ordersHistory));
            renderAdminOrders();
          }
        }
      )
      .subscribe();
  } catch (err) {
    console.warn("Realtime subscription error:", err);
  }
}

// Push order to Supabase
async function saveOrderToSupabase(orderData) {
  if (!supabaseClient) return;

  try {
    const { error } = await supabaseClient
      .from("orders")
      .insert([{
        order_id: orderData.orderId,
        customer_name: orderData.customer.name,
        customer_phone: orderData.customer.phone,
        customer_address: orderData.customer.address,
        delivery_zone: orderData.customer.deliveryArea,
        payment_method: orderData.customer.paymentMethod,
        transaction_id: orderData.customer.trxId || null,
        items: orderData.items,
        subtotal: orderData.subtotal,
        delivery_fee: orderData.deliveryCharge,
        total: orderData.total,
        status: orderData.status,
        status_history: [{ status: orderData.status, time: new Date().toISOString() }]
      }]);

    if (error) {
      console.error("Supabase insert order error:", error);
    } else {
      console.log("Order successfully synced to Supabase:", orderData.orderId);
      updateCloudStats();
    }
  } catch (err) {
    console.error("saveOrderToSupabase exception:", err);
  }
}

// Save & Connect Supabase from Admin Tab 3
window.saveAndConnectSupabase = async function() {
  const urlInput = document.getElementById("supabaseProjectUrl");
  const keyInput = document.getElementById("supabaseAnonKey");

  const url = urlInput ? urlInput.value.trim() : "";
  const key = keyInput ? keyInput.value.trim() : "";

  if (!url || !key) {
    alert("অনুগ্রহ করে Supabase Project URL এবং Public Anon Key উভয়টি প্রবেশ করান!");
    return;
  }

  if (!url.startsWith("http")) {
    alert("Project URL টি সঠিক ফরম্যাটে লিখুন (যেমন: https://xyz.supabase.co)");
    return;
  }

  try {
    const testClient = window.supabase.createClient(url, key);
    // Test query
    const { error } = await testClient.from("products").select("id").limit(1);

    if (error && error.code !== "PGRST116") {
      // If table doesn't exist yet, show warning but allow saving
      if (error.message && error.message.includes("does not exist")) {
        alert("কানেকশন সফল! তবে 'products' টেবিলটি তৈরি করা হয়নি। নিচে থাকা SQL স্ক্রিপ্টটি Supabase SQL Editor-এ রান করুন।");
      } else {
        alert("কানেকশন ব্যর্থ হয়েছে: " + error.message);
        return;
      }
    }

    localStorage.setItem(STORAGE_KEY_SUPABASE_URL, url);
    localStorage.setItem(STORAGE_KEY_SUPABASE_KEY, key);

    supabaseClient = testClient;
    updateDbStatusUI(true);
    setupRealtimeSubscriptions();
    await fetchCloudProducts();
    await updateCloudStats();

    showToast("Supabase সেন্ট্রাল ক্লাউড ডাটাবেস সফলভাবে কানেক্ট হয়েছে!");
  } catch (err) {
    alert("ত্রুটি: " + err.message);
  }
};

// Disconnect Supabase (revert to pure local mode)
window.disconnectSupabase = function() {
  if (!confirm("আপনি কি সত্যিই Supabase ক্লাউড ডিসকানেক্ট করে লোকাল স্টোরেজ মোডে ফেরত যেতে চান?")) return;

  localStorage.removeItem(STORAGE_KEY_SUPABASE_URL);
  localStorage.removeItem(STORAGE_KEY_SUPABASE_KEY);

  if (realtimeOrdersChannel && supabaseClient) {
    supabaseClient.removeChannel(realtimeOrdersChannel);
  }

  supabaseClient = null;
  updateDbStatusUI(false);

  const urlInput = document.getElementById("supabaseProjectUrl");
  const keyInput = document.getElementById("supabaseAnonKey");
  if (urlInput) urlInput.value = "";
  if (keyInput) keyInput.value = "";

  showToast("ক্লাউড ডাটাবেস ডিসকানেক্ট করা হয়েছে। সাইট এখন লোকাল মোডে চলছে।");
};

// Upload current catalog to Supabase (Initial Seeding)
window.seedCatalogToSupabase = async function() {
  if (!supabaseClient) {
    alert("প্রথমে Supabase কানেক্ট করুন!");
    return;
  }

  const btn = document.getElementById("btnSeedCatalog");
  const originalText = btn ? btn.innerHTML : "";
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> আপলোড হচ্ছে...`;
  }

  try {
    const payload = products.map(p => ({
      id: p.id,
      name: p.name,
      category: p.category,
      category_name: p.categoryName,
      price: p.price,
      original_price: p.originalPrice,
      unit: p.unit || "টি",
      rating: p.rating || 5.0,
      reviews: p.reviews || 0,
      badge: p.badge || "",
      image: p.image,
      description: p.description,
      features: p.features || [],
      is_active: true
    }));

    const { error } = await supabaseClient.from("products").upsert(payload, { onConflict: "id" });

    if (error) {
      alert("আপলোড ব্যর্থ: " + error.message + "\n(নিশ্চিত করুন যে 'products' টেবিলটি Supabase-এ তৈরি করা আছে)");
    } else {
      showToast(`সফল! মোট ${toBengaliNumber(payload.length)}টি প্রোডাক্ট Supabase-এ আপলোড সম্পন্ন হয়েছে।`);
      await updateCloudStats();
    }
  } catch (err) {
    alert("আপলোড ত্রুটি: " + err.message);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = originalText;
    }
  }
};

// Populate credentials fields when opening Tab 3
function populateDatabaseSettingsFields() {
  const urlInput = document.getElementById("supabaseProjectUrl");
  const keyInput = document.getElementById("supabaseAnonKey");

  if (urlInput) urlInput.value = localStorage.getItem(STORAGE_KEY_SUPABASE_URL) || "";
  if (keyInput) keyInput.value = localStorage.getItem(STORAGE_KEY_SUPABASE_KEY) || "";

  updateDbStatusUI(!!supabaseClient);
  if (supabaseClient) updateCloudStats();
}

// Accordion toggle for SQL script
window.toggleSqlAccordion = function() {
  const body = document.getElementById("dbSqlBody");
  const icon = document.getElementById("sqlToggleIcon");
  if (!body) return;

  if (body.style.display === "none" || body.style.display === "") {
    body.style.display = "block";
    if (icon) icon.className = "fa-solid fa-chevron-up";
  } else {
    body.style.display = "none";
    if (icon) icon.className = "fa-solid fa-chevron-down";
  }
};

// Copy SQL code block
window.copySupabaseSql = function() {
  const codeElem = document.getElementById("supabaseSqlCodeBlock");
  if (!codeElem) return;

  const text = codeElem.innerText;
  navigator.clipboard.writeText(text).then(() => {
    showToast("SQL স্ক্রিপ্ট ক্লিপবোর্ডে কপি হয়েছে!");
  }).catch(() => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    showToast("SQL স্ক্রিপ্ট ক্লিপবোর্ডে কপি হয়েছে!");
  });
};


// ===================================================================
// LIVE ORDER TRACKING MODAL ENGINE
// ===================================================================

window.openOrderTrackingModal = function(prefillId) {
  const modal = document.getElementById("orderTrackingModal");
  const overlay = document.getElementById("orderTrackingModalOverlay");
  const input = document.getElementById("orderTrackingInput");
  const loader = document.getElementById("trackingLoader");
  const notFound = document.getElementById("trackingNotFound");
  const resultWrap = document.getElementById("trackingResultWrap");

  if (loader) loader.style.display = "none";
  if (notFound) notFound.style.display = "none";
  if (resultWrap) resultWrap.style.display = "none";

  if (input) {
    input.value = prefillId ? prefillId.trim() : "";
  }

  if (modal) modal.classList.add("active");
  if (overlay) overlay.classList.add("active");
  document.body.style.overflow = "hidden";

  if (prefillId) {
    submitOrderTracking();
  } else if (input) {
    setTimeout(() => input.focus(), 300);
  }
};

window.closeOrderTrackingModal = function(e) {
  const modal = document.getElementById("orderTrackingModal");
  const overlay = document.getElementById("orderTrackingModalOverlay");
  if (e && e.target && e.target !== overlay && !e.target.classList.contains("modal-close-btn") && !e.target.closest(".modal-close-btn")) {
    return;
  }
  if (modal) modal.classList.remove("active");
  if (overlay) overlay.classList.remove("active");
  document.body.style.overflow = "";
};

window.submitOrderTracking = async function() {
  const input = document.getElementById("orderTrackingInput");
  const loader = document.getElementById("trackingLoader");
  const notFound = document.getElementById("trackingNotFound");
  const resultWrap = document.getElementById("trackingResultWrap");

  const query = input ? input.value.trim() : "";
  if (!query) return;

  if (loader) loader.style.display = "block";
  if (notFound) notFound.style.display = "none";
  if (resultWrap) resultWrap.style.display = "none";

  let matchedOrder = null;

  // 1. First attempt to query Supabase Cloud if available
  if (supabaseClient) {
    try {
      const cleanId = query.startsWith("#") ? query : `#${query}`;
      
      const { data, error } = await supabaseClient
        .from("orders")
        .select("*")
        .or(`order_id.eq.${cleanId},order_id.eq.${query},customer_phone.eq.${query}`)
        .order("created_at", { ascending: false })
        .limit(1);

      if (!error && data && data.length > 0) {
        const row = data[0];
        matchedOrder = {
          orderId: row.order_id,
          timestamp: row.created_at,
          displayDate: new Date(row.created_at).toLocaleDateString("bn-BD", {
            year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit"
          }),
          customer: {
            name: row.customer_name,
            phone: row.customer_phone,
            address: row.customer_address,
            deliveryArea: row.delivery_zone,
            paymentMethod: row.payment_method,
            trxId: row.transaction_id || ""
          },
          items: Array.isArray(row.items) ? row.items : [],
          subtotal: Number(row.subtotal),
          deliveryCharge: Number(row.delivery_fee),
          total: Number(row.total),
          status: row.status || "অর্ডার গ্রহণ (Pending)"
        };
      }
    } catch (err) {
      console.warn("Supabase tracking query error:", err);
    }
  }

  // 2. Fallback to LocalStorage orders if not found in cloud
  if (!matchedOrder) {
    const localOrders = JSON.parse(localStorage.getItem("hasaan_bazaar_orders") || "[]");
    const normalizedQuery = query.toLowerCase().replace(/[^a-z0-9]/g, "");

    matchedOrder = localOrders.find(o => {
      const oIdNorm = (o.orderId || "").toLowerCase().replace(/[^a-z0-9]/g, "");
      const phoneNorm = (o.customer && o.customer.phone || "").replace(/[^0-9]/g, "");
      return oIdNorm === normalizedQuery || phoneNorm === normalizedQuery || (o.orderId && o.orderId.includes(query));
    });
  }

  // Natural UI delay
  setTimeout(() => {
    if (loader) loader.style.display = "none";

    if (matchedOrder) {
      renderOrderTrackingResult(matchedOrder);
      if (resultWrap) resultWrap.style.display = "block";
    } else {
      if (notFound) notFound.style.display = "block";
    }
  }, 350);
};

// Render matching order in visual stepper and details
function renderOrderTrackingResult(order) {
  const badgeId = document.getElementById("trackOrderBadgeId");
  const dateElem = document.getElementById("trackOrderDate");
  const statusPill = document.getElementById("trackCurrentStatusPill");
  const progressFill = document.getElementById("trackingProgressFill");
  const cancelledBanner = document.getElementById("trackingCancelledBanner");

  const custName = document.getElementById("trackCustName");
  const custPhone = document.getElementById("trackCustPhone");
  const custAddress = document.getElementById("trackCustAddress");
  const custArea = document.getElementById("trackCustArea");

  const payMethod = document.getElementById("trackPayMethod");
  const trxRow = document.getElementById("trackTrxRow");
  const trxId = document.getElementById("trackTrxId");
  const subtotal = document.getElementById("trackSubtotal");
  const deliveryFee = document.getElementById("trackDeliveryFee");
  const totalBill = document.getElementById("trackTotalBill");
  const itemsList = document.getElementById("trackItemsList");

  if (badgeId) badgeId.innerText = order.orderId;
  if (dateElem) dateElem.innerText = order.displayDate || "--";

  const rawStatus = (order.status || "অর্ডার গ্রহণ (Pending)").trim();
  const lower = rawStatus.toLowerCase();

  const steps = [
    document.getElementById("trackStep1"),
    document.getElementById("trackStep2"),
    document.getElementById("trackStep3"),
    document.getElementById("trackStep4"),
    document.getElementById("trackStep5")
  ];

  steps.forEach(s => {
    if (s) {
      s.className = "tracking-step";
    }
  });

  const isCancelled = lower.includes("বাতিল") || lower.includes("cancel");

  if (isCancelled) {
    if (cancelledBanner) cancelledBanner.style.display = "flex";
    if (progressFill) progressFill.style.width = "0%";
    if (statusPill) {
      statusPill.className = "tracking-current-status-pill status-pill-cancelled";
      statusPill.innerText = "বাতিল (Cancelled)";
    }
  } else {
    if (cancelledBanner) cancelledBanner.style.display = "none";

    let stepIndex = 1;
    let pillClass = "status-pill-pending";

    if (lower.includes("ডেলিভারড") || lower.includes("delivered")) {
      stepIndex = 5;
      pillClass = "status-pill-delivered";
    } else if (lower.includes("ডেলিভারিতে") || lower.includes("shipped") || lower.includes("transit") || lower.includes("কুরিয়ার")) {
      stepIndex = 4;
      pillClass = "status-pill-shipped";
    } else if (lower.includes("প্যাকিং") || lower.includes("প্রসেসিং") || lower.includes("processing") || lower.includes("packing")) {
      stepIndex = 3;
      pillClass = "status-pill-processing";
    } else if (lower.includes("কনফার্মড") || lower.includes("confirmed")) {
      stepIndex = 2;
      pillClass = "status-pill-confirmed";
    } else {
      stepIndex = 1;
      pillClass = "status-pill-pending";
    }

    if (statusPill) {
      statusPill.className = `tracking-current-status-pill ${pillClass}`;
      statusPill.innerText = rawStatus;
    }

    const progressMap = { 1: 0, 2: 25, 3: 50, 4: 75, 5: 100 };
    if (progressFill) {
      progressFill.style.width = `${progressMap[stepIndex]}%`;
    }

    for (let i = 0; i < steps.length; i++) {
      if (!steps[i]) continue;
      const num = i + 1;
      if (num < stepIndex) {
        steps[i].classList.add("completed");
      } else if (num === stepIndex) {
        steps[i].classList.add("current");
      }
    }
  }

  if (custName) custName.innerText = order.customer.name || "--";
  if (custPhone) custPhone.innerText = order.customer.phone || "--";
  if (custAddress) custAddress.innerText = order.customer.address || "--";
  if (custArea) custArea.innerText = order.customer.deliveryArea || "--";

  if (payMethod) payMethod.innerText = order.customer.paymentMethod || "ক্যাশ অন ডেলিভারি";
  if (order.customer.trxId && order.customer.trxId.trim() !== "") {
    if (trxRow) trxRow.style.display = "flex";
    if (trxId) trxId.innerText = order.customer.trxId;
  } else {
    if (trxRow) trxRow.style.display = "none";
  }

  if (subtotal) subtotal.innerText = `৳ ${toBengaliNumber(order.subtotal || 0)}`;
  if (deliveryFee) deliveryFee.innerText = `৳ ${toBengaliNumber(order.deliveryCharge || 0)}`;
  if (totalBill) totalBill.innerText = `৳ ${toBengaliNumber(order.total || 0)}`;

  if (itemsList) {
    if (order.items && order.items.length > 0) {
      itemsList.innerHTML = order.items.map(it => {
        const isHoney = (it.name && it.name.includes("মধু")) || it.unit === "কেজি";
        const unit = it.unit || (isHoney ? "কেজি" : "টি");
        const itemTot = it.total || (it.price * it.quantity);
        return `
          <li class="tracking-item-row">
            <div>
              <strong>${it.name}</strong>
              <small style="color:var(--text-muted); margin-left:6px;">(${toBengaliNumber(it.quantity)} ${unit})</small>
            </div>
            <strong class="gold-text">৳ ${toBengaliNumber(itemTot)}</strong>
          </li>
        `;
      }).join("");
    } else {
      itemsList.innerHTML = `<li style="color:var(--text-muted); padding:6px 0;">কোনো বিস্তারিত পণ্যের তথ্য নেই</li>`;
    }
  }
}

// Auto-initialize Supabase on load
window.addEventListener("DOMContentLoaded", () => {
  initSupabase();
});
