function toggleMode() {
  document.body.classList.toggle("light");
}

function calculateFairScore(exp, score) {
  return (parseFloat(exp) * 0.4) + (parseFloat(score) * 0.6);
}

function getDecision(score) {
  if (score > 70) return "SELECTED";
  if (score > 50) return "CONSIDER";
  return "REJECTED";
}

function getBiasLevel(gender) {
  if (gender === "Female") return "Low Bias Risk";
  if (gender === "Male") return "Moderate Bias Risk";
  return "Neutral";
}

async function analyze() {

  const name = document.getElementById("name").value;
  const gender = document.getElementById("gender").value;
  const exp = document.getElementById("exp").value;
  const score = document.getElementById("score").value;

  const output = document.getElementById("output");

  if (!name || !gender || !exp || !score) {
    output.innerHTML = "⚠ Fill all fields";
    return;
  }

  output.innerHTML = "<span class='loading'>⚡ Analyzing...</span>";

  const fairScore = (parseFloat(exp) * 0.4) + (parseFloat(score) * 0.6);
  let decision = "REJECTED";
  if (fairScore > 70) decision = "SELECTED";
  else if (fairScore > 50) decision = "CONSIDER";

  try {
    const response = await fetch(
      "https://fairhireai.onrender.com/analyze",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          gender,
          exp,
          score,
          decision
        })
      }
    );

    const data = await response.json();

    const ai = data.result || "No response";

    output.innerHTML = `
      <div class="result-box"><b>🤖 AI Explanation</b><br>${ai}</div>
      <div class="result-box"><b>⚖ Decision</b><br>${decision}</div>
      <div class="result-box"><b>📊 Bias Level</b><br>${gender}</div>
      <div class="result-box"><b>📈 Fair Score</b><br>${fairScore.toFixed(2)}</div>
      <div class="result-box"><b>⚡ Status</b><br>Analysis Complete ✔</div>
    `;

  } catch (err) {
    output.innerHTML = "❌ Backend not responding";
  }
}