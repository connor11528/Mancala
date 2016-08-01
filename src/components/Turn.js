import React, { Component } from 'react'

import GameBoardActions from '../actions/GameBoardActions'

export default class Turn extends Component {
  constructor(props){
    super(props);

    this.state = {
      player: 0,
      startingPos: this.props.startingPos,
      gameboard: this.props.gameboard,
    }

    this.editTenant = this.editTenant.bind(this);
    //this.updateName = this.updateName.bind(this);
    //this.updateEmail = this.updateEmail.bind(this);
  }

  updateName(e) {
    let tenant = Object.assign({}, this.state.tenant);
    tenant.name = e.target.value;
    this.setState({ tenant })
  }

  updateEmail(e) {
    let tenant = Object.assign({}, this.state.tenant);
    tenant.email = e.target.value;
    this.setState({ tenant })
  }

  editTenant() {
    if (this.state.editing) {
      TenantActions.updateTenant(this.state.tenant)
    }
    this.setState({ editing: !this.state.editing })
  }

  render() {

    let { _id, name, email } = this.state.tenant;

    let nameDisplay = this.state.editing ? <input onChange={this.updateName} defaultValue={ name } /> : name
    let emailDisplay = this.state.editing ? <input onChange={this.updateEmail} defaultValue={ email } /> : email

    return (
      <tr>
        <td>{nameDisplay}</td>
        <td>{emailDisplay}</td>
        <td>
          <button onClick={this.editTenant}>{this.state.editing ? 'Confirm' : 'Edit'}</button>
        </td>
        <td>
          <button onClick={() => TenantActions.deleteTenant(_id)}>Delete</button>
        </td>
      </tr>
    )
  }
}
