﻿import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { AuthService } from './../../../shared/services/auth.service';
import { HelperService } from './../../../shared/services/helper.service';
import { PageComponent } from './../../../shared/components/page/page.component';
import { Category4Mod8GridComponent } from './components/category4-mod8-grid/category4-mod8-grid.component';
import { Category4Mod8 } from './../../models/category4-mod8';

import { Category4Mod8Service } from './../../services/category4-mod8.service';

@Component({
  selector: 'app-mod8-category4-mod8-page',
  templateUrl: './category4-mod8-page.component.html',
  providers: [
    Category4Mod8Service
  ]
})
export class Category4Mod8PageComponent extends PageComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public newRecord: boolean;
  public item: Category4Mod8;

  @ViewChild('grid') grid: Category4Mod8GridComponent;

  constructor(
    private route: ActivatedRoute,
    router: Router,
    authService: AuthService,
    private helperService: HelperService,
    private category4Mod8Service: Category4Mod8Service) {
    super(router, authService);
  }

  ngOnInit() {
    super.checkPermission('mod8.category4Mod8.select');
    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe(params => {
        const id = params['id'];
        if (id) {
          this.edit(id);
        } else if (id === '') {
          this.item = {} as Category4Mod8;
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
    this.router.navigate(['/mod8/category4-mod8', { id: '' }]);
  }

  private edit(id: number): void {
    this.grid.isLoading = true;
    this.newRecord = false;
    this.category4Mod8Service
      .getById(id)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(item => {
        this.item = item;
        this.grid.isLoading = false;
      });
  }

}
