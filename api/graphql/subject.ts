import {objectType} from "nexus";
import { Student } from "./student";

export const Subject = objectType({
    name : 'Subject',
    definition(t){
        t.nonNull.int('id'),
        t.string('name'),
        t.string('category')
        t.nonNull.list.nonNull.field("students",{
            type:Student,
            resolve(parent, args, ctx) {   // 2
                return ctx.db.subject.findUnique({ where: { id : parent.id } }).students();
            },
        })
     }
})


