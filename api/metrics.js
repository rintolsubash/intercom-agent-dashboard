export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.intercom.io/conversations", {
      headers: {
        Authorization: `Bearer ${process.env.INTERCOM_ACCESS_TOKEN}`,
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        error: "Intercom API error",
        details: errorText
      });
    }

    const data = await response.json();
    const conversations = data.conversations || [];

    let open = 0;
    let closed = 0;
    let waiting = 0;

    const sample = conversations.slice(0, 5).map(c => {
      if (c.state === "open") open++;
      if (c.state === "closed") closed++;
      if (c.waiting_since) waiting++;

      return {
        id: c.id,
        state: c.state,
        created_at: c.created_at,
        updated_at: c.updated_at,
        waiting_since: c.waiting_since,
        author_type: c.source?.author?.type || "unknown"
      };
    });

    res.status(200).json({
      status: "Intercom API connected ✅",
      totals: {
        all: conversations.length,
        open,
        closed,
        waiting
      },
      sample
    });

  } catch (error) {
    res.status(500).json({
      error: "Server error",
      message: error.message
    });
  }
}
