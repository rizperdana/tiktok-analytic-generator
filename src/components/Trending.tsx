import React from 'react'
import Moment from 'react-moment'
import DataTable from 'react-data-table-component'

import './Trending.css'
import data from '../data/trend.json'

import DetectHashtag from './DetectHashtag'
import NumberFormatter from './NumberFormatter'
import ExpandedComponent from './ExpandedComponent'


const Trending = () => {

	const columns = [
			{
				name: 'Content', //if content then we show cover of the video and when user click there will be dropdown to show the video
				maxWidth: '1vw',
				selector: 'videoMeta.duration',
				sortable: true,
				cell: row =>
					<div>
						<a href={row.webVideoUrl} rel="noreferrer noopener" target="_blank" className="Text-left">Video</a>
						<div>
							<span className="duration">{row.videoMeta.duration}</span><strong> s</strong>
						</div>
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
				cell: row => <span>{NumberFormatter(row.playCount, 1)} </span>
			},
			{
				name: 'Likes',
				sortable: true,
				selector: 'diggCount',
				maxWidth: '2em',
				cell: row => <span>{NumberFormatter(row.diggCount, 1)}</span>
			},
			{
				name: 'Comments',
				sortable: true,
				selector: 'commentCount',
				maxWidth: '2em',
				cell: row => <span>{NumberFormatter(row.commentCount, 1)}</span>
			},
			{
				name: 'Share',
				sortable: true,
				selector: 'shareCount',
				maxWidth: '2em',
				cell: row => <span>{NumberFormatter(row.shareCount, 1)}</span>
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

	]

	return(
		<DataTable
			columns={columns}
			data={data}
			keyField='id'
			defaultSortField='id'
			pagination
			highlightOnHover
			striped
			expandableRows
      expandableRowDisabled={row => row.disabled}
			expandableRowsComponent={<ExpandedComponent />}
		/>
	)
}

export default Trending;