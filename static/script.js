const channelsList = document.querySelector('.channels-container')
const channels = document.querySelectorAll('.channels')
const btnSendMessage = document.querySelector('#send-message')
const messageContainer = document.querySelector('.message-container')
const messageInput = document.querySelector('#message-input')

// if channelElement.innerText = channel.channelname 
/*   if (channel.channelName === channelElement.innerText){
       // lägg till message på channel???
  } */

async function getChannels() {
     let channelData = null;
     try {
          const response = await fetch('api/channels');
          channelData = await response.json();
          if (response.status !== 200) {
               console.log('Could not contact server. Status: ' + response.status)
               return
          } console.log('Data from server:', channelData)

     } catch (error) {
          console.log('Something went wrong when fetching data from the server. GET \n' +
               error.message)
          return
     }
     channelsList.innerHTML = '';
     updateLoginStatus()

     channelData.forEach(channel => {
          //console.log('channelData: ', channel.channelName)
          let channelElement = document.createElement('div');
          channelElement.classList = 'channels';
          channelElement.innerText = channel.channelName

          if (channel.status === 'private') {
               channelElement.innerText = channel.channelName + 'PRIVATE'
               if (isLoggedIn) {
                    channelElement.addEventListener('click', () => {
                         getMessages(channel.channelName)

                    })
               } else if (!isLoggedIn) {
                    channelElement.addEventListener('click', () => {
                         channelElement.innerText = channel.channelName + ' * Oops! Log in to see'
                    })
               }
          } else {
               channelElement.addEventListener('click', () => {
                    getMessages(channel.channelName)

               })

          }

          channelsList.appendChild(channelElement);
          //console.log(channelData)
          //console.log('Channelstatus:', channel.status)

     });
}

getChannels()

async function getMessages(name) {
     messageContainer.innerHTML = ''
     let messageData = null;
     const response = await fetch(`api/channels/${name}/messages`)
     messageData = await response.json()

     messageData.forEach(message => {
          console.log('Message text: ', message.text)
          showFetchedMessages(message.text)
     })
     console.log('MessageData from server:', messageData)

}

function showFetchedMessages(message) {

     let messageElement = document.createElement('div')
     messageElement.className = 'messages'
     messageElement.innerText = `${userLoggedIn} * ${message}`
     messageContainer.appendChild(messageElement)

}


// POST
async function postMessage() {
     const newMessage = {
          text: "mmmmmm",
          timeCreated: "01-10-2020",
          username: userLoggedIn
     }
     const options = {
          method: 'POST',
          body: JSON.stringify(newMessage),
          headers: {
               'Content-Type': 'application/json',
               //'Authorization': 'Bearer ' + jwt
          }
     }

     const response = await fetch(`api/channels/`)
     getMessages('animals')
     const messageData = await response.json()
     console.log('Status code: ', response.status, messageData)

}


btnSendMessage.addEventListener('click', postMessage)

function createMessage() {
     let messageElement = document.createElement('div')
     messageElement.className = 'messages'
     messageElement.innerText = messageInput.value
     messageContainer.appendChild(messageElement)

}




/* btnSendMessage.addEventListener('click', () => {
     let messageElement = document.createElement('div')
     messageElement.className = 'messages'
     messageElement.innerText = messageInput.value
     messageContainer.appendChild(messageElement)

     // console.log('Message input: ' + messageElement.innerText)

}) */



