# PRD - Migrasi inventoryCi ke Laravel + Inertia (React CSR)

## 1. Gambaran Umum
Migrasi penuh (Big Bang) dari CodeIgniter 4 ke Laravel dengan stack **Inertia + React (CSR)**. Aplikasi saat ini kecil dan simpel, sehingga strategi Big Bang dipilih. Basis data existing tidak boleh diubah strukturnya, hanya diazinkan penambahan tabel/kolom baru di database `inventory`.

## 2. Arsitektur Database
| Database | Fungsi | Sifat |
|----------|---------|--------|
| `smartoffice` | Autentikasi user | Read-only |
| `inventory` | Main database CRUD (order, billing) | Read/Write |
| `azizah` | Master data inventory (filter) | Read-only |
| `sikompak{tahun}` | Data pemakaian per tahun | Read-only, dinmis |

## 3. Autentikasi & Session
- **Auth Provider**: Custom UserProvider, verifikasi password MySQL `PASSWORD()` langsung ke `smartoffice`
- **Tabel users lokal**: Tidak digunakan, data user selalu dibaca langsung dari `smartoffice`
- **Remember token**: Tidak digunakan
- **Session & Cache**: Redis

## 4. Tahun Aktif (Session-based)
- Default tahun berjalan, disimpan di session.
- Dapat diubah melalui dropdown di UI (hanya modif session, tidak ubah URL).
- Data tahun lalu hanya diakses saat proses **DetailOrder** untuk referensi pemakaian.

## 5. Struktur Kode (Domain-Driven)
```
app/
├── Http/
┘   ├── Controllers/         # Thin Controllers, tidak ada logika bisnis
├── Domain/
│   ├── Auth/
│   │   ├── Services/
│   │   └── Repositories/
│   ├── Order/
│   │   ├── Services/
│   │   ├── Repositories/
│   │   └─━ Actions/
│   ├── Billing/
│   │   ├── Services/
│   │   └── Repositories/
│   ├── Cetak/
│       └── Services/
├── Services/               # Shared services lintas domain
│   ├── SmartOfficeAuthService.php
│   └── SikompaConnector.php
└── Support/                # Helper, traits, value objects
```

### Prinsip Kode
- **Thin Controllers** — hanya menerima request & return response.
- **Services** — reusable business logic.
- **Actions** — single-responsibility task (misal: CreateOrderAction).
- **Repositories** — abstraksi akses data (Eloquent/Query Builder/raw SQL).

## 6. Prioritas Implementasi
1. **Modul Auth** (Login/Logout, Session Redis)
2. **Modul Dashboard** (Ringkasan data)
3. **Modul Order** (Persediaan, DetailOrder, referensi tahun lalu)
4. **Modul Billing** (Rekair)
5. **Modul Cetak** (Laporan/cetakan)
