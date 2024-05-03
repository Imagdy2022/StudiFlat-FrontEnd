import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthenticationService) {}
  ngOnInit(): void {
    this.requestPermission();
    this.listen();
  }
  title = 'StudiFlats';
  message: any = null;
  /*  requestPermission(){
    const messaging=getMessaging();
    getToken(messaging,{vapidKey:environment.firebase.vapidKey}).then(
      (currentToken)=>{
        if(currentToken){
          this.auth.FCMToken(currentToken).subscribe((response: any) => {});
        }
        else{
        }
      }
    )
  } */
  playAudio() {
    let audio = new Audio();
    audio.src = 'http://dev.studiflats.com/assets/bell.wav';

    let audio2: HTMLAudioElement = new Audio(
      'http://dev.studiflats.com/assets/bell.wav'
    );
    audio2.play();
  }
  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: environment.firebase.vapidKey })
      .then((currentToken) => {
        if (currentToken) {
          this.auth.FCMToken(currentToken).subscribe(
            (res) => {},
            (error) => {
              console.error('Error fetching owners:', error);
            }
          );
        } else {

        }
      })
      .catch((err) => {
      });
  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      this.message = payload;
      this.playAudio();
    });
  }
}
