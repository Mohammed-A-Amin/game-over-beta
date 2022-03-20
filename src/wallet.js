const ethereumButton = document.querySelector('.enableEthereumButton');
const showAccount = document.querySelector('.showAccount');

document.getElementById('createPlayer').style.display = 'none';

ethereumButton.addEventListener('click', () => {
  getAccount();
  document.getElementById('createPlayer').style.display='block';
  document.getElementById('createPlayer').style.margin='auto';
  ethereumButton.remove()
});

async function getAccount() {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
 
  showAccount.innerHTML = account;
}
