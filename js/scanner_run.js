function onScanSuccess(decodedText, decodedResult) {
    // decodedText adalah isi dari QR Code (yaitu NIS)
    document.getElementById('input-nis').value = decodedText;
    
    // Panggil fungsi cari siswa & fokus ke nominal
    cariSiswaByNIS(decodedText);
    document.getElementById('input-nominal').focus();
    
    // Opsional: Matikan scanner setelah berhasil scan 1x
    html5QrcodeScanner.clear();
}

let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", { fps: 10, qrbox: 250 }
);
html5QrcodeScanner.render(onScanSuccess);
