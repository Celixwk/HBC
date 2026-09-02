const fs = require('fs');
let s = fs.readFileSync('prisma/schema.sql', 'utf8');
s = s.replace(/\\"/g, '"');
fs.writeFileSync('prisma/schema.sql', s);
