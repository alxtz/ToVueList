var mode = 1;

$(document).ready(function(){
    //Detect enter
    $('input.forInput').keypress(function(inputKey){
        if(inputKey.which ==13){
            console.log('Pressed Enter At Input');
            if( $('input.forInput').val()!='' ){
                addNewListItem($('input.forInput').val());
                $('input.forInput').val('');
            }
        }
    });
    //

    $('div.footControl div').on('click',function(){

        $('div.footControl div').removeClass('modeOpen');
        $(this).addClass('modeOpen');

        if( $(this).hasClass('mode1') ){
            console.log('mode1 open');
            mode = 1;
        }else if( $(this).hasClass('mode2') ){
            console.log('mode2 open');
            mode = 2;
        }else if( $(this).hasClass('mode3') ){
            console.log('mode3 open');
            mode = 3;
        }

        filterListItems();

    });

});

function addNewListItem(listText){

    $('#newestNote').removeAttr('id');

    var newListItem = $( "<li class='newNote Incomplete' id='newestNote'>" + listText + "<div class='deleteIcon'><i class='fa fa-trash' aria-hidden='true'></i></div><div class='checkIcon'><i class='fa fa-check' aria-hidden='true'></i></div></li>" );

    $('ul.noteList').prepend(newListItem);

    addListeners();
}

function addListeners(){

    $('#newestNote').mouseenter(function(){
        $(this).find('div.deleteIcon').show();
        console.log('顯示delete');
    }).mouseleave(function(){
        $(this).find('div.deleteIcon').hide();
        console.log('隱藏delete');
    });

    $('#newestNote div.deleteIcon').on('click',function(){
        $(this).parent().fadeOut(function(){
            setTimeout(5000,function(){
                $(this).parent().remove();
            });
        });
        $(this).parent().addClass('killed');
    });

    $('#newestNote div.checkIcon').on('click',function() {
        $(this).find('i.fa-check').fadeToggle('fast');
        console.log('toggled on icon');
        if( $(this).parent().hasClass('Completed') ){
            $(this).parent().removeClass('Completed');
            $(this).parent().addClass('Incomplete');
            filterListItems();
        }else{
            $(this).parent().removeClass('Incomplete');
            $(this).parent().addClass('Completed');
            filterListItems();
        }
    });

}

function filterListItems(){
    $('li.newNote').each(function(){
        if(mode===1){
            if( $(this).hasClass('killed')===false ){
                $(this).show();
            }
        }else if (mode===2) {
            $(this).hide();
            if( $(this).hasClass('killed')===false && $(this).hasClass('Incomplete') ){
                $(this).show();
            }
        }else{
            $(this).hide();
            if( $(this).hasClass('killed')===false && $(this).hasClass('Completed') ){
                $(this).show();
            }
        }
    });
}
