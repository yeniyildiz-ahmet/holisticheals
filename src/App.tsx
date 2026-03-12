import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, 
  Sparkles, 
  ShoppingBag, 
  BookOpen, 
  Menu, 
  X, 
  ArrowRight, 
  Instagram, 
  Facebook, 
  Mail,
  Heart,
  Wind,
  Sun,
  Droplets,
  Zap,
  Eye,
  Flower2,
  ChevronLeft,
  ChevronRight,
  Star,
  MessageCircle,
  Check,
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Activity,
  FileText,
  AlertCircle,
  ShieldCheck,
  Stethoscope,
  Moon,
  Globe,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  Lock,
  Truck,
  HelpCircle,
  Info
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
interface Therapy {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  benefits: string[];
  duration: string;
  icon: React.ReactNode;
  image: string;
}

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  images: string[];
  category: string;
  description: string;
  fullDescription: string;
  features: string[];
  reviews: {
    user: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
}

interface CartItem extends Product {
  quantity: number;
}

// --- Mock Data ---
const THERAPIES: Therapy[] = [
  {
    id: '1',
    title: 'Hacamat (Kupa Tedavisi)',
    description: 'Vücuttaki toksinlerin vakum yoluyla atılmasını sağlayan, binlerce yıllık kadim bir şifa yöntemi.',
    fullDescription: 'Hacamat, deri altında birikmiş, vücudun dışarı atamadığı ağır metalleri, toksinleri ve pıhtılaşmış kanı vakum yoluyla vücuttan uzaklaştırma işlemidir. Peygamber Efendimiz (S.A.V) tarafından da tavsiye edilen bu yöntem, bağışıklık sistemini güçlendirir ve kan dolaşımını hızlandırır.',
    benefits: ['Kan dolaşımını düzenler', 'Vücudu toksinlerden arındırır', 'Kronik ağrıları azaltır', 'Bağışıklığı güçlendirir'],
    duration: '45-60 Dakika',
    icon: <Droplets className="w-4 h-4" />,
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'Sülük Tedavisi (Hirudoterapi)',
    description: 'Tıbbi sülüklerin salgıladığı biyoaktif maddelerle kan dolaşımını düzenleyen doğal tedavi.',
    fullDescription: 'Tıbbi sülükler (Hirudo medicinalis), ısırdıkları bölgeye 100\'den fazla biyoaktif madde salgılarlar. Bu maddeler arasında kan sulandırıcı (hirudin), ağrı kesici ve iltihap giderici enzimler bulunur. Özellikle varis, migren ve eklem ağrılarında mucizevi etkileri vardır.',
    benefits: ['Damar tıkanıklıklarını önler', 'Yara iyileşmesini hızlandırır', 'Sinir sistemini rahatlatır', 'Doğal antibiyotik etkisi sağlar'],
    duration: '60-90 Dakika',
    icon: <Leaf className="w-4 h-4" />,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'Hipnoz ve Bilinçaltı',
    description: 'Derin gevşeme haliyle bilinçaltındaki engelleri aşarak ruhsal ve bedensel dönüşüm.',
    fullDescription: 'Hipnoz, kişinin uyku ile uyanıklık arasında, telkine açık olduğu bir odaklanma halidir. Bilinçaltındaki travmalar, korkular ve kötü alışkanlıklar bu yöntemle dönüştürülebilir. Kişinin kendi içsel kaynaklarına ulaşmasını sağlar.',
    benefits: ['Fobilerden kurtulma', 'Sigara ve kilo kontrolü', 'Özgüven artışı', 'Stres ve kaygı yönetimi'],
    duration: '60 Dakika',
    icon: <Eye className="w-4 h-4" />,
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    title: 'Bioenerji Şifası',
    description: 'Evrensel yaşam enerjisinin aktarımıyla vücudun enerji dengesini yeniden kurma süreci.',
    fullDescription: 'Bioenerji, evrende var olan yaşam enerjisinin, uzman bir uygulayıcı aracılığıyla danışanın enerji bedenine aktarılmasıdır. Çakraların dengelenmesi ve aura temizliği ile vücudun kendi kendini iyileştirme mekanizması harekete geçirilir.',
    benefits: ['Enerji blokajlarını açar', 'Zihinsel berraklık sağlar', 'Yorgunluğu giderir', 'Ruhsal denge kurar'],
    duration: '45 Dakika',
    icon: <Zap className="w-4 h-4" />,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800'
  }
];

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Organik Çörek Otu Yağı',
    price: '₺240.00',
    category: 'Doğal Yağlar',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Soğuk sıkım yöntemiyle elde edilmiş, %100 saf ve organik çörek otu yağı.',
    fullDescription: 'Kadim tıp geleneklerinde "ölüm hariç her derde deva" olarak bilinen çörek otu, modern bilim tarafından da desteklenen sayısız faydaya sahiptir. Bizim çörek otu yağımız, en kaliteli tohumlardan, besin değerlerini korumak amacıyla ısıl işlem görmeden, soğuk sıkım yöntemiyle üretilmiştir.',
    features: [
      'Bağışıklık sistemini güçlendirir',
      'Antioksidan özellikleri yüksektir',
      'Cilt ve saç sağlığını destekler',
      'Sindirim sistemine yardımcı olur'
    ],
    reviews: [
      { user: 'Ayşe Y.', rating: 5, comment: 'Kalitesi gerçekten çok iyi, kokusundan bile belli oluyor.', date: '12 Şubat 2024' },
      { user: 'Mehmet K.', rating: 4, comment: 'Hızlı kargo ve özenli paketleme için teşekkürler.', date: '5 Ocak 2024' }
    ]
  },
  {
    id: '2',
    name: 'Doğal Kristal Kuvars',
    price: '₺450.00',
    category: 'Enerji Taşları',
    image: 'https://images.unsplash.com/photo-1551028150-64b9f398f678?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1551028150-64b9f398f678?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523944339743-0fe06f079939?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Enerji temizliği ve odaklanma için kullanılan en güçlü şifa kristali.',
    fullDescription: 'Kristal Kuvars, "Usta Şifacı" olarak bilinir ve her türlü enerjiyi yükseltme özelliğine sahiptir. Zihni berraklaştırır, negatif enerjiyi emer ve pozitif enerjiyi yayar. Her bir taş doğaldır ve kendine has bir formu vardır.',
    features: [
      'Negatif enerjiyi temizler',
      'Zihinsel odaklanmayı artırır',
      'Diğer kristallerin enerjisini yükseltir',
      'Meditasyon için idealdir'
    ],
    reviews: [
      { user: 'Selin B.', rating: 5, comment: 'Taşın enerjisi harika, masamda durması bile huzur veriyor.', date: '20 Ocak 2024' }
    ]
  },
  {
    id: '3',
    name: 'El Yapımı Adaçayı Tütsü',
    price: '₺180.00',
    category: 'Ritüel',
    image: 'https://images.unsplash.com/photo-1602928291849-044397793043?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1602928291849-044397793043?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1515202913167-d9a698095ebf?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Mekan temizliği ve negatif enerjiden arınma için geleneksel adaçayı demeti.',
    fullDescription: 'Anadolu topraklarından özenle toplanan adaçayları, geleneksel yöntemlerle kurutulup elde bağlanmıştır. Yakıldığında yayılan duman, mekanın enerjisini temizler ve dinginlik sağlar.',
    features: [
      '%100 Doğal kurutulmuş adaçayı',
      'Mekan enerjisini dengeler',
      'Sakinleştirici etkisi vardır',
      'Geleneksel tütsüleme yöntemi'
    ],
    reviews: [
      { user: 'Canan T.', rating: 5, comment: 'Kokusu çok huzurlu, paketleme çok şıktı.', date: '1 Mart 2024' }
    ]
  },
  {
    id: '4',
    name: 'Şifalı Bitki Çayı Karışımı',
    price: '₺120.00',
    category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1544787210-28274486363c?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1544787210-28274486363c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Vücut direncini artıran ve rahatlatan özel harman bitki çayı.',
    fullDescription: 'Mevsim geçişlerinde vücudunuzu desteklemek için hazırladığımız bu özel karışım; ıhlamur, kuşburnu, zencefil ve tarçın gibi şifalı bitkilerin en taze hallerini içerir.',
    features: [
      'Bağışıklık destekleyici',
      'Rahatlatıcı ve sakinleştirici',
      'Taze ve doğal içerik',
      'Katkı maddesi içermez'
    ],
    reviews: [
      { user: 'Hakan S.', rating: 4, comment: 'Tadı çok dengeli, akşamları içmek için ideal.', date: '15 Şubat 2024' }
    ]
  }
];

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Hacamatın Mevsimsel Faydaları',
    excerpt: 'Bahar aylarında yapılan hacamatın vücut direncine olan inanılmaz etkilerini keşfedin.',
    content: 'Bahar ayları, doğanın uyandığı gibi vücudumuzun da tazelenme ihtiyacı duyduğu dönemlerdir. Geleneksel tıp anlayışına göre, mevsim geçişlerinde yapılan hacamat, kış boyunca biriken toksinlerin atılmasını sağlar. Bu yazımızda hacamatın neden bahar aylarında daha etkili olduğunu ve vücudunuza katacağı enerjiyi detaylandırıyoruz...',
    date: '8 Mart 2024',
    author: 'Uzm. Şifa Danışmanı',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    tags: ['Hacamat', 'Bahar', 'Detoks']
  },
  {
    id: '2',
    title: 'Bioenerji ile Stres Yönetimi',
    excerpt: 'Günlük hayatın getirdiği negatif enerjiden arınmanın en doğal yolları.',
    content: 'Modern yaşamın en büyük sorunu olan stres, sadece zihnimizi değil, enerji bedenimizi de kirletir. Bioenerji seansları, bu kirliliği temizleyerek yaşam enerjinizin (Prana/Chi) özgürce akmasını sağlar. Kendi başınıza uygulayabileceğiniz basit enerji dengeleme tekniklerini bu makalede bulabilirsiniz...',
    date: '5 Mart 2024',
    author: 'Enerji Terapisti',
    image: 'https://images.unsplash.com/photo-1528319725582-ddc0b6101511?auto=format&fit=crop&q=80&w=800',
    tags: ['Bioenerji', 'Stres', 'Huzur']
  }
];

const FAQ_DATA = [
  {
    question: "Hacamat sonrası iz kalır mı?",
    answer: "Hacamat işlemi sırasında açılan çizikler çok yüzeyseldir. Doğru teknik ve bakım ile genellikle 3-7 gün içinde tamamen iyileşir ve kalıcı bir iz bırakmaz."
  },
  {
    question: "Sülük tedavisi ağrılı mıdır?",
    answer: "Sülük ısırması, sivrisinek ısırığına benzer hafif bir sızı hissettirir. Sülükler ısırdıkları anda doğal bir anestezi salgıladıkları için işlem sırasında ağrı hissedilmez."
  },
  {
    question: "Kimler bu tedavileri yaptıramaz?",
    answer: "Hamileler, aktif kanaması olanlar, ağır anemi hastaları ve organ nakli olmuş kişiler için bazı tedaviler uygun olmayabilir. Randevu öncesi sağlık beyanınız uzmanlarımızca incelenir."
  },
  {
    question: "Ürünleriniz tamamen doğal mı?",
    answer: "Evet, tüm ürünlerimiz %100 doğal içeriklidir. Hiçbir koruyucu, yapay renklendirici veya kimyasal katkı maddesi içermez."
  }
];

