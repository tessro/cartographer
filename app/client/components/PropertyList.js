import React, { Component, PropTypes } from 'react';

function coerce(str) {
  if (str === '') {
    return null;
  } else if (!isNaN(str)) {
    return Number(str);
  } else {
    return str;
  }
}

export default class PropertyList extends Component {
  static propTypes = {
    properties: PropTypes.object,
    selectedIndex: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
  };

  genClickHandler(i) {
    return (e) => {
      this.props.onSelect(i);
    };
  }

  genKeyChangeHandler(i) {
    const { onChange } = this.props;
    const properties = this.props.properties || {};
    const keys = Object.keys(properties);
    const oldKey = i < keys.length ? keys[i] : null;
    const value = oldKey ? properties[oldKey] : null;
    return (e) => {
      const newKey = e.target.value;
      let newProperties = Object.assign({}, properties, {
        [newKey]: value
      });
      delete newProperties[oldKey];
      onChange(newProperties);
    }
  }

  genValueChangeHandler(i) {
    const { onChange } = this.props;
    const properties = this.props.properties || {};
    const keys = Object.keys(properties);
    const key = i < keys.length ? keys[i] : null;
    return (e) => {
      const newValue = coerce(e.target.value);
      const newProperties = Object.assign({}, properties, {
        [key]: newValue
      });
      onChange(newProperties);
    }
  }

  render() {
    const { selectedIndex } = this.props;
    const properties = this.props.properties || {};

    const selectedRowStyle = {
      backgroundColor: '#116cd6',
      color: '#fff'
    };

    const inputStyle = {
      background: 'none',
      border: 'none',
      padding: 0,
      margin: 0,
      width: '50px',
      outline: 'none'
    };

    const keys = Object.keys(properties).concat('');
    const rows = keys.map((key, i) => {
      const value = properties[key];
      const selected = selectedIndex === i;
      const rowStyle = selected ? selectedRowStyle : null;

      return (
        <tr key={key} style={rowStyle} onClick={this.genClickHandler(i)}>
          <td><input type="text" value={key} style={inputStyle} onChange={this.genKeyChangeHandler(i)}/></td>
          <td><input type="text" value={value} style={inputStyle} onChange={this.genValueChangeHandler(i)}/></td>
        </tr>
      );
    });

    const tableStyle = {
    };

    return (
      <table className="table-striped" style={tableStyle}>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
        {rows}
        </tbody>
      </table>
    );
  }
}