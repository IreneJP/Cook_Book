import { Component, OnInit } from '@angular/core';
import { LessonServiceService } from 'src/app/shared/lesson-service.service';
import { UserService } from 'src/app/shared/user.service';
import { Lessons } from "../../models/lessons"
import { User } from '../../models/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-classes',
  templateUrl: './user-classes.component.html',
  styleUrls: ['./user-classes.component.scss']
})
export class UserClassesComponent implements OnInit {
  public lesson :Lessons [];
  public lessons: Lessons[];
  public profile: User;
  public allMyLessons: Lessons []
  public animation: boolean;
  public eliminar

  constructor(private apiService: LessonServiceService, private userService: UserService,  private router: Router) {
    this.apiService.lesson
    this.animation = false;
   }
   


  popUp(lesson_id) {
    this.eliminar = lesson_id

    if ( document.getElementById('delete-window').style.visibility === 'visible') {
        document.getElementById('delete-window').style.visibility = 'hidden';
        this.animation = false;
    } else {
        document.getElementById('delete-window').style.visibility = 'visible';
        document.getElementById('edit-profile').style.opacity = '1';
        this.animation = true;
    }
  }


  showProfile(){
    this.profile = this.userService.userProfile;
    console.log(this.profile)
  }

  showLesson(lesson_id){
    this.lesson = this.lessons.filter(lesson => lesson.lesson_id === lesson_id);
    
    this.apiService.lesson = this.lesson;
    console.log("showLesson", this.lesson)
    this.router.navigate(["/", "lesson"])
  }

  userLessons(){
      this.apiService.getUserLessons(this.userService.userProfile.user_id).subscribe((data:Lessons[])=> {
        console.log("allMyLessons",data)
        return this.lessons = data;
        
        });
  }


  deleteLesson(){

    this.apiService.removeLesson(this.eliminar).subscribe(data => this.ngOnInit());
     
  }

  ngOnInit(): void {
    this.showProfile();
    this.userLessons();
      //this.obtainLessons()
  }


  

}
