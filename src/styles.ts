import styled from 'styled-components';

export const EmojiPickerWrapper = styled.div`
	width: 80%;
	height: 300px;
	padding: 10px;
	display: flex;

	& > div {
		width: 100%;
	}

	& p {
		font-size: 14px;
	}
	& img.emoji {
		width: 20px;
		height: 20px;
		background-size: 5900% 5900%;
		padding: 0px;
		margin: 0px;
		vertical-align: middle;
		user-select: text;
		pointer-events: none;
	}
	& span.usernameReplacement {
		color: blue;
	}
`;
export const HeaderWrapper = styled.div`
	display: flex;
	overflow: auto;
	justify-content: space-between;
`;
export const HeaderIcon = styled.div<{ selectedCategory: string }>`
	width: 24px;
	height: 24px;

	& img {
		width: 100%;
		height: 100%;
	}
`;
export const Textarea = styled.div`
	width: 100%;
	height: 300px;
	border: 1px solid;
	padding: 10px;
	word-break: break-word;

	& > span {
		// display: inline;
	}
`;
