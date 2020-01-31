let initialState = { photos = [] }

const map = new Map()
map.set('LOAD_PICTURES', _loadPictures)
map.set('ON_ADD_COMMENT', _addComment)
map.set('ON_PHOTO_LIKE', _onPhotoLike)

export const photoReducer = (state = initialState, action) => {
    const {payload} = action    
    if (!map.has(action)) return state

    const actionToCall = map.get(action.type)
    return actionToCall(state, payload)
}

function _loadPictures (state, payload) {
    return {photos: payload.photos}
} 

function _addComment (state, payload) {
    const { photoId, newComment } = payload
    const newState = state.photos.map((photo) => {
        if (photo.id === photoId) photo.comentarios.push(newComment)        
     })
     return newState
}

function _onPhotoLike (state, payload) {
    let {login, photoId} = payload
    const newState = state.photos.map((photo) => {
        if (photo.id === photoId) {
            photo.likeada = !photo.likeada
            if (!photo.likeada) {
              likers = photo.likers.concat({login})
            } else {
              likers = photo.likers.filter(liker => liker.login !== login)
            }
            photo = {...photo, likers}
            return photo
        }
    })

    return newState
}