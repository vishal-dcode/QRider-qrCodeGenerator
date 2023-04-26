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
        createDownloadBtn(saveUrl); // Create download button to download QR code as image
      }, 50);
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
    const parentElement = saveBtn.parentElement; // Select parent element of saveBtn
    parentElement.remove(); // Remove save button (if it exists)
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

// Create download button to download QR code as image
const createDownloadBtn = (downloadUrl) => {
  const btn = document.createElement("button"); // Create button element
  const link = document.createElement("a"); // Create link element
  link.href = downloadUrl; // Set download URL
  link.download = "qrcode.png"; // Set download filename
  link.innerHTML = "Download QR Code"; // Set link text content
  btn.appendChild(link); // Add link to button
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const link = e.target.querySelector("a");
    const url = link.href;
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "qrcode.png";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }); // Add click event listener to simulate download
  document.getElementById("generated").appendChild(btn); // Add button to parent container
};

// Create save button to download QR code as image
const createSaveBtn = (saveUrl) => {
  const btn = document.createElement("button"); // Create button element
  const link = document.createElement("a"); // Create link element
  link.id = "saveLink"; // Set link ID for future reference
  link.href = saveUrl; // Set download URL
  link.download = "qrcode.png"; // Set download filename
  link.innerHTML = "Download QR Code"; // Set link text content
  btn.appendChild(link); // Add link to button
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const link = e.target.querySelector("a");
    const url = link.href;
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "qrcode.png";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }); // Add click event listener to simulate download
  document.getElementById("generated").appendChild(btn); // Add button to parent container
};

hideSpinner(); // Hide loading spinner by default

// Add event listener for form submit
form.addEventListener("submit", onGenerateSubmit);
