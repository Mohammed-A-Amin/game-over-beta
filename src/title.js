import { updateLocalStorage } from "./data.js";

window.onload = function(){
    // createPlayer();
}

document.getElementById("createPlayer").addEventListener('click', createPlayer)

function createPlayer(){
    if (window.localStorage.getItem("player") === null){
        let newPlayer = {
            userName:  document.getElementById("userField").value,
            coins: 10
    }   
    console.log(newPlayer)
    updateLocalStorage(newPlayer);
    window.location.href = "./index.html"
    return
}
else{
    window.location.href = "./index.html"
    return
}
}