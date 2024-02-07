type Post = {
    id: number,
    userSub: string,
    createdDate: string,
    postType: string,
    author: string,
    title: string,
    content: string,
    recruiterName?: string,
    recruiterEmail?: string,
}

type PostOverlayProps = {
    post: Post;
    isEditMode: boolean;
    editedTitle: string; 
    editedContent: string;
    onEditClick: () => void;
    onSaveClick: () => void;
    onDeleteClick: () => void;
    onCancelClick: () => void;
    onTitleChange: (title: string) => void; 
    onContentChange: (content: string) => void;
};