let html5QrCode = null;
let isScanning = false;

// Fungsi Buka/Tutup Kamera Scanner
function toggleCameraScanner() {
    const wrapper = document.getElementById('qr-reader-wrapper');
    const btn = document.getElementById('btn-toggle-camera');

    if (!isScanning) {
        wrapper.style.display = 'block';
        btn.innerHTML = '❌ Tutup Kamera';
        startScanner();
    } else {
        stopScanner();
    }
}

// Fungsi Menjalankan Kamera
function startScanner() {
    html5QrCode = new Html5Qrcode("qr-reader");
    
    // Gunakan kamera belakang (facingMode: "environment")
    const config = { fps: 10, qrbox: { width: 220, height: 220 } };

    html5QrCode.start(
        { facingMode: "environment" }, 
        config, 
        onScanSuccess
    ).then(() => {
        isScanning = true;
    }).catch(err => {
        alert("Gagal mengakses kamera: " + err);
        stopScanner();
    });
}

// Fungsi Saat QR Code Berhasil Terbaca
function onScanSuccess(decodedText, decodedResult) {
    // 1. Isikan NIS hasil scan ke input kolom NIS
    const inputNIS = document.getElementById('login-user'); // Sesuaikan ID input NIS Mas Bro
    if (inputNIS) {
        inputNIS.value = decodedText;
    }

    // 2. Mainkan suara 'beep' singkat sebagai penanda (Opsional tapi keren!)
    playBeepSound();

    // 3. Pindahkan kursor fokus otomatis ke kolom Nominal Pembayaran
    const inputNominal = document.getElementById('input-nominal'); // Sesuaikan ID input Nominal
    if (inputNominal) {
        inputNominal.focus();
    }

    // 4. Matikan kamera otomatis agar hemat baterai & memori
    stopScanner();
}

// Fungsi Menghentikan Kamera
function stopScanner() {
    if (html5QrCode && isScanning) {
        html5QrCode.stop().then(() => {
            html5QrCode.clear();
            document.getElementById('qr-reader-wrapper').style.display = 'none';
            document.getElementById('btn-toggle-camera').innerHTML = '📷 Scan QR NIS via Kamera';
            isScanning = false;
        }).catch(err => console.error("Gagal menghentikan scanner", err));
    } else {
        document.getElementById('qr-reader-wrapper').style.display = 'none';
        document.getElementById('btn-toggle-camera').innerHTML = '📷 Scan QR NIS via Kamera';
        isScanning = false;
    }
}

// Efek Suara Beep saat Berhasil Scan
function playBeepSound() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = "sine";
    osc.frequency.value = 800; // Frekuensi nada (Hz)
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.15); // Durasi beep 0.15 detik
}
