import styled from 'styled-components';

export const EmojiWrapper = styled.div`
	width: 300px;
	height: 300px;
	padding: 10px;

	& p {
		font-size: 14px;
	}
`;
export const EmojiBlock = styled.span<{ position: string; bgImage: string }>`
	padding: 6px;
	border-radius: 20px;
	display: inline-block;
	&:hover {
		background: lightgrey;
	}
	& span {
		display: block;
		width: 25px;
		height: 25px;
		background-size: 5800% 5800%;
		background-image: ${(p: { bgImage: any }) => p.bgImage};
		background-position: ${(p: { position: any }) => p.position};
	}
`;
