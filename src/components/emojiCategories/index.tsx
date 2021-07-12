import { lazy, Suspense } from 'react';

const Activities = lazy(() => import('./components/activities'));
const AnimalsAndNature = lazy(() => import('./components/animalsAndNature'));
const Flags = lazy(() => import('./components/flags'));
const FoodAndDrink = lazy(() => import('./components/foodAndDrink'));
const PeopleAndBody = lazy(() => import('./components/peopleAndBody'));
const RecentlyUsed = lazy(() => import('./components/recentlyused'));
const SmileysAndEmotion = lazy(() => import('./components/smileysAndEmotion'));
const Component = lazy(() => import('./components/component'));
const Symbols = lazy(() => import('./components/symbols'));
const TravelAndPlaces = lazy(() => import('./components/travelAndPlaces'));

export function EmojiCategories(props: any) {
	const { selectedCategory } = props;

	const categoriesHandler = () => {
		console.log('enter ', selectedCategory);

		let x: JSX.Element;
		switch (selectedCategory) {
			case 'recentlyUsed':
				x = (
					<Suspense fallback>
						<RecentlyUsed />
					</Suspense>
				);
				break;
			case 'activities':
				x = (
					<Suspense fallback>
						<Activities />
					</Suspense>
				);
				break;
			case 'animalsAndNature':
				x = (
					<Suspense fallback>
						<AnimalsAndNature />
					</Suspense>
				);
				break;
			case 'component':
				x = (
					<Suspense fallback>
						<Component />
					</Suspense>
				);
				break;
			case 'flags':
				x = (
					<Suspense fallback>
						<Flags />
					</Suspense>
				);
				break;
			case 'foodAndDrink':
				x = (
					<Suspense fallback>
						<FoodAndDrink />
					</Suspense>
				);
				break;
			case 'peopleAndBody':
				x = (
					<Suspense fallback>
						<PeopleAndBody />
					</Suspense>
				);
				break;
			case 'smileysAndEmotion':
				x = (
					<Suspense fallback>
						<SmileysAndEmotion />
					</Suspense>
				);
				break;
			case 'symbols':
				x = (
					<Suspense fallback>
						<Symbols />
					</Suspense>
				);
				break;
			case 'travelAndPlaces':
				x = (
					<Suspense fallback>
						<TravelAndPlaces />
					</Suspense>
				);
				break;
			default:
				x = (
					<Suspense fallback>
						<RecentlyUsed />
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
