const { BakongKHQR, khqrData, IndividualInfo } = require("bakong-khqr");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { amount, merchantName } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const optionalData = {
      currency: khqrData.currency.usd,
      amount: parseFloat(amount),
    };

    const individualInfo = new IndividualInfo(
      "puthyon_chandara@bkrt",
      merchantName || "Puthyon Chandara",
      "Phnom Penh",
      optionalData
    );

    const KHQR = new BakongKHQR();
    const result = KHQR.generateIndividual(individualInfo);

    console.log("SDK result:", JSON.stringify(result));

    if (!result || !result.data) {
      return res.status(500).json({ error: "Failed to generate QR", detail: result });
    }

    return res.status(200).json({
      qr: result.data.qr,
      md5: result.data.md5,
    });

  } catch (err) {
    console.error("Generate QR error:", err);
    return res.status(500).json({ error: "Server error", detail: err.message });
  }
};
