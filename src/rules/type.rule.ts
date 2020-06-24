export enum UserTypeRule {
    Visitor = 0,
    User = 1,
    Collaborator = 2,
    Operator = 3,
    Administor = 4
}

export enum PublicationTypeRule {
    Profile = 1,
    PostVideo = 2,
}

export enum ProfileTypeRule {
    User = 1,
    Artist = 2,
    ArtistGroup = 3,
    Label = 4,
    Agency = 5,
}

export enum PostTypeRule {
    Image = 1,
    Video = 2,
    Community = 3,
    Sns = 4
}

export enum PostVideoTypeRule {
    Untyped = 0,
    Official = 1,
    Activity = 2,
    Sns = 3,
    Clip = 4,
    Fan = 5,
    Edited = 6
}

export default UserTypeRule;
