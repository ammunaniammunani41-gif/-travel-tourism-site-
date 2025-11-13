document.getElementById("searchBtn").addEventListener("click", searchPlace);

async function searchPlace() {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch("places.json");
    const data = await response.json();
    const places = data.places;

    const match = places.find(p => p.name.toLowerCase() === query);

    if (!match) {
      resultDiv.innerHTML = `<p>No matching place found. Try another name!</p>`;
      return;
    }

    let imagesHTML = match.images.map(img => `<img src="${img}" alt="${match.name}">`).join("");

    resultDiv.innerHTML = `
      <div class="place-card">
        <h2>${match.name}</h2>
        <p>${match.description}</p>
        <p><b>Popular Foods:</b> ${match.foods.join(", ")}</p>
        <p><b>Travel by:</b> ${match.travel}</p>
        <div class="images">${imagesHTML}</div>
        <iframe src="${match.map}" loading="lazy"></iframe>
      </div>
    `;
  } catch (error) {
    resultDiv.innerHTML = "<p>Error loading data. Check console.</p>";
    console.error(error);
  }
}
