import SessionStore from './session'

class RootStore {
    constructor(){
        this.sessionStore = new SessionStore();
    }

}

export default  new RootStore();
 