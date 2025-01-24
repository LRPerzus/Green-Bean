document.getElementById("scannerImage").addEventListener("click", async function () {
    const qrCodeScanned = document.querySelector(".qrCodeScanned");
    const scannerContainer = document.getElementById("scanningStart");
    
    // Request camera permissions and scan QR code
    const html5QrCode = new Html5Qrcode("scanningStart");
    
    try {
        await html5QrCode.start(
            { facingMode: "environment" }, // Use rear camera if available
            { fps: 10, qrbox: 250 },
            (decodedText) => {
                if (decodedText) {
                    qrCodeScanned.classList.remove("hidden");
                    qrCodeScanned.textContent = `QR Code Scanned: ${decodedText}`;
                    scannerContainer.style.display = "none"; // Hide scanner container
                    html5QrCode.stop(); // Stop scanning after successful scan
                }
            },
            (errorMessage) => {
                console.warn("QR Code scan error:", errorMessage);
            }
        );
    } catch (err) {
        console.error("Camera access denied or error initializing scanner:", err);
    }
});