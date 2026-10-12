// TUGAS 2: Daftar mata kuliah dengan komponen kartu + props, 4+ data, key stabil.
function KartuMatkul({ nama, sks, dosen }) {
  return (
    <article className="kartu">
      <h2>{nama}</h2>
      <p>Jumlah SKS: {sks}</p>
      <p>Dosen: {dosen}</p>
    </article>
  );
}

const mataKuliah = [
  { id: "web", nama: "Pemrograman Web", sks: 3, dosen: "Dosen A" },
  { id: "db", nama: "Basis Data", sks: 3, dosen: "Dosen B" },
  { id: "jar", nama: "Jaringan Komputer", sks: 2, dosen: "Dosen C" },
  { id: "pbo", nama: "Pemrograman Berorientasi Objek", sks: 3, dosen: "Dosen D" },
];

export default function DaftarMataKuliah() {
  const totalSks = mataKuliah.reduce((jumlah, item) => jumlah + item.sks, 0);

  return (
    <>
      <h1>Daftar Mata Kuliah</h1>
      <p>
        {mataKuliah.length} mata kuliah, total {totalSks} SKS
      </p>
      {mataKuliah.map((item) => (
        <KartuMatkul
          key={item.id}
          nama={item.nama}
          sks={item.sks}
          dosen={item.dosen}
        />
      ))}
    </>
  );
}
