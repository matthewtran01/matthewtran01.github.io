/*
Full Name: Matthew Tran
E-mail: Matthew_tran@student.uml.edu
School: U mass lowell
Date: 6/29/22
Description: This is the javascript file to create the draggables and boards for the scrabble assignment
*/


 /* creating constant tiles */
 const tileNumList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K","L", "M", "N","O", "P", "Q", "R", "S", "T", "U", "V", "W", "X","Y","Z",'_']

 //setting tiles, example taken from assignment pdf from prof. Heines
var Tiles = [] ;
Tiles["A"] = { "value" : 1,  "total" : 9,  "currentCount" : 9,  "image": "public/images/Scrabble_Tile_A.jpg"  } ;
Tiles["B"] = { "value" : 3,  "total" : 2,  "currentCount" : 2,  "image": "public/images/Scrabble_Tile_B.jpg"  } ;
Tiles["C"] = { "value" : 3,  "total" : 2,  "currentCount" : 2,  "image": "public/images/Scrabble_Tile_C.jpg"  } ;
Tiles["D"] = { "value" : 2,  "total" : 4,  "currentCount" : 4,  "image": "public/images/Scrabble_Tile_D.jpg"  } ;
Tiles["E"] = { "value" : 1,  "total" : 12, "currentCount" : 12, "image": "public/images/Scrabble_Tile_E.jpg"  } ;
Tiles["F"] = { "value" : 4,  "total" : 2,  "currentCount" : 2,  "image": "public/images/Scrabble_Tile_F.jpg"  } ;
Tiles["G"] = { "value" : 2,  "total" : 3,  "currentCount" : 3,  "image": "public/images/Scrabble_Tile_G.jpg"  } ;
Tiles["H"] = { "value" : 4,  "total" : 2,  "currentCount" : 2,  "image": "public/images/Scrabble_Tile_H.jpg"  } ;
Tiles["I"] = { "value" : 1,  "total" : 9,  "currentCount" : 9,  "image": "public/images/Scrabble_Tile_I.jpg"  } ;
Tiles["J"] = { "value" : 8,  "total" : 1,  "currentCount" : 1,  "image": "public/images/Scrabble_Tile_J.jpg"  } ;
Tiles["K"] = { "value" : 5,  "total" : 1,  "currentCount" : 1,  "image": "public/images/Scrabble_Tile_K.jpg"  } ;
Tiles["L"] = { "value" : 1,  "total" : 4,  "currentCount" : 4,  "image": "public/images/Scrabble_Tile_L.jpg"  } ;
Tiles["M"] = { "value" : 3,  "total" : 2,  "currentCount" : 2,  "image": "public/images/Scrabble_Tile_M.jpg"  } ;
Tiles["N"] = { "value" : 1,  "total" : 6,  "currentCount" : 6,  "image": "public/images/Scrabble_Tile_N.jpg"  } ;
Tiles["O"] = { "value" : 1,  "total" : 8,  "currentCount" : 8,  "image": "public/images/Scrabble_Tile_O.jpg"  } ;
Tiles["P"] = { "value" : 3,  "total" : 2,  "currentCount" : 2,  "image": "public/images/Scrabble_Tile_P.jpg"  } ;
Tiles["Q"] = { "value" : 10, "total" : 1,  "currentCount" : 1,  "image": "public/images/Scrabble_Tile_Q.jpg"  } ;
Tiles["R"] = { "value" : 1,  "total" : 6,  "currentCount" : 6,  "image": "public/images/Scrabble_Tile_R.jpg"  } ;
Tiles["S"] = { "value" : 1,  "total" : 4,  "currentCount" : 4,  "image": "public/images/Scrabble_Tile_S.jpg"  } ;
Tiles["T"] = { "value" : 1,  "total" : 6,  "currentCount" : 6,  "image": "public/images/Scrabble_Tile_T.jpg"  } ;
Tiles["U"] = { "value" : 1,  "total" : 4,  "currentCount" : 4,  "image": "public/images/Scrabble_Tile_U.jpg"  } ;
Tiles["V"] = { "value" : 4,  "total" : 2,  "currentCount" : 2,  "image": "public/images/Scrabble_Tile_V.jpg"  } ;
Tiles["W"] = { "value" : 4,  "total" : 2,  "currentCount" : 2,  "image": "public/images/Scrabble_Tile_W.jpg"  } ;
Tiles["X"] = { "value" : 8,  "total" : 1,  "currentCount" : 1,  "image": "public/images/Scrabble_Tile_X.jpg"  } ;
Tiles["Y"] = { "value" : 4,  "total" : 2,  "currentCount" : 2,  "image": "public/images/Scrabble_Tile_Y.jpg"  } ;
Tiles["Z"] = { "value" : 10, "total" : 1,  "currentCount" : 1,  "image": "public/images/Scrabble_Tile_Z.jpg"  } ;
Tiles["_"] = { "value" : 0,  "total" : 2,  "currentCount" : 2,  "image": "public/images/Scrabble_Tile_Blank.jpg"  } ;

