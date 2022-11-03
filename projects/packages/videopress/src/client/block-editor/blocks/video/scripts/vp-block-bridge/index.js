const rawScript = `
	if ( ! window?.debug ) {
		window.debug = window.parent?.debugBridgeInstance ?? ( () => {} );
	}

	function initWPBlockBridge() {
		debug( '🌉 🛠 building the bridge' );

		const videoPressIFrame = document.querySelector('iframe');
		if ( ! videoPressIFrame?.contentWindow ) {
			return;
		}

		const videoPressWindow = videoPressIFrame.contentWindow;

		// Allowed events emitted by the videopress API.
		const videoPressEventsMap = {
			'videopress_playing': {
				name: 'onVideoPressPlaying',
				type: 'event',
			},
			'videopress_pause': {
				name: 'onVideoPressPause',
				type: 'event',
			},
			'videopress_seeking': {
				name: 'onVideoPressSeeking',
				type: 'event',
			},
			'videopress_resize': {
				name: 'onVideoPressResize',
				type: 'event',
			},
			'videopress_volumechange': {
				name: 'onVideoPressVolumeChange',
				type: 'event',
			},
			'videopress_ended': {
				name: 'onVideoPressEnded',
				type: 'event',
			},
			'videopress_timeupdate': {
				name: 'onVideoPressTimeUpdate',
				type: 'event',
			},
			'videopress_durationchange': {
				name: 'onVideoPressDurationChange',
				type: 'event',
			},
			'videopress_progress': {
				name: 'onVideoPressProgress',
				type: 'event',
			},
			'videopress_loading_state': {
				name: 'onVideoPressLoadingState',
				type: 'event',
			},
			videopress_toggle_fullscreen: {
				name: 'onVideoPressToggleFullscreen',
				type: 'event',
			},
			'vpBlockActionPlay': {
				name: 'vpBlockActionPlay',
				type: 'action',
				videoPressAction: 'videopress_action_play',
			},
			'vpBlockActionPause': {
				name: 'vpBlockActionPause',
				type: 'action',
				videoPressAction: 'videopress_action_pause',
			},
			'vpBlockActionSetCurrentTime': {
				name: 'vpBlockActionSetCurrentTime',
				type: 'action',
				videoPressAction: 'videopress_action_set_currenttime',
			},
			'onChaptersTrackChange': {
				name: 'onChaptersTrackChange',
				type: 'event',
			},
			'onChaptersChapterChange': {
				name: 'onChaptersChapterChange',
				type: 'event',
			},
			'play': {
				name: 'play',
				type: 'action',
				videoPressAction: 'play',
			},
			'seek': {
				name: 'seek',
				type: 'action',
				videoPressAction: 'seek',
			},
		};

		const allowedVideoPressEvents = Object.keys( videoPressEventsMap );
		const api = window.VideoPressIframeApi( videoPressIFrame, () => {

			// setTimeout( () => {
			// 	console.log( 'PLAY: ', api.controls.play );
			// 	api.controls.pause();
			// }, 5000 );

			// setTimeout( () => {
			// 	console.log( 'PLAY: ', api.controls.play );
			// 	api.controls.play();
			// }, 8000 );
			

			api.info.onInfoUpdated( async () => {
				const guid = await api.info.guid();
				const title = await api.info.title();
				const duration = await api.info.duration();
				const poster = await api.info.poster();
				const privacy = await api.info.privacy();

				const dispatch = ( eventName, data ) => {
					const videoPressBlockEvent = new CustomEvent( eventName, {
						detail: {
							...data,
							eventName,
							guid,
						},
					} );
	
					// Dispatch custom event in iFrame window...
					window.dispatchEvent( videoPressBlockEvent );

					// ...and also dipatch to the parent window,
					// in case it exists.
					if ( window?.parent && window.parent !== window ) {
						window.parent.dispatchEvent( videoPressBlockEvent );
					}
				}

				api.status.onChaptersTrackChange( function ( chapters ) {
					dispatch( 'onChaptersTrackChange', { chapters } );
				} );

				api.status.onChaptersChapterChange(function (currentChapter) {
					if (!currentChapter) {
						return;
					}
					dispatch( 'onChaptersChapterChange', { currentChapter } );
				} );

				window.addEventListener( 'message', ( ev ) => {
					const { data } = ev;
					const eventName = data.event;
					if ( ! allowedVideoPressEvents.includes( eventName ) ) {
						return;
					}
					
					// Rename event with the 'onVideoPress' prefix.
					const vpEvent = videoPressEventsMap[ eventName ];
					const { name: vpEventName, type: vpEventType, videoPressAction } = vpEvent;
		
					// Dispatch event to top when it's an event
					// if ( vpEventType === 'event' ) {
					// 	// It preferrs to use the guid instead of the id.
					// 	const guid = data.id;
					// 	const originalEventName = data.event;
			
					// 	// clean event data object
					// 	delete data.event;
					// 	delete data.id;
			
					// 	// Emite custom event with the event data.
					// 	const videoPressBlockEvent = new CustomEvent( vpEventName, {
					// 		detail: {
					// 			...data,
					// 			originalEventName,
					// 			guid,
					// 		},
					// 	} );
		
					// 	debug( '🌉 %o [%s] ➜ %o', originalEventName, guid, vpEventName );
		
					// 	// Dispatch custom event in iFrame window...
					// 	window.dispatchEvent( videoPressBlockEvent );
		
					// 	// ...and also dipatch to the parent window,
					// 	// in case it exists.
					// 	if ( window?.parent && window.parent !== window ) {
					// 		window.parent.dispatchEvent( videoPressBlockEvent );
					// 	}
					// }
		
					if ( vpEventType === 'action' ) {
						if (vpEventName === 'seek') {
							api.controls.seek( data?.time );
							return;
						}

						if (vpEventName === 'play') {
							api.controls.play();
							return;
						}

						// Overwrite event from -> to
						data.event = videoPressAction;
		
						debug( '🌉 recieve %o -> dispatching %o [%o]', eventName, videoPressAction, data );
						videoPressWindow.postMessage( data, '*' );
					}
				} );
			} );
		} );

		
	}

	initWPBlockBridge();
`;

export default URL.createObjectURL( new Blob( [ rawScript ], { type: 'text/javascript' } ) );
