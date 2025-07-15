// DOM Elements
const splash = document.getElementById('splash');
const humanCheck = document.getElementById('human-check');
const app = document.getElementById('app');
const continueBtn = document.getElementById('continue-btn');
const themeToggle = document.getElementById('theme-toggle');
const searchInput = document.getElementById('search');
const countriesList = document.getElementById('countries');
const recentSongs = document.getElementById('recent-songs');
const classicSongs = document.getElementById('classic-songs');
const countryName = document.getElementById('country-name');
const welcomeMsg = document.getElementById('welcome-message');
const songResults = document.getElementById('song-results');

// Phase 1: Splash + Human Check
continueBtn.addEventListener('click', () => {
  splash.classList.add('hidden');
  humanCheck.classList.remove('hidden');
});

document.querySelectorAll('.quiz-option').forEach(option => {
  option.addEventListener('click', (e) => {
    if (e.target.dataset.correct === 'true') {
      humanCheck.classList.add('hidden');
      app.classList.remove('hidden');
      loadCountries();
    } else {
      alert('Wrong answer! Try again.');
    }
  });
});

// Phase 2: Load Countries
async function loadCountries() {
  try {
    const response = await fetch('songs.json');
    const data = await response.json();
    window.songData = data;

    countriesList.innerHTML = '';
    Object.keys(data).forEach(country => {
      const button = document.createElement('button');
      button.textContent = country;
      button.addEventListener('click', () => showSongs(country));
      countriesList.appendChild(button);
    });
  } catch (error) {
    console.error('Error loading countries:', error);
  }
}

// Phase 3: Show Songs
function showSongs(country) {
  welcomeMsg.classList.add('hidden');
  songResults.classList.remove('hidden');
  countryName.textContent = country;

  recentSongs.innerHTML = '';
  classicSongs.innerHTML = '';

  const songs = window.songData[country];
  songs.recent.forEach(song => {
    recentSongs.appendChild(createSongButton(song));
  });
  songs.classic.forEach(song => {
    classicSongs.appendChild(createSongButton(song));
  });
}

function createSongButton(song) {
  const button = document.createElement('button');
  button.innerHTML = `<i class="fab fa-youtube"></i> ${song.title}`;
  button.addEventListener('click', () => window.open(song.youtube, '_blank'));
  return button;
}

// Search Functionality
searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();
  const buttons = countriesList.querySelectorAll('button');

  buttons.forEach(button => {
    const country = button.textContent.toLowerCase();
    button.style.display = country.includes(term) ? 'block' : 'none';
  });
});

// Dark/Light Mode Toggle
themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  themeToggle.innerHTML = `<i class="fas ${newTheme === 'dark' ? 'fa-moon' : 'fa-sun'}"></i> ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`;
});

// Initialize
loadCountries();