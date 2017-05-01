

import { ISchool } from '../../../app/schoolapp/interfaces/school';

export interface IClassroom {
    id: number;
    name: string;
    teacher: string;
    school_id: number;
//    school: ISchool;
}

// export interface IClassroomRaw {
//    id: number;
//    name: string;
//    teacher: string;
//    school_id: number;
// }