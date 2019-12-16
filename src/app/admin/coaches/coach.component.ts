import { Component, OnInit } from '@angular/core';
import { CoachesService } from 'src/app/services/coaches.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonsService } from 'src/app/services/commons.service';
import { Coach } from 'src/app/models/coach.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.scss']
})
export class CoachComponent implements OnInit {
  coach: Coach;
  coachform: FormGroup;
  coach_id: string;
  title: string;

  constructor(
    private coachesService: CoachesService,
    private route: ActivatedRoute,
    private commonsService: CommonsService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.coachform = this.fb.group({
      name: ['', Validators.required]
    });
    this.commonsService.setLoading(true);
    this.coach_id = this.route.snapshot.paramMap.get('coach');
    if (this.coach_id !== 'new') {
      this.title = 'Editar';
      this.coachesService.getCoach(this.coach_id).subscribe(
        response => {
          this.coach = response;
          this.coachform.get('name').setValue(this.coach.name);
        }
      );
    } else {
      this.title = 'Nuevo';
    }
  }

  ngOnInit() {
  }

  get name() {
    return this.coachform.get('name');
  }

  onSubmit() {
    if (this.coachform.valid) {
      if (this.coach_id === 'new') {
        this.coachesService.create(this.coachform.get('name').value).subscribe(
          response => {
            this.commonsService.handleSuccess('Entrenador creado');
            this.commonsService.setLoading(false);
            this.router.navigate(['/admin/coaches']);
          },
          error => {
            this.commonsService.handleError(error, 'Se ha producido un error al crear el entrenador');
            this.commonsService.setLoading(false);
          }
        );
      } else {
        this.coachesService.update(this.coachform.get('name').value, Number(this.coach_id)).subscribe(
          response => {
            this.commonsService.handleSuccess('Entrenador actualizado');
            this.commonsService.setLoading(false);
            this.router.navigate(['/admin/coaches']);
          },
          error => {
            this.commonsService.handleError(error, 'Se ha producido un error al actualizar el entrenador');
            this.commonsService.setLoading(false);
          }
        );
      }
    } else {
      this.commonsService.handleError('Debes rellenar el nombre');
    }
  }
}
