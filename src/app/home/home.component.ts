import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    currentUser: User;
    userFromApi: User;
    query: string;
    appetizers: [];
    filteredAppetizers: any[]= [];
    salads: [];
    filteredSalads: any[]= [];

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
            this.userFromApi = user;
        });
        this.userService.getMenu().subscribe(items => {
            this.appetizers = items.categories[0].items;
            this.salads = items.categories[1].items;
            this.assignCopy();
        });
    }

    assignCopy(){
        this.filteredAppetizers = Object.assign([], this.appetizers);
        this.filteredSalads = Object.assign([], this.salads);
     }

     filterItem(){
        if(!this.query){
            this.assignCopy();
        }
        this.filteredAppetizers = Object.assign([], this.appetizers).filter(
           item => item.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1
        )
        this.filteredSalads = Object.assign([], this.salads).filter(
            item => item.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1
         )
     }

}