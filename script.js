document.getElementById('hitungButton').addEventListener('click', hitungKalkulator);

function hitungKalkulator() {
    // 1. Ambil input
    const uangJajanInput = document.getElementById('uangJajan').value;
    const uangJajan = parseFloat(uangJajanInput);

    // Dapatkan elemen hasil
    const resultSection = document.querySelector('.result-section');
    const minPengeluaranEl = document.getElementById('minPengeluaran');
    const tabunganMingguEl = document.getElementById('tabunganMinggu');
    const tabunganBulanEl = document.getElementById('tabunganBulan');
    const tabunganTahunEl = document.getElementById('tabunganTahun');

    // 2. Validasi Input
    if (isNaN(uangJajan) || uangJajan <= 0) {
        alert("🚨 Mohon masukkan nominal uang jajan harian yang valid dan positif!");
        resultSection.classList.add('hidden');
        return;
    }

    // 3. Logika Perhitungan (Asumsi & Konstanta)
    // Asumsi: Minimal pengeluaran harian adalah 30% dari uang jajan harian.
    // Sisa (70%) adalah potensi tabungan.
    const persentasePengeluaran = 0.30;
    const persentaseTabungan = 1 - persentasePengeluaran;

    const hariPerMinggu = 7;
    const hariPerBulan = 30; // Rata-rata
    const hariPerTahun = 365;

    // A. Pengeluaran Harian Minimal (30%)
    const minPengeluaranHarian = uangJajan * persentasePengeluaran;

    // B. Potensi Tabungan Harian (70%)
    const potensiTabunganHarian = uangJajan * persentaseTabungan;

    // C. Tabungan Periodik
    const tabunganMinggu = potensiTabunganHarian * hariPerMinggu;
    const tabunganBulan = potensiTabunganHarian * hariPerBulan;
    const tabunganTahun = potensiTabunganHarian * hariPerTahun;

    // 4. Formatting Rupiah
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    });

    // 5. Tampilkan Hasil
    minPengeluaranEl.textContent = formatter.format(minPengeluaranHarian);
    tabunganMingguEl.textContent = formatter.format(tabunganMinggu);
    tabunganBulanEl.textContent = formatter.format(tabunganBulan);
    tabunganTahunEl.textContent = formatter.format(tabunganTahun);

    // Tampilkan bagian hasil
    resultSection.classList.remove('hidden');

    // Beri sedikit feedback interaktif
    document.getElementById('hitungButton').textContent = "Hitung Ulang!";

    // Scroll ke bagian hasil
    resultSection.scrollIntoView({ behavior: 'smooth' });

    // Tambahkan sedikit humor
    console.log(`Dengan jajan Rp${uangJajanInput} per hari, Anda bisa menabung setara ${formatter.format(tabunganTahun)} per tahun. Waktunya ganti mobil! (Atau beli saham kopi...)`);
}