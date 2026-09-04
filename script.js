/* ============================================
   1. TEACHER DATA
============================================ */
const teachers = {
    // REPLACE TEACHER NAME, PHOTO, AND MESSAGE HERE
    teacher1: {
        name: "Kavisha Ma'am",
        photo: "assets/teacher1.png",
        message: "Your guidance has encouraged us to think beyond books and believe in our own potential."
    },
    teacher2: {
        name: "Alok Sir",
        photo: "assets/teacher2.png",
        message: "Some teachers teach lessons, but great teachers leave a lasting impact on lives."
    },
    teacher3: {
        name: "Rajpal Sir",
        photo: "assets/teacher3.png",
        message: "Your patience and dedication have helped us learn, grow and believe in ourselves."
    },
    teacher4: {
        name: "Rishabh Sir",
        photo: "assets/teacher4.jpeg",
        message: "The encouragement you give reaches far beyond the walls of a classroom."
    },
    teacher5: {
        name: "Ananya Ma'am",
        photo: "assets/teacher5.jpeg",
        message: "A teacher's influence travels far beyond the lessons they teach."
    },
    teacher6: {
        name: "Sonia Ma'am",
        photo: "assets/teacher6.png",
        message: "A teacher's influence travels far beyond the lessons they teach."
    }
};

/* ============================================
   2. DEFAULT TEACHER HANDLING
============================================ */
const defaultTeacher = {
    name: "Dear Teacher",
    photo: "", // Empty string triggers fallback
    message: "Thank you for guiding, inspiring and believing in your students."
};

/* ============================================
   3. URL PARAMETER DETECTION
============================================ */
function getTeacherData() {
    const params = new URLSearchParams(window.location.search);
    const teacherId = params.get('teacher');
    
    if (teacherId && teachers[teacherId]) {
        return teachers[teacherId];
    }
    return defaultTeacher;
}

const currentTeacher = getTeacherData();

/* ============================================
   4. DOM REFERENCES
============================================ */
const phaseMystery = document.getElementById('phase-mystery');
const phaseCountdown = document.getElementById('phase-countdown');
const mainJourney = document.getElementById('main-journey');
const unlockBtn = document.getElementById('unlock-btn');
const countdownNumber = document.getElementById('countdown-number');
const effectsContainer = document.getElementById('effects-container');

/* ============================================
   5. DYNAMIC TEACHER RENDERING & PHOTO FALLBACK
============================================ */
function renderTeacherData() {
    document.getElementById('teacher-name').innerText = currentTeacher.name;
    document.getElementById('teacher-message').innerText = currentTeacher.message;

    const photoContainer = document.getElementById('teacher-photo-container');
    
    if (currentTeacher.photo) {
        const img = document.createElement('img');
        img.src = currentTeacher.photo;
        img.className = 'teacher-img';
        img.alt = `Photo of ${currentTeacher.name}`;
        
        // Error handling for missing image file
        img.onerror = () => renderFallbackAvatar(photoContainer);
        
        photoContainer.appendChild(img);
    } else {
        renderFallbackAvatar(photoContainer);
    }
}

function renderFallbackAvatar(container) {
    container.innerHTML = '';
    const initials = currentTeacher.name
        .replace(/^(Dr\.|Prof\.|Mr\.|Ms\.|Mrs\.)\s+/i, '')
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
        
    const fallbackDiv = document.createElement('div');
    fallbackDiv.className = 'teacher-fallback';
    fallbackDiv.innerText = initials;
    container.appendChild(fallbackDiv);
}

/* ============================================
   6. FIREWORKS & CONFETTI ENGINE (NO LIBRARIES)
============================================ */
const colors = ['#20E3FF', '#2F80FF', '#FF3CAC', '#FFD166', '#FF9F1C', '#FFFFFF'];

function createFirework(x, y) {
    const particleCount = 40;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Random spread
        const angle = Math.random() * Math.PI * 2;
        const velocity = 50 + Math.random() * 100; // Spread distance
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        
        effectsContainer.appendChild(particle);
        
        // Clean up DOM after animation
        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }
}

function launchConfetti() {
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Randomize origin and fall speed
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDuration = `${2 + Math.random() * 3}s`;
        
        // Random shapes (rectangles or circles)
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        }
        
        effectsContainer.appendChild(confetti);
        
        confetti.addEventListener('animationend', () => {
            confetti.remove();
        });
    }
}

function triggerGrandExplosion() {
    // Fire off multiple fireworks
    const xPositions = [20, 50, 80]; // percentages
    
    xPositions.forEach((x, index) => {
        setTimeout(() => {
            createFirework((window.innerWidth * x) / 100, window.innerHeight * 0.3);
        }, index * 300);
    });
    
    launchConfetti();
}

