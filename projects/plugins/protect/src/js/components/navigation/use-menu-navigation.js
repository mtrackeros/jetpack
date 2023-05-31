import React, { useMemo, useState } from 'react';

/**
 * @typedef MenuItem
 * @property {string}            id       - The menu item's ID.
 * @property {?string}           parentId - The ID of the menu item's parent, when the item is nested.
 * @property {React.Node|string} label    - The menu item's label content.
 * @property {React.Node|string} icon     - The menu item's icon content.
 * @property {boolean}           disabled - Whether the menu item is disabled.
 */

export const NavigationContext = React.createContext();

const useMenuNavigation = ( { selectedItemId, onSelect } ) => {
	/** @type {[MenuItem[], Function]} */
	const [ items, setItems ] = useState( [] );

	const [ refs, setRef ] = useState( [] );
	const [ focusedItem, setFocusedItem ] = useState();

	const selectedItem = useMemo(
		() => items.find( item => item?.id === selectedItemId ),
		[ items, selectedItemId ]
	);

	const handleClickItem = id => {
		onSelect( id );
	};

	const handleFocusItem = id => {
		setFocusedItem( id );
	};

	const getPrevItem = ( current, last ) => {
		const startMinusOne = current - 1;
		const prevIndex = startMinusOne < 0 ? last : startMinusOne;
		const prevItem = items[ prevIndex ];
		return prevItem?.disabled ? getPrevItem( prevIndex, last ) : prevItem;
	};

	const getNextItem = ( current, last ) => {
		const startPlusOne = current + 1;
		const nextIndex = startPlusOne > last ? 0 : startPlusOne;
		const nextItem = items[ nextIndex ];
		return nextItem?.disabled ? getNextItem( nextIndex, last ) : nextItem;
	};

	const handleKeyDownItem = input => {
		const code = input?.code;
		const current = items.findIndex( item => item?.id === selectedItemId );
		const lastIndex = items.length - 1;

		let nextId;

		if ( code === 'ArrowUp' ) {
			const prevItem = getPrevItem( current, lastIndex );
			nextId = prevItem?.id;
		} else if ( code === 'ArrowDown' ) {
			const nextItem = getNextItem( current, lastIndex );
			nextId = nextItem?.id;
		} else if ( ( code === 'Enter' || code === 'Space' ) && focusedItem ) {
			nextId = focusedItem;
		}

		if ( nextId ) {
			const element = refs[ nextId ];
			element?.focus();
			onSelect( nextId );
		}
	};

	const registerRef = ( ref, id ) => {
		setRef( allRefs => {
			if ( ! allRefs[ id ] && ref ) {
				return { ...allRefs, [ id ]: ref };
			}
			return allRefs;
		} );
	};

	const registerItem = data => {
		setItems( allItems => {
			const newItems = [ ...allItems ];
			const id = data?.id;
			const currentIdx = newItems.findIndex( item => item?.id === id );

			if ( currentIdx >= 0 ) {
				newItems[ currentIdx ] = data;
			} else {
				newItems.push( data );
			}

			return newItems;
		} );
	};

	return {
		selectedItemId,
		selectedItem,
		handleClickItem,
		handleKeyDownItem,
		handleFocusItem,
		registerRef,
		registerItem,
		items,
	};
};

export default useMenuNavigation;
