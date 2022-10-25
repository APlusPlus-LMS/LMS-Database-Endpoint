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

const userSchema = new Schema<IUser>({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    role: {
        type: String,
        enum: ["STUDENT", "PROFESSOR", "STAFF"],
        required: true
    }
});

const postSchema = new Schema<IPost>({
    title: {type: String, required: true},
    body: {type: String, required: true},
    attachments: [String],
    priority: {
        type: String,
        enum: ["NONE", "IMPORTANT", "URGENT"]
    },
    assessmentInfo: [{
        assessmentId: String,
        type: {
            type: String,
            enum: ["HOMEWORK", "QUIZ", "EXAM"]
        }
    }]
});

const courseGradeSchema = new Schema<ICourseGrades>({
    courseId: {type: String, required: true},
    evaluations: [evaluationSchema]
});

const studentSchema = new Schema<IStudent>({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    role: {
        type: String,
        enum: ["STUDENT", "PROFESSOR", "STAFF"]
    },
    studentId: {type: String, required: true},
    grades: [courseGradeSchema],
});

const communitySchema = new Schema<ICommunity>({
    title: {type: String, required: true},
    administrators: [userSchema],
    members: [studentSchema],
    posts: [postSchema]
});


const courseSchema = new Schema<ICourse>({
    code: {type: String, required: true},
    title: {type: String, required: true},
    administrators: [userSchema],
    students: [studentSchema],
    posts: [postSchema],
    assignments: [evaluationSchema],
    scheduled_times: [{
        weekday: Number,
        startTime: Number, // 0-23
        classTimeMinutes: Number
    }]
});

const programSchema = new Schema<IProgram>({
    courses: [courseSchema],
    students: [studentSchema],
    staff: [userSchema],
    years: {type: Number, required: true},
    current_year: {type: Number, required: true}
});

// Models
export const ProgramModel = model("Program", programSchema);
export const CommunityModel = model("Community", communitySchema);
export const StudentModel = model("Student", studentSchema);
export const CourseModel = model("Course", courseSchema);
export const PostModel = model("Post", postSchema);
export const EvaluationModel = model("Evaluation", evaluationSchema);
