export function fetchShare(db, id) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('SELECT * FROM shares WHERE id=?')
        stmt.get([ id ], (err, data) => {
            const p = err ? err : data;
            (err ? reject : resolve)(p)
        })
    })
}

export function fetchShareByOwner(db, id) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('SELECT * FROM shares WHERE user_id=?')
        stmt.all([ id ], (err, data) => {
            const p = err ? err : data;
            (err ? reject : resolve)(p)
        })
    })
}

export function createShare(db, { user_id, note_id, permission }) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('INSERT INTO shares(user_id, note_id, perm) VALUES (?,?,?)')
        stmt.run([ user_id, note_id, permission ], (err, data) => {
            const p = err ? err : data;
            (err ? reject : resolve)(p)
        })
    })
}

export function updateShare(db, {user_id, note_id, permission, id}){
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('UPDATE shares SET user_id=?, note_id=?, perm=? WHERE id=?')
        stmt.run([user_id, note_id, permission, id], (err, data) => {
            const p = err ? err : data;
            (err ? reject : resolve)(p)
        })
    })
}


export function searchPersonnalShares(db, id) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare("SELECT s.* FROM shares AS s JOIN notes AS n ON s.note_id = n.id JOIN users AS u ON n.owner_id = u.id WHERE u.id =?")
        stmt.all([ id ], (err, data) => {
            const p = err ? err : data;
            (err ? reject : resolve)(p)
        })
    })
}



