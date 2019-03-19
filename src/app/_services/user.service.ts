import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '@/_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${config.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`${config.apiUrl}/users/${id}`);
    }

    public getMenu(): Observable<any> {
        return this.http.get("/menu.json");
    }
}