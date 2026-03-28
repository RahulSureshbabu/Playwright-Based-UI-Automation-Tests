const nameInput = document.getElementById("name-input");
const greetButton = document.getElementById("greet-btn");
const greetingOutput = document.getElementById("greeting-output");

greetButton.addEventListener("click", () => {
  const name = nameInput.value.trim();
  greetingOutput.textContent = name ? `Hello, ${name}!` : "Hello, Guest!";
});
