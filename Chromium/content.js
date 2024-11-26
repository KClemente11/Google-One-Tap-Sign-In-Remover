//console.log("Scanning for elements with id: credential_picker_container or credentials-picker-container");
let isPaused = false;
function togglePause() {
    isPaused = !isPaused;
    chrome.storage.local.set({ isPaused });
}

function hideSignInPrompt() {
    chrome.storage.local.get({ isPaused: false }, function(data) {
        if (data.isPaused) {
            console.log("Extension is paused. Blocking is disabled.");
            return;
        }

        const target = document.getElementById("google-one-tap-iframe");
        const target1 = document.getElementById("credential_picker_container");
        const target2 = document.getElementById("credentials-picker-container");
        let found = false;
        if(target){
            console.log("Found Google One Tap iframe with id: google-one-tap-iframe");
            target.remove();
            found = true;
        }
        if (target1) {
            console.log("Found Google One Tap prompt with id: credential_picker_container");
            target1.remove();
            found = true;
        }

        if (target2) {
            console.log("Found Google One Tap prompt with id: credentials-picker-container");
            target2.remove();
            found = true;
        }
        if(found){
            incrementBlockCount();
            observer.disconnect();
        }else{
            setTimeout(()=>{observer.disconnect()},15000)
        }
    });
}

// Some sites load the prompt after a delay so we have a mutation observer set up for it.
let observerActive = true;
const observer = new MutationObserver((mutationsList, observer) => {
    if (observerActive) {
        //console.log("MutationObserver triggered. Observing changes:", mutationsList);

        // Loop through detected mutations for more details
        // mutationsList.forEach((mutation) => {
        //     console.log("Mutation type:", mutation.type);
        //     if (mutation.type === "childList") {
        //         console.log("Added nodes:", mutation.addedNodes);
        //         console.log("Removed nodes:", mutation.removedNodes);
        //     }
        // });

        hideSignInPrompt();
    }
});
observer.observe(document.body, { childList: true, subtree: true });
hideSignInPrompt();

function incrementBlockCount(){
    chrome.storage.local.get({blockCount: null}, function(data){
        //console.log(data)
        if (data.blockCount === null) {
            chrome.storage.local.set({ blockCount: 0 }, function () {
                //console.log("Block count initialized to 0.");
            });
        }else{
            const newCount = data.blockCount + 1;
            chrome.storage.local.set({blockCount: newCount});
        }
    })
}