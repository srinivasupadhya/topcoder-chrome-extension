// Send a message containing the page details back to the event page
if (document.getElementsByClassName('statTextBig').length > 0) {
    var problemStringParts = document.getElementsByClassName('statTextBig')[0].innerHTML.split(" ");
    var problem = problemStringParts[problemStringParts.length - 1];
    var status = '';
    chrome.storage.sync.get(problem, function (value) {
        if (value && !(typeof value[problem] === "undefined")) {
            status = value[problem];
        }

        chrome.runtime.sendMessage({
            'problem': problem,
            'status': status
        });
    });
} else {
    chrome.runtime.sendMessage({
        'problem': '',
        'status': ''
    });
}