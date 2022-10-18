import {
    GraphQLID,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLEnumType
} from "graphql";
import { GraphQLDate, GraphQLNonEmptyString } from "graphql-scalars";

// TODO: Finish this (https://discord.com/channels/1021819059697889290/1028021631274209410/1028045607677481020)
export const ProgramType = new GraphQLObjectType({
    name: "Program",
    description: "Represets an education program.",
    fields: () => ({
        _id: { type: GraphQLID },
        years: { type: GraphQLInt },
        currentyear: { type: GraphQLInt }
    })
});

export const ClassType = new GraphQLObjectType({
    name: "Class",
    description: "Object representing a class time block.",
    fields: () => ({
        _id: { type: GraphQLID },
        type: {
            type: new GraphQLEnumType({
                name: "ClassType",
                values: {
                    LECTURE: {value: 1},
                    LAB: {value: 2}
                }
            })
        },
        weekday: { type: GraphQLInt },
        startTime: { type: GraphQLDate },
        classLengthMinutes: {type: GraphQLInt }
    })
});

// TODO: Add fields (https://discord.com/channels/1021819059697889290/1028021631274209410/1028023264620056676)
// NOTE: TimeBlock is not necessary thanks to GraphQL-scalar, it provides us date/time objects
export const CourseType = new GraphQLObjectType({
    name: "Course",
    description: "Represents a course a student is taking.",
    fields: () => ({
        _id: { type: GraphQLID },
        code: { type: GraphQLNonEmptyString },
        title: { type: GraphQLNonEmptyString },
        weeklyClasses: { type: new GraphQLList(ClassType) }
    })
});

export const SemesterType = new GraphQLObjectType({
    name: "Semester",
    description: "Represents a semester.",
    fields: () => ({
        _id: { type: GraphQLID },
        semNumber: { type: GraphQLInt },
        courses: { type: new GraphQLList(CourseType) },
        startDate: {type: GraphQLDate },
        endDate: { type: GraphQLDate },
        type: {
            type: new GraphQLEnumType({
                name: "ProgramSeasonDescriptor",
                values: {
                    SPRING: { value: 1 },
                    FALL: { value: 2 },
                    WINTER: { value: 4}
                }
            })
        }
    })
});

export const CourseContentPostType = new GraphQLObjectType({
    name: "CourseContentPost",
    description: "Information related to a post.",
    fields: () => ({
        _id: { type: GraphQLID },
        title: { type: GraphQLNonEmptyString },
        body: { type: GraphQLNonEmptyString }, // Markdown raw
        attachments: { type: new GraphQLList(GraphQLNonEmptyString) }, // Either serialized attachments or a link to the resource on a cdn
        priority: {
            type: new GraphQLEnumType({
                name: "PostPriority",
                values: {
                    NONE: { value: 0 },
                    IMPORTANT: { value: 1 },
                    URGENT: { value: 2}
                }
            })
        },
        assessmentInfo: {
            type: new GraphQLObjectType({
                name: "AssessmentInfo",
                description: "Related information to the assessment associated with this announcement.",
                fields: () => ({
                    assesmentId: { type: GraphQLID }, // Refers to the assessment this is linked to
                    type: {
                        type: new GraphQLEnumType({
                            name: "AssessmentType",
                            values: {
                                HOMEWORK: { value: 0 }, // Post announces basic lab work/assigned homework submission
                                QUIZ: { value: 1 }, // Post announces a quiz
                                EXAM: { value: 2 }, // Post announces an exam
                                // TODO: Other types maybe?
                            }
                        })
                    }
                })
            })
        }
    })
});

// TODO: Expand this to add more values here, the current items should be part of both a new type, StudentType and StaffType.
export const UserType = new GraphQLObjectType({
    name: "Student",
    description: "Type representing a user",
    fields: () => ({
        _id: { type: GraphQLID },
        firstname: { type: GraphQLNonEmptyString },
        lastname: { type: GraphQLNonEmptyString },
        email: { type: GraphQLString }
    })
});
