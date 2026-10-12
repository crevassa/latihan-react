// TUGAS 1: Profil mahasiswa dengan JSX + minimal dua komponen.
const nama = "Yosia Darrel Noventino";
const nim = "255314079";
const programStudi = "Informatika";

function Judul() {
  return <h1>Profil Mahasiswa</h1>;
}

function KartuProfil({ nama, nim, programStudi }) {
  return (
    <section className="kartu">
      <p>
        Selamat datang, <strong>{nama}</strong>.
      </p>
      <dl>
        <dt>NIM</dt>
        <dd>{nim}</dd>
        <dt>Program Studi</dt>
        <dd>{programStudi}</dd>
      </dl>
    </section>
  );
}

export default function ProfilMahasiswa() {
  return (
    <>
      <Judul />
      <KartuProfil nama={nama} nim={nim} programStudi={programStudi} />
    </>
  );
}