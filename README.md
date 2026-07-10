# Crepes — 50 Qəpik Lənkəran 🥞

## Layihə Haqqında
Crepes restoranı üçün mobil-first, tam static, Render Static Site uyğun veb sayt.

## Canlı Sayt
Render.com-da Static Site olaraq deploy edin. Publish directory: `/` (kök qovluq)

## Struktur
```
index.html              — Əsas HTML (bütün səhifələr burada)
assets/
  css/style.css         — Bütün stillər
  js/data.js            — MƏLUMATLAR (menyu, qalerya, FAQ)
  js/app.js             — Funksionallıq
  images/
    crepe-food.jpg      — Məhsul şəkli
    logo.png            — Logo
```

## Developer Qeydi — Məlumat Dəyişdirmək

### Yeni Məhsul Əlavə Etmək
`assets/js/data.js` faylını açın → `MENU_DATA` massivini tapın → uyğun kateqoriyaya əlavə edin:
```js
{
  id: 'unikal-id',
  name: '"Crepes" Yeni Məhsul',
  desc: 'Tərkib maddələri',
  price: 5.99,
  img: 'assets/images/crepe-food.jpg',
  popular: false
}
```

### Yeni Qalerya Şəkli Əlavə Etmək
`assets/js/data.js` → `GALLERY_IMAGES` massivi:
```js
{ src: 'assets/images/yeni-foto.jpg', caption: 'Başlıq' }
```

### FAQ Əlavə Etmək
`assets/js/data.js` → `FAQ_DATA` massivi:
```js
{ q: 'Sual?', a: 'Cavab.' }
```

### WhatsApp Nömrəsini Dəyişmək
`assets/js/app.js` faylının yuxarısında:
```js
const ORDER_WA   = '994559406018'; // Sifariş
const RESERVE_WA = '994559406018'; // Rezervasiya
```

## Xüsusiyyətlər
- ✅ Çox səhifəli (tab) naviqasiya
- ✅ Menyu kateqoriyaları (Şirin / Doyumlu / İçkilər)
- ✅ Məhsula klikdə tərkib modalı
- ✅ Səbət sistemi — menyudan sifarişə keçid
- ✅ Rezervasiya → WhatsApp
- ✅ Sifariş → WhatsApp + Konum linki
- ✅ Qalerya + Lightbox + swipe
- ✅ FAQ accordion
- ✅ Mobil optimizasiya (tam responsive)
- ✅ Sıfır donma / gecikmə
- ✅ Tam static (backend yoxdur)

## Deploy (Render.com Static Site)
1. GitHub-a push edin
2. Render.com → New → Static Site → Repo seçin
3. Build command: boş qoyun
4. Publish directory: `.`
5. Deploy edin ✅
