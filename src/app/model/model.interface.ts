export namespace ModelInter {
    interface ID {
        id?: string
    }

    interface DateTime {
        createdAt?: string
        updatedAt?: string
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
        slug: string
        content: string
        coverImage: string
        status: string
        publishedAt: string
        createdAt: string
        updatedAt: string
        authorId: string
        author: Author
        comments: any[]
        likes: any[]
        tags: any[]
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