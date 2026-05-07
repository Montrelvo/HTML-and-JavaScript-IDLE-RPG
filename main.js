let player = {
  gold: 50,
  reputation: 1
};

let guild = [];

function log(text) {
  const logDiv = document.getElementById("log");
  logDiv.innerHTML += `<div>> ${text}</div>`;
  logDiv.scrollTop = logDiv.scrollHeight;
}

function updateUI() {
  document.getElementById("stats").innerHTML =
    `Gold: ${player.gold} | Reputation: ${player.reputation}`;

  const guildDiv = document.getElementById("guild");
  guildDiv.innerHTML = "";

  guild.forEach((a, i) => {
    guildDiv.innerHTML += `
      <div>
        ${a.name} (Lv ${a.level} ${a.class}) — HP:${a.hp} ATK:${a.atk} XP:${a.xp}
      </div>
    `;
  });
}

function recruitAdventurer() {
  if (player.gold < 10) {
    log("Not enough gold to recruit.");
    return;
  }

  player.gold -= 10;

  const classes = ["Fighter", "Mage", "Rogue", "Healer"];
  const cls = classes[Math.floor(Math.random() * classes.length)];

  const adventurer = {
    name: "Adventurer " + (guild.length + 1),
    class: cls,
    level: 1,
    hp: 10,
    atk: 3,
    xp: 0
  };

  guild.push(adventurer);
  log(`Recruited a ${cls}.`);
  updateUI();
}

function sendOnQuest() {
  if (guild.length === 0) {
    log("You have no adventurers.");
    return;
  }

  log("The party ventures into the dungeon...");

  let success = Math.random() < 0.75;
  let reward = Math.floor(Math.random() * 10) + 5;

  if (success) {
    player.gold += reward;
    player.reputation += 1;

    guild.forEach(a => {
      a.xp += 5;
      if (a.xp >= 10) {
        a.level++;
        a.xp = 0;
        a.hp += 2;
        a.atk += 1;
        log(`${a.name} leveled up!`);
      }
    });

    log(`Quest successful! Earned ${reward} gold.`);
  } else {
    log("The quest failed. The party retreats.");
  }

  updateUI();
}

updateUI();
log("Welcome to your tavern.");

// Check localStorage availability and add save/load with logs
function saveGame() {
   if (typeof localStorage === 'undefined') {
       log("LocalStorage is not available, can't save game data.");
       return;
   }
   try {
       let data = {
           player,
           guild
       };
       localStorage.setItem("myGameSave", JSON.stringify(data));
       log("Game data saved to localStorage.");
   } catch (err) {
       log("Error saving game data: " + err.message);
   }
}

function loadGame() {
   if (typeof localStorage === 'undefined') {
       log("LocalStorage is not available, can't load game data.");
       return;
   }
   try {
       let dataStr = localStorage.getItem("myGameSave");
       if (!dataStr) {
           log("No saved game data found in localStorage.");
           return;
       }
       let data = JSON.parse(dataStr);
       if (!data.player || !data.guild) {
           log("Saved game data is missing expected structures.");
           return;
       }
       // Assign loaded data
       player = data.player;
       guild = data.guild;
       log("Game data loaded successfully from localStorage.");
   } catch (err) {
       log("Error loading game data from localStorage: " + err.message);
   }
   updateUI();
}

// Load game on startup
loadGame();

// Optional: auto-save every 10 seconds
function autoSaveInterval() {
   saveGame();
   setTimeout(autoSaveInterval, 10000);
}
setTimeout(autoSaveInterval, 10000);
