import React, { useContext, useEffect, useState } from 'react';
import EmojiContext from '@components/emojiCategories/context';
import * as Styles from '../../styles';

export default function Gif() {
    const { emojiHandler } = useContext(EmojiContext);

    const [list, setList] = useState({});

    useEffect(() => {
        import('@fixtures/emoji/gif.json')
            .then((l) => {
                setList(l.default);
            })
            .catch((e) => {
                console.log('err ', e);
            });
    }, []);


    return (
        <Styles.EmojiWrapper>
            {Object.keys(list)?.map((data: any, index) => {
                console.log("gif values", data)
                return (
                    <Styles.EmojiBlock
                        key={index}
                        aria-label={list[data]}
                        onClick={() => emojiHandler(data, "gif")}
                    >
                        <img
                            className={"gifEmojiChild"}
                            width={"25px"}
                            height={"25px"}
                            src={list[data]}
                            alt={"gif"}
                        />
                    </Styles.EmojiBlock>
                );
            })}
        </Styles.EmojiWrapper>
    );
}
