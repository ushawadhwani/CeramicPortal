import { Injectable } from '@angular/core';

import { ILoginModel } from './loginmodel';

@Injectable()
export class AuthService {
    currentUser: ILoginModel;
    redirectUrl: string;

    isLoggedIn(): boolean {
        return !!this.currentUser;
    }

    login(userName: string, password: string): void {
        if (!userName || !password) {
            return;
        }
        if (userName === 'admin') {
            this.currentUser = {
                id: 1,
                userName: userName,
                userType:1
            };

            console.log('admin had logged in');
            return;
        }
        this.currentUser = {
            id: 2,
            userName: userName,
            userType:2
        };
        console.log(userName + ' had logged in');
    }

    logout(): void {
        this.currentUser = null;
    }
}
