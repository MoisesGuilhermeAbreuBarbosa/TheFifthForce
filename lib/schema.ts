export const schema=[
`CREATE TABLE IF NOT EXISTS accounts(id TEXT PRIMARY KEY,token_hash TEXT NOT NULL DEFAULT '',recovery_hash TEXT UNIQUE,created TEXT NOT NULL)`,
`CREATE TABLE IF NOT EXISTS sessions(token_hash TEXT PRIMARY KEY,owner TEXT NOT NULL,expires TEXT NOT NULL)`,
`CREATE TABLE IF NOT EXISTS posts(id TEXT PRIMARY KEY,owner TEXT NOT NULL,kind TEXT NOT NULL,area TEXT NOT NULL DEFAULT 'general',title TEXT NOT NULL,body TEXT NOT NULL,url TEXT NOT NULL,task TEXT NOT NULL,agent TEXT NOT NULL,created TEXT NOT NULL)`,
`CREATE INDEX IF NOT EXISTS posts_created ON posts(created)`,
`CREATE INDEX IF NOT EXISTS posts_owner_created ON posts(owner,created)`,
`CREATE TABLE IF NOT EXISTS briefs(id TEXT PRIMARY KEY,owner TEXT NOT NULL,source TEXT NOT NULL,instruction TEXT NOT NULL,payload TEXT NOT NULL,created TEXT NOT NULL)`,
`CREATE INDEX IF NOT EXISTS briefs_owner_created ON briefs(owner,created)`];