/* ============================================
   7. MYSTERY UNLOCK & COUNTDOWN SEQUENCE
============================================ */
unlockBtn.addEventListener('click', () => {
    // Hide Phase 1
    phaseMystery.classList.remove('active');
    phaseMystery.classList.add('hidden');
    
    // Show Phase 2 (Countdown)
    phaseCountdown.classList.remove('hidden');
    phaseCountdown.classList.add('active');
    
    let count = 3;
    countdownNumber.innerText = count;
    
    const interval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownNumber.innerText = count;
        } else if (count === 0) {
            countdownNumber.innerText = "🎉";
            countdownNumber.style.fontSize = "15rem";
        } else {
            clearInterval(interval);
            startGrandCelebration();
        }
    }, 1000);
});

/* ============================================
   8. GRAND CELEBRATION
============================================ */
function startGrandCelebration() {
    // Hide countdown
    phaseCountdown.classList.remove('active');
    phaseCountdown.classList.add('hidden');
    
    // Show Main Journey & allow scrolling
    mainJourney.classList.remove('hidden');
    document.body.style.overflowY = 'auto'; // Unlock scroll
    
    // Trigger Effects
    triggerGrandExplosion();
    
    // Animate Typography
    const words = document.querySelectorAll('.block-word');
    words.forEach((word, index) => {
        setTimeout(() => {
            word.classList.add('show');
        }, index * 400);
    });
}

/* ============================================
   9. SCROLL REVEAL (INTERSECTION OBSERVER)
============================================ */
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            
            // Optional: trigger firework if it's the finale section
            if(entry.target.id === 'finale') {
                setTimeout(triggerGrandExplosion, 500);
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with .scroll-reveal class
document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

/* ============================================
   10. INTERACTIVE GRATITUDE CARDS
============================================ */
const cards = document.querySelectorAll('.interactive-card');
cards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
        
        // Small local particle burst on click
        const rect = card.getBoundingClientRect();
        createFirework(rect.left + rect.width/2, rect.top + rect.height/2);
    });
});

/* ============================================
   11. ENVELOPE MESSAGE REVEAL
============================================ */
const openEnvelopeBtn = document.getElementById('open-envelope-btn');
const envelope = document.getElementById('message-envelope');

openEnvelopeBtn.addEventListener('click', () => {
    envelope.classList.add('open');
    openEnvelopeBtn.style.opacity = '0'; // Hide button after opening
    openEnvelopeBtn.style.pointerEvents = 'none';
    
    setTimeout(() => {
        createFirework(window.innerWidth / 2, window.innerHeight / 2);
    }, 600);
});

/* ============================================
   12. SURPRISE CARD SHUFFLE
============================================ */
const shuffleBtn = document.getElementById('shuffle-btn');
const shuffleDeck = document.getElementById('shuffle-deck');

shuffleBtn.addEventListener('click', () => {
    shuffleDeck.classList.add('shuffled');
    shuffleBtn.style.opacity = '0';
    shuffleBtn.style.pointerEvents = 'none';
    
    setTimeout(() => {
        triggerGrandExplosion(); // Reward interaction
    }, 800);
});

/* ============================================
   13. MEMORY SKY INTERACTION
============================================ */
const starCanvas = document.getElementById('star-canvas');

starCanvas.addEventListener('click', (e) => {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Adjust for section offset
    const rect = starCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    
    starCanvas.appendChild(star);
    
    star.addEventListener('animationend', () => {
        // Keep the star but lower opacity (handled in CSS keyframes 'forwards')
    });
});

/* ============================================
   14. FINAL FIREWORKS BUTTON
============================================ */
const finaleBtn = document.getElementById('finale-fireworks-btn');
finaleBtn.addEventListener('click', () => {
    triggerGrandExplosion();
    // Rapid fire
    let count = 0;
    const rapid = setInterval(() => {
        createFirework(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
        count++;
        if(count > 5) clearInterval(rapid);
    }, 300);
});

/* ============================================
   15. OPTIONAL AUDIO
============================================ */
const audioToggle = document.getElementById('audio-toggle');
const bgMusic = document.getElementById('bg-music');
const audioText = audioToggle.querySelector('.audio-text');
let isPlaying = false;

audioToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        audioText.innerText = "MUSIC OFF";
        audioToggle.style.opacity = "0.5";
    } else {
        // Attempt to play (browser policies apply)
        bgMusic.play().then(() => {
            audioText.innerText = "MUSIC ON";
            audioToggle.style.opacity = "1";
        }).catch(err => {
            console.log("Audio play blocked by browser:", err);
            alert("Please interact with the document first to enable audio.");
        });
    }
    isPlaying = !isPlaying;
});

// Hide audio button if src fails to load (graceful degradation)
bgMusic.addEventListener('error', () => {
    audioToggle.style.display = 'none';
});

/* ============================================
   16. INITIALIZATION
============================================ */
window.addEventListener('DOMContentLoaded', () => {
    renderTeacherData();
    window.scrollTo(0, 0);
});