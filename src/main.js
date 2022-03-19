import Phaser from "phaser";
// Scenes
import Game from "./scenes/Game";
import GameOver from './scenes/GameOver.js'
import MainMenu from "./scenes/MainMenu";
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
      debug: true,
    },
  },
  scene: [MainMenu, Game, GameOver]
};

export function initGame(){
  loadPlayerProfile()
  console.log(currentPlayer)
  console.log(currentPlayer.coins, currentPlayer.risk)

  if (currentPlayer.coins >= currentPlayer.risk){
      new Phaser.Game(config);
      console.log("called here")
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
