// Classes
// heading
// Channels
// channels selected
// Skapa element för dessa klasser (alla kanaler på vänstersidan)

// fetch för get channels, funktion för skapa nya kanaler

const channelsList = document.querySelector(".channels-container")

async function getChannels() {
     let channelData = null;
     try {
          const response = await fetch('api/channels');
          channelData = await response.json();
          if (response.status !== 200) {
               console.log('Could not contact server. Status: ' + response.status)
               return
          }

          console.log('Data från server:', channelData)

          // Så fort något går fel så hoppar man till catch
     } catch (error) {
          console.log('Something went wrong when fetching data from the server. GET \n' +
               error.message)
          return
     }
     //channelsList.innerHTML = '';

     channelData.forEach(channel => {
          console.log('channelData: ', channel.channelName)
          let div = document.createElement('div');
          div.classList = "channels";
          div.innerText = channel.channelName
          channelsList.appendChild(div);
     });
}

getChannels()
