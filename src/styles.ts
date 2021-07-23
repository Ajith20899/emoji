import styled from 'styled-components';

export const EmojiPickerWrapper = styled.div`
	width: 300px;
	height: 300px;
	padding: 10px;

	& p {
		font-size: 14px;
	}
	& span.image {
		width: 24px;
		height: 24px;
		background-size: 5900% 5900%;
		display: inline-block;
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

	& > span {
		display: inline-block;
	}
	& span.usernameReplacement {
		display: inline-block;
		color: blue;
	}
`;
