import type { Project } from '@/types/profile';

export const ultimarketProject: Project = {
  id: "ultimarket",
  title: "Ultimarket",
  subtitle: "Edge POS Telemetry & Real-Time Analytics",
  category: "IoT / Edge & Full-Stack",
  year: "2026",
  isFeatured: true,
  summary: "Fiziksel market kasasındaki masaüstü POS sistemini dışarıya açan donanım seviyesinde telemetri ajanı, gerçek zamanlı sepet segmentasyonu ve analitik konsolu.",
  description: "Geleneksel masaüstü POS yazılımlarının dışa kapalı mimarisini aşmak ve kasa operasyonundaki kör noktaları yok etmek için geliştirilmiş uçtan uca perakende platformu. Kasadaki barkod tarayıcı girdilerini OS seviyesinde yakalayan hafif bir Python ajanı, hızlı seri okutmalarda veri kaybını sıfırlayan in-memory kuyruk mimarisi ve sepetleri otomatik segmente eden zaman aşımı durum motoru içerir. Supabase ve Next.js altyapısıyla 2.000+ ürünlük katalogda sub-second canlı veri akışı sağlar.",
  metrics: [
    { label: "Katalog", value: "2.000+ Ürün" },
    { label: "Gecikme (Sync)", value: "<50ms" },
    { label: "Veri Kaybı", value: "%0" }
  ],
  techStack: [
    "Next.js 16 (App Router)",
    "TypeScript",
    "Python",
    "Supabase (PostgreSQL)",
    "Prisma",
    "Zustand",
    "Tailwind CSS"
  ],
  highlights: [
    "Donanım Düzeyi Müdahale: Barkod okuyucu klavye/HID sinyallerini işletim sistemi arka planında dinleyen çok iş parçacıklı (multithreaded) edge ajan.",
    "Kuyruk & Eşzamanlılık (Queue & Concurrency): Hızlı ürün okutmalarında ağ kilitlenmelerini önleyen yerel iş parçacığı kuyruğu.",
    "Dinamik Sepet Segmentasyonu: Kasa başı müşteri ritmine göre optimize edilmiş 90s IDLE_TIMEOUT ve donanımsal kısayol (ESC) ile otomatik fiş kapatma kurgusu.",
    "Canlı Terminal & Analitik: Günlük ciro, sepet dağılımı ve saatlik kasa yoğunluğunu gerçek zamanlı sunan endüstriyel koyu tema operasyon paneli."
  ],
  privacyNotice: "Bu sistem aktif bir perakende işletmesinde çalıştığından ticari veri gizliliği nedeniyle halka açık canlı bağlantı kapatılmıştır.",
  links: {
    github: null,
    live: null,
    status: "In Production (Private Network)"
  }
};
