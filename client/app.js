function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for (var i = 0; i < uiBathrooms.length; i++) {
    if (uiBathrooms[i].checked) {
      return parseInt(uiBathrooms[i].value);
    }
  }
  return -1; // Invalid Value
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for (var i = 0; i < uiBHK.length; i++) {
    if (uiBHK[i].checked) {
      return parseInt(uiBHK[i].value);
    }
  }
  return -1; // Invalid Value
}

async function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");

  const sqft = document.getElementById("uiSqft").value;
  const bhk = getBHKValue();
  const bathrooms = getBathValue();
  const location = document.getElementById("uiLocations").value;
  const estPrice = document.getElementById("uiEstimatedPrice");

  const url = "/api/predict_home_price";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        total_sqft: parseFloat(sqft),
        bhk: bhk,
        bath: bathrooms,
        location: location
      })
    });

    const data = await response.json();
    console.log(data.estimated_price);
    estPrice.innerHTML = `<h2>${data.estimated_price} Lakh</h2>`;
  } catch (error) {
    console.error("Error fetching price:", error);
  }
}

async function onPageLoad() {
  console.log("document loaded");
  const url = "/api/get_location_names";

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.locations) {
      const uiLocations = document.getElementById("uiLocations");
      uiLocations.innerHTML = ""; // Clear existing options

      data.locations.forEach(location => {
        const opt = new Option(location);
        uiLocations.appendChild(opt);
      });
    }
  } catch (error) {
    console.error("Error loading locations:", error);
  }
}

window.onload = onPageLoad;
