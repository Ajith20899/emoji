import styled from 'styled-components';

export const EmojiPickerWrapper = styled.div`
	width: 300px;
	height: 300px;
	padding: 10px;

	& p {
		font-size: 14px;
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
