import React from 'react';
import logo from './logo.svg';
import './App.css';
import data from './data/trend.json';
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'ID',
    selector: 'id',
    sortable: true,
  },
  {
    name: 'Text',
    selector: 'text',
    sortable: true,
  },
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <DataTable
        title="Tiktok Trend"
        columns={columns}
        data={data}
        keyField='id'
        defaultSortField='id'
        pagination
        highlightOnHover
        striped
      />
    </div>
  );
}

export default App;
