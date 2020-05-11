/**
*Creazione di una todo list con le seguenti funzionalità, attraverso l’uso delle API, AJAX, jQuery e Handlebars
*Lettura di tutti i todo
*Creazione nuovo todo
*Cancellazione todo
*/

// API : Cosimo 157.230.17.132:3014/todos

$(document).ready(function() {

    // Refs
    var input = $(".input");
    var button = $("#todo-btn");
    var list = $(".todos");
    var urlApi = 'http://157.230.17.132:3014/todos';
    
    // Handlebars
    var source = $('#todo-template').html();
    var template = Handlebars.compile(source);
    
    // Stampo todos
    printTodos(urlApi, template, list);
    
    //nuovo todo item
    input.keyup(function(event){
        if(event.which === 13){
        create (urlApi, template, list, input);
        }
    })
    
    button.click(function(){
        create (urlApi, template, list, input);
    })
    
    $(document).on('click', '.remove', function () {
        remove(urlApi, template, list, $(this));
    });
    
}) // end doc ready
    
// Functions // 
//stampa todo
function printTodos(urlApi, template, list){
    //reset
    list.html('');

    $.ajax({
        url: urlApi,
        method: 'GET',
        success: function(data) {
        var todos = data;
        
            for (var i = 0; i < todos.length; i++) {
                var todo = todos[i];
                
                var context = {
                todo: todo.text,
                id: todo.id
                }
                
                var html = template(context);
                list.append(html);
            }
            $('.input').val('');
        
        },
        error: function() {
            console.log('Errore');
        }
    });
}

//crea todo
function create (urlApi, template, list, todoValue) {
    var todoValue = todoValue.val().trim();
    if(todoValue !== '') {
        $.ajax ({
            url: urlApi,
            method: 'POST',
            data: {
                text: todoValue
            },
            success:function() {
                printTodos(urlApi, template, list);
    
            },
            error: function() {
                console.log('Errore nella creazione')
            }
        });  
    }else {
        alert('Non hai inserito nessun valore')
    }
}

//cancella todo
function remove(urlApi, template, list, self){
    var todoId = self.data('id');

    $.ajax({
        url: urlApi + '/' + todoId,
        method: 'DELETE',
        success: function() {
        printTodos(urlApi, template, list)
        
        },
        error: function() {
            console.log('Errore durante la cancellazione')
        }
    });
}
    