$(document).ready(function() {
  $("textarea").keyup(function(){
    let remaining = 140 - $(this).val().length
    console.log(remaining);
    if (remaining >= 0) 
    {$("output").replaceWith(`<output name="counter" class="counter" for="twitttext">${remaining}</output>`)}
    else {
     $("output").replaceWith(`<output style="background-color: red; color: white;" name="counter" class="counter" for="twitttext">${remaining}</output>`)
    }
  })
});