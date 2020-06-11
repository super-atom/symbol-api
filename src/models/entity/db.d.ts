// tslint:disable
import * as Sequelize from 'sequelize';

// table: artistActivityType
export interface artistActivityTypeAttribute {
    artistActivityType: number;
    artistActivityTypeName: string;
}
export interface artistActivityTypeInstance extends Sequelize.Instance<artistActivityTypeAttribute>, artistActivityTypeAttribute { }
export interface artistActivityTypeModel extends Sequelize.Model<artistActivityTypeInstance, artistActivityTypeAttribute> { }

// table: artistCommon
export interface artistCommonAttribute {
    artistId: string;
    artistActivityPeriodStart?: Date;
    artistActivityPeriodEnd?: Date;
    height: number;
}
export interface artistCommonInstance extends Sequelize.Instance<artistCommonAttribute>, artistCommonAttribute { }
export interface artistCommonModel extends Sequelize.Model<artistCommonInstance, artistCommonAttribute> { }

// table: artistGroup
export interface artistGroupAttribute {
    profileId: string;
    activityName: string;
    profileIdProfileId?: string;
}
export interface artistGroupInstance extends Sequelize.Instance<artistGroupAttribute>, artistGroupAttribute { }
export interface artistGroupModel extends Sequelize.Model<artistGroupInstance, artistGroupAttribute> { }

// table: authenticationEmail
export interface authenticationEmailAttribute {
    authenticationEmailId: string;
    authType: number;
    authKey: string;
    authGenerateDatetime: Date;
    authUseDatetime?: Date;
    userIdUserId?: string;
}
export interface authenticationEmailInstance extends Sequelize.Instance<authenticationEmailAttribute>, authenticationEmailAttribute { }
export interface authenticationEmailModel extends Sequelize.Model<authenticationEmailInstance, authenticationEmailAttribute> { }

// table: authenticationSession
export interface authenticationSessionAttribute {
    authenticationSessionId: string;
    userSessionId: string;
    userIdUserId?: string;
}
export interface authenticationSessionInstance extends Sequelize.Instance<authenticationSessionAttribute>, authenticationSessionAttribute { }
export interface authenticationSessionModel extends Sequelize.Model<authenticationSessionInstance, authenticationSessionAttribute> { }

// table: caseConfiguration
export interface caseConfigurationAttribute {
    caseElementId: string;
    profileId: string;
    caseElementIdCaseElementId?: string;
}
export interface caseConfigurationInstance extends Sequelize.Instance<caseConfigurationAttribute>, caseConfigurationAttribute { }
export interface caseConfigurationModel extends Sequelize.Model<caseConfigurationInstance, caseConfigurationAttribute> { }

// table: caseContribute
export interface caseContributeAttribute {
    caseElementId: string;
    userId: string;
    caseElementIdCaseElementId?: string;
}
export interface caseContributeInstance extends Sequelize.Instance<caseContributeAttribute>, caseContributeAttribute { }
export interface caseContributeModel extends Sequelize.Model<caseContributeInstance, caseContributeAttribute> { }

// table: caseElement
export interface caseElementAttribute {
    caseElementId: string;
    caseElementName: string;
    actionOccurredDatetime?: Date;
}
export interface caseElementInstance extends Sequelize.Instance<caseElementAttribute>, caseElementAttribute { }
export interface caseElementModel extends Sequelize.Model<caseElementInstance, caseElementAttribute> { }

// table: countryCode
export interface countryCodeAttribute {
    countryCode: string;
    countryName: string;
}
export interface countryCodeInstance extends Sequelize.Instance<countryCodeAttribute>, countryCodeAttribute { }
export interface countryCodeModel extends Sequelize.Model<countryCodeInstance, countryCodeAttribute> { }

// table: historicalData
export interface historicalDataAttribute {
    historicalDataId: string;
    ip?: number;
    actionType: number;
    actionOccurredDatetime?: Date;
    isHide?: number;
    isDelete?: number;
    userUserId?: string;
}
export interface historicalDataInstance extends Sequelize.Instance<historicalDataAttribute>, historicalDataAttribute { }
export interface historicalDataModel extends Sequelize.Model<historicalDataInstance, historicalDataAttribute> { }

// table: human
export interface humanAttribute {
    humanId: string;
    gender: number;
    birthday: Date;
    realName: string;
    birthCountry: string;
    birthCity: string;
    activityCountry: string;
    currentLiveCity: string;
    popularity: number;
    influence: number;
    reputation: number;
    isDead: number;
}
export interface humanInstance extends Sequelize.Instance<humanAttribute>, humanAttribute { }
export interface humanModel extends Sequelize.Model<humanInstance, humanAttribute> { }

