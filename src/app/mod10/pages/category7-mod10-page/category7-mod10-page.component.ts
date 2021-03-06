﻿import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { AuthService } from './../../../shared/services/auth.service';
import { HelperService } from './../../../shared/services/helper.service';
import { PageComponent } from './../../../shared/components/page/page.component';
import { Category7Mod10GridComponent } from './components/category7-mod10-grid/category7-mod10-grid.component';
import { Category7Mod10 } from './../../models/category7-mod10';

import { Category7Mod10Service } from './../../services/category7-mod10.service';

@Component({
  selector: 'app-mod10-category7-mod10-page',
  templateUrl: './category7-mod10-page.component.html',
  providers: [
    Category7Mod10Service
  ]
})
export class Category7Mod10PageComponent extends PageComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public newRecord: boolean;
  public item: Category7Mod10;

  @ViewChild('grid') grid: Category7Mod10GridComponent;

  constructor(
    private route: ActivatedRoute,
    router: Router,
    authService: AuthService,
    private helperService: HelperService,
    private category7Mod10Service: Category7Mod10Service) {
    super(router, authService);
  }

  ngOnInit() {
    super.checkPermission('mod10.category7Mod10.select');
    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe(params => {
        const id = params['id'];
        if (id) {
          this.edit(id);
        } else if (id === '') {
          this.item = {} as Category7Mod10;
        } else {
          this.item = null;
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public new(): void {
    this.newRecord = true;
    this.router.navigate(['/mod10/category7-mod10', { id: '' }]);
  }

  private edit(id: number): void {
    this.grid.isLoading = true;
    this.newRecord = false;
    this.category7Mod10Service
      .getById(id)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(item => {
        this.item = item;
        this.grid.isLoading = false;
      });
  }

}
