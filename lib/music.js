const songs = [
  { title: "All Rise", duration: "4:20", file: "/assets/music/All Rise.mp3" },
  { title: "Innocent Man", duration: "4:15", file: "/assets/music/Innocent Man.mp3" },
  { title: "Holding On", duration: "3:50", file: "/assets/music/Holding On.mp3" },
  { title: "Straight Outta The Sticks", duration: "3:45", file: "/assets/music/Straight Outta The Sticks.mp3" },
  { title: "Reasonable Doubt", duration: "4:15", file: "/assets/music/Reasonable Doubt.mp3" },
  { title: "You Can't Win", duration: "4:00", file: "/assets/music/You Can't Win.mp3" },
  { title: "50 Years", duration: "3:30", file: "/assets/music/50 Years.mp3" },
  { title: "Tater Soup", duration: "3:45", file: "/assets/music/Tater Soup.mp3" },
  { title: "Backroads & Benjamins", duration: "3:55", file: "/assets/music/Backroads & Benjamins.mp3" },
  { title: "Farmboy Fresh", duration: "3:55", file: "/assets/music/Farmboy Fresh.mp3" },
  { title: "Granny's Buick", duration: "4:05", file: "/assets/music/Granny's Buick.mp3" },
  { title: "Tattooed on my heart", duration: "3:10", file: "/assets/music/Tattooed on my heart remix .mp3" },
  { title: "Dirt Road Dictionary", duration: "3:40", file: "/assets/music/Dirt Road Dictionary.mp3" },
  { title: "Don't Forget", duration: "3:40", file: "/assets/music/Don't forget .mp3" },
  { title: "Gravel In My Veins", duration: "3:35", file: "/assets/music/Gravel in my veins.mp3" },
  { title: "Zero Fucks Given", duration: "3:20", file: "/assets/music/Zero Fucks Given.mp3" },
  { title: "Villain On The Yard", duration: "3:50", file: "/assets/music/Villain on the yard .mp3" },
  { title: "I'm Good", duration: "3:15", file: "/assets/music/I'm Good.mp3" },
  { title: "Outside Those Walls", duration: "4:14", file: "/assets/music/Outside Those Walls.mp3" },
  { title: "Truth Don't Sleep", duration: "3:06", file: "/assets/music/Truth Don't Sleep.mp3" },
  { title: "Empty Promises", duration: "4:06", file: "/assets/music/Empty Promises.mp3" },
  { title: "F.A.F.O.", duration: "2:44", file: "/assets/music/FAFO.mp3" },
  { title: "Red Dirt Bloodline", duration: "3:55", file: "/assets/music/Red-Dirt_Bloodline.mp3" },
];

const podcasts = [
  { title: "The Impossible Timeline — Deep Dive", duration: "60:00", file: "/assets/music/The Impossible Timeline -Deep Dive.m4a" },
  { title: "State of Oklahoma v Dallas C Norton", duration: "45:00", file: "/assets/music/State of Oklahoma V Dallas C Norton CF-2019-1273_082009386.mp3" },
];

let current = null;
let isPlaying = false;

function renderSongs() {
  const container = document.getElementById('songs-list');
  container.innerHTML = songs.map((s, i) => `
    <div class="track-row" data-file="${s.file}" style="display:flex;align-items:center;gap:12px;padding:10px 14px;border-bottom:1px solid rgba(255,255,255,0.05);cursor:pointer;background:${current && current.file === s.file ? 'rgba(0,255,255,0.08)' : 'transparent'};border-left:${current && current.file === s.file ? '3px solid #00FFFF' : '3px solid transparent'};">
      <span style="width:24px;font-family:monospace;color:${current && current.file === s.file ? '#00FFFF' : '#71717a'};font-size:11px;">${String(i + 1).padStart(2, '0')}</span>
      <span style="flex:1;font-family:'DM Sans',sans-serif;font-size:14px;color:${current && current.file === s.file ? '#00FFFF' : '#fafafa'};overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${s.title}</span>
      <span style="font-family:monospace;font-size:11px;color:#71717a;">${s.duration}</span>
    </div>
  `).join('');
  container.querySelectorAll('.track-row').forEach(row => {
    row.addEventListener('click', () => playTrack(songs.find(s => s.file === row.dataset.file)));
  });
}

