let s = "none";
let i = 0;
let w = 1;
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const score = document.querySelector('.score');
const word = document.querySelector('.word');

const jump = () => {
  mario.src = "img/mario-jump1.png";
  mario.classList.add('jump');
  setTimeout(() => {
    mario.src = "img/mario1.gif";
    mario.style.width = "8vh";
    mario.classList.remove('jump');
  }, 600);
}


const placar = setInterval(() => {
  if (s === "none") {
    i++;
    score.innerHTML = `score: ${i}`;
  }
  if (i === 10000) {
    i = 0;
    w++
    word.innerHTML = `Word ${w}`;
  }
}, 10);


const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

  if (pipePosition <= 42 && pipePosition < 1 && marioPosition < 50) {
    s = "you lose"
    mario.src = "img/mario-over.png";
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;
    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;
    mario.style.animation = "mario-over 2.5s";
  }

}, 10);
document.addEventListener('keydown', jump);
document.addEventListener('touchstart', jump);
// Adiciona um listener de eventos para a API Gamepad
window.addEventListener("gamepadconnected", event => {
  // Obtém o gamepad conectado
  const gamepad = event.gamepad;

  // Define o índice do botão a ser verificado
  const buttonIndex = 0; // O primeiro botão do controle (índice 0)

  // Função a ser chamada quando o botão é clicado
  function buttonClicked() {
    // Chama a função desejada para realizar a ação desejada
    jump()
  }

  // Adiciona um loop para atualizar o estado do gamepad
  function update() {
    // Obtém o estado do gamepad
    const state = navigator.getGamepads()[gamepad.index];

    // Verifica se o gamepad está conectado e se o botão está pressionado
    if (state && state.buttons[buttonIndex].pressed) {
      // Chama a função quando o botão é clicado
      buttonClicked();
    }

    // Chama a função de atualização novamente na próxima renderização do frame
    requestAnimationFrame(update);
  }

  // Chama a função de atualização pela primeira vez
  update();
});
