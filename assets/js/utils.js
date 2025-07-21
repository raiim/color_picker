function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function updateColorDropdown(newColor) {
    if (!newColor) {
        return
    }
    newColor = newColor.toLowerCase();

    if (colorDropdownDiv) {
        const existingOption = Array.from(dropdownContent.children).find(option =>
            option.getAttribute("data-color") === newColor
        );
        if (!existingOption) {
            const newOption = document.createElement("div");
            newOption.classList.add("dropdown-option");
            newOption.setAttribute("data-color", newColor);

            const colorSample = document.createElement("div");
            colorSample.classList.add("color-sample");
            colorSample.style.backgroundColor = newColor;
            colorSample.textContent = `✭`;

            newOption.appendChild(colorSample);
            newOption.appendChild(document.createTextNode(newColor));

            dropdownContent.appendChild(newOption);

            newOption.addEventListener("click", () => {
                dropdownButton.textContent = newColor;
                dropdownButton.setAttribute("data-color", newColor);
                colorDropdownDiv.classList.remove("active");
            });
        }
    }
    if (colorDropdown) {
        const existingOption = Array.from(colorDropdown.options).find(option => option.value === newColor);
        if (!existingOption) {
            const newOption = document.createElement('option');
            newOption.value = newColor;
            newOption.textContent = newColor;
            colorDropdown.appendChild(newOption);
            colorDropdown.value = newColor;
        }
    }
}

function updateElements(newColor) {
    if (!newColor) {
        return;
    }

    dropdownButton.setAttribute("data-color", newColor);
    dropdownButton.textContent = newColor;

    document.body.style.backgroundColor = newColor;

    colorPicker.value = newColor;
    colorPicker.style.value = newColor;
    colorPicker.style.background = hexToRgba(newColor, transparenceValue);

    colorPicker2.value = newColor;
    colorPicker2.style.value = newColor;
    colorPicker2.style.background = hexToRgba(newColor, transparenceValue);

    localStorage.setItem('selectedColor', newColor);
}