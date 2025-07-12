let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

// Load voices and populate the dropdown
function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    voiceSelect.innerHTML = ""; // Clear old options

    voices.forEach((voice, i) => {
        const option = new Option(`${voice.name} (${voice.lang})`, i);
        voiceSelect.appendChild(option);
    });

    if (voices.length > 0) {
        speech.voice = voices[0]; // Set default voice
    }
}

// Load voices initially
loadVoices();

// Handle browsers where voices load later (like Chrome)
if (typeof speechSynthesis.onvoiceschanged !== "undefined") {
    speechSynthesis.onvoiceschanged = loadVoices;
}

// Handle voice selection change
voiceSelect.addEventListener("change", () => {
    const selectedIndex = parseInt(voiceSelect.value);
    if (!isNaN(selectedIndex)) {
        speech.voice = voices[selectedIndex];
    }
});

// Handle button click to speak text
document.querySelector("button").addEventListener("click", () => {
    const text = document.querySelector("textarea").value.trim();
    if (text.length === 0) {
        alert("Please enter some text!");
        return;
    }
    speech.text = text;
    window.speechSynthesis.speak(speech);
});

