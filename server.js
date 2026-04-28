console.log("Server file started");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/analyze", async (req, res) => {

  const { name, gender, exp, score, decision } = req.body;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + process.env.API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Explain hiring decision fairly:

Candidate: ${name}
Experience: ${exp}
Score: ${score}
Decision: ${decision}`
            }]
            }]
        })
      }
    );

    const data = await response.json();
    const result = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    res.json({ result });

  } catch (err) {
    res.json({ result: "Error in AI processing" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});