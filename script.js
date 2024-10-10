let timerValue = 120;
let timerInterval;
const backgroundAudio = document.getElementById('backgroundAudio');
const popupAudio = document.getElementById('popupAudio');

// Function to start the timer
function startTimer() {
    backgroundAudio.play(); // Play background audio
    timerInterval = setInterval(() => {
        if (timerValue <= 0) {
            clearInterval(timerInterval);
            alert('Time is up!');
            return;
        }
        timerValue--;
        document.getElementById('timer').textContent = `Timer: ${timerValue}`;
    }, 1000);
}

// Function to handle slogan selection
function selectSlogan(slogan) {
    const workspace = document.getElementById('workspace');
    const sloganElement = document.createElement('p');
    sloganElement.textContent = slogan;
    workspace.appendChild(sloganElement);
}

// Function to handle image selection
function selectImage(imageSrc) {
    const workspace = document.getElementById('workspace');
    workspace.innerHTML = ''; // Clear existing content

    // Get the current selected slogan
    const selectedSlogan = document.querySelector('.selected-slogan');
    const sloganText = selectedSlogan ? selectedSlogan.textContent : '';

    // Create advertisement elements
    const sloganElement = document.createElement('h3');
    sloganElement.textContent = sloganText; // Set slogan text

    const imageElement = document.createElement('img');
    imageElement.src = imageSrc;
    imageElement.style.width = '150px'; // Adjust the image size

    // Get product description
    const productDescription = document.getElementById('productDescription').value;
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = productDescription; // Set description text

    // Append elements to workspace
    workspace.innerHTML = ''; // Clear existing content
    workspace.appendChild(sloganElement);
    workspace.appendChild(imageElement);
    workspace.appendChild(descriptionElement);
}

// Function to handle submission
function submitAd() {
    clearInterval(timerInterval);
    backgroundAudio.pause(); // Stop background audio
    const playerName = document.getElementById('playerName').value;
    const resultMessage = Math.random() < 0.5
        ? `CONGRATULATIONS ${playerName}! YOU HAVE WON A SMALL PRIZE!`
        : `CONGRATULATIONS ${playerName}! YOU HAVE WON A MEDIUM PRIZE!`;

    document.getElementById('resultMessage').textContent = resultMessage;
    document.getElementById('resultPopup').classList.remove('hidden');
    popupAudio.play(); // Play popup sound
}

// Function to close the popup
document.getElementById('closePopup').onclick = function () {
    document.getElementById('resultPopup').classList.add('hidden');
}

let selectedSlogan = null; // Store the selected slogan
let selectedImage = null;  // Store the selected image

function selectSlogan(slogan) {
    // If a slogan is already selected, unselect it
    if (selectedSlogan) {
        const previousSloganButton = document.querySelector(`.slogan-btn.selected`);
        if (previousSloganButton) {
            previousSloganButton.classList.remove('selected');
        }
    }
    
    // Mark the newly selected slogan
    selectedSlogan = slogan;
    const sloganButtons = document.querySelectorAll('.slogan-btn');
    sloganButtons.forEach(button => {
        if (button.textContent === slogan) {
            button.classList.add('selected');
        }
    });
    
    // Update the workspace
    updateWorkspace();
}

function selectImage(imageSrc) {
    // If an image is already selected, unselect it
    if (selectedImage) {
        const previousImage = document.querySelector(`.product-image.selected`);
        if (previousImage) {
            previousImage.classList.remove('selected');
        }
    }
    
    // Mark the newly selected image
    selectedImage = imageSrc;
    const images = document.querySelectorAll('.product-image');
    images.forEach(image => {
        if (image.src.includes(imageSrc)) {
            image.classList.add('selected');
        }
    });
    
    // Update the workspace
    updateWorkspace();
}

function updateWorkspace() {
    const workspace = document.getElementById('workspace');
    const sloganDiv = document.getElementById('adSlogan');
    const imageDiv = document.getElementById('adImage');
    const descriptionDiv = document.getElementById('adDescription');

    // Clear previous workspace content
    sloganDiv.innerHTML = '';
    imageDiv.src = '';
    descriptionDiv.innerHTML = '';

    if (selectedSlogan) {
        sloganDiv.textContent = selectedSlogan; // Set the selected slogan
    }
    
    if (selectedImage) {
        imageDiv.src = selectedImage; // Set the selected image
    }

    const productDescription = document.getElementById('productDescription').value;
    if (productDescription) {
        descriptionDiv.textContent = productDescription; // Set the product description
    }
};
