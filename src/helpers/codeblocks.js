export const example = `const starWarsCharacters = [ "starwars", { starwars: [ { nameOne: "Luke", nameTwo: "Leia", nameThree: "Han" } ] }, 4, ["starwars"] ];`;
export const mapExample = `const kvpArray = [
    { key: 1, value: 10 },
    { key: 2, value: 20 },
    { key: 3, value: 30 },
  ];
  
const reformattedArray = kvpArray.map(({ key, value }) => ({ [key]: value }));

console.log(reformattedArray); // [{ 1: 10 }, { 2: 20 }, { 3: 30 }]`;
export const mapExample2 = `const wordArray = [
  { word: "Defence" },
  { word: "Color" },
  { word: "Offence" },
];

const reformattedArray = wordArray.map(item => {
  if (item.word === "Color") {
    item.word = "Colour";
  }
  return item;
});

console.log(reformattedArray); // [ { word: "Defence" }, { word: "Colour" }, { word: "Offence" } ];
`;
export const forEachExample = `const items = ["item1", "item2", "item3"];
const copyItems = [];

for (let i = 0; i < item.length; i++) {
  copyItems.push(items[i]);
}

items.forEach(item => {
  copyItems.push(item);
});`;

export const filterExample = `const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const oddNumbers = numbers.filter(num => {
  return num % 2 !== 0;
});

console.log(oddNumbers); // [1, 3, 5, 7, 9]
`;
export const findExample = `const numbers = [1, 2, 3, 4, 5];

const foundNumber = numbers.find(num => {
  return num > 3;
});

console.log(foundNumber); // 4
`;
export const findExample2 = `const numbers = [1, 2, 3, 4, 5];

const foundNumber = numbers.find(num => {
  return num > 10;
});

console.log(foundNumber); // undefined
`;

export const everyExample = `const names = ["luke", "Leia", "Han", "Anakin"];

const shortNames = names.every(name => {
  return name.length < 4;
});

console.log(shortNames); // false
`;

export const someExample = `const numbers = [2, 4, 6, 7, 8];

const hasOdd = numbers.some(function(num) {
  return num % 2;
});

console.log(hasOdd); // true`;

export const reduceExample = `const numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);

console.log(sum); // 15
`;

export const objects = `console.log(typeof({})); // object
console.log(typeof([])); // object
console.log(typeof(new Date())); // object
console.log(typeof(/\d+/)); // object
console.log(typeof(Math)); // object
`;

export const objectNotations = `let person = { 
  firstName: "Adam", 
  lastName: "Harvey", 
  age: 29 
};
person.firstName; // Adam (Dot notation)
person['firstName']; // Adam (Bracket notation)
`;

export const objectNotationsTwo = `let person = { 
  firstName: "Adam", 
  lastName: "Harvey", 
  age: 29 
};

// it's that simple!
person.age = 21;
person['age'] = 21;

person: { 
  firstName: "Adam", 
  lastName: "Harvey", 
  age: 21 
};
`;

export const createReactAppCommand = `npx create-react-app text-based-adventure`;

export const mapGeneration = `import { Rooms } from './rooms';
import { Items } from './items';
import { Enemies } from './enemies';

// used for generating the map and placing items randomly in rooms.
export const generateRooms = randomChance => {
  const rooms = [
    {
      id: 0,
      name: "Start",
      description: "This is the starting room",
      items: [],
      enemies: [],
      locked: false,
      explored: false
    }
  ];

  const listOfPotentialRooms = Rooms;
  const items = Items;
  const enemies = Enemies;

  // probably re-work the flags () at some point
  // for now let's map through and reset them
  listOfPotentialRooms.forEach(room => room.explored = false);
  items.forEach(item => item.taken = false);
  enemies.forEach(enemy => {
    enemy.killed = false
    enemy.stats.health = enemy.stats.maxHealth;
  });

  // let's loop through all of the rooms available
  for (let i = 0; i < listOfPotentialRooms.length; i++) {

    // we want to keep randomly selecting a room which hasn't been added yet
    let randomRoom = listOfPotentialRooms[Math.floor(Math.random() * listOfPotentialRooms.length)];

    // we don't want duplicate rooms added, so let's check to see if it's already been added
    if (!rooms.some(e => e.name === randomRoom.name)) {
      // randomRoom = Rooms[Math.floor(Math.random() * Rooms.length)];

      // make the room object we want to add
      const room = {
        id: i + 1,
        name: randomRoom.name,
        description: randomRoom.description,
        items: [],
        enemies: [],
        locked: randomRoom.locked,
        explored: false
      };

      // Add random items to the room.
      const randomItem = items[Math.floor(Math.random() * 21)];
      const itemSpawnChance = randomChance(0.5);

      // check to see if the item has already been added to the game
      // unless it's a consumable or usable
      for (let x = 0; x < items.length; x++) {
        const itemAlreadyExists = rooms.some(r => {
          return r[x]?.items.includes(randomItem);
        });
        if (!itemAlreadyExists) {
          if (itemSpawnChance) {
            if (!room.items.includes(randomItem)) {
              room.items.push(randomItem);
            }
          }
        }
      }

      // Add enemies to the room
      const randomEnemy = enemies[Math.floor(Math.random() * 7)];
      const enemiesSpawnChance = randomChance(0.2);
      for (let x = 0; x < enemies.length; x++) {
        if (enemiesSpawnChance) {
          if (!room.enemies.includes(randomEnemy)) {
            room.enemies.push(randomEnemy);
          }
        }
      }

      rooms.push(room);
    } else {
      // find a room that doesn't exist;
      let room;

      // loop through the whole array
      for (let x = 0; x < listOfPotentialRooms.length; x++) {
        // let's try and find a room that doesn't exist in the array
        if (!rooms.some(e => e.name === listOfPotentialRooms[x].name)) {
          // we've found it!
          room = listOfPotentialRooms[x];
          // let's add an id (make sure it's not already assigned by adding it to the end of the array)
          room.id = rooms[rooms.length - 1].id + 1;
          // select a random item
          const randomItem = items[Math.floor(Math.random() * 21)];
          // add random items to the room (implement a spawn chance).
          const itemSpawnChance = randomChance(0.5);
          for (let x = 0; x < items.length; x++) {
            const itemAlreadyExists = rooms.some(r => {
              return r[x]?.items.includes(randomItem);
            });
            if (!itemAlreadyExists) {
              if (itemSpawnChance) {
                // we don't want to place duplicate items into the room
                if (!room.items.includes(randomItem)) {
                  room.items.push(randomItem);
                }
              }
            }
          }
          // Add enemies to the room
          const randomEnemy = enemies[Math.floor(Math.random() * 7)];
          const enemiesSpawnChance = randomChance(0.2);
          for (let x = 0; x < enemies.length; x++) {
            if (enemiesSpawnChance) {
              if (!room.enemies.includes(randomEnemy)) {
                room.enemies.push(randomEnemy);
              }
            }
          }
          rooms.push(room);
        }
      }
    }
  }

  // add in the end room
  const end = {
    id: rooms[rooms.length - 1].id + 1,
    name: "End",
    description: "This is the end room",
    items: [],
    enemies: [],
    locked: false,
    explored: false
  }

  rooms.push(end);
  return rooms;
};`;

export const roomHelper = `export const Rooms = [
  {
    name: "Torture Chamber",
    description: "This room is filled with gruesome instruments of pain and suffering, including spiked chairs, iron.",
    items: [],
    enemies: [],
    locked: false,
    explored: false,
  },
  {
    name: "Guard Room",
    description: "This room is where the guards stationed in the dungeon rest and eat. There are cots and hammocks for sleeping, and tables and benches for eating.",
    items: [],
    enemies: [],
    locked: false,
    explored: false,
  },
  {
    name: "Holding Cells",
    description: "These small cells are used to hold prisoners awaiting trial or punishment. They are dark, cramped, and have a foul smell.",
    items: [],
    enemies: [],
    locked: false,
    explored: false
  },
  {
    name: "Execution Chamber",
    description: "This room is where prisoners are brought to be executed. There is a trapdoor in the floor, a noose hanging from the ceiling, and a chopping block.",
    items: [],
    enemies: [],
    locked: false,
    explored: false
  },
  {
    name: "Alchemy Lab",
    description: "This room is where the dungeon's alchemist conducts experiments and brews potions. There are cauldrons, alembics, and retorts scattered around the room.",
    items: [],
    enemies: [],
    locked: false,
    explored: false
  },
  {
    name: "Armory",
    description: "This room is where the dungeon's weapons and armor are stored. There are racks of swords, spears, and shields, as well as suits of armor and crossbows.",
    items: [],
    enemies: [],
    locked: false,
    explored: false
  },
  {
    name: "Treasure Vault",
    description: "This room is where the dungeon's most valuable treasures are kept. There are piles of gold and silver coins, precious jewels, and ornate chests.",
    items: [],
    enemies: [],
    locked: false,
    explored: false
  },
  {
    name: "Torture Garden",
    description: "This outdoor space is used for outdoor punishments, such as flogging, whipping, and other forms of physical torture. There are posts and stakes set up for this purpose.",
    items: [],
    enemies: [],
    locked: false,
    explored: false
  },
  {
    name: "Crypt",
    description: "This underground chamber is used for waste disposal. It is filled with rats, cockroaches, and other vermin.",
    items: [],
    enemies: [],
    locked: false,
    explored: false
  },
  {
    name: "Sewer",
    description: "This underground chamber is used for waste disposal. It is filled with rats, cockroaches, and other vermin.",
    items: [],
    enemies: [],
    locked: false,
    explored: false
  },
  {
    name: "Training Room",
    description: "This room is where the dungeon's guards train and practice their combat skills. There are dummies, targets, and other equipment for this purpose.",
    items: [],
    enemies: [],
    locked: false,
    explored: false
  },
  {
    name: "Interrogation Room",
    description: "This room is used to extract information from prisoners. There are tables, chairs, and instruments of torture.",
    items: [],
    enemies: [],
    locked: false,
    explored: false
  },
  {
    name: "Throne Room:",
    description: "This room is where the dungeon's ruler sits on their throne. There are banners, tapestries, and other decorations on the walls.",
    items: [],
    enemies: [],
    locked: true,
    explored: false
  },
  {
    name: "Library",
    description: "This room is where the dungeon's records and books are kept. There are shelves filled with books, scrolls, and maps.",
    items: [],
    enemies: [],
    locked: false,
    explored: false
  },
  {
    name: "Barracks",
    description: "This room is where the dungeon's guards sleep and eat. There are bunk beds, tables, and benches.",
    items: [],
    enemies: [],
    locked: false,
    explored: false
  },
  {
    name: "Courtroom",
    description: "This room is where trials are held. There is a judge's bench, a jury box, and seating for spectators.",
    items: [],
    enemies: [],
    locked: false,
    explored: false
  },
  {
    name: "Guard Tower",
    description: "This tall tower overlooks the surrounding area. Guards stationed here can watch for intruders or potential escapes.",
    items: [],
    enemies: [],
    locked: false,
    explored: false
  },
]`;

export const partitionsInAthena = `CREATE EXTERNAL TABLE sales (
  product_id STRING,
  amount DOUBLE
)
PARTITIONED BY (year STRING, month STRING)
STORED AS PARQUET
LOCATION 's3://my-bucket/sales/';
`;

export const columnarFormat = `CREATE TABLE sales_parquet
STORED AS PARQUET
AS SELECT * FROM sales;
`;

export const SSMLExample = `<speak>
Hello, <emphasis level="strong">world!</emphasis>
Welcome to <break time="1s"/> Amazon Polly.
</speak>
`;

export const cloudwatchlogsInsights = `fields @timestamp, @message
| filter @message like /error/
| sort @timestamp desc
| limit 20
`;

export const cloudwatchlogsAlarmStatus = `aws cloudwatch set-alarm-state 
--alarm-name "myalarm" 
--state-value ALARM 
--state-reason "testing purposes"
`;

