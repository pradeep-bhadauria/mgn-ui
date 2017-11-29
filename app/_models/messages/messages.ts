import { User} from '../../_models/index';

export class Message {
    attachment_url: string;
	created: string;
	has_attachment: number;
	id: number;
	message_text: string;
}

export class MessageStatus {
    created: string;
    delete_timestamp: string;
    is_deleted: number;
    is_read: number;
    message: Message;
    read_timestamp: string;
}

export class ParticipantsList {
    participant_list: User[] = [];
}


export class MessageThread {
    created: string;
	last_user_message: Message;
    id: number;
}

export class Thread {
    delete_timestamp: string;
    has_left_group: number;
    has_left_group_timestamp: string;
    is_deleted: number;
    is_muted: number;
    is_muted_timestamp: string;
    is_read: number;
    is_spam: number;
    last_message_timestamp: string;
    last_read_timestamp: string;
    message_thread: MessageThread;
    message_thread_creator: User;
    memessage_thread_master_user: User;
    spam_timestamp: string;
    unread_message_count: number;
    participants: User[] = [];
}