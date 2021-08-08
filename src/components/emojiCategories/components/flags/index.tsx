import React, { useContext, useEffect, useState } from 'react';
import EmojiContext from '@components/emojiCategories/context';
import * as Styles from '../../styles';

export default function Flags({ image }) {
    const { emojiHandler } = useContext(EmojiContext);

	const [list, setList] = useState({});

	useEffect(() => {
		import('../../../../fixtures/emoji/Flags.json')
			.then((l) => {
				setList(l.flags);
			})
			.catch((e) => {
				console.log('err ', e);
			});
	}, []);

	return (
		<Styles.EmojiWrapper>
			{Object.values(list)?.map((data: any, index) => {
				return (
					<Styles.EmojiBlock
						key={index}
						aria-label={data.native}
						onClick={() => emojiHandler(data.native)}>
						<Styles.EmojiChild
							style={{
								backgroundImage: `url("${image}")`,
								backgroundPosition: `${data.imagePosition?.[0]}% ${data.imagePosition?.[1]}%`,
							}}></Styles.EmojiChild>
					</Styles.EmojiBlock>
				);
			})}
		</Styles.EmojiWrapper>
	);
}
