document.addEventListener("DOMContentLoaded", function () {
    const blockCountElem = document.getElementById("blockCount");
    const pauseButton = document.getElementById("pauseButton");

    // Update block count
    chrome.storage.local.get({ blockCount: 0 }, function(data) {
        blockCountElem.textContent = data.blockCount;
        // console.log("Data.blockcount = " + data.blockCount)
    });

    // Toggle pause state
    chrome.storage.local.get({ isPaused: false }, function(data) {
        pauseButton.textContent = data.isPaused ? "Resume Blocking" : "Pause Blocking";
    });

    pauseButton.addEventListener("click", function() {
        chrome.storage.local.get({ isPaused: false }, function(data) {
            const newPausedState = !data.isPaused;
            chrome.storage.local.set({ isPaused: newPausedState }, function() {
                pauseButton.textContent = newPausedState ? "Resume Blocking" : "Pause Blocking";
            });
        });
    });
});
