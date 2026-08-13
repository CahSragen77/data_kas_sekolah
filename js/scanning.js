// Mengambil elemen input NIS
const nisInput = document.getElementById('input-nis'); // sesuaikan ID kolom NIS di HTML Mas Bro

nisInput.addEventListener('keypress', function(e) {
    // Jika tombol Enter ditekan (otomatis dikirim oleh alat scanner setelah scan QR)
    if (e.key === 'Enter') {
        e.preventDefault(); // Cegah form terkirim otomatis
        
        const nisValue = this.value;
        
        // 1. Panggil fungsi untuk cari nama siswa berdasarkan NIS ini
        cariSiswaByNIS(nisValue); 
        
        // 2. Otomatis pindahkan kursor fokus ke kolom Nominal Pembayaran
        document.getElementById('input-nominal').focus(); 
    }
});

function cariSiswaByNIS(nis) {
    // Contoh logika mencari data siswa dari Google Sheets / Array Data Siswa
    // Misal: set nama siswa otomatis di kolom Nama
    console.log("Mencari siswa dengan NIS:", nis);
    // ... isi logika pencarian nama siswa di sini ...
}