const TRANSLATIONS = {
  TR: {
    hero_title: "Ruhunuzu Doğayla Şifalandırın",
    hero_subtitle: "Holistik Şifa & Arınma",
    hero_description: "Beden, zihin ve ruh bütünlüğünüzü kadim şifa yöntemleriyle yeniden keşfedin. Doğanın iyileştirici gücünü hayatınıza davet edin.",
    hero_title_2: "Kadim Bilgelik, Modern Şifa",
    hero_subtitle_2: "Hacamat & Sülük",
    hero_description_2: "Binlerce yıllık tedavi yöntemlerini modern hijyen standartlarıyla buluşturuyoruz.",
    hero_title_3: "İçsel Dengeni Keşfet",
    hero_subtitle_3: "Bioenerji & Hipnoz",
    hero_description_3: "Enerji bedeninizi dengeleyin ve bilinçaltınızdaki engelleri aşın.",
    appointment: "Randevu Al",
    services: "Hizmetlerimiz",
    therapies: "Terapiler",
    products: "Ürünler",
    blog: "Blog",
    about: "Hakkımızda",
    faq: "SSS",
    cart: "Sepet",
    checkout: "Ödeme",
    stats_happy: "Mutlu Danışan",
    stats_years: "Yıllık Deneyim",
    stats_products: "Doğal Ürün",
    stats_methods: "Şifa Yöntemi",
    contact_info: "İletişim Bilgileri",
    address: "İstanbul, Türkiye",
    newsletter_title: "Bültenimize Katılın",
    newsletter_desc: "Şifa dolu ipuçları ve özel teklifler için e-posta listemize kaydolun.",
    footer_desc: "Beden, zihin ve ruh bütünlüğünü korumak için kadim şifa yöntemlerini modern yaşamla buluşturuyoruz. Doğanın gücüne inanın.",
    quick_menu: "Hızlı Menü",
    all_rights: "Tüm hakları saklıdır.",
    privacy: "Gizlilik",
    terms: "Kullanım Koşulları",
    cookies: "Çerezler",
    back_to_shop: "Mağazaya Dön",
    add_to_cart: "Sepete Ekle",
    description: "Açıklama",
    reviews: "Yorumlar",
    how_to_use: "Nasıl Kullanılır?",
    why_us: "Neden Biz?",
    fast_shipping: "Hızlı Kargo",
    secure_payment: "Güvenli Ödeme",
    natural_100: "%100 Doğal",
    related_products: "Benzer Ürünler",
    booking_title: "Randevu Oluştur",
    booking_subtitle: "Şifa Yolculuğu",
    personal_info: "Kişisel Bilgiler",
    health_info: "Sağlık Bilgileri",
    consent: "Onam",
    first_name: "Adınız",
    last_name: "Soyadınız",
    phone: "Telefon",
    email: "E-posta",
    dob: "Doğum Tarihi",
    marital_status: "Medeni Durum",
    single: "Bekar",
    married: "Evli",
    gender: "Cinsiyet",
    female: "Kadın",
    male: "Erkek",
    next: "Sonraki",
    back: "Geri",
    submit: "Randevu Talebi Gönder",
    security_question: "Güvenlik Sorusu",
    appointment_received: "Randevu Talebiniz Alındı",
    appointment_received_desc: "Şifa yolculuğunuzun ilk adımını attınız. Uzman ekibimiz en kısa sürede sizinle iletişime geçerek randevunuzu onaylayacaktır.",
    date: "Tarih",
    time: "Saat",
    back_to_home: "Ana Sayfaya Dön",
    select_service: "Hizmet Seçiniz",
    which_service: "Hangi konuda hizmet almak istiyorsunuz?",
    contact: "İletişim",
  },
  EN: {
    hero_title: "Heal Your Soul with Nature",
    hero_subtitle: "Holistic Healing & Purification",
    hero_description: "Rediscover the integrity of your body, mind and soul with ancient healing methods. Invite the healing power of nature into your life.",
    hero_title_2: "Ancient Wisdom, Modern Healing",
    hero_subtitle_2: "Cupping & Leech Therapy",
    hero_description_2: "We bring together thousands of years of treatment methods with modern hygiene standards.",
    hero_title_3: "Discover Your Inner Balance",
    hero_subtitle_3: "Bioenergy & Hypnosis",
    hero_description_3: "Balance your energy body and overcome obstacles in your subconscious.",
    appointment: "Book Now",
    services: "Our Services",
    therapies: "Therapies",
    products: "Products",
    blog: "Blog",
    about: "About Us",
    faq: "FAQ",
    cart: "Cart",
    checkout: "Checkout",
    stats_happy: "Happy Clients",
    stats_years: "Years Experience",
    stats_products: "Natural Products",
    stats_methods: "Healing Methods",
    contact_info: "Contact Info",
    address: "Istanbul, Turkey",
    newsletter_title: "Join Our Newsletter",
    newsletter_desc: "Sign up for our email list for healing tips and special offers.",
    footer_desc: "We bring ancient healing methods together with modern life to protect the integrity of body, mind and soul. Believe in the power of nature.",
    quick_menu: "Quick Menu",
    all_rights: "All rights reserved.",
    privacy: "Privacy",
    terms: "Terms of Use",
    cookies: "Cookies",
    back_to_shop: "Back to Shop",
    add_to_cart: "Add to Cart",
    description: "Description",
    reviews: "Reviews",
    how_to_use: "How to Use?",
    why_us: "Why Us?",
    fast_shipping: "Fast Shipping",
    secure_payment: "Secure Payment",
    natural_100: "100% Natural",
    related_products: "Related Products",
    booking_title: "Create Appointment",
    booking_subtitle: "Healing Journey",
    personal_info: "Personal Info",
    health_info: "Health Info",
    consent: "Consent",
    first_name: "First Name",
    last_name: "Last Name",
    phone: "Phone",
    email: "Email",
    dob: "Date of Birth",
    marital_status: "Marital Status",
    single: "Single",
    married: "Married",
    gender: "Gender",
    female: "Female",
    male: "Male",
    next: "Next",
    back: "Back",
    submit: "Send Appointment Request",
    security_question: "Security Question",
    appointment_received: "Appointment Request Received",
    appointment_received_desc: "You have taken the first step of your healing journey. Our expert team will contact you as soon as possible to confirm your appointment.",
    date: "Date",
    time: "Time",
    back_to_home: "Back to Home",
    select_service: "Select Service",
    which_service: "Which service would you like to receive?",
    contact: "Contact",
  },
  DE: {
    hero_title: "Heile deine Seele mit der Natur",
    hero_subtitle: "Holistische Heilung & Reinigung",
    hero_description: "Entdecken Sie die Integrität Ihres Körpers, Geistes und Ihrer Seele mit alten Heilmethoden neu. Laden Sie die Heilkraft der Natur in Ihr Leben ein.",
    hero_title_2: "Alte Weisheit, moderne Heilung",
    hero_subtitle_2: "Hacamat & Blutegel",
    hero_description_2: "Wir vereinen jahrtausendealte Behandlungsmethoden mit modernen Hygienestandards.",
    hero_title_3: "Entdecke dein inneres Gleichgewicht",
    hero_subtitle_3: "Bioenergie & Hypnose",
    hero_description_3: "Bringen Sie Ihren Energiekörper ins Gleichgewicht und überwinden Sie Hindernisse in Ihrem Unterbewusstsein.",
    appointment: "Termin Buchen",
    services: "Unsere Dienstleistungen",
    therapies: "Therapien",
    products: "Produkte",
    blog: "Blog",
    about: "Über uns",
    faq: "FAQ",
    cart: "Warenkorb",
    checkout: "Kasse",
    stats_happy: "Zufriedene Kunden",
    stats_years: "Jahre Erfahrung",
    stats_products: "Naturprodukte",
    stats_methods: "Heilmethoden",
    contact_info: "Kontaktinfo",
    address: "Istanbul, Türkei",
    newsletter_title: "Newsletter abonnieren",
    newsletter_desc: "Melden Sie sich für unsere E-Mail-Liste an, um Heilungstipps und Sonderangebote zu erhalten.",
    footer_desc: "Wir bringen alte Heilmethoden mit dem modernen Leben zusammen, um die Integrität von Körper, Geist und Seele zu schützen. Glauben Sie an die Kraft der Natur.",
    quick_menu: "Schnellmenü",
    all_rights: "Alle Rechte vorbehalten.",
    privacy: "Datenschutz",
    terms: "Nutzungsbedingungen",
    cookies: "Cookies",
    back_to_shop: "Zurück zum Shop",
    add_to_cart: "In den Warenkorb",
    description: "Beschreibung",
    reviews: "Bewertungen",
    how_to_use: "Wie benutzt man es?",
    why_us: "Warum wir?",
    fast_shipping: "Schneller Versand",
    secure_payment: "Sichere Bezahlung",
    natural_100: "100% Natürlich",
    related_products: "Ähnliche Produkte",
    booking_title: "Termin erstellen",
    booking_subtitle: "Heilungsreise",
    personal_info: "Persönliche Info",
    health_info: "Gesundheitsinfo",
    consent: "Zustimmung",
    first_name: "Vorname",
    last_name: "Nachname",
    phone: "Telefon",
    email: "E-Mail",
    dob: "Geburtsdatum",
    marital_status: "Familienstand",
    single: "Ledig",
    married: "Verheiratet",
    gender: "Geschlecht",
    female: "Weiblich",
    male: "Männlich",
    next: "Weiter",
    back: "Zurück",
    submit: "Terminanfrage senden",
    security_question: "Sicherheitsfrage",
    appointment_received: "Terminanfrage erhalten",
    appointment_received_desc: "Sie haben den ersten Schritt Ihrer Heilungsreise getan. Unser Expertenteam wird Sie so schnell wie möglich kontaktieren, um Ihren Termin zu bestätigen.",
    date: "Datum",
    time: "Zeit",
    back_to_home: "Zurück zur Startseite",
    select_service: "Service auswählen",
    which_service: "Welchen Service möchten Sie erhalten?",
    contact: "Kontakt",
  },
  ES: {
    hero_title: "Sana tu alma con la naturaleza",
    hero_subtitle: "Sanación Holística y Purificación",
    hero_description: "Redescubre la integridad de tu cuerpo, mente y alma con métodos de sanación ancestrales. Invita al poder curativo de la naturaleza a tu vida.",
    hero_title_2: "Sabiduría Ancestral, Sanación Moderna",
    hero_subtitle_2: "Hacamat y Terapia de Sanguijuelas",
    hero_description_2: "Unimos métodos de tratamiento milenarios con estándares de higiene modernos.",
    hero_title_3: "Descubre tu Equilibrio Interior",
    hero_subtitle_3: "Bioenergía e Hipnosis",
    hero_description_3: "Equilibra tu cuerpo energético y supera los obstáculos en tu subconsciente.",
    appointment: "Reservar Cita",
    services: "Nuestros Servicios",
    therapies: "Terapias",
    products: "Productos",
    blog: "Blog",
    about: "Sobre Nosotros",
    faq: "Preguntas Frecuentes",
    cart: "Carrito",
    checkout: "Pagar",
    stats_happy: "Clientes Felices",
    stats_years: "Años de Experiencia",
    stats_products: "Productos Naturales",
    stats_methods: "Métodos de Sanación",
    contact_info: "Información de Contacto",
    address: "Estambul, Turquía",
    newsletter_title: "Únete a nuestro boletín",
    newsletter_desc: "Regístrate en nuestra lista de correo para recibir consejos de sanación y ofertas especiales.",
    footer_desc: "Unimos métodos de sanación ancestrales con la vida moderna para proteger la integridad del cuerpo, la mente y el alma. Cree en el poder de la naturaleza.",
    quick_menu: "Menú Rápido",
    all_rights: "Todos los derechos reservados.",
    privacy: "Privacidad",
    terms: "Términos de Uso",
    cookies: "Cookies",
    back_to_shop: "Volver a la Tienda",
    add_to_cart: "Añadir al Carrito",
    description: "Descripción",
    reviews: "Reseñas",
    how_to_use: "¿Cómo usar?",
    why_us: "¿Por qué nosotros?",
    fast_shipping: "Envío Rápido",
    secure_payment: "Pago Seguro",
    natural_100: "100% Natural",
    related_products: "Productos Relacionados",
    booking_title: "Crear Cita",
    booking_subtitle: "Viaje de Sanación",
    personal_info: "Información Personal",
    health_info: "Información de Salud",
    consent: "Consentimiento",
    first_name: "Nombre",
    last_name: "Apellido",
    phone: "Teléfono",
    email: "Correo electrónico",
    dob: "Fecha de Nacimiento",
    marital_status: "Estado Civil",
    single: "Soltero/a",
    married: "Casado/a",
    gender: "Género",
    female: "Femenino",
    male: "Masculino",
    next: "Siguiente",
    back: "Atrás",
    submit: "Enviar Solicitud de Cita",
    security_question: "Pregunta de Seguridad",
    appointment_received: "Solicitud de Cita Recibida",
    appointment_received_desc: "Has dado el primer paso de tu viaje de sanación. Nuestro equipo de expertos se pondrá en contacto contigo lo antes posible para confirmar tu cita.",
    date: "Fecha",
    time: "Hora",
    back_to_home: "Volver al Inicio",
    select_service: "Seleccionar Servicio",
    which_service: "¿Qué servicio le gustaría recibir?",
    contact: "Contacto",
  },
  AR: {
    hero_title: "اشفِ روحك بالطبيعة",
    hero_subtitle: "الشفاء الشمولي والتطهير",
    hero_description: "أعد اكتشاف تكامل جسدك وعقلك وروحك مع طرق الشفاء القديمة. ادعُ قوة الطبيعة الشافية إلى حياتك.",
    hero_title_2: "حكمة قديمة، شفاء حديث",
    hero_subtitle_2: "الحجامة والعلاج بالعلق",
    hero_description_2: "نجمع بين طرق العلاج التي تعود لآلاف السنين ومعايير النظافة الحديثة.",
    hero_title_3: "اكتشف توازنك الداخلي",
    hero_subtitle_3: "الطاقة الحيوية والتنويم المغناطيسي",
    hero_description_3: "وازن جسمك الطاقي وتغلب على العقبات في عقلك الباطن.",
    appointment: "احجز موعداً",
    services: "خدماتنا",
    therapies: "العلاجات",
    products: "المنتجات",
    blog: "المدونة",
    about: "حولنا",
    faq: "الأسئلة الشائعة",
    cart: "السلة",
    checkout: "الدفع",
    stats_happy: "عملاء سعداء",
    stats_years: "سنوات الخبرة",
    stats_products: "منتجات طبيعية",
    stats_methods: "طرق الشفاء",
    contact_info: "معلومات الاتصال",
    address: "اسطنبول، تركيا",
    newsletter_title: "انضم إلى نشرتنا الإخبارية",
    newsletter_desc: "اشترك في قائمتنا البريدية للحصول على نصائح الشفاء والعروض الخاصة.",
    footer_desc: "نجمع بين طرق الشفاء القديمة والحياة الحديثة لحماية تكامل الجسد والعقل والروح. آمن بقوة الطبيعة.",
    quick_menu: "قائمة سريعة",
    all_rights: "جميع الحقوق محفوظة.",
    privacy: "الخصوصية",
    terms: "شروط الاستخدام",
    cookies: "ملفات التعريف",
    back_to_shop: "العودة للمتجر",
    add_to_cart: "أضف للسلة",
    description: "الوصف",
    reviews: "المراجعات",
    how_to_use: "كيفية الاستخدام؟",
    why_us: "لماذا نحن؟",
    fast_shipping: "شحن سريع",
    secure_payment: "دفع آمن",
    natural_100: "100% طبيعي",
    related_products: "منتجات ذات صلة",
    booking_title: "إنشاء موعد",
    booking_subtitle: "رحلة الشفاء",
    personal_info: "معلومات شخصية",
    health_info: "معلومات صحية",
    consent: "الموافقة",
    first_name: "الاسم الأول",
    last_name: "الاسم الأخير",
    phone: "الهاتف",
    email: "البريد الإلكتروني",
    dob: "تاريخ الميلاد",
    marital_status: "الحالة الاجتماعية",
    single: "أعزب",
    married: "متزوج",
    gender: "الجنس",
    female: "أنثى",
    male: "ذكر",
    next: "التالي",
    back: "رجوع",
    submit: "إرسال طلب الموعد",
    security_question: "سؤال الأمان",
    appointment_received: "تم استلام طلب الموعد",
    appointment_received_desc: "لقد اتخذت الخطوة الأولى في رحلة الشفاء. سيتصل بك فريق الخبراء لدينا في أقرب وقت ممكن لتأكيد موعدك.",
    date: "التاريخ",
    time: "الوقت",
    back_to_home: "العودة للرئيسية",
    select_service: "اختر الخدمة",
    which_service: "ما هي الخدمة التي ترغب في الحصول عليها؟",
    contact: "اتصل بنا",
  },
  SO: {
    hero_title: "Ku bogsii naftaada dabeecadda",
    hero_subtitle: "Bogsashada Guud & Daahirinta",
    hero_description: "Dib u hel midnimada jidhkaaga, maskaxdaada iyo naftaada adoo isticmaalaya hababkii hore ee bogsashada. Ku martiqaad awoodda bogsashada ee dabeecadda noloshaada.",
    hero_title_2: "Xikmad hore, bogsiin casri ah",
    hero_subtitle_2: "Hacamat & Daaweynta Sülük",
    hero_description_2: "Waxaan isu keenaa hababka daawaynta ee kumanaan sano jiray iyo heerarka nadaafadda casriga ah.",
    hero_title_3: "Baro dheelitirkaaga gudaha",
    hero_subtitle_3: "Bioenergy & Hypnosis",
    hero_description_3: "Isku dheelli tir jidhkaaga tamarta oo ka gudub caqabadaha miyir-qabkaaga.",
    appointment: "Ballan Qabso",
    services: "Adeegyadayada",
    therapies: "Daaweynta",
    products: "Alaabta",
    blog: "Blog",
    about: "Nagu saabsan",
    faq: "Su'aalaha badanaa la is weydiiyo",
    cart: "Gaadhiga",
    checkout: "Bixinta",
    stats_happy: "Macaamiisha Faraxsan",
    stats_years: "Sano Khibrad ah",
    stats_products: "Alaabta Dabiiciga ah",
    stats_methods: "Hababka Bogsashada",
    contact_info: "Macluumaadka Xiriirka",
    address: "Istanbul, Turkiga",
    newsletter_title: "Ku biir warsidahayaga",
    newsletter_desc: "Isku qor liiska iimaylka si aad u hesho talooyinka bogsashada iyo dalabyada gaarka ah.",
    footer_desc: "Waxaan isu keenaa hababkii hore ee bogsashada iyo nolosha casriga ah si loo ilaaliyo midnimada jidhka, maskaxda iyo nafta. Rumayso awoodda dabeecadda.",
    quick_menu: "Menu Degdeg ah",
    all_rights: "Dhammaan xuquuqaha waa la dhawray.",
    privacy: "Qarsoodiga",
    terms: "Shuruudaha Isticmaalka",
    cookies: "Cookies",
    back_to_shop: "Ku laabo Bakhaarka",
    add_to_cart: "Ku dar Gaadhiga",
    description: "Sharaxaadda",
    reviews: "Faallooyinka",
    how_to_use: "Sidee loo isticmaalaa?",
    why_us: "Maxay noo doorteen?",
    fast_shipping: "Rarid Degdeg ah",
    secure_payment: "Lacag bixin ammaan ah",
    natural_100: "100% Dabiici ah",
    related_products: "Alaabta la xiriirta",
    booking_title: "Samee Ballan",
    booking_subtitle: "Safarka Bogsashada",
    personal_info: "Macluumaadka Shakhsi ahaaneed",
    health_info: "Macluumaadka Caafimaadka",
    consent: "Oggolaanshaha",
    first_name: "Magaca Koowaad",
    last_name: "Magaca Dambe",
    phone: "Telefoonka",
    email: "Iimaylka",
    dob: "Taariikhda Dhalashada",
    marital_status: "Xaaladda Guurka",
    single: "Keligiis",
    married: "Guursaday",
    gender: "Jinsiga",
    female: "Dheddig",
    male: "Lab",
    next: "Xiga",
    back: "Dib u laabo",
    submit: "Dir Codsiga Ballanta",
    security_question: "Su'aasha Amniga",
    appointment_received: "Codsiga Ballanta waa la helay",
    appointment_received_desc: "Waxaad qaaday tillaabadii ugu horreysay ee safarkaaga bogsashada. Kooxdayada khubarada ah ayaa kula soo xiriiri doona sida ugu dhaqsaha badan si ay u xaqiijiyaan ballantaada.",
    date: "Taariikhda",
    time: "Waqtiga",
    back_to_home: "Ku laabo Hoyga",
    select_service: "Dooro Adeegga",
    which_service: "Adeeggee ayaad jeclaan lahayd inaad hesho?",
    contact: "Xiriirka",
  },
  UR: {
    hero_title: "فطرت کے ساتھ اپنی روح کو شفا دیں",
    hero_subtitle: "ہولیسٹک شفا اور پاکیزگی",
    hero_description: "قدیم شفا کے طریقوں سے اپنے جسم، دماغ اور روح کی سالمیت کو دوبارہ دریافت کریں۔ فطرت کی شفا بخش طاقت کو اپنی زندگی میں مدعو کریں۔",
    hero_title_2: "قدیم حکمت، جدید شفا",
    hero_subtitle_2: "حجامہ اور جونک تھراپی",
    hero_description_2: "ہم ہزاروں سال پرانے علاج کے طریقوں کو جدید حفظان صحت کے معیارات کے ساتھ لاتے ہیں۔",
    hero_title_3: "اپنا اندرونی توازن دریافت کریں",
    hero_subtitle_3: "بائیو انرجی اور سموہن",
    hero_description_3: "اپنے انرجی باڈی کو متوازن کریں اور اپنے لاشعور کی رکاوٹوں کو دور کریں۔",
    appointment: "ابھی بک کریں",
    services: "ہماری خدمات",
    therapies: "علاج",
    products: "مصنوعات",
    blog: "بلاگ",
    about: "ہمارے بارے میں",
    faq: "سوالات",
    cart: "کارٹ",
    checkout: "چیک آؤٹ",
    stats_happy: "خوش گاہک",
    stats_years: "سالوں کا تجربہ",
    stats_products: "قدرتی مصنوعات",
    stats_methods: "شفا کے طریقے",
    contact_info: "رابطے کی معلومات",
    address: "استنبول، ترکی",
    newsletter_title: "ہمارے نیوز لیٹر میں شامل ہوں",
    newsletter_desc: "شفا کی تجاویز اور خصوصی پیشکشوں کے لیے ہماری ای میل لسٹ میں سائن اپ کریں۔",
    footer_desc: "ہم جسم، دماغ اور روح کی سالمیت کے تحفظ کے لیے قدیم شفا کے طریقوں کو جدید زندگی کے ساتھ جوڑتے ہیں۔ فطرت کی طاقت پر یقین رکھیں۔",
    quick_menu: "فوری مینو",
    all_rights: "جملہ حقوق محفوظ ہیں۔",
    privacy: "رازداری",
    terms: "استعمال کی شرائط",
    cookies: "کوکیز",
    back_to_shop: "دکان پر واپس جائیں",
    add_to_cart: "کارٹ میں شامل کریں",
    description: "تفصیل",
    reviews: "جائزے",
    how_to_use: "استعمال کیسے کریں؟",
    why_us: "ہم کیوں؟",
    fast_shipping: "تیز ترسیل",
    secure_payment: "محفوظ ادائیگی",
    natural_100: "100% قدرتی",
    related_products: "متعلقہ مصنوعات",
    booking_title: "اپائنٹمنٹ بنائیں",
    booking_subtitle: "شفا کا سفر",
    personal_info: "ذاتی معلومات",
    health_info: "صحت کی معلومات",
    consent: "رضامندی",
    first_name: "پہلا نام",
    last_name: "آخری نام",
    phone: "فون",
    email: "ای میل",
    dob: "تاریخ پیدائش",
    marital_status: "ازدواجی حیثیت",
    single: "غیر شادی شدہ",
    married: "شادی شدہ",
    gender: "جنس",
    female: "خاتون",
    male: "مرد",
    next: "اگلا",
    back: "پیچھے",
    submit: "اپائنٹمنٹ کی درخواست بھیجیں",
    security_question: "سیکیورٹی سوال",
    appointment_received: "اپائنٹمنٹ کی درخواست موصول ہوئی",
    appointment_received_desc: "آپ نے اپنے شفا کے سفر کا پہلا قدم اٹھایا ہے۔ ہماری ماہر ٹیم آپ کی اپائنٹمنٹ کی تصدیق کے لیے جلد از جلد آپ سے رابطہ کرے گی۔",
    date: "تاریخ",
    time: "وقت",
    back_to_home: "ہوم پر واپس جائیں",
    select_service: "سروس منتخب کریں",
    which_service: "آپ کون سی سروس حاصل کرنا چاہیں گے؟",
    contact: "رابطہ کریں",
  }
};

