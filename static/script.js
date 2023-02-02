const channelsList = document.querySelector('.channels-container')
const channels = document.querySelectorAll('.channels')
const btnSendMessage = document.querySelector('#send-message')
const messageContainer = document.querySelector('.message-container')
const messageInput = document.querySelector('#message-input')

getChannels()

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
     console.log('script.js channelData foreach')

     channelData.forEach(channel => {
          //console.log('channelData: ', channel.channelName)
          let channelElement = document.createElement('div');
          channelElement.classList = 'channels';
          channelElement.innerText = channel.channelName

          if (channel.status === 'private') {
               channelElement.innerText = 'PRIVATE * ' + channel.channelName

               channelElement.addEventListener('click', () => {
                    if (isLoggedIn) {
                         getMessages(channel.channelName)
                         console.log('1 PRIVATE CHANNEL * Logged in?: ', isLoggedIn)
                         channelElement.innerText = channel.channelName
                    } else {
                         console.log('2 PRIVATE CHANNEL * Logged in?: ', isLoggedIn)
                         channelElement.innerText = channel.channelName + ' * Oops! Log in to see'
                    }
               })
          } else {
               channelElement.addEventListener('click', () => {
                    getMessages(channel.channelName)
                    console.log(' PUBLICH CHANNEL * Logged in?: ', isLoggedIn)

               })
          }
          channelsList.appendChild(channelElement);

          //console.log('Channel data from server: 'channelData)
          //console.log('Channel private or public?: ', channel.status)
     });
}


async function getMessages(name) {
     messageContainer.innerHTML = ''
     let messageData;
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
     const jwt = localStorage.getItem(JWT_KEY)
     let messageData;

     const newMessage = {
          text: messageInput.value,
          timeCreated: "01-10-2020",
          username: userLoggedIn
     }
     const options = {
          method: 'POST',
          body: JSON.stringify(newMessage),
          headers: {
               'Content-Type': 'application/json',
               'Authorization': 'Bearer ' + jwt
          }
     }
     const response = await fetch(`/api/channels/animals/`, options)
     messageData = await response.json()
     console.log('type of messagedata', '"' + messageData + '"', typeof messageData)
     if (response.status === 200) {
          console.log('it worked')
     }

     console.log('Status code: ', response.status)
     console.log('new message ', newMessage)
     console.log('Data from backend ', messageData)

}


btnSendMessage.addEventListener('click', postMessage)

function createMessage() {
     let messageElement = document.createElement('div')
     messageElement.className = 'messages'
     messageElement.innerText = messageInput.value
     messageContainer.appendChild(messageElement)

}



