import {Injectable} from '@angular/core';
import {Exercise} from './exercise.model';
import {Subject, Subscription} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {UIService} from '../../shared/u-i.service';


@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private availableExercise: Exercise[] = [];
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private runningExercise: Exercise;
  private trainingSubs: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UIService) {
  }

  getExercise() {
    this.trainingSubs.push(this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map(doc => {
          const id = doc.payload.doc.id;
          const data = doc.payload.doc.data();
          return {id, ...data};
        });
      }))
      .subscribe((exercises: Exercise[]) => {
        this.availableExercise = exercises;
        this.exercisesChanged.next([...this.availableExercise]);
        this.uiService.loadingStateChanged.next(false);
      }, error => {
        this.uiService.showSnackBar('Fetching Exercise failed!', null, 3000);
        this.exercisesChanged.next(null);
      }));
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercise.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({...this.runningExercise});
  }

  getRunningExercise() {
    return {...this.runningExercise};
  }

  completeExercise() {
    this.addDataToFirebase({...this.runningExercise, date: new Date(), state: 'complete'});
  }

  cancelExercise(progress: number) {
    this.addDataToFirebase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      date: new Date(),
      state: 'cancelled',
      calories: this.runningExercise.calories * (progress / 100)
    });
  }

  getCompleteOrCancelledExercise() {
    this.trainingSubs.push(this.db.collection('finishedExercises').valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.uiService.loadingStateChanged.next(false);
        this.finishedExercisesChanged.next(exercises);
      }));
  }

  private addDataToFirebase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise)
      .then(() => {
        this.runningExercise = null;
        this.exerciseChanged.next(null);
      })
      .catch(err => console.log(err));

  }

  unsubscribeTrainingSub() {
    this.trainingSubs.forEach(sub => sub.unsubscribe());
  }
}
