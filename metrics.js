(async () => {
  try {
    const res = await fetch("/api/metrics");
    const data = await res.json();

    document.getElementById("output").textContent =
      JSON.stringify(data, null, 2);
  } catch (err) {
    document.getElementById("output").textContent =
      "Error loading metrics: " + err.message;
  }
})();
