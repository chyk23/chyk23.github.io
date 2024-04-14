// Function to generate HTML for a card
function generateCard(data) {
  return `
      <div class="col">
        <div class="card shadow-md">
          <img src="${data.image}" class="img-fluid rounded" alt="Image ${data.id}">
          <div class="card-body">
            <p class="card-text">
            View More
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-right"
                viewBox="0 0 16 16"
            >
                <path
                fill-rule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                />
            </svg>
            </p>
          </div>
        </div>
      </div>
    `;
}

// Function to render cards in the gallery
function renderGallery(jsonData) {
  const galleryContainer = document.getElementById("gallery");
  if (!galleryContainer) return;

  // Generate HTML for each object in the JSON data
  const cardsHTML = jsonData.map((item) => generateCard(item)).join("");

  // Append HTML to the gallery container
  galleryContainer.innerHTML = cardsHTML;
}

// Fetch the JSON data and render the gallery
fetch("object.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((jsonData) => renderGallery(jsonData))
  .catch((error) => console.error("Error fetching data:", error));
