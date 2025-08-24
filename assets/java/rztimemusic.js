/////////////////////////////////////////
// Script 100% minha copia nao comedia //
//             for rzharo              //
/////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {
    const bgMusic = document.getElementById('bgMusic');
    const muteBtn = document.getElementById('muteBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    
    // Configurações iniciais
    bgMusic.volume = localStorage.getItem('musicVolume') || 0.3;
    volumeSlider.value = bgMusic.volume;
    let audioStarted = false;

    // Atualiza controles visuais
    function updateControls() {
        const isMuted = bgMusic.paused || bgMusic.volume === 0;
        muteBtn.innerHTML = isMuted ? 
            '<i class="fas fa-volume-mute"></i>' : 
            '<i class="fas fa-volume-up"></i>';
    }

    // Controle do volume
    volumeSlider.addEventListener('input', function() {
        bgMusic.volume = this.value;
        if (bgMusic.volume > 0 && bgMusic.paused) {
            bgMusic.play();
        }
        localStorage.setItem('musicVolume', bgMusic.volume);
        updateControls();
    });

    // Controle do mute
    muteBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (bgMusic.paused) {
            bgMusic.play();
        } else {
            bgMusic.pause();
        }
        updateControls();
    });

    // Simula um clique após 1 segundo
    setTimeout(function() {
        // Cria e dispara um evento de clique no body
        const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        document.body.dispatchEvent(clickEvent);
        
        // Tenta iniciar a música imediatamente após o clique simulado
        startAudio();
    }, 2000);

    function startAudio() {
        if (audioStarted) return;
        
        audioStarted = true;
        const playPromise = bgMusic.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => updateControls())
                .catch(error => {
                    console.log("Autoplay bloqueado:", error);
                    document.body.addEventListener('click', retryAudioOnce, { once: true });
                });
        }
    }

    function retryAudioOnce() {
        bgMusic.play()
            .then(() => updateControls())
            .catch(error => console.log("Reprodução ainda bloqueada:", error));
    }

    updateControls();
});

// Função para esconder a tela de introdução e iniciar a música
document.getElementById('intro-screen').addEventListener('click', function() {
    this.style.display = 'none';
    document.querySelector('.container').style.display = 'flex';
    
    // Inicia a música
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.play().catch(e => {
        console.log("Reprodução automática bloqueada pelo navegador:", e);
        // Mostra um aviso se a reprodução automática foi bloqueada
        alert("Por favor, clique no botão de volume para ativar a música.");
    });
});

/////////////////////////////////////////
// Script 100% minha copia nao comedia //
//             for rzharo              //
/////////////////////////////////////////