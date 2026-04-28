// 🌗 Dark/Light Mode Toggle
function toggleMode() {
  document.body.classList.toggle("light");
}

// ⬇ Scroll to App Section
function scrollToApp() {
  const section = document.getElementById("app");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// 🤖 MAIN ANALYZE FUNCTION
async function analyze() {

  console.log("Analyze button clicked"); // DEBUG

  const name = document.getElementById("name").value;
  const gender = document.getElementById("gender").value;
  const exp = document.getElementById("exp").value;
  const score = document.getElementById("score").value;

  const output = document.getElementById("output");

  // ⚠ Validation
  if (!name || !gender || !exp || !score) {
    output.innerHTML = "⚠ Please fill all fields";
    return;
  }

  // ⏳ Loading
  output.innerHTML = "⚡ Analyzing...";

  try {
    // 🚀 Call YOUR backend (Render)
    const response = await fetch("https://fairhireai.onrender.com/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        gender: gender,
        exp: exp,
        score: score,
        decision: "AUTO"
      })
    });

    const data = await response.json();

    console.log("API Response:", data); // DEBUG

    // 📊 Fake bias score (for UI)
    const biasScore = Math.floor(Math.random() * 100);

    // 🧠 Output UI
    output.innerHTML = `
      <div class="result-box">
        <b>🤖 AI Explanation</b><br>
        ${data.result || "No response from AI"}
      </div>

      <div class="result-box">
        <b>📊 Bias Meter</b><br>
        <div style="background:#333;border-radius:10px;">
          <div style="
            width:${biasScore}%;
            background:gold;
            padding:6px;
            border-radius:10px;
            text-align:center;
          ">
            ${biasScore}%
          </div>
        </div>
      </div>

      <div class="result-box">
        <b>⚡ Status</b><br>
        Analysis Complete ✔
      </div>
    `;

  } catch (error) {
    console.error("Error:", error);

    output.innerHTML = `
      <div class="result-box">
        ❌ Backend not responding
      </div>
    `;
  }
}