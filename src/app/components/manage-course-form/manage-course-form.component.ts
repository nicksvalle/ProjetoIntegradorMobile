import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageCourseService } from '../../services/curso/manage-course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageTeacherService } from '../../services/professor/manage-teacher.service';
import { Teacher } from '../../interfaces/teacher';
import { periodo } from '../../periodo'

@Component({
  selector: 'app-manage-course-form',
  templateUrl: './manage-course-form.component.html',
  styleUrls: ['./manage-course-form.component.scss']
})
export class ManageCourseFormComponent {

  formGroupCourse : FormGroup;
  isEditing : boolean = false;
  teachers: Teacher[] = [];
  periodo = periodo;

  constructor (private formBuilder: FormBuilder,
              private courseService: ManageCourseService,
              private route: ActivatedRoute,
              private router: Router,
              private manageTeacherService: ManageTeacherService){
    this.formGroupCourse = formBuilder.group({
      id: [''],
      title: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
      discipline: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
      course: ['', Validators.required],
      acronym: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
      teacher: ['', Validators.required],
      period: ['', Validators.required]
    })
  }

  ionViewWillEnter(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if (!isNaN(id) && id !== 0) {
      this.getCourseById(id);
    }

    this.loadTeachers();
  }

  loadTeachers() {
    this.manageTeacherService.getTeacher().subscribe((teachers) => {
      this.teachers = teachers;
    });
  }

  getCourseById(id: number) {
    this.courseService.getCourse(id).subscribe({
      next: data => {
        this.formGroupCourse.setValue(data);
        this.isEditing = true;
      },
      error: err => {
        if (err.status === 404) {
          console.error('Curso não encontrado:', err);
          // Adicione aqui a lógica para redirecionar para uma página de erro ou exibir uma mensagem amigável ao usuário.
        } else {
          console.error('Erro ao obter o curso:', err);
          // Tratamento para outros erros, se necessário.
        }
      }
    });
  }

  save(){
      if(this.formGroupCourse.valid){
        if(this.isEditing){
          this.courseService.update(this.formGroupCourse.value).subscribe({
            next: () => {
              this.router.navigate(['manage-course']);
          }
        })
      }

      else {
        this.courseService.save(this.formGroupCourse.value).subscribe({
          next: () => {
            this.router.navigate(['manage-course']);
          }
        })
      }
    }
  }

  cancel(){
    this.router.navigate(['manage-course']);
  }

  get title() : any {
    return this.formGroupCourse.get("title");
  }

  get discipline() : any {
    return this.formGroupCourse.get("discipline");
  }

  get course() : any {
    return this.formGroupCourse.get("course");
  }

  get teacher() : any {
    return this.formGroupCourse.get("teacher");
  }

  get period() : any {
    return this.formGroupCourse.get("period");
  }

  get acronym() : any {
    return this.formGroupCourse.get('acronym');
  }

}