// table: infoDocument
export interface infoDocumentAttribute {
    infoDocId: string;
    profileIdProfileId?: string;
    infoDocumentTypeInfoDocumentType?: number;
    userIdUserId?: string;
}
export interface infoDocumentInstance extends Sequelize.Instance<infoDocumentAttribute>, infoDocumentAttribute { }
export interface infoDocumentModel extends Sequelize.Model<infoDocumentInstance, infoDocumentAttribute> { }

// table: infoDocumentType
export interface infoDocumentTypeAttribute {
    infoDocumentType: number;
    infoDocumentTypeName: string;
}
export interface infoDocumentTypeInstance extends Sequelize.Instance<infoDocumentTypeAttribute>, infoDocumentTypeAttribute { }
export interface infoDocumentTypeModel extends Sequelize.Model<infoDocumentTypeInstance, infoDocumentTypeAttribute> { }

// table: post
export interface postAttribute {
    postId: string;
    postTitle: string;
    postContent: string;
    postTypePostType?: number;
    userIdUserId?: string;
}
export interface postInstance extends Sequelize.Instance<postAttribute>, postAttribute { }
export interface postModel extends Sequelize.Model<postInstance, postAttribute> { }

// table: postType
export interface postTypeAttribute {
    postType: number;
    postTypeName: string;
}
export interface postTypeInstance extends Sequelize.Instance<postTypeAttribute>, postTypeAttribute { }
export interface postTypeModel extends Sequelize.Model<postTypeInstance, postTypeAttribute> { }

// table: profile
export interface profileAttribute {
    profileId: string;
    activityName: string;
    nativeActivityName: string;
    profileDescription: string;
    userTypeProfileType?: number;
    publicationIdPublicationId?: string;
}
export interface profileInstance extends Sequelize.Instance<profileAttribute>, profileAttribute { }
export interface profileModel extends Sequelize.Model<profileInstance, profileAttribute> { }

// table: profileType
export interface profileTypeAttribute {
    profileType: number;
    profileTypeName: string;
}
export interface profileTypeInstance extends Sequelize.Instance<profileTypeAttribute>, profileTypeAttribute { }
export interface profileTypeModel extends Sequelize.Model<profileTypeInstance, profileTypeAttribute> { }

// table: publicationData
export interface publicationDataAttribute {
    publicationId: string;
    historicalDataHistoricalDataId?: string;
    perfection: number;
    publicationState: number;
    viewCount: number;
    isPublished: number;
    isTempData: number;
}
export interface publicationDataInstance extends Sequelize.Instance<publicationDataAttribute>, publicationDataAttribute { }
export interface publicationDataModel extends Sequelize.Model<publicationDataInstance, publicationDataAttribute> { }

// table: resource
export interface resourceAttribute {
    resourceId: string;
    resourceFilename: string;
    reousrceFileExtension: string;
    resourceDescription: string;
    resourceOriginUrl: string;
    isResourceAuthor: number;
    resourceTypeResourceType?: number;
    userIdUserId?: string;
}
export interface resourceInstance extends Sequelize.Instance<resourceAttribute>, resourceAttribute { }
export interface resourceModel extends Sequelize.Model<resourceInstance, resourceAttribute> { }

// table: resourceDocument
export interface resourceDocumentAttribute {
    resourceDocId: string;
    resourceDocDescription?: string;
    userIdUserId?: string;
}
export interface resourceDocumentInstance extends Sequelize.Instance<resourceDocumentAttribute>, resourceDocumentAttribute { }
export interface resourceDocumentModel extends Sequelize.Model<resourceDocumentInstance, resourceDocumentAttribute> { }

// table: resourceType
export interface resourceTypeAttribute {
    resourceType: number;
    resourceTypeName: string;
}
export interface resourceTypeInstance extends Sequelize.Instance<resourceTypeAttribute>, resourceTypeAttribute { }
export interface resourceTypeModel extends Sequelize.Model<resourceTypeInstance, resourceTypeAttribute> { }

// table: test
export interface testAttribute {
    testcol: number;
    testcol2?: string;
}
export interface testInstance extends Sequelize.Instance<testAttribute>, testAttribute { }
export interface testModel extends Sequelize.Model<testInstance, testAttribute> { }

// table: user
export interface userAttribute {
    userPassword: any;
    userDropoutDate?: Date;
    userSignupDate?: Date;
    userTypeUserType?: number;
    userEmail: string;
    userContributePoint: number;
    userId: string;
    userLoginId: string;
}
export interface userInstance extends Sequelize.Instance<userAttribute>, userAttribute { }
export interface userModel extends Sequelize.Model<userInstance, userAttribute> { }

// table: userType
export interface userTypeAttribute {
    userType: number;
    userTypeName: string;
}
export interface userTypeInstance extends Sequelize.Instance<userTypeAttribute>, userTypeAttribute { }
export interface userTypeModel extends Sequelize.Model<userTypeInstance, userTypeAttribute> { }
