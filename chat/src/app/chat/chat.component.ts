import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messagecontent:string=""
  message : string[] = []
  ioConnection : any

  constructor(private socketService : SocketService) { }

  ngOnInit() {
    this.initIOConnection()
  }

  private initIOConnection(){
    this.socketService.initSocket()
    this.ioConnection = this.socketService.onMessage().subscribe((message : string) => {
      this.message.push(message)
      console.log(message)
    })

  }

  private chat(){
    if (this.messagecontent){
      this.socketService.send(this.messagecontent)
      this.messagecontent = null
    }else{
      console.log("no message")
    }
    
  }

}