export const bashEnvironment = `echo $SHELL`;
export const powershell = `$PSVersionTable`;
export const bashVersion = `bash --version`;
export const bashOutput = `ls > files.txt`;
export const bashAppend = `echo "Backup completed" >> logs.txt`;
export const bashFeed = `sort < names.txt`;
export const bashFeed2 = `while read user; do
  echo "Hello $user"
done < users.txt
`;
export const bashFeedAlt = `cat users.txt | while read user; do echo "Hello $user"; done`;
export const bashRedirectErr = `find ~ -name "config.json" > results.txt 2> errors.txt`;
export const bashRedirectErr2 = `find ~ -name "config.json" > all_output.txt 2>&1`;
export const bashMixingMatching = `sort < input.txt | uniq > cleaned.txt`;
export const bashFileDescriptors = `exec 3>log.txt
echo "Hello log" >&3
exec 3>&-
`;
export const bashPipe = `ls | grep "log"`;
export const bashFirstScript = `#!/bin/bash
# A simple hello world script

echo "Hello, world!"`;
export const bashFirstScript2 = `chmod +x hello.sh`;
export const bashFirstScript3 = `./hello.sh`;
export const bashFirstScript4 = `Hello, world!`;
export const pythonScript = `#!/usr/bin/python3`;

export const bashProjectSetup = `my_project/
├── src/
├── logs/
├── data/
└── README.md`;
export const bashProjectSetup2 = `#!/bin/bash

mkdir -p my_project/{src,logs,data}
touch my_project/README.md
echo "Project folder created successfully."`;
export const bashProjectSetup3 = `chmod +x setup_project.sh`;
export const bashProjectSetup4 = `./setup_project.sh`;
export const bashUserInput = `#!/bin/bash

name="Adam"
echo "Hello, $name!"

read -p "Enter your favourite language: " lang
echo "You love $lang!"
`;
export const bashCommandSubstitution = `today=$(date)
echo "Today is $today"`;
export const bashPassingArguments = `#!/bin/bash

echo "Script name: $0"
echo "First argument: $1"
echo "Second argument: $2"
echo "Total arguments: $#"
`;
export const bashPassingArguments2 = `./args.sh apple banana`;
export const bashPassingArguments3 = `Script name: ./args.sh
First argument: apple
Second argument: banana
Total arguments: 2
`;
export const bashSystemInfo = `#!/bin/bash

echo "System Report for: $(hostname)"
echo "User: $(whoami)"
echo "Memory usage:"
systeminfo | grep "Total Physical Memory"
echo "Disk usage:"
df -h`;
export const bashSystemInfo2 = `chmod +x sysinfo.sh
./sysinfo.sh`;
export const bashSystemInfo3 = `System Report for: dev-machine
User: adam
Memory usage:
Total Physical Memory: 16,298 MB
Disk usage: 
Filesystem            Size  Used Avail Use% Mounted on
D:/Program Files/Git  932G  251G  682G  27%    /
C:                    465G  334G  131G  72%    /c`;
export const bashIf = `if [ condition ]; then
  # commands to run if true
fi`;
export const bashIf2 = `#!/bin/bash

if [ -f "/etc/passwd" ]; then
  echo "The file exists!"
else
  echo "File not found."
fi`;
export const bashIfElse = `#!/bin/bash

read -p "Enter a number: " num

if [ $num -gt 10 ]; then
  echo "That's a big number!"
elif [ $num -gt 5 ]; then
  echo "That's a medium number."
else
  echo "That's a small number."
fi`;
export const bashCombiningConditions = `#!/bin/bash

file="notes.txt"

if [ -f "$file" ] && [ -r "$file" ]; then
  echo "$file exists and is readable."
else
  echo "File missing or unreadable."
fi`;
export const bashCaseStatement = `#!/bin/bash

read -p "Enter a letter (a, b, or c): " choice

case $choice in
  a) echo "You chose option A" ;;
  b) echo "You chose option B" ;;
  c) echo "You chose option C" ;;
  *) echo "Invalid choice" ;;
esac`;
export const bashForLoop = `#!/bin/bash

for file in *.txt; do
  echo "Found file: $file"
done`;
export const bashForLoop2 = `for i in {1..5}; do
  echo "Count: $i"
done`;
export const bashWhileLoop = `#!/bin/bash

count=1
while [ $count -le 5 ]; do
  echo "Loop #$count"
  ((count++))
done`;
export const bashWhileLoop2 = `#!/bin/bash

while read line; do
  echo "Line: $line"
done < input.txt`;
export const bashUntilLoop = `#!/bin/bash

n=1
until [ $n -gt 3 ]; do
  echo "Number $n"
  ((n++))
done`;
export const bashLoopExample = `#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")" && pwd)"

read -p "Enter directory to clean (default: script directory): " dir
dir=\${dir:-\$SCRIPT_DIR}

read -p "Delete files older than how many days? " days

if [ ! -d "\$dir" ]; then
  echo "Directory not found: \$dir"
  exit 1
fi

echo "Cleaning up \$dir..."
find "\$dir" -type f -mtime +\$days -exec rm -v {} \\;

echo "Cleanup complete."`;
export const bashFunctions = `greet() {
  local name="$1"
  echo "Hello, $name"
}

greet "Adam"`;
export const bashReturnDataOrState = `sum() {
  local a="$1" b="$2"
  # Return data
  echo $((a + b))
}

validate_positive() {
  local n="$1"
  [[ "$n" -gt 0 ]] || return 1
}

result="$(sum 5 7)"          # "12"
if validate_positive "$result"; then
  echo "Positive sum: $result"
else
  echo "Not positive"
fi`;
export const bashFailGracefully = `set -euo pipefail`;
export const bashExplicitlyFail = `some_command || echo "non-fatal: some_command failed"`;
export const bashTrap = `cleanup() {
  rm -f "$TMP_FILE"
}

trap cleanup EXIT INT TERM

TMP_FILE="$(mktemp)"
echo "Working in $TMP_FILE"
# ... do work ...`;
export const bashTinyLoggingHelper = `log() {
  local level="$1"; shift
  printf '%s [%s] %s\n' "$(date +'%Y-%m-%d %H:%M:%S')" "$level" "$*"
}

log INFO  "Starting job"
log WARN  "Disk usage high"
log ERROR "Backup failed"`;
export const bashTinyLoggingHelper2 = `LOG_FILE="\${LOG_FILE:-/tmp/script.log}"
logf() { log "$@" | tee -a "$LOG_FILE"; }  # prints & appends to file`;
export const bashReusableTemplate = `#!/usr/bin/env bash
set -euo pipefail

# Resolve script dir (works when called from anywhere)
SCRIPT_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")" && pwd)"

LOG_FILE="\${LOG_FILE:-$SCRIPT_DIR/script.log}"

log() {
  local level="$1"; shift
  printf '%s [%s] %s\n' "$(date +'%Y-%m-%d %H:%M:%S')" "$level" "$*"
}

logf() { log "$@" | tee -a "$LOG_FILE"; }

cleanup() {
  logf INFO "Cleanup complete."
}
trap cleanup EXIT INT TERM

require() {
  command -v "$1" >/dev/null 2>&1 || {
    logf ERROR "Missing dependency: $1"
    exit 127
  }
}

# Example dependency checks (comment out if not needed)
# require curl
# require awk

main() {
  logf INFO "Script dir: $SCRIPT_DIR"
  # your logic here
}

main "$@"`;
export const bashValidatingInputs = `usage() {
  echo "Usage: $0 <source_dir> <days>"
  echo "Example: $0 /var/log 7"
}

[[ $# -eq 2 ]] || { usage; exit 64; }  # 64 = EX_USAGE

SRC="$1"
DAYS="$2"

[[ -d "$SRC" ]] || { echo "Not a directory: $SRC"; exit 66; }  # 66 = NOINPUT-ish
[[ "$DAYS" =~ ^[0-9]+$ ]] || { echo "Days must be an integer"; exit 65; }`;
export const bashHandlingExpectedFailures = `if ! grep -q "pattern" file.txt 2>/dev/null; then
  echo "Pattern not found (that's okay)."
fi`;
export const bashHandlingExpectedFailures2 = `mkdir -p "$DIR" || true`;
export const bashSafeLogger = `#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")" && pwd)"
LOG_FILE="\${LOG_FILE:-$SCRIPT_DIR/archive.log}"

log() {
  local level="$1"; shift
  printf '%s [%s] %s\n' "$(date +'%Y-%m-%d %H:%M:%S')" "$level" "$*"
}
logf() { log "$@" | tee -a "$LOG_FILE"; }

cleanup() {
  logf INFO "Exiting."
}
trap cleanup EXIT INT TERM

usage() {
  echo "Usage: $0 [target_dir] [days]"
  echo "Default target_dir: script directory"
  echo "Example: $0 /var/log 7"
}

TARGET="\${1:-$SCRIPT_DIR}"
DAYS="\${2:-7}"

if [[ ! -d "$TARGET" ]]; then
  logf ERROR "Not a directory: $TARGET"
  usage; exit 64
fi

if ! [[ "$DAYS" =~ ^[0-9]+$ ]]; then
  logf ERROR "Days must be an integer, got '$DAYS'"
  usage; exit 65
fi

ARCHIVE_DIR="$SCRIPT_DIR/archives"
mkdir -p "$ARCHIVE_DIR"

STAMP="$(date +'%Y%m%d_%H%M%S')"
ARCHIVE_PATH="$ARCHIVE_DIR/logs_\${STAMP}.tar.gz"

logf INFO "Target: $TARGET"
logf INFO "Archiving files older than $DAYS days"
logf INFO "Output: $ARCHIVE_PATH"

# Find candidate files (text-ish logs), ignore the archive dir itself
mapfile -t files < <(find "$TARGET" -type f -mtime +"$DAYS" ! -path "$ARCHIVE_DIR/*" 2>/dev/null || true)

if (( \${#files[@]} == 0 )); then
  logf WARN "No files older than $DAYS days found. Nothing to do."
  exit 0
fi

# Create tar.gz
tar -czf "$ARCHIVE_PATH" -C "/" "\${files[@]/#\//}"  # preserve paths
logf INFO "Archived \${#files[@]} files."

# Optional: remove originals after successful archive
# for f in "\${files[@]}"; do rm -v "$f"; done

logf INFO "Done."`;
export const bashDebugMode = `bash -x script.sh`;
export const bashDebugMode2 = `set -x   # turn debugging on
# commands here
set +x   # turn debugging off`;
export const bashDebugMode3 = `export var='+ \${BASH_SOURCE}:\${LINENO}:\${FUNCNAME[0]}: '
set -x
`;
export const bashTrapDebug = `trap 'echo "Running: $BASH_COMMAND"' DEBUG`;
export const bashWildcards = `touch file1.txt file2.txt fileA.log fileB.log
echo *.log`;
export const bashWildcards2 = `echo "*.log"`;
export const bashWildcardsText = ` ls *.{jpg,png}`;
export const bashLoggingDebugOutput = `log DEBUG "Variable dir=$dir"`;
export const bashLoggingDebugOutput2 = `exec 5>debug.log
BASH_XTRACEFD=5
set -x
`;
export const bashNullGlob = `shopt -s nullglob`;
export const bashGrep = `grep "error" /var/log/syslog`;
export const bashGrep2 = `grep -i "failed" auth.log            # find failed logins
grep -rn "TODO" ~/projects           # search all files for TODOs
grep -v "DEBUG" app.log              # exclude debug lines
`;
export const bashSed = `sed 's/old/new/' file.txt`;
export const bashSed2 = `sed -i 's/foo/bar/g' config.txt`;
export const bashSed3 = `sed '/DEBUG/d' log.txt              # delete lines containing DEBUG
sed '/ERROR/i ---- NEW SECTION ----' log.txt  # insert before matches`;
export const bashAwk = `awk '{print $1, $3}' data.txt`;
export const bashAwk2 = `awk -F, '{print $1, $2}' users.csv`;
export const bashAwk3 = `awk '$3 > 80 {print $1, $3}' scores.txt`;
export const bashGrepSedAwk = `grep "$(date +%Y-%m-%d)" app.log | grep "ERROR" | wc -l`;
export const bashGrepSedAwk2 = `ps aux | grep nginx | awk '{print $2, $11}'`;
export const bashCleaningCSVData = `id,name,email,signup_date
1,Adam Harvey,adam@example.com,2025-05-12
2,Jane Doe,jane@example,2025-05-13
3,Tom, ,2025-05-14
`;
export const bashCleaningCSVData2 = `cat users.csv \
  | grep -E ".+@.+" \
  | sed 's/@example$/@example.com/' \
  | awk -F, 'NR>1 {print $2 " <" $3 ">"}'
`;
export const bashCleaningCSVDataText = `awk -F, 'NR>1 \{print $2 " <" $3 ">"}'`;
export const bashCleaningCSVData3 = `Adam Harvey <adam@example.com>
Jane Doe <jane@example.com>`;
export const bashPing = `ping google.com`;
export const bashPing2 = `ping -c 4 google.com`;
export const bashPing3 = `#!/usr/bin/env bash

HOST="google.com"

if ping -c 1 "$HOST" &>/dev/null; then
  echo "$HOST is reachable."
else
  echo "$HOST is down!"
fi
`;
export const bashCurl = `curl https://heyitsmeharv.com`;
export const bashCurl2 = `curl -O https://heyitsmeharv.com/index.html`;
export const bashCurl3 = `curl https://api.github.com/users/octocat`;
export const bashCurl4 = `curl -v https://api.github.com`;
export const bashCurl5 = `#!/usr/bin/env bash

URL="https://heyitsmeharv.com"
STATUS=$(curl -o /dev/null -s -w "%{http_code}" "$URL")

if [ "$STATUS" -eq 200 ]; then
  echo "$URL is up (HTTP $STATUS)"
else
  echo "$URL might be down (HTTP $STATUS)"
fi`;
export const bashCurl6 = `PRICE=$(curl -s https://api.coindesk.com/v1/bpi/currentprice.json | grep -o '"rate":"[0-9.,]*"' | head -1)
echo "Current Bitcoin price: \${PRICE#*:}"`;
export const bashCurl7 = `curl -s https://api.coindesk.com/v1/bpi/currentprice.json | jq '.bpi.USD.rate'`;
export const bashSCP = `scp backup.tar.gz user@server:/home/user/backups/`;
export const bashSCP2 = `rsync -avz ./site/ user@server:/var/www/html/`;
export const bashNC = `nc -zv heyitsmeharv.com 22`;
export const bashNC2 = `while true; do
  nc -z heyitsmeharv.com 80 && echo "Web server is up" || echo "Down"
  sleep 10
done
`;
export const bashDig = `dig heyitsmeharv.com +short`;
export const bashDig2 = `dig heyitsmeharv.com MX +short`;
export const bashDig3 = `if ! dig +short google.com >/dev/null; then
  echo "DNS resolution failed!"
  exit 1
fi
`;
export const bashMonitoring = `#!/usr/bin/env bash
set -euo pipefail

HOST="google.com"
LOG="network.log"

timestamp() { date +"%Y-%m-%d %H:%M:%S"; }

{
  echo "$(timestamp) Checking $HOST..."
  if ping -c 1 "$HOST" &>/dev/null; then
    echo "$(timestamp) Ping OK"
    STATUS=$(curl -o /dev/null -s -w "%{http_code}" "https://$HOST")
    echo "$(timestamp) HTTP Status: $STATUS"
  else
    echo "$(timestamp) Ping failed"
  fi
  echo
} >> "$LOG"
`;

