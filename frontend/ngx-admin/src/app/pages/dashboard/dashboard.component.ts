import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  redirectTo(routeName: string) {
    this.router.navigate(['../' + routeName], { relativeTo: this.route });
  }
}
