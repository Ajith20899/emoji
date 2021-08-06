import { createContext } from 'react';

const EmojiContext = createContext<any>({
	emojiHandler: (emoji: string) => {},
});

export default EmojiContext;
