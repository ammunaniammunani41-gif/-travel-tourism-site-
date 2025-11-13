
document.getElementById("submit").addEventListener("click", function() {
  const place = document.getElementById("place").value.toLowerCase();
  const transport = document.getElementById("transport").value;
  const result = document.getElementById("result");

  if (!place || !transport) {
    result.innerHTML = "<p>Please fill both fields.</p>";
    return;
  }

  let info = "";

  if (place.includes("goa")) {
    info = `
      <h2>🏖️ Goa</h2>
      <p>Famous for beaches, churches, and seafood.</p>
      <p><b>Popular Food:</b> Goan Fish Curry, Bebinca</p>
      <p><b>Travel by ${transport}:</b> ${getTravelDetails("goa", transport)}</p>
      <img src="images/goa.jpg" alt="Goa" width="100%">
    `;
  } else if (place.includes("ooty")) {
    info = `
      <h2>🌄 Ooty</h2>
      <p>Known for tea gardens and misty mountains.</p>
      <p><b>Popular Food:</b> Varkey, Homemade Chocolates</p>
      <p><b>Travel by ${transport}:</b> ${getTravelDetails("ooty", transport)}</p>
      <img src="images/ooty.jpg" alt="Ooty" width="100%">
    `;
  } else if (place.includes("kerala")) {
    info = `
      <h2>🌴 Kerala</h2>
      <p>Backwaters, Ayurveda, and scenic beauty.</p>
      <p><b>Popular Food:</b> Appam with Stew, Puttu Kadala</p>
      <p><b>Travel by ${transport}:</b> ${getTravelDetails("kerala", transport)}</p>
      <img src="images/kerala.jpg" alt="Kerala" width="100%">
    `;
  } else {
    info = `<p>Sorry, we don’t have data for <b>${place}</b> yet.</p>`;
  }

  result.innerHTML = info;
});

function getTravelDetails(place, transport) {
  const travelOptions = {
    goa: {
      flight: "Dabolim Airport connects major Indian cities.",
      train: "Madgaon and Vasco-da-Gama stations available.",
      bus: "KSRTC and private buses from Mumbai, Pune, etc.",
      car: "8-10 hrs drive from Mumbai."
    },
    ooty: {
      flight: "Nearest airport: Coimbatore (88 km).",
      train: "Mettupalayam station (toy train available).",
      bus: "Frequent buses from Bangalore & Coimbatore.",
      car: "Beautiful hill drive from Mysuru."
    },
    kerala: {
      flight: "Airports in Kochi, Trivandrum, and Calicut.",
      train: "Well-connected rail network.",
      bus: "KSRTC services across cities.",
      car: "Smooth highway drives along the coast."
    }
  };
  return travelOptions[place][transport];
}
