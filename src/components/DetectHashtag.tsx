const DetectHashtag = (text) => {
// change every hashtag in text into clickable link
	var hrefrepl = '<a href="https://www.tiktok.com/tag/$1" rel="noopener noreferrer">#$1</a>';
	var repl = text.replace(/#(\w+)/g, hrefrepl);
	return repl;
}

export default DetectHashtag;