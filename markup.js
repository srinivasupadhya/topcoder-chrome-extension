function isSRM(matchType) {
    if (matchType) {
        if (matchType.split(" ").length == 2) {
            return true;
        }
    }
    return false;
}

function isSuccessRateBelow80(rate) {
    if (rate) {
        if (parseInt(rate.split(".")[0]) < 80) {
            return true;
        }
    }
    return false;
}

function markIfSolved(problem, iconCell, matchTypeCell, divOneRateCell, divTwoRateCell) {
    chrome.storage.sync.get(problem, function (value) {
        if (value && value[problem]) {
            var imageURL = chrome.extension.getURL("green_tick.png");
            iconCell.innerHTML = '<img src="' + imageURL + '" /> ';
        } else {
            var matchType = matchTypeCell.textContent.trim();
            var divOneRate = divOneRateCell.textContent.trim();
            var divTwoRate = divTwoRateCell.textContent.trim();
            if (!isSRM(matchType) || isSuccessRateBelow80(divOneRate) || isSuccessRateBelow80(divTwoRate)) {
                var imageURL = chrome.extension.getURL("question_mark.png");
                iconCell.innerHTML = '<img src="' + imageURL + '" /> ';
            }
        }
    });
}

if (document.getElementsByClassName('paddingTable2').length > 0) {
    var table = document.getElementsByClassName("paddingTable2")[2];
    for (i = 3; i < table.rows.length - 6; i++) {
        var problem = table.rows[i].cells[1].textContent.trim();
        markIfSolved(problem, table.rows[i].cells[0], table.rows[i].cells[2], table.rows[i].cells[6], table.rows[i].cells[9]);
    }
}
