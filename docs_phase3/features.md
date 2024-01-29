# Features

## Frontend

### Login Page

- [x] When you enter a wrong username/password, an error notification should appear.

- [x] When you enter a correct username/password, a success notification should appear, and you should be redirected to
  the room page.
- [x] While processing the login request, a loading indicator should appear.
- [x] When you are logged in, the login page should not be accessible anymore, and you should be redirected to the room
  page.
- [x] When you are redirected to an oauth provider, you should be redirected back to the login page after the oauth flow
  is completed (success or failure) and then process the login as usual.
- [x] When you are redirected to an oauth provider, a loading indicator should appear.

### Room Page

- [x] When you are not logged in the room page should not be accessible, and you should be redirected to the login page.
- [x] When you write a message longer than the limit (500 chars), you should be prevented from sending it.
- [x] When you scroll up and some messages aren't loaded, a "load more" button should appear, so you can download
  previous messages
- [x] When you click on the "load more" button, the previous messages should be loaded and the button should disappear.
- [x] When you hit `enter`, the message should be sent
- [x] When you type `shift + enter`, a line break should be added on the text area.
- [x] When you receive a message, and you do not focus the room page, you should receive a notification.
- [x] When you receive a message, and you focus the room page, you should not receive a notification.
- [x] When you click logout, you should be redirected to the login page and accounts information should be deleted from
  the local storage/cookies
- [x] When a line break is added, the text area should grow accordingly.
- [ ] When you click on the "load more" button, the scroll position should be preserved.
- [x] When a line break is added, it should be preserved when you send the message.
- [ ] When you receive a message, a new message notification should appear and when you click on it, you should be
  scrolled to the message.
- [ ] When you receive a message, the scroll position should be preserved.
- [ ] When you receive a message, and are scrolled to the bottom, the scroll position should continue at the bottom.
- [x] When you add markdown to the message, it should be rendered accordingly.
- [x] When you add markdown to the message, it should be preserved when you send the message.
- [ ] When a new user joins the room, a notification should appear.
- [x] A user should be able to see who is online.
- [ ] When a user goes offline, a notification should appear.
- [ ] When you click on a message, you should be able to reply to it.
- [ ] When you click on a message, you should be able to edit it.
- [ ] When you click on a message, you should be able to delete it.
- [ ] When you click on a message, you should be able to quote it.
- [ ] When you click on a message, you should be able to react to it.
- [x] Add an emoji picker to the message input.

### Profile Page

- [ ] When you click on the profile button, the profile page should appear.
- [ ] When you click on the profile button, the profile page should be populated with the user information.
- [ ] You should be able to edit your profile information.
- [ ] When you edit your profile information, the changes should be reflected on the profile page.
- [ ] When you open another user profile, the profile page should be populated with the user information, but you should
  not be able to edit it.

### Ideas for new features

- [ ] Add a "typing" indicator.
- [ ] Create some sort of "room" system, so you can create a room and invite people to it.
- [ ] Add a "room" page, where you can see all the rooms you are in, and you can create new rooms.
- [ ] Have several rooms open at the same time.
- [ ] Send private messages to other users.
- [ ] Send images and render them.
- [ ] Send files.

## Backend

### Endpoints

- [x] `GET /api/health` - Health check endpoint.
- [x] `GET /api/connected` - Get all the connected users.