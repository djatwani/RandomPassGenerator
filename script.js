const length_slider = document.getElementById("length_slider");

const length_sliderValue = document.getElementById("length_title");

const num_slider = document.getElementById("num_slider");

const num_sliderValue = document.getElementById("num_title");

const num_sliderMax = document.getElementById("num-slider");

length_slider.querySelector("input").addEventListener("input", event => {
    length_sliderValue.setAttribute("data-length", event.target.value);
    num_slider.setAttribute("data-max", (Math.floor(parseInt(event.target.value) / 4)).toString());
    num_sliderMax.setAttribute("max", (Math.floor(parseInt(event.target.value) / 4)).toString());
});

num_slider.querySelector("input").addEventListener("input", event => {
    num_sliderValue.setAttribute("data-length", event.target.value);
});


function getRandomUpper() {
    const set = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return set[Math.floor(Math.random() * set.length)];
}

function getRandomLower() {
    const set = 'abcdefghijklmnopqrstuvwxyz';
    return set[Math.floor(Math.random() * set.length)];
}

function getRandomNumber() {
    const set = '0123456789';
    return set[Math.floor(Math.random() * set.length)];
}


function getRandomSymbol() {
    const set = '~!@#$%^&*()_+{}":?><;.,';
    return set[Math.floor(Math.random() * set.length)];
}

function getRandomAlphabet() {
    const set = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return set[Math.floor(Math.random() * set.length)];
}

function getRandomNumSym() {
    const set = '0123456789~!@#$%^&*()_+{}":?><;.,';
    return set[Math.floor(Math.random() * set.length)];
}

// Selecting all the DOM Elements that are necessary -->

// The Viewbox where the result will be shown
const resultEl = document.getElementById("result");
// The input slider, will use to change the length of the password
const lengthEl = document.getElementById("length-slider");
const numLengthEl = document.getElementById("num-slider");

// Button to generate the password
const generateBtn = document.getElementById("generate");
// Button to copy the text
const copyBtn = document.getElementById("copy-btn");
// Result viewbox container
const resultContainer = document.querySelector(".result");
// Text info showed after generate button is clicked
const copyInfo = document.querySelector(".copy.right");
// Text appear after copy button is clicked
const copiedInfo = document.querySelector(".copy.left");

// if this variable is trye only then the copyBtn will appear, i.e. when the user first click generate the copyBth will interact.
let generatedPassword = false;

// Getting the bounds of the result viewbox container
let resultContainerBound = {
    left: resultContainer.getBoundingClientRect().left,
    top: resultContainer.getBoundingClientRect().top,
};
// This will update the position of the copy button based on mouse Position
resultContainer.addEventListener("mousemove", e => {
    resultContainerBound = {
        left: resultContainer.getBoundingClientRect().left,
        top: resultContainer.getBoundingClientRect().top,
    };
    if (generatedPassword) {
        copyBtn.style.opacity = '1';
        copyBtn.style.pointerEvents = 'all';
        copyBtn.style.setProperty("--x", `${e.x - resultContainerBound.left}px`);
        copyBtn.style.setProperty("--y", `${e.y - resultContainerBound.top}px`);
    } else {
        copyBtn.style.opacity = '0';
        copyBtn.style.pointerEvents = 'none';
    }
});
window.addEventListener("resize", e => {
    resultContainerBound = {
        left: resultContainer.getBoundingClientRect().left,
        top: resultContainer.getBoundingClientRect().top,
    };
});

// Copy Password in clipboard
copyBtn.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    const password = resultEl.innerText;
    if (!password || password == "CLICK GENERATE") {
        return;
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();

    copyInfo.style.transform = "translateY(200%)";
    copyInfo.style.opacity = "0";
    copiedInfo.style.transform = "translateY(0%)";
    copiedInfo.style.opacity = "0.75";
});

// When Generate is clicked Password id generated.
generateBtn.addEventListener("click", () => {
    const length = lengthEl.value;
    const numlength = numLengthEl.value;
    generatedPassword = true;
    resultEl.innerText = generatePassword(length, numlength);
    copyInfo.style.transform = "translateY(0%)";
    copyInfo.style.opacity = "0.75";
    copiedInfo.style.transform = "translateY(200%)";
    copiedInfo.style.opacity = "0";
});

// Function responsible to generate password and then returning it.
function generatePassword(length, numlength) {
    let generatedPassword = "";
    generatedPassword += getRandomUpper();
    generatedPassword += getRandomLower();
    generatedPassword += getRandomNumber();
    generatedPassword += getRandomSymbol();
    for (let i = 0; i < numlength - 2; i++) {
        generatedPassword += getRandomNumSym();
    }
    for (let i = 0; i < length - numlength - 4; i++) {
        generatedPassword += getRandomAlphabet();
    }
    return generatedPassword.slice(0, length)
        .split('').sort(() => Math.random() - 0.5)
        .join('');
}