const fs = require('fs')
const chalk = require('chalk')


const addNotes = function(title, body){
    const notes = loadNotes()                    //1st round reading notes,if no notes are scanned,then proceed
    /*const duplicateNotes = notes.filter(function(note){
        return note.title === title             //using filter and set return false, filter wont keep tat note in array and no duplicate         
    })*/
    const duplicateNotes = notes.find(function(note){
       return note.title === title       //this item is going to be called until a match is found, so the function will find whether the note i typed has any duplicate
    })

   if(!duplicateNotes /*or duplicateNotes.length === 0*/){      //!duplicateNote means if note.title !== title
      notes.push({
        title: title,
        body: body
      })             //push means adding new note to the list
      saveNotes(notes)
      console.log(chalk.black.bgGreen.bold('New Note Added!'))
   }  else{
      console.log(chalk.white.bgRed.bold('Note Title Taken!'))
   }    
}


const removeNotes = function(title){
    const notes = loadNotes()
    const notesToKeep = notes.filter(function(note){
        return note.title !== title    //make this command true //i wanna keep those !== ,for === then delete
    })
         
    if(notes.length > notesToKeep.length){
        console.log(chalk.black.bgGreen.bold('Note has been removed'))
        saveNotes(notesToKeep)
    } else{
        console.log(chalk.white.bgRed.bold('No Note Found!'))
    }    
}


const listNotes = function(){
    const notes = loadNotes()
    
    console.log(chalk.yellow.bgBlue.bold('Notes Listed!'))

    notes.forEach(function(note){
        console.log(note.title, note.body)
    })
}


const readNotes = function(title){
    const notes = loadNotes()
    const noteToRead = notes.find(function(note){
        return note.title === title 
    })                       //true, found a match
    

    if(noteToRead){
        console.log(chalk.black.bgWhite.bold(noteToRead.title))
        console.log(noteToRead.body)               //print the body along
    } else{
        console.log(chalk.white.bgRed.bold('Note not Found!'))
    }

}


const saveNotes = function(notes){
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}                                            //the order doesnt matter


const loadNotes = function(){      //the () has no arguments,so it gonna return an array of notes
    try{
        const dataBuffer = fs.readFileSync('notes.json')   //buffer meaning is data not in json format
        const dataJSON = dataBuffer.toString()
        return dataParse = JSON.parse(dataJSON)           //parsing back array of data in string form
    } catch(e) {
        return []          //return empty array
    }
        
}




module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
}    