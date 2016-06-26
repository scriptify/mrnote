import { observable } from 'mobx';

export default class Notification {
    @observable type;
    @observable show = false;
}
