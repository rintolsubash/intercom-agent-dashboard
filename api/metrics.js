(async () => {
  try {
    const data = {
      message: "Dashboard loaded successfully",
      environment: "Vercel",
      timestamp: new Date().toISOString()
    };

    const output = document.getElementById("output");

    if (!output) {
      throw new Error("Output element not found in HTML");
    }

    output.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    document.getElementById("output").textContent =
      "Error loading metrics: " + err.message;
  }
})();