// AWS Multi-Account Setup
export const awsMultiAccountSCPDenyGuardDuty = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyDisableGuardDuty",
      "Effect": "Deny",
      "Action": [
        "guardduty:DeleteDetector",
        "guardduty:DisassociateFromAdministratorAccount",
        "guardduty:StopMonitoringMembers",
        "guardduty:UpdateDetector"
      ],
      "Resource": "*"
    }
  ]
}`;

export const awsMultiAccountSCPDenyRegions = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyNonApprovedRegions",
      "Effect": "Deny",
      "NotAction": [
        "iam:*",
        "organizations:*",
        "account:*",
        "sts:*",
        "support:*",
        "health:*",
        "route53:*",
        "cloudfront:*"
      ],
      "Resource": "*",
      "Condition": {
        "StringNotEquals": {
          "aws:RequestedRegion": [
            "eu-west-1",
            "us-east-1"
          ]
        }
      }
    }
  ]
}`;

export const awsMultiAccountSCPDenyRoot = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyRootUser",
      "Effect": "Deny",
      "Action": "*",
      "Resource": "*",
      "Condition": {
        "StringLike": {
          "aws:PrincipalArn": [
            "arn:aws:iam::*:root"
          ]
        }
      }
    }
  ]
}`;

export const awsMultiAccountTerraformDeployRoleTrust = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::MANAGEMENT_ACCOUNT_ID:root"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "terraform-deploy"
        }
      }
    }
  ]
}`;

export const awsMultiAccountGitHubOIDCRole = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::MANAGEMENT_ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:your-org/your-repo:ref:refs/heads/main"
        }
      }
    }
  ]
}`;

export const awsMultiAccountTerraformProviderAssumeRole = `provider "aws" {
  region = "eu-west-1"

  assume_role {
    role_arn     = "arn:aws:iam::\${var.target_account_id}:role/TerraformDeployRole"
    session_name = "terraform-\${var.environment}"
  }
}`;

export const awsMultiAccountTagPolicy = `{
  "tags": {
    "env": {
      "tag_key": {
        "@@assign": "env"
      },
      "tag_value": {
        "@@assign": [
          "dev",
          "stage",
          "prod"
        ]
      },
      "enforced_for": {
        "@@assign": [
          "ec2:instance",
          "s3:bucket",
          "lambda:function",
          "rds:db"
        ]
      }
    }
  }
}`;

// ── AWS Patch Management ──────────────────────────────────────────────────────

export const awsPatchManagementCLIPackageManager = `# See which security patches are available on this instance
sudo dnf list --security

# List CVE IDs attached to each available security update
sudo dnf updateinfo list security

# Apply only security-relevant patches (no interactive prompt)
sudo dnf update --security -y

# Check which packages would be updated without applying anything
sudo dnf check-update --security`;

export const awsPatchManagementTerraformIAMRole = `# Every EC2 instance managed by SSM needs this instance profile.
# AmazonSSMManagedInstanceCore is the minimum — it grants:
#   - registration with SSM Fleet Manager
#   - agent self-updates from S3
#   - Run Command execution
#   - CloudWatch Logs output