const HERO_SLIDES = [
  {
    title_key: "hero_title",
    subtitle_key: "hero_subtitle",
    desc_key: "hero_description",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800"
  },
  {
    title_key: "hero_title_2",
    subtitle_key: "hero_subtitle_2",
    desc_key: "hero_description_2",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800"
  },
  {
    title_key: "hero_title_3",
    subtitle_key: "hero_subtitle_3",
    desc_key: "hero_description_3",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800"
  }
];

// --- Components ---

const TopBar = ({ lang, setLang, isDark, setIsDark, isScrolled }: { lang: string, setLang: (l: string) => void, isDark: boolean, setIsDark: (d: boolean) => void, isScrolled: boolean }) => {
  const languages = [
    { code: 'TR', label: 'TR' },
    { code: 'EN', label: 'EN' },
    { code: 'DE', label: 'DE' },
    { code: 'ES', label: 'ES' },
    { code: 'AR', label: 'AR' },
    { code: 'SO', label: 'SO' },
    { code: 'UR', label: 'UR' }
  ];

  return (
    <div className={cn(
      "fixed top-0 left-0 right-0 z-[70] bg-brand-deep-green dark:bg-black text-brand-cream/60 py-2 px-6 hidden lg:block border-b border-white/5 transition-all duration-500 h-10",
      isScrolled ? "opacity-0 pointer-events-none -translate-y-full" : "opacity-100 translate-y-0"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center text-[9px] font-bold uppercase tracking-[0.2em]">
        <div className="flex gap-8">
          <div className="flex items-center gap-2">
            <Mail className="w-3 h-3 text-brand-gold" />
            <span>info@holisticheals.net</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-3 h-3 text-brand-gold" />
            <span>Kadim Şifa Merkezi</span>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 border-r border-white/10 pr-8">
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-1 hover:text-brand-gold transition-colors"
            >
              {isDark ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
            </button>
            <div className="flex gap-3">
              {languages.map((l) => (
                <button 
                  key={l.code} 
                  onClick={() => setLang(l.code)}
                  className={cn("hover:text-brand-gold transition-colors cursor-pointer", lang === l.code && "text-brand-gold")}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">Instagram</a>
            <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">Whatsapp</a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ onBookingClick, onCartClick, cartCount, lang, onNavClick, isScrolled }: { onBookingClick: () => void, onCartClick: () => void, cartCount: number, lang: string, onNavClick: (id: string) => void, isScrolled: boolean }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const t = (key: string) => TRANSLATIONS[lang as keyof typeof TRANSLATIONS][key as keyof typeof TRANSLATIONS['TR']] || key;

  const navItems = [
    { id: 'terapiler', label: t('therapies') },
    { id: 'urunler', label: t('products') },
    { id: 'blog', label: t('blog') },
    { id: 'hakkımızda', label: t('about') },
    { id: 'sss', label: t('faq') },
    { id: 'iletisim', label: t('contact') }
  ];

  return (
    <nav className={cn(
      "fixed left-0 right-0 z-60 transition-all duration-500 px-6",
      isScrolled 
        ? "top-0 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-brand-forest/10 py-3 shadow-md" 
        : "top-0 lg:top-10 bg-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button 
          onClick={() => onNavClick('hero')}
          className="flex items-center gap-3 group"
        >
          <div className="bg-brand-forest/10 p-2 rounded-full">
            <Flower2 className="w-6 h-6 text-brand-forest transition-transform group-hover:rotate-45" />
          </div>
          <span className="text-xl font-serif font-bold tracking-tight text-brand-deep-green dark:text-white uppercase transition-colors">Holistic Heals</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button 
              key={item.id} 
              onClick={() => onNavClick(item.id)}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-deep-green dark:text-brand-cream/70 hover:text-brand-forest dark:hover:text-brand-gold transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-gold transition-all group-hover:w-full" />
            </button>
          ))}
          
          <button 
            onClick={onCartClick}
            className="relative p-2 text-brand-deep-green dark:text-brand-cream hover:text-brand-gold transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-deep-green text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                {cartCount}
              </span>
            )}
          </button>

          <button 
            onClick={onBookingClick}
            className="bg-brand-forest text-white px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-brand-deep-green transition-all shadow-lg shadow-brand-forest/10"
          >
            {t('appointment')}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-brand-forest p-2 hover:bg-brand-forest/5 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-brand-cream dark:bg-black border-b border-brand-forest/10 p-8 md:hidden flex flex-col gap-6 shadow-2xl overflow-hidden"
          >
            {navItems.map((item) => (
              <button 
                key={item.id} 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavClick(item.id);
                }}
                className="text-sm font-bold uppercase tracking-widest text-brand-deep-green dark:text-brand-cream text-left"
              >
                {item.label}
              </button>
            ))}
            <button 
              className="bg-brand-forest text-white px-6 py-4 rounded-full text-xs font-bold uppercase tracking-widest"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onBookingClick();
              }}
            >
              Randevu Al
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onBookingClick, onNavClick, lang }: { onBookingClick: () => void, onNavClick: (id: string) => void, lang: string }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const t = (key: string) => TRANSLATIONS[lang as keyof typeof TRANSLATIONS][key as keyof typeof TRANSLATIONS['TR']] || key;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-[600px] md:h-[75vh] flex items-center overflow-hidden bg-brand-deep-green pt-28 pb-20">
      {/* Background with subtle pattern and image */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={HERO_SLIDES[currentSlide].image} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-deep-green/80 via-brand-deep-green/40 to-brand-deep-green" />
        </motion.div>
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-8">
                <Sparkles className="w-4 h-4 text-brand-gold" />
                <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.3em]">
                  {t(HERO_SLIDES[currentSlide].subtitle_key)}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.1] mb-8">
                {t(HERO_SLIDES[currentSlide].title_key)}
              </h1>
              <p className="text-brand-cream/70 max-w-lg mb-10 text-base md:text-lg font-light leading-relaxed">
                {t(HERO_SLIDES[currentSlide].desc_key)}
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={onBookingClick}
                  className="bg-brand-gold text-brand-deep-green px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-brand-gold/10"
                >
                  {t('appointment')}
                </button>
                <button 
                  onClick={() => onNavClick('terapiler')}
                  className="border border-white/20 text-white px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-sm"
                >
                  {t('services')}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="hidden lg:block relative">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 rounded-[30px] overflow-hidden border-4 border-white/10 shadow-2xl aspect-[16/10] max-w-lg ml-auto"
              >
                <img 
                  src={HERO_SLIDES[currentSlide].image} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Slider Controls */}
            <div className="absolute -bottom-12 right-0 flex gap-4 z-20">
              <button 
                onClick={prevSlide}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-brand-gold hover:border-brand-gold hover:text-brand-deep-green transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={nextSlide}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-brand-gold hover:border-brand-gold hover:text-brand-deep-green transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TrustBar = ({ lang }: { lang: string }) => {
  const t = (key: string) => TRANSLATIONS[lang as keyof typeof TRANSLATIONS][key as keyof typeof TRANSLATIONS['TR']] || key;
  const stats = [
    { label: t('stats_happy'), value: '2500+' },
    { label: t('stats_years'), value: '15+' },
    { label: t('stats_products'), value: '50+' },
    { label: t('stats_methods'), value: '12+' },
  ];

  return (
    <div className="bg-white border-y border-brand-forest/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((s, i) => (
            <div key={i} className="text-center group">
              <div className="text-3xl md:text-4xl font-serif text-brand-deep-green mb-2 group-hover:text-brand-gold transition-colors">{s.value}</div>
              <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-earth/40">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SectionHeader = ({ title, subtitle, align = 'center' }: { title: string, subtitle: string, align?: 'center' | 'left' }) => (
  <div className={cn("mb-4 md:mb-6", align === 'center' ? "text-center" : "text-left")}>
    <div className={cn("flex items-center gap-3 mb-1", align === 'center' ? "justify-center" : "justify-start")}>
      <div className="h-[1px] w-6 bg-brand-forest/10" />
      <Flower2 className="w-3 h-3 text-brand-forest/30" />
      <span className="text-brand-forest font-bold tracking-[0.2em] uppercase text-[7px] md:text-[8px]">
        {subtitle}
      </span>
      <Flower2 className="w-3 h-3 text-brand-forest/30" />
      <div className="h-[1px] w-6 bg-brand-forest/10" />
    </div>
    <h2 className="text-xl md:text-2xl font-serif text-brand-deep-green tracking-tight leading-tight">
      {title}
    </h2>
  </div>
);

const Therapies = ({ onBookingClick, onTherapyClick }: { onBookingClick: () => void, onTherapyClick: (t: Therapy) => void }) => {
  return (
    <section id="terapiler" className="py-6 md:py-10 bg-brand-cream/20 dark:bg-black transition-colors relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-forest/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader title="Şifa Uygulamalarımız" subtitle="Hizmetlerimiz" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {THERAPIES.map((therapy, i) => (
            <motion.div
              key={therapy.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 shadow-md">
                <img 
                  src={therapy.image} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  referrerPolicy="no-referrer" 
                />
                <div className="absolute inset-0 bg-brand-deep-green/60 group-hover:bg-brand-deep-green/80 transition-all duration-500 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100">
                  <p className="text-white text-[11px] font-light leading-relaxed mb-3">
                    {therapy.description}
                  </p>
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onTherapyClick(therapy);
                      }}
                      className="flex items-center justify-between w-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-[9px] font-bold uppercase tracking-widest p-3 rounded-xl transition-all"
                    >
                      Detayları Gör <ArrowRight className="w-3 h-3" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onBookingClick();
                      }}
                      className="flex items-center justify-between w-full bg-brand-gold text-brand-deep-green text-[9px] font-bold uppercase tracking-widest p-3 rounded-xl hover:bg-white transition-all"
                    >
                      Randevu Al <Calendar className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center text-white border border-white/20">
                  {therapy.icon}
                </div>
              </div>
              <h3 className="text-lg font-serif text-brand-deep-green group-hover:text-brand-gold transition-colors text-center">
                {therapy.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Products = ({ onProductClick }: { onProductClick: (product: Product) => void }) => {
  return (
    <section id="urunler" className="py-6 md:py-10 bg-white dark:bg-black transition-colors relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <SectionHeader title="Doğal Şifa Ürünleri" subtitle="Mağaza" align="left" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onProductClick(product)}
              className="group bg-white p-4 rounded-2xl border border-brand-forest/5 shadow-sm hover:shadow-lg transition-all duration-500 cursor-pointer"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden bg-brand-forest/5 mb-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-deep-green/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <button className="absolute bottom-3 left-3 right-3 bg-white py-2.5 rounded-lg text-[8px] font-bold uppercase tracking-widest text-brand-deep-green opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 shadow-lg">
                  Detayları Gör
                </button>
              </div>
              <div className="px-1 pb-1">
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-1 block">
                  {product.category}
                </span>
                <h3 className="font-serif text-base text-brand-deep-green mb-1">
                  {product.name}
                </h3>
                <p className="text-brand-forest font-bold text-sm">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductDetail = ({ product, onBack, onProductClick, onAddToCart }: { product: Product, onBack: () => void, onProductClick: (product: Product) => void, onAddToCart: (product: Product, quantity: number) => void }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
  const [quantity, setQuantity] = useState(1);
  
  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 px-6 max-w-7xl mx-auto"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-deep-green mb-12 hover:text-brand-gold transition-colors group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Mağazaya Dön
      </button>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-24">
        {/* Image Gallery */}
        <div className="space-y-6">
          <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl bg-white border border-brand-forest/5 group">
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentImg}
                src={product.images[currentImg]} 
                alt={product.name} 
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            
            {product.images.length > 1 && (
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => setCurrentImg((prev) => (prev - 1 + product.images.length) % product.images.length)}
                  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-lg flex items-center justify-center text-brand-deep-green hover:bg-brand-gold hover:text-white transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setCurrentImg((prev) => (prev + 1) % product.images.length)}
                  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-lg flex items-center justify-center text-brand-deep-green hover:bg-brand-gold hover:text-white transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
          
          {/* Thumbnails */}
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImg(idx)}
                className={cn(
                  "relative w-24 h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0",
                  currentImg === idx ? "border-brand-gold scale-95 shadow-lg" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-gold">
              {product.category}
            </span>
            <div className="h-[1px] flex-1 bg-brand-forest/10" />
            <div className="flex items-center gap-1 text-brand-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
              ))}
              <span className="text-[10px] font-bold ml-2 text-brand-earth/40">({product.reviews.length} Yorum)</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif text-brand-deep-green mb-4 leading-tight">
            {product.name}
          </h1>
          
          <div className="text-3xl font-bold text-brand-forest mb-8 flex items-baseline gap-3">
            {product.price}
            <span className="text-sm font-light text-brand-earth/40 line-through">₺{parseInt(product.price.replace('₺', '')) + 100}.00</span>
          </div>
          
          <p className="text-brand-earth/70 mb-10 text-lg font-light leading-relaxed italic border-l-2 border-brand-gold/30 pl-6">
            "{product.description}"
          </p>

          <div className="grid grid-cols-2 gap-4 mb-10">
            {product.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs text-brand-deep-green/80 font-medium">
                <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                {feature}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <div className="flex items-center bg-white dark:bg-white/5 border border-brand-forest/10 rounded-full px-6 py-2">
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="text-brand-deep-green dark:text-brand-cream hover:text-brand-gold p-2"
              >
                -
              </button>
              <span className="w-12 text-center text-sm font-bold text-brand-deep-green dark:text-white">{quantity}</span>
              <button 
                onClick={() => setQuantity(prev => prev + 1)}
                className="text-brand-deep-green dark:text-brand-cream hover:text-brand-gold p-2"
              >
                +
              </button>
            </div>
            <button 
              onClick={() => onAddToCart(product, quantity)}
              className="flex-1 bg-brand-deep-green text-white px-10 py-5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-brand-forest transition-all shadow-xl flex items-center justify-center gap-3 group"
            >
              <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Sepete Ekle
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-brand-forest/10">
            <div className="text-center">
              <Wind className="w-5 h-5 text-brand-gold mx-auto mb-2" />
              <span className="text-[8px] font-bold uppercase tracking-widest text-brand-earth/60">Hızlı Kargo</span>
            </div>
            <div className="text-center">
              <Droplets className="w-5 h-5 text-brand-gold mx-auto mb-2" />
              <span className="text-[8px] font-bold uppercase tracking-widest text-brand-earth/60">Güvenli Ödeme</span>
            </div>
            <div className="text-center">
              <Leaf className="w-5 h-5 text-brand-gold mx-auto mb-2" />
              <span className="text-[8px] font-bold uppercase tracking-widest text-brand-earth/60">%100 Doğal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mb-24">
        <div className="flex justify-center gap-12 border-b border-brand-forest/10 mb-12">
          <button 
            onClick={() => setActiveTab('description')}
            className={cn(
              "pb-6 text-[10px] font-bold uppercase tracking-[0.3em] transition-all relative",
              activeTab === 'description' ? "text-brand-deep-green" : "text-brand-earth/40 hover:text-brand-deep-green"
            )}
          >
            Ürün Açıklaması
            {activeTab === 'description' && (
              <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-gold" />
            )}
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={cn(
              "pb-6 text-[10px] font-bold uppercase tracking-[0.3em] transition-all relative",
              activeTab === 'reviews' ? "text-brand-deep-green" : "text-brand-earth/40 hover:text-brand-deep-green"
            )}
          >
            Danışan Yorumları ({product.reviews.length})
            {activeTab === 'reviews' && (
              <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-gold" />
            )}
          </button>
        </div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'description' ? (
              <motion.div
                key="desc"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="prose prose-lg max-w-none text-brand-earth/70 font-light leading-relaxed"
              >
                <p className="text-xl text-brand-deep-green font-serif mb-6">{product.fullDescription}</p>
                <p>Holistic Heals olarak, her ürünümüzü doğanın bize sunduğu en saf haliyle size ulaştırmayı hedefliyoruz. Bu ürün, sürdürülebilir tarım yöntemleriyle yetiştirilen bitkilerden, geleneksel şifa bilgilerimiz ve modern kalite standartlarımız birleştirilerek hazırlanmıştır.</p>
                <div className="grid md:grid-cols-2 gap-8 mt-12">
                  <div className="bg-brand-forest/5 p-8 rounded-3xl border border-brand-forest/10">
                    <h4 className="font-serif text-brand-deep-green text-xl mb-4">Nasıl Kullanılır?</h4>
                    <p className="text-sm">Günde 1-2 kez, tercihen aç karnına bir tatlı kaşığı tüketilmesi önerilir. Salatalara veya yoğurda ekleyerek de kullanabilirsiniz. Serin ve karanlık bir yerde muhafaza ediniz.</p>
                  </div>
                  <div className="bg-brand-gold/5 p-8 rounded-3xl border border-brand-gold/10">
                    <h4 className="font-serif text-brand-deep-green text-xl mb-4">Neden Biz?</h4>
                    <p className="text-sm">Ürünlerimiz hiçbir katkı maddesi, koruyucu veya yapay renklendirici içermez. Her parti ürün, enerji dengelenmesi yapılarak paketlenir.</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                {product.reviews.map((review, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-3xl border border-brand-forest/5 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-serif text-brand-deep-green text-lg">{review.user}</h4>
                        <div className="flex gap-1 text-brand-gold mt-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-brand-earth/30 uppercase tracking-widest">{review.date}</span>
                    </div>
                    <p className="text-brand-earth/70 font-light leading-relaxed italic">"{review.comment}"</p>
                  </div>
                ))}
                
                <div className="pt-12 text-center">
                  <button className="text-[10px] font-bold uppercase tracking-widest text-brand-deep-green hover:text-brand-gold transition-colors flex items-center gap-2 mx-auto">
                    <MessageCircle className="w-4 h-4" />
                    Yorum Yapmak İster misiniz?
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Related Products */}
      <div>
        <div className="flex items-center justify-between mb-12">
          <SectionHeader title="Sizin İçin Seçtiklerimiz" subtitle="Benzer Ürünler" align="left" />
          <div className="h-[1px] flex-1 mx-12 bg-brand-forest/10 hidden md:block" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => onProductClick(p)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 shadow-md bg-white">
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-deep-green/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h4 className="font-serif text-brand-deep-green group-hover:text-brand-gold transition-colors text-center mb-1">{p.name}</h4>
              <p className="text-brand-forest font-bold text-xs text-center">{p.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const THERAPY_FORMS = {
  'Hacamat (Kupa Terapisi)': {
    description: 'Kupa terapisi (Hacamat), ciltte vakum oluşturarak toksinlerin veya kirli kanın vücuttan atılmasını sağlayan bir yöntemdir. Bu teknik dolaşımı artırmak, kılcal damarları temizlemek ve tıkalı damarları açmak için kullanılır.',
    risks: [
      { id: 'bleedingDisorders', label: 'Kanama Bozuklukları (Hemofili vb.)' },
      { id: 'anemia', label: 'Anemi (Kansızlık)' },
      { id: 'pacemaker', label: 'Kalp Pili' },
      { id: 'heartDisease', label: 'Kalp Hastalığı' },
      { id: 'highBP', label: 'Yüksek Tansiyon' },
      { id: 'diabetes', label: 'Diyabet' },
      { id: 'pregnancy', label: 'Hamilelik' },
      { id: 'skinInfection', label: 'Cilt Enfeksiyonu' }
    ],
    instructions: {
      pre: [
        'Randevudan en az 24 saat önce hayvansal gıda tüketimini bırakın.',
        'Aç karnına gelin (en az 3 saatlik açlık).',
        'Kan sulandırıcı ilaç kullanıyorsanız doktorunuza danışın.'
      ],
      post: [
        '24 saat boyunca banyo yapmayın.',
        '24 saat boyunca hayvansal gıda tüketmeyin.',
        'Uygulama bölgesini temiz tutun.'
      ]
    }
  },
  'Sülük Tedavisi': {
    description: 'Sülük tedavisi (Hirudoterapi), tıbbi sülüklerin salgıladığı biyoaktif maddeler aracılığıyla kanın temizlenmesi ve dolaşımın düzenlenmesi işlemidir.',
    risks: [
      { id: 'bleedingDisorders', label: 'Kanama Bozuklukları' },
      { id: 'sensitivity', label: 'Sülük Isırığına Karşı Aşırı Hassasiyet' },
      { id: 'circulatory', label: 'Dolaşım Problemleri' },
      { id: 'diabetes', label: 'Diyabet' },
      { id: 'chemo', label: 'Kemoterapi veya Radyoterapi' },
      { id: 'skinDiseases', label: 'Cilt Hastalıkları' },
      { id: 'pregnancy', label: 'Hamilelik' }
    ],
    instructions: {
      pre: [
        '3 gün önce kan sulandırıcıları bırakın.',
        'Parfüm veya kokulu sabun kullanmayın.',
        'Rahat kıyafetler tercih edin.'
      ],
      post: [
        'Kanamanın 24 saat sürebileceğini unutmayın.',
        '12 saat ağır iş yapmayın.',
        '24 saat sonra pansumanı değiştirin.'
      ]
    }
  }
};

const BookingForm = ({ therapy: initialTherapy, onBack, lang }: { therapy: Therapy | null, onBack: () => void, lang: string }) => {
  const [step, setStep] = useState(initialTherapy ? 1 : 0);
  const [selectedTherapy, setSelectedTherapy] = useState<Therapy | null>(initialTherapy);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaQuestion, setCaptchaQuestion] = useState({ q: '5 + 3', a: 8 });
  
  const t = (key: string) => TRANSLATIONS[lang as keyof typeof TRANSLATIONS][key as keyof typeof TRANSLATIONS['TR']] || key;

  const therapyData = selectedTherapy ? (THERAPY_FORMS[selectedTherapy.title as keyof typeof THERAPY_FORMS] || THERAPY_FORMS['Hacamat (Kupa Terapisi)']) : THERAPY_FORMS['Hacamat (Kupa Terapisi)'];

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    dob: '',
    status: 'Single',
    gender: 'Female',
    clottingIssues: false,
    hivPositive: false,
    hepatitisBC: false,
    noHealthProblems: false,
    healthDeclarationAccepted: false,
    treatmentReasons: '',
    healthConditions: {} as Record<string, boolean>,
    finalConsentAccepted: false,
    appointmentDate: '',
    appointmentTime: '',
    serviceLocation: 'Treatment Center'
  });

  useEffect(() => {
    const n1 = Math.floor(Math.random() * 10);
    const n2 = Math.floor(Math.random() * 10);
    setCaptchaQuestion({ q: `${n1} + ${n2}`, a: n1 + n2 });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNestedCheckboxChange = (category: string, id: string) => {
    setFormData(prev => ({
      ...prev,
      //@ts-ignore
      [category]: {
        //@ts-ignore
        ...prev[category],
        //@ts-ignore
        [id]: !prev[category][id]
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(captchaAnswer) !== captchaQuestion.a) {
      alert(t('security_question') + ' ' + t('wrong_answer'));
      return;
    }
    setIsSubmitted(true);
  };

  const steps = [
    { id: 0, title: t('select_service'), icon: <Sparkles className="w-5 h-5" /> },
    { id: 1, title: t('personal_info'), icon: <User className="w-5 h-5" /> },
    { id: 2, title: t('health_info'), icon: <Heart className="w-5 h-5" /> },
    { id: 3, title: t('consent'), icon: <ShieldCheck className="w-5 h-5" /> }
  ];

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="pt-32 pb-20 px-6 max-w-2xl mx-auto text-center"
      >
        <div className="bg-white dark:bg-black rounded-[40px] p-12 shadow-2xl border border-brand-forest/5">
          <div className="w-20 h-20 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="w-10 h-10 text-brand-gold" />
          </div>
          <h2 className="text-3xl font-serif text-brand-deep-green dark:text-brand-cream mb-4">
            {t('appointment_received')}
          </h2>
          <p className="text-brand-forest dark:text-brand-cream/60 mb-8">
            {t('appointment_received_desc')}
          </p>
          
          <div className="bg-brand-forest/5 rounded-2xl p-6 mb-8 text-left space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-brand-forest/60">{t('first_name')}:</span>
              <span className="font-bold text-brand-deep-green dark:text-brand-cream">{formData.firstName} {formData.lastName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-brand-forest/60">{t('therapies')}:</span>
              <span className="font-bold text-brand-deep-green dark:text-brand-cream">{selectedTherapy?.title}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-brand-forest/60">{t('date')}:</span>
              <span className="font-bold text-brand-deep-green dark:text-brand-cream">{formData.appointmentDate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-brand-forest/60">{t('time')}:</span>
              <span className="font-bold text-brand-deep-green dark:text-brand-cream">{formData.appointmentTime}</span>
            </div>
          </div>

          <button 
            onClick={onBack}
            className="bg-brand-deep-green text-white px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-brand-gold transition-all"
          >
            {t('back_to_home')}
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 px-6 max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-4">
          <Calendar className="w-4 h-4 text-brand-gold" />
          <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.3em]">
            {t('booking_subtitle')}
          </span>
        </div>
        <h1 className="text-4xl font-serif text-brand-deep-green dark:text-brand-cream mb-4">
          {t('booking_title')}
        </h1>
        {selectedTherapy && (
          <p className="text-brand-gold font-serif text-xl italic">
            {selectedTherapy.title}
          </p>
        )}
      </div>

      {/* Stepper */}
      <div className="flex justify-between items-center mb-12 relative max-w-2xl mx-auto">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-brand-forest/10 -translate-y-1/2 z-0" />
        {steps.map((s, i) => (
          <div key={s.id} className="relative z-10 flex flex-col items-center gap-3">
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 border-2",
              step >= s.id 
                ? "bg-brand-gold border-brand-gold text-brand-deep-green shadow-lg shadow-brand-gold/20" 
                : "bg-white dark:bg-black border-brand-forest/10 text-brand-forest/40"
            )}>
              {step > s.id ? <Check className="w-6 h-6" /> : s.icon}
            </div>
            <span className={cn(
              "text-[9px] font-bold uppercase tracking-widest",
              step >= s.id ? "text-brand-deep-green dark:text-brand-cream" : "text-brand-forest/40"
            )}>
              {s.title}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-black rounded-[40px] p-8 md:p-12 shadow-2xl border border-brand-forest/5">
        <form onSubmit={handleSubmit}>
          {step === 0 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-serif text-brand-deep-green dark:text-brand-cream">
                  {t('which_service')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto pt-6">
                  {THERAPIES.map((th) => (
                    <button
                      key={th.id}
                      type="button"
                      onClick={() => {
                        setSelectedTherapy(th);
                        setStep(1);
                      }}
                      className={cn(
                        "p-6 rounded-2xl border-2 transition-all text-left group",
                        selectedTherapy?.id === th.id
                          ? "border-brand-gold bg-brand-gold/5"
                          : "border-brand-forest/10 hover:border-brand-gold/50"
                      )}
                    >
                      <h4 className="font-serif text-lg text-brand-deep-green dark:text-brand-cream group-hover:text-brand-gold transition-colors">
                        {th.title}
                      </h4>
                      <p className="text-xs text-brand-forest/60 dark:text-brand-cream/40 mt-2 line-clamp-2">
                        {th.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-forest/60 ml-1">{t('first_name')}</label>
                <input 
                  type="text" 
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full bg-brand-forest/5 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-gold transition-all dark:text-white" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-forest/60 ml-1">{t('last_name')}</label>
                <input 
                  type="text" 
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full bg-brand-forest/5 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-gold transition-all dark:text-white" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-forest/60 ml-1">{t('phone')}</label>
                <input 
                  type="tel" 
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-brand-forest/5 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-gold transition-all dark:text-white" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-forest/60 ml-1">{t('email')}</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-brand-forest/5 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-gold transition-all dark:text-white" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-forest/60 ml-1">{t('dob')}</label>
                <input 
                  type="date" 
                  name="dob"
                  required
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full bg-brand-forest/5 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-gold transition-all dark:text-white" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-forest/60 ml-1">{t('marital_status')}</label>
                <select 
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full bg-brand-forest/5 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-gold transition-all dark:text-white"
                >
                  <option value="Single">{t('single')}</option>
                  <option value="Married">{t('married')}</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-forest/60 ml-1">{t('gender')}</label>
                <select 
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full bg-brand-forest/5 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-gold transition-all dark:text-white"
                >
                  <option value="Female">{t('female')}</option>
                  <option value="Male">{t('male')}</option>
                </select>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {therapyData.risks.map((risk) => (
                  <label key={risk.id} className="flex items-center gap-4 p-4 rounded-2xl bg-brand-forest/5 cursor-pointer hover:bg-brand-forest/10 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={formData.healthConditions[risk.id] || false}
                      onChange={() => handleNestedCheckboxChange('healthConditions', risk.id)}
                      className="w-5 h-5 rounded border-brand-forest/20 text-brand-gold focus:ring-brand-gold" 
                    />
                    <span className="text-sm text-brand-deep-green dark:text-brand-cream">{risk.label}</span>
                  </label>
                ))}
              </div>

              <div className="space-y-4 pt-4 border-t border-brand-forest/10">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 pt-1">
                    <input 
                      type="checkbox" 
                      name="healthDeclarationAccepted"
                      required
                      checked={formData.healthDeclarationAccepted}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded border-brand-forest/20 text-brand-gold focus:ring-brand-gold" 
                    />
                  </div>
                  <p className="text-xs text-brand-forest/60 dark:text-brand-cream/60 leading-relaxed">
                    Yukarıda belirttiğim sağlık durumlarımın doğru olduğunu, herhangi bir sağlık sorunumu gizlemediğimi beyan ederim.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="bg-brand-forest/5 rounded-[30px] p-8 space-y-6">
                <div className="flex items-center gap-3 text-brand-gold mb-4">
                  <AlertCircle className="w-5 h-5" />
                  <h4 className="font-serif text-lg">Önemli Bilgilendirme</h4>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h5 className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-3">Uygulama Öncesi</h5>
                    <ul className="space-y-2">
                      {therapyData.instructions.pre.map((inst, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-brand-forest/70 dark:text-brand-cream/70">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-1.5 flex-shrink-0" />
                          {inst}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-3">Uygulama Sonrası</h5>
                    <ul className="space-y-2">
                      {therapyData.instructions.post.map((inst, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-brand-forest/70 dark:text-brand-cream/70">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-1.5 flex-shrink-0" />
                          {inst}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-forest/60 ml-1">{t('date')}</label>
                  <input 
                    type="date" 
                    name="appointmentDate"
                    required
                    value={formData.appointmentDate}
                    onChange={handleInputChange}
                    className="w-full bg-brand-forest/5 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-gold transition-all dark:text-white" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-forest/60 ml-1">{t('time')}</label>
                  <select 
                    name="appointmentTime"
                    required
                    value={formData.appointmentTime}
                    onChange={handleInputChange}
                    className="w-full bg-brand-forest/5 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-gold transition-all dark:text-white"
                  >
                    <option value="">Seçiniz</option>
                    <option value="09:00">09:00</option>
                    <option value="11:00">11:00</option>
                    <option value="14:00">14:00</option>
                    <option value="16:00">16:00</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6 pt-4 border-t border-brand-forest/10">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 pt-1">
                    <input 
                      type="checkbox" 
                      name="finalConsentAccepted"
                      required
                      checked={formData.finalConsentAccepted}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded border-brand-forest/20 text-brand-gold focus:ring-brand-gold" 
                    />
                  </div>
                  <p className="text-xs text-brand-forest/60 dark:text-brand-cream/60 leading-relaxed">
                    Uygulama risklerini, öncesi ve sonrası dikkat edilmesi gerekenleri okudum ve kabul ediyorum.
                  </p>
                </div>

                <div className="bg-brand-gold/5 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
                  <div className="text-center md:text-left">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-1">{t('security_question')}</p>
                    <p className="text-xl font-serif text-brand-deep-green dark:text-brand-cream">{captchaQuestion.q} = ?</p>
                  </div>
                  <input 
                    type="number" 
                    required
                    placeholder="?"
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    className="w-24 bg-white dark:bg-black border-2 border-brand-gold/20 rounded-xl px-4 py-3 text-center focus:ring-2 focus:ring-brand-gold transition-all dark:text-white" 
                  />
                </div>
              </div>
            </motion.div>
          )}

          <div className="flex justify-between mt-12">
            {step > 0 ? (
              <button 
                type="button"
                onClick={() => setStep(prev => prev - 1)}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-forest/60 hover:text-brand-gold transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                {t('back')}
              </button>
            ) : (
              <button 
                type="button"
                onClick={onBack}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-forest/60 hover:text-brand-gold transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                {t('back_to_home')}
              </button>
            )}
            
            {step < 3 ? (
              step !== 0 && (
                <button 
                  type="button"
                  onClick={() => setStep(prev => prev + 1)}
                  className="bg-brand-deep-green text-white px-10 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-brand-gold transition-all shadow-xl shadow-brand-deep-green/10"
                >
                  {t('next')}
                </button>
              )
            ) : (
              <button 
                type="submit"
                className="bg-brand-gold text-brand-deep-green px-10 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-brand-deep-green hover:text-white transition-all shadow-xl shadow-brand-gold/20"
              >
                {t('submit')}
              </button>
            )}
          </div>
        </form>
      </div>
    </motion.div>
  );
};

const TherapyDetail = ({ therapy, onBack, onBookingClick }: { therapy: Therapy, onBack: () => void, onBookingClick: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 px-6 max-w-7xl mx-auto"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-deep-green dark:text-brand-gold mb-12 hover:opacity-70 transition-all group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Terapilere Dön
      </button>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="relative">
          <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border-8 border-white/10">
            <img 
              src={therapy.image} 
              alt={therapy.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute top-6 right-6 w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-white">
            {therapy.icon}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-gold">
              Şifa Uygulaması
            </span>
            <div className="h-[1px] flex-1 bg-brand-forest/10" />
            <div className="flex items-center gap-2 text-brand-earth/40 dark:text-brand-cream/40 text-[10px] font-bold uppercase tracking-widest">
              <Clock className="w-3 h-3" />
              {therapy.duration}
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif text-brand-deep-green dark:text-white mb-8 leading-tight">
            {therapy.title}
          </h1>

          <div className="prose prose-lg dark:prose-invert text-brand-earth/70 dark:text-brand-cream/60 font-light leading-relaxed mb-12">
            <p className="text-xl text-brand-deep-green dark:text-brand-gold font-serif mb-6">{therapy.description}</p>
            <p>{therapy.fullDescription}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {therapy.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-brand-forest/5 dark:bg-white/5 border border-brand-forest/10">
                <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0" />
                <span className="text-xs font-bold text-brand-deep-green dark:text-brand-cream/80 uppercase tracking-widest leading-tight">{benefit}</span>
              </div>
            ))}
          </div>

          <button 
            onClick={onBookingClick}
            className="bg-brand-deep-green text-white py-5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-brand-forest transition-all shadow-xl flex items-center justify-center gap-3 group"
          >
            <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Hemen Randevu Al
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const BlogDetail = ({ post, onBack, onPostClick }: { post: BlogPost, onBack: () => void, onPostClick: (p: BlogPost) => void }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, author: 'Ayşe Y.', text: 'Harika bir yazı, çok bilgilendirici. Teşekkürler!', date: '2 gün önce' },
    { id: 2, author: 'Mehmet K.', text: 'Bu terapiyi denedim ve gerçekten çok faydasını gördüm.', date: '5 gün önce' }
  ]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setComments([{ id: Date.now(), author: 'Misafir', text: comment, date: 'Şimdi' }, ...comments]);
    setComment('');
  };

  // SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.image,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "datePublished": post.date,
    "description": post.excerpt
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 px-6 max-w-5xl mx-auto"
    >
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-deep-green dark:text-brand-gold mb-12 hover:opacity-70 transition-all group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Blog Yazılarına Dön
      </button>

      <div className="grid lg:grid-cols-12 gap-16">
        <article className="lg:col-span-8">
          <div className="aspect-video rounded-[40px] overflow-hidden shadow-2xl mb-12 relative group">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="flex items-center gap-4 mb-8">
            <span className="px-3 py-1 rounded-full bg-brand-gold/10 text-[8px] font-bold uppercase tracking-widest text-brand-gold">{post.date}</span>
            <div className="h-[1px] w-8 bg-brand-gold/20" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-earth/40 dark:text-brand-cream/40">{post.author}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-deep-green dark:text-white mb-12 leading-[1.1]">
            {post.title}
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none text-brand-earth/70 dark:text-brand-cream/60 font-light leading-relaxed mb-16">
            <p className="text-2xl text-brand-deep-green dark:text-brand-gold font-serif mb-12 italic border-l-4 border-brand-gold pl-8 py-2">
              "{post.excerpt}"
            </p>
            <div className="space-y-8">
              {post.content.split('\n').map((para, i) => (
                <p key={i} className="first-letter:text-4xl first-letter:font-serif first-letter:text-brand-gold first-letter:mr-2 first-letter:float-left">{para}</p>
              ))}
            </div>
          </div>

          {/* Author Bio */}
          <div className="bg-brand-cream/50 dark:bg-white/5 rounded-[32px] p-10 mb-16 border border-brand-forest/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
              <div className="w-28 h-28 rounded-full overflow-hidden flex-shrink-0 shadow-2xl border-4 border-white dark:border-white/10">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200" alt={post.author} className="w-full h-full object-cover" />
              </div>
              <div className="text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <h4 className="font-serif text-2xl text-brand-deep-green dark:text-brand-gold">{post.author}</h4>
                  <div className="flex justify-center md:justify-start gap-3">
                    <Instagram className="w-4 h-4 text-brand-earth/40 hover:text-brand-gold cursor-pointer transition-colors" />
                    <Facebook className="w-4 h-4 text-brand-earth/40 hover:text-brand-gold cursor-pointer transition-colors" />
                    <Mail className="w-4 h-4 text-brand-earth/40 hover:text-brand-gold cursor-pointer transition-colors" />
                  </div>
                </div>
                <p className="text-sm text-brand-earth/60 dark:text-brand-cream/60 font-light leading-relaxed">
                  Holistik şifa uzmanı ve doğal yaşam danışmanı. 15 yılı aşkın süredir kadim tedavi yöntemleri üzerine araştırmalar yapmakta ve danışanlarına rehberlik etmektedir. Beden ve ruh sağlığı arasındaki dengeyi bulmanıza yardımcı olur.
                </p>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="pt-16 border-t border-brand-forest/10">
            <div className="flex items-center justify-between mb-12">
              <h3 className="text-2xl font-serif text-brand-deep-green dark:text-white">Yorumlar ({comments.length})</h3>
              <div className="h-[1px] flex-1 mx-8 bg-brand-forest/5" />
            </div>
            
            <form onSubmit={handleCommentSubmit} className="mb-16 bg-brand-forest/5 dark:bg-white/5 p-8 rounded-[32px] border border-brand-forest/5">
              <textarea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Düşüncelerinizi ve sorularınızı bizimle paylaşın..."
                className="w-full bg-white dark:bg-black/20 border border-brand-forest/10 rounded-2xl p-6 text-sm focus:outline-none focus:border-brand-gold transition-colors resize-none h-32 mb-6 dark:text-white"
              />
              <button className="bg-brand-deep-green text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-brand-deep-green transition-all shadow-xl">
                Yorumu Gönder
              </button>
            </form>

            <div className="space-y-10">
              {comments.map((c) => (
                <div key={c.id} className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0 border border-brand-gold/20 transition-transform group-hover:scale-110">
                    <span className="text-brand-deep-green dark:text-brand-gold font-serif text-xl">{c.author[0]}</span>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-sm text-brand-deep-green dark:text-brand-gold">{c.author}</span>
                        <span className="w-1 h-1 bg-brand-gold/30 rounded-full" />
                        <span className="text-[10px] text-brand-earth/40 dark:text-brand-cream/40 uppercase tracking-widest">{c.date}</span>
                      </div>
                      <button className="text-[8px] font-bold uppercase tracking-widest text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity">Yanıtla</button>
                    </div>
                    <p className="text-sm text-brand-earth/70 dark:text-brand-cream/70 leading-relaxed font-light">
                      {c.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* Sidebar / Related Posts */}
        <aside className="lg:col-span-4 space-y-12">
          <div className="bg-brand-forest/5 dark:bg-white/5 rounded-[32px] p-8 border border-brand-forest/5">
            <h4 className="font-serif text-xl text-brand-deep-green dark:text-brand-gold mb-8">Popüler Yazılar</h4>
            <div className="space-y-8">
              {BLOG_POSTS.slice(0, 3).map(p => (
                <div key={p.id} className="group cursor-pointer flex gap-4" onClick={() => onPostClick(p)}>
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  </div>
                  <div className="space-y-2">
                    <h5 className="text-xs font-serif text-brand-deep-green dark:text-white group-hover:text-brand-gold transition-colors line-clamp-2 leading-snug">
                      {p.title}
                    </h5>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-brand-earth/40">{p.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-brand-gold/10 rounded-[32px] p-8 border border-brand-gold/20 text-center">
            <Sparkles className="w-8 h-8 text-brand-gold mx-auto mb-4" />
            <h4 className="font-serif text-xl text-brand-deep-green mb-4">Şifa Bülteni</h4>
            <p className="text-xs text-brand-earth/60 mb-6 font-light">En yeni şifa yöntemleri ve özel içerikler için bültenimize katılın.</p>
            <input 
              type="email" 
              placeholder="E-posta adresiniz"
              className="w-full bg-white border border-brand-forest/10 rounded-full px-6 py-3 text-xs mb-4 focus:outline-none focus:border-brand-gold"
            />
            <button className="w-full bg-brand-deep-green text-white py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-brand-forest transition-all">
              Abone Ol
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="px-4 py-2 rounded-full bg-brand-forest/5 dark:bg-white/5 text-[8px] font-bold uppercase tracking-widest text-brand-forest dark:text-brand-gold hover:bg-brand-gold hover:text-brand-deep-green cursor-pointer transition-all">
                #{tag}
              </span>
            ))}
          </div>
        </aside>
      </div>
    </motion.div>
  );
};

const CartDrawer = ({ isOpen, onClose, items, onUpdateQuantity, onRemove, onCheckout }: { 
  isOpen: boolean, 
  onClose: () => void, 
  items: CartItem[], 
  onUpdateQuantity: (id: string, q: number) => void,
  onRemove: (id: string) => void,
  onCheckout: () => void
}) => {
  const subtotal = items.reduce((sum, item) => sum + (parseFloat(item.price.replace('₺', '')) * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white dark:bg-black z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-8 border-b border-brand-forest/10 flex items-center justify-between">
              <h3 className="font-serif text-2xl text-brand-deep-green dark:text-white">Sepetiniz</h3>
              <button onClick={onClose} className="p-2 hover:bg-brand-forest/5 rounded-full transition-colors">
                <X className="w-6 h-6 text-brand-deep-green dark:text-brand-cream" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ShoppingBag className="w-16 h-16 text-brand-forest/20 mb-6" />
                  <p className="text-brand-earth/40 dark:text-brand-cream/40 font-light">Sepetiniz henüz boş.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-6 group">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-brand-forest/5 shrink-0">
                      <img src={item.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-serif text-brand-deep-green dark:text-white group-hover:text-brand-gold transition-colors">{item.name}</h4>
                          <button onClick={() => onRemove(item.id)} className="text-brand-earth/30 hover:text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-brand-forest font-bold text-sm">{item.price}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center bg-brand-forest/5 dark:bg-white/5 rounded-full px-3 py-1">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-1 text-brand-deep-green dark:text-brand-cream hover:text-brand-gold"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-4 text-xs font-bold text-brand-deep-green dark:text-brand-cream">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-brand-deep-green dark:text-brand-cream hover:text-brand-gold"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 bg-brand-cream/30 dark:bg-white/5 border-t border-brand-forest/10 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-brand-earth/40 dark:text-brand-cream/40">
                    <span>Ara Toplam</span>
                    <span>₺{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-brand-earth/40 dark:text-brand-cream/40">
                    <span>Kargo</span>
                    <span className="text-brand-gold">Ücretsiz</span>
                  </div>
                  <div className="flex justify-between text-lg font-serif text-brand-deep-green dark:text-white pt-4 border-t border-brand-forest/10">
                    <span>Toplam</span>
                    <span>₺{subtotal.toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full bg-brand-deep-green text-white py-5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-brand-forest transition-all shadow-xl flex items-center justify-center gap-3"
                >
                  <CreditCard className="w-4 h-4" />
                  Ödemeye Geç
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Checkout = ({ items, onBack, onComplete }: { items: CartItem[], onBack: () => void, onComplete: () => void }) => {
  const [step, setStep] = useState(1);
  const subtotal = items.reduce((sum, item) => sum + (parseFloat(item.price.replace('₺', '')) * item.quantity), 0);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 px-6 max-w-5xl mx-auto"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-deep-green dark:text-brand-gold mb-12 hover:opacity-70 transition-all group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Sepete Dön
      </button>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white dark:bg-black p-8 md:p-12 rounded-[40px] shadow-2xl border border-brand-forest/5">
            <div className="flex items-center gap-6 mb-12">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all",
                    step >= s ? "bg-brand-deep-green text-white" : "bg-brand-forest/5 text-brand-earth/30"
                  )}>
                    {s}
                  </div>
                  <span className={cn(
                    "text-[8px] font-bold uppercase tracking-widest",
                    step >= s ? "text-brand-deep-green dark:text-brand-gold" : "text-brand-earth/30"
                  )}>
                    {s === 1 ? 'Adres' : s === 2 ? 'Kargo' : 'Ödeme'}
                  </span>
                  {s < 3 && <div className="w-8 h-[1px] bg-brand-forest/10" />}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h3 className="text-2xl font-serif text-brand-deep-green dark:text-white mb-8">Teslimat Adresi</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-brand-earth/40">Ad</label>
                      <input type="text" className="w-full bg-brand-cream/30 dark:bg-white/5 border border-brand-forest/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-gold transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-brand-earth/40">Soyad</label>
                      <input type="text" className="w-full bg-brand-cream/30 dark:bg-white/5 border border-brand-forest/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-gold transition-colors" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-brand-earth/40">Adres</label>
                      <textarea rows={3} className="w-full bg-brand-cream/30 dark:bg-white/5 border border-brand-forest/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-gold transition-colors resize-none" />
                    </div>
                  </div>
                  <button onClick={() => setStep(2)} className="w-full bg-brand-deep-green text-white py-5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-brand-forest transition-all mt-8">
                    Kargo Seçimine Geç
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h3 className="text-2xl font-serif text-brand-deep-green dark:text-white mb-8">Kargo Yöntemi</h3>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between p-6 rounded-2xl border-2 border-brand-gold bg-brand-gold/5 cursor-pointer">
                      <div className="flex items-center gap-4">
                        <Truck className="w-6 h-6 text-brand-gold" />
                        <div>
                          <p className="text-sm font-bold text-brand-deep-green dark:text-brand-gold uppercase tracking-widest">Standart Teslimat</p>
                          <p className="text-xs text-brand-earth/60 dark:text-brand-cream/60">2-4 İş Günü</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-brand-deep-green dark:text-brand-gold">Ücretsiz</span>
                    </label>
                  </div>
                  <div className="flex gap-4 mt-8">
                    <button onClick={() => setStep(1)} className="flex-1 border border-brand-forest/10 py-5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-brand-forest/5 transition-all">Geri</button>
                    <button onClick={() => setStep(3)} className="flex-[2] bg-brand-deep-green text-white py-5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-brand-forest transition-all">Ödeme Adımına Geç</button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h3 className="text-2xl font-serif text-brand-deep-green dark:text-white mb-8">Ödeme Bilgileri</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-brand-earth/40">Kart Üzerindeki İsim</label>
                      <input type="text" className="w-full bg-brand-cream/30 dark:bg-white/5 border border-brand-forest/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-gold transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-brand-earth/40">Kart Numarası</label>
                      <div className="relative">
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold" />
                        <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-brand-cream/30 dark:bg-white/5 border border-brand-forest/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-brand-gold transition-colors" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-brand-earth/40">Skt</label>
                        <input type="text" placeholder="AA/YY" className="w-full bg-brand-cream/30 dark:bg-white/5 border border-brand-forest/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-gold transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-brand-earth/40">Cvv</label>
                        <input type="text" placeholder="000" className="w-full bg-brand-cream/30 dark:bg-white/5 border border-brand-forest/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-gold transition-colors" />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-8">
                    <button onClick={() => setStep(2)} className="flex-1 border border-brand-forest/10 py-5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-brand-forest/5 transition-all">Geri</button>
                    <button onClick={onComplete} className="flex-[2] bg-brand-deep-green text-white py-5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-brand-forest transition-all shadow-xl flex items-center justify-center gap-3">
                      <Lock className="w-4 h-4" />
                      ₺{subtotal.toFixed(2)} Öde
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <div className="bg-brand-cream/30 dark:bg-white/5 p-8 rounded-[40px] border border-brand-forest/10">
            <h4 className="font-serif text-xl text-brand-deep-green dark:text-white mb-8">Sipariş Özeti</h4>
            <div className="space-y-6 mb-8">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-brand-forest/5">
                      <img src={item.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-brand-deep-green dark:text-white uppercase tracking-widest">{item.name}</p>
                      <p className="text-[10px] text-brand-earth/40 dark:text-brand-cream/40">{item.quantity} Adet</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-brand-forest">{item.price}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3 pt-6 border-t border-brand-forest/10">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-brand-earth/40 dark:text-brand-cream/40">
                <span>Ara Toplam</span>
                <span>₺{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-brand-earth/40 dark:text-brand-cream/40">
                <span>Kargo</span>
                <span className="text-brand-gold">Ücretsiz</span>
              </div>
              <div className="flex justify-between text-xl font-serif text-brand-deep-green dark:text-white pt-4">
                <span>Toplam</span>
                <span>₺{subtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const LiveSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Merhaba! Ben Holistic Heals şifa asistanı. Size nasıl yardımcı olabilirim?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: 'Sorunuz için teşekkürler. Uzmanlarımız en kısa sürede size dönüş yapacaktır. Şifa olsun.' }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 left-0 w-80 md:w-96 bg-white dark:bg-black rounded-[32px] shadow-2xl border border-brand-forest/10 overflow-hidden flex flex-col h-[500px]"
          >
            <div className="bg-brand-deep-green p-6 flex items-center gap-4">
              <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center text-brand-deep-green">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-serif text-lg">Şifa Asistanı</h4>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[8px] font-bold uppercase tracking-widest text-white/60">Çevrimiçi</span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
              {messages.map((m, i) => (
                <div key={i} className={cn(
                  "flex",
                  m.role === 'user' ? "justify-end" : "justify-start"
                )}>
                  <div className={cn(
                    "max-w-[80%] p-4 rounded-2xl text-xs leading-relaxed",
                    m.role === 'user' ? "bg-brand-gold text-brand-deep-green rounded-tr-none" : "bg-brand-forest/5 dark:bg-white/5 text-brand-earth dark:text-brand-cream rounded-tl-none"
                  )}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-brand-forest/10 flex gap-3">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Mesajınızı yazın..."
                className="flex-1 bg-brand-cream/30 dark:bg-white/5 border border-brand-forest/10 rounded-full px-4 py-2 text-xs focus:outline-none focus:border-brand-gold transition-colors"
              />
              <button 
                onClick={handleSend}
                className="w-10 h-10 bg-brand-deep-green text-white rounded-full flex items-center justify-center hover:bg-brand-forest transition-all"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-brand-deep-green text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center gap-3 group"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap text-sm font-bold uppercase tracking-widest">
          Asistan
        </span>
      </button>
    </div>
  );
};

const About = () => {
  return (
    <section id="hakkımızda" className="py-12 md:py-20 bg-brand-forest/5 dark:bg-black transition-colors relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border-8 border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200" 
                alt="About Us" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-brand-forest/10 rounded-full blur-3xl -z-10" />
            
            <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center text-brand-deep-green">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-serif text-xl">15+ Yıllık Bilgelik</h4>
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Kadim Şifa Geleneği</p>
                </div>
              </div>
              <p className="text-white/80 text-xs font-light leading-relaxed">
                Holistic Heals olarak, binlerce yıllık şifa yöntemlerini modern dünyanın ihtiyaçlarıyla harmanlayarak size sunuyoruz.
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <SectionHeader title="Şifanın Kaynağına Yolculuk" subtitle="Biz Kimiz?" align="left" />
            <div className="prose prose-lg dark:prose-invert text-brand-earth/70 dark:text-brand-cream/60 font-light leading-relaxed mb-12">
              <p>
                Holistic Heals, bedenin sadece fiziksel bir yapı değil, aynı zamanda zihinsel ve ruhsal bir bütünlük olduğuna inanan bir şifa merkezidir. Bizim yolculuğumuz, doğanın bize sunduğu mucizeleri keşfetmek ve bu mucizeleri insanlığın hizmetine sunmakla başladı.
              </p>
              <p>
                Hacamat, sülük tedavisi ve bioenerji gibi kadim yöntemleri, en yüksek hijyen standartları ve uzman kadromuzla uyguluyoruz. Amacımız, her danışanımızın kendi içsel şifa gücünü keşfetmesine rehberlik etmektir.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-brand-deep-green dark:text-brand-gold">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">Güvenilir Hizmet</span>
                </div>
                <p className="text-xs text-brand-earth/50 dark:text-brand-cream/40 font-light">Tüm uygulamalarımız uzman kontrolünde ve steril ortamlarda gerçekleştirilir.</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-brand-deep-green dark:text-brand-gold">
                  <Leaf className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">Doğal Yaklaşım</span>
                </div>
                <p className="text-xs text-brand-earth/50 dark:text-brand-cream/40 font-light">Tedavilerimizde ve ürünlerimizde sadece doğanın sunduğu saf içerikleri kullanıyoruz.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="sss" className="py-12 md:py-20 bg-white dark:bg-black transition-colors relative">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeader title="Merak Edilenler" subtitle="Sıkça Sorulan Sorular" />
        
        <div className="space-y-4 mt-12">
          {FAQ_DATA.map((faq, idx) => (
            <div 
              key={idx} 
              className={cn(
                "rounded-3xl border transition-all duration-500 overflow-hidden",
                openIndex === idx ? "bg-brand-cream/30 dark:bg-white/5 border-brand-gold/30" : "bg-white dark:bg-transparent border-brand-forest/10"
              )}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-8 py-6 flex items-center justify-between text-left group"
              >
                <span className={cn(
                  "font-serif text-lg transition-colors",
                  openIndex === idx ? "text-brand-deep-green dark:text-brand-gold" : "text-brand-earth dark:text-brand-cream/80 group-hover:text-brand-deep-green dark:group-hover:text-white"
                )}>
                  {faq.question}
                </span>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500",
                  openIndex === idx ? "bg-brand-gold text-brand-deep-green rotate-180" : "bg-brand-forest/5 text-brand-forest"
                )}>
                  <ChevronLeft className="w-4 h-4 -rotate-90" />
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="px-8 pb-8 text-sm text-brand-earth/60 dark:text-brand-cream/50 font-light leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
const Blog = ({ onPostClick }: { onPostClick: (p: BlogPost) => void }) => {
  return (
    <section id="blog" className="py-12 md:py-20 bg-brand-cream/20 dark:bg-black transition-colors relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader title="Şifa Günlüğü" subtitle="Blog Yazılarımız" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {BLOG_POSTS.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              onClick={() => onPostClick(post)}
              className="group cursor-pointer flex flex-col bg-brand-forest/5 dark:bg-white/5 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-500"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-brand-gold">{post.date}</span>
                  <div className="h-[1px] w-6 bg-brand-gold/20" />
                  <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-brand-earth/40 dark:text-brand-cream/40">{post.author}</span>
                </div>
                <h3 className="text-lg md:text-xl font-serif text-brand-deep-green dark:text-white mb-3 leading-tight group-hover:text-brand-forest dark:group-hover:text-brand-gold transition-colors">
                  {post.title}
                </h3>
                <p className="text-brand-earth/60 dark:text-brand-cream/60 text-xs leading-relaxed mb-6 font-light line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="inline-flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.2em] text-brand-forest dark:text-brand-gold group/link">
                  Devamını Oku <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onNavClick }: { onNavClick: (id: string) => void }) => {
  return (
    <footer className="bg-brand-deep-green text-brand-cream pt-16 pb-12 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-8 mb-12 relative z-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-4">
            <Flower2 className="w-6 h-6 text-brand-gold" />
            <span className="text-xl font-serif font-bold tracking-tight uppercase">Holistic Heals</span>
          </div>
          <p className="text-brand-cream/50 max-w-sm mb-6 leading-relaxed font-light text-sm">
            Beden, zihin ve ruh bütünlüğünü korumak için kadim şifa yöntemlerini modern yaşamla buluşturuyoruz. Doğanın gücüne inanın.
          </p>
          <div className="flex gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full text-brand-cream/40 hover:bg-brand-gold hover:text-brand-deep-green transition-all duration-300">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full text-brand-cream/40 hover:bg-brand-gold hover:text-brand-deep-green transition-all duration-300">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="mailto:info@holisticheals.net" className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full text-brand-cream/40 hover:bg-brand-gold hover:text-brand-deep-green transition-all duration-300">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 text-brand-gold">Hızlı Menü</h4>
          <ul className="space-y-3 text-sm font-light text-brand-cream/60">
            {[
              { id: 'terapiler', label: 'Terapiler' },
              { id: 'urunler', label: 'Ürünler' },
              { id: 'blog', label: 'Şifa Günlüğü' },
              { id: 'hakkımızda', label: 'Hakkımızda' },
              { id: 'sss', label: 'SSS' },
              { id: 'iletisim', label: 'İletişim' }
            ].map(item => (
              <li key={item.id}>
                <button 
                  onClick={() => onNavClick(item.id)}
                  className="hover:text-brand-gold transition-colors text-left"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 text-brand-gold">Bültenimize Katılın</h4>
          <p className="text-sm font-light text-brand-cream/60 mb-6 leading-relaxed">Şifa dolu ipuçları ve özel teklifler için e-posta listemize kaydolun.</p>
          <div className="relative">
            <input 
              type="email" 
              placeholder="E-posta Adresiniz" 
              className="bg-white/5 border-b border-white/10 w-full py-3 text-sm font-light focus:outline-none focus:border-brand-gold transition-colors"
            />
            <button className="absolute right-0 top-1/2 -translate-y-1/2 text-brand-gold hover:text-white transition-colors">
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-bold uppercase tracking-[0.3em] text-brand-cream/20">
        <p>© 2024 Holistic Heals. Tüm hakları saklıdır.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-brand-cream transition-colors">Gizlilik</a>
          <a href="#" className="hover:text-brand-cream transition-colors">Kullanım Koşulları</a>
          <a href="#" className="hover:text-brand-cream transition-colors">Çerezler</a>
        </div>
      </div>
    </footer>
  );
};

const Location = () => {
  return (
    <section id="iletisim" className="py-12 md:py-20 bg-white dark:bg-black transition-colors relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="aspect-video rounded-3xl overflow-hidden shadow-xl bg-brand-forest/5 relative group">
            <img 
              src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1200" 
              alt="Location" 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl text-center">
                <div className="text-brand-deep-green font-serif text-xl mb-1">Merkezimiz</div>
                <p className="text-[10px] text-brand-earth/60 font-bold tracking-widest uppercase">İstanbul, Türkiye</p>
              </div>
            </div>
          </div>
          <div>
            <SectionHeader title="Bize Ulaşın" subtitle="İletişim" align="left" />
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 flex items-center justify-center bg-brand-forest/5 rounded-xl text-brand-forest shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-1">E-posta</h4>
                  <p className="text-base text-brand-earth/60 font-light">info@holisticheals.net</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 flex items-center justify-center bg-brand-forest/5 rounded-xl text-brand-forest shrink-0">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-1">Sosyal Medya</h4>
                  <p className="text-base text-brand-earth/60 font-light">@holisticheals</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 flex items-center justify-center bg-brand-forest/5 rounded-xl text-brand-forest shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-1">Çalışma Saatleri</h4>
                  <p className="text-base text-brand-earth/60 font-light">Pazartesi - Cumartesi: 09:00 - 19:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const IvyDecoration = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {/* Subtle Mist/Atmosphere - Keeping only the soft glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-forest/5 via-transparent to-brand-gold/5 opacity-20" />
    </div>
  );
};

const WhatsAppButton = () => (
  <a 
    href="https://wa.me/your-number" 
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-3 group"
  >
    <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap text-sm font-bold uppercase tracking-widest">
      Şifa Hattı
    </span>
    <Zap className="w-6 h-6 fill-current" />
  </a>
);

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedTherapy, setSelectedTherapy] = useState<Therapy | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [lang, setLang] = useState('TR');
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setSelectedProduct(null);
    setSelectedTherapy(null);
    setSelectedBlogPost(null);
    setIsBookingOpen(false);
    setIsCheckoutOpen(false);
    
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  useEffect(() => {
    if (selectedProduct || selectedTherapy || selectedBlogPost || isBookingOpen || isCheckoutOpen) {
      window.scrollTo(0, 0);
    }
  }, [selectedProduct, selectedTherapy, selectedBlogPost, isBookingOpen, isCheckoutOpen]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen selection:bg-brand-forest selection:text-white bg-brand-cream dark:bg-black transition-colors relative">
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      
      <IvyDecoration />
      
      <div className="relative z-10">
        <TopBar lang={lang} setLang={setLang} isDark={isDark} setIsDark={setIsDark} isScrolled={isScrolled} />
        <Navbar 
          onBookingClick={() => setIsBookingOpen(true)} 
          onCartClick={() => setIsCartOpen(true)}
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          lang={lang}
          onNavClick={scrollToSection}
          isScrolled={isScrolled}
        />
        <WhatsAppButton />
        <LiveSupport />
        
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          items={cart}
          onUpdateQuantity={updateCartQuantity}
          onRemove={removeFromCart}
          onCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }}
        />

        <main>
          <AnimatePresence mode="wait">
            {isBookingOpen ? (
              <BookingForm therapy={selectedTherapy} onBack={() => setIsBookingOpen(false)} lang={lang} />
            ) : isCheckoutOpen ? (
              <Checkout 
                items={cart} 
                onBack={() => setIsCheckoutOpen(false)} 
                onComplete={() => {
                  alert('Siparişiniz başarıyla alındı! Şifa olsun.');
                  setCart([]);
                  setIsCheckoutOpen(false);
                }} 
              />
            ) : selectedProduct ? (
              <ProductDetail 
                product={selectedProduct} 
                onBack={() => setSelectedProduct(null)} 
                onProductClick={setSelectedProduct}
                onAddToCart={addToCart}
              />
            ) : selectedTherapy ? (
              <TherapyDetail 
                therapy={selectedTherapy} 
                onBack={() => setSelectedTherapy(null)} 
                onBookingClick={() => {
                  setIsBookingOpen(true);
                }}
              />
            ) : selectedBlogPost ? (
              <BlogDetail 
                post={selectedBlogPost} 
                onBack={() => setSelectedBlogPost(null)} 
                onPostClick={setSelectedBlogPost}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Hero 
                  onBookingClick={() => setIsBookingOpen(true)} 
                  onNavClick={scrollToSection}
                  lang={lang}
                />
                <Therapies onBookingClick={() => setIsBookingOpen(true)} onTherapyClick={setSelectedTherapy} />
                <Products onProductClick={setSelectedProduct} />
                <About />
                <FAQ />
                <Blog onPostClick={setSelectedBlogPost} />
                <Location />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        <Footer onNavClick={scrollToSection} />
      </div>
    </div>
  );
}
