// Function to start QR code scanning
async function startQRCodeScanning() {
    const qrCodeScanned = document.querySelector(".qrCodeScanned");
    const scanningStart = document.getElementById("scanningStart");

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
                    scanningStart.style.display = "none"; // Hide scanner container

                    // Remove the images if they exist to ensure they are re-added later
                    const scannerBorder = document.getElementById("scannerBorder");
                    const scannerImage = document.getElementById("scannerImage");
                    if (scannerBorder) scanningStart.removeChild(scannerBorder);
                    if (scannerImage) scanningStart.removeChild(scannerImage);

                    html5QrCode.stop().then(() => {
                        setTimeout(() => {
                            qrCodeScanned.classList.add("hidden");
                            scanningStart.style.display = "block"; // Restore scanner container

                            // Clear inline styles from scanningStart
                            scanningStart.removeAttribute("style");

                            // Re-add the images to the scanningStart container
                            const newScannerBorder = document.createElement("img");
                            newScannerBorder.id = "scannerBorder";
                            newScannerBorder.src = "./assets/scannerFrame.png";
                            scanningStart.appendChild(newScannerBorder);

                            const newScannerImage = document.createElement("img");
                            newScannerImage.id = "scannerImage";
                            newScannerImage.src = "./assets/scanme.png";
                            scanningStart.appendChild(newScannerImage);

                            // Reattach the click event to the new scannerImage element
                            newScannerImage.addEventListener("click", startQRCodeScanning); // Reassign click event
                        }, 3000); // Reset after 3 seconds
                    });
                }
            },
            (errorMessage) => {
                console.warn("QR Code scan error:", errorMessage);
            }
        );
    } catch (err) {
        console.error("Camera access denied or error initializing scanner:", err);
    }
}

// Initial click event for starting the scan
document.getElementById("scannerImage").addEventListener("click", startQRCodeScanning);
