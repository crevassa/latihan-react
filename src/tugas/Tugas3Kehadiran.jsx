import { useState } from "react";

// TUGAS 3: Penghitung kehadiran dengan batas 0 sampai 30.
const MIN = 0;
const MAKS = 30;

export default function PenghitungKehadiran() {
  const [jumlah, setJumlah] = useState(MIN);

  return (
    <>
      <h1>Penghitung Kehadiran</h1>
      <p>
        Jumlah hadir: <strong>{jumlah}</strong> / {MAKS}
      </p>
      <div className="baris-form">
        {/* Tombol Tambah nonaktif di batas atas; clamp tetap dipasang sebagai pengaman */}
        <button
          type="button"
          disabled={jumlah >= MAKS}
          onClick={() => setJumlah((n) => Math.min(MAKS, n + 1))}
        >
          Tambah
        </button>
        {/* Kurangi tetap aktif agar kasus uji "Kurangi saat 0 tetap 0" bisa dicoba */}
        <button
          type="button"
          onClick={() => setJumlah((n) => Math.max(MIN, n - 1))}
        >
          Kurangi
        </button>
        <button type="button" onClick={() => setJumlah(MIN)}>
          Reset
        </button>
      </div>
      <p>{jumlah === 0 ? "Belum ada mahasiswa" : "Ada mahasiswa"}</p>
      {jumlah >= MAKS && <p role="alert">Batas maksimum {MAKS} tercapai.</p>}
    </>
  );
}
