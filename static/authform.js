const inputUsername = document.querySelector('#input-username')
const inputPassword = document.querySelector('#input-password')
const btnLogin = document.querySelector('#btn-login')
const btnLogout = document.querySelector('#btn-logout')
const btnSignUp = document.querySelector('#btn-sign-up')
const welcomeUser = document.querySelector('.welcome-user')

// Global variables
const JWT_KEY = 'chat-api-jwt'
let isLoggedIn = false;
let userLoggedIn = 'Guest'

isAuthorized()

// Update interface for buttons if user is logged in
function updateLoginStatus() {
     btnLogin.disabled = isLoggedIn;
     btnLogout.disabled = !isLoggedIn;
}

// Get jwt token from local strorage and send if user is logged in
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
               return
          }
          const decoded = await response.json()
          if (response.status === 200) {
               isLoggedIn = true
               userLoggedIn = decoded.username
          }
          welcomeUser.innerHTML = `Welcome ${userLoggedIn}!`

     } catch (error) {
          return
     }
     updateLoginStatus()
}


// Register user click event
btnSignUp.addEventListener('click', async () => {

     const newUser = {
          username: inputUsername.value,
          password: inputPassword.value
     }
     const options = {
          method: 'POST',
          body: JSON.stringify(newUser),
          headers: {
               'Content-Type': "application/json"
          }
     }
     const response = await fetch('/api/users', options)

     if (response.status === 200) {
          const users = await response.json()
          welcomeUser.innerHTML = 'Please login to verify your signup :)'

     } else {
          welcomeUser.innerHTML = 'Please choose a unique username!'
     }

})

// Login user 
btnLogin.addEventListener('click', async () => {

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
          localStorage.setItem(JWT_KEY, userToken.token)
          isLoggedIn = true;
          userLoggedIn = inputUsername.value
          welcomeUser.innerHTML = `Welcome ${userLoggedIn}!`

     } else {
          console.log('login failed, status: ' + response.status)
     }
     updateLoginStatus()

})

// Log out user
btnLogout.addEventListener('click', () => {
     getChannels()
     messageContainer.innerHTML = ''
     localStorage.removeItem(JWT_KEY)
     isLoggedIn = false;
     userLoggedIn = 'Guest'
     welcomeUser.innerHTML = `Welcome ${userLoggedIn}!`
     updateLoginStatus()
})