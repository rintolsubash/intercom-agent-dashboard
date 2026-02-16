export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.intercom.io/conversations?per_page=20",
      {
        headers: {
          Authorization: `Bearer ${process.env.INTERCOM_ACCESS_TOKEN}`,
          Accept: "application/json"
        }
      }
    );

    const raw = await response.json();
    const conversations = raw.conversations || [];

    let open = 0;
    let closed = 0;
    let waiting = 0;

    conversations.forEach(c => {
      if (c.state === "closed") closed++;
      else if (c.waiting_since) waiting++;
      else open++;
    });

    res.status(200).json({
      status: "Intercom API connected ✅",
      totals: {
        all: conversations.length,
        open,
        closed,
        waiting
      },
      sample: conversations.map(c => ({
        id: c.id,
        state: c.state,
        created_at: c.created_at,
        updated_at: c.updated_at,
        waiting_since: c.waiting_since,
        author_type: c.source?.author?.type || "unknown"
      }))
    });

  } catch (error) {
    res.status(500).json({
      error: "Intercom API error",
      details: error.message
    });
  }
}
