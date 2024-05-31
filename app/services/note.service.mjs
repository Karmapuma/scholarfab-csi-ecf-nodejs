export function fetchNote(db, id) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('SELECT * FROM notes WHERE id=?')
        stmt.get([ id ], (err, data) => {
            const p = err ? err : data;
            (err ? reject : resolve)(p)
        })
    })
}

export function fetchNoteByOwner(db, id){
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('SELECT * FROM notes WHERE owner_id=?')
        stmt.all([ id ], (err, data) => {
            const p = err ? err : data;
            (err ? reject : resolve)(p)
        })
    })
}

export function createNote(db, { title, content, owner_id }) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('INSERT INTO notes(title, content, owner_id) VALUES (?,?,?)')
        stmt.run([ title, content, owner_id ], (err, data) => {
            const p = err ? err : data;
            (err ? reject : resolve)(p)
        })
    })
}

export function updateNote(db, {title, content, id, userID}){

    return new Promise((resolve, reject) => {
        const stmt = db.prepare('UPDATE notes SET title=?, content=? WHERE id=? AND owner_id=?')
        stmt.run([title, content, id, userID], (err, data) => {
            const p = err ? err : data;
            (err ? reject : resolve)(p)
        })
    })
}

export function deleteNote(db, id) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('DELETE FROM notes WHERE id=?')
        stmt.run([ id ], (err, data) => {
            const p = err ? err : data;
            (err ? reject : resolve)(p)
        })
    })
}