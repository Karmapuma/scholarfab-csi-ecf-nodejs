import { fetchNoteByOwner } from "../services/note.service.mjs"
import { fetchUsers } from "../services/user.service.mjs"
import { createShare, searchPersonnalShares, fetchShare } from "../services/share.service.mjs"

async function handleShare(req, res){
    const { app, method, session } = req
    const { user } = session
    const db = app.get('g:db')
    let shares = []
    try {
        shares = await searchPersonnalShares(db, user.id)
    } catch (err) {
        console.log(err);
    }
    res.render('share', {shares:shares})

}



async function handleShareModification(req, res) {
    const { app, method, session } = req
    const { user } = session
    const db = app.get('g:db')
    let users = []
    let notes = []
    try {
        users = await fetchUsers(db)
    } catch (err) {
        console.log(err);
    }
    try {
        notes = await fetchNoteByOwner(db, user.id)
    } catch (err) {
        console.log(err);
    }
    

    if (method == 'GET') {
        res.render('shareMaker', { users, notes })
}

    if (method == 'POST') {
        const { content, target, permission } = req.body
        console.log(req.body);
        try {
        createShare(db, { user_id: target, note_id: content, permission })
        } catch (err) {
            console.log(err)
        }
        res.redirect('/')

    }

}

async function handleShareEdit(req, res) {
    const { app, method, session } = req
    const { user } = session
    const db = app.get('g:db')
    let users = []
    let notes = []
    try {
        users = await fetchUsers(db)
    } catch (err) {
        console.log(err);
    }
    try {
        notes = await fetchNoteByOwner(db, user.id)
    } catch (err) {
        console.log(err);
    }
    res.render('shareMaker', { users, notes })

}




export function loadShareController(app) {
    app.get('/share', handleShare)
    app.all('/share/new', handleShareModification)
    app.get('/share/:id', handleShareEdit)
}
