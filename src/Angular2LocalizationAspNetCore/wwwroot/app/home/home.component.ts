import { Component, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { Observable }       from 'rxjs/Observable';
import { Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { Http } from 'angular2/http';


@Component({
    selector: 'homecomponent',
    templateUrl: 'app/home/home.component.html',
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})

export class HomeComponent implements OnInit {

    public message: string;

    constructor(
        private _router: Router) {
        this.message = "home.component";
    }

    ngOnInit() {
        console.log("ngOnInit HomeComponent");
    }
}