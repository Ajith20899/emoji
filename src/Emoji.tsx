import React, { useState } from 'react';
import Activity from './assets/activities.svg';
import Animals from './assets/animals.svg';
import Flag from './assets/flag.svg';
import Food from './assets/food.svg';
import Frequently from './assets/frequentlyIcon.svg';
import People from './assets/group.svg';
import Smiley from './assets/smiley.svg';
import Symbol from './assets/symbol.svg';
import Travel from './assets/travel.svg';
import Header from './Header';
import { EmojiCategories } from './components/emojiCategories';
import * as Styles from './styles';

const EmojiCategoriesList = [
	{
		name: 'recentlyUsed',
		icon: Frequently,
		displayValue: 'Recently Used',
	},
	{
		name: 'activities',
		icon: Activity,
		displayValue: 'Activity',
	},
	{
		name: 'animalsAndNature',
		icon: Animals,
		displayValue: 'Animals & Nature',
	},
	{
		name: 'component',
		icon: Animals,
		displayValue: 'Components',
	},
	{
		name: 'flags',
		icon: Flag,
		displayValue: 'Flags',
	},
	{
		name: 'foodAndDrink',
		icon: Food,
		displayValue: 'Food & Drink',
	},
	{
		name: 'peopleAndBody',
		icon: People,
		displayValue: 'People & Body',
	},
	{
		name: 'smileysAndEmotion',
		icon: Smiley,
		displayValue: 'Smileys & Emotions',
	},
	{
		name: 'symbols',
		icon: Symbol,
		displayValue: 'Symbols',
	},
	{
		name: 'travelAndPlaces',
		icon: Travel,
		displayValue: 'Travel & Places',
	},
];

export function EmojiPicker() {
	// state
	const [selectedCategory, setSelectedCategory] = useState('');

	return (
		<Styles.EmojiPickerWrapper>
			<Header
				categories={EmojiCategoriesList}
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
			/>
			<EmojiCategories selectedCategory={selectedCategory} />
		</Styles.EmojiPickerWrapper>
	);
}
