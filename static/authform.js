const inputUsername = document.querySelector('#input-username')
const inputPassword = document.querySelector('#input-password')
const btnLogin = document.querySelector('#btn-login')
const btnLogout = document.querySelector('#btn-logout')
const btnSignUp = document.querySelector('#btn-sign-up')

// TODO:
// Gör fetch med POST metod för att registrera ny användare

// AUTHENTICATION
// Används i localStorage
const JWT_KEY = 'chat-api-jwt'
let isLoggedIn = false;


function updateLoginStatus() {
     btnLogin.disabled = isLoggedIn;
     btnLogout.disabled = !isLoggedIn;
}



btnLogin.addEventListener('click', async () => {
     // hämta username och password
     // skicka med post request till servern
     // när servern svarar:
     // - uppdatera gränssnittet
     // - spara jwt i localStorage
     const user = {
          username: inputUsername.value,
          password: inputPassword.value
     }
     // optimistisk kod =) LÄGG TILL TRY CATCH
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
          // spara usertoken.token
          localStorage.setItem(JWT_KEY, userToken.token)
          isLoggedIn = true;
     } else {
          console.log('login failed, status: ' + response.status)
     }

     updateLoginStatus()
})

// event.preventDefault()

// TODO:
// fixa registerknapp, /ha samma form??
// hårdkoda messages
// 
// input-username & input-password toggle/ disabled when logged in



/* btnGetFruits.addEventListener('click', getFruits)

const newFruit = { name: "strawberry", price: 44, id: 42 }

btnPostFruit.addEventListener('click', async () => {
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

// Funktion för put ??

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