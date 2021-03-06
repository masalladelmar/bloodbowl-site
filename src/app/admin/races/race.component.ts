import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Race, PostRace } from 'src/app/models/race.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonsService } from 'src/app/services/commons.service';
import { RacesService } from 'src/app/services/races.service';
import { forkJoin } from 'rxjs';
import { PositionsService } from 'src/app/services/positions.service';
import { Position } from '../../models/position.model';
import { PositionComponent } from '../positions/position.component';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { SkillTypes, Skill } from 'src/app/models/skill.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SkillsService } from 'src/app/services/skills.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss'],
})
export class RaceComponent implements OnInit {
  race: Race;
  raceform: FormGroup;
  race_id: string;
  title: string;
  positions: Position[];
  modalRef: BsModalRef;
  skills: Skill[];
  fileToUpload: File = null;
  imgURL: string | ArrayBuffer;

  constructor(
    private racesService: RacesService,
    private positionsService: PositionsService,
    private route: ActivatedRoute,
    private commonsService: CommonsService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private skillsService: SkillsService,
    public helperService: HelperService
  ) {
    this.raceform = this.fb.group({
      name: ['', Validators.required],
      reroll_cost: ['', Validators.required],
      description: [''],
      coat_arms: ['', Validators.required],
      apothecary: [''],
    });
  }

  ngOnInit() {
    this.race_id = this.route.snapshot.paramMap.get('race');
    if (this.race_id !== 'new') {
      this.title = 'Editar';
      this.commonsService.setLoading(true);
      forkJoin(
        this.racesService.getRace(this.race_id),
        this.positionsService.getAll(Number(this.race_id)),
        this.skillsService.getSkills()
      ).subscribe(
        response => {
          this.race = response[0];
          this.raceform.get('name').setValue(this.race.name);
          this.raceform.get('reroll_cost').setValue(this.race.reroll_cost);
          this.raceform.get('description').setValue(this.race.description);
          this.raceform.get('coat_arms').setValue(this.race.coat_arms);
          this.raceform.get('apothecary').setValue(this.race.apothecary);

          this.positions = response[1];
          this.skills = response[2];
          this.commonsService.setLoading(false);
        },
        error => {
          this.commonsService.handleError(
            error, 'Se ha producido un error al recuperar los datos de la raza'
          );
          this.commonsService.setLoading(false);
        }
      );
    } else {
      this.title = 'Nueva';
      this.positions = [];
    }
  }

  getTypesSelected(types: string): string {
    let out = '';
    const divided = types.split(',');
    divided.forEach(sk => {
      const finded = SkillTypes.find(el => el.link === sk);
      if (finded) {
        out += (out === '' ? '' : ', ') + finded.short;
      }
    });

    return out;
  }

  get name() {
    return this.raceform.get('name');
  }
  get reroll_cost() {
    return this.raceform.get('reroll_cost');
  }
  get description() {
    return this.raceform.get('description');
  }
  get coat_arms() {
    return this.raceform.get('coat_arms');
  }
  get apothecary() {
    return this.raceform.get('apothecary');
  }

  addPosition() {
    this.modalPosition(null);
  }

  editPosition(position: Position) {
    this.modalPosition(position);
  }

  private modalPosition(position: Position) {
    const initialState = {
      position: position,
      race_id: this.race_id,
      skills: this.skills,
    };
    this.modalRef = this.modalService.show(PositionComponent, {
      initialState,
      class: 'modal-lg',
    });
    const modalSubs$ = this.modalService.onHide.subscribe((reason: string) => {
      if (this.modalRef.content.resolve === true) {
        this.positionsService.getAll(Number(this.race_id)).subscribe(
          data => {
            this.positions = data;
          },
          error => {
            this.commonsService.handleError(
              error, 'Se ha producido un error al recuperar las posiciones'
            );
            this.commonsService.setLoading(false);
          }
        );
      }
      modalSubs$.unsubscribe();
    });
  }

