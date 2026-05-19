module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const { md5 } = req.query;

  if (!md5) {
    return res.status(400).json({ error: "md5 is required" });
  }

  try {
    const response = await fetch(
      "https://api-bakong.nbc.gov.kh/v1/check_transaction_by_md5",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ md5 }),
      }
    );

    const data = await response.json();
    console.log("Bakong API response:", JSON.stringify(data));

    const isPaid = data?.responseCode === 0 && data?.data !== null;

    return res.status(200).json({
      paid: isPaid,
      bakongResponse: data,
    });

  } catch (err) {
    console.error("Check payment error:", err);
    return res.status(500).json({ error: "Failed to reach Bakong API", detail: err.message });
  }
};
