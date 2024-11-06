const monsters = [
    "Phreeoni", "Mistress", "Eddga", "Kraken", "Orc Hero", "Maya", "Pharaoh", "Orc Lord", "Amon Ra",
    "Doppelganger", "Morroc", "Time Holder", "Tao Gunka", "Lost Dragon", "Fallen Bishop", "Arc Angeling",
    "Gioia", "RSX-0806", "Nidhoggr's Shadow", "Dragon Fly", "Eclipse", "Mastering", "Ghostring", "Toad",
    "King Dramoh", "Angeling", "Deviling", "Dark Priest", "Vagabond Wolf", "Mysteltainn", "Chimera",
    "Ogretooth", "Necromancer", "Coelacanth", "Naght Sieger", "Observation", "Skeggiold", "Faceworm Queen", "Queen Scraba"
];

let selectedMonster = "";

document.getElementById('search-bar').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const filteredMonsters = monsters.filter(monster => monster.toLowerCase().includes(searchTerm));
    const monsterList = document.getElementById('monster-list');
    monsterList.innerHTML = ""; 
	
    if (filteredMonsters.length > 0) {
        monsterList.style.display = "block";
        filteredMonsters.forEach(monster => {
            const listItem = document.createElement('li');
            listItem.textContent = monster;
            listItem.addEventListener('click', function() {
                selectedMonster = monster;
                document.getElementById('search-bar').value = monster; 
                monsterList.style.display = "none"; 
            });
            monsterList.appendChild(listItem);
        });
    } else {
        monsterList.style.display = "none";
    }
});


function getJakartaTime() {
    const date = new Date();
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * 7));
}

function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function updateWaktu() {
    const waktuSekarang = formatTime(getJakartaTime());
    document.getElementById('waktu-sekarang').textContent = `Waktu Server - ${waktuSekarang}`;
}

setInterval(updateWaktu, 1000);

document.getElementById('hitung-btn').addEventListener('click', function() {
    const menit = parseInt(document.getElementById('menit').value) || 0;
    const detik = parseInt(document.getElementById('detik').value) || 0;
    
    const waktuSekarang = getJakartaTime();
    let waktuBaru = new Date(waktuSekarang.getTime() + (menit * 60 * 1000) + (detik * 1000));
    waktuBaru.setSeconds(waktuBaru.getSeconds() - 5);
    
    const waktuSekarangStr = formatTime(waktuSekarang);
    const hasil = formatTime(waktuBaru);
    
    const resultText = selectedMonster ? `${selectedMonster} - ${hasil}` : `${hasil}`;
    
    document.getElementById('hasil').textContent = `${resultText}`;
    document.getElementById('copy-btn').style.display = 'block';
    
    const historyItem = document.createElement('li');
    historyItem.textContent = `${waktuSekarangStr} + ${menit}m + ${detik}s - 5s = ${resultText}`;
    document.getElementById('history-list').appendChild(historyItem);
    
    document.getElementById('copy-btn').onclick = function() {
        copyToClipboard(`[ ${resultText} ]`);
    };
    
    document.getElementById('menit').value = '';
    document.getElementById('detik').value = '';
    selectedMonster = '';
	
    document.getElementById('search-bar').value = '';
});

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    
    const notice = document.getElementById('clipboard-notice');
    notice.style.display = 'block';
    setTimeout(() => {
        notice.style.display = 'none';
    }, 2000);
}
