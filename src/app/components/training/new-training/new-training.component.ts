import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingService} from '../training.service';
import {NgForm} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {Exercise} from '../exercise.model';
import {UIService} from '../../../shared/u-i.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises: Exercise[] = [];
  exerciseSubscription: Subscription;
  private isLoadingSubscription: Subscription;
  isLoading = false;
  diameter = 25;

  constructor(private trainingService: TrainingService, private uiService: UIService) {
  }

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => {
      this.exercises = exercises;
    });
    this.isLoadingSubscription
      = this.uiService
      .loadingStateChanged
      .subscribe(isLoading => {
        this.isLoading = isLoading;
      });
    this.fetchExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
    this.isLoadingSubscription.unsubscribe();
  }

  fetchExercises() {
    this.trainingService.getExercise();
  }
}
