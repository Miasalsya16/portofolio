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
    'Frontend Developer dengan 3+ tahun membangun marketplace, whitelabel, dan dashboard berbasis Vue.js dan Nuxt.js. Terbiasa mengubah desain Figma menjadi antarmuka yang rapi, tersambung ke REST API, dan mudah dirawat.',
  heroLede:
    'Figma saya jadikan halaman yang benar-benar dipakai: marketplace umroh, whitelabel partner, dan dashboard operasional.',
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
      'Halaman produk, keranjang, checkout, dan dashboard seller untuk marketplace travel — plus katalog umroh, haji, dan wisata syariah.',
    story: [
      'Marketplace ini tempat jamaah melihat paket, membandingkan, lalu lanjut ke keranjang dan checkout. Di belakangnya ada dashboard seller untuk pihak yang berjualan.',
      'Saya merakit alur itu dengan Vue.js dan Nuxt.js. Komponen katalog dibuat supaya bisa dipakai ulang, jadi halaman dengan data produk yang banyak tetap ringan dibuka.',
      'Katalog, partner, dan transaksi datang dari REST API lewat Axios. Tailwind dan SASS yang memegang tampilannya, mengikuti desain dari Figma. Di perusahaan yang sama saya juga menyusun situs korporat Treetan: profil, unit usaha, partner, dan kontak.',
    ],
    highlights: [
      'Halaman produk, keranjang, dan checkout',
      'Dashboard seller untuk pihak yang berjualan',
      'Komponen reusable untuk katalog yang panjang',
      'Integrasi REST API untuk katalog, partner, dan transaksi',
      'Situs korporat: perusahaan, bisnis, partner, dan kontak',
    ],
    stack: ['Vue.js', 'Nuxt.js', 'Axios', 'Tailwind CSS', 'SASS', 'SSR'],
  },
  {
    slug: 'whitelabel-partner',
    title: 'Whitelabel Partner',
    eyebrow: 'Satu codebase, banyak merek',
    year: '2023 — Sekarang',
    role: 'Frontend Developer',
    category: 'produk',
    mock: 'label',
    summary:
      'Satu aplikasi Nuxt untuk banyak domain. Logo, warna, dan menu berganti per partner tanpa membuat ulang aplikasinya.',
    story: [
      'Pengunjung membuka domain partner, dan host itu yang menjadi identitas tenant. Setiap panggilan API membawa nama domain, lalu merek, warna, dan bendera menu datang dari pengaturan white-label.',
      'Jadi Aero Hajj, Pos Indonesia, Al-Azhar, Minala, Aqobah, atau Arrayyan bisa tampil dengan wajah masing-masing dari codebase yang sama.',
      'Isinya tetap satu produk yang lengkap: umroh reguler, pembiayaan, tabungan, haji, wisata syariah, promo, akun member, sampai checkout.',
    ],
    highlights: [
      'Theming dinamis: logo, warna, dan menu dari API',
      'Bendera fitur menyalakan atau menyembunyikan bagian UI',
      'Umroh, haji, wisata syariah, pembiayaan, dan akun member',
      'Checkout serta riwayat pesanan, tabungan, dan pembiayaan',
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
      'Layar operasional yang padat: tabel, filter, grafik, dan pagination untuk Travel, TDC, Super Admin, Consultant, Finance, dan Merchandise.',
    story: [
      'Operasional travel butuh layar yang beda peran, tapi polanya mirip: ringkasan, tabel panjang, filter, dan status yang harus kebaca dalam sekali lihat.',
      'Super Admin memegang katalog, pesanan, partner, keuangan, dan percakapan. Peran lain saya pecah ke dashboard Travel, TDC, Consultant, Finance, Merchandise, dan Whitelabel Consultant.',
      'Pinia menyimpan sesi login dan state filter, supaya pindah halaman tidak menghapus konteks yang sedang dikerjakan. Grafik dan tabel saya susun supaya data yang banyak tetap bisa dipindai.',
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
      'Situs pelanggan untuk kanal Pos Indonesia: umroh, haji, wisata syariah, pemesanan, dan pembayaran. Ringan dibuka, siap diindeks.',
    story: [
      'Kanal Pos Indonesia memakai wajahnya sendiri, dengan alur yang tetap familier: memilih paket, memesan, lalu membayar.',
      'Saya kerjakan di Nuxt dengan SSR supaya halaman cepat sampai dan kontennya bisa dibaca mesin pencari, tanpa mengorbankan kerapian layout.',
    ],
    highlights: [
      'Beranda, katalog, dan alur pemesanan',
      'Pembayaran di dalam situs yang sama',
      'SSR supaya halaman ringan dan ramah SEO',
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
      'Website iklan properti Estusae dan Grand Taman Sari, plus aplikasi user, admin, dan report data.',
    story: [
      'Di Makuta Communication saya membangun website periklanan properti untuk Estusae dan Grand Taman Sari.',
      'Selain halaman publik, ada aplikasi web sisi pengguna untuk melihat iklan dan melakukan order, serta sisi admin untuk kelola iklan, approval, dan report. Saya juga membuat aplikasi report data Makuta.',
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
      'Permainan belajar di browser untuk latihan manasik. Bukan aplikasi jamaah, dan bukan pengganti ibadah haji atau umroh.',
    story: [
      'Ini aplikasi terpisah bernama Hidayah Hajj Adventure. Dipakai sebagai simulasi belajar internal, bukan produk yang dibuka jamaah di marketplace.',
      'Ada dua pintu. Pintu pertama langsung ke peta manasik di Makkah: umroh, haji ifrad, qiran, dan tamattu. Pintu kedua mengikuti cerita SHIRATHA, mulai dari Jakarta — rumah, kantor marketplace, pemesanan, bandara Soekarno-Hatta, penerbangan, Jeddah, lalu miqat — sebelum masuk ke manasik yang sama.',
      'Yang dipelajari di peta: ihram, tawaf, sa\'i, wukuf, dan tahalul. Ada juga halaman studio untuk melihat karakter. Progresnya hanya tersimpan di browser, tanpa akun dan tanpa basis data. Lencana di permainan bukan penilaian sah atau tidaknya ibadah.',
    ],
    highlights: [
      'Menjelaskan alur manasik lewat peta, bukan lewat halaman produk',
      'Menyambungkan cerita perjalanan dari kantor SHIRATHA di Jakarta ke rangkaian ibadah',
      'Menjaga batas: ini latihan, bukan ibadah sungguhan',
    ],
    stack: ['HTML', 'Canvas 2D', 'Three.js', 'glTF'],
    disclaimer:
      'Penyusunan kode permainan, peta, dan kartu pelajarannya banyak dibantu AI di Cursor. Saya yang mengarahkan isi manasik dan batas pemakaiannya. Pustaka Three.js tidak saya tulis. Berapa persen tepatnya yang dikerjakan AI tidak tercatat di proyek, jadi saya tidak mencantumkan angka.',
  },
]

export const capabilities = [
  {
    title: 'Pixel-perfect',
    text: 'Jarak, huruf, dan warna saya ikuti dari Figma sampai ke komponen.',
  },
  {
    title: 'REST API',
    text: 'Katalog, pesanan, dan akun tersambung lewat Axios, lengkap dengan keadaan loading-nya.',
  },
  {
    title: 'Komponen reusable',
    text: 'Satu komponen melayani banyak halaman, termasuk katalog yang datanya besar.',
  },
  {
    title: 'State management',
    text: 'Pinia dan Vuex untuk login, filter, dan alur yang harus tetap ada saat pindah halaman.',
  },
  {
    title: 'Performa & SEO',
    text: 'SSR di Nuxt supaya microsite cepat dibuka dan kontennya bisa diindeks.',
  },
]

export const experience = [
  {
    company: 'PT Treetan Nusantara Network',
    role: 'Frontend Developer',
    when: 'Jan 2023 — Sekarang',
    points: [
      'Membangun marketplace: halaman produk, keranjang, checkout, dan dashboard seller dengan Vue.js, Nuxt.js, Axios, Tailwind CSS, dan SASS.',
      'Mengembangkan whitelabel partner: satu codebase, logo, warna, dan menu mudah diganti per partner.',
      'Membangun dashboard Travel, TDC, Super Admin, Consultant, Finance, dan Merchandise. Pinia untuk state login dan filter.',
      'Mengerjakan microsite Pos Indonesia dan situs korporat Treetan, dengan perhatian pada kecepatan muat dan SEO.',
      'Menyusun komponen reusable supaya halaman dengan data produk yang besar tetap ringan.',
    ],
  },
  {
    company: 'Makuta Communication',
    role: 'Frontend Developer',
    when: 'Okt 2021 — Juni 2022',
    points: [
      'Membangun website periklanan properti Estusae dan Grand Taman Sari.',
      'Mengembangkan aplikasi web periklanan sisi pengguna (lihat iklan, order) dan admin (kelola iklan, approval, report) dengan Vue.js.',
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
