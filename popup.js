// This callback function is called when the content script has been 
// injected and returned its results
function onPageDetailsReceived(pageDetails)  { 
    document.getElementById('problem').value = pageDetails.problem;
    document.getElementById('status').value = pageDetails.status;
}

// Global reference to the status display SPAN
var statusDisplay = null;

// POST the data to the server using XMLHttpRequest
function toggleStatus() {
    // Cancel the form submit
    event.preventDefault();

    var problem = document.getElementById('problem').value;
    var status = document.getElementById('status').value == "true" ? true : false;

    if (problem) {
        statusDisplay.innerHTML = 'Saving...';
        var jsonfile = {};
        jsonfile[problem] = !status;
        chrome.storage.sync.set(jsonfile, function () {
            statusDisplay.innerHTML = 'Saved!';

            window.close();
        });
    } else {
        statusDisplay.innerHTML = 'Cannot save without Problem name!';
    }
}

// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
    // Cache a reference to the status display SPAN
    statusDisplay = document.getElementById('status-display');
    // Handle the bookmark form submit event with our addBookmark function
    document.getElementById('toggle-status').addEventListener('submit', toggleStatus);
    // Get the event page
    chrome.runtime.getBackgroundPage(function(eventPage) {
        // Call the getPageInfo function in the event page, passing in 
        // our onPageDetailsReceived function as the callback. This injects 
        // content.js into the current tab's HTML
        eventPage.getPageDetails(onPageDetailsReceived);
    });
});