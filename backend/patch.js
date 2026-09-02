const fs = require('fs');
let s = fs.readFileSync('prisma/schema.sql', 'utf8');
s = s.replace(/CREATE TABLE "/g, 'CREATE TABLE IF NOT EXISTS "');
s = s.replace(/CREATE INDEX "/g, 'CREATE INDEX IF NOT EXISTS "');
s = s.replace(/CREATE UNIQUE INDEX "/g, 'CREATE UNIQUE INDEX IF NOT EXISTS "');
fs.writeFileSync('prisma/schema.sql', s);