function renderPodcasts() {
  const container = document.getElementById('podcasts-list');
  container.innerHTML = podcasts.map((p) => `
    <div class="pod-card" data-file="${p.file}" style="padding:16px;border:${current && current.file === p.file ? '1px solid #00FFFF' : '1px solid rgba(255,255,255,0.1)'};border-radius:12px;background:${current && current.file === p.file ? 'rgba(0,255,255,0.05)' : 'rgba(255,255,255,0.02)'};cursor:pointer;transition:all 0.2s;">
      <div style="font-size:9px;color:#00FFFF;font-weight:700;letter-spacing:2px;text-transform:uppercase;font-family:'DM Sans',sans-serif;margin-bottom:6px;">● Special Report</div>
      <div style="font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;color:#fafafa;margin-bottom:8px;">${p.title}</div>
      <div style="font-family:monospace;font-size:11px;color:#71717a;">${p.duration}</div>
    </div>
  `).join('');
  container.querySelectorAll('.pod-card').forEach(card => {
    card.addEventListener('click', () => playTrack(podcasts.find(p => p.file === card.dataset.file)));
  });
}

function playTrack(track) {
  current = track;
  isPlaying = false;
  renderSongs();
  renderPodcasts();
  const audio = document.getElementById('audio-player');
  audio.src = track.file;
  audio.play().then(() => isPlaying = true).catch(() => {});
  renderPlayer();
}

function renderPlayer() {
  if (!current) return;
  const player = document.createElement('div');
  player.id = 'player-bar';
  player.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:60;background:rgba(15,17,23,0.96);backdrop-filter:blur(24px);border-top:1px solid rgba(0,255,255,0.2);padding:12px 20px;display:flex;align-items:center;gap:16;';
  player.innerHTML = `
    <div style="display:flex;align-items:center;gap:12;min-width:0;flex:1;">
      <div style="width:40px;height:40px;border-radius:8px;background:rgba(0,255,255,0.1);border:1px solid rgba(0,255,255,0.4);display:flex;align-items:center;justify-content:center;color:#00FFFF;flex-shrink:0;">♪</div>
      <div style="min-width:0;flex:1;">
        <div style="font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;color:#fafafa;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" class="player-title">${current.title}</div>
        <div style="font-family:monospace;font-size:10px;color:#71717a;letter-spacing:1px;text-transform:uppercase;">Now Playing</div>
      </div>
    </div>
    <button id="play-pause" style="width:44px;height:44px;border-radius:50%;border:1px solid rgba(0,255,255,0.4);background:rgba(0,255,255,0.08);color:#00FFFF;cursor:pointer;font-size:16px;">${isPlaying ? '❚❚' : '▶'}</button>
    <button id="dismiss-btn" style="background:transparent;border:1px solid rgba(255,255,255,0.1);color:#a1a1aa;padding:8px 14px;border-radius:999px;font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;">Dismiss</button>
  `;
  const existing = document.getElementById('player-bar');
  if (existing) existing.replaceWith(player);
  else document.body.appendChild(player);
  
  document.getElementById('play-pause').onclick = () => {
    const audio = document.getElementById('audio-player');
    if (isPlaying) { audio.pause(); isPlaying = false; } 
    else { audio.play().then(() => isPlaying = true); }
    renderPlayer();
  };
  document.getElementById('dismiss-btn').onclick = () => {
    const audio = document.getElementById('audio-player');
    audio.pause(); audio.removeAttribute('src');
    current = null; isPlaying = false;
    document.getElementById('player-bar').remove();
  };
}

document.addEventListener('DOMContentLoaded', () => {
  renderSongs();
  renderPodcasts();
});

// Prevent right-click on entire page
document.addEventListener('contextmenu', (e) => e.preventDefault());