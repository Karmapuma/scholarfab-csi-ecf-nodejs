import { fetchNote, fetchNoteByOwner } from "../services/note.service.mjs"
import { fetchShareByOwner } from "../services/share.service.mjs"


async function handleHome(req, res) {
    const { app, method, session } = req;
    const { user } = session;
    const db = app.get('g:db');
    let notes = [];
    let shares = [];
    try {
        shares = await fetchShareByOwner(db, user.id);
    } catch (err) {
        console.log(err);
    }
    try {
        notes = await fetchNoteByOwner(db, session.user.id);
    } catch (err) {
        console.log(err);
    }



    let sharedNotesPromises = shares.map(share => fetchNote(db, share.note_id));
    let sharedNotes = await Promise.all(sharedNotesPromises);

    res.render('index', { user, shares: sharedNotes, notes: notes });
}





export function loadHomeController(app) {
    app.get('/',handleHome)
}
