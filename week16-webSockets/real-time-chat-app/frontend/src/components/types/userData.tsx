export interface userDataProps { 
        _id: string;
        username : string;
        createdAt ?: string,
        updatedAt ?: string;
        rooms : {
            name : string,
            roomId : string,
            roomPicture ?: {
                data : any,
                contentType: string
            },
            users: string[],
            updatedAt ?: string,
            createdAt ?: string,
            __v ?: any,
            _id ?: any
        }[] 
    } 
