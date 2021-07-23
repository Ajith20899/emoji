import React, { useEffect, useState } from 'react';
import * as Styles from '../../styles';

export default function SmileysAndEmotion({ image }) {
	const [list, setList] = useState({});

	useEffect(() => {
		import('../../../../fixtures/emoji/Smiley.json')
			.then((l) => {
				setList(l.smileysAndEmotion);
			})
			.catch((e) => {
				console.log('err ', e);
			});
	}, []);

	return (
		<Styles.EmojiWrapper>
			<p>&#128512;</p>
			{Object.values(list)?.map((data: any, index) => {
				return (
					<Styles.EmojiBlock
						key={index}
						aria-label={data.unified}
						onClick={() =>
							console.log(
								data.unified,
								data.imagePosition,
								data.native,
							)
						}>
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
