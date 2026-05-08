let player = {
  gold: 50,
  reputation: 1,
  wood: 0,
  stone: 0,
  iron: 0,
  cotton: 0
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

function getRandomResources() {
  const resourceTypes = ['wood', 'stone', 'iron', 'cotton'];
  const numResources = Math.random() < 0.5 ? 2 : 3; // 50% chance of 2 or 3 resources
  const selected = [];
  const temp = [...resourceTypes];
  
  for (let i = 0; i < numResources; i++) {
    const idx = Math.floor(Math.random() * temp.length);
    selected.push(temp[idx]);
    temp.splice(idx, 1);
  }
  
  const resources = {};
  selected.forEach(res => {
    resources[res] = Math.floor(Math.random() * 5) + 1; // 1-5 of each resource
  });
  
  return resources;
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

    // Get and award random resources
    const resources = getRandomResources();
    Object.keys(resources).forEach(res => {
      player[res] += resources[res];
      log(`Obtained ${resources[res]} ${res}.`);
    });

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

function checkRecruitStatus() {
  if (guild.length === 0) {
    log("You have no adventurers in your guild.");
    return;
  }

  log("--- Recruit Status Report ---");
  guild.forEach((a, i) => {
    log(`${i + 1}. ${a.name} (${a.class}) | Level: ${a.level} | HP: ${a.hp} | ATK: ${a.atk} | XP: ${a.xp}/10`);
  });
  log("--- End Report ---");
}

function checkInventory() {
  log("--- Tavern Inventory ---");
  log(`Gold: ${player.gold}`);
  log(`Reputation: ${player.reputation}`);
  log(`Adventurers: ${guild.length}`);
  log(`Wood: ${player.wood}`);
  log(`Stone: ${player.stone}`);
  log(`Iron: ${player.iron}`);
  log(`Cotton: ${player.cotton}`);
  log("--- End Inventory ---");
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
       
       // Ensure backward compatibility for new resources
       player.wood = player.wood || 0;
       player.stone = player.stone || 0;
       player.iron = player.iron || 0;
       player.cotton = player.cotton || 0;
       
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
