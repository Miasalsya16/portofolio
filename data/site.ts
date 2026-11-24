export type MockKind = 'market' | 'label' | 'dash' | 'pos' | 'ads' | 'learn'
export type Category = 'produk' | 'dasbor' | 'kampanye' | 'belajar'

export interface Project {
  slug: string
  title: string
  eyebrow: string
  year: string
  role: string
  category: Category
  mock: MockKind
  featured?: boolean
  summary: string
  story: string[]
  highlights: string[]
  stack: string[]
  disclaimer?: string
}

export const profile = {
  name: 'Mia Salha Syakila',
  role: 'Frontend Developer',
  location: 'Jakarta',
  birthplace: 'Garut, Jawa Barat',
  phoneDisplay: '+62 851-6288-3639',
  phoneTel: '+6285162883639',
  whatsapp: 'https://wa.me/6285162883639',
  email: 'miasalsya16@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mia-salha-syakila',
  summary:
    'Frontend Developer, 3+ tahun di Vue.js dan Nuxt.js. Saya ubah desain Figma jadi komponen, sambungkan ke REST API, dan jaga state tetap utuh saat pindah halaman — di marketplace, whitelabel, dan dashboard.',
  heroLede:
    'Frame Figma saya pecah jadi komponen Vue yang tersambung ke API: marketplace, whitelabel multi-tenant, dan dashboard operasional.',
}

export const cvs = [
  {
    id: 'v1',
    label: 'Versi 1',
    note: 'Satu halaman, ringkas',
    file: '/cv/Mia-Salha-Syakila-Versi-1.pdf',
  },
  {
    id: 'v2',
    label: 'Versi 2',
    note: 'Tata letak desain',
    file: '/cv/Mia-Salha-Syakila-Versi-2.pdf',
  },
]

export const nav = [
  { href: '/#karya', label: 'Karya' },
  { href: '/#tentang', label: 'Tentang' },
  { href: '/#jejak', label: 'Jejak' },
  { href: '/#keahlian', label: 'Keahlian' },
  { href: '/#kontak', label: 'Kontak' },
]

export const marquee = [
  'Vue.js',
  'Nuxt.js',
  'Pixel-perfect',
  'REST API',
  'Pinia',
  'Tailwind CSS',
  'SASS',
  'Vuetify',
  'SSR',
  'SEO',
  'Figma',
  'Komponen reusable',
]

export const filters = [
  { id: 'semua', label: 'Semua' },
  { id: 'produk', label: 'Produk' },
  { id: 'dasbor', label: 'Dashboard' },
  { id: 'kampanye', label: 'Kampanye' },
  { id: 'belajar', label: 'Belajar' },
] as const

