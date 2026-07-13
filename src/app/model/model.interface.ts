export namespace ModelInter {
    interface ID {
        id?: string

    }

    interface DateTime {
        createdAt?: string
        updatedAt?: Date
    }

    interface Credentials {
        email: string
        password: string
    }

    interface Identity {
        username: string;
        name: string;
        lastname: string;
    }

    export interface SignUpUser extends Identity, Credentials { }

    export interface SignInUser extends Credentials { }

    export interface User extends ID, DateTime, Identity {
        supabaseId: string
        email: string
        avatarUrl: any
        bio: any
        role: string
        isActive: boolean
        createdAt: string
        avatarUrlPath: any
    }


    export interface Article extends ID, DateTime {
        title: string
        content: string
        status: string
        authorId: string
        author?: Author
        comments?: string[]
        likes?: string[]
        tags?: string[]
    }

    export interface Author extends ID, DateTime {
        supabaseId: string
        email: string
        username: string
        name: any
        lastname: any
        avatarUrl: any
        avatarUrlPath: any
        bio: any
        role: string
        isActive: boolean
    }

}