import { useState } from "react";
import ProfilMahasiswa from "./tugas/Tugas1Profil.jsx";
import DaftarMataKuliah from "./tugas/Tugas2MataKuliah.jsx";
import PenghitungKehadiran from "./tugas/Tugas3Kehadiran.jsx";
import DaftarTugasKuliah from "./tugas/Tugas4DaftarTugas.jsx";

// Satu proyek memuat keempat tugas pokok (+ pengayaan di Tugas 4).
// Tab hanya state sederhana: tidak perlu router.
const HALAMAN = [
  { id: "t1", label: "1. Profil", Komponen: ProfilMahasiswa },
  { id: "t2", label: "2. Mata Kuliah", Komponen: DaftarMataKuliah },
  { id: "t3", label: "3. Kehadiran", Komponen: PenghitungKehadiran },
  { id: "t4", label: "4. Daftar Tugas", Komponen: DaftarTugasKuliah },
];

export default function App() {
  const [aktif, setAktif] = useState("t1");
  const { Komponen } = HALAMAN.find((h) => h.id === aktif);

  return (
    <>
      <nav className="tab-nav" aria-label="Pilih tugas praktikum">
        {HALAMAN.map((h) => (
          <button
            key={h.id}
            type="button"
            className={h.id === aktif ? "tab aktif" : "tab"}
            aria-current={h.id === aktif ? "page" : undefined}
            onClick={() => setAktif(h.id)}
          >
            {h.label}
          </button>
        ))}
      </nav>
      <main>
        <Komponen />
      </main>
    </>
  );
}
