// Fungsi Saat QR Code NIS Berhasil Terbaca Kamera
function onScanSuccess(decodedText, decodedResult) {
    // Ambil elemen dropdown Pilih Siswa
    const selectSiswa = document.getElementById('pilih-siswa'); // ⚠️ SESUAIKAN ID <select> SISWA MAS BRO

    if (selectSiswa) {
        let found = false;
        const scannedNIS = decodedText.trim();

        // Loop seluruh pilihan (<option>) di dalam dropdown
        for (let i = 0; i < selectSiswa.options.length; i++) {
            const option = selectSiswa.options[i];
            
            // Cek apakah nilai option atau teks nama mengandung NIS yang di-scan
            if (option.value.trim() === scannedNIS || option.text.includes(scannedNIS)) {
                selectSiswa.selectedIndex = i; // Otomatis pilih siswa tersebut
                
                // Trigger event 'change' jika dropdown memiliki event listener
                selectSiswa.dispatchEvent(new Event('change')); 
                found = true;
                break;
            }
        }

        if (!found) {
            alert(`Siswa dengan NIS/QR "${scannedNIS}" tidak ditemukan dalam daftar dropdown.`);
        } else {
            // Mainkan suara beep penanda sukses
            playBeepSound();

            // Pindahkan kursor otomatis ke kolom Nominal Setoran
            const inputNominal = document.getElementById('input-nominal'); // ⚠️ SESUAIKAN ID NOMINAL MAS BRO
            if (inputNominal) {
                inputNominal.focus();
            }
        }
    }

    // Matikan kamera setelah scan berhasil
    stopScanner();
}
