import React from 'react'
import { FlatList } from 'react-native'

export default function SharedList(props) {

    const { renderItem, data, keyExtractor, horizontal, style, numColumns, onEndReachedThreshold,
        onEndReached,nestedScrollEnabled,contentContainerStyle } = props
    return (
        <>
            <FlatList
                {...props}
                contentContainerStyle={contentContainerStyle}
                style={style && style}
                keyExtractor={keyExtractor}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                bounces={false}
                data={data}
                numColumns={numColumns && numColumns}
                renderItem={renderItem}
                horizontal={horizontal ? horizontal : false}
                onEndReachedThreshold={onEndReachedThreshold && onEndReachedThreshold}
                onEndReached={onEndReached && onEndReached}
                nestedScrollEnabled={nestedScrollEnabled && nestedScrollEnabled}
            />
        </>
    )
}
