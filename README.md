# UrbanDickBot

A simple bot that responds to commands in discord.

## Getting Started

### Installing

```
npm i urban-dick-bot
```

### Examples

Simple

```javascript
require("urban-dick-bot").run("<YOUR-DISCORD-TOKEN>");
```

With Custom Debug Level

```javascript
const UrbanDick = require("urban-dick-bot");
require("dotenv").config();
UrbanDick.run(process.env.TOKEN, UrbanDick.DebugLevel.Debug);
```
