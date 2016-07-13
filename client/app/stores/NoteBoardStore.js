import { observable, computed } from 'mobx';
import { find, edit, insert, deleteBoard, deleteNote } from '../api/api';
import Note from '../models/Note';
import uiStore from './UiStore';

class NoteBoardStore {
  @observable name;
  @observable notes = [];
  @observable password;
  @computed get isAuthenticated() {
    return (this.password && this.password !== '')
  }

  deleteNote(id) {
    uiStore.setLoading();
    deleteNote(this.name, this.password, id)
      .then(() => {
        this.notes.replace(this.notes.filter(note => note.id !== id));
        uiStore.unsetLoading();
      })
      .catch(err => {
        uiStore.unsetLoading();
        uiStore.setNotification(err);
      });
  }

  deleteBoard() {
    uiStore.setLoading();
    deleteBoard(this.name, this.password)
      .then(() => {
        uiStore.unsetLoading();
        window.location.href = '/';
      })
      .catch(err => {
        uiStore.unsetLoading();
        uiStore.setNotification(err);
      });
  }

  searchBoard(name, password) {
    this.name = name;
    this.password = password;
    this.find();
  }

  submit(id) {


    // Submit note to server
    uiStore.setLoading();
    const { text } = this.notes.filter(note => note.id === id)[0];

    edit(this.name, id, this.password, text)
      .then(() => {
        uiStore.unsetLoading();
      })
      .catch(err => {
        uiStore.unsetLoading();
        uiStore.setNotification(err);
      });
  }

  newNote() {
    uiStore.setLoading();
    const note = new Note('New note...');
    insert(note.text, this.name, this.password)
      .then(ret => {
        uiStore.unsetLoading();
        note.id = ret.id;
        this.notes.unshift(note); // Add at array beginning
      })
      .catch(err => {
        uiStore.unsetLoading();
        uiStore.setNotification(err);
      });
  }

  find() {
    uiStore.setLoading(true);
    find(this.name, this.password)
      .then(board => {
        board.notes.forEach(note =>
          this.notes.push(new Note(note.text, note.id))
        );
        uiStore.unsetLoading();
      })
      .catch(err => {
        uiStore.setNotification(err);
        uiStore.unsetLoading();
      });
  }

}

const store = new NoteBoardStore();
export default store;
