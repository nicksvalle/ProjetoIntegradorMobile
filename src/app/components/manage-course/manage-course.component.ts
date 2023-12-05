import { Component, OnInit } from '@angular/core';
import { ManageCourseService } from '../../services/curso/manage-course.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from '../../interfaces/curso';

@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.scss']
})
export class ManageCourseComponent implements OnInit{

  courses : Course[] = [];
  isEditing : boolean = false;

  constructor (private courseService: ManageCourseService,  private formBuilder : FormBuilder, private router: Router){

  }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe(
      {
          next : data => this.courses = data
      }
    );
  }


 create(){
  this.router.navigate(['createCourse'])
 }

  edit(course : Course){
    this.router.navigate(['manage-courseDetails', course.id])
  }

  delete(course : Course){
    this.courseService.delete(course).subscribe({
      next: () => this.loadCourses()
    })
  }


}
