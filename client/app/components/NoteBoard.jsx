import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Masonry from 'react-masonry-component';
import Header from './Header';
import Note from './Note';
import IconButton from './IconButton';
import store from '../stores/NoteBoardStore';
import newIcon from '../img/new.png';

@observer
export default class NoteBoard extends Component {

  masonry;

  constructor(props) {
    super(props);
  }

  handleNoteSumbit(id) {
    store.submit(id);
  }

  handleNewNote() {
    store.newNote();
  }

  handleDelete() {
    store.deleteBoard();
  }

  handleNoteDelete(id) {
    store.deleteNote(id);
  }

  componentWillMount() {
    store.searchBoard(this.props.params.username, this.props.params.password);
  }

  render() {
    return (
      <div className="board">
        <Header onDelete={ this.handleDelete.bind(this) } title={ store.name } deletable={ store.isAuthenticated }/>
        <div className="button-bar">
          <IconButton hide={ !store.isAuthenticated } src={ newIcon } onClick={ this.handleNewNote.bind(this) } className="new-button" />
        </div>
        <Masonry
          ref={ elem => {
            if(!elem)
              return;

            this.masonry = elem.masonry;
          }}
          className="notes">
            {
              store.notes.map(note =>
                <Note editable={ store.isAuthenticated } note={ note } key={ note.id } onConfirmChange={ () => {
                    this.handleNoteSumbit(note.id);
                }}
                onChange={() => {
                  this.masonry.layout();
                }}
                onDelete={e => {
                  this.handleNoteDelete(note.id);
                }}
                />
              )
            }
        </Masonry>
      </div>
    );
  }

}
