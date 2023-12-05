import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Room } from 'src/app/interfaces/room';
import { RoomService } from 'src/app/services/room/room.service';

@Component({
  selector: 'app-manage-room',
  templateUrl: './manage-room.component.html',
  styleUrls: ['./manage-room.component.scss']
})
export class ManageRoomComponent {
  rooms : Room[] = [];
  isEditing : boolean = false;

  constructor (private roomService: RoomService,  private formBuilder : FormBuilder, private router: Router){

  }

  ionViewWillEnter(): void {
    this.loadRooms();
  }

  loadRooms() {
    this.roomService.getRooms().subscribe(
      {
          next : data => this.rooms = data
      }
    );
  }


 create(){
  this.router.navigate(['createRoom'])
 }

  edit(room : Room){
    this.router.navigate(['manage-roomDetails', room.id])
  }

  delete(room : Room){
    this.roomService.delete(room).subscribe({
      next: () => this.loadRooms()
    })
  }


}
