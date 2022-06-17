function addError(className, text) {
    var element = document.getElementsByClassName(className);
    console.log(element, text);
    element[0].innerText = text;
}

function clearErrors() {
    addError('rowStartText', '');
    addError('rowEndText', '');
    addError('colStartText', '');
    addError('colEndText', '');
}


function createTable() {
    clearTable();
    clearErrors();
    var numberAccepted = false
    var rowStart = document.getElementById('rowStart').value;
    var colStart = document.getElementById('colStart').value;
    var rowEnd = document.getElementById('rowEnd').value;
    var colEnd = document.getElementById('colEnd').value;

    console.log(rowStart);
    console.log(colStart);
    console.log(rowEnd);
    console.log(colEnd);

    if (Number(rowStart) < -50 || !rowStart) 
    {
        addError('rowStartText', 'Error, The number you added is less than -50.')
        numberAccepted = true;
    }

    if (Number(colStart) < -50 || !colStart) 
    {
        addError('colStartText', 'Error, The number you added is less than -50.')
        numberAccepted = true;
    }

    if (Number(rowEnd) > 50 || !rowEnd) 
    {
        addError('rowEndText', 'Error, The number you added is greater than 50.')
        numberAccepted = true;
    }

    if (Number(colEnd) > 50 || !colEnd) 
    {
        addError('colEndText', 'Error, The number you added is greater than 50.')
        numberAccepted = true;
    }

    /* check if start number greater than end
       check number is negative */
    if (Number(rowStart) > Number(rowEnd)) 
    {
        addError('rowEndText', 'Error, The starting number you entered was larger than the ending number')
        numberAccepted = true;
    }

    /* check if start number greater than end
       check number is negative */
    if (Number(colStart) > Number(colEnd)) 
    {
        addError('colEndText', 'Error, The starting number you entered was larger than the ending number')
        numberAccepted = true;
    }

    /* get row and colNum length */
    var rowLength = rowEnd - rowStart + 1;
    var colLength = colEnd - colStart + 1;

    /* check if table to long */
    if (rowLength > 101) 
    {
        addError('rowEndText', 'Error Range. The range of row cannot large than 100.')
        numberAccepted = true;
    }

    /* check if table to height */
    if (colLength > 101) 
    {
        addError('colEndText', 'Error Range. The range of row cannot large than 100.')
        numberAccepted = true;
    }
    if (numberAccepted) return;
    /* initial table html and count number i, j */
    var tableOrder = "<table>";


    /* add table header line to html */
    tableOrder += "<tr><th></th>";
    for (var i = 0; i < rowLength; i++) 
    {
        tableOrder += "<th>";
        var num = Number(rowStart) + i;
        tableOrder += num;
        tableOrder += "</th>";
    }
    tableOrder += "</tr>";

    /* add table data to html */
    for (i = 0; i < colLength; i++) 
    {
        tableOrder += "<tr>";
        var colNum = Number(colStart) + i;
        for (var j = 0; j < rowLength + 1; j++) {
            tableOrder += "<td>";
            if (j == 0) 
            {
                tableOrder += colNum;
            } else 
            {
                var rowNum = Number(rowStart) + j - 1;
                var num = rowNum* colNum;
                tableOrder += num;
            }
            tableOrder += "</td>";
        }
        tableOrder += "</tr>";
    }
    tableOrder += "</table>";

    /* output whole table to screen */
    document.getElementById('table').innerHTML = tableOrder;
}

function clearTable() {
    document.getElementById('table').innerHTML = '';
}