/* set the values of boards (nothing) and scores (0) */
let lastBoard = ['', '', '', '', '', '', '']
let Board = ['', '', '', '', '', '', '']
let arrPosition = []
let score = 0
let highestScore = 0
let spareReplacementTile = ''
let replaceIndex = ''
$(window).load(function() 
{
    createTileBoard();
    $(".sqr").droppable(
        {
        accept: ".dragItem",
        hoverClass: "hoverHighlight",
        activeClass: "dragHighlight",
        drop: function(event, ui) 
        {
            let str = event.target.id
            let index = str[str.length - 1] - 1
            if (isBoardValidate(index)) {
                let newSpot; 
                let piece;
                $(event.toElement).css('display', 'none')
                if (ui.draggable.attr("piece") == '_') 
                {
                    replaceIndex = index
                    createSpace()
                    piece = ui.draggable.attr("piece")
                    newSpot = $(`<img src=${Tiles[piece]["image"]} class="dragItem" piece=${piece} id="spareBoard"/>`);
                } else 
                {
                    piece = ui.draggable.attr("piece")
                    newSpot = $(`<img src=${Tiles[piece]["image"]} class="dragItem" piece=${piece} />`);
                }
                $(this).append(newSpot)
                Board[index] = piece
                calculateScore(Board)
            } else {
                ui.offset = arrPosition[index]
                ui.position = arrPosition[index]
            }
        }
    });
});
/* validate board */
function isBoardValidate(index) {
    if (index == 0 && Board[1] !== '') 
    {
        return true
    }
    if (Board[index - 1] || Board[index + 1]) 
    {
        return true
    }
    if (!Board.join().replace(/,/g, "")) 
    {
        return true
    }
    if (Board[index]) 
    {
        alert('There are pieces in this position, please reposition!')
        return false
    }
    alert('Please confirm that there are gaps between pieces!')
    return false
}



 /* calculate score counting the double score words as well */
function calculateScore(Board) {
    let word = Board.join().replace(/,/g, "")

    $('#word').html(`<span>${word}</span>`)
    if (word.length >= 2) 
    {
        let i = 0
        $('#noSpaceIcon').removeClass('checkmark')
        $('#twoPlusIcon').removeClass('checkmark')
    } else 
    {
        $('#noSpaceIcon').addClass('checkmark')
        $('#twoPlusIcon').addClass('checkmark')
    }
    for (let i = 0; i < Board.length; i++) 
    {
        if (Board[i] != lastBoard[i]) 
        {
            if (i == 5 || i == 1) 
            {
                score += (Tiles[Board[i]].value) * 2
            } else 
            {
                score += Tiles[Board[i]].value
            }
        }
    }
    lastBoard = JSON.parse(JSON.stringify(Board))
    $('#score').html(`<span>${score}</span>`)
}


//function that calculates the remaining tiles
function calculateRemain() {
    let remain = 0
    Object.values(Tiles).map(item => 
    {
        remain += item.currentCount
    })
    return remain
}

