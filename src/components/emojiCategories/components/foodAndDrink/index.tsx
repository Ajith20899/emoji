import React, { useEffect, useState } from 'react';
import AppleEmoji from '../../../../assets/appleEmoji.png';
import * as Styles from '../../styles';

export default function FoodAndDrink({ image }) {
	const [list, setList] = useState({});

	useEffect(() => {
		import('../../../../fixtures/emoji/FoodAndDrink.json')
			.then((l) => {
				console.log('load ', l);
				setList(l.foodAndDrink);
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
