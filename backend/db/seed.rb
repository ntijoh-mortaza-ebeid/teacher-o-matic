require 'sqlite3'

db = SQLite3::Database.new 'db/assessments.db'

db.execute('DROP TABLE IF EXISTS assessments')
db.execute('CREATE TABLE assessments 
                (fork_id TEXT UNIQUE,
                comment TEXT,
                status TEXT)')
