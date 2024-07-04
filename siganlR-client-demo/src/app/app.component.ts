import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignalRService } from './signal-r.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'signalR-client-demo';
  //siganl
  constructor(private signalRService: SignalRService){

  }

  ngOnInit(): void {
    this.signalRService.startConnection();

    setTimeout(() => {
      this.signalRService.askServerListener();
      this.signalRService.askServer();
    }, 2000);
  }

  ngOnDestroy(): void {
    this.signalRService.hubConnection.off('askServerResponse')
  }
}
