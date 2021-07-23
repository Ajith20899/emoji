import React from 'react';
import * as Styles from './styles';

export default function Header(props: any) {
	const { categories, selectedCategory, setSelectedCategory } = props;

	return (
		<Styles.HeaderWrapper>
			{categories?.map((data: any, index) => (
				<Styles.HeaderIcon
					key={index}
					selectedCategory={selectedCategory}
					onClick={() => setSelectedCategory(data.name)}>
					<img src={data.icon} alt={data.name} />
				</Styles.HeaderIcon>
			))}
		</Styles.HeaderWrapper>
	);
}
