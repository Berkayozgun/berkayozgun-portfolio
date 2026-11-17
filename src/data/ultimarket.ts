import type { Project } from '@/types/profile';

export const ultimarketProject: Project = {
  id: 'ultimarket',
  title: 'Ultimarket',
  subtitle: 'Edge POS, Telemetri & Gerçek Zamanlı Analitik Motoru',
  category: 'IoT / Edge & Full-Stack',
  year: '2026',
  isFeatured: true,
  featured: true,
  summary:
    'Çok iş parçacıklı Python USB HID barkod servisi, 90 sn zaman aşımlı sepet durum makinesi (<50ms gecikme), 2.000+ ürünlü PostgreSQL/Prisma kataloğu, NVIDIA NIM Vision fatura OCR ve klavye odaklı veresiye defteri.',
  description:
    'Dışa kapalı fiziksel perakende kasalarını bulut tabanlı operasyon konsoluna bağlayan uçtan uca Edge POS, Telemetri ve Gerçek Zamanlı Analitik Motoru. Sıfır girdi kaybı sunan çok iş parçacıklı Python USB HID barkod servisi, 90 saniyelik idle-timeout sepet durum makinesi (<50ms senkronizasyon gecikmesi), 2.000+ ürünlü PostgreSQL/Prisma kataloğu, NVIDIA NIM Vision fatura OCR ve klavye odaklı veresiye defterini tek platformda birleştirir.',
  metrics: [
    { label: 'Katalog', value: '2.000+ Ürün' },
    { label: 'Gecikme', value: '<50ms Gecikme' },
    { label: 'Veri Kaybı', value: '%0 Veri Kaybı' },
  ],
  techStack: [
    'Next.js 16 (App Router)',
    'TypeScript',
    'Python',
    'PostgreSQL',
    'Prisma',
    'Supabase',
    'NVIDIA NIM Vision',
    'Zustand',
  ],
  tags: [
    'Next.js 16 (App Router)',
    'TypeScript',
    'Python',
    'PostgreSQL',
    'Prisma',
    'Supabase',
    'NVIDIA NIM Vision',
    'Zustand',
  ],
  highlights: [
    'İşletim sistemi seviyesinde barkod okuyucu sinyallerini sıfır kayıpla yakalayan çok iş parçacıklı Python USB HID servisi.',
    '90 sn idle-timeout sepet durum makinesi ve ESC kısayolu ile <50ms canlı telemetri senkronizasyonu.',
    'NVIDIA NIM Vision tabanlı fatura OCR otomasyonuyla beslenen 2.000+ ürünlü PostgreSQL/Prisma kataloğu.',
    'Klavye odaklı veresiye defteri ve gerçek zamanlı koyu tema perakende analitik paneli.',
  ],
  privacyNotice:
    'Bu sistem aktif bir perakende işletmesinde çalıştığından ticari veri gizliliği nedeniyle halka açık canlı bağlantı kapatılmıştır.',
  links: {
    github: 'https://github.com/Berkayozgun/ultimarket',
    live: null,
    status: 'Canlı Kullanımda',
  },
  github: 'https://github.com/Berkayozgun/ultimarket',
  demo: '',
  image: '',
};
