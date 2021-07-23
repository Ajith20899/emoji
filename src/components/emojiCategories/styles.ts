import styled from 'styled-components';

export const EmojiWrapper = styled.div`
	width: 300px;
	height: 300px;
	padding: 10px;

	& p {
		font-size: 14px;
	}
`;
export const EmojiBlock = styled.span`
	padding: 6px;
	border-radius: 20px;
	display: inline-block;
	&:hover {
		background: lightgrey;
	}
`;
export const EmojiChild = styled.span`
	display: block;
	width: 25px;
	height: 25px;
	background-size: 5900% 5900%;
`;
