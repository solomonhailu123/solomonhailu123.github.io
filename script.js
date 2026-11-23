// Automatically update the footer year.

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

console.log("Solomon Hailu Portfolio loaded successfully.");
