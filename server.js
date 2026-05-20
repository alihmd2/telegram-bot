const express = require("express");
const axios = require("axios");

const app = express();

app.get("/convert", async (req, res) => {
  const { from, to, amount } = req.query;

  try {
    const response = await axios.get(
      "https://api.frankfurter.app/latest",
      {
        params: {
          from: from.toUpperCase(),
          to: to.toUpperCase()
        }
      }
    );

    const rate = response.data.rates[to.toUpperCase()];
    const result = Number(amount) * rate;

    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: "conversion failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Backend running on port", PORT);
});