import React, { useEffect, useState } from 'react';
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
// import EmojiData from './fixtures/emoji/Emoji.json';
import * as Styles from './styles';
import { TestingData } from '@fixtures/testingData';
import ActivitiesJson from '@fixtures/emoji/Activities.json';
import AppleEmoji from './assets/appleEmoji.png';
import { MentionsInput, Mention } from 'react-mentions';

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

export const userList = [
	{
		key: 'ascasc',
		value: 'ascasc',
		displayValue: 'ascasc',
	},
	{
		key: 'acsascas',
		value: 'acsascas',
		displayValue: 'acsascas',
	},
	{
		key: 'accascsc',
		value: 'accascsc',
		displayValue: 'accascsc',
	},
];

export const groupList = [
	{
		key: 'jhljds',
		value: 'jhljds',
		displayValue: 'jhljds',
	},
	{
		key: 'asd',
		value: 'asd',
		displayValue: 'asd',
	},
	{
		key: 'vfa',
		value: 'vfa',
		displayValue: 'vfa',
	},
];

interface MentionedListI {
	s: number;
	e: number;
	value: string;
}

export function EmojiPicker() {
	// state
	const [selectedCategory, setSelectedCategory] = useState('');
	const [list, setList] = useState<any[]>([]);
	const [mentionedList, setMentionedList] = useState({
		'@ajith': true,
	});
	const [currentValue, setCurrentValue] = useState('');

	let startPosition = 0;

	let rx = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;

	let x: any = TestingData?.replaceAll(rx, (a) => {
		let v = ActivitiesJson.activities[`${a}`];
		return `
            <span
                class="image"
                style='background-image: url(${AppleEmoji}); background-position: ${v?.imagePosition?.[0]}% ${v?.imagePosition?.[1]}%' 
                data-plain-text='${a}'
                alt='${a}'
                draggable="false"
            ></span>
        `;
	});

	// let t = document.getElementById('testingData');
	// t?.appendChild(x);

	useEffect(() => {
		let textarea = document.getElementById('textarea');
		let filter = [] as any;
		let isMention = false;

		function changeHandler(e: any) {
			let node = document.getSelection()?.anchorNode;
			let child = (node?.nodeType === 3 ? node.parentNode : node) as any;

			if (e.key === '@' || e.key === '#') {
				isMention = e.key === '@' ? true : false;
				filter = e.key === '@' ? userList : groupList;
				startPosition = getCaretPosition(textarea);
			}

			let subtractValue = textarea?.textContent?.substring(
				startPosition,
				getCaretPosition(textarea),
			);
			filter = userList.filter((d) => {
				console.log('value ', d.value, subtractValue?.substring(1));
				return d.value
					.toLowerCase()
					.includes(
						(subtractValue?.substring(1) || '').toLowerCase(),
					);
			});

			setList(filter);

			if (child?.nodeName.toLocaleLowerCase() === 'span') {
				let reg = /^[-@.\/#&+\w\s]*$/;

				setTimeout(() => {
					if (e.key === 'Backspace') {
						textarea?.removeChild(child);
					}
				}, 10);
			}
		}

		textarea?.addEventListener('keydown', changeHandler);
		return () => textarea?.removeEventListener('keydown', changeHandler);
	});

	function getCaretPosition(editableDiv) {
		var caretPos = 0,
			sel,
			range;
		if (window.getSelection) {
			sel = window.getSelection();
			if (sel.rangeCount) {
				range = sel.getRangeAt(0);
				if (range.commonAncestorContainer.parentNode == editableDiv) {
					caretPos = range.endOffset;
				}
			}
		} else if (
			(document as any)?.selection &&
			(document as any).selection.createRange
		) {
			range = (document as any).selection.createRange();
			if (range.parentElement() == editableDiv) {
				var tempEl = document.createElement('span');
				editableDiv.insertBefore(tempEl, editableDiv.firstChild);
				var tempRange = range.duplicate();
				tempRange.moveToElementText(tempEl);
				tempRange.setEndPoint('EndToEnd', range);
				caretPos = tempRange.text.length;
			}
		}
		return caretPos;
	}

	function setEndOfContenteditable(contentEditableElement) {
		var range, selection;
		try {
			if (document.createRange) {
				//Firefox, Chrome, Opera, Safari, IE 9+
				range = document.createRange(); //Create a range (a range is a like the selection but invisible)
				range.selectNodeContents(contentEditableElement); //Select the entire contents of the element with the range
				range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
				selection = window.getSelection(); //get the selection object (allows you to change selection)
				selection.removeAllRanges(); //remove any selections already made
				selection.addRange(range); //make the range you have just created the visible selection
			} else if ((document as any)?.selection) {
				//IE 8 and lower
				range = (document.body as any).createTextRange(); //Create a range (a range is a like the selection but invisible)
				range.moveToElementText(contentEditableElement); //Select the entire contents of the element with the range
				range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
				range.select(); //Select the range (make it the visible selection
			}
		} catch (err) {
			console.log('err', err);
		}
	}

	function elementContainsSelection(el) {
		var sel;
		try {
			if (window.getSelection) {
				sel = window.getSelection();

				if (sel.rangeCount > 0) {
					for (var i = 0; i < sel.rangeCount; ++i) {
						if (
							!isOrContains(
								sel.getRangeAt(i).commonAncestorContainer,
								el,
							)
						) {
							return false;
						}
					}
					return true;
				}
			} else if (
				(sel = (document as any).selection) &&
				sel.type != 'Control'
			) {
				return isOrContains(sel.createRange().parentElement(), el);
			}
		} catch (err) {
			console.log('err', err);
		}
		return false;
	}

	function isOrContains(node, container) {
		while (node) {
			if (node === container) {
				return true;
			}
			node = node.parentNode;
		}
		return false;
	}

	function pasteHtmlAtCaret(value: string) {
		var html = `<span class="usernameReplacement">${value}</span>&nbsp;`;
		var textarea = document.getElementById('textarea');
		var sel, range;
		try {
			if (window.getSelection) {
				// IE9 and non-IE
				sel = window.getSelection();
				if (elementContainsSelection(textarea)) {
					if (sel.getRangeAt && sel.rangeCount) {
						range = sel.getRangeAt(0);
						range.deleteContents();

						// Range.createContextualFragment() would be useful here but is
						// non-standard and not supported in all browsers (IE9, for one)
						let el = document.createElement('div');
						el.innerHTML = html;
						var frag = document.createDocumentFragment(),
							node,
							lastNode;
						while ((node = el.firstChild)) {
							lastNode = frag.appendChild(node);
						}
						range.insertNode(frag);

						// Preserve the selection
						if (lastNode && textarea) {
							range = range.cloneRange();
							range.setStartAfter(lastNode);
							range.collapse(false);
							console.log('lastNode ', range);
							sel.removeAllRanges();
							sel.addRange(range);
							textarea.focus();
						}
					} else if (
						(document as any)?.selection &&
						(document as any)?.selection.type != 'Control'
					) {
						// IE < 9
						(document as any)?.selection
							.createRange()
							.pasteHTML(html);
					}
				} else {
					setEndOfContenteditable(textarea);
					pasteHtmlAtCaret(value);
				}
			}
		} catch (err) {
			console.log('err', err);
		}
	}

	return (
		<Styles.EmojiPickerWrapper>
			<Header
				categories={EmojiCategoriesList}
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
			/>
			{/* <EmojiCategories selectedCategory={selectedCategory} /> */}
			<Styles.Textarea
				id={'textarea'}
				tabIndex={-1}
				contentEditable={true}
				suppressContentEditableWarning={false}
			/>
			{list && (
				<div>
					{list.map((d, i) => (
						<p
							key={i}
							onMouseDown={(e) => {
								e.preventDefault();
								pasteHtmlAtCaret(d.value);
							}}
							// onClick={() => {
							// 	setMentionedList((p: string[]) => [
							// 		...p,
							// 		d.value,
							// 	]);
							// }}
						>
							{d.displayValue}
						</p>
					))}
				</div>
			)}
		</Styles.EmojiPickerWrapper>
	);
}
