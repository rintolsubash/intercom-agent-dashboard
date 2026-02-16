export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.intercom.io/conversations?per_page=50", {
      headers: {
        Authorization: `Bearer ${process.env.INTERCOM_ACCESS_TOKEN}`,
        Accept: "application/json"
      }
    });

    const data = await response.json();

    const open = [];
    const waiting = [];
    const closed = [];

    (data.conversations || []).forEach(conv => {
      if (conv.state === "open") open.push(conv.id);
      else if (conv.state === "waiting") waiting.push(conv.id);
      else if (conv.state === "closed") closed.push(conv.id);
    });

    res.status(200).json({
      status: "Intercom API connected ✅",
      totals: {
        all: open.length + waiting.length + closed.length,
        open: open.length,
        waiting: waiting.length,
        closed: closed.length
      },
      open,
      waiting,
      closed
    });
  } catch (error) {
    res.status(500).json({
      error: "Intercom API error",
      details: error.message
    });
  }
}
