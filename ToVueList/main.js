var dbNotesList = [];

var notesListToSend = [];

var isLoadFirstTime = true;

dataNodeRef.on('value', snap => {
    var dbContent = JSON.stringify(snap.val(), null, 3);

    $('#firebaseData').text(dbContent);

    dbNotesList = snap.val().notesList;

    console.log('LoadDB Finished');

    console.log(dbNotesList);

    if (isLoadFirstTime === true) {

        createVueInstance(function() {

            for (var i = 0; i < dbNotesList.length; i++) {
                dbNotesList[i].isHovering = false;
            }

            VueInstance.notesList = dbNotesList;
        });

        isLoadFirstTime = false;
    }
});

$('#testUpdate').click(function(event) {
    createVueInstance(function() {
        VueInstance.notesList = dbNotesList;
    });
});


var VueInstance;

function createVueInstance(callback) {
    VueInstance = new Vue({

        el: '#vueContainer',

        data: {
            newNoteText: "",

            notesList: [],

            mode1: true,
            mode2: false,
            mode3: false
        },

        methods: {

            addNewNote: function() {

                var newNoteContent = this.newNoteText;

                if (newNoteContent !== '') {
                    this.notesList.unshift({
                        text: newNoteContent,
                        isDone: false,
                        isHovering: false
                    });
                }

                notesListToSend = this.notesList;

                for (var i = 0; i < notesListToSend.length; i++) {
                    notesListToSend[i].isHovering = null;
                }

                console.log(notesListToSend);

                dataNodeRef.update({

                    "notesList": notesListToSend
                });

                this.newNoteText = '';
            },

            removeNote: function(eachNote) {
                var noteIndex = this.notesList.indexOf(eachNote);
                console.log('刪除' + noteIndex);
                this.notesList.splice(noteIndex, 1);

                dataNodeRef.update({
                    "notesList": this.notesList
                });
            },

            showDelete: function(eachNote) {
                var noteIndex = this.notesList.indexOf(eachNote);
                this.notesList[noteIndex]['isHovering'] = true;
            },

            hideDelete: function(eachNote) {
                var noteIndex = this.notesList.indexOf(eachNote);
                this.notesList[noteIndex]['isHovering'] = false;
            },

            toggleDone: function(eachNote) {
                var noteIndex = this.notesList.indexOf(eachNote);
                var isDone = this.notesList[noteIndex]['isDone'];
                if (isDone) {
                    console.log('change to not done');
                    this.notesList[noteIndex]['isDone'] = false;
                } else {
                    console.log('change to done');
                    this.notesList[noteIndex]['isDone'] = true;
                }

                notesListToSend = this.notesList;

                for (var i = 0; i < dbNotesList.length; i++) {
                    notesListToSend[i].isHovering = null;
                }

                dataNodeRef.update({
                    "notesList": notesListToSend
                });
            },

            openMode1: function() {
                console.log('mode1');
                this.mode1 = true;
                this.mode2 = false;
                this.mode3 = false;
            },

            openMode2: function() {
                console.log('mode2');
                this.mode1 = false;
                this.mode2 = true;
                this.mode3 = false;
            },

            openMode3: function() {
                console.log('mode3');
                this.mode1 = false;
                this.mode2 = false;
                this.mode3 = true;
            },

            filterShow: function(eachNote) {
                var noteIndex = this.notesList.indexOf(eachNote);
                var isDone = this.notesList[noteIndex]['isDone'];
                if (this.mode1) {
                    return true;
                } else if (this.mode2) {
                    if (isDone) {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    if (!isDone) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }

        },

        computed: {

        }

    });
    callback();
}
