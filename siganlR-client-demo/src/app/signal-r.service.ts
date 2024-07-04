import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr'

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor() { }


  hubConnection!: signalR.HubConnection;

  startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7036/toostr',{
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets   // it is important for CORS Issues, and make it faster.
    })
    .build();

    this.hubConnection
    .start()
    .then(() => {
      console.log('Connection started');
    })
    .catch(err => console.log('Error while starting connection: '+ err))
  }

  askServer() {
    this.hubConnection.invoke('AskServer','hey')
    .catch(err => console.error(err));
  }

  askServerListener() {
    this.hubConnection.on("askServerResponse",(someText) => {
      console.log(someText);
    })
  }
}
