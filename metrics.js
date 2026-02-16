(async () => {
  try {
    const res = await fetch("/api/metrics");
    const data = await res.json();

    // COUNTS
    document.getElementById("totalCount").textContent = data.totals.all;
    document.getElementById("openCount").textContent = data.totals.open;
    document.getElementById("closedCount").textContent = data.totals.closed;
    document.getElementById("waitingCount").textContent = data.totals.waiting;

    // LIST HELPERS
    const openList = document.getElementById("openList");
    const waitingList = document.getElementById("waitingList");
    const closedList = document.getElementById("closedList");

    data.sample.forEach(conv => {
      const li = document.createElement("li");
      li.textContent = conv.id;

      if (conv.state === "closed") {
        closedList.appendChild(li);
      } else if (conv.waiting_since) {
        waitingList.appendChild(li);
      } else {
        openList.appendChild(li);
      }
    });

    // DEBUG OUTPUT
    document.getElementById("debugOutput").textContent =
      JSON.stringify(data, null, 2);

  } catch (err) {
    document.getElementById("debugOutput").textContent =
      "Error loading metrics: " + err.message;
  }
})();
