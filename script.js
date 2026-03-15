// script.js - minimal functionality

document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audioPlayer');
    const videoPlayer = document.getElementById('videoPlayer');
    const nowPlaying = document.getElementById('nowPlaying');
    const playPauseBtn = document.getElementById('playPause');
    
    let currentAudio = null;
    let currentVideo = null;

    // Music player
    const playButtons = document.querySelectorAll('.playBtn');
    if (playButtons.length > 0) {
        playButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const item = this.closest('.item');
                const src = item.dataset.src;
                const title = item.querySelector('div').textContent;
                
                if (audioPlayer) {
                    if (currentAudio === src) {
                        if (audioPlayer.paused) {
                            audioPlayer.play();
                            this.textContent = '⏸';
                        } else {
                            audioPlayer.pause();
                            this.textContent = '▶';
                        }
                    } else {
                        audioPlayer.src = src;
                        audioPlayer.play();
                        currentAudio = src;
                        nowPlaying.textContent = `playing: ${title}`;
                        
                        // Reset all buttons
                        playButtons.forEach(b => b.textContent = '▶');
                        this.textContent = '⏸';
                    }
                }
            });
        });
    }

    // Video player
    const videoBtns = document.querySelectorAll('.playVidBtn');
    if (videoBtns.length > 0 && videoPlayer) {
        videoBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const item = this.closest('.item');
                const src = item.dataset.src;
                const title = item.querySelector('div').textContent;
                
                videoPlayer.style.display = 'block';
                videoPlayer.querySelector('source').src = src;
                videoPlayer.load();
                videoPlayer.play();
                nowPlaying.textContent = `watching: ${title}`;
            });
        });
    }

    // Play/Pause button in player bar
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', function() {
            if (audioPlayer && audioPlayer.src) {
                if (audioPlayer.paused) {
                    audioPlayer.play();
                    this.textContent = '⏸';
                } else {
                    audioPlayer.pause();
                    this.textContent = '▶';
                }
            }
        });
    }

    // Update play button when audio ends
    if (audioPlayer) {
        audioPlayer.addEventListener('ended', function() {
            playButtons.forEach(b => b.textContent = '▶');
            playPauseBtn.textContent = '▶';
            nowPlaying.textContent = 'not playing';
        });
    }
});
function showPhoto(img) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        cursor: pointer;
    `;
    
    // Create enlarged image
    const largeImg = document.createElement('img');
    largeImg.src = img.src;
    largeImg.style.cssText = `
        max-width: 90%;
        max-height: 80vh;
        object-fit: contain;
    `;
    
    // Add close button
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        color: white;
        font-size: 40px;
        cursor: pointer;
    `;
    
    overlay.appendChild(largeImg);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);
    
    // Close functions
    overlay.onclick = function(e) {
        if (e.target === overlay || e.target === closeBtn) {
            document.body.removeChild(overlay);
        }
    };
}