  deletePosition(position: Position) {
    const initialState = {
      bodyText: `¿Seguro que quieres eliminar la posición '${position.name}'?`,
    };
    this.modalRef = this.modalService.show(ConfirmationModalComponent, {
      initialState,
      class: 'modal-sm',
    });
    const modalSubs$ = this.modalService.onHide.subscribe((reason: string) => {
      if (this.modalRef.content.resolve === true) {
        this.positionsService.delete(position).subscribe(
          data => {
            this.commonsService.handleSuccess('Posición eliminada');
            this.updatePositions();
          },
          error => {
            this.commonsService.handleError(
              error, 'Se ha producido un error al eliminar la posición'
            );
            this.commonsService.setLoading(false);
          }
        );
      }
      modalSubs$.unsubscribe();
    });
  }

  positionUp(position: Position) {
    if (position.order === 1) {
      this.commonsService.handleError('No se puede mover a una posición superior');
    } else {
      // Mover hacia arriba la posición en la lista
      const order_array = [];
      this.positions.forEach(el => {
        if (el.id === position.id) {
          order_array.push({ id: el.id, order: el.order - 1 });
        } else {
          if (el.order === position.order - 1) {
            order_array.push({ id: el.id, order: el.order + 1 });
          } else {
            order_array.push({ id: el.id, order: el.order });
          }
        }
      });
      this.saveOrder(order_array);
    }
  }

  positionDown(position: Position) {
    if (position.order === this.positions.length) {
      this.commonsService.handleError('No se puede mover a una posición inferior');
    } else {
      // Mover hacia abajo la posición en la lista
      const order_array = [];
      this.positions.forEach(el => {
        if (el.id === position.id) {
          order_array.push({ id: el.id, order: el.order + 1 });
        } else {
          if (el.order === position.order + 1) {
            order_array.push({ id: el.id, order: el.order - 1 });
          } else {
            order_array.push({ id: el.id, order: el.order });
          }
        }
      });
      this.saveOrder(order_array);
    }
  }

  private updatePositions() {
    this.positionsService.getAll(Number(this.race_id)).subscribe(
      data => this.positions = data
    );
  }

  private saveOrder(array: any[]) {
    this.commonsService.setLoading(true);
    this.positionsService.order(this.race.id, array).subscribe(
      response => {
        this.commonsService.handleSuccess('Orden guardado');
        this.updatePositions();
        this.commonsService.setLoading(false);
      },
      error => {
        this.commonsService.handleError(
          error, 'Se ha producido un error al guardar el orden'
        );
        this.commonsService.setLoading(false);
      }
    );
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    const reader = new FileReader();
    this.commonsService.setLoading(true);
    reader.readAsDataURL(this.fileToUpload);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.commonsService.setLoading(false);
    };
  }

  onSubmit() {
    if (this.raceform.valid) {
      this.commonsService.setLoading(true);
      const postRace: PostRace = {
        name: this.raceform.get('name').value,
        reroll_cost: this.raceform.get('reroll_cost').value,
        description: this.raceform.get('description').value,
        file: this.imgURL,
        filename: this.fileToUpload.name,
        apothecary: this.raceform.get('apothecary').value,
      };

      if (this.race_id === 'new') {
        this.racesService.create(postRace).subscribe(
          response => {
            this.commonsService.handleSuccess('Raza creada');
            this.commonsService.setLoading(false);
            this.router.navigate(['/admin/races']);
          },
          error => {
            this.commonsService.handleError(
              error, 'Se ha producido un error al crear la raza'
            );
            this.commonsService.setLoading(false);
          }
        );
      } else {
        this.racesService.update(Number(this.race_id), postRace).subscribe(
          response => {
            this.commonsService.handleSuccess('Raza actualizada');
            this.commonsService.setLoading(false);
            this.router.navigate(['/admin/races']);
          },
          error => {
            this.commonsService.handleError(
              error, 'Se ha producido un error al actualizar la raza'
            );
            this.commonsService.setLoading(false);
          }
        );
      }
    }
  }
}
