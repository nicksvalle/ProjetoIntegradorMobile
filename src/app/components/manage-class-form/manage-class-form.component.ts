import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/interfaces/curso';
import { Room } from 'src/app/interfaces/room';
import { Teacher } from 'src/app/interfaces/teacher';
import { ClassService } from 'src/app/services/class/class.service';
import { ManageCourseService } from 'src/app/services/curso/manage-course.service';
import { ManageTeacherService } from 'src/app/services/professor/manage-teacher.service';
import { RoomService } from 'src/app/services/room/room.service';

@Component({
  selector: 'app-manage-class-form',
  templateUrl: './manage-class-form.component.html',
  styleUrls: ['./manage-class-form.component.scss']
})
export class ManageClassFormComponent {
  formGroupClass : FormGroup;
  isEditing : boolean = false;
  teachers: Teacher[] = [];
  courses: Course[] = [];
  rooms: Room[] = [];

  constructor (private formBuilder: FormBuilder,
              private classService: ClassService,
              private route: ActivatedRoute,
              private router: Router,
              private manageTeacherService: ManageTeacherService,
              private manageCourseService: ManageCourseService,
              private roomService: RoomService){
    this.formGroupClass = formBuilder.group({
      id: [''],
      date: ['', [Validators.required, this.dateTimeValidator.bind(this)]],
      room: ['', Validators.required],
      teacher: ['', Validators.required],
      discipline: ['', Validators.required],
      course: ['', Validators.required]
    })
  }

  ionViewWillEnter(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if (!isNaN(id) && id !== 0) {
      this.getClassById(id);
    }

    this.loadTeachers();
    this.loadCourses();
    this.loadRooms();
  }

  loadTeachers() {
    this.manageTeacherService.getTeacher().subscribe((teachers) => {
      this.teachers = teachers;
    });
  }

  loadCourses() {
    this.manageCourseService.getCourses().subscribe((courses) => {
      this.courses = courses;
    });
  }

  loadRooms() {
    this.roomService.getRooms().subscribe((rooms) => {
      this.rooms = rooms.map(room => ({ type: room.type, number: room.number }));
    });
  }

  getClassById(id: number) {
    this.classService.getClass(id).subscribe({
      next: data => {
        this.formGroupClass.setValue(data);
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
    console.log('Formulário válido:', this.formGroupClass.valid);
    console.log('Formulário:', this.formGroupClass.value);
      if(this.formGroupClass.valid){
        if(this.isEditing){
          this.classService.update(this.formGroupClass.value).subscribe({
            next: () => {
              this.router.navigate(['manage-class']);
          }
        })
      }

      else {
        this.classService.save(this.formGroupClass.value).subscribe({
          next: () => {
            this.router.navigate(['manage-class']);
          }
        })
      }
    }
  }

  cancel(){
    this.router.navigate(['manage-class']);
  }

  dateTimeValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;

    if (!value) {
      return { 'required': true };
    }

    // Verificar se a data está no formato YYYY-MM-DDTHH:mm
    const isValidFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value);

    if (!isValidFormat) {
      return { 'invalidFormat': true };
    }

    return null;
  }

  get date() : any {
    return this.formGroupClass.get("date");
  }

  get room() : any {
    return this.formGroupClass.get("room");
  }

  get discipline() : any {
    return this.formGroupClass.get("discipline");
  }

  get teacher() : any {
    return this.formGroupClass.get("teacher");
  }

  get course() : any {
    return this.formGroupClass.get("course");
  }

}
