const inputUsername = document.querySelector('#input-username')
const inputPassword = document.querySelector('#input-password')
const btnLogin = document.querySelector('#btn-login')
const btnLogout = document.querySelector('#btn-logout')
const btnSignUp = document.querySelector('#btn-sign-up')
const welcomeUser = document.querySelector('.welcome-user')

// AUTHENTICATION
const JWT_KEY = 'chat-api-jwt'
let isLoggedIn = false;
let userLoggedIn = 'Guest'

isAuthorized()

async function isAuthorized() {
     const jwt = localStorage.getItem(JWT_KEY)
     const options = {
          method: 'GET',
          headers: {
               'Content-Type': "application/json",
               'Authorization': 'Bearer ' + jwt
          }
     }
     try {
          const response = await fetch('/api/users/', options)
          if (response.status !== 200) {
               console.log('Could not contact server. Status: ' + response.status)
               return
          }
          const decoded = await response.json()
          if (response.status === 200) {
               isLoggedIn = true
               userLoggedIn = decoded.username
          }
          console.log('Status: ', response.status, ' \n Decoded token;', decoded)
          welcomeUser.innerHTML = `Welcome ${userLoggedIn}!`

     } catch (error) {
          console.log('Something went wrong when fetching data from server. (GET) \n' + error.message)
          return
     }
     updateLoginStatus()
}

function updateLoginStatus() {
     btnLogin.disabled = isLoggedIn;
     btnLogout.disabled = !isLoggedIn;

}

btnSignUp.addEventListener('click', async () => {
     // optimistisk kod =) LÄGG TILL TRY CATCH
     const user = {
          username: inputUsername.value,
          password: inputPassword.value
     }
     const options = {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
               'Content-Type': "application/json"
          }
     }
     const response = await fetch('/api/users', options)

     if (response.status === 200) {
          const userToken = await response.json()
          console.log('Signup and login successful: ', userToken)
          localStorage.setItem(JWT_KEY, userToken.token)
          isLoggedIn = true;

     } else {
          console.log('Signup failed, status: ' + response.status)
     }
     updateLoginStatus()
})



btnLogin.addEventListener('click', async () => {
     // optimistisk kod =) LÄGG TILL TRY CATCH
     const user = {
          username: inputUsername.value,
          password: inputPassword.value
     }
     const options = {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
               'Content-Type': "application/json"
          }
     }
     const response = await fetch('/login', options)

     if (response.status === 200) {
          const userToken = await response.json()
          console.log('Login successful: ', userToken)
          localStorage.setItem(JWT_KEY, userToken.token)
          isLoggedIn = true;
          userLoggedIn = inputUsername.value

     } else {
          console.log('login failed, status: ' + response.status)
     }
     welcomeUser.innerHTML = `Welcome ${userLoggedIn}!`


     updateLoginStatus()
})

btnLogout.addEventListener('click', () => {
     localStorage.removeItem(JWT_KEY)
     isLoggedIn = false;
     updateLoginStatus()
     userLoggedIn = 'Guest'
     welcomeUser.innerHTML = `Welcome ${userLoggedIn}!`

     console.log('You have logged out!')

})

// event.preventDefault()
// input-username & input-password toggle/ disabled when logged in

/* btnPostFruit.addEventListener('click', async () => {
     // skicka ett POST /api/friuits request ,data i request body
     // vad skickar servern för svar
     // UPPDATERA GRÄNSSNITTET

     const jwt = localStorage.getItem(JWT_KEY)

     const options = {
          method: 'POST',
          body: JSON.stringify(newFruit),
          headers: {
               'Content-Type': 'application/json',
               'Authorization': 'Bearer' + jwt
          }

          // headers behövs om man använder jwt
     }

     // TODO: Try Catch, så appen inte kraschar, det blir mer stabilt, fetch är en osäker operation
     const response = await fetch('api/fruits', options)

     if (response.status === 200) {
          getFruits()

     } else {
          console.log('Något gick fel vid POST request! status = ', response.status)
     }
}) */

/* const changedFruit = { name: "rasberry", price: 33 }

btnPutFruit.addEventListener('click', async () => {
     // skicka ett PUT request
     const response = await fetch('api/fruits/2');

     const options = {
          method: 'PUT',
          body: JSON.stringify(changedFruit),
          headers: {
               'Content-Type': 'application/json'
          }
     }

     if (response.status === 200) {
          getFruits()

     } else {
          console.log('Något gick fel vid POST request! status = ', response.status)
     }

})  */