resource "aws_iam_role" "ssm_instance" {
  name = "\${var.name}-\${var.environment}-ssm-instance"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "ssm_managed_instance_core" {
  role       = aws_iam_role.ssm_instance.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_instance_profile" "ssm_instance" {
  name = "\${var.name}-\${var.environment}-ssm-instance"
  role = aws_iam_role.ssm_instance.name
}`;

export const awsPatchManagementTerraformVPCEndpoints = `# Only needed for instances in private subnets WITHOUT a NAT gateway.
# Cost: ~£0.008/endpoint/AZ/hour × 3 endpoints × 2 AZs ≈ £35/month.
# If your instances already have outbound HTTPS via NAT, skip this block.

resource "aws_vpc_endpoint" "ssm" {
  vpc_id              = var.vpc_id
  service_name        = "com.amazonaws.\${data.aws_region.current.name}.ssm"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = var.private_subnet_ids
  security_group_ids  = [aws_security_group.vpc_endpoints.id]
  private_dns_enabled = true
}

resource "aws_vpc_endpoint" "ec2messages" {
  vpc_id              = var.vpc_id
  service_name        = "com.amazonaws.\${data.aws_region.current.name}.ec2messages"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = var.private_subnet_ids
  security_group_ids  = [aws_security_group.vpc_endpoints.id]
  private_dns_enabled = true
}

resource "aws_vpc_endpoint" "ssmmessages" {
  vpc_id              = var.vpc_id
  service_name        = "com.amazonaws.\${data.aws_region.current.name}.ssmmessages"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = var.private_subnet_ids
  security_group_ids  = [aws_security_group.vpc_endpoints.id]
  private_dns_enabled = true
}`;

export const awsPatchManagementTerraformBaseline = `locals {
  # prod waits 14 days; everything else waits 7.
  # Combined with staggered windows (dev Fri → stage Sat → prod Sun),
  # this gives an effective ~21-day soak from patch release to production.
  approve_days = var.approve_after_days != null ? var.approve_after_days : (
    var.environment == "prod" ? 14 : 7
  )
}

resource "aws_ssm_patch_baseline" "this" {
  name             = "\${var.name}-\${var.environment}"
  operating_system = "AMAZON_LINUX_2023"
  description      = "Patch baseline — \${local.approve_days}-day soak"

  approval_rule {
    approve_after_days  = local.approve_days
    compliance_level    = "CRITICAL"
    enable_non_security = false

    patch_filter {
      key    = "CLASSIFICATION"
      values = ["Security", "Bugfix"]
    }

    patch_filter {
      key    = "SEVERITY"
      values = ["Critical", "High", "Medium"]
    }
  }

  # Packages listed here will never be installed, even if they match an
  # approval rule. BLOCK prevents installation entirely (vs ALLOW_AS_DEPENDENCY).
  rejected_patches        = var.rejected_patches
  rejected_patches_action = "BLOCK"
}`;

export const awsPatchManagementTerraformPatchGroup = `# The patch group links a baseline to a set of instances via a tag.
# One patch group maps to exactly one baseline.

resource "aws_ssm_patch_group" "this" {
  baseline_id = aws_ssm_patch_baseline.this.id
  patch_group = "\${var.name}-\${var.environment}"
}

# ── In your EC2 Launch Template ───────────────────────────────────────────────
# Tag every instance at launch so SSM knows which baseline to use.
# For existing running instances: add the tag directly — SSM picks it up
# on the next scan cycle within an hour, no restart required.

resource "aws_launch_template" "app" {
  # ... other config ...

  tag_specifications {
    resource_type = "instance"
    tags = {
      PatchGroup = "\${var.name}-\${var.environment}"
    }
  }
}`;

export const awsPatchManagementTerraformMaintenanceWindow = `# All cron expressions are evaluated in UTC.
# Recommended stagger:
#   dev:   cron(0 22 ? * FRI *)   — Friday  22:00 UTC
#   stage: cron(0 1  ? * SAT *)   — Saturday 01:00 UTC
#   prod:  cron(0 2  ? * SUN *)   — Sunday  02:00 UTC

resource "aws_ssm_maintenance_window" "this" {
  name     = "\${var.name}-\${var.environment}"
  schedule = var.maintenance_window_schedule   # e.g. cron(0 2 ? * SUN *)
  duration = 4                                 # total window length in hours
  cutoff   = 1                                 # stop new tasks 1 hr before end
}

resource "aws_ssm_maintenance_window_target" "this" {
  window_id     = aws_ssm_maintenance_window.this.id
  resource_type = "INSTANCE"

  # Target by tag, not instance ID — durable across instance replacements
  targets {
    key    = "tag:PatchGroup"
    values = ["\${var.name}-\${var.environment}"]
  }
}

# Priority 1 — Install patches
resource "aws_ssm_maintenance_window_task" "patch" {
  window_id        = aws_ssm_maintenance_window.this.id
  task_type        = "RUN_COMMAND"
  task_arn         = "AWS-RunPatchBaseline"
  priority         = 1
  service_role_arn = aws_iam_role.maintenance_window.arn
  max_concurrency  = "50%"   # patch at most 50% of the fleet at a time
  max_errors       = "20%"   # abort if more than 20% of instances fail

  targets {
    key    = "WindowTargetIds"
    values = [aws_ssm_maintenance_window_target.this.id]
  }

  task_invocation_parameters {
    run_command_parameters {
      cloudwatch_config {
        cloudwatch_log_group_name = aws_cloudwatch_log_group.patch.name
        cloudwatch_output_enabled = true
      }

      # SNS notification on task timeout, cancellation, or failure
      dynamic "notification_config" {
        for_each = var.sns_email != "" ? [1] : []
        content {
          notification_arn    = aws_sns_topic.alerts.arn
          notification_events = ["TimedOut", "Cancelled", "Failed"]
          notification_type   = "Command"
        }
      }

      parameter {
        name   = "Operation"
        values = ["Install"]
      }

      # RebootIfNeeded is correct — NoReboot leaves InstalledPendingReboot
      # states where the old vulnerable binary is still running in memory
      parameter {
        name   = "RebootOption"
        values = ["RebootIfNeeded"]
      }
    }
  }
}`;

export const awsPatchManagementTerraformScanAssociation = `# Runs AWS-RunPatchBaseline in Scan mode every hour.
# Scan reads installed packages, compares against the baseline, and writes
# the result to the compliance dashboard — without installing anything.
# Without this association, the dashboard only updates when the weekly
# maintenance window fires.

resource "aws_ssm_association" "scan" {
  name             = "AWS-RunPatchBaseline"
  association_name = "\${var.name}-\${var.environment}-scan"

  schedule_expression = "rate(1 hour)"

  targets {
    key    = "tag:PatchGroup"
    values = ["\${var.name}-\${var.environment}"]
  }

  parameters = {
    Operation = "Scan"
  }

  output_location {
    s3_bucket_name = aws_s3_bucket.patch_logs.bucket
    s3_key_prefix  = "scans/"
  }
}`;

export const awsPatchManagementCLIComplianceStates = `# Per-patch states for a specific instance
aws ssm describe-instance-patch-states \\
  --instance-ids i-0abc1234567890def \\
  --query 'InstancePatchStates[].{Instance:InstanceId,Missing:MissingCount,Failed:FailedCount,PendingReboot:InstalledPendingRebootCount,Installed:InstalledCount}'

# All non-compliant instances across the patch group
aws ssm list-resource-compliance-summaries \\
  --filters "Key=ComplianceType,Values=Patch,Type=EQUAL" \\
            "Key=Status,Values=NON_COMPLIANT,Type=EQUAL" \\
  --query 'ResourceComplianceSummaryItems[].{Instance:ResourceId,Status:Status,PatchGroup:ExecutionSummary.ExecutionId}'

# Instances with patches pending reboot (false-compliance risk)
aws ssm list-resource-compliance-summaries \\
  --filters "Key=ComplianceType,Values=Patch,Type=EQUAL" \\
  --query 'ResourceComplianceSummaryItems[?ComplianceSummary.CompliantSummary.SeveritySummary != \`null\`]' \\
  | jq '[.[] | select(.ComplianceSummary.NonCompliantSummary.SeveritySummary.InformationalCount > 0)]'`;

export const awsPatchManagementTerraformInspector = `# Inspector v2 uses the SSM Agent's software inventory to read installed
# packages and cross-reference them against the NVD + threat intelligence feeds.
# No separate scanner needed — the SSM agent you've already set up is enough.

resource "aws_inspector2_enabler" "this" {
  account_ids    = [data.aws_caller_identity.current.account_id]
  resource_types = ["EC2", "ECR"]
}

# EventBridge routes Critical Inspector findings to SNS within minutes —
# no waiting for a weekly compliance report.
resource "aws_cloudwatch_event_rule" "inspector_critical" {
  name        = "\${var.name}-\${var.environment}-inspector-critical"
  description = "Alert immediately on Inspector Critical findings"

  event_pattern = jsonencode({
    source      = ["aws.inspector2"]
    detail-type = ["Inspector2 Finding"]
    detail = {
      severity = ["CRITICAL"]
    }
  })
}

resource "aws_cloudwatch_event_target" "inspector_critical" {
  rule      = aws_cloudwatch_event_rule.inspector_critical.name
  target_id = "patch-alerts-sns"
  arn       = aws_sns_topic.alerts.arn   # defined in alerting.tf
}`;

export const awsPatchManagementTerraformPrePatchTask = `# Priority 0 — runs before the patch install task.
# Snapshots all EBS volumes attached to each instance so you have a
# restore point if a patch causes an issue. Conditional on var.pre_patch_snapshot.
#
# The instance role (ssm_instance) carries ec2:CreateSnapshot permission.
# For stateless ASG fleets, set pre_patch_snapshot = false — rollback is a
# Launch Template version revert + instance refresh, not a snapshot restore.

resource "aws_ssm_maintenance_window_task" "snapshot" {
  count            = var.pre_patch_snapshot ? 1 : 0
  window_id        = aws_ssm_maintenance_window.this.id
  task_type        = "RUN_COMMAND"
  task_arn         = "AWS-RunShellScript"
  priority         = 0
  service_role_arn = aws_iam_role.maintenance_window.arn
  max_concurrency  = var.max_concurrency
  max_errors       = var.max_errors

  targets {
    key    = "WindowTargetIds"
    values = [aws_ssm_maintenance_window_target.this.id]
  }

  task_invocation_parameters {
    run_command_parameters {
      parameter {
        name = "commands"
        values = [
          "#!/bin/bash",
          "set -e",
          "INSTANCE_ID=$(curl -s http://169.254.169.254/latest/meta-data/instance-id)",
          "REGION=$(curl -s http://169.254.169.254/latest/meta-data/placement/region)",
          "VOLUMES=$(aws ec2 describe-instances --instance-id \\"$INSTANCE_ID\\" --region \\"$REGION\\" --query 'Reservations[0].Instances[0].BlockDeviceMappings[*].Ebs.VolumeId' --output text)",
          "for VOLUME_ID in $VOLUMES; do",
          "  SNAP_ID=$(aws ec2 create-snapshot --volume-id \\"$VOLUME_ID\\" --description \\"pre-patch-$INSTANCE_ID-$(date +%Y%m%d%H%M)\\" --region \\"$REGION\\" --query 'SnapshotId' --output text)",
          "  echo \\"Created snapshot $SNAP_ID for volume $VOLUME_ID\\"",
          "done",
        ]
      }
    }
  }
}`;

export const awsPatchManagementTerraformPostPatchTask = `# Priority 2 — runs after the patch install task.
# Curls the application health check endpoint and exits non-zero on failure.
# If enough instances fail (> max_errors), the maintenance window execution
# is marked Failed — a clear automated signal without manual inspection.

resource "aws_ssm_maintenance_window_task" "health_check" {
  count            = var.post_patch_health_check_url != "" ? 1 : 0
  window_id        = aws_ssm_maintenance_window.this.id
  task_type        = "RUN_COMMAND"
  task_arn         = "AWS-RunShellScript"
  priority         = 2
  service_role_arn = aws_iam_role.maintenance_window.arn
  max_concurrency  = var.max_concurrency
  max_errors       = var.max_errors

  targets {
    key    = "WindowTargetIds"
    values = [aws_ssm_maintenance_window_target.this.id]
  }

  task_invocation_parameters {
    run_command_parameters {
      parameter {
        name = "commands"
        values = [
          "#!/bin/bash",
          "set -e",
          "URL='\${var.post_patch_health_check_url}'",
          "HTTP_STATUS=$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 \\"$URL\\")",
          "if [ \\"$HTTP_STATUS\\" -ne 200 ]; then",
          "  echo \\"Health check FAILED: HTTP $HTTP_STATUS from $URL\\"",
          "  exit 1",
          "fi",
          "echo \\"Health check PASSED: HTTP $HTTP_STATUS\\"",
        ]
      }
    }
  }
}`;

export const awsPatchManagementCLIEmergencyPatch = `# A Critical CVE has dropped and you can't wait for Sunday's maintenance window.
# This fires AWS-RunPatchBaseline with Operation=Install immediately against
# every instance in the patch group.

# 1. Trigger — targets all instances tagged PatchGroup=my-app-prod
aws ssm send-command \\
  --document-name "AWS-RunPatchBaseline" \\
  --targets "Key=tag:PatchGroup,Values=my-app-prod" \\
  --parameters '{"Operation":["Install"],"RebootOption":["RebootIfNeeded"]}' \\
  --comment "Emergency patch CVE-2021-44228" \\
  --output-s3-bucket-name my-patch-logs \\
  --output-s3-key-prefix emergency/ \\
  --query 'Command.CommandId' \\
  --output text

# 2. Monitor — poll until all invocations complete
aws ssm list-command-invocations \\
  --command-id <command-id-from-above> \\
  --details \\
  --query 'CommandInvocations[].{Instance:InstanceId,Status:Status,Output:CommandPlugins[0].Output}'

# 3. Confirm — verify compliance state updated to Installed
aws ssm list-resource-compliance-summaries \\
  --filters "Key=ComplianceType,Values=Patch,Type=EQUAL" \\
            "Key=Status,Values=NON_COMPLIANT,Type=EQUAL" \\
  --query 'ResourceComplianceSummaryItems[].{Instance:ResourceId,Missing:ComplianceSummary.NonCompliantSummary.SeveritySummary}'`;

export const awsPatchManagementTerraformImageBuilder = `# Custom hardening component — removes unnecessary packages and captures
# the full RPM manifest for audit / CVE diffing
resource "aws_imagebuilder_component" "hardening" {
  name     = "\${var.name}-\${var.environment}-hardening"
  platform = "Linux"
  version  = "1.0.0"

  data = <<-YAML
    name: al2023-hardening
    schemaVersion: 1.0
    phases:
      - name: build
        steps:
          - name: RemoveUnnecessaryPackages
            action: ExecuteBash
            inputs:
              commands:
                - |
                  for pkg in telnet rsh ypbind tftp-server; do
                    rpm -q "$pkg" &>/dev/null && dnf remove -y "$pkg"
                  done
          - name: CaptureRpmManifest
            action: ExecuteBash
            inputs:
              commands:
                - rpm -qa --queryformat '%{NAME}|%{VERSION}|%{RELEASE}\\n' | sort > /tmp/rpm-manifest.txt
  YAML
}

# Recipe = base AMI + AWS-managed patch component + custom hardening
resource "aws_imagebuilder_image_recipe" "this" {
  name         = "\${var.name}-\${var.environment}"
  version      = "1.0.0"
  parent_image = var.image_builder_base_ami_id   # latest al2023-ami-*-x86_64

  component {
    # AWS-managed: runs dnf update && dnf upgrade
    component_arn = "arn:aws:imagebuilder:\${data.aws_region.current.name}:aws:component/update-linux/x.x.x/1"
  }

  component {
    component_arn = aws_imagebuilder_component.hardening.arn
  }
}

resource "aws_imagebuilder_infrastructure_configuration" "this" {
  name                  = "\${var.name}-\${var.environment}"
  instance_profile_name = aws_iam_instance_profile.image_builder.name
  instance_types        = ["t3.small", "t3.medium"]   # t3.micro can OOM during dnf
  subnet_id             = var.image_builder_subnet_id
  sns_topic_arn         = aws_sns_topic.alerts.arn     # notify on build failure
  terminate_instance_on_failure = true
}

resource "aws_imagebuilder_distribution_configuration" "this" {
  name = "\${var.name}-\${var.environment}"

  distribution {
    region = data.aws_region.current.name

    ami_distribution_configuration {
      name = "\${var.name}-\${var.environment}-{{ imagebuilder:buildDate }}"
      ami_tags = {
        Name      = "\${var.name}-\${var.environment}"
        BuiltBy   = "EC2ImageBuilder"
        BaselineId = aws_ssm_patch_baseline.this.id
      }
    }
  }
}

resource "aws_imagebuilder_image_pipeline" "this" {
  name                             = "\${var.name}-\${var.environment}"
  image_recipe_arn                 = aws_imagebuilder_image_recipe.this.arn
  infrastructure_configuration_arn = aws_imagebuilder_infrastructure_configuration.this.arn
  distribution_configuration_arn   = aws_imagebuilder_distribution_configuration.this.arn

  # Weekly Sunday 01:00 UTC — before the prod maintenance window (02:00 UTC)
  schedule {
    schedule_expression = "cron(0 1 ? * SUN *)"
  }

  # Inspector scans the newly-built AMI before distribution.
  # If Critical findings are found, the pipeline fails — preventing a
  # vulnerable AMI from reaching your ASG.
  image_scanning_configuration {
    image_scanning_enabled = true
  }
}`;

export const awsPatchManagementTerraformImageBuilderIAM = `# The build instance assumes this role during AMI construction.
# Three managed policies cover:
#   EC2InstanceProfileForImageBuilder    — Image Builder execution permissions
#   AmazonSSMManagedInstanceCore         — SSM Agent (required for build connectivity)
#   EC2ImageBuilderLifecycleExecutionPolicy — AMI deprecation and deletion

resource "aws_iam_role" "image_builder" {
  name = "\${var.name}-\${var.environment}-image-builder"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "image_builder_profile" {
  role       = aws_iam_role.image_builder.name
  policy_arn = "arn:aws:iam::aws:policy/EC2InstanceProfileForImageBuilder"
}

resource "aws_iam_role_policy_attachment" "image_builder_ssm" {
  role       = aws_iam_role.image_builder.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_role_policy_attachment" "image_builder_lifecycle" {
  role       = aws_iam_role.image_builder.name
  policy_arn = "arn:aws:iam::aws:policy/EC2ImageBuilderLifecycleExecutionPolicy"
}

resource "aws_iam_instance_profile" "image_builder" {
  name = "\${var.name}-\${var.environment}-image-builder"
  role = aws_iam_role.image_builder.name
}`;

export const awsPatchManagementPackerTemplate = `# packer/amazon-linux-2023.pkr.hcl
packer {
  required_plugins {
    amazon = {
      version = ">= 1.3.0"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

# Always start from the latest AWS AL2023 AMI so the base is never stale
data "amazon-ami" "al2023" {
  region      = "eu-west-2"
  most_recent = true
  owners      = ["amazon"]
  filters = {
    name             = "al2023-ami-*-x86_64"
    root-device-type = "ebs"
  }
}

source "amazon-ebs" "al2023" {
  region        = "eu-west-2"
  instance_type = "t3.small"
  source_ami    = data.amazon-ami.al2023.id

  # Connect via SSM Session Manager — no inbound port 22 required
  ssh_interface        = "session_manager"
  communicator         = "ssh"
  ssh_username         = "ec2-user"
  iam_instance_profile = "packer-build"

  ami_name = "patch-management-prod-\${formatdate("YYYYMMDDhhmmss", timestamp())}"
}

build {
  sources = ["source.amazon-ebs.al2023"]

  provisioner "shell" {
    inline = [
      "sudo dnf update -y --security",
      "sudo dnf clean all",
    ]
  }

  provisioner "shell" {
    inline = [
      "for pkg in telnet rsh ypbind tftp-server; do",
      "  rpm -q \\"$pkg\\" &>/dev/null && sudo dnf remove -y \\"$pkg\\"",
      "done",
      "rpm -qa --queryformat '%{NAME}|%{VERSION}|%{RELEASE}\\\\n' | sort > /tmp/rpm-manifest.txt",
    ]
  }

  post-processor "manifest" {
    output = "manifest.json"
  }
}

# ── GitHub Actions workflow (trimmed) ────────────────────────────────────────
# - name: Build AMI
#   run: packer build -var="subnet_id=\${{ vars.BUILD_SUBNET_ID }}" packer/amazon-linux-2023.pkr.hcl
#
# - name: Update Launch Template
#   run: |
#     AMI_ID=$(jq -r '.builds[-1].artifact_id' manifest.json | cut -d: -f2)
#     aws ec2 create-launch-template-version \\
#       --launch-template-id \${{ vars.LAUNCH_TEMPLATE_ID }} \\
#       --source-version '$Latest' \\
#       --launch-template-data "{\\"ImageId\\":\\"$AMI_ID\\"}"
#
# - name: Start Instance Refresh
#   run: |
#     aws autoscaling start-instance-refresh \\
#       --auto-scaling-group-name \${{ vars.ASG_NAME }} \\
#       --preferences '{"MinHealthyPercentage":90,"InstanceWarmup":300}'`;

export const awsPatchManagementCLIInstanceRefresh = `# After updating the Launch Template to point at the new AMI, trigger a
# rolling instance refresh. Old instances are replaced in batches so the
# ASG never drops below MinHealthyPercentage of capacity.
#
# MinHealthyPercentage: 90 → at most 10% of the fleet replaced at any time
# InstanceWarmup: 300      → each new instance gets 300s to pass health checks
#                            before the next batch is replaced

aws autoscaling start-instance-refresh \\
  --auto-scaling-group-name my-app-prod-asg \\
  --preferences '{
    "MinHealthyPercentage": 90,
    "InstanceWarmup": 300
  }'

# Monitor the refresh — check until Status is Successful (or Failed/Cancelled)
aws autoscaling describe-instance-refreshes \\
  --auto-scaling-group-name my-app-prod-asg \\
  --query 'InstanceRefreshes[0].{Status:Status,Progress:PercentageComplete,Reason:StatusReason}'

# If a new instance fails its health check, the refresh pauses automatically.
# Investigate, then resume or cancel:
aws autoscaling resume-processes \\
  --auto-scaling-group-name my-app-prod-asg \\
  --scaling-processes Launch`;

export const awsPatchManagementTerraformAlerting = `# Single shared SNS topic for all patch management alerts.
# Inspector Critical findings (inspector.tf) also route to this topic.

resource "aws_sns_topic" "alerts" {
  name = "\${var.name}-\${var.environment}-patch-alerts"
}

resource "aws_sns_topic_subscription" "email" {
  count     = var.sns_email != "" ? 1 : 0
  topic_arn = aws_sns_topic.alerts.arn
  protocol  = "email"
  endpoint  = var.sns_email
}

# Allow EventBridge to publish to the topic
resource "aws_sns_topic_policy" "alerts" {
  arn = aws_sns_topic.alerts.arn

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "events.amazonaws.com" }
      Action    = "sns:Publish"
      Resource  = aws_sns_topic.alerts.arn
    }]
  })
}

# EventBridge — Maintenance Window Execution Failures
resource "aws_cloudwatch_event_rule" "maintenance_window_failed" {
  name = "\${var.name}-\${var.environment}-window-failed"

  event_pattern = jsonencode({
    source      = ["aws.ssm"]
    detail-type = ["SSM Maintenance Window Execution State Change"]
    detail      = { status = ["FAILED", "TIMED_OUT"] }
  })
}

resource "aws_cloudwatch_event_target" "maintenance_window_failed" {
  rule = aws_cloudwatch_event_rule.maintenance_window_failed.name
  arn  = aws_sns_topic.alerts.arn
}

# EventBridge — Image Builder Pipeline Failures
resource "aws_cloudwatch_event_rule" "image_builder_failed" {
  count = var.enable_image_builder ? 1 : 0
  name  = "\${var.name}-\${var.environment}-image-builder-failed"

  event_pattern = jsonencode({
    source      = ["aws.imagebuilder"]
    detail-type = ["EC2 Image Builder Pipeline Execution State Change"]
    detail      = { state = { status = ["FAILED"] } }
  })
}

resource "aws_cloudwatch_event_target" "image_builder_failed" {
  count = var.enable_image_builder ? 1 : 0
  rule  = aws_cloudwatch_event_rule.image_builder_failed[0].name
  arn   = aws_sns_topic.alerts.arn
}`;

export const awsPatchManagementCLIComplianceReport = `# Audit report: all non-compliant instances with patch counts and last scan time
aws ssm list-resource-compliance-summaries \\
  --filters "Key=ComplianceType,Values=Patch,Type=EQUAL" \\
            "Key=Status,Values=NON_COMPLIANT,Type=EQUAL" \\
  | jq -r '
    ["InstanceId", "PatchGroup", "MissingCount", "FailedCount", "LastScan"],
    (
      .ResourceComplianceSummaryItems[] |
      [
        .ResourceId,
        .ExecutionSummary.ExecutionId // "unknown",
        (.ComplianceSummary.NonCompliantSummary.SeveritySummary.CriticalCount // 0 |
          tostring) + " critical",
        (.ComplianceSummary.NonCompliantSummary.SeveritySummary.HighCount // 0 |
          tostring) + " high",
        .ExecutionSummary.ExecutionTime // "unknown"
      ]
    ) | @csv
  '

# Instances with patches stuck in InstalledPendingReboot (false-compliance risk)
# These instances were patched with NoReboot — the old vulnerable code is still
# running in memory until the instance is rebooted.
aws ssm describe-instance-patch-states-for-patch-group \\
  --patch-group "my-app-prod" \\
  --query 'InstancePatchStates[?InstalledPendingRebootCount > \`0\`].{Instance:InstanceId,PendingReboot:InstalledPendingRebootCount}'`;

export const awsPatchManagementTerraformDataSync = `# Syncs SSM compliance data to a central S3 bucket in the management account.
# Enables cross-account Athena queries over patch compliance data from all accounts.
# This is a management-account resource — not part of the per-account module.

resource "aws_ssm_resource_data_sync" "to_central" {
  name = "patch-compliance-sync"

  s3_destination {
    bucket_name = "my-org-patch-compliance-\${data.aws_caller_identity.current.account_id}"
    region      = "eu-west-2"
    prefix      = "compliance/"
  }
}

# S3 bucket policy in the management account — allows SSM from all org member accounts
resource "aws_s3_bucket_policy" "patch_compliance" {
  bucket = aws_s3_bucket.patch_compliance.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid    = "AllowSSMDataSync"
      Effect = "Allow"
      Principal = {
        Service = "ssm.amazonaws.com"
      }
      Action = [
        "s3:GetBucketAcl",
        "s3:PutObject",
      ]
      Resource = [
        aws_s3_bucket.patch_compliance.arn,
        "\${aws_s3_bucket.patch_compliance.arn}/*",
      ]
      Condition = {
        StringEquals = {
          "aws:PrincipalOrgID" = data.aws_organizations_organization.current.id
        }
      }
    }]
  })
}`;

export const awsPatchManagementTerraformModuleBasic = `module "patch_management" {
  source = "../../modules/patch-management"

  name        = "my-app"
  environment = "dev"

  # Friday 22:00 UTC for dev; Saturday 01:00 for stage; Sunday 02:00 for prod
  maintenance_window_schedule = "cron(0 22 ? * FRI *)"
}`;

export const awsPatchManagementTerraformModuleComplete = `module "patch_management" {
  source = "../../modules/patch-management"

  name        = "my-app"
  environment = "prod"

  # Sunday 02:00 UTC — lowest-traffic window with rest of Sunday to monitor
  maintenance_window_schedule = "cron(0 2 ? * SUN *)"
  maintenance_window_duration = 4
  maintenance_window_cutoff   = 1

  # RebootIfNeeded avoids InstalledPendingReboot false-compliance states
  reboot_option   = "RebootIfNeeded"
  max_concurrency = "50%"
  max_errors      = "20%"

  # Soak period: null = default (7 days dev / 14 days prod based on environment)
  approve_after_days = null

  # EBS snapshot before patching — rollback path for stateful workloads
  pre_patch_snapshot = true

  # Post-patch health check — asserts HTTP 200 on each patched instance
  post_patch_health_check_url = "http://localhost/health"

  # Inspector v2 for continuous CVE detection between maintenance windows
  enable_inspector = true

  # EC2 Image Builder for weekly Golden AMI builds (Sunday 01:00 UTC)
  enable_image_builder      = true
  image_builder_base_ami_id = "ami-0example"   # latest al2023-ami-*-x86_64
  image_builder_subnet_id   = "subnet-0example"

  # All alerts (maintenance window failures, Inspector Critical, Image Builder
  # failures) route to this email via SNS
  sns_email = "ops@example.com"
}`;

export const awsDeployEc2UserDataScript = `#!/bin/bash
set -euo pipefail

dnf install -y nginx

TOKEN=$(curl -sX PUT "http://169.254.169.254/latest/api/token" \\
  -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
meta() {
  curl -s -H "X-aws-ec2-metadata-token: $TOKEN" \\
    "http://169.254.169.254/latest/meta-data/$1"
}

INSTANCE_ID=$(meta instance-id)
AMI_ID=$(meta ami-id)
INSTANCE_TYPE=$(meta instance-type)
AZ=$(meta placement/availability-zone)
LOCAL_IP=$(meta local-ipv4)

cat > /usr/share/nginx/html/index.html <<HTML
<!DOCTYPE html>
<html>
<head><title>deploy-to-ec2</title></head>
<body>
  <h1>Hello from EC2</h1>
  <ul>
    <li>Instance ID: \${INSTANCE_ID}</li>
    <li>AMI ID: \${AMI_ID}</li>
    <li>Instance type: \${INSTANCE_TYPE}</li>
    <li>Availability zone: \${AZ}</li>
    <li>Private IP: \${LOCAL_IP}</li>
  </ul>
</body>
</html>
HTML

systemctl enable --now nginx`;

export const awsDeployEc2UserDataScriptRoot = `# /usr/share/nginx/html is nginx's default document root, and index.html
# is its default index file - together, that's what makes this page the
# one nginx serves at the site's root path, "/".
cat > /usr/share/nginx/html/index.html`;

/* ── AWS VPN + Bastion (terraform-aws-secure-remote-access) ─────────────── */

export const awsVpnBastionTerraformNetwork = `# Public vs private is not a label, it is a routing fact.
# A public subnet's route table has a path to the internet gateway.
# A private subnet's sends 0.0.0.0/0 to the NAT gateway instead - which is
# one-way. Instances reach out; nothing reaches in.

resource "aws_subnet" "public" {
  count             = length(var.public_subnet_cidrs)
  vpc_id            = aws_vpc.this.id
  cidr_block        = var.public_subnet_cidrs[count.index]
  availability_zone = local.azs[count.index]

  map_public_ip_on_launch = true
}

resource "aws_subnet" "private" {
  count             = length(var.private_subnet_cidrs)
  vpc_id            = aws_vpc.this.id
  cidr_block        = var.private_subnet_cidrs[count.index]
  availability_zone = local.azs[count.index]

  # No public IPs here, ever. This is the whole point.
  map_public_ip_on_launch = false
}

resource "aws_route" "public_internet" {
  route_table_id         = aws_route_table.public.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.this.id
}

# The one-way door. There is deliberately no inbound counterpart.
resource "aws_route" "private_nat" {
  route_table_id         = aws_route_table.private.id
  destination_cidr_block = "0.0.0.0/0"
  nat_gateway_id         = aws_nat_gateway.this.id
}`;

export const awsVpnBastionTerraformFlowLogs = `# Easy to miss: aws_flow_log has no usable default for iam_role_arn.
# Without this role the apply fails, and nothing else in the VPC needs one.

data "aws_iam_policy_document" "flow_logs_assume" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["vpc-flow-logs.amazonaws.com"]
    }
  }
}

resource "aws_flow_log" "this" {
  vpc_id               = aws_vpc.this.id
  traffic_type         = "ALL"
  log_destination_type = "cloud-watch-logs"
  log_destination      = aws_cloudwatch_log_group.flow_logs.arn
  iam_role_arn         = aws_iam_role.flow_logs.arn
}`;

export const awsVpnBastionTerraformOpenvpnSG = `# Open to the world, deliberately. A roaming VPN client has no predictable
# source address. The security boundary for this port is TLS plus a per-client
# certificate - not the source IP.
resource "aws_vpc_security_group_ingress_rule" "openvpn" {
  security_group_id = aws_security_group.this.id
  description       = "OpenVPN from anywhere - guarded by certificates, not source IP"

  cidr_ipv4   = "0.0.0.0/0"
  ip_protocol = "udp"
  from_port   = var.openvpn_port
  to_port     = var.openvpn_port
}

# Break-glass. Required, no default - there is no safe default here.
resource "aws_vpc_security_group_ingress_rule" "ssh_breakglass" {
  security_group_id = aws_security_group.this.id
  description       = "Break-glass SSH from the operator's own address"

  cidr_ipv4   = var.allowed_admin_cidr   # your own IP, as a /32
  ip_protocol = "tcp"
  from_port   = 22
  to_port     = 22
}

# Declaring ANY rule replaces the default allow-all egress AWS attaches to a
# new security group. Omit this and package installs, AWS API calls and NAT'd
# return traffic all fail - as a hung boot, not as anything firewall-shaped.
resource "aws_vpc_security_group_egress_rule" "all" {
  security_group_id = aws_security_group.this.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1"
}`;

export const awsVpnBastionTerraformEipOrdering = `# The Elastic IP is allocated standalone, with NO instance argument, so its
# address is known before the instance exists and can be passed into user_data.
# It is attached afterwards with a separate association.
#
# Get this wrong and the installer auto-detects the temporary auto-assigned
# public IP that exists at first boot, bakes it into server.conf and every
# client profile, and then that address disappears when the EIP attaches.
# Every client fails with a plain timeout pointing nowhere near the cause.

resource "aws_eip" "this" {
  domain = "vpc"
}

resource "aws_instance" "this" {
  # ...
  user_data = templatefile("\${path.module}/templates/user_data.sh.tftpl", {
    endpoint = aws_eip.this.public_ip   # <- known before the instance is made
    # ...
  })
}

resource "aws_eip_association" "this" {
  instance_id   = aws_instance.this.id
  allocation_id = aws_eip.this.id
}`;

export const awsVpnBastionUserDataInstall = `# angristan/openvpn-install, pinned to a commit rather than a branch: this
# script builds the entire server and its certificate authority.
#
# Note the interface. Older guides use AUTO_INSTALL=y and a wall of environment
# variables; the project has since moved to a subcommand CLI and those no
# longer work.

curl -fsSL "https://raw.githubusercontent.com/angristan/openvpn-install/\${openvpn_install_script_ref}/openvpn-install.sh" \\
  -o /root/openvpn-install.sh
chmod +x /root/openvpn-install.sh

/root/openvpn-install.sh install \\
  --endpoint "\${endpoint}" \\
  --port "\${openvpn_port}" \\
  --protocol udp \\
  --no-client-ipv6 \\
  --no-client-to-client \\
  \${local_network_flags} \\
  --client "\${bootstrap_client_name}"`;

export const awsVpnBastionLocalNetworkFlags = `# The installer exposes NO server-side network by default. Without these flags
# a connected client reaches the internet through the tunnel and not one single
# thing in your private subnets - with nothing obviously broken to point at.
#
# Each --local-network grants access to one network behind the server AND sets
# up destination-scoped NAT for it. It replaces hand-editing "push route" lines.

locals {
  local_network_flags = join(" ", [
    for cidr in var.private_subnet_cidrs : "--local-network \${cidr}"
  ])
}

# Produces:
#   --local-network 10.20.10.0/24 --local-network 10.20.11.0/24`;

export const awsVpnBastionSourceDestCheck = `resource "aws_instance" "this" {
  # Left ENABLED on purpose.
  #
  # The usual advice for a VPN or NAT box is to disable this. That is only
  # necessary when packets arrive addressed to somewhere else - which happens
  # when a route table points at the instance.
  #
  # Nothing routes at this ENI. Inbound is the tunnel, addressed to this box.
  # Outbound is masqueraded to this box's own address before it leaves. Both
  # ends of the check are satisfied, so it stays on.
  source_dest_check = true
}`;

export const awsVpnBastionTerraformCrossModuleRules = `# These live in the ROOT module, not inside either child module, and that is a
# hard constraint rather than a style preference.
#
# The bastion accepts SSH from the OpenVPN security group; the OpenVPN box
# accepts SSH from the bastion's. If each module took the other's ID as an
# input, the module graph would contain a cycle - and Terraform's graph must be
# acyclic. So each module creates only its own security group and exports the
# ID, and every rule spanning two of them is declared here.

# Traffic from a VPN client arrives having been masqueraded by the OpenVPN
# server, so it appears to come from that instance's own private address -
# which is why this can reference a security group, not a client IP pool.
resource "aws_vpc_security_group_ingress_rule" "bastion_ssh_from_openvpn" {
  security_group_id            = module.bastion.security_group_id
  referenced_security_group_id = module.openvpn.security_group_id
  ip_protocol                  = "tcp"
  from_port                    = 22
  to_port                      = 22
}

# Path 1 to the dashboard: straight over the VPN.
resource "aws_vpc_security_group_ingress_rule" "app_from_openvpn" {
  security_group_id            = module.app.security_group_id
  referenced_security_group_id = module.openvpn.security_group_id
  ip_protocol                  = "tcp"
  from_port                    = module.app.app_port
  to_port                      = module.app.app_port
}

# Path 2 to the SAME dashboard: an SSH port-forward, where the bastion opens
# the connection on your behalf. Same destination, different mechanism.
resource "aws_vpc_security_group_ingress_rule" "app_from_bastion" {
  security_group_id            = module.app.security_group_id
  referenced_security_group_id = module.bastion.security_group_id
  ip_protocol                  = "tcp"
  from_port                    = module.app.app_port
  to_port                      = module.app.app_port
}

# Deliberately absent: any rule letting the app reach the bastion. The
# dashboard's "blocked path" check depends on that genuinely failing.`;

export const awsVpnBastionTerraformKeyPair = `# One key pair for the whole stack, created at the root so there is exactly one.
#
# Only the PUBLIC half ever reaches AWS. Cloud-init writes it into
# ~/.ssh/authorized_keys on each instance at boot. The private half stays in
# Pageant on your machine and is never transmitted - not even during login.

resource "aws_key_pair" "admin" {
  key_name   = "\${var.project}-\${var.environment}-admin"
  public_key = var.admin_ssh_public_key
}

# Passed to all three instances:
#   key_name = aws_key_pair.admin.key_name`;

export const awsVpnBastionIMDSv2 = `// IMDSv2 is enforced on these instances, so a bare GET to the metadata
// endpoint returns 401. You must PUT for a token first, then present it on
// every subsequent request.
//
// Nearly every metadata snippet online is the older one-line GET, and it
// simply fails here.

const token = await fetch('http://169.254.169.254/latest/api/token', {
  method: 'PUT',
  headers: { 'X-aws-ec2-metadata-token-ttl-seconds': '300' },
}).then((r) => r.text());

const instanceId = await fetch(
  'http://169.254.169.254/latest/meta-data/instance-id',
  { headers: { 'X-aws-ec2-metadata-token': token } },
).then((r) => r.text());`;

export const awsVpnBastionBlockedCheck = `// This connection is SUPPOSED to fail.
//
// No security group rule permits this instance to reach the bastion, so the
// packet is dropped and we time out. Success here would mean the perimeter has
// a hole in it. The panel is green because it failed.

function blockedCheck() {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(4000);
    socket.on('connect', () =>
      resolve({ blocked: false, detail: 'CONNECTED - unexpected, a rule allows this' }),
    );
    socket.on('timeout', () =>
      resolve({ blocked: true, detail: 'timed out - no security group rule permits it' }),
    );
    socket.on('error', (e) => resolve({ blocked: true, detail: e.code }));
    socket.connect(BLOCKED_PORT, BLOCKED_HOST);
  });
}`;

export const awsVpnBastionCLIDeploy = `export ENVIRONMENT=sandbox
source infra/scripts/use-env.sh "$ENVIRONMENT"

# Confirm which account you are pointed at before creating anything
bash infra/scripts/whoami.sh

# One-time: state bucket, lock table, backend.hcl
npm run tf:bootstrap -- "$ENVIRONMENT" --region eu-west-2

npm run tf:validate -- "$ENVIRONMENT"
npm run tf:plan     -- "$ENVIRONMENT"

# Read the plan. In particular check the break-glass rule shows the /32 you
# expect and not something wider.
npm run tf:apply    -- "$ENVIRONMENT"`;

export const awsVpnBastionCLIBootstrap = `# Break-glass SSH, using the address you allowed and the key in Pageant.
ssh ubuntu@$(terraform output -raw openvpn_public_ip)

# The installer generated a client profile at first boot.
sudo cat /root/bootstrap.ovpn

# Copy that into a local file, import it into the OpenVPN GUI, connect - and
# the private tier becomes reachable for the first time.`;

export const awsVpnBastionServerConf = `# /etc/openvpn/server/server.conf - the directives that matter

port 1194
proto udp
dev tun

# Per-client config, used for static IPs or per-client route scoping.
client-config-dir ccd

# Live status, read by openvpn-monitor. A unix socket, not a TCP port, so
# nothing outside the box can reach it.
management /var/run/openvpn-server/server.sock unix

# Deliberately NOT enabled: duplicate-cn.
# It permits several devices to share one certificate, which would quietly
# break the one-cert-plus-one-TOTP-secret-per-person model this design rests
# on - and make revoking a single person impossible.
# duplicate-cn

# Added by --local-network. Without these a connected client reaches the
# internet through the tunnel and nothing in the VPC.
push "route 10.20.10.0 255.255.255.0"
push "route 10.20.11.0 255.255.255.0"`;

export const awsVpnBastionPAMStack = `# /etc/openvpn/server/server.conf - add the PAM plugin
plugin /usr/lib/openvpn/openvpn-plugin-auth-pam.so openvpn
verify-client-cert require
reneg-sec 0

# /etc/pam.d/openvpn
# Deliberately ONLY the TOTP module - no pam_unix.so. The "password" field is
# purely the six-digit code, not a Unix password nobody has set.
auth    required   pam_google_authenticator.so
account required   pam_permit.so`;

export const awsVpnBastionClientTrio = `# The client half. All three lines matter:

auth-user-pass    # prompt for username + OTP at connect time
reneg-sec 0       # see below
auth-nocache      # do not reuse a now-expired code on reconnect

# reneg-sec must be set on BOTH peers. OpenVPN's manual is explicit:
#
#   "When using dual-factor authentication, note that this default value may
#    cause the end user to be challenged to reauthorize once per hour."
#
# Setting 0 on the server alone means that side defers and the client's 3600s
# default still governs - so you get re-prompted for an OTP mid-session, which
# presents as a random disconnect.`;

export const awsVpnBastionCLIAddUser = `# Three steps, not one. Missing the middle one is the usual reason 2FA
# "does not work" - PAM resolves the connecting username against a local Unix
# account to find that user's secret file.

# 1. the certificate (password-protected, so the key is encrypted at rest)
/root/openvpn-install.sh client add alice --password

# 2. an account for PAM to resolve. No shell, no password - it exists purely
#    so ~alice/.google_authenticator has somewhere to live.
useradd -m -s /usr/sbin/nologin alice

# 3. that user's TOTP secret and QR code
sudo -u alice google-authenticator -t -d -f -r 3 -R 30 -W

# Revoking is the mirror image, and per-client certificates are what make it
# possible at all - the real argument against one shared credential.
/root/openvpn-install.sh client revoke alice
userdel -r alice`;

export const awsVpnBastionPuttyTunnel = `PuTTY - reaching the private dashboard through the bastion

Session
  Host Name          <bastion_private_ip>       (from terraform output)
  Port               22

Connection > SSH > Auth
  Allow agent forwarding             [x]
  Private key file for authentication  (leave BLANK - Pageant supplies it)

Connection > SSH > Tunnels
  Source port        8081
  Destination        <app_private_ip>:3000
  [Local] [Auto]     -> Add

Then browse http://localhost:8081

The bastion opens the connection to the app on your behalf, so the traffic
arrives from the bastion's security group - which is why a second rule exists
alongside the VPN one. Same page, different mechanism.`;

export const awsVpnBastionSecondHop = `# Administering the OpenVPN box, from the bastion, with the key never touching
# the bastion's disk.
#
# Pageant holds the key on Windows. With agent forwarding enabled on the PuTTY
# session, the OpenSSH client already on the bastion can use it.

[ec2-user@bastion ~]$ ssh ubuntu@<openvpn_private_ip>

# AllowAgentForwarding defaults to yes in sshd_config on Amazon Linux 2023, so
# there is nothing to change - but it is the first thing to check if the key is
# not offered.`;

export const awsVpnBastionFlowLogsQuery = `# CloudWatch Logs Insights - against the VPC flow log group

fields @timestamp, srcAddr, dstAddr, dstPort, action
| filter dstPort = 3000 or dstPort = 22
| sort @timestamp desc
| limit 50

# Two things to know before reading the output:
#
# 1. A REJECT only appears when traffic actually reaches an ENI and a security
#    group drops it. Trying to hit the bastion from the internet logs NOTHING -
#    there is no route, so no packet ever arrives. To produce a REJECT you have
#    to already be on the VPN and aim at a port that is not allowed.
#
# 2. Records contain IP addresses, not security group or instance names. Keep
#    the private IPs from terraform output to hand or the rows are opaque.`;

export const awsVpnBastionCidrBits = `An IPv4 address is 32 bits, written as four 8-bit numbers.
The /number says how many of those bits are FIXED.


  10.20.0.0/16                          16 fixed, 16 free

     10        20         0         0
  00001010  00010100  00000000  00000000
  └────── fixed ─────┘└────── free ─────┘
    never changes       ~65,536 addresses


  10.20.10.0/24                         24 fixed, 8 free

     10        20        10         0
  00001010  00010100  00001010  00000000
  └────────── fixed ───────────┘└─ free ─┘
                                256 addresses


  203.0.113.7/32                        32 fixed, 0 free

    203         0        113         7
  11001011  00000000  01110001  00000111
  └──────────── all fixed ──────────────┘
                       exactly 1 address - one machine


So the bigger the number, the fewer addresses it covers.
A /32 is a single machine, which is why it is the right
size for "allow SSH from my laptop and nowhere else".`;

export const awsVpnBastionCidrNesting = `Because a /16 fixes fewer bits than a /24, it contains them.
The VPC is the big block; each subnet is a slice of it.


  10.20.0.0/16      the whole VPC      10.20.0.0 → 10.20.255.255
  │
  ├── 10.20.0.0/24    public   AZ-a    10.20.0.0   → 10.20.0.255
  ├── 10.20.1.0/24    public   AZ-b    10.20.1.0   → 10.20.1.255
  ├── 10.20.10.0/24   private  AZ-a    10.20.10.0  → 10.20.10.255
  └── 10.20.11.0/24   private  AZ-b    10.20.11.0  → 10.20.11.255


A /16 holds 256 possible /24s. Four are used here and the rest
are left free, which is why the private ones start at .10 rather
than .2 - leaving a gap makes it obvious at a glance which tier
an address belongs to.`;

export const awsVpnBastionPuttygenOptions = `PuTTYgen - Parameters panel, and what AWS will actually accept


  Type of key to generate:

    ( ) RSA          2048 default, 4096 common
                     PuTTY warns below 2048.
                     AWS: supported. Lengths 1024 / 2048 / 4096
                     -> note 3072 is NOT on AWS's list

    ( ) DSA          AWS: "Amazon EC2 does not accept DSA keys"
                     Rejected outright.

    ( ) ECDSA        256 / 384 / 521 (NIST curves)
                     AWS: not listed as supported for key pairs.

    (o) EdDSA        255 = Ed25519,  448 = Ed448
                     AWS: Ed25519 supported, LINUX ONLY.
                     Ed448 not supported.

    ( ) SSH-1 (RSA)  PuTTY: "no longer considered secure,
                     it's rare to need this option"


  So of five options, three are dead ends for EC2.
  Choose Ed25519 for Linux; RSA 4096 if you need Windows too.


  Number of bits in a generated key:  [ 255 ]
                     Ignored for Ed25519 (fixed at 255).
                     Only meaningful for RSA.`;

export const awsVpnBastionKeyFormats = `PuTTYgen produces three different things. They are not interchangeable.


  1. The paste box at the top of the window
     "Public key for pasting into OpenSSH authorized_keys file"

     ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI... adam@laptop

     ONE LINE. This is what AWS wants, and what goes into
     Terraform's aws_key_pair.public_key.


  2. The "Save public key" BUTTON  <-- the trap

     ---- BEGIN SSH2 PUBLIC KEY ----
     Comment: "ed25519-key-20260810"
     AAAAC3NzaC1lZDI1NTE5AAAAI...
     ---- END SSH2 PUBLIC KEY ----

     RFC 4716 / SSH2 format. AWS accepts this ONLY for RSA keys,
     so with an Ed25519 key it just fails. Almost everyone
     reaches for this button once.


  3. "Save private key"  ->  yourkey.ppk

     Stays on your machine. Load it into Pageant. It is never
     uploaded, never sent to a server, and AWS keeps no copy -
     lose it and you lose access to the instances.`;

export const awsVpnBastionFingerprints = `Why the fingerprint AWS shows will not match the one PuTTYgen shows


  EC2 uses different hash functions depending on the key type AND
  on whether the key was created by AWS or imported into it:

                        created by EC2      imported to EC2
    RSA                 SHA-1               MD5      <-- us
    ED25519             SHA-256             SHA-256

  Terraform's aws_key_pair IMPORTS, so an RSA key shows an MD5
  fingerprint in the console. PuTTYgen shows you SHA-256. They
  are both correct and they will never look alike.

  To actually compare, export the key to OpenSSH format first
  (PuTTYgen: Conversions > Export OpenSSH key) and then:

    openssl rsa -in key.pem -pubout -outform DER | openssl md5 -c

  With Ed25519 both sides use SHA-256, so the fingerprints match
  directly and none of this applies. A small, real argument for
  preferring it.`;

export const awsVpnBastionManualKey = `# Adding a second person's key, by hand
#
# An EC2 instance holds exactly ONE key pair, chosen at launch and never
# changed. So the moment a second person needs access, you are managing
# authorized_keys yourself - by hand, from user_data, or with config
# management. There is no "add another key pair" API call.

# They generate their own pair (PuTTYgen, same as you) and send you ONLY the
# public one-liner. If anyone sends you a private key, stop and start again -
# a private key that has been emailed is a private key that is burnt.

# 1. Reach the bastion the normal way: VPN up, PuTTY session, Pageant holding
#    your key. Their key is not involved in getting you there.

# 2. Append it. This file is plain text, one key per line.
echo "ssh-ed25519 AAAAC3Nza... sam@sam-laptop" >> ~/.ssh/authorized_keys

# 3. Permissions are not optional, and this is where people lose an hour.
#    sshd silently ignores authorized_keys if the file or its directory is
#    group- or world-writable. It does not tell you. It just keeps refusing
#    the key and falling back to asking for a password that does not exist.
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys

# 4. Check it landed before they try to connect.
ssh-keygen -lf ~/.ssh/authorized_keys

# Revoking is deleting the line. That is the entire procedure - and it is why
# the comment on the end of each line earns its keep: it is the only thing
# telling you which line belongs to whom.`;

export const awsVpnBastionManualKeyDurability = `What survives what
==================

  terraform apply          key stays        Terraform never reads or writes
                                            authorized_keys on a running box.
                                            It manages the AWS key pair object,
                                            nothing inside the instance.

  reboot                   key stays        It is a file on disk.

  instance REPLACED        key is GONE      A new instance boots fresh. cloud-init
  (AMI change, user_data                    writes only the Terraform-managed key.
   change, terminate)                       Your hand-added key was never recorded
                                            anywhere Terraform can replay.

Nothing warns you. terraform plan shows no drift, because there is no drift
to show - Terraform has no idea the file changed.

That is the honest cost of doing it by hand, and the reason real fleets push
authorized_keys through config management, or skip the file entirely and use
an SSH certificate authority that issues short-lived certs.`;

export const awsVpnBastionRfc1918 = `Three ranges are private. Everything else in IPv4 belongs to someone.


  10.0.0.0    - 10.255.255.255      10.0.0.0/8        1 old Class A
  172.16.0.0  - 172.31.255.255      172.16.0.0/12    16 old Class Bs
  192.168.0.0 - 192.168.255.255     192.168.0.0/16   256 old Class Cs


All three were reserved on the same day, in the same document, for the
same reason. RFC 1918, February 1996.

Their sizes are why there are three of them, and the old class sizes are
why the middle one stops at 172.31 rather than 172.255 - sixteen
consecutive /16s starting at 172.16 ends at 172.31.


  Quick test:   10.       always private
                172.      only if the second octet is 16-31
                192.168.  always private
                anything else -> public, and owned by somebody


  Catches people out:   172.15.x.x    public
                        172.32.x.x    public
                        192.167.x.x   public`;

export const awsVpnBastionSubnetReserved = `AWS takes five addresses out of every subnet, whatever its size.


  10.20.0.0/24      256 addresses, 251 usable

    10.20.0.0       network address
    10.20.0.1       the VPC router
    10.20.0.2       the DNS resolver          <- always VPC base + 2
    10.20.0.3       reserved for future use
    10.20.0.255     broadcast


On a /28 that is five out of sixteen - a third of the subnet gone before
you launch anything into it.


The layout this build uses:

  10.20.0.0/24      public    zone a       (10.20.1.0/24  left free)
  10.20.10.0/24     private   zone a       (10.20.11.0/24 left free)

Public tiers start at .0 and private at .10, so 10.20.11.47 reads as
"private, zone b" without looking anything up. Address space costs
nothing here. Legibility is worth more than the addresses it spends.`;

export const awsVpnBastionKeyChallenge = `What actually happens when you log in with a key.


  client ->  I would like to authenticate with this public key
  server     is that key in ~/.ssh/authorized_keys for this user?
  server ->  prove it. sign this random challenge.
  client     signs the challenge with the private key
  server     verifies the signature against the public key
                                                     -> access granted


The private key never crosses the wire. Not encrypted, not hashed. The
challenge is different every time, so a recording of the exchange is
worth nothing to whoever recorded it.

Compare a password, which has to travel to the server to be checked. A
compromised server learns a credential it can reuse. A compromised
server in the exchange above learns nothing at all.

It is also why AWS could not produce your private key if compelled to.
They only ever received the public half.`;

export const awsVpnBastionCertInspect = `openssl x509 -in server.crt -noout -text


  Issuer:  CN = secure-remote-access-ca       who vouched for this
  Subject: CN = server                        who it is about

  Public Key Algorithm: id-ecPublicKey
      ASN1 OID: prime256v1

  X509v3 Basic Constraints:
      CA:FALSE                                a leaf, not an authority

  X509v3 Extended Key Usage:
      TLS Web Server Authentication           <- the field that matters


A client certificate is identical except for that last line, which reads
TLS Web Client Authentication instead.

That single field is what stops a server certificate being used to
connect as a client, even though both are signed by the same authority
and both are entirely valid.


  openssl x509 -in ca.crt -noout -subject -issuer

  subject=CN = secure-remote-access-ca
  issuer=CN = secure-remote-access-ca         identical -> self-signed


If your SERVER certificate shows the same subject and issuer, you
answered the Common Name prompt twice with the same value. It still
works, and you should still rebuild it.`;

export const awsVpnBastionServerConfManual = `# /etc/openvpn/server/server.conf
# Sorted into the four questions every OpenVPN config answers.

# --- Where do I listen? ---
port 1194
proto udp4                  # UDP: TCP inside TCP causes retransmission storms
dev tun                     # layer 3, routed. tap is layer 2 and rarely wanted

# --- Who am I? ---
ca ca.crt                   # relative paths resolve to /etc/openvpn/server
cert server.crt
key server.key
dh none                     # ECDSA uses ECDHE - no DH parameters to generate
tls-crypt tls-crypt.key     # wraps the control channel before TLS begins

# --- Who do I let in? ---
remote-cert-tls client      # reject anything not marked for client use
verify-client-cert require  # a certificate is mandatory, even once PAM exists
crl-verify crl.pem          # omit this and revoked certificates keep working

# --- How do I behave? ---
server 10.8.0.0 255.255.255.0   # a macro - it expands to five other directives
topology subnet                 # one address per client, like a normal network
keepalive 10 120                # survive a lid close or a change of network
data-ciphers AES-256-GCM:AES-128-GCM:CHACHA20-POLY1305
auth SHA256
tls-version-min 1.2

user nobody                 # drop privileges once the tunnel is open
group nogroup
persist-key                 # these two are REQUIRED once you drop privileges
persist-tun
explicit-exit-notify 1
verb 3`;

export const awsVpnBastionFirstConnect = `The checkpoint most guides skip. Both of these results are correct.


  ipconfig
      Ethernet adapter OpenVPN TAP:
      IPv4 Address . . . : 10.8.0.2           the tunnel exists

  ping 10.8.0.1                               the server's TUNNEL address
      Reply from 10.8.0.1: bytes=32 ...       works

  ping 10.20.0.142                            the server's VPC address
      Request timed out.                      fails


You have a tunnel and nothing else.

10.8.0.1 answers because your own tunnel interface is in 10.8.0.0/24, so
the server is directly attached. No routing is involved.

10.20.0.142 fails for two independent reasons, and both need fixing.
Nothing has told the client to send 10.20.x.x into the tunnel. And even
if something had, the server would not forward it.

"I pushed the route and still cannot reach anything" is the most common
OpenVPN complaint there is, and this is why.`;

export const awsVpnBastionRoutePrint = `route print -4        (Windows, while connected)


  Network Destination     Netmask           Gateway        Interface
  0.0.0.0                 0.0.0.0           192.168.0.1    192.168.0.231
  10.8.0.0                255.255.255.0     On-link        10.8.0.2
  198.51.100.42           255.255.255.255   192.168.0.1    192.168.0.231
  192.168.0.0             255.255.255.0     On-link        192.168.0.231


Two things worth reading closely.


1. There is no entry for 10.20.0.0 at all. That is why the ping failed -
   it matched only the default route, went to the home router, and died
   there. Timed out rather than refused, because nothing was reached.


2. That /32 pointing at the home router is the VPN server's own public
   address, deliberately pinned outside the tunnel.

   Consider what happens if you later push a default route into the
   tunnel. The encrypted packets carrying the tunnel are addressed to
   that server. If they matched the new default route they would be sent
   into the tunnel they are building. Infinite recursion.

   The /32 prevents it, and it works because longest prefix match makes a
   /32 the most specific route it is possible to have.`;

export const awsVpnBastionThreeFixes = `Three separate things are missing. Add them one at a time, or you will
not know which one fixed it.


# 1. Tell the client where to send VPC traffic.
#    Pushed directives are delivered during the handshake, so an existing
#    session will not pick this up. Reconnect.

push "route 10.20.0.0 255.255.0.0"


# 2. Let the kernel pass packets between interfaces.
#    Linux is a host, not a router. A packet arriving on one interface
#    addressed somewhere else is dropped by default.

sysctl -w net.ipv4.ip_forward=1                               # now
echo net.ipv4.ip_forward=1 > /etc/sysctl.d/99-openvpn.conf    # and at boot


# 3. Rewrite the source address on the way out.
#    Without this the packet leaves with source 10.8.0.2 and the VPC
#    discards it.

iptables -t nat -A POSTROUTING -s 10.8.0.0/24 -o ens5 -j MASQUERADE


# iptables rules live in memory and vanish on reboot:
apt-get install -y iptables-persistent
netfilter-persistent save`;

export const awsVpnBastionTcpdump = `Six links in the chain. "The VPC is not reachable" means one of them is
broken, and the question is never which command - it is which link.


  1. client route      does the client send 10.20.x.x into the tunnel?
  2. tunnel            does the packet arrive at the server?
  3. IP forwarding     will the kernel pass tun0 -> ens5?
  4. NAT               does it leave with a source AWS will accept?
  5. security group    does the destination permit it?
  6. return path       stateful - free if 1 to 5 are right


Two commands make every link visible:

  tcpdump -ni tun0 port 53       did it arrive in the tunnel?
  tcpdump -ni ens5 port 53       did it leave towards the VPC?


  tun0        ens5                             diagnosis
  --------    -----------------------------    -------------------------
  nothing     nothing                          client route
  query       nothing                          IP forwarding is off
  query       query, source 10.8.0.2           NAT missing, AWS drops it
  query       query, source 10.20.0.142,       security group at the
              no reply                         destination
  query       query and reply                  working


That table is worth more than any of the individual commands. It turns
"it does not work" into a location.`;

export const awsVpnBastionPamManual = `# /etc/openvpn/server/server.conf - add the plugin
plugin /usr/lib/x86_64-linux-gnu/openvpn/plugins/openvpn-plugin-auth-pam.so openvpn
verify-client-cert require
reneg-sec 0


# /etc/pam.d/openvpn
auth    required  pam_google_authenticator.so user=root secret=/etc/openvpn/google-authenticator/\${USER}
account required  pam_permit.so


# Two deliberate absences and one deliberate relocation:
#
# No pam_unix.so. These accounts have no password, so checking one would
# fail every login. Leaving it out makes the "password" field purely the
# six-digit code.
#
# verify-client-cert require stays. PAM is IN ADDITION to the
# certificate, never instead of it. Some plugin setups will quietly make
# certificates optional if you let them.
#
# secret= moves the TOTP files out of /home entirely. Ubuntu's systemd
# unit sets ProtectHome=true, which mounts an empty filesystem over /home
# for that service - so the daemon cannot see a file that plainly exists
# and that root can read perfectly well from a shell.`;

export const awsVpnBastionAddUserManual = `# Onboarding is three steps, not one. Missing the middle one is the usual
# reason 2FA "does not work".

# 1. A certificate. The client key gets a passphrase - a human is present
#    when a client connects, so there is no excuse not to.
./easyrsa build-client-full alice

# 2. A Unix account, purely so PAM has a name to resolve. No password, no
#    shell, and with the relocation below, no home directory needed.
useradd -s /usr/sbin/nologin alice

# 3. That user's TOTP secret, written where the daemon can actually see it.
google-authenticator -t -d -f -r 3 -R 30 -w 3 \\
  -s /etc/openvpn/google-authenticator/alice

#   -t  time based           -d  a code can never be reused
#   -f  write the file       -r 3 -R 30  three attempts per 30 seconds
#   -w 3  accept a code one step either side of now


# Revocation is the mirror image, and per-person credentials are what make
# it possible at all:
./easyrsa revoke alice
./easyrsa gen-crl           # OpenVPN re-reads crl.pem on every connection

# A revoked client that is already connected stays connected until the
# session ends. Revocation blocks the next handshake, not the current one.`;

export const awsVpnBastionProxyJump = `# Never copy your private key onto the bastion. Two ways to avoid it.


# Agent forwarding - the bastion gets a socket that proxies signing
# requests back to the agent running on your laptop.

ssh -A ec2-user@10.20.10.161

  [ec2-user@bastion ~]$ ls -la ~/.ssh/
  authorized_keys                     <- no private key here
  [ec2-user@bastion ~]$ ssh-add -l
  256 SHA256:xxxx adam@laptop         <- a key that is 200 miles away

# The caveat nobody mentions: anyone with root on that bastion can use the
# forwarded socket to authenticate AS YOU, for as long as your session is
# open. They cannot steal the key - it never arrives - but they do not
# need to.


# ProxyJump - better, because your laptop authenticates end to end and the
# bastion only ever forwards encrypted bytes.

ssh -J ec2-user@10.20.10.161 ubuntu@10.20.0.142

# Or in ~/.ssh/config:
Host openvpn
    HostName     10.20.0.142
    User         ubuntu
    IdentityFile ~/.ssh/secure-remote-access.key
    ProxyJump    bastion`;

export const awsVpnBastionLocalForward = `ssh -L 8080:localhost:8080 ec2-user@10.20.10.161

     -L 8080 : localhost : 8080
        |           |        |
        |           |        +-- the port on that host
        |           +-- resolved FROM THE BASTION, not from here
        +-- the port opened on YOUR laptop


localhost there means the bastion. This is the single most common mistake
with -L: people read it as their own machine and cannot work out why
nothing connects.


Now the interesting part. Run something on port 8080 on the bastion, where
no security group rule permits 8080:

  direct, over the VPN, to 10.20.10.161:8080     blocked
  through the tunnel, to localhost:8080          works


Because the connection to 8080 originates on the bastion, to itself. No
network interface, no VPC network, and therefore no security group
anywhere in the path. The only thing the security group ever saw was your
SSH session on port 22, which it allows.

That is what a tunnel fundamentally does. It converts your traffic into
traffic that originates somewhere else.`;

export const awsVpnBastionProof = `The evidence, and what each piece actually proves.


# Connected to the VPN:

  ssh ec2-user@10.20.10.161
  [ec2-user@bastion ~]$                        in

  route print -4
  10.20.0.0   255.255.0.0   10.8.0.1   ...     the pushed route


# Disconnect the VPN and try the same thing:

  ssh ec2-user@10.20.10.161
  ssh: connect to host 10.20.10.161 port 22: Connection timed out

  route print -4
  (no 10.20.0.0 entry at all)                  it left with the tunnel


Timed out, not refused. Refused would mean you reached the machine and
nothing was listening on that port. Timed out means nothing was reached.

There is no firewall rule here you could have got wrong, no password to
guess, and no port to find. From the internet that host has no address
and no route.


# And from the bastion itself, which has no public address:

  curl -s https://checkip.amazonaws.com
  192.0.2.55                                   the NAT gateway

No inbound path whatsoever, and yet full egress. The one-way door,
working.`;
