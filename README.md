# diaryia ' die - ur - ee - uh '
A journal with the option of locking your entries away up untli a certain date. And it uses NLP to show patterns in your writing.

[Try it](https://diario-mxz8.onrender.com/) *~1 min wait time to login for first-time users
<br>
[View the Cloud Function](https://github.com/JadePablo/diario_yearly_email_cloud_function/tree/main) for 'yearly highlights'
## Features
- Spotify Wrapped-esque data insights a.k.a 'yearly highlights': on new year's eve, automatic emails are sent to users containing personable data insights via various NLP techniques on their journal entries regarding:
  - what topics they write about
  - what emotions they they convey
  - who/what/places they write about
  - Overall sentiment
- Entries are AES-256 encrypted
- Lock your journal entries for later viewing at a specified date

## Technologies Used
- Node.js: server-side code
- Express: middleware & routing
- MongoDB: database to store entries
- React: front-end
- Google Cloud: support login with gmail accounts

## Essential Libraries
- [Tweetnlp](https://github.com/cardiffnlp/tweetnlp) : data insights in cloud function script
- [Mongoose-encryption](https://www.npmjs.com/package/mongoose-encryption) : encrypt user uploads
- [Mongoose](https://mongoosejs.com/) : cut down on boilerplate
- [React OAuth2 | Google](https://www.npmjs.com/package/@react-oauth/google)  : google log-in
