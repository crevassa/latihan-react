import { useEffect, useRef, useState } from "react";

// TUGAS 4 + PENGAYAAN 1 (localStorage) + PENGAYAAN 2 (edit judul).
const STORAGE_KEY = "daftar-tugas-kuliah";
const TUGAS_AWAL = [{ id: "awal", judul: "Pelajari JSX", selesai: false }];

const FILTER = [
  { id: "semua", label: "Semua" },
  { id: "aktif", label: "Aktif" },
  { id: "selesai", label: "Selesai" },
];

function buatId() {
  // randomUUID hanya ada di secure context
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function valid(data) {
  return (
    Array.isArray(data) &&
    data.every(
      (t) =>
        t &&
        typeof t.id === "string" &&
        typeof t.judul === "string" &&
        typeof t.selesai === "boolean"
    )
  );
}

// Lazy initializer: hanya membaca. Data tersimpan TIDAK dihapus di sini,
// jika JSON rusak cukup kembali ke data awal.git
function bacaTugasAwal() {
  try {
    const mentah = localStorage.getItem(STORAGE_KEY);
    if (mentah === null) return TUGAS_AWAL;
    const data = JSON.parse(mentah);
    return valid(data) ? data : TUGAS_AWAL;
  } catch {
    return TUGAS_AWAL;
  }
}

function ItemTugas({
  item,
  sedangEdit,
  draft,
  errorEdit,
  onToggle,
  onHapus,
  onMulaiEdit,
  onUbahDraft,
  onSimpanEdit,
  onBatalEdit,
}) {
  if (sedangEdit) {
    return (
      <li>
        <form
          className="form-edit"
          onSubmit={(event) => {
            event.preventDefault();
            onSimpanEdit();
          }}
          onKeyDown={(event) => event.key === "Escape" && onBatalEdit()}
        >
          <label htmlFor={`edit-${item.id}`} className="sr-only">
            Ubah judul tugas
          </label>
          <input
            id={`edit-${item.id}`}
            value={draft}
            autoFocus
            onChange={(event) => onUbahDraft(event.target.value)}
          />
          <button type="submit">Simpan</button>
          <button type="button" className="sekunder" onClick={onBatalEdit}>
            Batal
          </button>
          {errorEdit && (
            <p role="alert" className="error-edit">
              {errorEdit}
            </p>
          )}
        </form>
      </li>
    );
  }

  return (
    <li className={item.selesai ? "selesai" : ""}>
      <span>{item.judul}</span>
      <button type="button" onClick={() => onToggle(item.id)}>
        {item.selesai ? "Batalkan" : "Selesai"}
      </button>
      <button
        type="button"
        className="sekunder"
        onClick={() => onMulaiEdit(item)}
      >
        Edit
      </button>
      <button type="button" className="bahaya" onClick={() => onHapus(item.id)}>
        Hapus
      </button>
    </li>
  );
}

export default function DaftarTugasKuliah() {
  const [judul, setJudul] = useState("");
  const [error, setError] = useState("");
  const [tugas, setTugas] = useState(bacaTugasAwal);
  const [filter, setFilter] = useState("semua");

  // State edit: simpan id (bukan indeks) agar identitas tugas tetap sama.
  const [editId, setEditId] = useState(null);
  const [draft, setDraft] = useState("");
  const [errorEdit, setErrorEdit] = useState("");

  // Simpan ke localStorage setiap tugas berubah. Referensi array awal dilewati
  // supaya isi penyimpanan tidak tertimpa sebelum pengguna mengubah apa pun.
  const tugasAwal = useRef(tugas);
  useEffect(() => {
    if (tugas === tugasAwal.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tugas));
    } catch {
      // Penyimpanan penuh/diblokir: aplikasi tetap jalan dari memori.
    }
  }, [tugas]);

  function tambah(event) {
    event.preventDefault();
    const teks = judul.trim();
    if (!teks) {
      setError("Judul tugas wajib diisi.");
      return;
    }
    const item = { id: buatId(), judul: teks, selesai: false };
    setTugas((lama) => [...lama, item]);
    setJudul("");
    setError("");
  }

  function toggle(id) {
    setTugas((lama) =>
      lama.map((item) =>
        item.id === id ? { ...item, selesai: !item.selesai } : item
      )
    );
  }

  function hapus(id) {
    setTugas((lama) => lama.filter((item) => item.id !== id));
    if (id === editId) batalEdit();
  }

  function mulaiEdit(item) {
    setEditId(item.id);
    setDraft(item.judul);
    setErrorEdit("");
  }

  function batalEdit() {
    setEditId(null);
    setDraft("");
    setErrorEdit("");
  }

  function simpanEdit() {
    const teks = draft.trim();
    if (!teks) {
      setErrorEdit("Judul tugas tidak boleh kosong.");
      return;
    }
    // Hanya judul yang berubah; id dan status selesai dipertahankan.
    setTugas((lama) =>
      lama.map((item) =>
        item.id === editId ? { ...item, judul: teks } : item
      )
    );
    batalEdit();
  }

  const jumlahSelesai = tugas.filter((item) => item.selesai).length;

  // Filter hanya memengaruhi tampilan; state `tugas` tidak diubah.
  const tampil = tugas.filter((item) =>
    filter === "aktif" ? !item.selesai : filter === "selesai" ? item.selesai : true
  );

  return (
    <>
      <h1>Daftar Tugas Kuliah</h1>
      <form onSubmit={tambah}>
        <label htmlFor="judul">Judul tugas</label>
        <div className="baris-form">
          <input
            id="judul"
            value={judul}
            onChange={(event) => setJudul(event.target.value)}
          />
          <button type="submit">Tambah</button>
        </div>
      </form>
      {error && <p role="alert">{error}</p>}
      <p>
        Selesai {jumlahSelesai} dari {tugas.length} tugas
      </p>

      <div className="baris-form filter" role="group" aria-label="Filter tugas">
        {FILTER.map((f) => (
          <button
            key={f.id}
            type="button"
            className={f.id === filter ? "" : "sekunder"}
            aria-pressed={f.id === filter}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {tugas.length === 0 ? (
        <p>Belum ada tugas.</p>
      ) : tampil.length === 0 ? (
        <p>Tidak ada tugas pada filter ini.</p>
      ) : (
        <ul>
          {tampil.map((item) => (
            <ItemTugas
              key={item.id}
              item={item}
              sedangEdit={item.id === editId}
              draft={draft}
              errorEdit={errorEdit}
              onToggle={toggle}
              onHapus={hapus}
              onMulaiEdit={mulaiEdit}
              onUbahDraft={setDraft}
              onSimpanEdit={simpanEdit}
              onBatalEdit={batalEdit}
            />
          ))}
        </ul>
      )}
    </>
  );
}
