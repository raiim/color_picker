const colorDropdownDiv = document.getElementById("colorDropdownDiv");
const dropdownButton = document.getElementById("dropdownButton");
const applyButton = document.getElementById("applyColor");
const dropdownContent = document.querySelector(".dropdown-content");

let selectedColor = null;

dropdownButton.addEventListener("click", () => {
  colorDropdownDiv.classList.toggle("active");
  showDropdown();
});

function showDropdown() {
  const dropdownOptions = document.querySelectorAll(".dropdown-option");

  dropdownOptions.forEach(option => {
    const colorSampleDiv = option.querySelector(".color-sample");
    const dropdownColor = dropdownButton.getAttribute("data-color")
    const optionColor = option.getAttribute("data-color");

    colorSampleDiv.textContent = ``;
    if (dropdownColor === optionColor) {
      colorSampleDiv.textContent = `✭`;
    }

    option.addEventListener("click", () => {
      selectedColor = option.getAttribute("data-color");
      dropdownButton.textContent = option.textContent.trim(); // Update the button text
      dropdownButton.setAttribute("data-color", selectedColor);
      colorDropdownDiv.classList.remove("active"); // Close the dropdown
    });
  });
}

applyButton.addEventListener("click", () => {
  if (selectedColor) {
    updateElements(selectedColor);
  }
});

document.addEventListener("click", (event) => {
  if (!colorDropdownDiv.contains(event.target)) {
    colorDropdownDiv.classList.remove("active");
  }
});
