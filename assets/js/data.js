/**
 * ============================================================
 *  CREPES - 50 QƏPİK LƏNKƏRAN
 *  DATA FILE — Məhsulları, Qaleryanı, FAQ-ı burada dəyişin
 * ============================================================
 *
 *  YENİ MƏHSUL ƏLAVƏ ETMƏK ÜÇÜN:
 *  1. MENU_DATA massivindən uyğun kateqoriyanı tapın
 *  2. items siyahısına aşağıdakı formada yeni obekt əlavə edin:
 *     {
 *       id: 'unikal-id',        // Unikal ID
 *       name: 'Məhsul adı',
 *       desc: 'Tərkibi',
 *       price: 5.99,            // Qiymət (rəqəm)
 *       img:  'assets/images/crepe-food.jpg', // Şəkil yolu
 *       popular: true           // (isteğe bağlı) "Populyar" nişanı
 *     }
 *
 *  QALERYA ŞƏKİLLƏRİ ƏLAVƏ ETMƏK ÜÇÜN:
 *  GALLERY_IMAGES massivini yeniliyin:
 *     { src: 'assets/images/foto.jpg', caption: 'Başlıq' }
 *
 *  FAQ ƏLAVƏ ETMƏK ÜÇÜN:
 *  FAQ_DATA massivini yeniliyin:
 *     { q: 'Sual?', a: 'Cavab.' }
 * ============================================================
 */

// ─── MENU ────────────────────────────────────────────────────
const MENU_DATA = [
  {
    id: 'sirin',
    label: 'Şirin Kreplər',
    items: [
      {
        id: 's1',
        name: '"Crepes" Bounty® ilə',
        desc: 'Kokos, qaymaq, qatılaşdırılmış süd',
        price: 5.99,
        img: 'assets/images/bouty.jpg',
        popular: true
      },
      {
        id: 's2',
        name: '"Crepes" Nutella® ilə',
        desc: 'Nutella',
        price: 5.99,
        img: 'assets/images/nutella.jpg',
        popular: true
      },
      {
        id: 's3',
        name: '"Crepes" Snickers® ilə',
        desc: 'Karamel, Araxis, Nutella®',
        price: 5.99,
        img: 'assets/images/snickers.jpg',
        popular: true
      },
      {
        id: 's4',
        name: '"Crepes" Banan Qaymaq ilə',
        desc: 'Banan, qaymaq, qatılaşdırılmış süd',
        price: 5.99,
        img: 'assets/images/crepe-food.jpg',
        popular: true
      },
      {
        id: 's5',
        name: '"Crepes" Banan Qaymaq və Nutella® ilə',
        desc: 'Banan, qaymaq, Nutella®',
        price: 5.99,
        img: 'assets/images/crepe-food.jpg',
        popular: true
      },
      {
        id: 's6',
        name: '"Crepes" Giləmeyvə ilə',
        desc: 'Çiyələk',
        price: 5.99,
        img: 'assets/images/crepe-food.jpg',
        popular: false
      },
      {
        id: 's7',
        name: '"Crepes" Ştrudel ilə',
        desc: 'Alma, darçın, qatılaşdırılmış süd',
        price: 5.99,
        img: 'assets/images/crepe-food.jpg',
        popular: false
      }
    ]
  },
  {
    id: 'doyumlu',
    label: 'Doyumlu Kreplər',
    items: [
      {
        id: 'd1',
        name: '"Crepes" Blindoq',
        desc: 'Sosis, holland pendiri',
        price: 5.99,
        img: 'assets/images/crepe-food.jpg',
        popular: false
      },
      {
        id: 'd2',
        name: '"Crepes" Julyen ilə',
        desc: 'Qöbələk, qaymaq, holland pendiri',
        price: 11.49,
        img: 'assets/images/crepe-food.jpg',
        popular: false
      },
      {
        id: 'd3',
        name: '"Crepes" Şirin və Turş Sousda Toyuq ilə',
        desc: 'Toyuq, şirin və turş sousu, holland pendiri',
        price: 11.49,
        img: 'assets/images/crepe-food.jpg',
        popular: false
      },
      {
        id: 'd4',
        name: '"Crepes" Ədviyyatlı Toyuq Tərəvəz ilə',
        desc: 'Toyuq əti, ədviyyatlı sousu, mangal salatı, holland pendiri',
        price: 11.49,
        img: 'assets/images/crepe-food.jpg',
        popular: false
      },
      {
        id: 'd5',
        name: '"Crepes" Pendir ilə',
        desc: 'Holland pendiri',
        price: 5.99,
        img: 'assets/images/crepe-food.jpg',
        popular: false
      }
    ]
  },
  {
    id: 'ickilar',
    label: 'Soyuq İçkilər',
    items: [
      {
        id: 'i1',
        name: 'Coca-Cola® 500 ml',
        desc: 'Soyuq içki',
        price: 2.99,
        img: 'assets/images/crepe-food.jpg',
        popular: false
      },
      {
        id: 'i2',
        name: 'Fanta® 500 ml',
        desc: 'Soyuq içki',
        price: 2.99,
        img: 'assets/images/crepe-food.jpg',
        popular: false
      },
      {
        id: 'i3',
        name: 'Sprite® 500 ml',
        desc: 'Soyuq içki',
        price: 2.99,
        img: 'assets/images/crepe-food.jpg',
        popular: false
      }
    ]
  }
];

