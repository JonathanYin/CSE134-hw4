// buttons
const alertBtn = document.getElementById("alert-btn");
const confirmBtn = document.getElementById("confirm-btn");
const promptBtn = document.getElementById("prompt-btn");
const saferPromptBtn = document.getElementById("safer-prompt-btn");

// output
const output = document.getElementById('output');

alertBtn.addEventListener("click", () => {
    alert("This is an alert");
});

confirmBtn.addEventListener("click", () => {
    const confirmed = confirm("Are you sure?");
    output.innerHTML = `The value returned by the confirm method is: ${confirmed}`;
});

promptBtn.addEventListener('click', () => {
    const result = prompt('What is your name?');
    output.textContent = result ? "Name: " + result : "User didn't enter anything";
});

saferPromptBtn.addEventListener('click', () => {
    const input = prompt(`What is your name?`);
    const sanitizedInput = DOMPurify.sanitize(input);
    output.textContent = sanitizedInput ? `Name: ${sanitizedInput}` : "User didn't enter anything";
});
