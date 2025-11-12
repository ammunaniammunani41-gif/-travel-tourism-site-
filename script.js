// Load tourist places from places.json
async function loadPlaces() {
  const response = await fetch("places.json");
  const data = await response.json();
  return data;
}

async function showPlace() {
  const place = document.getElementById("placeInput").value.toLowerCase();
  const travelWay = document.getElementById("travelInput").value.toLowerCase();
  const resultDiv = document.getElementById("result");

  const data = await loadPlaces();

  if (data[place]) {
    const info = data[place];
    resultDiv.innerHTML = `
      <h2>${place.charAt(0).toUpperCase() + place.slice(1)}</h2>
      <p><strong>Popular Travel Ways:</strong> ${info.ways.join(", ")}</p>
      <p><strong>Famous Foods:</strong> ${info.foods.join(", ")}</p>
      <div class="image-gallery">
        ${info.images.map(img => `<img src="${img}" alt="${place} image">`).join("")}
      </div>
      <iframe src="${info.map}" width="100%" height="300" style="border:0;" allowfullscreen></iframe>
    `;
  } else {
    resultDiv.innerHTML = `<p style="color:red;">Data not found for ${place}</p>`;
  }
}

document.getElementById("searchBtn").addEventListener("click", showPlace);
