import { createNote, fetchNoteByOwner,fetchNote, updateNote, deleteNote } from "../services/note.service.mjs"

async function handleNoteCreation(req, res) {
    const { app, method, session } = req
    const db = app.get('g:db')

    if(method =="GET") { 
        const { user } = session
        res.render('noteMaker', { user, note: {} })
    }
    if(method =="POST"){
        const { title, content, id } = req.body
            if (!id) {
                try {
                    await createNote(db, { title, content, owner_id: session.user.id })
                    res.redirect('/note')
                } catch(err) {
                    console.log(err)
                    res.redirect('/')
                }
            }
            else {
                try {
                updateNote(db, { title, content, id, userID: session.user.id })
                } catch(err) {
                console.log(err)
                }
                res.redirect('/note')
            }
}
}

async function handleNote(req, res){
    const { session } = req
    const db = req.app.get('g:db')
    let notes = []
    try {
        notes = (await fetchNoteByOwner(db, session.user.id))
        
    } catch (err) {
        console.log(err)
    }
    
    res.render('note', { user: session.user, notes: notes })
}

async function handleNoteEdit(req, res){
    const db = req.app.get('g:db')
    try {
        const note = await fetchNote(db, req.params.id)
        res.render('noteMaker', { note })
    } catch (err) {
        console.log(err)
    }
}

async function handleNoteDelete(req, res){
    const id = req.body.id
    const db = req.app.get('g:db')

    if (id) {
        try {
            await deleteNote(db, id)
        } catch (err) {
            console.log(err)
        }
    }
    res.redirect('/note')
}

export function loadNoteController(app) {
    app.get('/note', handleNote)
    app.all('/note/new', handleNoteCreation)
    app.get('/note/:id', handleNoteEdit)
    app.post('/note/delete', handleNoteDelete)
}
