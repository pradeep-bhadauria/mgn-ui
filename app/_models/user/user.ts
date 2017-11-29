export class RegisterUser {
    first_name: string;
    last_name: string;
    email: string;
    profile_pic: string;
    social_id: string;
    password: string;
    auth_type: number;
    mgn_user_type:number;
}

export class User {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    profile_pic: string;
    social_id: string;
    username: string;
}

export class UpdateUserName {
    first_name: string;
    last_name: string;
}

export class UpdateUserEmail {
    email: string;
}

export class UpdateUserProfilePic {
    profile_pic: string;
}

export class UpdateUserUsername {
    username: string;
}

export class UpdateUserPassword {
    password: string;
}

export class Connection {
    accepted: Number;
	blocked: Number;
	connection: User;
	created:String;
	ignored:Number;
	message_thread:Number;
}