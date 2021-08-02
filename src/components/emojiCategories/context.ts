import { createContext } from 'react';

const EmojiContext = createContext<any>({
	selectedEmoji: '',
	setSelectedEmoji: () => {},
});

export default EmojiContext;
