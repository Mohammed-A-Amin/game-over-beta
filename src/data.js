let coinDisplay = document.getElementById("score-amount");
let userName = document.getElementById("userName");

window.onload = function () {
  initPlayer();
  document.getElementById("submitRisk").addEventListener("click", riskCreate);
  loadData();
};

export function displayRank() {
let rank = document.getElementById("rank");
  if (currentPlayer.coins < 50) {
    rank.innerHTML = "Horseman";
  } else if (currentPlayer.coins >= 50 && currentPlayer.coins < 100) {
    rank.innerHTML = "Lancer";
  } else if (currentPlayer.coins >= 100 && currentPlayer.coins < 200) {
    rank.innerHTML = "Keeper";
  } else if (currentPlayer.coins >= 200 && currentPlayer.coins < 400) {
    rank.innerHTML = "Guardian";
  } else if (currentPlayer.coins >= 400 && currentPlayer.coins < 1000) {
    rank.innerHTML = "Justicar";
  } else if (currentPlayer.coins >= 1000 && currentPlayer.coins < 2000) {
    rank.innerHTML = "Paladin";
  } else if (currentPlayer.coins >= 2000 && currentPlayer.coins < 4000) {
    rank.innerHTML = "Executioner";
  } else if (currentPlayer.coins >= 4000 && currentPlayer.coins < 10000) {
    rank.innerHTML = "Lieutenant";
  } else if (currentPlayer.coins >= 10000 && currentPlayer.coins < 30000) {
    rank.innerHTML = "Commander";
  } else if (currentPlayer.coins >= 30000) {
    rank.innerHTML = "Divine Knight";
  }
}

export function loadData() {
  coinDisplay.innerHTML = currentPlayer.coins;
  userName.innerHTML = currentPlayer.userName;
  displayRank()
}

export function riskCreate() {
  loadPlayerProfile();
  currentPlayer.risk = parseInt(document.getElementById("risk").value);
  let button = document.getElementById("submitRisk");
  let input = document.getElementById("risk");

  if (currentPlayer.coins < currentPlayer.risk) {
    document.getElementById("riskText").innerHTML =
      "You don't have enough coins!";
    updateLocalStorage(currentPlayer);
    return;
  } else {
    document.getElementById("riskText").innerHTML =
      "You have risked " + currentPlayer.risk + " coins!";
    button.remove();
    input.remove();
    updateLocalStorage(currentPlayer);
    return;
  }
}

export function addRisk() {
  loadPlayerProfile();
  currentPlayer.coins += currentPlayer.risk;
  updateLocalStorage(currentPlayer);
  coinDisplay.innerHTML = currentPlayer.coins;
  displayRank();
}

export function subtractRisk() {
  loadPlayerProfile();
  currentPlayer.coins -= currentPlayer.risk;
  updateLocalStorage(currentPlayer);
  coinDisplay.innerHTML = currentPlayer.coins;
  displayRank();
}

export function dogeRisk() {
  loadPlayerProfile();
  currentPlayer.coins = currentPlayer.coins / 2;
  updateLocalStorage(currentPlayer);
  coinDisplay.innerHTML = currentPlayer.coins;
  displayRank();
}

// export function addCoins(){
//     loadPlayerProfile()
//     currentPlayer.coins ++
//     updateLocalStorage(currentPlayer)
//     coinDisplay.innerHTML= currentPlayer.coins
// }

export function initPlayer() {
  if (window.localStorage.getItem("player") === null) {
    console.log("moving to title");
    window.location.href = "./title.html";
    return;
  } else {
    loadPlayerProfile();
    return;
  }
}
let currentPlayer = {};

export function updateLocalStorage(player) {
  let playerToUpload = CryptoJS.AES.encrypt(JSON.stringify(player), "secret");
  window.localStorage.setItem("player", playerToUpload);
}

export function loadPlayerProfile() {
  if (window.localStorage.getItem("player") === null) {
    return;
  } else {
    let playerToLoad = CryptoJS.AES.decrypt(
      window.localStorage.getItem("player"),
      "secret"
    ).toString(CryptoJS.enc.Utf8);
    currentPlayer = JSON.parse(playerToLoad);
  }
}
