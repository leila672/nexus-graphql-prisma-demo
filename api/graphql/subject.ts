import {objectType} from "nexus";
import { Student } from "./student";

export const Subject = objectType({
    name : 'Subject',
    definition(t){
        t.int('id'),
        t.string('name'),
        t.string('category'),
        t.nonNull.list.field("students",{
            type:Student,
        })
    
    }
})