import { observable } from 'mobx';

export default class Note {
  id;
  @observable text;

  constructor(text, id = '') {
    this.text = text;
    this.id = id;
  }

}
