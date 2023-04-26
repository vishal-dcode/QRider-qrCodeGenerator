// Get the generate form and the QR code container
const form = document.getElementById("generate-form"),
  qr = document.getElementById("qrcode");

// Handle form submit
const onGenerateSubmit = (e) => {
  e.preventDefault(); // Prevent default form submission behavior

  clearUI(); // Clear previous QR code and save button (if any)

  // Get URL and size input values
  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  // Validate URL input
  if (url === "") {
    alert("Please enter a URL");
  } else {
    showSpinner(); // Show loading spinner

    // Wait for 1.5 seconds before generating QR code (to simulate a delay)
    setTimeout(() => {
      hideSpinner(); // Hide loading spinner

      // Generate QR code and show save button after a 50ms delay
      generateQRCode(url, size);
      setTimeout(() => {
        const saveUrl = qr.querySelector("img").src; // Get QR code image source URL
        createSaveBtn(saveUrl); // Create save button to download QR code as image
      });
    }, 1500);
  }
};

// Generate QR code using the QRCode library
const generateQRCode = (url, size) => {
  const qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
};

// Clear QR code and save button
const clearUI = () => {
  qr.innerHTML = ""; // Clear QR code container
  const saveBtn = document.getElementById("saveLink"); // Check if save button exists
  if (saveBtn) {
    saveBtn.remove(); // Remove save button (if it exists)
  }
};

// Show loading spinner
const showSpinner = () => {
  document.getElementById("spinner").style.display = "block";
};

// Hide loading spinner
const hideSpinner = () => {
  document.getElementById("spinner").style.display = "none";
};

// Create save button to download QR code as image
const createSaveBtn = (saveUrl) => {
  const link = document.createElement("a"); // Create link element
  link.id = "saveLink"; // Set link ID for future reference
  link.classList = "btn";
  link.href = saveUrl; // Set download URL
  link.download = "qrcode"; // Set download filename
  link.innerHTML = "Download QR Code"; // Set link text content
  document.getElementById("generated").appendChild(link); // Add button to parent container
};

hideSpinner(); // Hide loading spinner by default

// Add event listener for form submit
form.addEventListener("submit", onGenerateSubmit);
