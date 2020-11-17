import React from 'react';
import './App.css';
import data from './data/trend.json';
import DataTable from 'react-data-table-component';

const nFormatter = (num, digits) => {
  var si = [
    { value: 1, symbol: "" },
    { value: 1E3, symbol: " k" },
    { value: 1E6, symbol: " M" },
    { value: 1E9, symbol: " G" },
    { value: 1E12, symbol: " T" },
    { value: 1E15, symbol: " P" },
    { value: 1E18, symbol: " E" }
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

const columns = [
  {
    name: 'Content', //if content then we show cover of the video and when user click there will be dropdown to show the video
    maxWidth: '1vw',
    cell: row =>
      <div>
        <a href={row.webVideoUrl} rel="noreferrer noopener" target="_blank">Video</a>
      </div>
  },
  {
    name: 'Create at',
    selector: 'createTime',
    sortable: true,
    cell: row =>
    <div>
      {row.createTime}
    </div>
  },
  {
    name: 'Play',
    sortable: true,
    selector: 'playCount',
    maxWidth: '2em',
    cell: row => <span>{nFormatter(row.playCount, 1)} </span>
  },
  {
    name: 'Likes',
    sortable: true,
    selector: 'diggCount',
    maxWidth: '2em',
    cell: row => <span>{nFormatter(row.diggCount, 1)}</span>
  },
  {
    name: 'Comments',
    sortable: true,
    selector: 'commentCount',
    maxWidth: '2em',
    cell: row => <span>{nFormatter(row.commentCount, 1)}</span>
  },
  {
    name: 'Share',
    sortable: true,
    selector: 'shareCount',
    maxWidth: '2em',
    cell: row => <span>{nFormatter(row.shareCount, 1)}</span>
  },
  {
    name: 'Avatar',
    grow: 0,
    cell: row => <img className="Avatar" alt={row.authorMeta.name} src={row.authorMeta.avatar} />,
  },
  {
    name: 'Name',
    sortable: true,
    selector: 'authorMeta.name',
    maxWidth: '16em',
    cell: row =>
      <div className="Text-left">
        <div>Username: <a href={'https://www.tiktok.com/@'+row.authorMeta.name} target="_blank" rel="noreferrer noopener">{'@'+row.authorMeta.name}</a></div>
        <div>Name: <strong>{row.authorMeta.nickName}</strong> { row.authorMeta.verified ? '🔵' : '' }</div>
      </div>
  },
  {
    name: 'Caption',
    selector: 'text',
    sortable: true,
  },
  //Hashtag and mention name gonna be added on additional drowpdown column
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Welcome to Tiktok Analytics
      </header>
      <DataTable
        title="1000 Tiktok Trend For Today"
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
