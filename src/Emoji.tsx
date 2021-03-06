import React, { useEffect, useRef, useState } from 'react';
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
// import ActivitiesJson from '@fixtures/emoji/Activities.json';
import AppleEmoji from './assets/appleEmoji.png';
import EmojiContext from '@components/emojiCategories/context';
import { EmojiList } from '@fixtures/emoji/EmojiList';

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
// let startPosition = 0;
// let currentValue = '';
// let startPositionList = {};
// let isMention = false;
// let lastOutNode;
// let lastOutPosition;

var defaultValue = 'Ajith @ascasc ???????';

export function EmojiPicker() {
	// state
	const [selectedCategory, setSelectedCategory] = useState('');
	const [list, setList] = useState<any[]>([]);
	const [mentionedList, setMentionedList] = useState<any>({
		userList: [],
		groupList: [],
	});
	const [message, setMessage] = useState('');
	const [selectedEmoji, setSelectedEmoji] = useState('');
	const [isTriggered, setIsTriggered] = useState(false);
	const startPosition = useRef(0);
	const currentValue = useRef('');
	const startPositionList = useRef({});
	const isMention = useRef(false);
	const lastOutNode = useRef<Node | null>(null);
	const lastOutPosition = useRef(0);

	useEffect(() => {
		let textarea = document.getElementById('textarea');
		function clickHandler() {
			if (!(textarea === document.activeElement)) {
				setList([]);
			}
		}

		window.addEventListener('click', clickHandler);
		return () => window.removeEventListener('click', clickHandler);
	}, []);

	useEffect(() => {
		var emojiByName = require('./fixtures/emoji/emoji.json');
		var NON_SPACING_MARK = String.fromCharCode(65039); // 65039 - '???' - 0xFE0F;
		var nonSpacingRegex = new RegExp(NON_SPACING_MARK, 'g');

		var emojiByCode = Object.keys(emojiByName).reduce(function (h, k) {
			h[stripNSB(emojiByName[k])] = k;
			return h;
		}, {});

		function stripNSB(code) {
			return code.replace(nonSpacingRegex, '');
		}

		function findByCode(code) {
			var stripped = stripNSB(code);
			var name = emojiByCode[stripped];

			// lookup emoji to ensure the Variant Form is returned
			return name ? { emoji: emojiByName[name], key: name } : undefined;
		}
		var trimSpaceRegex = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

		function replace(str, replacement, cleanSpaces) {
			if (!str) return '';
			var replace =
				typeof replacement === 'function'
					? replacement
					: function () {
							return replacement;
					  };

			var toArray = require('lodash.toarray');
			var words = toArray(str);

			var replaced = words
				.map(function (word, idx) {
					var emoji = findByCode(word);

					if (emoji && cleanSpaces && words[idx + 1] === ' ') {
						words[idx + 1] = '';
					}

					return emoji ? replace(emoji) : word;
				})
				.join('');

			return cleanSpaces
				? replaced.replace(trimSpaceRegex, '')
				: replaced;
		}

		let x: any = replace(
			message,
			(a: any) => {
				let v = EmojiList[`${a.emoji}`];
				if (a.emoji === v?.native) {
					return `<img
                        class="emoji"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII="
                        draggable="false"
                        aria-label="${a.emoji}"
                        alt="${a.emoji}"
                        style='background-image: url(${AppleEmoji}); background-position: ${v?.imagePosition?.[0]}% ${v?.imagePosition?.[1]}%'
                    />`;
				}
				return a.emoji;
			},
			false,
		);

		let lastReplace = x;

		let combineArray = [
			...mentionedList.userList,
			...mentionedList.groupList,
		];

		var result = combineArray.reduce(function (map, obj) {
			map[obj] = true;
			return map;
		}, {});

		let finalMessage = '';
		lastReplace?.split('&nbsp;')?.map((text: string) => {
			if (result[text]) {
				finalMessage += `<span contentEditable="false" class="usernameReplacement" data-plain-text="${text}">${text}</span>&nbsp;`;
			} else {
				finalMessage += `${text}&nbsp;`;
			}
		});

		setMessage(finalMessage);
	}, [isTriggered]);

	useEffect(() => {
		let textarea = document.getElementById('textarea');
		let filter = [] as any;
		let lastCharacter = '';

		function returnPosition() {
			let max = 0;

			Object.keys(startPositionList.current)?.forEach((key: string) => {
				if (parseInt(key) <= getCaretPosition(textarea)) {
					if (parseInt(key) > max) {
						max = parseInt(key);
						startPosition.current = max;
					} else {
						startPosition.current = 0;
					}
				}
			});
		}

		function changeHandler(e: any) {
			if (e.type === 'paste') {
				e.preventDefault();
				// get text representation of clipboard
				let data =
					e.clipboardData.getData('text/html') ||
					e.clipboardData.getData('text/plain');
                let regex = /<(?!(\/\s*)?(a|b|i|em|s|strong|u|span|img)[>,\s])([^>])*>/g;
                
				data = data.replace(regex, '');
				// insert text manually
				document.execCommand('insertHTML', false, data);
			}

			if (e.key === 'Backspace' || e.key === 'Delete') {
				lastCharacter =
					(textarea?.textContent || textarea?.innerText)?.substring(
						getCaretPosition(textarea) - 1,
						getCaretPosition(textarea),
					) || '';
				if (lastCharacter === '@') {
					delete startPositionList.current[
						getCaretPosition(textarea)
					];
				}
			}
			setTimeout(() => {
				let text = textarea?.textContent || textarea?.innerText;
				let value;
				let sel = window.getSelection();
				if (sel?.focusNode && sel?.focusOffset) {
					lastOutNode.current = sel.focusNode;
					lastOutPosition.current = sel.focusOffset;
				}

				if (text) {
					startPositionList.current = {};
					for (let i = 0; i < text.length; i++) {
						if (text[i] === '@' || text[i] === '#') {
							startPositionList.current[i] = true;
						}
					}
				}

				returnPosition();

				let filterText;
				if (text) {
					value = text.substring(
						startPosition.current,
						getCaretPosition(textarea),
					);
					filterText = text.substring(
						startPosition.current - 1,
						getCaretPosition(textarea),
					);
				}
				currentValue.current = value;

				if (
					window.getSelection()?.focusNode?.nodeName === 'DIV' ||
					(window.getSelection()?.focusNode?.previousSibling
						?.nodeName === 'SPAN' &&
						window.getSelection()?.focusOffset === 0)
				) {
					lastOutNode.current = null;
					lastOutPosition.current = 0;
					return;
				}
				let isAllow = false;
				if (
					(startPosition.current === 0 && value?.charAt(0) === '@') ||
					(/\s/g.test(filterText?.charAt(0)) &&
						filterText?.charAt(1) === '@')
				) {
					isAllow = true;
					isMention.current = true;
				} else if (
					(startPosition.current === 0 && value?.charAt(0) === '#') ||
					(/\s/g.test(filterText?.charAt(0)) &&
						filterText?.charAt(1) === '#')
				) {
					isAllow = true;
					isMention.current = false;
				} else {
					isAllow = false;
				}

				if (isAllow) {
					filter = (isMention.current ? userList : groupList)?.filter(
						(d) => {
							return d.value
								.toLowerCase()
								.includes(value.substring(1).toLowerCase());
						},
					);
					setList(filter);
					if (filter[0]?.value === value.substring(1)) {
						pasteHtmlAtCaret(value.substring(1));
						setList([]);
					}
				} else {
					setList([]);
				}
			}, 10);
		}

		textarea?.addEventListener('keydown', changeHandler);
		textarea?.addEventListener('mousedown', changeHandler);
		textarea?.addEventListener('mouseup', changeHandler);
		textarea?.addEventListener('paste', changeHandler);
		return () => {
			textarea?.removeEventListener('keydown', changeHandler);
			textarea?.removeEventListener('mousedown', changeHandler);
			textarea?.removeEventListener('mouseup', changeHandler);
			textarea?.removeEventListener('paste', changeHandler);
		};
	});

	function replaceAt(value, start, replacement) {
		return (
			value.substring(0, start) + replacement + value.substring(start + 1)
		);
	}

	function getCaretPosition(element) {
		var caretOffset = 0;
		var doc = element.ownerDocument || element.document;
		var win = doc.defaultView || doc.parentWindow;
		var sel;
		if (typeof win.getSelection != 'undefined') {
			sel = win.getSelection();
			if (sel.rangeCount > 0) {
				var range = win.getSelection().getRangeAt(0);
				var preCaretRange = range.cloneRange();
				preCaretRange.selectNodeContents(element);
				preCaretRange.setEnd(range.endContainer, range.endOffset);
				caretOffset = preCaretRange.toString().length;
			}
		} else if ((sel = doc.selection) && sel.type != 'Control') {
			var textRange = sel.createRange();
			var preCaretTextRange = doc.body.createTextRange();
			preCaretTextRange.moveToElementText(element);
			preCaretTextRange.setEndPoint('EndToEnd', textRange);
			caretOffset = preCaretTextRange.text.length;
		}
		return caretOffset;
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

	const emojiHandler = (emoji: string) => {
		var html;
		var textarea = document.getElementById('textarea');
		var sel, range;

		if (!emoji) return;

		try {
			let getAppleEmoji = EmojiList[`${emoji}`];
			html = `<img
                        class="emoji"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII="
                        draggable="false"
                        aria-label="${emoji}"
                        alt="${emoji}"
                        style='background-image: url(${AppleEmoji}); background-position: ${getAppleEmoji?.imagePosition?.[0]}% ${getAppleEmoji?.imagePosition?.[1]}%'
                    />`;
			textarea?.focus();
			if (window.getSelection) {
				// IE9 and non-IE
				sel = window.getSelection();
				if (elementContainsSelection(textarea) && textarea) {
					if (sel.getRangeAt && sel.rangeCount) {
						range = sel.getRangeAt(0);

						if (lastOutNode.current) {
							range.setStart(
								lastOutNode.current,
								lastOutPosition.current,
							);
						} else {
							range.setStart(sel.focusNode, sel.focusOffset);
						}

						setTimeout(() => {
							lastOutNode.current = sel.focusNode;
							lastOutPosition.current = sel.focusOffset;
						}, 10);

						document.execCommand('insertHTML', false, html);
						setList([]);
					} else if (
						(document as any)?.selection &&
						(document as any)?.selection.type != 'Control'
					) {
						// IE < 9
						(document as any)?.selection
							.createRange()
							.pasteHTML(html);
					}
				}
			}
		} catch (err) {
			console.log('err', err);
		}
	};

	function pasteHtmlAtCaret(value: string) {
		var html;
		var textarea = document.getElementById('textarea');
		var sel, range;
		try {
			if (isMention.current) {
				html = `<span contentEditable="false" class="usernameReplacement" data-plain-text="@${value}">@${value}</span>&nbsp;`;
			} else {
				html = `<span contentEditable="false" class="usernameReplacement" data-plain-text="#${value}">#${value}</span>&nbsp;`;
			}

			if (window.getSelection) {
				// IE9 and non-IE
				sel = window.getSelection();
				if (elementContainsSelection(textarea) && textarea) {
					if (sel.getRangeAt && sel.rangeCount) {
						range = sel.getRangeAt(0);
						if (sel?.focusNode?.nodeName === 'DIV') {
							range.setStart(
								sel?.anchorNode,
								sel?.anchorNode?.textContent.length -
									currentValue.current.length,
							);
							range.setEnd(
								sel?.anchorNode,
								sel?.anchorNode?.textContent.length,
							);
						} else {
							range.setStart(
								sel.anchorNode,
								sel.focusOffset - currentValue.current?.length,
							);
							range.setEnd(sel?.anchorNode, sel.focusOffset);
						}
						document.execCommand('insertHTML', false, html);
						lastOutNode.current = sel?.focusNode;
						lastOutPosition.current = sel?.focusOffset;
						setList([]);
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
					// setEndOfContenteditable(textarea);
					pasteHtmlAtCaret(value);
				}
			}
		} catch (err) {
			console.log('err', err);
		}
	}

	const sendHandler = () => {
		let t = document.getElementById('textarea');
		lastOutNode.current = null;
		lastOutPosition.current = 0;
		setIsTriggered(true);

		if (t) {
			let x: any[] = [];
			let y: any[] = [];
			for (let i = 0; i < t.children.length; i++) {
				if (t.children[i].textContent?.charAt(0) === '@') {
					x.push(t.children[i].textContent);
				} else {
					y.push(t.children[i].textContent);
				}
			}
			let replace;
			let final;
			replace = t?.innerHTML?.replace(/\<img.*?\>/gi, (e: any) => {
				let wrapper = document.createElement('div');
				wrapper.innerHTML = e;
				let div: any = wrapper.firstChild;
				return div?.getAttribute('aria-label');
			});
			console.log('textContent ', replace);

			// function replacementFunc(e: any) {
			// 	let wrapper = document.createElement('div');
			// 	wrapper.innerHTML = e;
			// 	let div: any = wrapper.firstChild;
			// 	return div?.textContent;
			// }

			final = replace?.replace(/<\/?span[^>]*>/g, '');

			console.log('final ', final);

			setMessage(final);
			setMentionedList({
				...mentionedList,
				userList: x,
				groupList: y,
			});
			t.innerHTML = '';
		}
	};

	return (
		<EmojiContext.Provider value={{ emojiHandler }}>
			<Styles.EmojiPickerWrapper>
				<div>
					<Header
						categories={EmojiCategoriesList}
						selectedCategory={selectedCategory}
						setSelectedCategory={setSelectedCategory}
					/>
					<EmojiCategories selectedCategory={selectedCategory} />
				</div>
				<div>
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
									}}>
									{d.displayValue}
								</p>
							))}
						</div>
					)}
					<button onClick={sendHandler}>send</button>

					{message && (
						<div
							dangerouslySetInnerHTML={{ __html: message }}></div>
					)}
				</div>
			</Styles.EmojiPickerWrapper>
		</EmojiContext.Provider>
	);
}
