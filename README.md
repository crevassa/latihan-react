# Latihan React - Pemrograman Web

Satu proyek (Vite + React JavaScript) berisi empat tugas pokok dan dua tugas pengayaan.
Pindah antar tugas lewat tab di bagian atas halaman.

## Menjalankan

```bash
npm install
npm run dev      # buka URL Local yang tampil (biasanya http://localhost:5173)
```

Pemeriksaan tambahan:

```bash
npm run lint
npm run build
npm run preview
```

## Isi

| Tugas | File | Keterangan |
| --- | --- | --- |
| 1 | `src/tugas/Tugas1Profil.jsx` | Profil mahasiswa, 3 komponen, data dari variabel |
| 2 | `src/tugas/Tugas2MataKuliah.jsx` | Kartu mata kuliah dengan props, 4 data, key stabil |
| 3 | `src/tugas/Tugas3Kehadiran.jsx` | Penghitung batas 0-30, tombol Tambah nonaktif di 30 |
| 4 | `src/tugas/Tugas4DaftarTugas.jsx` | Daftar tugas + filter Semua/Aktif/Selesai |
| Pengayaan 1 | (Tugas 4) | localStorage: lazy initializer, try/catch JSON rusak, simpan via useEffect |
| Pengayaan 2 | (Tugas 4) | Edit judul berdasarkan id, validasi kosong, status selesai dipertahankan |

Catatan: karena Pengayaan 1 aktif, tugas tidak lagi kembali ke data awal setelah reload.
Untuk mengosongkan: hapus key `daftar-tugas-kuliah` di DevTools > Application > Local Storage.