export const projects: Project[] = [
  {
    slug: 'marketplace-treetan',
    title: 'Marketplace Treetan',
    eyebrow: 'B2B · Shiratha',
    year: '2023 — Sekarang',
    role: 'Frontend Developer',
    category: 'produk',
    mock: 'market',
    featured: true,
    summary:
      'UI katalog, keranjang, checkout, dan dashboard seller. Data paket umroh, haji, dan wisata syariah datang dari REST API.',
    story: [
      'Jamaah membuka katalog, membandingkan paket, lalu masuk ke keranjang dan checkout. Seller punya dashboard sendiri untuk mengelola yang dijual.',
      'Alur itu saya susun di Vue.js dan Nuxt.js. Komponen katalog dibuat reusable, supaya list dengan data produk yang panjang tetap ringan di-render.',
      'Katalog, partner, dan transaksi di-fetch lewat Axios ke REST API. Tailwind dan SASS memegang style-nya, mengikuti frame Figma. Di perusahaan yang sama saya juga mengerjakan situs korporat Treetan: profil, unit usaha, partner, dan kontak.',
    ],
    highlights: [
      'Route produk, keranjang, dan checkout',
      'Dashboard seller untuk pihak yang berjualan',
      'Komponen katalog yang dipakai ulang di list panjang',
      'Integrasi REST API: katalog, partner, transaksi',
      'Situs korporat: perusahaan, bisnis, partner, kontak',
    ],
    stack: ['Vue.js', 'Nuxt.js', 'Axios', 'Tailwind CSS', 'SASS', 'SSR'],
  },
  {
    slug: 'whitelabel-partner',
    title: 'Whitelabel Partner',
    eyebrow: 'Satu codebase · multi-tenant',
    year: '2023 — Sekarang',
    role: 'Frontend Developer',
    category: 'produk',
    mock: 'label',
    summary:
      'Satu aplikasi Nuxt untuk banyak domain. Logo, warna, dan menu di-inject dari API, per tenant, tanpa codebase baru.',
    story: [
      'Domain yang dibuka pengunjung menjadi identitas tenant. Setiap request API membawa host itu, lalu merek, warna, dan menu kembali dari pengaturan white-label.',
      'Aero Hajj, Pos Indonesia, Al-Azhar, Minala, Aqobah, dan Arrayyan tampil beda, dari komponen yang sama.',
      'Fiturnya satu produk: umroh reguler, pembiayaan, tabungan, haji, wisata syariah, promo, akun member, sampai checkout.',
    ],
    highlights: [
      'Theming dinamis: logo, warna, dan menu dari API',
      'Feature flag menyalakan atau menyembunyikan bagian UI',
      'Umroh, haji, wisata syariah, pembiayaan, dan akun member',
      'Checkout plus riwayat pesanan, tabungan, dan pembiayaan',
    ],
    stack: ['Vue.js', 'Nuxt.js', 'Tailwind CSS', 'Axios', 'SSR'],
  },
  {
    slug: 'dasbor-operasional',
    title: 'Dasbor Operasional',
    eyebrow: 'Travel · TDC · Admin',
    year: '2023 — Sekarang',
    role: 'Frontend Developer',
    category: 'dasbor',
    mock: 'dash',
    summary:
      'Dashboard per peran: tabel, filter, grafik, dan pagination untuk Travel, TDC, Super Admin, Consultant, Finance, dan Merchandise.',
    story: [
      'Tiap peran butuh layar berbeda, polanya sama: ringkasan, tabel panjang, filter, dan status yang kebaca dalam sekali pindai.',
      'Super Admin memegang katalog, pesanan, partner, keuangan, dan percakapan. Peran lain saya pecah ke dashboard Travel, TDC, Consultant, Finance, Merchandise, dan Whitelabel Consultant.',
      'Pinia menyimpan sesi login dan state filter, jadi pindah route tidak menghapus konteks yang sedang dikerjakan. Grafik dan tabel disusun supaya data padat tetap bisa dipindai.',
    ],
    highlights: [
      'Dashboard Travel, TDC, dan Super Admin',
      'Consultant, Finance, Merchandise, dan Whitelabel Consultant',
      'Tabel, filter, grafik, dan pagination',
      'Pinia untuk state login dan filter',
    ],
    stack: ['Vue.js', 'Nuxt.js', 'Vuetify', 'Pinia', 'Tailwind CSS', 'Axios'],
  },
  {
    slug: 'microsite-pos',
    title: 'Microsite Pos Indonesia',
    eyebrow: 'Nuxt · SEO',
    year: '2023 — Sekarang',
    role: 'Frontend Developer',
    category: 'produk',
    mock: 'pos',
    summary:
      'Kanal Pos di Nuxt dengan SSR: katalog, pemesanan, dan pembayaran. HTML-nya sudah ada saat dibuka, jadi siap diindeks.',
    story: [
      'Kanal Pos Indonesia punya tema sendiri. Alurnya tetap sama: pilih paket, buat pesanan, lalu bayar.',
      'Saya kerjakan di Nuxt SSR supaya respons pertama sudah berisi konten, bukan shell kosong, tanpa mengorbankan layout.',
    ],
    highlights: [
      'Beranda, katalog, dan alur pemesanan',
      'Pembayaran di situs yang sama',
      'SSR untuk muat awal dan SEO',
    ],
    stack: ['Nuxt.js', 'Vue.js', 'Tailwind CSS', 'SSR', 'SEO'],
  },
  {
    slug: 'periklanan-makuta',
    title: 'Periklanan Makuta',
    eyebrow: 'User · Admin · Report',
    year: '2021 — 2022',
    role: 'Frontend Developer',
    category: 'kampanye',
    mock: 'ads',
    summary:
      'Dua aplikasi Vue untuk iklan properti: sisi user untuk lihat iklan dan order, sisi admin untuk approval dan report.',
    story: [
      'Di Makuta Communication saya membangun website iklan properti Estusae dan Grand Taman Sari.',
      'Selain halaman publik, ada aplikasi user untuk melihat iklan dan membuat order, serta admin untuk kelola iklan, approval, dan report. Report data Makuta juga saya buat sebagai aplikasi terpisah, tetap di Vue dan REST API.',
    ],
    highlights: [
      'Website iklan properti Estusae dan Grand Taman Sari',
      'Sisi pengguna: lihat iklan dan order',
      'Sisi admin: kelola iklan, approval, dan report',
      'Aplikasi report data',
    ],
    stack: ['Vue.js', 'REST API'],
  },
  {
    slug: 'simulasi-haji',
    title: 'Simulasi Ibadah Haji',
    eyebrow: 'Alat belajar · internal',
    year: 'Prototipe',
    role: 'Eksplorasi',
    category: 'belajar',
    mock: 'learn',
    summary:
      'Prototipe belajar di browser: peta manasik di Canvas 2D dan adegan 3D dengan Three.js. Bukan aplikasi jamaah, dan bukan pengganti ibadah.',
    story: [
      'Namanya Hidayah Hajj Adventure. Ini simulasi belajar internal, bukan produk yang dibuka jamaah di marketplace.',
      'Ada dua pintu. Pintu pertama langsung ke peta manasik di Makkah: umroh, haji ifrad, qiran, dan tamattu. Pintu kedua mengikuti alur SHIRATHA dari Jakarta — rumah, kantor marketplace, pemesanan, bandara Soekarno-Hatta, penerbangan, Jeddah, miqat — lalu masuk ke peta yang sama.',
      'Di peta: ihram, tawaf, sa\'i, wukuf, dan tahalul. Ada halaman studio untuk karakter. Progres hanya di localStorage, tanpa akun dan tanpa database. Lencana di permainan bukan penilaian sah atau tidaknya ibadah.',
    ],
    highlights: [
      'Alur manasik lewat peta Canvas, bukan lewat halaman produk',
      'Narasi perjalanan dari kantor SHIRATHA di Jakarta ke rangkaian ibadah',
      'Batas yang tegas: ini latihan, bukan ibadah',
    ],
    stack: ['HTML', 'Canvas 2D', 'Three.js', 'glTF'],
    disclaimer:
      'Penyusunan kode permainan, peta, dan kartu pelajarannya banyak dibantu AI di Cursor. Saya yang mengarahkan isi manasik dan batas pemakaiannya. Pustaka Three.js tidak saya tulis. Berapa persen tepatnya yang dikerjakan AI tidak tercatat di proyek, jadi saya tidak mencantumkan angka.',
  },
]

