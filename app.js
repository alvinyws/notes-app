const yargs = require('yargs')
const { describe } = require('yargs')
const notes = require('./notes.js')      //import packages from notes.js file 

const command = process.argv
 
//create add command
yargs.command({
    command: 'add',
    description: 'Add a New note',
    builder: {
        title: {                // for the --title=""
            describe: 'Note Title',
            demandOptions: true,          //false by default, here means for this function to work, title must be provided at the argument
            type: 'string'
            },

        body: {                 // for the  --body=""
            describe: 'Note Body',
            demandOptions: true,
            type: 'string'
            }   
    },
    handler: function(argv){  //argv inside the bracket is for define purpose
        notes.addNotes(argv.title, argv.body)
    }
})

//create remove command
yargs.command({
    command: 'remove',
    description: 'Remove a note',
    builder: {
        title: {                               //--title=""
            describe: 'Note Title',
            demandOptions: true,
            type: 'string'
        }            
    },
    handler: function(argv){
        notes.removeNotes(argv.title)                  //specify only title to delete
    }
})

//create list command
yargs.command({
    command: 'list',
    description: 'List a note',
    handler: function(){
        notes.listNotes()
    }
})

//create a read command
yargs.command({
    command: 'read',
    description: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOptions: true,
            type: 'string'
        }
    },
    handler: function(argv){
        notes.readNotes(argv.title)        //means just type title is enough
    }
})


console.log(yargs.argv)          //print arguments that was customize by yargs

//console.log(process.argv[2])             //argv is an array, [i] is an index number to grab the information

//ctrl+c to end nodemon