function toggleMode() {
  document.body.classList.toggle("light");
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

  output.innerHTML = "⚡ Analyzing...";

  try {
    const response = await fetch(
      "https://fairhireai.onrender.com/analyze",
      {
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
      }
    );

    function scrollToApp() {
  document.getElementById("app").scrollIntoView({
    behavior: "smooth"
  });
}

    const data = await response.json();

    output.innerHTML = `
      <div class="result-box">
        <b>🤖 AI Result</b><br>${data.result || "No response"}
      </div>
    `;

  } catch (err) {
    output.innerHTML = "❌ Backend Error";
  }
}