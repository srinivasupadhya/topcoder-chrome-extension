function markIfSolved(problem, cell) {
    chrome.storage.sync.get(problem, function (value) {
        if (value && value[problem]) {
            var imageURL = chrome.extension.getURL("green_tick.png");
            cell.innerHTML = '<img src="' + imageURL + '" /> ';
        }
    });
}

if (document.getElementsByClassName('paddingTable2').length > 0) {
    var table = document.getElementsByClassName("paddingTable2")[2];
    for (i = 3; i < table.rows.length - 6; i++) {
        var problem = table.rows[i].cells[1].textContent.trim();
        markIfSolved(problem, table.rows[i].cells[0]);
    }
}
