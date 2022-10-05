import { objectType, extendType, nonNull, intArg } from "nexus";
import { Subject } from "./subject";

export const Student = objectType({
  name: "Student",
  definition(t) {
      t.int("id"),
      t.string("name"),
      t.string("age"),
      t.nonNull.list.field("subjects", {
        type: Subject,
      });
  },
});

export const studentquery = extendType({
  type: "Query",
  definition(t) {
    t.field("allstudents", {
      type: Student,
      args: {
        id: nonNull(intArg()),
      },
      async resolve(_root, args , ctx) {
    // const studentOnSubjects=await ctx.db.studentOnSubject.findMany({ where:{studentId:args.id} })
    // const subjectids= studentOnSubjects.map((row)=>row.subjectId)
    // const subjects=await Promise.all(subjectids.map( (id)=>  ctx.db.subject.findUnique({where:{id}})))
    // console.log(subjects);


    return await ctx.db.student.findUnique({ where:{id:args.id}}).subjects;
  },
      
    });
  },
});
