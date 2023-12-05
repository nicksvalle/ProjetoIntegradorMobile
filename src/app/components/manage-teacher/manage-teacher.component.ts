import { Component } from '@angular/core';
import { Teacher } from '../../interfaces/teacher';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ManageTeacherService } from '../../services/professor/manage-teacher.service';
import { materias } from '../../materias';

@Component({
  selector: 'app-manage-teacher',
  templateUrl: './manage-teacher.component.html',
  styleUrls: ['./manage-teacher.component.scss']
})
export class ManageTeacherComponent {
  teacher: Teacher[] = [];
  isEditing: boolean = false;
  formGroupClient: FormGroup;
  materias: any[] = [];
  cursos: string[] = ['DS', 'ADM'];
  cursosSelecionados: any [] = [];

  constructor(private manageTeacher: ManageTeacherService, private formBuilder: FormBuilder) {
    this.formGroupClient = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
      email: ['', [Validators.required, Validators.email]],
      course: ['', Validators.required],
      date: ['', Validators.required],
      materia: ['', Validators.required]
    });
  }

  ionViewWillEnter(): void {
    this.onChangeCurso();
    this.loadTeacher();
  }

  onChangeCurso() {
    const selectedCourses = this.formGroupClient.get('course')?.value;
    if (selectedCourses && selectedCourses.length > 0) {
      this.materias = materias.filter(materia => selectedCourses.includes(materia.curso));
    } else {
      this.materias = [];
    }
  }

  loadTeacher() {
    this.manageTeacher.getTeacher().subscribe({
      next: data => {
        this.teacher = data;

        const selectedCourse = this.formGroupClient.get('course')?.value;
        if (selectedCourse) {
          this.materias = materias.filter(materia => materia.curso === selectedCourse);
        }
      }
    });
  }

  save() {
    console.log('Formulário válido:', this.formGroupClient.valid);
    if (this.isEditing) {
      this.manageTeacher.update(this.formGroupClient.value).subscribe({
        next: () => {
          this.loadTeacher();
          this.formGroupClient.reset();
          this.isEditing = false;
        }
      });
    } else {
      const formValues = this.formGroupClient.value;
      formValues.course = Array.isArray(formValues.course) ? formValues.course : [formValues.course];
      formValues.materia = Array.isArray(formValues.materia) ? formValues.materia : [formValues.materia];

      this.manageTeacher.save(formValues).subscribe({
        next: data => {
          this.teacher.push(data);
          this.formGroupClient.reset();
          this.formGroupClient.get('course')?.setValue('');
          this.formGroupClient.get('materia')?.setValue('');
          this.onChangeCurso();
        }
      });
    }
  }

  clean() {
    this.formGroupClient.reset();
    this.formGroupClient.get('course')?.setValue([]);
    this.formGroupClient.get('materia')?.setValue([]);
    this.onChangeCurso();
    this.isEditing = false;
  }

  edit(teacher: Teacher) {
    console.log('Teacher:', teacher);

    this.isEditing = true;

    this.formGroupClient.patchValue(teacher);

    const selectedCourse = this.formGroupClient.get('course')?.value;
    console.log('Selected Course:', selectedCourse);

    if (selectedCourse) {
      const selectedCourseValue = Array.isArray(selectedCourse) ? selectedCourse[0] : selectedCourse;
      this.materias = materias.filter(materia => materia.curso === selectedCourseValue);
      console.log('Filtered Materias:', this.materias);
    }
  }

  delete(teacher: Teacher) {
    this.manageTeacher.delete(teacher).subscribe({
      next: () => this.loadTeacher()
    });
  }



  get name() {
    return this.formGroupClient.controls['name'];
  }

  get email() {
    return this.formGroupClient.controls['email'];
  }

  get date() {
    return this.formGroupClient.controls['date'];
  }

  get materia() {
    return this.formGroupClient.controls['materia'];
  }

  get course() {
    return this.formGroupClient.controls['course'];
  }
}
