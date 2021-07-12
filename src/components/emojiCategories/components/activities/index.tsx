import { useEffect, useState } from 'react';
import AppleEmoji from '../../../../assets/appleEmoji.png';
import * as Styles from '../../styles';

export default function Activities() {
	const [list, setList] = useState({});

	useEffect(() => {
		import('../../../../fixtures/emoji/Activities.json')
			.then((l) => {
				setList(l.activities);
			})
			.catch((e) => {
				console.log('err ', e);
			});
	}, []);

	return (
		<Styles.EmojiWrapper>
			{Object.values(list)?.map((data: any, index) => {
				console.log('data ', list);

				return (
					<Styles.EmojiBlock
						key={index}
						aria-label={data.unified}
						bgImage={`url("${AppleEmoji}")`}
						onClick={() =>
							console.log(data.unified, data.imagePosition)
						}
						position={`${data.imagePosition?.[0]}% ${data.imagePosition?.[1]}%`}>
						<span></span>
					</Styles.EmojiBlock>
				);
			})}
		</Styles.EmojiWrapper>
	);
}
