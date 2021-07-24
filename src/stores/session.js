import { makeAutoObservable } from 'mobx'

export default class SessionStore {
    counter = 0;

    constructor(){
        makeAutoObservable(this)
    }

    addCounter = () => {
        this.counter += 1;
    }

}