// ─── GALLERY ─────────────────────────────────────────────────
const GALLERY_IMAGES = [
  { src: 'assets/images/crepe-food.jpg', caption: '"Crepes" Şirin Turş Sousda Toyuq ilə' },
  { src: 'assets/images/crepe-food.jpg', caption: '"Crepes" Nutella® ilə' },
  { src: 'assets/images/crepe-food.jpg', caption: '"Crepes" Banan Qaymaq ilə' },
  { src: 'assets/images/crepe-food.jpg', caption: '"Crepes" Snickers® ilə' },
  { src: 'assets/images/crepe-food.jpg', caption: '"Crepes" Bounty® ilə' },
  { src: 'assets/images/crepe-food.jpg', caption: '"Crepes" Julyen ilə' },
  { src: 'assets/images/crepe-food.jpg', caption: '"Crepes" Giləmeyvə ilə' },
  { src: 'assets/images/crepe-food.jpg', caption: '"Crepes" Pendir ilə' },
  { src: 'assets/images/crepe-food.jpg', caption: '"Crepes" Blindoq' }
];

// ─── FAQ ──────────────────────────────────────────────────────
const FAQ_DATA = [
  {
    q: 'Sifariş necə verə bilərəm?',
    a: 'Saytımızın "Sifariş Et" bölməsindən menyudan istədiyiniz məhsulları seçin, məlumatlarınızı doldurun və WhatsApp vasitəsilə sifariş verin. Həmçinin bilavasitə nömrəmizi — +994 50 538 47 49 — zəng edərək sifariş edə bilərsiniz.'
  },
  {
    q: 'Çatdırılma xidməti varmı?',
    a: 'Hal-hazırda çatdırılma xidmətimiz mövcuddur. Sifarişinizin çatdırılma müddəti ünvana görə dəyişir. Ətraflı məlumat üçün bizimlə əlaqə saxlayın.'
  },
  {
    q: 'Rezervasiya necə edilir?',
    a: '"Rezervasiya" bölməsinə keçin, adınızı, telefon nömrənizi, tarixi, saatı və neçə nəfər olduğunuzu qeyd edin. Göndər düyməsinə basdıqda WhatsApp vasitəsilə biz sizinlə əlaqə saxlayarıq.'
  },
  {
    q: 'Ödəniş üsulları nələrdir?',
    a: 'Nağd ödəniş və bank kartı ilə ödəniş qəbul edirik. Onlayn sifariş üçün çatdırılmada ödəniş edilir.'
  },
  {
    q: 'Allerji məlumatı ala bilərəmmi?',
    a: 'Bəli. Hər məhsulun tərkibi menyuda göstərilmişdir. Əlavə allerji məlumatı üçün bizimlə WhatsApp vasitəsilə əlaqə saxlayın: +994 50 538 47 49.'
  },
  {
    q: 'Minimum sifariş məbləği varmı?',
    a: 'Minimum sifariş məbləği yoxdur. İstədiyiniz sayda məhsul sifariş edə bilərsiniz.'
  },
  {
    q: 'İş saatları nə vaxtdandır?',
    a: 'Bazar ertəsindən Cümə axşamına qədər 09:00–22:00, Cümə və Şənbə günləri 09:00–23:00, Bazar günü isə 10:00–22:00 saatlarında xidmətinizdəyik.'
  },
  {
    q: 'Qruplar üçün xüsusi endirim varmı?',
    a: '10 nəfər və ya daha çox qruplar üçün xüsusi endirimlər tətbiq edilir. Ətraflı məlumat üçün bizimlə əlaqə saxlayın.'
  }
];
