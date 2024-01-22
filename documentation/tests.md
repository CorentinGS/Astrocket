# Tests 

## Frontend

### Login Page

When you enter a wrong username/password, an error notification should appear.

When you enter a correct username/password, a success notification should appear, and you should be redirected to the room page.

While processing the login request, a loading indicator should appear. 

When you are logged in, the login page should not be accessible anymore, and you should be redirected to the room page.

### Room Page

When you are not logged in the room page should not be accessible, and you should be redirected to the login page.

When you write a message longer than the limit (500 chars), you should be prevented from sending it.

When you scroll up and some messages aren't loaded, a "load more" button should appear, so you can download previous messages

When you click on the "load more" button, the previous messages should be loaded and the button should disappear.

When you hit `enter`, the message should be sent 

When you type `shift + enter`, a line break should be added on the text area.

When you receive a message, and you do not focus the room page, you should receive a notification.

When you receive a message, and you focus the room page, you should not receive a notification.

When you click logout, you should be redirected to the login page and accounts information should be deleted from the local storage/cookies

