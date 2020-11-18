import React from 'react';
import './Trending.css';
import data from '../data/trend.json';
import Moment from 'react-moment';
import DataTable from 'react-data-table-component';
import DetectHashtag from './DetectHashtag';

const Trending = () => {

	const nFormatter = (num, digits) => {
	//convert number notation into K, M, G, etc
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
				maxWidth: '4em',
				cell: row => <Moment unix format="DD/MM/YY - HH:mm:ss">{row.createTime}</Moment>
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
				cell: row => <img className="Avatar" alt={row.authorMeta.name} /*src={row.authorMeta.avatar}*/ />,
			},
			{
				name: 'Name',
				sortable: true,
				selector: 'authorMeta.name',
				maxWidth: '16em',
				cell: row =>
					<div className="Text-left">
						<div><a href={'https://www.tiktok.com/@'+row.authorMeta.name} target="_blank" rel="noreferrer noopener">{'@'+row.authorMeta.name}</a><strong> {row.authorMeta.nickName}</strong> { row.authorMeta.verified ? '🔵' : '' }</div>
					</div>
			},
			{
				name: 'Caption',
				selector: 'text',
				sortable: true,
				wrap: true,
				cell: row => <div className="Text-left" dangerouslySetInnerHTML={{ __html: DetectHashtag(row.text) }}></div>
			},
		/*{ //this is working, just need to DetectHashtag(row.text)e the source data is not empty
				name: 'Hashtag',
				wrap: true,
				cell: row =>
					<div>
						{row.hashtags.map((tag, i) => <li key={i}>{tag.hashtags}</li>)}
					</div>
			},*/
			{
				name: 'Music',
				selector: 'musicMeta.musicName',
				sortable: true,
				wrap: true,
				cell: row => <a href={row.musicMeta.playUrl} rel="noreferrer noopener" className="Text-left">{row.musicMeta.musicName} - {row.musicMeta.musicAuthor}</a>
			},

	];

	return(
		<DataTable
			columns={columns}
			data={data}
			keyField='id'
			defaultSortField='id'
			pagination
			highlightOnHover
			striped
		/>
	)
};

export default Trending;