//create tile ID
function generateTileId() {
    var id;
    generateTileId.id = generateTileId.id++ || 1;
    id = "tile" + generateTileId.id.toString();
    return id;
}

//recycles tiles into bag for new hand
function recycleHand() {
    return document.querySelectorAll(".tileRack>img").length;
}



//randomiser
function Random(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

//example taken from prof heines
function createTiles() {
Tiles["A"] = { "value" : 1,  "total" : 9,  "currentCount" : 9,  "image": "public/images/Scrabble_Tile_A.jpg"  } ;
Tiles["B"] = { "value" : 3,  "total" : 2,  "currentCount" : 2,  "image": "public/images/Scrabble_Tile_B.jpg"  } ;
Tiles["C"] = { "value" : 3,  "total" : 2,  "currentCount" : 2,  "image": "public/images/Scrabble_Tile_C.jpg"  } ;
Tiles["D"] = { "value" : 2,  "total" : 4,  "currentCount" : 4,  "image": "public/images/Scrabble_Tile_D.jpg"  } ;
Tiles["E"] = { "value" : 1,  "total" : 12, "currentCount" : 12, "image": "public/images/Scrabble_Tile_E.jpg"  } ;
Tiles["F"] = { "value" : 4,  "total" : 2,  "currentCount" : 2,  "image": "public/images/Scrabble_Tile_F.jpg"  } ;
Tiles["G"] = { "value" : 2,  "total" : 3,  "currentCount" : 3,  "image": "public/images/Scrabble_Tile_G.jpg"  } ;
Tiles["H"] = { "value" : 4,  "total" : 2,  "currentCount" : 2,  "image": "public/images/Scrabble_Tile_H.jpg"  } ;
Tiles["I"] = { "value" : 1,  "total" : 9,  "currentCount" : 9,  "image": "public/images/Scrabble_Tile_I.jpg"  } ;
Tiles["J"] = { "value" : 8,  "total" : 1,  "currentCount" : 1,  "image": "public/images/Scrabble_Tile_J.jpg"  } ;
Tiles["K"] = { "value" : 5,  "total" : 1,  "currentCount" : 1,  "image": "public/images/Scrabble_Tile_K.jpg"  } ;
Tiles["L"] = { "value" : 1,  "total" : 4,  "currentCount" : 4,  "image": "public/images/Scrabble_Tile_L.jpg"  } ;
Tiles["M"] = { "value" : 3,  "total" : 2,  "currentCount" : 2,  "image": "public/images/Scrabble_Tile_M.jpg"  } ;
Tiles["N"] = { "value" : 1,  "total" : 6,  "currentCount" : 6,  "image": "public/images/Scrabble_Tile_N.jpg"  } ;
Tiles["O"] = { "value" : 1,  "total" : 8,  "currentCount" : 8,  "image": "public/images/Scrabble_Tile_O.jpg"  } ;
Tiles["P"] = { "value" : 3,  "total" : 2,  "currentCount" : 2,  "image": "public/images/Scrabble_Tile_P.jpg"  } ;
Tiles["Q"] = { "value" : 10, "total" : 1,  "currentCount" : 1,  "image": "public/images/Scrabble_Tile_Q.jpg"  } ;
Tiles["R"] = { "value" : 1,  "total" : 6,  "currentCount" : 6,  "image": "public/images/Scrabble_Tile_R.jpg"  } ;
Tiles["S"] = { "value" : 1,  "total" : 4,  "currentCount" : 4,  "image": "public/images/Scrabble_Tile_S.jpg"  } ;
Tiles["T"] = { "value" : 1,  "total" : 6,  "currentCount" : 6,  "image": "public/images/Scrabble_Tile_T.jpg"  } ;
Tiles["U"] = { "value" : 1,  "total" : 4,  "currentCount" : 4,  "image": "public/images/Scrabble_Tile_U.jpg"  } ;
Tiles["V"] = { "value" : 4,  "total" : 2,  "currentCount" : 2,  "image": "public/images/Scrabble_Tile_V.jpg"  } ;
Tiles["W"] = { "value" : 4,  "total" : 2,  "currentCount" : 2,  "image": "public/images/Scrabble_Tile_W.jpg"  } ;
Tiles["X"] = { "value" : 8,  "total" : 1,  "currentCount" : 1,  "image": "public/images/Scrabble_Tile_X.jpg"  } ;
Tiles["Y"] = { "value" : 4,  "total" : 2,  "currentCount" : 2,  "image": "public/images/Scrabble_Tile_Y.jpg"  } ;
Tiles["Z"] = { "value" : 10, "total" : 1,  "currentCount" : 1,  "image": "public/images/Scrabble_Tile_Z.jpg"  } ;
Tiles["_"] = { "value" : 0,  "total" : 2,  "currentCount" : 2,  "image": "public/images/Scrabble_Tile_Blank.jpg"  } ;
}

function createSpace() {
    $('#spaceReplace').removeClass('none')
    for (let i = 0; i < 26; i++) {
        let piece = tileNumList[i]
        if (Tiles[piece].currentCount > 0) {
            $('#spaceReplace').append($(`<img src=${Tiles[piece]["image"]} onClick="onSpareClick(${"'"+piece+"'"})" class="dragItem" piece=${piece} />`))
        }
    }
}

function onSpareClick(e) {
    $('#spaceReplace').empty()
    $('#spaceReplace').addClass('none')
    spareReplacementTile = e
    $('#spareBoard').attr("src", Tiles[e]["image"]);
    Board[replaceIndex] = e
    calculateScore(Board)
}

//function to move on to next word
function nextWord(isRestart = false) {
    Board = ['', '', '', '', '', '', '']
    lastBoard = ['', '', '', '', '', '', '']
    if (!isRestart) {
        $('.dragItem.ui-draggable.ui-draggable-handle').each(function() 
        {
            let flag = 0
            $.each(this.attributes, function() {
                if (this.name == 'style' && this.value.indexOf('none') > -1) 
                {
                    flag = 1
                }
                restart
            });
            if (flag == 0) {
                $.each(this.attributes, function() 
                {
                    if (this.name === 'piece') {
                        Tiles[this.value].currentCount++; 
                    }
                });
            }
        });

        //create a highscore counter
        if (score > highestScore) 
        {
            highestScore = score
        }
        $('#highScore').html(`<span>${highestScore}</span>`)
    }
    $('.tileRack').empty()
    $('.dragItem').remove()
    $('#noSpaceIcon').addClass('checkmark')
    $('#twoPlusIcon').addClass('checkmark')
    $('#word').html(`<span></span>`)
    createTileBoard(isRestart)
}

//restart the game
function restart() {
    nextWord(true)
    score = 0
    $('#word').html(`<span></span>`)
    $('#score').html(`<span>0</span>`)
}

//function to create a new tile board with empty values
function createTileBoard(isRestart) 
{
    if (isRestart) 
    {
        createTiles()
    }
    while ($('.tileRack img').length < 7 || calculateRemain() < 7) 
    {
        let index = Random(0, 26)
        let currentpiece = tileNumList[index]
        if (Tiles[currentpiece].currentCount > 0) 
        {
            let newSpot = $(`<img id=${$('.tileRack').length-1} src=${Tiles[currentpiece]["image"]} class="dragItem" piece=${currentpiece} />`);
            $('.tileRack').append(newSpot)
            newSpot.draggable({
                revertDuration: 100, 
                start: function(event, ui) 
                {
                    $(this).css("z-index", 100);
                    $(this).draggable("option", "revert", "invalid");
                },
            }).each(function() 
            {
                var top = $(this).position().top;
                var left = $(this).position().left;
                $(this).data('tp', top);
                $(this).data('lft', left);
                arrPosition.push(
                    {
                        "tp": top,
                        "lft": left
                    })
            }
            );
            Tiles[currentpiece].currentCount--
        }
        let remainSum = calculateRemain()
        $('#tilesLeft').html(`<span>${remainSum}</span>`)
    }
}