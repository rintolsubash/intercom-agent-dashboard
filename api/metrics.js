document.getElementById("output").textContent =
  JSON.stringify(
    {
      status: "UI working",
      time: new Date().toISOString()
    },
    null,
    2
  );
