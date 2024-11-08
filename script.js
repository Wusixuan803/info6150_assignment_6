const apiKey = "live_2titjByn291sT9XgC7Q4qDv8n40x8Ndrlm2PhkDCH5GfOn5wD3bvTQXPIUt87PHh";
const apiUrl = "https://api.thedogapi.com/v1/images/search";
const breedUrl = "https://api.thedogapi.com/v1/breeds";

async function initializeBreeds() {
  try {
    const response = await fetch(breedUrl, {
      headers: {
        "x-api-key": apiKey,
      },
    });
    const breeds = await response.json();
    const breedSelect = document.getElementById("breedSelect");

    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.text = breed.name;
      breedSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching breeds:", error);
  }
}

function fetchRandomDogImage() {
  fetch(apiUrl, {
    headers: {
      "x-api-key": apiKey,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const imageUrl = data[0].url;
      document.getElementById("dogImage").src = imageUrl;
    })
    .catch((error) => {
      console.error("Error fetching random dog image:", error);
      alert("Failed to fetch random dog image.");
    });
}

function fetchBreedImage() {
  const breedId = document.getElementById("breedSelect").value;
  if (!breedId) return;

  fetch(`${apiUrl}?breed_id=${breedId}`, {
    headers: {
      "x-api-key": apiKey,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const imageUrl = data[0].url;
      document.getElementById("dogImage").src = imageUrl;
    })
    .catch((error) => {
      console.error("Error fetching breed image:", error);
      alert("Failed to fetch breed image.");
    });
}

function fetchBreedImageByName() {
  const breedName = document.getElementById("breedInput").value.toLowerCase();
  fetch(breedUrl, {
    headers: {
      "x-api-key": apiKey,
    },
  })
    .then((response) => response.json())
    .then((breeds) => {
      const breed = breeds.find((b) => b.name.toLowerCase() === breedName);
      if (breed) {
        fetch(`${apiUrl}?breed_id=${breed.id}`, {
          headers: {
            "x-api-key": apiKey,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            const imageUrl = data[0].url;
            document.getElementById("dogImage").src = imageUrl;
          });
      } else {
        alert("Breed not found. Please try a different name.");
      }
    })
    .catch((error) => {
      console.error("Error fetching breed by name:", error);
      alert("Failed to fetch breed image by name.");
    });
}

initializeBreeds();
fetchRandomDogImage();
