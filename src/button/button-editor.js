import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BUTTON_TYPE_NONE,
  BUTTON_TYPE_AUDIO_SAMPLE,
  BUTTON_TYPES,
  AUDIO_BEHAVIOR_TYPES,
  changeButtonField
} from '../data/buttons';

import './button-editor.css';

class ButtonEditor extends Component {
  shouldComponentUpdate(newProps){
    return newProps.button !== this.props.button;
  }

  render() {
    const currentType = this.props.button.type || BUTTON_TYPE_NONE;

    return (
      <div className="buttonEditor">
        <label className="buttonEditor__label">
          <span className="buttonEditor__labelText">Type:</span>
          <select
            className="buttonEditor__buttonSelect"
            value={currentType}
            onChange={this.changeType}
          >
            { BUTTON_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>
        { this.renderForm() }
      </div>
    );
  }

  renderForm() {
    switch (this.props.button.type) {
      case BUTTON_TYPE_AUDIO_SAMPLE:
        return this.renderAudioForm();
      default:
        return null;
    }
  }

  renderAudioForm() {
    const { button, files } = this.props;
    const { behavior, file, gain } = button;

    return (
      <form className="buttonEditor__form">
        <label className="buttonEditor__label">
          <span className="buttonEditor__labelText">Behavior:</span>
          <select
            className="buttonEditor__buttonSelect"
            value={behavior}
            onChange={this.changeBehavior}
          >
            { AUDIO_BEHAVIOR_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>
        <label className="buttonEditor__label">
          <span className="buttonEditor__labelText">Gain:</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            onChange={this.changeGain}
            value={gain}
          />
        </label>
        <label className="buttonEditor__label">
          <span className="buttonEditor__labelText">Audio Sample:</span>
          <select
            value={file}
            onChange={this.changeFile}
          >
            { Object.keys(files).map((fileId) =>
              <option
                key={fileId}
                value={fileId}
              >{files[fileId].name}
              </option>
            )}
          </select>
        </label>
      </form>
    );
  }

  changeBehavior = () => {
    this.props.changeButtonField('behavior', event.target.value);
  }

  changeType = (event) => {
    this.props.changeButtonField('type', event.target.value);
  }

  changeSchedulable = () => {
    this.props.changeButtonField('schedulable', !this.props.button.schedulable);
  }

  changeGain = (event) => {
    this.props.changeButtonField('gain', parseFloat(event.target.value));
  }

  changeFile = (event) => {
    this.props.changeButtonField('file', event.target.value);
  }

}

const mapStateToProps = (state) => ({
  files: state.files
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeButtonField(field, value) {
    return dispatch(changeButtonField(ownProps.button.id, field, value));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ButtonEditor);
