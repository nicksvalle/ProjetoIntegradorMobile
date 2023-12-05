import { ClassService } from 'src/app/services/class/class.service';

import { Router } from '@angular/router';
import { Class } from 'src/app/interfaces/class';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-manage-class',
  templateUrl: './manage-class.component.html',
  styleUrls: ['./manage-class.component.scss']
})
export class ManageClassComponent {
  classes : Class[] = [];
  isEditing : boolean = false;

  constructor (private classService: ClassService,  private formBuilder : FormBuilder, private router: Router){

  }
  ionViewWillEnter() {
    this.loadClasses();
  }

  loadClasses() {
    this.classService.getClasses().subscribe(
      {
          next : data => this.classes = data
      }
    );
  }


 create(){
  this.router.navigate(['createClass'])
 }

  edit(classe : Class){
    this.router.navigate(['manage-classDetails', classe.id])
  }

  delete(classe : Class){
    this.classService.delete(classe).subscribe({
      next: () => this.loadClasses()
    })
  }
}
