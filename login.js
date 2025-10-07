document.addEventListener('DOMContentLoaded', function() {

    // --- SENHA ---
    const SENHA_CORRETA = "carro";

    // --- ELEMENTOS DO LOGIN ---
    const loginContainer = document.getElementById('login-container');
    const contentContainer = document.getElementById('content-container');
    const loginForm = document.getElementById('login-form');
    const passwordInput = document.getElementById('password-input');

    // --- ELEMENTOS DO PLAYER ---
    const musica = document.getElementById('nossa-musica');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const progress = document.getElementById('progress');
    const progressContainer = document.getElementById('progress-container');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');

    // --- LÓGICA DE LOGIN ---
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const senhaDigitada = passwordInput.value;

        if (senhaDigitada === SENHA_CORRETA) {
            loginContainer.style.display = 'none';
            contentContainer.style.display = 'block';
            togglePlayPause(); // Inicia a música
        } else {
            alert("Senha incorreta. Tente de novo, meu amor!");
            passwordInput.value = "";
        }
    });

    // --- FUNÇÕES DO PLAYER ---

    // Função para Tocar ou Pausar a música
    function togglePlayPause() {
        if (musica.paused) {
            musica.play();
            playPauseBtn.classList.add('playing');
        } else {
            musica.pause();
            playPauseBtn.classList.remove('playing');
        }
    }

    // Função para atualizar a barra de progresso
    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Atualiza os tempos
        currentTimeEl.textContent = formatTime(currentTime);
    }

    // Função para formatar o tempo em MM:SS
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${String(secs).padStart(2, '0')}`;
    }
    
    // Função para pular para uma parte da música ao clicar na barra
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = musica.duration;
        musica.currentTime = (clickX / width) * duration;
    }

    // Função para carregar a duração total da música
    function loadDuration() {
        durationEl.textContent = formatTime(musica.duration);
    }

    // --- EVENTOS DO PLAYER ---
    playPauseBtn.addEventListener('click', togglePlayPause);
    musica.addEventListener('timeupdate', updateProgress);
    musica.addEventListener('loadedmetadata', loadDuration); // Carrega a duração quando o arquivo estiver pronto
    progressContainer.addEventListener('click', setProgress);
});