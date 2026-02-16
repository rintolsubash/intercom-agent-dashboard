export default async function handler(req, res) {
  try {
    // Temporary test response (we add Intercom next)
    res.status(200).json({
      status: "Backend API working ✅",
      message: "This data is coming from /api/metrics",
      time: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      error: "API failed",
      details: error.message
    });
  }
}
