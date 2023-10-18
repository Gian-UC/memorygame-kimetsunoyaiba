const cards = [
    { id: 1, img: './src/images/nezuko.jpg' },
    { id: 2, img: './src/images/nezuko.jpg' },
    { id: 3, img: './src/images/tanjirou.jpg' },
    { id: 4, img: './src/images/tanjirou.jpg' },
    { id: 5, img: './src/images/zenitsu.jpg' },
    { id: 6, img: './src/images/zenitsu.jpg' },
    { id: 7, img: './src/images/inosuke.jpg' },
    { id: 8, img: './src/images/inosuke.jpg' },  
    { id: 11, img: './src/images/shinobu.jpg' },
    { id: 12, img: './src/images/shinobu.jpg' },
    { id: 13, img: './src/images/mitsuri.jpg' },
    { id: 14, img: './src/images/mitsuri.jpg' },    
  ];
  

  
  let flippedCards = [];
  let matchedCards = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createCard(card) {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card');
  cardElement.dataset.id = card.id;

  const frontFace = document.createElement('div');
  frontFace.classList.add('front-face');
  frontFace.style.backgroundImage = `url(${card.img})`;

  const backFace = document.createElement('div');
  backFace.classList.add('back-face');

  cardElement.appendChild(frontFace);
  cardElement.appendChild(backFace);

  cardElement.classList.add('flip');

  cardElement.addEventListener('click', flipCard);

  return cardElement;
}

function flipCard() {
  if (!this.classList.contains('matched') && flippedCards.length < 2 && !this.classList.contains('flipping')) {
    this.classList.add('flipping');

    // Se a carta já estiver virada, não faz nada
    if (!this.classList.contains('flip')) {
      this.classList.add('flip');
      flippedCards.push(this);

      if (flippedCards.length === 2) {
        setTimeout(checkMatch, 500);
      }
    } else {
      this.classList.remove('flipping'); // Remover a classe flipping se a carta já estiver virada

      // Adicione esta linha para virar a carta de volta
      this.classList.remove('flip');

      
    }
  }
}


function checkMatch() {
  const [card1, card2] = flippedCards;
  const isMatch = card1.dataset.id === card2.dataset.id;

  if (isMatch) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards.push(card1, card2);
  } else {
    // Se não houver correspondência, vira as cartas de volta
    setTimeout(() => {
      card1.classList.remove('flipping');
      card2.classList.remove('flipping');
    }, 500);
  }

  flippedCards = [];

  if (matchedCards.length === cards.length) {
    displayWinMessage();
  }
}

function displayWinMessage() {
  const winMessage = document.createElement('div');
  winMessage.classList.add('win-message');
  winMessage.textContent = 'Parabéns, você ganhou o jogo!';

  document.body.appendChild(winMessage);
}

function initGame() {
  shuffle(cards);
  const memoryGame = document.querySelector('.memory-game');

  cards.forEach(card => {
    const cardElement = createCard(card);
    memoryGame.appendChild(cardElement);
  });
}

function resetGame() {
  const memoryGame = document.querySelector('.memory-game');
  const winMessage = document.querySelector('.win-message');

  // Remova todas as cartas do jogo
  while (memoryGame.firstChild) {
    memoryGame.removeChild(memoryGame.firstChild);
  }

  // Remova a mensagem de vitória, se existir
  if (winMessage) {
    winMessage.remove();
  }

  flippedCards = [];
  matchedCards = [];

  // Inicialize um novo jogo
  initGame();
}

initGame();