export const capabilities = [
  {
    title: 'Pixel-perfect',
    text: 'Spacing, huruf, dan warna saya ikuti dari frame Figma sampai ke komponen.',
  },
  {
    title: 'REST API',
    text: 'Axios mengambil katalog, pesanan, dan akun, lengkap dengan state loading dan error.',
  },
  {
    title: 'Komponen reusable',
    text: 'Satu komponen dipakai banyak route, termasuk list yang datanya panjang.',
  },
  {
    title: 'State management',
    text: 'Pinia dan Vuex menyimpan sesi login dan filter, jadi konteks tidak hilang saat pindah halaman.',
  },
  {
    title: 'Performa & SEO',
    text: 'SSR di Nuxt supaya HTML sudah terisi saat halaman dibuka, dan kontennya bisa diindeks.',
  },
]

export const experience = [
  {
    company: 'PT Treetan Nusantara Network',
    role: 'Frontend Developer',
    when: 'Jan 2023 — Sekarang',
    points: [
      'Membangun UI marketplace: katalog, keranjang, checkout, dan dashboard seller dengan Vue.js, Nuxt.js, Axios, Tailwind CSS, dan SASS.',
      'Mengembangkan whitelabel: satu codebase, tema (logo, warna, menu) diganti per tenant dari API.',
      'Membangun dashboard Travel, TDC, Super Admin, Consultant, Finance, dan Merchandise. Pinia untuk state login dan filter.',
      'Mengerjakan microsite Pos Indonesia dan situs korporat Treetan, dengan SSR untuk muat awal dan SEO.',
      'Menyusun komponen reusable supaya list produk yang panjang tetap ringan di-render.',
    ],
  },
  {
    company: 'Makuta Communication',
    role: 'Frontend Developer',
    when: 'Okt 2021 — Juni 2022',
    points: [
      'Membangun website iklan properti Estusae dan Grand Taman Sari.',
      'Mengembangkan aplikasi Vue sisi user (lihat iklan, order) dan admin (kelola iklan, approval, report), tersambung ke REST API.',
      'Membuat aplikasi report data Makuta.',
    ],
  },
]

export const education = {
  degree: 'Diploma Manajemen Informatika',
  school: 'Universitas Nasional Pasim',
  when: 'Sep 2019 — Okt 2022',
  gpa: 'IPK 3,7',
}

export const skillGroups = [
  {
    title: 'Antarmuka',
    items: ['Vue.js', 'Nuxt.js', 'JavaScript', 'TypeScript (dasar)', 'HTML5', 'CSS3', 'Tailwind CSS', 'SASS', 'Vuetify'],
  },
  {
    title: 'Data & state',
    items: ['Pinia', 'Vuex', 'Axios', 'REST API'],
  },
  {
    title: 'Alat',
    items: ['VS Code', 'Git', 'Figma', 'Postman', 'Apidog', 'Mailtrap', 'Cursor', 'GitHub Copilot'],
  },
  {
    title: 'Eksplorasi',
    items: ['Flutter', 'WordPress', 'Mixpanel'],
  },
]

export function getProject(slug: string) {
  return projects.find((item) => item.slug === slug)
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((item) => item.slug === slug)
  if (index < 0) return projects[0]
  return projects[(index + 1) % projects.length]
}
