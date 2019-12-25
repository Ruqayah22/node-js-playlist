// this function to add new item to (to-do) list.
$(document).ready(function(){

  $('form').on('submit', function(){ //when we press buttom submite in our browser it do :

      var item = $('form input'); //add the text we write it in textbar in our braowser to the var(item).
      var todo = {item: item.val()}; //add this item to the data in browser.

//when we passing that data we can do what we need in POST in todoController.
      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

//this function to delete item in (to-do) list.
  $('li').on('click', function(){ //when we click on the item it do :
      var item = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});
