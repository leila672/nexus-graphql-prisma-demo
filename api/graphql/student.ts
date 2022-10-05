import {objectType , extendType} from "nexus";
import { Subject } from "./subject";

export const Student = objectType({
    name : 'Student',
    definition(t){
        t.int('id'),
        t.string('name'),
        t.string('age'),
        t.nonNull.list.field("subjects",{
            type:Subject,
            resolve(__root , context){
                return context.pri
            }
        })
    }
})

