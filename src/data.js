let coinDisplay = document.getElementById("score-amount");
let userName = document.getElementById("userName");

window.onload = function(){
    initPlayer()
    loadData()
}

function loadData(){
    coinDisplay.innerHTML= currentPlayer.coins
    userName.innerHTML = currentPlayer.userName
}

export function addCoins(){
    loadPlayerProfile()
    currentPlayer.coins ++
    updateLocalStorage(currentPlayer)
    coinDisplay.innerHTML= currentPlayer.coins
}


function initPlayer(){
    if (window.localStorage.getItem("player") === null){
        console.log("moving to title")
        window.location.href = "./title.html"
        return
    }
    else{
        loadPlayerProfile()
        return
    }
}
let currentPlayer = {}


export function updateLocalStorage(player) {
    let playerToUpload = CryptoJS.AES.encrypt(JSON.stringify(player), "secret")
    window.localStorage.setItem("player", playerToUpload);
}

function loadPlayerProfile() {
    if (window.localStorage.getItem("player") === null) {
        return
    } else {
        let playerToLoad = CryptoJS.AES.decrypt(window.localStorage.getItem("player"), "secret").toString(CryptoJS.enc.Utf8)
        currentPlayer = JSON.parse(playerToLoad);
    }

}

