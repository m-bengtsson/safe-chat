const inputUsername = document.querySelector('#input-username')
const inputPassword = document.querySelector('#input-password')
const btnLogin = document.querySelector('#btn-login')
const btnLogout = document.querySelector('#btn-logout')



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


// input-username & input-password toggle/ disabled when logged in



/* async function getFruits() {
     // skicka iett request till backend: GET /api/fruits
     // backend skickar tillbaka lista med frukter
     // Spara data i en variabel för att använda i frontend
     // rendera dom element som innehåll

     // Skicka request med AJAX, ett enkelt GET-request behöver inga inställningar
     let fruitData = null;

     // Tänk på att alltid göra pessimistisk kod
     try {
          const response = await fetch('api/fruits');
          fruitData = await response.json();
          if (response.status !== 200) {
               console.log('Could not contact server. Status: ' + response.status)
               return
          }

          console.log('Data från server:', fruitData)

          // Så fort något går fel så hoppar man till catch
     } catch (error) {
          console.log('Something went wrong when fetching data from the server. GET \n' +
               error.message)
          return
     }

     fruitList.innerHTML = '';

     fruitData.forEach(fruit => {
          // skapa ett <li> element
          // fyll elementent med fruitData
          // lägg till sist i ul elementet

          console.log('Fruitdata: ', fruit.name)
          let li = document.createElement('li');
          li.innerText = `fruit: ${fruit.name} price: ${fruit.price}`
          fruitList.appendChild(li);
     });
}


btnGetFruits.addEventListener('click', getFruits)

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
})

// Funktion för put ??

const changedFruit = { name: "rasberry", price: 33 }

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

}) */