import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from 'src/app/services/room/room.service';
import { tipo } from 'src/app/tipo';

@Component({
  selector: 'app-manage-room-form',
  templateUrl: './manage-room-form.component.html',
  styleUrls: ['./manage-room-form.component.scss']
})
export class ManageRoomFormComponent {

  formGroupRoom : FormGroup;
  isEditing : boolean = false;
  tipo = tipo;

  constructor (private formBuilder: FormBuilder,
              private roomService: RoomService,
              private route: ActivatedRoute,
              private router: Router){
    this.formGroupRoom = formBuilder.group({
      id: [''],
      type: ['', Validators.required],
      capacity: ['', Validators.required],
      number : ['', Validators.required]
    })
  }

  ionViewWillEnter(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if (!isNaN(id) && id !== 0) {
      this.getRoomById(id);
    }
  }


  getRoomById(id: number) {
    this.roomService.getRoom(id).subscribe({
      next: data => {
        this.formGroupRoom.setValue(data);
        this.isEditing = true;
      },
      error: err => {
        if (err.status === 404) {
          console.error('Curso não encontrado:', err);
        } else {
          console.error('Erro ao obter o curso:', err);
        }
      }
    });
  }

  save(){
      if(this.formGroupRoom.valid){
        if(this.isEditing){
          this.roomService.update(this.formGroupRoom.value).subscribe({
            next: () => {
              this.router.navigate(['manage-room']);
          }
        })
      }

      else {
        this.roomService.save(this.formGroupRoom.value).subscribe({
          next: () => {
            this.router.navigate(['manage-room']);
          }
        })
      }
    }
  }

  cancel(){
    this.router.navigate(['manage-room']);
  }

  get type() : any {
    return this.formGroupRoom.get("type");
  }

  get capacity() : any {
    return this.formGroupRoom.get("capacity");
  }

  get number() : any {
    return this.formGroupRoom.get('number');
  }

}
