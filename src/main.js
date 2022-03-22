import Phaser from "phaser";
// Scenes
import Game from "./scenes/Game";
import GameOver from './scenes/GameOver.js'
import MainMenu from "./scenes/MainMenu";
import DogeOver from "./scenes/Doge";
import Win from './scenes/Win.js'
import {riskCreate, loadData, initPlayer } from "./data.js";

let currentPlayer = {}

const config = {
  width: 1025,
  height: 750,
  backgroundColor: "#90EE90",
  autoCenter: true,
  type: Phaser.AUTO,
  // Set Physics
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 700 },
      debug: false,
    },
  },
  scene: [MainMenu, Game, GameOver, Win, DogeOver]
};

export function initGame(){
  loadPlayerProfile()
  console.log(currentPlayer)
  console.log(currentPlayer.coins, currentPlayer.risk)

  if (currentPlayer.coins >= currentPlayer.risk && currentPlayer.risk > 0 && Number.isInteger(currentPlayer.risk)){
      new Phaser.Game(config);
      return
  } 

  else{
      return
  }
  
}

function loadPlayerProfile() {
  if (window.localStorage.getItem("player") === null) {
      return
  } else {
      let playerToLoad = CryptoJS.AES.decrypt(window.localStorage.getItem("player"), "secret").toString(CryptoJS.enc.Utf8)
      currentPlayer = JSON.parse(playerToLoad);
  }

}


window.onload = function(){
  initPlayer()
  document.getElementById("submitRisk").addEventListener('click', () => {
    riskCreate()
    initGame()})
  loadData()
}
