interface EmojiI {
	name: string;
	unified: string;
	category: string;
	imagePosition: number[];
}

interface ICategories {
	smileysAndEmotion: any;
	animalsAndNature: any;
	foodAndDrink: any;
	activities: any;
	travelAndPlaces: any;
	objects: any;
	symbols: any;
	flags: any;
	component: any;
}

export interface IEmojiCategoriesProps {
	categories: ICategories;
}
