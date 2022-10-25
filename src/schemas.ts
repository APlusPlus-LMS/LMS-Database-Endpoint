import { model, Schema } from "mongoose";

export interface IUser {
    firstname: string
    lastname: string
    email: string,
    role: "STUDENT" | "PROFESSOR" | "STAFF"
}

export interface ITimeBlock {
    weekday: number,
    startTime: number, // 0-23
    classTimeMinutes: number
}

export interface IPost {
    title: string,
    body: string,
    attachments: string[],
    priority: "NONE" | "IMPORTANT" | "URGENT",
    assessmentInfo?: {
        assessmentId: string,
        type: "HOMEWORK" | "QUIZ" | "EXAM"
    }[]
}

export interface ICourse {
    code: string,
    title: string,
    administrators: IUser[],
    students: IStudent[],
    posts: IPost[],
    assignments: IEvaluation[],
    scheduled_times: ITimeBlock[]
}

export interface IProgram {
    courses: ICourse[]
    students: IStudent[]
    staff: IUser[]
    years: number
    current_year: number
}

export interface ICommunity {
    title: string,
    administrators: IUser[],
    members: IStudent[],
    posts: IPost[]
}

export interface IStudent extends IUser {
    studentId: string,
    programs: IProgram[]
    communities: ICommunity[]
    grades: Map<string, ICourseGrades>
}

export interface ICourseGrades {
    courseId: string,
    evaluations: IEvaluation[]
}

export interface IEvaluation {
    name: string
    result: number
    weighting: number // 0-1
    deadline?: Date
}

// Schemas
const evaluationSchema = new Schema<IEvaluation>({
    name: String,
    result: Number,
    weighting: Number,
    deadline: Date
});

// Models
