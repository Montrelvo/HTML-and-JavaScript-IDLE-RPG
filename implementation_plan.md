# Step-by-step Plan to Implement Missing Features

## 1. Overview

Based on comparing the current JavaScript code ([main.js](main.js:1)) to the game design document ([tavern guild game design.txt](tavern guild game design.txt:1)), the following features are missing or incomplete:

• Idle mechanics (auto-resolving quests over time, offline progress, efficiency upgrades)
• Local storage for saving progress
• More robust class-based mechanics and growth
• Randomized loot distribution and management
• Dungeon crawler elements with random encounters and risk/reward
• Rarity tiers for loot

Below is an outline for how to implement each missing feature.

---

## 2. LocalStorage for Saving/Loading

1. Add functions to save the `player`, `guild`, and all other game states in localStorage.
2. Upon loading the game (page load), retrieve the data from localStorage and populate the game state.
3. Ensure data is updated in localStorage whenever relevant changes occur (e.g., after a quest, after recruiting, after leveling up).

**Implementation Steps**:

1. `saveGame()`: Convert relevant game state into JSON and store it in localStorage.
2. `loadGame()`: Check if any saved game data exists; if yes, parse it and update variables accordingly.
3. Consider storing a timestamp to facilitate offline progress.

---

## 3. Idle Mechanics and Offline Progress

The design mentions auto-resolving quests over time and offline progress.

**Implementation Steps**:

1. Maintain a `lastUpdated` timestamp in localStorage.
2. On page load, compute the time elapsed since `lastUpdated` and auto-resolve quests or provide stored progress accordingly.
3. Regularly (e.g., every few seconds) trigger a function that processes partial quest completions or idle resource generation.
4. Provide an “idle achievements” or “upgrades” mechanism that speeds up or enhances these idle processes.

---

## 4. Richer Class Mechanics and Stat Growth

Currently, newly recruited adventurers have a uniform set of stats. The design calls for multiple classes with distinct growth patterns.

**Implementation Steps**:

1. Define a `classData` object that assigns base stats, stat growth, and possible unique abilities for each class (Fighter, Mage, Rogue, Healer, etc.).
2. During recruitment, use the class’s base stats instead of the uniform defaults.
3. On level-up, increase stats according to the chosen class’s growth table rather than a single incremental approach.
4. Optional: add unique class abilities or passives that affect quest success or specific events.

---

## 5. Randomized Loot and Items

Quest completion should yield random loot of varying rarities. Adventurers can equip items that affect their stats.

**Implementation Steps**:

1. Create a loot table with item types (weapons, armor, consumables) and associated rarities.
2. After a successful quest, randomly determine which loot item is found.
3. Save the item in an “inventory” array or object.
4. Allow equipping items (affect Adventurer’s stats) or using them.
5. Possibly incorporate a merchant interface to buy/sell items.

---

## 6. Dungeon Crawler Mechanics

Encounters, risk vs reward choices, and random event generation.

**Implementation Steps**:

1. Overhaul `sendOnQuest()` to handle multiple steps or encounters in a single quest.
2. Each encounter can randomly spawn an enemy or event that the party must handle.
3. Use a simple combat mechanic that accounts for each adventurer’s stats and random enemy stats.
4. Provide risk vs reward choices (e.g., “Fight extra enemies for bigger rewards or retreat now”).
5. Log events to the UI and decide success/failure based on more detailed calculations.

---

## 7. Loot Rarity Tiers

Implement common, uncommon, rare, and epic loot tiers.

**Implementation Steps**:

1. Assign each loot item a rarity.
2. Make the loot distribution chance-based, with rarer items having lower drop rates.
3. Visually or textually indicate rarity (e.g., color-coded text, labels, icons).

---

## 8. Additional Enhancements

• Provide a difficulty curve by scaling enemy strength, quest complexity, gold/XP rewards, etc.
• Add structured UI for upgrades (especially for idle mechanics and for better recruitment, questing, etc.).
• Introduce a timeline or “tick” that updates game state at intervals, for idle functionality.

---

## 9. Implementation Order

Suggested order to build incrementally and avoid disruption:
    1. Establish localStorage saving/loading.
    2. Implement idle mechanics (basic auto-resolve, partial offline progress).
    3. Overhaul class system for distinct stats and growth.
    4. Add random loot + item inventory.
    5. Introduce dungeon crawler steps (encounters, risk vs reward).
    6. Expand item rarity.
    7. Polish UI and add advanced upgrade systems.

---

## 10. Conclusion

By following these steps, we can extend the existing code to fulfill the design’s requirements. Begin by adding localStorage saving/loading to preserve progress, then incorporate the rest of the features incrementally, thoroughly testing each stage.
