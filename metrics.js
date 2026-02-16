(async () => {
  try {
    const res = await fetch("/api/metrics");
    const data = await res.json();

    // Update cards
    document.getElementById("total").textContent = data.totals.all;
    document.getElementById("open").textContent = data.totals.open;
    document.getElementById("closed").textContent = data.totals.closed;
    document.getElementById("waiting").textContent = data.totals.waiting;

    // Debug output
    document.getElementById("output").textContent =
      JSON.stringify(data, null, 2);

  } catch (err) {
    document.getElementById("output").textContent =
      "Error loading metrics: " + err.message;
  }
})();
