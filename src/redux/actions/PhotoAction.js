export const loadPictures = (photos)  => {
    return {
        type: 'LOAD_PICTURES',
        payload: { photos }
    }
}

export const addComment = (photo, comment, user)  => {
    return {
        type: 'ON_ADD_COMMENT',
        payload: {
            photoId: photo.id,
            newComment: comment,
            user            
        }
    }
}

export const onPhotoLike = photo => {
    return {
        type: 'ON_PHOTO_LIKE',
        payload: {
            photoId: photo.id        
        }
    }
}
