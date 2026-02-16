// Frontend JavaScript (runs in browser)
(async function () {
  const output = document.getElementById("output");

  if (!output) {
    console.error("Output element not found");
    return;
  }

  try {
    // Call backend API
    const response = await fetch("/api/metrics");
    const data = await response.json();

    output.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    output.textContent =
      "Error loading metrics:\n" + error.message;
  }
})();