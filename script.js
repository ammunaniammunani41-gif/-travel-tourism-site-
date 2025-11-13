document.getElementById("searchBtn").addEventListener("click", async () => {
  const placeName = document.getElementById("place").value.toLowerCase();
  const transport = document.getElementById("transport").value;
  const resultDiv = document.getElementById("result");

  if (!placeName || !transport) {
    resultDiv.innerHTML = "<p>Please enter both fields.</p>";
    return;
  }

  try {
    const response = await fetch("places.json");
    const data = await response.json();

    const place = data.find(p => p.name.toLowerCase() === placeName);
    if (!place) {
      resultDiv.innerHTML = `<p>❌ Sorry, we don't have details for ${placeName} yet.</p>`;
      return;
    }

    resultDiv.innerHTML = `
      <div class="place-info">
        <h2>${place.name}</h2>
        <p>${place.description}</p>
        <p><b>Popular Foods:</b> ${place.food.join(", ")}</p>
        <p><b>Travel by ${transport}:</b> ${place.travel[transport]}</p>

        <div class="images">
          ${place.images.map(img => `<img src="${img}" alt="${place.name}">`).join("")}
        </div>

        <iframe 
          src="${place.map}" 
          allowfullscreen 
          loading="lazy">
        </iframe>
      </div>
    `;
  } catch (error) {
    resultDiv.innerHTML = "<p>⚠️ Error loading data.</p>";
  }
});
