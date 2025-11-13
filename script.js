document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  const resultDiv = document.getElementById("result");

  searchBtn.addEventListener("click", async () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) return;

    try {
      const response = await fetch("places.json");
      if (!response.ok) throw new Error("Failed to load JSON");

      const data = await response.json();
      const place = data.places.find(
        (p) => p.name.toLowerCase() === query
      );

      if (place) {
        resultDiv.innerHTML = `
          <h2>${place.name}</h2>
          <p>${place.description}</p>

          <div class="images">
            ${place.images.map(img => `<img src="${img}" alt="${place.name}">`).join('')}
          </div>

          <iframe 
            src="${place.map}" 
            width="100%" 
            height="300" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy">
          </iframe>

          <h3>Ways to Reach ${place.name}</h3>
          <ul>
            <li>🚗 By Road – ${place.travel.road}</li>
            <li>🚆 By Train – ${place.travel.train}</li>
            <li>✈️ By Air – ${place.travel.air}</li>
          </ul>
        `;
      } else {
        resultDiv.innerHTML = `<p>No information found for "${query}".</p>`;
      }
    } catch (error) {
      console.error(error);
      resultDiv.innerHTML = `<p style="color:red;">Error loading data. Please check your JSON file or refresh the page.</p>`;
    }
  });
});

