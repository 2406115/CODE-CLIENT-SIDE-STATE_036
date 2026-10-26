"use strict";

/* =========================================================
   LOCAL STORAGE
   Key yang dipakai: "tema", "kunjungan", "komentar"
   ========================================================= */

/* ---------- 1. Tema (terang/gelap) ---------- */
const tombolTema = document.querySelector("#btn-tema");

function perbaruiTeksTombol() {
    const gelap = document.body.classList.contains("dark-mode");
    tombolTema.textContent = gelap ? "Mode Terang" : "Mode Gelap";
}

function toggleTema() {
    document.body.classList.toggle("dark-mode");
    const temaSekarang = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("tema", temaSekarang);   // simpan
    perbaruiTeksTombol();
}

function muatPreferensiTema() {
    const tema = localStorage.getItem("tema");    // muat
    if (tema === "dark") {
        document.body.classList.add("dark-mode");
    }
    perbaruiTeksTombol();
}

tombolTema.addEventListener("click", toggleTema);
muatPreferensiTema();


/* ---------- 2. Penghitung kunjungan ---------- */
function hitungKunjungan() {
    let jumlah = parseInt(localStorage.getItem("kunjungan")) || 0;
    jumlah++;
    localStorage.setItem("kunjungan", jumlah);
    document.querySelector("#info-kunjungan").textContent =
        `Kamu sudah mengunjungi halaman ini ${jumlah} kali di browser ini.`;
}
hitungKunjungan();


/* ---------- 3. Buku tamu (komentar) ---------- */
const formKomentar = document.querySelector("#form-komentar");
const daftarKomentar = document.querySelector("#daftar-komentar");

function tampilkanKomentar(nama, pesan) {
    const li = document.createElement("li");
    li.textContent = `${nama}: ${pesan}`;         // textContent: aman dari XSS
    daftarKomentar.appendChild(li);
}

function simpanKomentar(nama, pesan) {
    const daftar = JSON.parse(localStorage.getItem("komentar")) || [];
    daftar.push({ nama, pesan });
    localStorage.setItem("komentar", JSON.stringify(daftar));
}

function muatKomentar() {
    const daftar = JSON.parse(localStorage.getItem("komentar")) || [];
    daftar.forEach((k) => tampilkanKomentar(k.nama, k.pesan));
}

muatKomentar();

formKomentar.addEventListener("submit", (e) => {
    e.preventDefault();
    const nama = document.querySelector("#input-nama").value.trim();
    const pesan = document.querySelector("#input-pesan").value.trim();
    if (nama === "" || pesan === "") {
        alert("Nama dan pesan wajib diisi!");
        return;
    }
    tampilkanKomentar(nama, pesan);
    simpanKomentar(nama, pesan);
    formKomentar.reset();
});


/* ---------- 4. Shortcut keyboard "d" untuk ganti tema ---------- */
document.addEventListener("keydown", (e) => {
    const tag = e.target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") return;
    if (e.key.toLowerCase() === "d") {
        toggleTema();
    }
});


/* ---------- 5. Reset semua data tersimpan ---------- */
document.querySelector("#btn-reset").addEventListener("click", () => {
    if (confirm("Hapus semua data tersimpan (tema, kunjungan, komentar)?")) {
        localStorage.clear();
        location.reload();
    }
});
