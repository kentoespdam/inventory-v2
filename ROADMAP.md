# Roadmap Migrasi inventoryCi ke Laravel + Inertia

## Prioritas Pengerjaan

Urutan pengerjaan dari awal hingga akhir dengan checkbox tracking.

---

### Fase 1: Foundation & Infrastructure (HITL)

- [x] **#1 - Project Foundation & Multi-DB Setup**
  - Inisialisasi Laravel + Inertia React
  - Konfigurasi 4 database: `smartoffice`, `inventory`, `azizah`, `sikompak{year}`
  - Setup Redis untuk Session & Cache
  - Struktur domain-driven folders

---

### Fase 2: Authentication (AFK)

- [ ] **#2 - Auth End-to-End**
  - Custom UserProvider (verifikasi ke smartoffice)
  - Login page React + Inertia form
  - Logout & middleware
  - Redirect ke dashboard

- [ ] **#3 - Year Selector**
  - Session-based year dropdown
  - Set default tahun berjalan saat login
  - Shared Inertia prop untuk tahun

---

### Fase 3: Dashboard (AFK)

- [ ] **#4 - Dashboard**
  - DashboardController dengan ringkasan data
  - Widget/stat cards di React

---

### Fase 4: Order Module (AFK)

- [ ] **#5 - Order List**
  - Order index dengan pagination
  - Search/filter functionality
  - Tabel UI dengan data

- [ ] **#6 - Order Detail with Cross-Year Reference**
  - Detail view dengan barang dari `azizah`
  - Referensi pemakaian tahun lalu dari `sikompak{year}`
  - Action button untuk pesan

- [ ] **#7 - Create Order**
  - Create form dengan validation
  - Simpan ke database `inventory`
  - Redirect setelah berhasil

---

### Fase 5: Billing Module (AFK)

- [ ] **#8 - Billing CRUD**
  - Billing list page
  - Create/Update form
  - Proses pembayaran

---

### Fase 6: Reporting (AFK)

- [ ] **#9 - Reporting & Printing**
  - Cetak laporan PDF
  - Print view khusus

---

## Urutan Pengerjaan Summary

| # | Issue | Tipe | Fase |
|---|-------|------|------|
| 1 | Project Foundation & Multi-DB Setup | HITL | 1 |
| 2 | Auth End-to-End | AFK | 2 |
| 3 | Year Selector | AFK | 2 |
| 4 | Dashboard | AFK | 3 |
| 5 | Order List | AFK | 4 |
| 6 | Order Detail with Cross-Year Reference | AFK | 4 |
| 7 | Create Order | AFK | 4 |
| 8 | Billing CRUD | AFK | 5 |
| 9 | Reporting & Printing | AFK | 6 |

---

## Catatan

- Issue #1 (Foundation) harus selesai dulu sebelum yang lain bisa dimulai
- Issue #2, #3 butuh #1
- Issue #4 butuh #2 (karena butuh auth)
- Issue #5-7 butuh #4 (dashboard)
- Issue #8 butuh #7
- Issue #9 butuh #8