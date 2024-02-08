type Post = {
  id: number;
  userSub: string;
  createdAt?: string;
  postType: string;
  author: string;
  title: string;
  content: string;
  recruiterName?: string;
  recruiterEmail?: string;
  isActive?: boolean
};

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

type JobPostingFormProps = {
  onSubmit: (jobData: JobData) => void;
};

type JobData = {
  title: string;
  content: string;
  recruiterName: string;
  recruiterEmail: string;
  createdAt: string
};
