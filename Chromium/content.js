//console.log("Scanning for elements with id: credential_picker_container or credentials-picker-container");

function hideSignInPrompt() {
    const target1 = document.getElementById("credential_picker_container");
    const target2 = document.getElementById("credentials-picker-container");
    let found = false;
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
        observer.disconnect();
    }else{
        setTimeout(()=>{observer.disconnect()},15000)
    }
}

// Some sites load the prompt after a delay so we have a mutation observer set up for it.
const observer = new MutationObserver(hideSignInPrompt);
observer.observe(document.body, { childList: true, subtree: true });

hideSignInPrompt();
