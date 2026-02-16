export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.intercom.io/conversations?per_page=5", {
      headers: {
        Authorization: `Bearer ${process.env.INTERCOM_ACCESS_TOKEN}`,
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(500).json({
        error: "Intercom API error",
        details: text
      });
    }

    const data = await response.json();

    res.status(200).json({
      status: "Intercom API connected ✅",
      total_conversations: data.total_count ?? "unknown",
      sample_conversations: data.conversations?.slice(0, 3) || []
    });
  } catch (err) {
    res.status(500).json({
      error: "Server error",
      message: err.message
    });
  }
}
