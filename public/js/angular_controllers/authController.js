//in other files, create form view, send users there when click login (in navbar) for now. require this controller in app module.
//define module
//define controller
//trigger submit with a button, on click, call below method:
//define method loginUser to get data from form and put it in an object
//define method login to send that object using $http
//post to '/login'
//on success redirect to page, on err show err message.

//old  version does by getting form input and value,
//putting in an object {form.name: form.value},
//passing that to model.login function,
//along with a callback that only functions to display error.
//login function posts user login object to '/login',
//triggers redirect to page on success,
//calls cb with error message string on err.


