import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConductor } from 'app/shared/model/conductor.model';

@Component({
  selector: 'jhi-conductor-detail',
  templateUrl: './conductor-detail.component.html'
})
export class ConductorDetailComponent implements OnInit {
  conductor: IConductor;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ conductor }) => {
      this.conductor = conductor;
    });
  }

  previousState() {
    window.history.back();
  }
}
