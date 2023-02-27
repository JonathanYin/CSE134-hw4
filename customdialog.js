const alertButton = document.querySelector('#alert-button');
const alertDialog = document.querySelector('#alert-dialog');
const alertMessage = document.querySelector('#alert-message');
const alertOkButton = document.querySelector('#alert-ok-button');

const confirmButton = document.querySelector('#confirm-button');
const confirmDialog = document.querySelector('#confirm-dialog');
const confirmMessage = document.querySelector('#confirm-message');
const confirmOkButton = document.querySelector('#confirm-ok-button');
const confirmCancelButton = document.querySelector('#confirm-cancel-button');

const promptButton = document.querySelector('#prompt-button');
const promptDialog = document.querySelector('#prompt-dialog');
const promptMessage = document.querySelector('#prompt-message');
const promptInput = document.querySelector('#prompt-input');
const promptOkButton = document.querySelector('#prompt-ok-button');
const promptCancelButton = document.querySelector('#prompt-cancel-button');

const promptOutput = document.querySelector('#prompt-output');

alertButton.addEventListener('click', () => {
    alertMessage.textContent = 'Alert pressed!';
    alertDialog.showModal();
});

alertOkButton.addEventListener('click', () => {
    alertDialog.close();
});

confirmButton.addEventListener('click', () => {
    confirmMessage.textContent = 'Are you sure?';
    confirmDialog.showModal();
});

confirmOkButton.addEventListener('click', () => {
    promptOutput.textContent = `Confirm result: true`;
    confirmDialog.close();
});

confirmCancelButton.addEventListener('click', () => {
    promptOutput.textContent = `Confirm result: false`;
    confirmDialog.close();
});

promptButton.addEventListener('click', () => {
    promptMessage.textContent = 'Please enter your name:';
    promptInput.value = '';
    promptDialog.showModal();
});

promptOkButton.addEventListener('click', () => {
    if (promptInput.value === '') {
        promptOutput.textContent = 'User didn\'t enter anything';
    } else {
        promptOutput.textContent = `User entered: ${promptInput.value}`;
    }
    promptDialog.close();
});

promptCancelButton.addEventListener('click', () => {
    promptOutput.textContent = 'User canceled prompt';
    promptDialog.close();
});
