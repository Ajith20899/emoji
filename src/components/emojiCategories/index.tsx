import React from 'react';
import AppleEmoji from '../../assets/appleEmoji.png';
import { lazy, Suspense } from 'react';

const Activities = lazy(() => import('./components/activities'));
const AnimalsAndNature = lazy(() => import('./components/animalsAndNature'));
const Flags = lazy(() => import('./components/flags'));
const FoodAndDrink = lazy(() => import('./components/foodAndDrink'));
const PeopleAndBody = lazy(() => import('./components/peopleAndBody'));
const RecentlyUsed = lazy(() => import('./components/recentlyused'));
const SmileysAndEmotion = lazy(() => import('./components/smileysAndEmotion'));
const Symbols = lazy(() => import('./components/symbols'));
const TravelAndPlaces = lazy(() => import('./components/travelAndPlaces'));

export function EmojiCategories(props: any) {
	const { selectedCategory } = props;

	const categoriesHandler = () => {
		let x: JSX.Element;
		switch (selectedCategory) {
			case 'recentlyUsed':
				x = (
					<Suspense fallback>
						<RecentlyUsed image={AppleEmoji} />
					</Suspense>
				);
				break;
			case 'activities':
				x = (
					<Suspense fallback>
						<Activities image={AppleEmoji} />
					</Suspense>
				);
				break;
			case 'animalsAndNature':
				x = (
					<Suspense fallback>
						<AnimalsAndNature image={AppleEmoji} />
					</Suspense>
				);
				break;
			case 'flags':
				x = (
					<Suspense fallback>
						<Flags image={AppleEmoji} />
					</Suspense>
				);
				break;
			case 'foodAndDrink':
				x = (
					<Suspense fallback>
						<FoodAndDrink image={AppleEmoji} />
					</Suspense>
				);
				break;
			case 'peopleAndBody':
				x = (
					<Suspense fallback>
						<PeopleAndBody image={AppleEmoji} />
					</Suspense>
				);
				break;
			case 'smileysAndEmotion':
				x = (
					<Suspense fallback>
						<SmileysAndEmotion image={AppleEmoji} />
					</Suspense>
				);
				break;
			case 'symbols':
				x = (
					<Suspense fallback>
						<Symbols image={AppleEmoji} />
					</Suspense>
				);
				break;
			case 'travelAndPlaces':
				x = (
					<Suspense fallback>
						<TravelAndPlaces image={AppleEmoji} />
					</Suspense>
				);
				break;
			default:
				x = (
					<Suspense fallback>
						<RecentlyUsed image={AppleEmoji} />
					</Suspense>
				);
		}
		return x;
	};

	return (
		<>
			<div>
				{/* <p>{displayValue}</p> */}
				{categoriesHandler()}
			</div>
		</>
	);
}
